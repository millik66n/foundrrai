import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Bloom } from "@/components/landing/bloom";
import { Closing } from "@/components/landing/closing";
import { SiteNav } from "@/components/landing/site-nav";
import { getNavUser } from "@/lib/auth";
import { PAGE_SLUGS, getPage } from "@/lib/pages";

export function generateStaticParams() {
  return PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  return { title: page ? `${page.title} — Foundrr` : "Foundrr" };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();
  const user = await getNavUser();

  return (
    <>
      <SiteNav user={user} />
      <main className="relative overflow-hidden">
        <section className="relative px-6 pb-16 pt-[140px]">
          <Bloom variant="cta" />
          <div className="relative z-10 mx-auto max-w-[760px]">
            <h1
              className="text-balance font-semibold tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05 }}
            >
              {page.title}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
              {page.subtitle}
            </p>
          </div>
        </section>

        <section className="px-6 pb-[100px]">
          <div className="mx-auto max-w-[760px] space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-[20px] font-semibold tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Closing />
    </>
  );
}
