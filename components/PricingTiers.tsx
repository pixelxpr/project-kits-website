import Link from "next/link";
import { site } from "@/lib/site";

const WHATSAPP_BASE = `https://wa.me/${site.whatsappNumber}?text=`;

export default function PricingTiers() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8 p-4 rounded-xl border border-dashed border-border bg-paper-raised">
        <p className="text-sm text-text-muted leading-relaxed">
          A freelancer would charge{" "}
          <span className="text-text font-semibold">₹10,000–₹20,000</span> for
          the same project. Our kits start at{" "}
          <span className="text-teal font-semibold">₹1,499</span> and are
          delivered in hours — not weeks.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {site.pricingTiers.map((tier) => {
          const isHighlighted = tier.highlighted;
          const hasSaving = !!tier.saving;
          const hasBadge = !!tier.badge;
          const waUrl = WHATSAPP_BASE + encodeURIComponent(tier.ctaMessage);

          return (
            <div
              key={tier.name}
              className={`rounded-2xl flex flex-col relative transition-all duration-300 ${
                isHighlighted
                  ? "border-2 border-teal bg-paper-card shadow-[0_12px_40px_-16px_rgba(13,115,119,0.35)] scale-[1.02]"
                  : "border border-border bg-paper-card hover:border-border-strong"
              }`}
            >
              {hasBadge && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                  <span
                    className={`font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      isHighlighted ? "bg-teal text-white" : "bg-text text-white"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <p className="font-display font-bold text-text text-lg">{tier.name}</p>
                <p className="text-xs text-text-muted mt-1">{tier.description}</p>

                <div className="mt-5 mb-1">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-display text-4xl font-extrabold ${
                        isHighlighted ? "text-teal" : "text-text"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span className="text-sm text-text-muted line-through">
                      {tier.originalPrice}
                    </span>
                  </div>
                  {hasSaving && (
                    <span className="inline-block mt-1.5 font-mono text-[11px] font-semibold bg-success/10 text-success border border-success/25 px-2 py-0.5 rounded-full">
                      {tier.saving}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-3 mb-5">
                  <svg
                    className="w-3.5 h-3.5 text-teal shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs text-text-muted">
                    Delivered within{" "}
                    <span className="text-text font-medium">{tier.deliveryHours} hours</span> via
                    WhatsApp
                  </span>
                </div>

                <div className="border-t border-border mb-5" />

                <ul className="space-y-2.5 text-sm text-text-muted flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-success font-mono mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                    isHighlighted
                      ? "btn-primary"
                      : "border border-border text-text hover:border-teal/50 hover:text-teal"
                  }`}
                >
                  Get {tier.name} kit
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-3 mt-6 p-4 rounded-xl border border-success/20 bg-success/5">
        <div>
          <p className="text-sm font-semibold text-text">Satisfaction guarantee</p>
          <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
            Not happy with what you receive? Message us within 24 hours and we&apos;ll either fix
            it or refund you — no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
