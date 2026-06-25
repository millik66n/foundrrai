import { redirect } from "next/navigation";

import { WorkspaceShell } from "@/components/workspace/workspace-shell";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "İş sahəsi" };

export default async function WorkspacePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/workspace");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, credits, plan")
    .eq("id", user.id)
    .single();

  const name =
    profile?.name?.trim() || user.email?.split("@")[0] || "dostum";

  return (
    <WorkspaceShell
      name={name}
      email={user.email ?? ""}
      credits={profile?.credits ?? 0}
      plan={profile?.plan ?? "free"}
    />
  );
}
