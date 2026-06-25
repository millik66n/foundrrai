"use client";

import * as React from "react";
import {
  Check,
  CreditCard,
  Link2,
  Loader2,
  LogOut,
  Settings,
  Shield,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Tab = "account" | "plan" | "connections" | "privacy";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
  plan: string;
  credits: number;
  initialTab?: Tab;
  onUpgraded: (plan: string, credits: number) => void;
  onSignOut: () => void;
}

const NAV: ReadonlyArray<{ id: Tab; label: string; icon: typeof User }> = [
  { id: "account", label: "Hesab", icon: User },
  { id: "plan", label: "Plan və kredit", icon: CreditCard },
  { id: "connections", label: "Bağlantılar", icon: Link2 },
  { id: "privacy", label: "Məxfilik", icon: Shield },
];

const PLAN_LABEL: Record<string, string> = {
  free: "Pulsuz",
  pro: "Pro",
  max: "Max",
};

export function SettingsModal({
  open,
  onClose,
  name,
  email,
  plan,
  credits,
  initialTab = "account",
  onUpgraded,
  onSignOut,
}: SettingsModalProps) {
  const [tab, setTab] = React.useState<Tab>(initialTab);
  const [displayName, setDisplayName] = React.useState(name);
  const [savingName, setSavingName] = React.useState(false);
  const [nameSaved, setNameSaved] = React.useState(false);
  const [upgrading, setUpgrading] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const initial = (name || email || "?").charAt(0).toUpperCase();

  const saveName = async () => {
    setSavingName(true);
    setNameSaved(false);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({ name: displayName }).eq("id", user.id);
        setNameSaved(true);
      }
    } finally {
      setSavingName(false);
    }
  };

  const upgrade = async (target: "pro" | "max") => {
    setUpgrading(target);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: target }),
      });
      const data = await res.json();
      if (data.url) {
        // Stripe is configured → go to Checkout.
        window.location.href = data.url;
        return;
      }
      if (res.ok && data.simulated) onUpgraded(data.plan, data.credits);
    } finally {
      setUpgrading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative flex h-[min(640px,92vh)] w-full max-w-[880px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        {/* left nav */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-muted/30 p-4 sm:flex">
          <div className="flex items-center gap-2 px-2 pb-4 text-[13px] font-semibold">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Parametrlər
          </div>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[14px] transition-colors",
                tab === item.id
                  ? "bg-card font-medium text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* content */}
        <div className="relative flex-1 overflow-y-auto p-8">
          <button
            onClick={onClose}
            aria-label="Bağla"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {tab === "account" ? (
            <div className="max-w-[460px]">
              <h2 className="text-[20px] font-semibold tracking-tight">Hesab</h2>
              <p className="mt-1 text-[14px] text-muted-foreground">
                Profil məlumatlarını idarə et.
              </p>

              <div className="mt-7 flex items-center gap-4">
                <span className="brand-mark flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-semibold text-white">
                  {initial}
                </span>
                <div>
                  <p className="text-[15px] font-medium">{name || "İstifadəçi"}</p>
                  <p className="text-[13px] text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="mt-7">
                <label className="text-[13px] font-medium text-muted-foreground">
                  Görünən ad
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setNameSaved(false);
                    }}
                    className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-[14px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
                  />
                  <button
                    onClick={saveName}
                    disabled={savingName || displayName.trim() === name}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-foreground px-4 text-[14px] font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-40"
                  >
                    {savingName ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : nameSaved ? (
                      <Check className="h-4 w-4" />
                    ) : null}
                    {nameSaved ? "Saxlanıldı" : "Yadda saxla"}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-[13px] font-medium text-muted-foreground">
                  E-poçt
                </label>
                <p className="mt-2 flex h-10 items-center rounded-xl border border-border bg-muted/40 px-3 text-[14px] text-muted-foreground">
                  {email}
                </p>
              </div>
            </div>
          ) : null}

          {tab === "plan" ? (
            <PlanTab plan={plan} credits={credits} upgrading={upgrading} onUpgrade={upgrade} />
          ) : null}

          {tab === "connections" ? <ConnectionsTab /> : null}

          {tab === "privacy" ? (
            <div className="max-w-[460px]">
              <h2 className="text-[20px] font-semibold tracking-tight">
                Məxfilik və təhlükəsizlik
              </h2>
              <p className="mt-1 text-[14px] text-muted-foreground">
                Hesabın və seansın.
              </p>
              <button
                onClick={onSignOut}
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-[14px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Çıxış et
              </button>
              <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
                Məlumatların təhlükəsiz saxlanılır. Provayder açarların (Vercel,
                Netlify, Supabase) şifrələnir və yalnız server tərəfində istifadə olunur.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PlanTab({
  plan,
  credits,
  upgrading,
  onUpgrade,
}: {
  plan: string;
  credits: number;
  upgrading: string | null;
  onUpgrade: (target: "pro" | "max") => void;
}) {
  const showPro = plan === "free";
  const showMax = plan !== "max";

  return (
    <div className="max-w-[520px]">
      <h2 className="text-[20px] font-semibold tracking-tight">Plan və kredit</h2>
      <p className="mt-1 text-[14px] text-muted-foreground">
        Cari planın və kredit balansın.
      </p>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-5">
        <div>
          <p className="text-[13px] text-muted-foreground">Cari plan</p>
          <p className="mt-1 text-[18px] font-semibold">{PLAN_LABEL[plan] ?? plan}</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] text-muted-foreground">Kredit</p>
          <p className="mt-1 font-mono text-[18px] font-semibold tabular-nums">{credits}</p>
        </div>
      </div>

      {showPro || showMax ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {showPro ? (
            <PlanUpgradeCard
              name="Pro"
              price="29.99 ₼/ay"
              perk="+500 kredit / ay"
              loading={upgrading === "pro"}
              onClick={() => onUpgrade("pro")}
            />
          ) : null}
          {showMax ? (
            <PlanUpgradeCard
              name="Max"
              price="99.99 ₼/ay"
              perk="+1200 kredit / ay"
              loading={upgrading === "max"}
              onClick={() => onUpgrade("max")}
              featured
            />
          ) : null}
        </div>
      ) : (
        <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-[14px]">
          <Check className="h-4 w-4 text-primary" />
          Ən yüksək plandasan.
        </p>
      )}

      <p className="mt-4 text-[12px] text-muted-foreground">
        Qeyd: hazırda yüksəltmə ödənişsiz simulyasiyadır — kredit dərhal əlavə olunur.
      </p>
    </div>
  );
}

function PlanUpgradeCard({
  name,
  price,
  perk,
  loading,
  onClick,
  featured,
}: {
  name: string;
  price: string;
  perk: string;
  loading: boolean;
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border p-5",
        featured ? "border-primary/60 bg-primary/[0.03]" : "border-border",
      )}
    >
      <p className="text-[15px] font-semibold">{name}</p>
      <p className="mt-1 text-[13px] text-muted-foreground">{price}</p>
      <p className="mt-3 flex items-center gap-1.5 text-[13px] text-foreground/80">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        {perk}
      </p>
      <button
        onClick={onClick}
        disabled={loading}
        className={cn(
          "mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl text-[14px] font-medium transition-all disabled:opacity-50",
          featured
            ? "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-hover))]"
            : "bg-foreground text-background hover:bg-foreground/90",
        )}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {name}-a keç
      </button>
    </div>
  );
}

function ConnectionsTab() {
  const [connected, setConnected] = React.useState<Record<string, boolean>>({});
  const [vercel, setVercel] = React.useState("");
  const [supaRef, setSupaRef] = React.useState("");
  const [supaToken, setSupaToken] = React.useState("");
  const [saving, setSaving] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/connections")
      .then((r) => r.json())
      .then((d: { connections?: { provider: string }[] }) => {
        const map: Record<string, boolean> = {};
        for (const c of d.connections ?? []) map[c.provider] = true;
        setConnected(map);
      })
      .catch(() => {});
  }, []);

  const save = async (
    provider: string,
    token: string,
    meta?: Record<string, unknown>,
  ) => {
    if (!token.trim()) return;
    setSaving(provider);
    try {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, token, meta }),
      });
      if (res.ok) {
        setConnected((c) => ({ ...c, [provider]: true }));
        if (provider === "vercel") setVercel("");
        if (provider === "supabase") setSupaToken("");
      }
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="max-w-[520px]">
      <h2 className="text-[20px] font-semibold tracking-tight">Bağlantılar</h2>
      <p className="mt-1 text-[14px] text-muted-foreground">
        Saytını öz hesabına yayımlamaq üçün hesablarını qoş. Açarlar şifrələnir.
      </p>

      <div className="mt-6 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <svg viewBox="0 0 76 65" aria-hidden className="h-3.5 w-3.5 fill-current">
              <path d="M37.53 0 75.06 65H0z" />
            </svg>
            Vercel
          </span>
          {connected.vercel ? (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Qoşuldu
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Saytın öz Vercel hesabına yayımlanır — canlı URL alırsan.
        </p>
        <a
          href="/api/connections/vercel/authorize"
          className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <svg viewBox="0 0 76 65" aria-hidden className="h-3.5 w-3.5 fill-current">
            <path d="M37.53 0 75.06 65H0z" />
          </svg>
          Vercel ilə qoşul
        </a>
        <p className="mt-3 text-[11px] text-muted-foreground">və ya token ilə qoş:</p>
        <div className="mt-2 flex gap-2">
          <input
            type="password"
            value={vercel}
            onChange={(e) => setVercel(e.target.value)}
            placeholder="vercel_…"
            className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
          />
          <SaveBtn loading={saving === "vercel"} onClick={() => save("vercel", vercel)} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold">Supabase</span>
          {connected.supabase ? (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Qoşuldu
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Form məlumatları üçün baza. supabase.com/dashboard/account/tokens.
        </p>
        <input
          value={supaRef}
          onChange={(e) => setSupaRef(e.target.value)}
          placeholder="Layihə ref (məs: abcd1234efgh)"
          className="mt-3 h-10 w-full rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
        />
        <div className="mt-2 flex gap-2">
          <input
            type="password"
            value={supaToken}
            onChange={(e) => setSupaToken(e.target.value)}
            placeholder="sbp_…"
            className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-[13px] outline-none focus:border-[hsl(var(--ring)/0.5)]"
          />
          <SaveBtn
            loading={saving === "supabase"}
            onClick={() => save("supabase", supaToken, { ref: supaRef.trim() })}
          />
        </div>
      </div>

      <p className="mt-4 text-[12px] text-muted-foreground">
        Açarlar şifrələnmiş şəkildə, yalnız server tərəfində saxlanılır.
      </p>
    </div>
  );
}

function SaveBtn({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-foreground px-4 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Qoş
    </button>
  );
}
