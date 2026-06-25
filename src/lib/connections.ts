import type { SupabaseClient } from "@supabase/supabase-js";

import { decryptToken } from "@/lib/crypto";

export interface ProviderConnection {
  token: string;
  meta: Record<string, unknown>;
}

/** Server-side: fetch + decrypt a user's stored provider token (or null). */
export async function getConnection(
  supabase: SupabaseClient,
  userId: string,
  provider: "vercel" | "netlify" | "supabase" | "github",
): Promise<ProviderConnection | null> {
  const { data } = await supabase
    .from("connections")
    .select("token_encrypted, meta")
    .eq("owner_id", userId)
    .eq("provider", provider)
    .maybeSingle();

  if (!data?.token_encrypted) return null;
  try {
    return {
      token: decryptToken(data.token_encrypted as string),
      meta: (data.meta as Record<string, unknown>) ?? {},
    };
  } catch {
    return null;
  }
}
