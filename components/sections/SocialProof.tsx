import { averageRating, testimonials } from "@/lib/testimonials";
import FadeIn from "@/components/motion/FadeIn";
import StarRating from "@/components/StarRating";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function SocialProof() {
  const avg = averageRating();
  const avgDisplay = avg.toFixed(1);

  return (
    <section className="border-y border-border bg-paper-raised">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-wider text-teal mb-2">
                Student reviews
              </p>
              <h2 className="font-display text-3xl font-bold text-text leading-[1.25]">
                What buyers said after delivery
              </h2>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <StarRating rating={avg} label={`Average ${avgDisplay} out of 5 stars`} />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">{avgDisplay}</span>
                <span className="text-text-faint"> / 5</span>
              </p>
            </div>
          </div>
        </FadeIn>

        <TestimonialCarousel items={testimonials} />
      </div>
    </section>
  );
}
