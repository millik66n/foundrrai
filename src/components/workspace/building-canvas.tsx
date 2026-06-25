"use client";

import { History, Loader2 } from "lucide-react";

import type { Phase } from "@/lib/workspace/build-session";
import { RotatingLabel } from "@/components/workspace/build-log";

const CANVAS_STEPS = [
  "Layihə qurulur…",
  "Komponentlər yazılır…",
  "Bölmələr birləşdirilir…",
  "Stil tətbiq olunur…",
  "Şəkillər yerləşdirilir…",
  "Son toxunuşlar…",
];

const SkeletonLine = ({ w }: { w: string }) => (
  <div className={`h-3 rounded-full bg-muted ${w}`} />
);

/**
 * Lovable-style "generating" canvas: a calm "Hazırlanır…" pill over an elegant
 * stacked browser-window mockup with a soft shimmer — no loud gradients.
 */
export function BuildingCanvas({ phase }: { phase: Phase }) {
  const pill =
    phase === "thinking"
      ? "Plan hazırlanır…"
      : phase === "plan"
        ? "Təsdiqini gözləyirəm"
        : "Hazırlanır…";

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden p-8">
      <div className="bloom bloom-cta pointer-events-none absolute -z-10 h-[480px] w-[680px] opacity-50" aria-hidden />

      {/* "Getting ready" pill */}
      <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground shadow-sm backdrop-blur">
        {phase === "plan" ? (
          <History className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
        )}
        {pill}
      </span>

      {/* Stacked browser mockup */}
      <div className="relative w-full max-w-[600px]">
        {/* depth cards behind the main frame */}
        <div className="absolute -top-5 left-1/2 h-full w-[84%] -translate-x-1/2 rounded-[20px] border border-border bg-card/40" aria-hidden />
        <div className="absolute -top-2.5 left-1/2 h-full w-[92%] -translate-x-1/2 rounded-[20px] border border-border bg-card/60" aria-hidden />

        <div className="relative overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_40px_90px_-50px_hsl(240_22%_13%/0.35)]">
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-foreground/12" />
              <span className="h-3 w-3 rounded-full bg-foreground/12" />
              <span className="h-3 w-3 rounded-full bg-foreground/12" />
            </span>
            <span className="mx-auto h-5 w-1/2 rounded-full bg-background" />
            <span className="h-5 w-9" aria-hidden />
          </div>

          {/* skeleton body with a sweeping shimmer */}
          <div className="relative">
            <div className="space-y-5 p-7">
              {/* hero band */}
              <div className="relative h-36 overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50">
                <div className="absolute left-6 top-6 space-y-2.5">
                  <div className="h-5 w-44 rounded-full bg-foreground/[0.07]" />
                  <div className="h-3 w-56 rounded-full bg-foreground/[0.05]" />
                  <div className="mt-4 h-8 w-28 rounded-lg bg-foreground/[0.08]" />
                </div>
              </div>
              <SkeletonLine w="w-1/3" />
              <SkeletonLine w="w-full" />
              <SkeletonLine w="w-5/6" />
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="h-20 rounded-xl bg-muted" />
                <div className="h-20 rounded-xl bg-muted" />
                <div className="h-20 rounded-xl bg-muted" />
              </div>
            </div>

            {/* moving sheen */}
            <div
              className="pointer-events-none absolute inset-y-0 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.45), transparent)",
                animation: "build-shimmer 1.8s ease-in-out infinite",
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* status line */}
      <div className="mt-7 flex items-center gap-2 text-[13px] text-muted-foreground">
        {phase === "building" ? (
          <>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <RotatingLabel steps={CANVAS_STEPS} />
          </>
        ) : phase === "plan" ? (
          "Sol paneldə planı təsdiqlə — sayt qurulsun."
        ) : (
          "Bir az gözlə, ən yaxşısını hazırlayıram."
        )}
      </div>
    </div>
  );
}
