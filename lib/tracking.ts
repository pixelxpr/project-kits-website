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

/** Fire a GA4 event when someone taps WhatsApp (conversion signal). */
export function trackWhatsAppClick(placement: WhatsAppPlacement): void {
  if (typeof window === "undefined") return;
  const gtag = (
    window as Window & { gtag?: (...args: unknown[]) => void }
  ).gtag;
  gtag?.("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: placement,
    placement,
  });
}

/** Inbound campaign URLs — also on `site.campaignLandings`. */
export const campaignLandings = site.campaignLandings;
