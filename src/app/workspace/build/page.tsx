import { redirect } from "next/navigation";

import { ProjectBuilder } from "@/components/workspace/project-builder";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Qurulur…" };

export default async function BuildPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/workspace/build");

  const { data: profile } = await supabase
    .from("profiles")
    .select("credits, plan")
    .eq("id", user.id)
    .single();

  return (
    <ProjectBuilder credits={profile?.credits ?? 0} plan={(profile?.plan as string) ?? "free"} />
  );
}
