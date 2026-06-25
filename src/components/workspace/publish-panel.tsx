"use client";

import * as React from "react";
import { Check, Copy, ExternalLink, Globe, Loader2, Rocket, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface PublishPanelProps {
  open: boolean;
  onClose: () => void;
  siteId: string | null;
  siteName?: string;
}

export function PublishPanel({ open, onClose, siteId, siteName }: PublishPanelProps) {
  const [connected, setConnected] = React.useState<Record<string, boolean>>({});
  const [publishing, setPublishing] = React.useState(false);
  const [url, setUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setUrl(null);
    setError(null);
    setCopied(false);
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

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        <div className="bloom bloom-cta pointer-events-none absolute -top-10 right-0 -z-10 h-56 w-56 opacity-60" aria-hidden />

        <button
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="p-7">
          {/* header */}
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Rocket className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[19px] font-semibold tracking-tight">Saytı yayımla</h2>
              <p className="text-[13px] text-muted-foreground">
                Öz Vercel hesabına — hosting və domen sənindir.
              </p>
            </div>
          </div>

          {/* site card */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-muted/30 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-muted-foreground">
              <Globe className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium">{siteName || "Yeni sayt"}</p>
              <p className="text-[12px] text-muted-foreground">Yayıma hazırdır</p>
            </div>
          </div>

          {/* connections */}
          <div className="mt-4 space-y-2">
            <StatusRow label="Vercel" sub="Hosting və canlı URL" ok={vercelConnected} />
            <StatusRow label="Supabase" sub="Form bazası (istəyə görə)" ok={!!connected.supabase} />
          </div>

          {/* result */}
          {url ? (
            <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-700">
                <Check className="h-4 w-4" /> Sayt canlıdır 🎉
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate rounded-lg border border-emerald-500/20 bg-card px-3 py-2 font-mono text-[12.5px]">
                  {url.replace(/^https?:\/\//, "")}
                </span>
                <button
                  onClick={copy}
                  aria-label="Kopyala"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Aç"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-colors hover:bg-foreground/90"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-[13px] text-destructive">
              {error}
            </p>
          ) : null}

          {/* CTA */}
          {!url ? (
            <div className="mt-6">
              {vercelConnected ? (
                <button
                  onClick={publish}
                  disabled={publishing}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-semibold text-primary-foreground shadow-[0_14px_30px_-12px_hsl(var(--primary)/0.7)] transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-hover))] disabled:translate-y-0 disabled:opacity-60"
                >
                  {publishing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Yayımlanır…
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" />
                      İndi yayımla
                    </>
                  )}
                </button>
              ) : (
                <a
                  href="/api/connections/vercel/authorize"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                >
                  <svg viewBox="0 0 76 65" aria-hidden className="h-3.5 w-3.5 fill-current">
                    <path d="M37.53 0 75.06 65H0z" />
                  </svg>
                  Əvvəlcə Vercel-i qoş
                </a>
              )}
            </div>
          ) : null}

          <p className="mt-3 text-center text-[12px] leading-relaxed text-muted-foreground">
            {url
              ? "Domen almaq üçün istənilən registratordan al və Vercel-də bağla."
              : "Hesabları Parametrlər → Bağlantılar bölməsindən də qoşa bilərsən."}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, sub, ok }: { label: string; sub: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5">
      <div>
        <p className="text-[13px] font-medium">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
          ok ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground",
        )}
      >
        {ok ? <Check className="h-3.5 w-3.5" /> : null}
        {ok ? "Qoşuldu" : "Qoşulmayıb"}
      </span>
    </div>
  );
}
