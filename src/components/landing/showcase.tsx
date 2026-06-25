"use client";

import * as React from "react";

import { TEMPLATES } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { Bloom } from "./bloom";
import { BrowserCard } from "./browser-card";
import { Reveal } from "./reveal";

const CATEGORIES = [
  "Hamısı",
  "Klinika",
  "Mağaza",
  "Restoran",
  "Barbershop",
  "İcarə",
  "E-ticarət",
] as const;

export function Showcase() {
  const [active, setActive] = React.useState<string>("Hamısı");
  const items =
    active === "Hamısı" ? TEMPLATES : TEMPLATES.filter((t) => t.tag === active);

  return (
    <section id="showcase" className="relative px-6 py-[120px]">
      <Bloom
        variant="cta"
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[420px] max-w-[820px] opacity-50"
      />

      <div className="mx-auto max-w-[1160px]">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <h2
            className="font-semibold tracking-tight text-foreground"
            style={{ fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.08 }}
          >
            Şablonları kəşf et
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            Hazır bir şablonla başla — bir kliklə remix et, sonra söhbətlə öz
            biznesinə uyğunlaşdır.
          </p>
        </Reveal>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((category) => {
            const on = active === category;
            return (
              <button
                key={category}
                onClick={() => setActive(category)}
                aria-pressed={on}
                className={cn(
                  "inline-flex h-9 items-center rounded-full border px-4 text-[13px] font-medium transition-colors",
                  on
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <BrowserCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
