import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function SocialProof() {
  return (
    <section className="border-y border-border bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
        <FadeIn>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal mb-3">
            Why students pick this
          </p>
          <h2 className="font-display text-3xl font-bold text-text mb-10 max-w-xl leading-[1.25]">
            Built for submission day — not just for the zip file.
          </h2>
        </FadeIn>

        <StaggerGroup className="grid sm:grid-cols-3 gap-5 mb-16">
          {site.trustPoints.map((t, i) => (
            <StaggerItem key={t.stat}>
              <div className="h-full rounded-2xl border border-border bg-paper-card p-6">
                <span className="font-mono text-xs text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-xl font-bold text-text mt-3 leading-[1.25]">
                  {t.stat}
                </p>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">{t.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn>
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal">
            Student reviews
          </p>
          <h2 className="font-display text-3xl font-bold text-text mt-3 leading-[1.25]">
            What students are saying
          </h2>
        </FadeIn>

        <StaggerGroup className="grid sm:grid-cols-3 gap-5 mt-10">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl border border-border bg-paper-card p-6 h-full flex flex-col">
                <p className="text-sm text-text-muted leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center font-mono text-xs font-bold text-teal shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{t.name}</p>
                    <p className="text-xs text-text-faint">{t.meta}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
