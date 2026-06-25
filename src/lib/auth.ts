import type { NavUser } from "@/components/landing/site-nav";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side: resolve the current user's nav profile (or null if logged out).
 * The session lives in cookies, so this stays correct across reloads.
 */
export async function getNavUser(): Promise<NavUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name,email,plan,credits")
    .eq("id", user.id)
    .single();

  return {
    name: (profile?.name as string) ?? "",
    email: (profile?.email as string) ?? user.email ?? "",
    plan: (profile?.plan as string) ?? "free",
    credits: (profile?.credits as number) ?? 0,
  };
}
