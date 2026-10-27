import { site } from "@/lib/site";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export type WhatsAppPlacement =
  | "header"
  | "hero"
  | "float"
  | "footer"
  | "pricing"
  | "inline"
  | "how-it-works"
  | "legal";

/** Prefill WhatsApp chat text. Placement is tracked in GA via trackWhatsAppClick — not in the message. */
export function whatsappUrl(
  _placement: WhatsAppPlacement,
  message: string = whatsappMessages.default,
): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function gtagFn(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
}

/** Fire a GA4 event when someone taps WhatsApp (conversion signal). */
export function trackWhatsAppClick(placement: WhatsAppPlacement): void {
  gtagFn()?.("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: placement,
    placement,
  });
}

/** Buy / Pay / Get free clicked — checkout modal opened. */
export function trackBeginCheckout(params: {
  projectSlug: string;
  deliveryMode: string;
  value: number;
}): void {
  gtagFn()?.("event", "begin_checkout", {
    currency: "INR",
    value: params.value,
    project_slug: params.projectSlug,
    delivery_mode: params.deliveryMode,
  });
}

/** Free ZIP claim succeeded (signed URL issued or WhatsApp fallback). */
export function trackFreeDownload(params: { projectSlug: string }): void {
  gtagFn()?.("event", "free_download", {
    project_slug: params.projectSlug,
  });
}

/** Inbound campaign URLs — also on `site.campaignLandings`. */
export const campaignLandings = site.campaignLandings;
