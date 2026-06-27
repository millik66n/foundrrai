/**
 * Uptime history for the `/status` page. Periodic snapshots are written to the
 * `status_history` table (service-role only) and aggregated into per-day
 * buckets so the page can render a 90-day uptime bar strip per service.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import type { ComponentStatus, HealthReport } from "@/lib/health/checks";

export interface DayPoint {
  /** Calendar day in Asia/Baku, "YYYY-MM-DD". */
  date: string;
  status: ComponentStatus;
}

export interface ComponentHistory {
  key: string;
  /** Oldest → newest, always `days` long (missing days are "unknown"). */
  days: DayPoint[];
  /** Operational % over days that have data, or null when there is none yet. */
  uptime: number | null;
}

export type UptimeHistory = Record<string, ComponentHistory>;

const DAY_MS = 86_400_000;
const RECORD_THROTTLE_MS = 10 * 60_000;
const BAKU_DATE = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Baku" });

let lastRecordAt = 0;

/** Worst-wins ordering; "unknown" is the floor so any real reading beats it. */
const SEVERITY: Record<ComponentStatus, number> = {
  unknown: 0,
  operational: 1,
  degraded: 2,
  down: 3,
};

/** Insert one snapshot row per component. Best-effort — never throws. */
export async function recordSnapshot(report: HealthReport): Promise<void> {
  try {
    const admin = createAdminClient();
    const rows = report.components.map((c) => ({
      component_key: c.key,
      status: c.status,
      response_ms: c.responseMs ?? null,
      checked_at: report.checkedAt,
    }));
    await admin.from("status_history").insert(rows);
  } catch {
    // Recording must never break a status response.
  }
}

/** Record at most once per throttle window per server instance. */
export async function maybeRecordSnapshot(report: HealthReport): Promise<void> {
  const now = Date.now();
  if (now - lastRecordAt < RECORD_THROTTLE_MS) return;
  lastRecordAt = now;
  await recordSnapshot(report);
}

/** Build the list of the last `days` calendar dates (Asia/Baku), oldest first. */
function recentDates(days: number): string[] {
  const out: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    out.push(BAKU_DATE.format(new Date(Date.now() - i * DAY_MS)));
  }
  return out;
}

/**
 * Aggregate the last `days` of snapshots into per-component daily buckets.
 * Each day's status is the worst reading that day. Returns an entry for every
 * requested key even if there is no data yet (all-"unknown").
 */
export async function getUptimeHistory(
  componentKeys: ReadonlyArray<string>,
  days = 90,
): Promise<UptimeHistory> {
  const dates = recentDates(days);
  // key -> (date -> worst status)
  const buckets = new Map<string, Map<string, ComponentStatus>>();
  for (const key of componentKeys) buckets.set(key, new Map());

  try {
    const since = new Date(Date.now() - days * DAY_MS).toISOString();
    const admin = createAdminClient();
    const { data } = await admin
      .from("status_history")
      .select("component_key,status,checked_at")
      .gte("checked_at", since)
      .order("checked_at", { ascending: true });

    for (const row of data ?? []) {
      const key = row.component_key as string;
      const map = buckets.get(key);
      if (!map) continue;
      const date = BAKU_DATE.format(new Date(row.checked_at as string));
      const status = row.status as ComponentStatus;
      const current = map.get(date) ?? "unknown";
      if (SEVERITY[status] > SEVERITY[current]) map.set(date, status);
    }
  } catch {
    // No history available — fall through to all-"unknown".
  }

  const result: UptimeHistory = {};
  for (const key of componentKeys) {
    const map = buckets.get(key) ?? new Map<string, ComponentStatus>();
    const dayPoints: DayPoint[] = dates.map((date) => ({
      date,
      status: map.get(date) ?? "unknown",
    }));
    const withData = dayPoints.filter((d) => d.status !== "unknown");
    const operational = withData.filter((d) => d.status === "operational");
    const uptime =
      withData.length > 0
        ? Math.round((operational.length / withData.length) * 1000) / 10
        : null;
    result[key] = { key, days: dayPoints, uptime };
  }
  return result;
}
