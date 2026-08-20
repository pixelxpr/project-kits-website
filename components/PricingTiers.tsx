import { site } from "@/lib/site";

export default function PricingTiers() {
  return (
    <div className="grid sm:grid-cols-3 gap-5">
      {site.pricingTiers.map((tier) => (
        <div
          key={tier.name}
          className={`rounded-xl p-6 flex flex-col relative ${
            "highlighted" in tier && tier.highlighted
              ? "glass glow-cyan border-cyan/40"
              : "glass"
          }`}
        >
          {"highlighted" in tier && tier.highlighted && (
            <span className="absolute -top-3 left-6 font-mono text-[11px] font-bold uppercase tracking-wider bg-cyan text-void px-2 py-1 rounded-sm">
              Most popular
            </span>
          )}
          <p className="font-display font-semibold text-text">{tier.name}</p>
          <p className="font-display text-3xl font-bold text-gradient mt-2">{tier.price}</p>
          <p className="text-sm text-text-muted mt-2">{tier.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-text-muted">
            {tier.includes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-success font-mono mt-0.5">{"\u2713"}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
