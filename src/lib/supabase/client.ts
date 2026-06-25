import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (Foundrr's own project).
 * Only the public URL + anon key are exposed here — never the service role.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase konfiqurasiya olunmayıb: NEXT_PUBLIC_SUPABASE_URL və NEXT_PUBLIC_SUPABASE_ANON_KEY tələb olunur.",
    );
  }

  return createBrowserClient(url, anonKey);
}
