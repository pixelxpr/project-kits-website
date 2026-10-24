"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/testimonials";
import StarRating from "@/components/StarRating";

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);

  const updateControls = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);

    const cards = el.querySelectorAll<HTMLElement>("[data-review-card]");
    if (cards.length === 0) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateControls();
    el.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      el.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls, items.length]);

  const scrollByPage = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-review-card]")[i];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 4, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Student reviews"
      >
        {items.map((t, i) => (
          <blockquote
            key={`${t.name}-${i}`}
            data-review-card
            className="snap-start shrink-0 w-[min(100%,20rem)] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] rounded-2xl border border-border bg-paper-card p-5 flex flex-col min-h-[13.5rem]"
          >
            <StarRating rating={t.rating} size="sm" label={`${t.rating} out of 5 stars`} />
            <p className="text-sm text-text leading-relaxed flex-1 mt-3">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-4 pt-3 border-t border-border">
              <p className="text-sm font-semibold text-text">{t.name}</p>
              <p className="text-xs text-text-faint">{t.meta}</p>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Review slides">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                active === i ? "w-5 bg-teal" : "w-1.5 bg-border-strong hover:bg-text-faint"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            aria-label="Previous reviews"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-paper-card text-text hover:border-teal/50 hover:text-teal disabled:opacity-35 disabled:pointer-events-none transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            aria-label="Next reviews"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-paper-card text-text hover:border-teal/50 hover:text-teal disabled:opacity-35 disabled:pointer-events-none transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
