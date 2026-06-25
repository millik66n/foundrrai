/**
 * Paid plan configuration for Stripe checkout + the upgrade credit grant.
 *
 * `amount` is in the currency's smallest unit (e.g. cents). Prices are shown in
 * ₼ in the UI; set STRIPE_CURRENCY (+ amounts) to whatever your Stripe account
 * supports — note AZN may not be available, so this defaults to USD.
 */
export type PaidPlan = "pro" | "max";

export const PLAN_CONFIG: Record<
  PaidPlan,
  { credits: number; amount: number; name: string; priceId?: string }
> = {
  pro: {
    credits: 500,
    amount: 2999,
    name: "Foundrr Pro",
    priceId: process.env.STRIPE_PRICE_PRO,
  },
  max: {
    credits: 1200,
    amount: 9999,
    name: "Foundrr Max",
    priceId: process.env.STRIPE_PRICE_MAX,
  },
};

export const STRIPE_CURRENCY = process.env.STRIPE_CURRENCY ?? "usd";

export function isPaidPlan(value: unknown): value is PaidPlan {
  return value === "pro" || value === "max";
}
