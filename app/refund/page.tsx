import { site } from "@/lib/site";

export const metadata = {
  title: `Refund Policy — ${site.brandName}`,
  description: "Read the full refund and cancellation policy for FinalYearKit project kits. Understand our terms regarding digital downloads, kit functionality, and support.",
  alternates: {
    canonical: "/refund",
  },
  openGraph: {
    url: "https://finalyearkit.com/refund",
    title: "Refund Policy — FinalYearKit",
    description: "Read the full refund and cancellation policy for FinalYearKit project kits. Understand our terms regarding digital downloads, kit functionality, and support.",
  },
};

export default function RefundPage() {
  const updated = "19 August 2026";
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-cyan">Legal</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-tight">Refund Policy</h1>
      <p className="text-text-muted mt-2 text-sm font-mono">Last updated: {updated}</p>

      <div className="mt-10 space-y-8 text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">Our commitment</h2>
          <p>
            We want you to be confident before you buy — that&apos;s why we encourage you to message us first, ask to see
            a demo or a sample of the report, and ask any questions before making a payment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">Refund eligibility</h2>
          <p>Because kits are digital products delivered immediately, we follow these guidelines:</p>
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
                <strong className="text-text">Wrong kit delivered</strong> — if we accidentally delivered the wrong
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
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              WhatsApp
            </a>{" "}
            or at{" "}
            <a href={`mailto:${site.email}`} className="text-cyan hover:underline">
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
