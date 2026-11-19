import WhatsAppLink from "@/components/WhatsAppLink";
import { whatsappMessages } from "@/lib/whatsapp-messages";
import { testimonials } from "@/lib/testimonials";

/** One early proof point — quote + human contact before the catalog. */
export default function HomeTrustStrip() {
  const quote =
    testimonials.find((t) => t.name === "Prashant Kumar") ?? testimonials[0]!;

  return (
    <section
      className="border-b border-border bg-paper-card"
      aria-label="Student proof and contact"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          <blockquote className="max-w-2xl">
            <p className="text-base sm:text-lg text-text leading-relaxed">
              &ldquo;{quote.quote}&rdquo;
            </p>
            <footer className="mt-3 text-sm text-text-muted">
              <span className="font-semibold text-text">{quote.name}</span>
              <span className="text-text-faint"> · {quote.meta}</span>
            </footer>
          </blockquote>

          <div className="shrink-0 lg:max-w-xs">
            <p className="text-sm text-text-muted leading-relaxed">
              Unsure if a project fits your college? Ask on WhatsApp before you buy.
            </p>
            <WhatsAppLink
              placement="hero"
              message={whatsappMessages.hero}
              className="mt-3 inline-flex items-center rounded-lg border border-border bg-paper px-5 py-2.5 text-sm font-semibold text-text hover:border-teal/40 hover:text-teal transition-colors"
            >
              Message on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
