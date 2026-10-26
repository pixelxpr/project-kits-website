/** Public Instant / made-to-order pricing (INR). */

/**
 * Base package price — set via Vercel env so you can use ₹1 for live tests.
 * Prefer NEXT_PUBLIC_BASE_PRICE_INR so UI and Razorpay stay in sync.
 * (NEXT_PUBLIC_BOOKING_FEE_INR is the old ₹49 booking hold — not used for package checkout.)
 */
function parseBasePriceInr(): number {
  const raw =
    process.env.NEXT_PUBLIC_BASE_PRICE_INR ??
    process.env.BASE_PRICE_INR ??
    "999";
  const n = Number.parseInt(String(raw).trim(), 10);
  return Number.isFinite(n) && n >= 1 ? n : 999;
}

export const BASE_PRICE_INR = parseBasePriceInr();

export type AddonId = "customize" | "viva" | "install" | "explain";

export type PricingAddon = {
  id: AddonId;
  name: string;
  priceInr: number;
  description: string;
};

export const PRICING_ADDONS: PricingAddon[] = [
  {
    id: "customize",
    name: "Customize name & college",
    priceInr: 299,
    description: "We fill your name, college, and department into the report and slides.",
  },
  {
    id: "viva",
    name: "Viva Q&A bank",
    priceInr: 499,
    description: "Architecture-matched viva questions and a short cheat sheet.",
  },
  {
    id: "install",
    name: "Installation help",
    priceInr: 499,
    description: "WhatsApp help until the project runs on your machine.",
  },
  {
    id: "explain",
    name: "Walkthrough / explanation",
    priceInr: 749,
    description: "Guided walkthrough of the architecture so you can defend it.",
  },
];

export const INSTANT_SLUGS = [
  "pdf-rag-chat",
  "chat-with-youtube",
  "chat-with-data",
  "resume-jd-matcher",
  "library-management-system",
  "hotel-booking-system",
  "restaurant-management-system",
  "vehicle-fleet-management-system",
  "mern-ecommerce",
  "face-recognition-attendance",
] as const;

export type DeliveryMode = "instant" | "made_to_order";

export function isInstantSlug(slug: string): boolean {
  return (INSTANT_SLUGS as readonly string[]).includes(slug);
}

export function deliveryModeForSlug(slug: string): DeliveryMode {
  return isInstantSlug(slug) ? "instant" : "made_to_order";
}

export function addonById(id: string): PricingAddon | undefined {
  return PRICING_ADDONS.find((a) => a.id === id);
}

export function sumAddonsInr(addonIds: string[]): number {
  return addonIds.reduce((sum, id) => sum + (addonById(id)?.priceInr ?? 0), 0);
}

/** Full catalog price before Instant vs 50% split. */
export function fullOrderInr(addonIds: string[]): number {
  return BASE_PRICE_INR + sumAddonsInr(addonIds);
}

/** Amount charged at checkout. */
export function chargeInr(deliveryMode: DeliveryMode, addonIds: string[]): number {
  const full = fullOrderInr(addonIds);
  return deliveryMode === "instant" ? full : Math.ceil(full / 2);
}

export function formatInr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export const BASE_INCLUDES = [
  "Full source code + setup instructions",
  "8-chapter Word report (placeholder name/college)",
  "14-slide presentation deck (placeholder name/college)",
  "Architecture aligned to the same codebase",
] as const;

export const BASE_EXCLUDES_NOTE = `${formatInr(BASE_PRICE_INR)} does not include installation help, viva coaching, name/college customization, or walkthroughs — add those below if you need them.`;
