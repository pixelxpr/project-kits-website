import Link from "next/link";
import { site } from "@/lib/site";

const WHATSAPP_BASE = `https://wa.me/${site.whatsappNumber}?text=`;

export default function PricingTiers() {
  return (
    <div>
      {/* "vs freelancer" anchor */}
      <div className="flex items-center gap-3 mb-8 p-4 rounded-xl border border-dashed border-border bg-void-card/50">
        <span className="text-2xl">💡</span>
        <p className="text-sm text-text-muted leading-relaxed">
          A freelancer would charge{" "}
          <span className="text-text font-semibold">₹10,000–₹20,000</span> for
          the same project. Our kits start at{" "}
          <span className="text-cyan font-semibold">₹1,499</span> and are
          delivered in hours — not weeks.
        </p>
      </div>

      {/* Cards */}
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
                  ? "border-2 border-cyan/60 bg-void-card shadow-[0_0_40px_-8px_rgba(34,211,238,0.25)] scale-[1.02]"
                  : "border border-border bg-void-card hover:border-border-strong"
              }`}
            >
              {/* Badge */}
              {hasBadge && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                  <span
                    className={`font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      isHighlighted
                        ? "bg-cyan text-void"
                        : "bg-violet text-white"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Tier name */}
                <p className="font-display font-bold text-text text-lg">
                  {tier.name}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {tier.description}
                </p>

                {/* Price block */}
                <div className="mt-5 mb-1">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-display text-4xl font-extrabold ${
                        isHighlighted ? "text-cyan" : "text-text"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span className="text-sm text-text-muted line-through">
                      {tier.originalPrice}
                    </span>
                  </div>
                  {hasSaving && (
                    <span className="inline-block mt-1.5 font-mono text-[11px] font-semibold bg-success/15 text-success border border-success/30 px-2 py-0.5 rounded-full">
                      {tier.saving}
                    </span>
                  )}
                </div>

                {/* Delivery promise */}
                <div className="flex items-center gap-1.5 mt-3 mb-5">
                  <svg
                    className="w-3.5 h-3.5 text-cyan shrink-0"
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
                    <span className="text-text font-medium">
                      {tier.deliveryHours} hours
                    </span>{" "}
                    via WhatsApp
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-border mb-5" />

                {/* Features */}
                <ul className="space-y-2.5 text-sm text-text-muted flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-success font-mono mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                    isHighlighted
                      ? "bg-cyan text-void hover:bg-cyan/90 shadow-[0_4px_20px_-4px_rgba(34,211,238,0.5)]"
                      : "border border-border text-text hover:border-cyan/50 hover:text-cyan"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Get {tier.name} kit
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guarantee */}
      <div className="flex items-start gap-3 mt-6 p-4 rounded-xl border border-success/20 bg-success/5">
        <span className="text-xl mt-0.5">🛡️</span>
        <div>
          <p className="text-sm font-semibold text-text">
            Satisfaction guarantee
          </p>
          <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
            Not happy with what you receive? Message us within 24 hours and
            we&apos;ll either fix it or refund you — no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
