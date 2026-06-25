import { Bloom } from "./bloom";
import { PromptBox } from "./prompt-box";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-[170px]">
      <Bloom variant="hero" />
      {/* fade the gradient into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-b from-transparent to-background" />

      <div className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center text-center">
        <h1
          className="animate-fade-up text-balance font-semibold tracking-tight"
          style={{
            animationDelay: "200ms",
            fontSize: "clamp(40px, 6.5vw, 74px)",
            lineHeight: 1.03,
          }}
        >
          Fikrini yaz.
          <br />
          <span className="text-aurora">Saytın hazır olsun.</span>
        </h1>

        <p
          className="animate-fade-up mt-5 max-w-[540px] text-[16px] leading-relaxed text-muted-foreground"
          style={{ animationDelay: "320ms" }}
        >
          Azərbaycan üçün AI sayt qurucusu. Bir cümlə yaz — dəqiqələr içində hazır
          sayt. Öz hesabına yayımla, tam sənin olsun.
        </p>

        <div
          className="animate-fade-up mt-10 w-full"
          style={{ animationDelay: "440ms" }}
        >
          <PromptBox />
        </div>

        <p
          className="animate-fade-up mt-8 text-sm text-muted-foreground"
          style={{ animationDelay: "560ms" }}
        >
          <span className="font-semibold text-foreground">500+</span> biznes dünya
          üzrə Foundrr ilə qurur.
        </p>
      </div>
    </section>
  );
}
