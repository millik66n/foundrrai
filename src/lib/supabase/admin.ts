import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client for trusted server contexts with no user session
 * (e.g. the Stripe webhook). Bypasses RLS — never expose to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Supabase service-role credentials are not configured.");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
