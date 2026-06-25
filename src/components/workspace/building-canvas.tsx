"use client";

import { Loader2 } from "lucide-react";

import type { Phase } from "@/lib/workspace/build-session";
import { RotatingLabel } from "@/components/workspace/build-log";

const CANVAS_STEPS = [
  "Layihə qurulur…",
  "Komponentlər yazılır…",
  "Stil tətbiq olunur…",
  "Son toxunuşlar…",
];

/** Animated "site building" placeholder shown while planning / building. */
export function BuildingCanvas({ phase }: { phase: Phase }) {
  return (
    <div className="relative flex h-full items-center justify-center p-8">
      <div className="w-full max-w-[680px] overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-40px_hsl(240_22%_13%/0.3)]">
        <div className="relative h-2 overflow-hidden bg-border/50">
          <div
            className="h-full w-1/3 bg-gradient-to-r from-[hsl(var(--grad-blue))] via-[hsl(var(--grad-violet))] to-[hsl(var(--grad-pink))]"
            style={{ animation: "build-shimmer 1.6s ease-in-out infinite" }}
          />
        </div>
        <div className="space-y-4 p-6">
          <div
            className="h-32 rounded-xl"
            style={{
              background:
                "linear-gradient(120deg, hsl(var(--grad-violet)/0.7), hsl(var(--grad-pink)/0.7) 55%, hsl(var(--grad-orange)/0.7))",
              animation: "bloom-drift 6s ease-in-out infinite",
            }}
          />
          <div className="h-4 w-2/3 rounded-full bg-muted" />
          <div className="h-3 w-full rounded-full bg-muted" />
          <div className="h-3 w-5/6 rounded-full bg-muted" />
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="h-16 rounded-lg bg-muted" />
            <div className="h-16 rounded-lg bg-muted" />
            <div className="h-16 rounded-lg bg-muted" />
          </div>
        </div>
      </div>

      <span className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-[13px] text-muted-foreground backdrop-blur">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
        {phase === "thinking" ? (
          "Plan hazırlanır…"
        ) : phase === "plan" ? (
          "Təsdiqini gözləyirəm"
        ) : phase === "building" ? (
          <RotatingLabel steps={CANVAS_STEPS} />
        ) : (
          "—"
        )}
      </span>
    </div>
  );
}
