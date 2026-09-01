import { site } from "@/lib/site";

export const metadata = {
  title: `Terms of Service — ${site.brandName}`,
  description: "Review the terms and conditions for purchasing a FinalYearKit project kit. Important information about licensing, usage rights, and our service obligations.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    url: "https://finalyearkit.com/terms",
    title: "Terms of Service — FinalYearKit",
    description: "Review the terms and conditions for purchasing a FinalYearKit project kit. Important information about licensing, usage rights, and our service obligations.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FinalYearKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — FinalYearKit",
    description: "Review the terms and conditions for purchasing a FinalYearKit project kit. Important information about licensing, usage rights, and our service obligations.",
    images: ["/og-image.png"],
  },
};

export default function TermsPage() {
  const updated = "19 August 2026";
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-cyan">Legal</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-tight">Terms of Service</h1>
      <p className="text-text-muted mt-2 text-sm font-mono">Last updated: {updated}</p>

      <div className="mt-10 space-y-8 text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">1. Who these terms apply to</h2>
          <p>
            By purchasing or using any product from FinalYearKit (&ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to these terms.
            &ldquo;Product&rdquo; means any project kit — including source code, report, presentation, and viva materials —
            delivered by us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">2. Licence</h2>
          <p>
            When you purchase a kit, you receive a personal, non-transferable licence to use the materials for your own
            academic project submission. You may not resell, redistribute, publish, or re-license the files to any third
            party.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">3. Academic integrity</h2>
          <p>
            Project kits are provided as a learning and reference resource. You are solely responsible for how you use
            the materials. Before submitting any work, you must check your institution&apos;s academic integrity policy on
            using external resources. FinalYearKit accepts no liability for academic consequences arising from your
            submission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">4. Delivery</h2>
          <p>
            Kits are delivered digitally — typically within 24 hours of confirmed payment — via WhatsApp or the
            communication channel agreed at the time of purchase. Delivery timelines may vary based on customisation
            requirements.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">5. Payment</h2>
          <p>
            Payments are currently processed directly via UPI or bank transfer as agreed in conversation. By making a
            payment you confirm you have reviewed the product description and are satisfied with what is included before
            purchase.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">6. Refunds</h2>
          <p>
            Please see our{" "}
            <a href="/refund" className="text-cyan hover:underline">
              Refund Policy
            </a>{" "}
            for full details.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">7. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, FinalYearKit is not liable for any indirect, incidental,
            or consequential damages arising from your use of or inability to use the materials. Our total liability
            shall not exceed the amount you paid for the relevant kit.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">8. Changes to these terms</h2>
          <p>
            We may update these terms at any time. Continued use of our products following any update constitutes
            acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">9. Contact</h2>
          <p>
            Questions about these terms? Reach us at{" "}
            <a href={`mailto:${site.email}`} className="text-cyan hover:underline">
              {site.email}
            </a>{" "}
            or on{" "}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
