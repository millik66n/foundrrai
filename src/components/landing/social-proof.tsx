import { Bloom } from "./bloom";
import { Reveal } from "./reveal";

const BRANDS: ReadonlyArray<string> = [
  "Dental Gülüm",
  "Gül Evi",
  "Laləzar",
  "Sahil Rent",
  "Ayla Store",
  "Usta",
];

export function LogosStrip() {
  return (
    <section className="px-6 pb-8 pt-2">
      <div className="mx-auto max-w-[1160px]">
        <p className="text-center text-[13px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">
          Foundrr ilə qurulan bizneslərdən bəziləri
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-[17px] font-semibold tracking-tight text-foreground/40 transition-colors duration-200 hover:text-foreground/75"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "500+", label: "Foundrr ilə qurulan sayt" },
  { value: "50+", label: "hər həftə yeni layihə" },
  { value: "10K+", label: "qurulan saytlara aylıq ziyarət" },
];

export function Stats() {
  return (
    <section className="relative px-6 py-[104px]">
      <Bloom
        variant="cta"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[480px] max-w-[720px] -translate-y-1/2 opacity-50"
      />

      <div className="relative mx-auto max-w-[1160px]">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="font-semibold tracking-tight text-foreground"
              style={{ fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.08 }}
            >
              Minlərlə fikir reallığa çevrilir
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-muted-foreground">
              Foundrr Azərbaycan biznesləri üçün qurulub — və hər gün daha çox
              sahibkar bir cümlədən canlı sayt alır.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 110}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card px-7 py-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_36px_-18px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_28px_60px_-24px_rgba(0,0,0,0.28)]">
                <div
                  className="text-aurora font-semibold leading-none tracking-tight"
                  style={{ fontSize: "clamp(54px, 7vw, 84px)" }}
                >
                  {stat.value}
                </div>
                <p className="mt-5 max-w-[14rem] text-[15px] leading-relaxed text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
