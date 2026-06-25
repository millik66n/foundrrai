"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, Rocket, Sparkles, Upload, X } from "lucide-react";

interface UpgradeTourProps {
  open: boolean;
  onClose: () => void;
  plan: string;
  granted: number;
}

const PLAN_LABEL: Record<string, string> = { pro: "Pro", max: "Max" };

const STEPS = [
  {
    icon: MessageSquare,
    title: "Daha çox sayt qur və redaktə et",
    body: "Yeni kreditlərinlə daha çox sayt yarat və söhbət edərək istədiyin qədər dəyişiklik et.",
  },
  {
    icon: Upload,
    title: "Loqo və media yüklə",
    body: "“+” düyməsi ilə loqonu və ya sənədləri əlavə et — sayt onlara uyğun qurulsun.",
  },
  {
    icon: Rocket,
    title: "Öz hesabına yayımla",
    body: "Hazır saytı öz Vercel hesabına yayımla, bazanı Supabase-ə qoş — sayt tamamilə sənindir.",
  },
];

/** Celebratory "what you can do now" tour shown right after an upgrade. */
export function UpgradeTour({ open, onClose, plan, granted }: UpgradeTourProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_hsl(240_22%_13%/0.5)]">
        <div className="bloom bloom-cta -z-10 opacity-70" aria-hidden />
        <button
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="p-7">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[12px] font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {PLAN_LABEL[plan] ?? plan} aktiv edildi
          </span>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.1 }}
          >
            Təbriklər! Artıq {PLAN_LABEL[plan] ?? plan} plandasan
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Hesabına <span className="font-semibold text-foreground">+{granted} kredit</span>{" "}
            əlavə olundu. Budur indi nə edə bilərsən:
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            {STEPS.map((step) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-primary">
                  <step.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-[14px] font-medium">{step.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/workspace"
            onClick={onClose}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-medium text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
          >
            Sayt qurmağa başla
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
