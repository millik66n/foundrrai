import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** Monthly credit allotment granted when a user moves onto a plan. */
const PLAN_CREDITS: Record<string, number> = {
  pro: 500,
  max: 1200,
};

interface UpgradeBody {
  plan?: string;
}

/**
 * Simulated upgrade: sets the user's plan and grants the plan's credits.
 * Real card payments (Stripe) are a separate step; this lets the upgrade →
 * credits → "what you can do now" flow work end-to-end today.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: UpgradeBody;
  try {
    body = (await request.json()) as UpgradeBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const plan = body.plan;
  if (!plan || !(plan in PLAN_CREDITS)) {
    return NextResponse.json({ error: "Yanlış plan." }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();
  const current = profile?.credits ?? 0;
  const newCredits = current + PLAN_CREDITS[plan];

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ plan, credits: newCredits })
    .eq("id", user.id);
  if (updateError) {
    return NextResponse.json({ error: "Plan yenilənmədi." }, { status: 500 });
  }

  return NextResponse.json({ plan, credits: newCredits, granted: PLAN_CREDITS[plan] });
}
