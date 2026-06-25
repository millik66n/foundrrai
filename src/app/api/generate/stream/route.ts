import OpenAI from "openai";

import { CHAT_STREAM_SYSTEM, CREDIT_COSTS, MODELS } from "@/lib/ai/engine";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 120;

interface StreamBody {
  prompt?: string;
  files?: Array<{ path: string; content: string }>;
  knowledge?: string;
}

/**
 * Token-streaming chat (#8 true streaming). Streams the reply as plain UTF-8 text
 * so the client renders tokens as they arrive. Charges the chat credit up front
 * and reports the new balance via the X-Credits response header.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Daxil olmaq lazımdır." }, { status: 401 });
  }

  let body: StreamBody;
  try {
    body = (await request.json()) as StreamBody;
  } catch {
    return Response.json({ error: "Yanlış sorğu." }, { status: 400 });
  }

  const prompt = (body.prompt ?? "").trim();
  if (!prompt) return Response.json({ error: "Mətn boşdur." }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "OPENAI_API_KEY konfiqurasiya olunmayıb." }, { status: 503 });
  }

  const cost = CREDIT_COSTS.chat;
  const { data: profile } = await supabase
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();
  const credits = profile?.credits ?? 0;
  if (credits < cost) {
    return Response.json({ error: "Kredit kifayət etmir.", credits }, { status: 402 });
  }

  const knowledge = (body.knowledge ?? "").trim();
  const userContent =
    (body.files
      ? `Cari fayllar (kontekst):\n${JSON.stringify(body.files).slice(0, 30000)}\n\n`
      : "") +
    `Sual: ${prompt}` +
    (knowledge ? `\n\nLAYİHƏ QAYDALARI:\n${knowledge}` : "");

  const openai = new OpenAI({ apiKey });

  let stream: Awaited<ReturnType<typeof openai.chat.completions.create>>;
  try {
    stream = await openai.chat.completions.create({
      model: MODELS.chat,
      stream: true,
      messages: [
        { role: "system", content: CHAT_STREAM_SYSTEM },
        { role: "user", content: userContent },
      ],
    });
  } catch {
    return Response.json({ error: "Söhbət başladıla bilmədi." }, { status: 502 });
  }

  // We've committed to answering — charge the credit now.
  const newCredits = credits - cost;
  await supabase.from("profiles").update({ credits: newCredits }).eq("id", user.id);

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream as AsyncIterable<{
          choices: Array<{ delta?: { content?: string | null } }>;
        }>) {
          const delta = chunk.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch {
        controller.enqueue(encoder.encode("\n\n(Cavab yarımçıq kəsildi.)"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Credits": String(newCredits),
    },
  });
}
