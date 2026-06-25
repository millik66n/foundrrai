import { Bloom } from "./bloom";
import { PromptBox } from "./prompt-box";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-[120px]">
      <Bloom variant="cta" />

      <Reveal className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center text-center">
        <span className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
          AI Sayt Qurucusu
        </span>
        <h2
          className="mt-3 text-balance font-semibold tracking-tight"
          style={{ fontSize: "clamp(30px, 4vw, 46px)", lineHeight: 1.05 }}
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
    </section>
  );
}
