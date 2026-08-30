import { site } from "@/lib/site";

export const metadata = {
  title: `Privacy Policy — ${site.brandName}`,
  description: "How FinalYearKit handles your personal information. Read our privacy policy to understand what data we collect, why we collect it, and how we keep it safe.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const updated = "19 August 2026";
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-cyan">Legal</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-3 leading-tight">Privacy Policy</h1>
      <p className="text-text-muted mt-2 text-sm font-mono">Last updated: {updated}</p>

      <div className="mt-10 space-y-8 text-text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">1. Who we are</h2>
          <p>
            FinalYearKit (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is operated by an individual based in India.
            You can reach us at{" "}
            <a href={`mailto:${site.email}`} className="text-cyan hover:underline">
              {site.email}
            </a>{" "}
            or via WhatsApp at{" "}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              +91 74208 79220
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">2. What information we collect</h2>
          <p>
            We collect only information you voluntarily provide — for example, when you message us on WhatsApp or
            Instagram to enquire about or purchase a kit. This may include your name, college/university name, and any
            other details you share in the conversation.
          </p>
          <p className="mt-3">
            We do not run account registration, payment processing, or cookie-based tracking on this website. No
            personal data is collected passively through this site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">3. How we use it</h2>
          <p>We use the information you provide solely to:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Fulfil and deliver your order (code, report, and other kit files)</li>
            <li>Customise the kit to your name, college, and department</li>
            <li>Provide WhatsApp support until submission</li>
            <li>Respond to enquiries or refund requests</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or share your information with third parties.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">4. Data retention</h2>
          <p>
            We retain conversation records for as long as needed to fulfil an order and handle any follow-up queries or
            disputes. You may ask us to delete your information at any time by messaging us directly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">5. Third-party platforms</h2>
          <p>
            Our primary communication channels — WhatsApp (Meta) and Instagram (Meta) — have their own privacy
            policies. By messaging us on those platforms you are subject to their terms as well as ours.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">6. Your rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of any personal data we hold about you.
            Contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-cyan hover:underline">
              {site.email}
            </a>{" "}
            and we will respond within a reasonable time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text mb-2">7. Changes to this policy</h2>
          <p>
            We may update this policy as the business grows. The &ldquo;Last updated&rdquo; date at the top of this page will
            reflect any changes.
          </p>
        </section>
      </div>
    </div>
  );
}
