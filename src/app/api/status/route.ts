import { NextResponse } from "next/server";

import { getHealthReport } from "@/lib/health/checks";
import { maybeRecordSnapshot } from "@/lib/health/history";

// Always live — never cache a status response, and run on Node (uses fetch + env).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Machine-readable health endpoint. Any uptime monitor can poll this:
 * 200 when everything is operational/degraded, 503 when a component is down.
 * Each poll also feeds the uptime history (throttled, best-effort).
 */
export async function GET() {
  const report = await getHealthReport();
  await maybeRecordSnapshot(report);
  const httpStatus = report.status === "down" ? 503 : 200;
  return NextResponse.json(report, {
    status: httpStatus,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
