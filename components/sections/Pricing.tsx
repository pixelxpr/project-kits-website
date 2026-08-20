import PricingTiers from "@/components/PricingTiers";
import FadeIn from "@/components/motion/FadeIn";

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
      <FadeIn>
        <h2 className="font-display text-3xl font-bold text-text">Pricing</h2>
        <p className="text-text-muted mt-3 max-w-xl">
          Same pricing across every project kit. Message us on WhatsApp to confirm
          availability before paying.
        </p>
      </FadeIn>
      <FadeIn delay={0.1} className="mt-10">
        <PricingTiers />
      </FadeIn>
    </section>
  );
}
