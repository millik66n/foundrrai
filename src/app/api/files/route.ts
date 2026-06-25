import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Persist a single file edited directly in the in-browser code editor.
 * Owner-scoped: the file's site must belong to the signed-in user.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: { siteId?: string; path?: string; content?: string };
  try {
    body = (await request.json()) as { siteId?: string; path?: string; content?: string };
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const { siteId, path } = body;
  const content = body.content ?? "";
  if (!siteId || !path) {
    return NextResponse.json({ error: "Sayt və ya fayl seçilməyib." }, { status: 400 });
  }

  // Verify the site belongs to this user before touching its files.
  const { data: site } = await supabase
    .from("sites")
    .select("id")
    .eq("id", siteId)
    .eq("owner_id", user.id)
    .maybeSingle();
  if (!site) {
    return NextResponse.json({ error: "Sayt tapılmadı." }, { status: 404 });
  }

  const { error } = await supabase
    .from("files")
    .upsert({ site_id: siteId, path, content }, { onConflict: "site_id,path" });
  if (error) {
    return NextResponse.json({ error: "Yadda saxlanmadı." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
