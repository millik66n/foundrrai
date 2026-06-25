import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Bloom } from "./bloom";
import { Reveal } from "./reveal";

interface Plan {
  name: string;
  price: string;
  period: string;
  features: ReadonlyArray<string>;
  cta: string;
  variant: "accent" | "outline";
  href: string;
  featured?: boolean;
  badge?: string;
}

const PLANS: ReadonlyArray<Plan> = [
  {
    name: "Pulsuz",
    price: "0 ₼",
    period: "",
    features: [
      "100 başlanğıc kredit",
      "Limitsiz önizləmə",
      "Anında redaktə",
      "Bütün şablonlar",
    ],
    cta: "Başla",
    variant: "outline",
    href: "/signup?intent=build",
  },
  {
    name: "Pro",
    price: "29.99 ₼",
    period: "/ay",
    features: [
      "Hər ay 500 kredit",
      "Öz Vercel hesabına yayım",
      "Brendsiz saytlar",
      "Forma bazası (Supabase)",
      "Loqo və media yükləmə",
    ],
    cta: "Pro-ya keç",
    variant: "accent",
    href: "/signup?intent=build",
    featured: true,
    badge: "Ən populyar",
  },
  {
    name: "Max",
    price: "99.99 ₼",
    period: "/ay",
    features: [
      "Hər ay 1200 kredit",
      "Ən güclü AI model",
      "Prioritet qurma sürəti",
      "Ödəniş inteqrasiyası",
      "Prioritet dəstək",
    ],
    cta: "Max-a keç",
    variant: "outline",
    href: "/signup?intent=build",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden px-6 py-[100px]">
      <Bloom
        variant="cta"
        className="pointer-events-none absolute inset-x-0 top-28 -z-10 mx-auto h-[420px] max-w-[820px] opacity-45"
      />

      <div className="mx-auto max-w-[1120px]">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <h2
            className="text-balance font-semibold tracking-tight"
            style={{ fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.1 }}
          >
            Sadə qiymət
          </h2>
          <p className="mt-4 text-[17px] text-muted-foreground">
            Qurmaq pulsuzdur — krediti bitəndə yenilə.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 80}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300",
                  plan.featured
                    ? "border-primary/40 bg-gradient-to-b from-primary/[0.07] to-card shadow-[0_36px_80px_-34px_hsl(var(--primary)/0.5)] lg:-translate-y-3"
                    : "border-border bg-card hover:-translate-y-1 hover:shadow-[0_28px_60px_-36px_hsl(240_22%_13%/0.28)]",
                )}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[12px] font-medium text-primary-foreground shadow-[0_8px_20px_-6px_hsl(var(--primary)/0.7)]">
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className="text-[15px] font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[34px] font-semibold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period ? (
                    <span className="text-[15px] text-muted-foreground">{plan.period}</span>
                  ) : null}
                </div>

                <div className="my-6 h-px bg-border" />

                <ul className="flex flex-1 flex-col gap-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[14px]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/85">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={cn(buttonVariants({ variant: plan.variant }), "mt-8 w-full")}
                >
                  {plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[640px] text-center text-[13px] leading-relaxed text-muted-foreground">
          Foundrr hostinq və ya domen satmır — saytı öz hesabına yayımlayır,
          domenini özün alırsan.
        </p>
      </div>
    </section>
  );
}
