import { site } from "@/lib/site";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function KitIncludes() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
          What&apos;s in every kit
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text max-w-xl">
          One package. Everything you need to submit and defend.
        </h2>
        <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
          Code alone is not enough. Every Complete kit ships documentation that matches the architecture you&apos;re submitting.
        </p>
      </FadeIn>

      <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {site.kitIncludes.map((item, i) => (
          <StaggerItem key={item.title}>
            <div className="h-full rounded-2xl border border-border bg-paper-card p-6">
              <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display font-semibold text-text mt-3">{item.title}</p>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">{item.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
