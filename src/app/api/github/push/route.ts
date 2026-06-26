import { NextResponse } from "next/server";

import { getConnection } from "@/lib/connections";
import { isPaidPlan } from "@/lib/stripe/plans";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const GH = "https://api.github.com";

interface PushBody {
  siteId?: string;
}

/** Push the generated project into a repo on the user's OWN GitHub account (#1). */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  // GitHub sync is a paid (Pro/Max) feature.
  const { data: planRow } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();
  if (!isPaidPlan(planRow?.plan)) {
    return NextResponse.json(
      { error: "GitHub sinxronizasiyası Pro plandadır. Pro-ya keç.", upgrade: true },
      { status: 403 },
    );
  }

  let body: PushBody;
  try {
    body = (await request.json()) as PushBody;
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }
  const siteId = body.siteId;
  if (!siteId) return NextResponse.json({ error: "Sayt seçilməyib." }, { status: 400 });

  const gh = await getConnection(supabase, user.id, "github");
  if (!gh) {
    return NextResponse.json(
      { error: "Əvvəlcə GitHub hesabını qoş.", needsConnect: true },
      { status: 400 },
    );
  }
  const token = gh.token;
  const login = (gh.meta?.login as string | undefined) ?? "";

  const { data: site } = await supabase
    .from("sites")
    .select("name")
    .eq("id", siteId)
    .eq("owner_id", user.id)
    .single();
  if (!site) return NextResponse.json({ error: "Sayt tapılmadı." }, { status: 404 });

  const { data: fileRows } = await supabase
    .from("files")
    .select("path, content")
    .eq("site_id", siteId);
  const files = (fileRows ?? []).map((f) => ({
    path: f.path as string,
    content: f.content as string,
  }));
  if (files.length === 0) {
    return NextResponse.json({ error: "Sayt faylları tapılmadı." }, { status: 400 });
  }

  const repo =
    (site.name as string).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 90) ||
    "foundrr-sayt";

  const api = (path: string, init?: RequestInit) =>
    fetch(`${GH}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Foundrr",
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });

  try {
    // 1. Resolve the owner login (fall back to /user if it wasn't stored).
    let owner = login;
    if (!owner) {
      const me = await api("/user");
      owner = ((await me.json()) as { login?: string }).login ?? "";
    }
    if (!owner) {
      return NextResponse.json({ error: "GitHub istifadəçisi tapılmadı." }, { status: 502 });
    }

    // 2. Ensure the repo exists (create it on the user's account if missing).
    let branch = "main";
    const repoRes = await api(`/repos/${owner}/${repo}`);
    if (repoRes.status === 404) {
      const created = await api("/user/repos", {
        method: "POST",
        body: JSON.stringify({
          name: repo,
          description: "Foundrr ilə yaradılıb",
          private: false,
          auto_init: false,
        }),
      });
      if (!created.ok) {
        const e = (await created.json()) as { message?: string };
        return NextResponse.json(
          { error: e.message ?? "Repozitoriya yaradıla bilmədi." },
          { status: 502 },
        );
      }
    } else if (repoRes.ok) {
      branch = ((await repoRes.json()) as { default_branch?: string }).default_branch ?? "main";
    } else {
      const e = (await repoRes.json()) as { message?: string };
      return NextResponse.json({ error: e.message ?? "GitHub xətası." }, { status: 502 });
    }

    // 3. Find the current branch tip (parent), if the repo already has commits.
    let parentSha: string | null = null;
    const refRes = await api(`/repos/${owner}/${repo}/git/ref/heads/${branch}`);
    if (refRes.ok) {
      parentSha = ((await refRes.json()) as { object?: { sha?: string } }).object?.sha ?? null;
    }

    // 4. Create a blob per file.
    const tree: Array<{ path: string; mode: "100644"; type: "blob"; sha: string }> = [];
    for (const file of files) {
      const blob = await api(`/repos/${owner}/${repo}/git/blobs`, {
        method: "POST",
        body: JSON.stringify({
          content: Buffer.from(file.content, "utf8").toString("base64"),
          encoding: "base64",
        }),
      });
      if (!blob.ok) {
        const e = (await blob.json()) as { message?: string };
        return NextResponse.json(
          { error: e.message ?? `Fayl göndərilə bilmədi: ${file.path}` },
          { status: 502 },
        );
      }
      const sha = ((await blob.json()) as { sha: string }).sha;
      tree.push({ path: file.path, mode: "100644", type: "blob", sha });
    }

    // 5. Tree → commit → ref. No base_tree → the commit is an exact snapshot.
    const treeRes = await api(`/repos/${owner}/${repo}/git/trees`, {
      method: "POST",
      body: JSON.stringify({ tree }),
    });
    if (!treeRes.ok) {
      return NextResponse.json({ error: "Ağac yaradıla bilmədi." }, { status: 502 });
    }
    const treeSha = ((await treeRes.json()) as { sha: string }).sha;

    const commitRes = await api(`/repos/${owner}/${repo}/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: "Foundrr: sayt yeniləndi",
        tree: treeSha,
        parents: parentSha ? [parentSha] : [],
      }),
    });
    if (!commitRes.ok) {
      return NextResponse.json({ error: "Commit yaradıla bilmədi." }, { status: 502 });
    }
    const commitSha = ((await commitRes.json()) as { sha: string }).sha;

    if (parentSha) {
      await api(`/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
        method: "PATCH",
        body: JSON.stringify({ sha: commitSha, force: true }),
      });
    } else {
      await api(`/repos/${owner}/${repo}/git/refs`, {
        method: "POST",
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: commitSha }),
      });
    }

    const repoUrl = `https://github.com/${owner}/${repo}`;
    await supabase.from("sites").update({ repo_url: repoUrl }).eq("id", siteId);

    return NextResponse.json({ repoUrl });
  } catch {
    return NextResponse.json({ error: "GitHub-a göndərmə alınmadı." }, { status: 502 });
  }
}
