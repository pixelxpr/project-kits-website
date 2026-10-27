import ProjectBuyPanel from "@/components/ProjectBuyPanel";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { BASE_PRICE_INR, formatInr } from "@/lib/pricing";

const STEPS = [
  {
    step: "01",
    title: "Choose a project",
    desc: "Pick Free, Instant download (ready ZIP), or made-to-order (we build and deliver in a few hours).",
  },
  {
    step: "02",
    title: `Free, or from ${formatInr(BASE_PRICE_INR)}`,
    desc: "Free kits: share contact and download. Instant: pay in full. Made-to-order: pay 50% now, balance on delivery.",
  },
  {
    step: "03",
    title: "Add help only if needed",
    desc: "Customize, viva bank, install help, and walkthroughs are optional paid add-ons — not included at base price.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
      <FadeIn>
        <div id="how-it-works" className="scroll-mt-24">
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
            How it works
          </p>
          <h2 className="font-display text-3xl font-bold text-text max-w-xl leading-[1.25]">
            From browse to ZIP — clear pricing, optional extras
          </h2>
          <p className="text-text-muted mt-3 max-w-xl leading-relaxed">
            Code + report + slides on every kit. A few projects are free to download; paid kits
            start at {formatInr(BASE_PRICE_INR)}. Add-ons are optional.
          </p>
        </div>
      </FadeIn>

      <StaggerGroup className="grid sm:grid-cols-3 gap-4 mt-8">
        {STEPS.map((s) => (
          <StaggerItem key={s.step}>
            <div className="h-full rounded-2xl border border-border bg-paper-card p-5">
              <span className="font-mono text-xs font-semibold text-teal bg-teal/10 border border-teal/20 rounded-md px-2 py-1">
                {s.step}
              </span>
              <p className="font-display font-semibold text-text mt-3">{s.title}</p>
              <p className="text-sm text-text-muted mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn className="mt-12">
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">Pricing</p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-text">
          {formatInr(BASE_PRICE_INR)} package · same for every project
        </h3>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-8">
        <ProjectBuyPanel homepage />
      </FadeIn>
    </section>
  );
}
