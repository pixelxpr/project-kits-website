import { categories } from "@/lib/site";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const CATEGORY_DETAILS: Record<string, { desc: string; icon: string }> = {
  "ai-ml": {
    desc: "RAG chatbots, data analysis tools, and ML-driven applications — fully working, documented, and viva-ready.",
    icon: "M13 3L4 14h7l-1 7 9-11h-7l1-7z",
  },
  ecommerce: {
    desc: "Storefronts, cart and checkout flows, and admin dashboards — built on production-grade patterns, not toy demos.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  },
  mern: {
    desc: "Full-stack MongoDB/Express/React/Node applications with real auth, real APIs, and real deployment instructions.",
    icon: "M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM12 8v4l3 3",
  },
};

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-violet">Built to grow</p>
        <h2 className="font-display text-3xl font-bold text-text mt-3">
          Not just an AI project shop
        </h2>
        <p className="text-text-muted mt-3 max-w-2xl leading-relaxed">
          What started as AI/ML project kits is expanding into a full catalog
          across categories — the same standard of a working codebase, a
          complete submission report, and a viva-ready question bank applies
          to every category we ship, not just the first one.
        </p>
      </FadeIn>

      <StaggerGroup className="grid sm:grid-cols-3 gap-5 mt-10">
        {categories.map((cat) => {
          const details = CATEGORY_DETAILS[cat.id];
          return (
            <StaggerItem key={cat.id}>
              <div className={`rounded-xl glass p-6 h-full flex flex-col ${cat.status === "live" ? "border-cyan/30" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-void-card border border-border flex items-center justify-center text-cyan">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d={details.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm ${
                      cat.status === "live" ? "bg-success/15 text-success" : "bg-violet/15 text-violet"
                    }`}
                  >
                    {cat.status === "live" ? "Live now" : "Coming soon"}
                  </span>
                </div>
                <p className="font-display font-semibold text-text mt-4">{cat.label}</p>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">{details.desc}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
