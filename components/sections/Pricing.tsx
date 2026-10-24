import Link from "next/link";
import PricingTiers from "@/components/PricingTiers";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { BOOKING_FEE_INR } from "@/lib/booking";

const STEPS = [
  {
    step: "01",
    title: "Choose a project",
    desc: "Browse demos and pick what fits your course. Questions first? Message us on WhatsApp.",
  },
  {
    step: "02",
    title: `Book from ₹${BOOKING_FEE_INR}`,
    desc: `Pay a non-refundable ₹${BOOKING_FEE_INR} booking fee on the project page. We WhatsApp you to confirm college details and tier.`,
  },
  {
    step: "03",
    title: "Customize & defend",
    desc: "Get code, report, slides, and viva prep. Message us anytime until you've submitted.",
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
            From browsing to viva — then pick your package
          </h2>
          <p className="text-text-muted mt-3 max-w-xl leading-relaxed">
            Book any project from ₹{BOOKING_FEE_INR} on its page — we confirm the rest on WhatsApp
            after payment.
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
          Simple tiers. Same for every project.
        </h3>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-8">
        <PricingTiers />
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mt-8 text-sm text-text-muted">
          Prefer to talk first? Use Contact on WhatsApp — or{" "}
          <Link href="/final-year-projects" className="text-teal font-medium hover:underline">
            browse projects
          </Link>
          .
        </p>
      </FadeIn>
    </section>
  );
}
