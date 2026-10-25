import { site } from "@/lib/site";
import { BASE_PRICE_INR, formatInr } from "@/lib/pricing";
import { whatsappUrl } from "@/lib/tracking";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export const metadata = {
  title: "Refund Policy — Final Year Projects",
  description:
    "Refund and cancellation policy for Instant downloads and made-to-order project deposits.",
  alternates: {
    canonical: "/refund",
  },
  openGraph: {
    type: "website",
    siteName: "Final Year Projects",
    url: "https://finalyearkit.com/refund",
    title: "Refund Policy — Final Year Projects",
    description:
      "Refund and cancellation policy for Instant downloads and made-to-order project deposits.",
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "Final year projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy — Final Year Projects",
    description:
      "Refund and cancellation policy for Instant downloads and made-to-order project deposits.",
    images: ["/og-image.jpg"],
  },
};

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal">Legal</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-[1.25]">
        Refund Policy
      </h1>
      <p className="text-text-muted mt-2 text-sm font-mono">Last updated: 24 October 2026</p>

      <div className="mt-10 space-y-8 text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">Our commitment</h2>
          <p>
            You can Contact us on WhatsApp before buying, ask about a demo or report sample, and
            clarify what is included at {formatInr(BASE_PRICE_INR)} versus paid add-ons.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">
            Instant download packages
          </h2>
          <p>
            Instant projects are digital goods. Once a download link (ZIP) has been issued after
            payment, the purchase is{" "}
            <strong className="text-text">non-refundable</strong> for change of mind. If the ZIP
            is corrupt, incomplete, or does not match the product page and we cannot replace it
            promptly, you are entitled to a refund or a corrected delivery.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">
            Made-to-order (50% deposit)
          </h2>
          <p>
            Made-to-order projects charge 50% up front to start work. That deposit is{" "}
            <strong className="text-text">non-refundable</strong> once we have begun delivery work
            or shared files with you. If we cannot deliver the agreed project within a reasonable
            time after your deposit, you may cancel for a full refund of the amount paid. The
            remaining 50% is due on delivery.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">
            Refund eligibility (project purchase)
          </h2>
          <p>Because projects are digital products, we follow these guidelines:</p>
          <ul className="mt-3 space-y-3">
            <li className="flex gap-3">
              <span className="text-success font-mono mt-0.5 shrink-0">✓</span>
              <span>
                <strong className="text-text">Code / files don&apos;t run as described</strong> — if
                the delivered code doesn&apos;t function as described on the product page and we
                cannot fix it within a reasonable timeframe, you are entitled to a full refund of
                the package amount paid.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-success font-mono mt-0.5 shrink-0">✓</span>
              <span>
                <strong className="text-text">Wrong project delivered</strong> — we will send the
                correct one or issue a full refund, whichever you prefer.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-text-faint font-mono mt-0.5 shrink-0">✗</span>
              <span>
                <strong className="text-text">Change of mind after Instant download</strong> —
                digital Instant ZIPs cannot be returned once the link is issued.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-text-faint font-mono mt-0.5 shrink-0">✗</span>
              <span>
                <strong className="text-text">Academic outcome</strong> — we cannot offer refunds
                based on marks or viva results.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">How to request a refund</h2>
          <p>
            Message us on{" "}
            <a
              href={whatsappUrl("legal", whatsappMessages.legal)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              WhatsApp
            </a>{" "}
            or at{" "}
            <a href={`mailto:${site.email}`} className="text-teal hover:underline">
              {site.email}
            </a>{" "}
            within 7 days of delivery with a description of the issue. We aim to respond within 48
            hours.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">Still unsure?</h2>
          <p>
            If you have any concerns before purchasing, please ask us first on WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
}
