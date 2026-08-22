"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  count: number;
};

export default function ScreenshotGallery({ slug, title, count }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((prev) => prev !== null ? (prev % count) + 1 : null);
      if (e.key === "ArrowLeft")  setLightbox((prev) => prev !== null ? ((prev - 2 + count) % count) + 1 : null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, count]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const cols = count === 4 ? "grid-cols-2 lg:grid-cols-4" : count === 2 ? "grid-cols-2" : "sm:grid-cols-3";

  return (
    <>
      {/* Thumbnail grid */}
      <div className={`grid gap-3 ${cols}`}>
        {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setLightbox(n)}
            aria-label={`View ${title} screenshot ${n} fullscreen`}
            className="relative aspect-video rounded-lg border border-border bg-void-card overflow-hidden group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-cyan"
          >
            <Image
              src={`/projects/${slug}/screenshot-${n}.jpg`}
              alt={`${title} screenshot ${n}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-white text-xs font-medium">Expand</span>
              </div>
            </div>
            {/* Screenshot number badge */}
            <span className="absolute top-2 left-2 font-mono text-[10px] bg-black/60 text-white/70 px-1.5 py-0.5 rounded-sm">
              {n}/{count}
            </span>
          </button>
        ))}
      </div>

      {/* Hint */}
      <p className="text-xs text-text-muted mt-3 text-center">Click any screenshot to view fullscreen</p>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            aria-label="Close fullscreen"
            className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter + hint */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-white/50 text-sm font-mono">{lightbox} / {count}</span>
            <span className="text-white/30 text-xs hidden sm:block">← → to navigate · ESC to close</span>
          </div>

          {/* Prev arrow */}
          {count > 1 && (
            <button
              aria-label="Previous screenshot"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
              onClick={(e) => { e.stopPropagation(); setLightbox(((lightbox - 2 + count) % count) + 1); }}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Full-size image */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-14 sm:mx-20"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/projects/${slug}/screenshot-${lightbox}.jpg`}
              alt={`${title} screenshot ${lightbox}`}
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
              quality={95}
              priority
            />
          </div>

          {/* Next arrow */}
          {count > 1 && (
            <button
              aria-label="Next screenshot"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox % count) + 1); }}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Dot indicators */}
          {count > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  aria-label={`Go to screenshot ${n}`}
                  onClick={(e) => { e.stopPropagation(); setLightbox(n); }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${n === lightbox ? "bg-cyan w-4" : "bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
