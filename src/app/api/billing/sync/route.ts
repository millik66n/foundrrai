import { NextResponse } from "next/server";

import { PLAN_CONFIG, isPaidPlan } from "@/lib/stripe/plans";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Reconciles the user's plan with Stripe — a safety net for when the webhook
 * isn't configured (or missed an event). Finds the user's most recent COMPLETED
 * Checkout Session, matched by our server-set `metadata.userId` (so it's tied to
 * the Foundrr account regardless of which email Stripe Link ended up using), and
 * grants the purchased plan + its monthly credits. Idempotent: if the plan
 * already matches, nothing changes (so it never double-grants on repeat calls).
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe konfiqurasiya olunmayıb." }, { status: 503 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, credits")
    .eq("id", user.id)
    .single();

  let targetPlan: "pro" | "max" | null = null;
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secret);
    const sessions = await stripe.checkout.sessions.list({ limit: 100 });
    const mine = sessions.data.find(
      (s) =>
        s.metadata?.userId === user.id &&
        s.status === "complete" &&
        isPaidPlan(s.metadata?.plan),
    );
    if (mine && isPaidPlan(mine.metadata?.plan)) {
      targetPlan = mine.metadata.plan;
    }
  } catch {
    return NextResponse.json({ error: "Stripe ilə yoxlama alınmadı." }, { status: 502 });
  }

  const currentPlan = profile?.plan ?? "free";
  const currentCredits = profile?.credits ?? 0;

  // No paid purchase found, or the plan already matches → nothing to do.
  if (!targetPlan || currentPlan === targetPlan) {
    return NextResponse.json({ changed: false, plan: currentPlan, credits: currentCredits });
  }

  const credits = currentCredits + PLAN_CONFIG[targetPlan].credits;
  await supabase.from("profiles").update({ plan: targetPlan, credits }).eq("id", user.id);
  return NextResponse.json({ changed: true, plan: targetPlan, credits });
}
