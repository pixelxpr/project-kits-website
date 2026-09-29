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

/** Prefill WhatsApp + a short placement tag so chats are attributable. */
export function whatsappUrl(
  placement: WhatsAppPlacement,
  message: string = whatsappMessages.default,
): string {
  const text = `${message}\n\n[from:${placement}]`;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
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
