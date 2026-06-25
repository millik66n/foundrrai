import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** Read a project's persistent knowledge / custom instructions. */
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  const siteId = new URL(request.url).searchParams.get("siteId");
  if (!siteId) return NextResponse.json({ knowledge: "" });

  const { data } = await supabase
    .from("sites")
    .select("knowledge")
    .eq("id", siteId)
    .eq("owner_id", user.id)
    .maybeSingle();

  return NextResponse.json({ knowledge: (data?.knowledge as string | null) ?? "" });
}

/** Save a project's persistent knowledge / custom instructions. */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: { siteId?: string; knowledge?: string };
  try {
    body = (await request.json()) as { siteId?: string; knowledge?: string };
  } catch {
    return NextResponse.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const { siteId } = body;
  const knowledge = (body.knowledge ?? "").slice(0, 4000);
  if (!siteId) {
    return NextResponse.json({ error: "Sayt seçilməyib." }, { status: 400 });
  }

  const { error } = await supabase
    .from("sites")
    .update({ knowledge })
    .eq("id", siteId)
    .eq("owner_id", user.id);
  if (error) {
    return NextResponse.json({ error: "Yadda saxlanmadı." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, knowledge });
}
