import { NextResponse } from "next/server";

import { sendWelcomeEmail } from "@/lib/email/welcome";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Sends the welcome email exactly once per user. Fired (fire-and-forget) the
 * first time a user reaches the dashboard, so it works for every signup method.
 * Idempotent: claims the `welcomed` flag (false→true) and only the claiming call
 * sends; on send failure it releases the flag so the next visit can retry.
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("welcomed, name, email")
    .eq("id", user.id)
    .single();

  if (!profile || profile.welcomed) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // No mail provider configured → don't claim, so it can send once a key is added.
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: "no_key" });
  }

  // Claim the send atomically (only the call that flips false→true proceeds).
  const { data: claimed } = await supabase
    .from("profiles")
    .update({ welcomed: true })
    .eq("id", user.id)
    .eq("welcomed", false)
    .select("id");
  if (!claimed || claimed.length === 0) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const to = (profile.email as string | null) ?? user.email ?? "";
  const sent = await sendWelcomeEmail(to, profile.name as string | null);
  if (!sent) {
    // Release the flag so a later visit retries.
    await supabase.from("profiles").update({ welcomed: false }).eq("id", user.id);
    return NextResponse.json({ ok: false, error: "Göndərilmədi." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, sent: true });
}
