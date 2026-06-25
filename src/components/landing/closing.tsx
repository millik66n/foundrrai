import Link from "next/link";

import { Bloom } from "./bloom";
import { PromptBox } from "./prompt-box";
import { Reveal } from "./reveal";

const COLUMNS: ReadonlyArray<{
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    heading: "Məhsul",
    links: [
      { label: "Necə işləyir", href: "/#how" },
      { label: "Nümunələr", href: "/#showcase" },
      { label: "Şablonlar", href: "/#showcase" },
      { label: "Qiymət", href: "/#pricing" },
    ],
  },
  {
    heading: "Şirkət",
    links: [
      { label: "Haqqında", href: "/haqqinda" },
      { label: "Bloq", href: "/bloq" },
      { label: "Karyera", href: "/karyera" },
      { label: "Əlaqə", href: "/elaqe" },
    ],
  },
  {
    heading: "Resurslar",
    links: [
      { label: "Sənədlər", href: "/senedler" },
      { label: "Bələdçi", href: "/beledci" },
      { label: "Dəstək", href: "/destek" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    heading: "Hüquqi",
    links: [
      { label: "Şərtlər", href: "/sertler" },
      { label: "Məxfilik", href: "/mexfilik" },
      { label: "Cookie", href: "/cookie" },
    ],
  },
];

/**
 * The closing zone — the "Qurmağa hazırsan?" CTA and the footer share ONE
 * vivid gradient; the footer is a cream rounded card floating on it, with the
 * gradient bleeding out around its edges (Lovable's closing pattern).
 */
export function Closing() {
  return (
    <section className="relative overflow-hidden">
      <Bloom variant="closing" />

      <div className="relative z-10">
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center px-6 pb-24 pt-[120px] text-center">
          <h2
            className="mt-3 text-balance font-semibold tracking-tight"
            style={{ fontSize: "clamp(30px, 4.2vw, 50px)", lineHeight: 1.04 }}
          >
            Qurmağa hazırsan?
          </h2>
          <p className="mt-4 text-[16px] text-muted-foreground">
            Bir cümlə yaz, qalanını Foundrr etsin.
          </p>
          <div className="mt-9 w-full">
            <PromptBox showChips={false} />
          </div>
        </Reveal>

        <footer className="relative mx-3 overflow-hidden rounded-t-[32px] border border-b-0 border-border bg-card/95 px-6 pb-10 pt-14 shadow-[0_-24px_70px_-34px_hsl(240_22%_13%/0.28)] backdrop-blur-xl sm:mx-6 lg:mx-10">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--grad-violet))] to-transparent opacity-70"
          />
          <div className="mx-auto max-w-[1120px]">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 font-semibold tracking-tight">
                  <span className="brand-mark h-6 w-6 rounded-[7px]" />
                  <span className="text-[17px]">Foundrr</span>
                </div>
                <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-muted-foreground">
                  Azərbaycan üçün AI sayt qurucusu. Fikrindən hazır sayta.
                </p>
                <p className="mt-3 max-w-[280px] text-[12px] leading-relaxed text-muted-foreground/75">
                  Foundrr hostinq və ya domen satmır — saytı öz hesabına
                  yayımlayır, domenini özün alırsan.
                </p>
              </div>

              {COLUMNS.map((column) => (
                <div key={column.heading}>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wide text-foreground/55">
                    {column.heading}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-block text-[14px] text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 Foundrr</span>
              <span className="flex items-center gap-2.5">
                Bakı, Azərbaycan
                <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                  AZ
                </span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
