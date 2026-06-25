import { Reveal } from "./reveal";

const ITEMS: ReadonlyArray<{ label: string; body: string }> = [
  {
    label: "Tam Azərbaycan dilində",
    body: "Mətn də, dizayn da yerli — tərcümə hiss olunmur.",
  },
  {
    label: "Öz hesabına yayım",
    body: "Vercel-ə bir kliklə. Sayt tamamilə sənin, kilid yoxdur.",
  },
  {
    label: "Forma & ödəniş bazası",
    body: "Sifariş və rezervasiyalar Supabase-ə düşür.",
  },
  {
    label: "Anında dəyişiklik",
    body: "Bir cümlə yaz — sayt dərhal yenilənir.",
  },
];

export function WhyFoundrr() {
  return (
    <section className="px-6 py-[84px]">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {ITEMS.map((item) => (
                <div key={item.label} className="bg-card p-6">
                  <h3 className="text-[15px] font-semibold">{item.label}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
