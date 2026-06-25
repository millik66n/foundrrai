import { NextResponse } from "next/server";

import { getConnection } from "@/lib/connections";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

interface DomainBody {
  siteId?: string;
  domain?: string;
}

interface DnsRecord {
  type: string;
  name: string;
  value: string;
}

/** Same slug the deploy route uses → the Vercel project name. */
function projectName(siteName: string): string {
  return (
    siteName.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 40) || "foundrr-sayt"
  );
}

const VERCEL_A = "76.76.21.21";
const VERCEL_CNAME = "cname.vercel-dns.com";

/**
 * Connects a user's own custom domain to their deployed Vercel project: adds the
 * domain (idempotent), triggers verification, and returns the exact DNS records
 * they must add at their registrar. Re-calling re-checks status — once DNS
 * propagates, `verified` flips true and the domain auto-connects. No DNS is
 * required from us; everything runs against the USER's Vercel account/token.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: DomainBody;
  try {
    body = (await request.json()) as DomainBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const siteId = body.siteId;
  const domain = (body.domain ?? "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
  if (!siteId || !domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return NextResponse.json({ error: "Düzgün domen daxil et (məs: nümunə.az)." }, { status: 400 });
  }

  const { data: site } = await supabase
    .from("sites")
    .select("name")
    .eq("id", siteId)
    .eq("owner_id", user.id)
    .single();
  if (!site) {
    return NextResponse.json({ error: "Sayt tapılmadı." }, { status: 404 });
  }

  const vercel = await getConnection(supabase, user.id, "vercel");
  if (!vercel) {
    return NextResponse.json(
      { error: "Əvvəlcə Vercel hesabını qoş (Parametrlər → Bağlantılar)." },
      { status: 400 },
    );
  }

  const project = projectName(site.name as string);
  const teamId = vercel.meta?.teamId as string | undefined;
  const q = teamId ? `?teamId=${teamId}` : "";
  const headers = {
    Authorization: `Bearer ${vercel.token}`,
    "Content-Type": "application/json",
  };

  try {
    // 1. Add the domain to the project (ignore "already exists").
    const addRes = await fetch(
      `https://api.vercel.com/v10/projects/${project}/domains${q}`,
      { method: "POST", headers, body: JSON.stringify({ name: domain }) },
    );
    if (!addRes.ok) {
      const err = (await addRes.json().catch(() => ({}))) as {
        error?: { code?: string; message?: string };
      };
      const code = err.error?.code;
      if (code !== "domain_already_in_use" && code !== "domain_already_exists") {
        if (addRes.status === 404) {
          return NextResponse.json(
            { error: "Əvvəlcə saytı yayımla, sonra domeni bağla." },
            { status: 400 },
          );
        }
        return NextResponse.json(
          { error: err.error?.message ?? "Domen əlavə edilmədi." },
          { status: 502 },
        );
      }
    }

    // 2. Trigger verification (best-effort).
    await fetch(
      `https://api.vercel.com/v9/projects/${project}/domains/${domain}/verify${q}`,
      { method: "POST", headers },
    ).catch(() => {});

    // 3. Read current status + DNS config.
    const statusRes = await fetch(
      `https://api.vercel.com/v9/projects/${project}/domains/${domain}${q}`,
      { headers },
    );
    const status = (await statusRes.json()) as {
      name?: string;
      apexName?: string;
      verified?: boolean;
      verification?: Array<{ type: string; domain: string; value: string }>;
    };

    const cfgRes = await fetch(
      `https://api.vercel.com/v6/domains/${domain}/config${q}`,
      { headers },
    );
    const cfg = (await cfgRes.json().catch(() => ({}))) as { misconfigured?: boolean };

    // 4. Build the records the user must add at their registrar.
    const apex = status.apexName ?? domain;
    const isApex = domain === apex;
    const records: DnsRecord[] = [];
    if (isApex) {
      records.push({ type: "A", name: "@", value: VERCEL_A });
    } else {
      const sub = domain.slice(0, domain.length - apex.length - 1) || "www";
      records.push({ type: "CNAME", name: sub, value: VERCEL_CNAME });
    }
    // Ownership-verification records (when the domain is registered elsewhere).
    for (const v of status.verification ?? []) {
      records.push({ type: v.type, name: v.domain, value: v.value });
    }

    const verified = !!status.verified && cfg.misconfigured === false;

    return NextResponse.json({
      domain,
      verified,
      misconfigured: cfg.misconfigured ?? true,
      records,
    });
  } catch {
    return NextResponse.json({ error: "Domen yoxlanışı alınmadı." }, { status: 502 });
  }
}
