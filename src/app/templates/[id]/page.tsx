import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TemplatePreview } from "@/components/landing/template-preview";
import { getTemplate } from "@/lib/templates";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplate(id);
  return { title: template ? `${template.name} — şablon` : "Şablon" };
}

export default async function TemplatePage({ params }: { params: Params }) {
  const { id } = await params;
  const template = getTemplate(id);
  if (!template) notFound();

  return <TemplatePreview template={template} />;
}
