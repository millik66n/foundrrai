"use client";

import * as React from "react";
import { Check, ExternalLink, Loader2, Rocket, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface PublishPanelProps {
  open: boolean;
  onClose: () => void;
  siteId: string | null;
}

export function PublishPanel({ open, onClose, siteId }: PublishPanelProps) {
  const [connected, setConnected] = React.useState<Record<string, boolean>>({});
  const [publishing, setPublishing] = React.useState(false);
  const [url, setUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setUrl(null);
    setError(null);
    fetch("/api/connections")
      .then((r) => r.json())
      .then((d: { connections?: { provider: string }[] }) => {
        const map: Record<string, boolean> = {};
        for (const c of d.connections ?? []) map[c.provider] = true;
        setConnected(map);
      })
      .catch(() => {});
  }, [open]);

  if (!open) return null;

  const vercelConnected = !!connected.vercel;

  const publish = async () => {
    if (!siteId) return;
    setPublishing(true);
    setError(null);
    setUrl(null);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      });
      const data = await res.json();
      if (res.ok && data.url) setUrl(data.url);
      else setError(data.error ?? "Yayımlama alınmadı.");
    } catch {
      setError("Yayımlama alınmadı.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        <button
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <h2 className="text-[20px] font-semibold tracking-tight">Saytı yayımla</h2>
        <p className="mt-1 text-[14px] text-muted-foreground">
          Saytın öz Vercel hesabına yayımlanır — domen və hosting sənindir.
        </p>

        <div className="mt-5 space-y-2">
          <StatusRow label="Vercel — hosting" ok={vercelConnected} />
          <StatusRow label="Supabase — baza (istəyə görə)" ok={!!connected.supabase} />
        </div>

        {url ? (
          <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-600">
              <Check className="h-4 w-4" /> Yayımlandı
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground underline-offset-4 hover:underline"
            >
              {url.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-[13px] text-destructive">
            {error}
          </p>
        ) : null}

        <div className="mt-6">
          {vercelConnected ? (
            <button
              onClick={publish}
              disabled={publishing}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-medium text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90 disabled:opacity-50"
            >
              {publishing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Yayımlanır…
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4" />
                  Yayımla
                </>
              )}
            </button>
          ) : (
            <a
              href="/api/connections/vercel/authorize"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-medium text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
            >
              Vercel ilə qoşul
            </a>
          )}
        </div>

        <p className="mt-3 text-center text-[12px] text-muted-foreground">
          Hesabları Parametrlər → Bağlantılar bölməsindən də qoşa bilərsən.
        </p>
      </div>
    </div>
  );
}

function StatusRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3.5 py-2.5">
      <span className="text-[13px]">{label}</span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-[12px] font-medium",
          ok ? "text-emerald-600" : "text-muted-foreground",
        )}
      >
        {ok ? <Check className="h-3.5 w-3.5" /> : null}
        {ok ? "Qoşuldu" : "Qoşulmayıb"}
      </span>
    </div>
  );
}
