/** Public Instant / made-to-order / free pricing (INR). */

import { isFreeProjectSlug } from "@/lib/free-projects";

/**
 * Base package price — set via Vercel env so you can use ₹1 for live tests.
 * Prefer NEXT_PUBLIC_BASE_PRICE_INR so UI and Razorpay stay in sync.
 * (NEXT_PUBLIC_BOOKING_FEE_INR is the old ₹49 booking hold — not used for package checkout.)
 * Free projects ignore this for the base ZIP (still charge add-ons).
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

export type DeliveryMode = "free" | "instant" | "made_to_order";

export function isInstantSlug(slug: string): boolean {
  return (INSTANT_SLUGS as readonly string[]).includes(slug);
}

/** Free → Instant → made-to-order. Free list: lib/free-projects.ts */
export function deliveryModeForSlug(slug: string): DeliveryMode {
  if (isFreeProjectSlug(slug)) return "free";
  if (isInstantSlug(slug)) return "instant";
  return "made_to_order";
}

/** ZIP after claim/payment (Instant + Free). */
export function offersZipDownload(deliveryMode: DeliveryMode): boolean {
  return deliveryMode === "instant" || deliveryMode === "free";
}

export function addonById(id: string): PricingAddon | undefined {
  return PRICING_ADDONS.find((a) => a.id === id);
}

export function sumAddonsInr(addonIds: string[]): number {
  return addonIds.reduce((sum, id) => sum + (addonById(id)?.priceInr ?? 0), 0);
}

/** Catalog package total before Instant vs 50% vs free split. */
export function fullOrderInr(addonIds: string[], deliveryMode?: DeliveryMode): number {
  const addons = sumAddonsInr(addonIds);
  if (deliveryMode === "free") return addons;
  return BASE_PRICE_INR + addons;
}

/** Amount charged at checkout (₹0 = gated free claim, no Razorpay). */
export function chargeInr(deliveryMode: DeliveryMode, addonIds: string[]): number {
  const addons = sumAddonsInr(addonIds);
  if (deliveryMode === "free") return addons;
  const full = BASE_PRICE_INR + addons;
  return deliveryMode === "instant" ? full : Math.ceil(full / 2);
}

export function formatInr(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function deliveryBadgeLabel(deliveryMode: DeliveryMode): string {
  switch (deliveryMode) {
    case "free":
      return "Free";
    case "instant":
      return "Instant";
    default:
      return "Few hours";
  }
}

export function deliveryHeroLabel(deliveryMode: DeliveryMode): string {
  switch (deliveryMode) {
    case "free":
      return "Free download";
    case "instant":
      return "Instant download";
    default:
      return "50% now · deliver in a few hours";
  }
}

export const BASE_INCLUDES = [
  "Full source code + setup instructions",
  "8-chapter Word report (placeholder name/college)",
  "14-slide presentation deck (placeholder name/college)",
  "Architecture aligned to the same codebase",
] as const;

export const BASE_EXCLUDES_NOTE = `${formatInr(BASE_PRICE_INR)} does not include installation help, viva coaching, name/college customization, or walkthroughs — add those below if you need them. Free kits waive the base price only; add-ons are still paid.`;
