import { NextResponse } from "next/server";

import { getHealthReport } from "@/lib/health/checks";
import { maybeRecordSnapshot } from "@/lib/health/history";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Scheduled snapshot for the `/status` uptime history. Invoked by Vercel Cron
 * (see vercel.json). When CRON_SECRET is set, Vercel sends it as a bearer token
 * and we reject anything else.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const report = await getHealthReport(true);
  // Throttled — guarantees the scheduled snapshot without letting an exposed
  // endpoint be spammed into bloating the table.
  await maybeRecordSnapshot(report);
  return NextResponse.json({ ok: true, status: report.status, at: report.checkedAt });
}
