import { site } from "@/lib/site";
import { BOOKING_FEE_INR } from "@/lib/booking";
import { whatsappUrl } from "@/lib/tracking";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export const metadata = {
  title: "Refund Policy — Final Year Projects",
  description:
    "Refund and cancellation policy for final year project packages — digital delivery, booking fee, and support terms.",
  alternates: {
    canonical: "/refund",
  },
  openGraph: {
    type: "website",
    siteName: "Final Year Projects",
    url: "https://finalyearkit.com/refund",
    title: "Refund Policy — Final Year Projects",
    description:
      "Refund and cancellation policy for final year project packages — digital delivery, booking fee, and support terms.",
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "Final year projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy — Final Year Projects",
    description:
      "Refund and cancellation policy for final year project packages — digital delivery, booking fee, and support terms.",
    images: ["/og-image.jpg"],
  },
};

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal">Legal</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-[1.25]">Refund Policy</h1>
      <p className="text-text-muted mt-2 text-sm font-mono">Last updated: 21 October 2026</p>

      <div className="mt-10 space-y-8 text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">Our commitment</h2>
          <p>
            We want you to be confident before you buy — that&apos;s why you can Contact us on WhatsApp first,
            ask about a demo or report sample, and ask any questions before booking or paying for a project.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">
            ₹{BOOKING_FEE_INR} booking fee
          </h2>
          <p>
            The ₹{BOOKING_FEE_INR} booking fee paid on the website to reserve a project is{" "}
            <strong className="text-text">non-refundable</strong>. It covers holding your project
            slot and our outreach on WhatsApp. It is separate from the package price (Standard /
            Complete). Package purchases remain covered by the eligibility rules below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">Refund eligibility (project purchase)</h2>
          <p>Because projects are digital products delivered immediately, we follow these guidelines:</p>
          <ul className="mt-3 space-y-3">
            <li className="flex gap-3">
              <span className="text-success font-mono mt-0.5 shrink-0">✓</span>
              <span>
                <strong className="text-text">Code / files don&apos;t run as described</strong> — if the delivered code
                doesn&apos;t function as described on the product page and we cannot fix it within a reasonable timeframe,
                you are entitled to a full refund.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-success font-mono mt-0.5 shrink-0">✓</span>
              <span>
                <strong className="text-text">Wrong project delivered</strong> — if we accidentally delivered the wrong
                project, we will immediately send the correct one or issue a full refund, whichever you prefer.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-text-faint font-mono mt-0.5 shrink-0">✗</span>
              <span>
                <strong className="text-text">Change of mind</strong> — because the files are delivered digitally and
                cannot be &ldquo;returned&rdquo;, we are not able to issue refunds for change-of-mind purchases. Please review
                the product page carefully and ask us your questions before buying.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-text-faint font-mono mt-0.5 shrink-0">✗</span>
              <span>
                <strong className="text-text">Academic outcome</strong> — we cannot offer refunds based on marks
                received or viva results, as these depend on factors outside our control.
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
            within 7 days of delivery with a description of the issue. We aim to respond and resolve all refund
            requests within 48 hours.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">Still unsure?</h2>
          <p>
            If you have any concerns before purchasing, please ask us first — that&apos;s exactly what we&apos;re here for.
            Message us on WhatsApp and we&apos;ll answer any question you have.
          </p>
        </section>
      </div>
    </div>
  );
}
