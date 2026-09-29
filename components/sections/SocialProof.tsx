import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function SocialProof() {
  return (
    <section className="border-y border-border bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <FadeIn>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal mb-3">
            Why students pick this
          </p>
          <h2 className="font-display text-3xl font-bold text-text max-w-xl leading-[1.25]">
            Built for submission day — not just for the zip file.
          </h2>
        </FadeIn>

        <StaggerGroup className="grid sm:grid-cols-3 gap-4 mt-8">
          {site.trustPoints.map((t, i) => (
            <StaggerItem key={t.stat}>
              <div className="h-full rounded-2xl border border-border bg-paper-card p-5">
                <span className="font-mono text-xs text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-lg font-bold text-text mt-2 leading-[1.25]">
                  {t.stat}
                </p>
                <p className="text-sm text-text-muted mt-1.5 leading-relaxed">{t.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup className="grid sm:grid-cols-3 gap-4 mt-8">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <blockquote className="rounded-2xl border border-border bg-paper-card p-5 h-full flex flex-col">
                <p className="text-sm text-text-muted leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 pt-3 border-t border-border">
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-text-faint">{t.meta}</p>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
