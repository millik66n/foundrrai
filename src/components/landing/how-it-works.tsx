"use client";

import * as React from "react";
import { ArrowUp, Check, Loader2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { TemplateSite } from "@/components/templates/template-site";
import { Bloom } from "./bloom";
import { Reveal } from "./reveal";
import { SitePreview } from "./site-preview";

const STEPS = [
  {
    title: "Fikrini təsvir et",
    body: 'Biznesini bir cümlə ilə yaz — "Bakıda diş klinikası üçün sayt". Azərbaycan dilində, öz sözlərinlə.',
  },
  {
    title: "Canlı qurulmasına bax",
    body: "Foundrr saniyələr içində tam işlək saytı yaradır və sən onun real vaxtda qurulmasını izləyirsən.",
  },
  {
    title: "Öz hesabına yayımla",
    body: "Bir kliklə öz Vercel hesabına yayımla, bazanı Supabase-ə qoş — sayt tamamilə sənindir.",
  },
];

const CYCLE_MS = 3400;

export function HowItWorks() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section id="how" className="px-6 py-[104px]">
      <div className="mx-auto max-w-[1120px]">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <h2
            className="font-semibold tracking-tight"
            style={{ fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.08 }}
          >
            Necə işləyir
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            Bir cümlədən canlı sayta — üç sadə addımda.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal className="order-1">
            <Stage active={active} />
          </Reveal>

          <ol className="order-2 flex flex-col gap-2">
            {STEPS.map((step, i) => {
              const on = i === active;
              return (
                <li key={step.title}>
                  <button
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className={cn(
                      "flex w-full gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                      on
                        ? "border-border bg-card shadow-[0_18px_44px_-30px_hsl(240_22%_13%/0.25)]"
                        : "border-transparent hover:bg-card/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-[13px] font-semibold transition-colors",
                        on
                          ? "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_hsl(var(--primary)/0.6)]"
                          : "border border-border bg-card text-muted-foreground",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "text-[17px] font-semibold tracking-tight transition-colors",
                          on ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1.5 text-[14px] leading-relaxed transition-colors",
                          on ? "text-foreground/75" : "text-muted-foreground/55",
                        )}
                      >
                        {step.body}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

const layer = (on: boolean) =>
  cn(
    "absolute inset-0 transition-opacity duration-500",
    on ? "opacity-100" : "pointer-events-none opacity-0",
  );

/** Browser-framed stage that cycles through the three states of the flow. */
function Stage({ active }: { active: number }) {
  const pill = active === 0 ? "yeni layihə" : active === 1 ? "önizləmə" : "artandsmile.az";

  return (
    <div className="relative mx-auto max-w-[560px]">
      <div className="pointer-events-none absolute -inset-10 -z-10 opacity-70">
        <Bloom variant="cta" />
      </div>

      <div className="rounded-[28px] border border-border bg-gradient-to-b from-card to-muted/60 p-3.5 shadow-[0_40px_90px_-40px_hsl(28_22%_14%/0.30)] sm:p-5">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_50px_-30px_hsl(28_22%_14%/0.28)]">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3.5 py-3">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
              <span className="h-3 w-3 rounded-full bg-foreground/15" />
            </span>
            <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-background px-3.5 py-1 font-mono text-[11px] text-muted-foreground">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  active === 2 ? "bg-emerald-500" : "bg-[hsl(var(--grad-violet))]",
                )}
              />
              {pill}
            </span>
            <span className="w-[42px]" aria-hidden />
          </div>

          {/* viewport — three crossfading states */}
          <div className="relative aspect-[16/10] overflow-hidden bg-white">
            <PromptState on={active === 0} />
            <BuildingState on={active === 1} />
            <PublishedState on={active === 2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PromptState({ on }: { on: boolean }) {
  return (
    <div className={cn(layer(on), "flex items-center justify-center bg-muted/40 p-6")}>
      <div className="w-full max-w-[420px]">
        <p className="mb-3 text-center text-[13px] font-medium text-muted-foreground">
          Nə qurmaq istəyirsən?
        </p>
        <div className="rounded-2xl border border-border bg-card p-3 shadow-[0_18px_40px_-28px_hsl(240_22%_13%/0.25)]">
          <p className="px-1 py-1 text-[14px] text-foreground">
            Bakıda diş klinikası üçün sayt
            <span className="ml-0.5 inline-block h-[14px] w-[2px] translate-y-[2px] animate-pulse bg-primary align-middle" />
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground">
              <Plus className="h-4 w-4" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
              <ArrowUp className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildingState({ on }: { on: boolean }) {
  return (
    <div className={cn(layer(on), "bg-white")}>
      <div className="relative h-1.5 overflow-hidden bg-border/60">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-[hsl(var(--grad-blue))] via-[hsl(var(--grad-violet))] to-[hsl(var(--grad-pink))]"
          style={{ animation: "build-shimmer 1.6s ease-in-out infinite" }}
        />
      </div>
      <div className="space-y-3 p-5">
        <div
          className="h-20 rounded-xl"
          style={{
            background:
              "linear-gradient(120deg, hsl(var(--grad-violet)/0.7), hsl(var(--grad-pink)/0.7) 55%, hsl(var(--grad-orange)/0.7))",
          }}
        />
        <div className="h-3 w-2/3 rounded-full bg-muted" />
        <div className="h-2.5 w-full rounded-full bg-muted" />
        <div className="h-2.5 w-5/6 rounded-full bg-muted" />
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="h-12 rounded-lg bg-muted" />
          <div className="h-12 rounded-lg bg-muted" />
          <div className="h-12 rounded-lg bg-muted" />
        </div>
      </div>
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--foreground)/0.78)] px-2.5 py-1 font-mono text-[10px] text-background backdrop-blur-sm">
        <Loader2 className="h-3 w-3 animate-spin" />
        Qurulur…
      </span>
    </div>
  );
}

function PublishedState({ on }: { on: boolean }) {
  return (
    <div className={layer(on)}>
      <SitePreview>
        <TemplateSite id="clinic" />
      </SitePreview>
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
        <Check className="h-3 w-3" />
        Yayımlandı · artandsmile.az
      </span>
    </div>
  );
}
