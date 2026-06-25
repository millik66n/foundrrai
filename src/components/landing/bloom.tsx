import { cn } from "@/lib/utils";

type BloomVariant = "hero" | "cta" | "closing";

interface BloomProps {
  variant?: BloomVariant;
  className?: string;
}

const VARIANT_CLASS: Record<BloomVariant, string> = {
  hero: "bloom-hero",
  cta: "bloom-cta",
  closing: "bloom-closing",
};

/** Decorative vivid gradient — the signature mood behind the hero, closing CTA + footer. */
export function Bloom({ variant = "hero", className }: BloomProps) {
  return (
    <div aria-hidden className={cn("bloom", VARIANT_CLASS[variant], className)} />
  );
}
