import { site } from "@/lib/site";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function WhatsIncluded() {
  return (
    <section id="whats-included" className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
          What&apos;s included
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text max-w-xl leading-[1.25]">
          Everything you need to submit and defend
        </h2>
        <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
          Code alone is not enough. Standard and Complete packages ship documentation matched to the
          same architecture — Complete adds viva prep, college details, and WhatsApp support until
          you submit. Most deliveries are same-day after we confirm your details.
        </p>
      </FadeIn>

      <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10">
        {site.kitIncludes.map((item, i) => (
          <StaggerItem key={item.title}>
            <div className="h-full rounded-2xl border border-border bg-paper-card p-5 sm:p-6">
              <span className="font-mono text-xs text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display font-semibold text-text mt-3">{item.title}</p>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">{item.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
