"use client";

import { History, Loader2 } from "lucide-react";

import type { Phase } from "@/lib/workspace/build-session";
import { RotatingLabel } from "@/components/workspace/build-log";

const CANVAS_STEPS = [
  "Layihə hazırlanır…",
  "Paketlər yüklənir…",
  "Komponentlər yazılır…",
  "Bölmələr birləşdirilir…",
  "Stil tətbiq olunur…",
  "Şəkillər yerləşdirilir…",
  "Son toxunuşlar…",
];

/**
 * Clean "generating" canvas: a calm browser frame (the tab visuals) with a
 * gradient progress bar + a live status line of what's happening right now.
 */
export function BuildingCanvas({ phase }: { phase: Phase }) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-8">
      <div
        className="bloom bloom-cta pointer-events-none absolute -z-10 h-[420px] w-[620px] opacity-40"
        aria-hidden
      />

      <div className="w-full max-w-[600px] overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_40px_90px_-50px_hsl(240_22%_13%/0.35)]">
        {/* browser chrome — the tab visuals */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-foreground/12" />
            <span className="h-3 w-3 rounded-full bg-foreground/12" />
            <span className="h-3 w-3 rounded-full bg-foreground/12" />
          </span>
          <span className="mx-auto h-5 w-1/2 rounded-full bg-background" />
          <span className="h-5 w-9" aria-hidden />
        </div>

        {/* what it's doing right now */}
        <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 p-10">
          {phase === "plan" ? (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <History className="h-5 w-5" />
              </span>
              <p className="text-[14px] font-medium">Təsdiqini gözləyirəm</p>
              <p className="text-center text-[13px] text-muted-foreground">
                Sol paneldə planı təsdiqlə — sayt qurulsun.
              </p>
            </>
          ) : (
            <>
              <div className="relative h-1.5 w-48 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-[hsl(var(--grad-blue))] via-[hsl(var(--grad-violet))] to-[hsl(var(--grad-pink))]"
                  style={{ animation: "build-shimmer 1.6s ease-in-out infinite" }}
                />
              </div>
              <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                {phase === "building" ? (
                  <RotatingLabel steps={CANVAS_STEPS} />
                ) : (
                  "Plan hazırlanır…"
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
