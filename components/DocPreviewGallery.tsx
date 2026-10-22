"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  reportCount?: number;
  slideCount?: number;
};

export default function DocPreviewGallery({
  slug,
  title,
  reportCount = 3,
  slideCount = 3,
}: Props) {
  const [lightbox, setLightbox] = useState<{ kind: "report" | "slide"; n: number } | null>(
    null
  );

  const reportPages = Array.from({ length: reportCount }, (_, i) => i + 1);
  const slidePages = Array.from({ length: slideCount }, (_, i) => i + 1);
  const lightboxSrc = lightbox
    ? `/projects/${slug}/${lightbox.kind === "report" ? "report" : "slide"}-preview-${lightbox.n}.jpg`
    : null;

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <div className="space-y-10">
        {reportCount > 0 && (
          <div>
            <h3 className="font-display text-base font-semibold text-text mb-1">
              Sample report pages
            </h3>
            <p className="text-sm text-text-muted mb-4">
              From the Word report included with Standard / Complete — customized to your name and
              college on delivery.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {reportPages.map((n) => (
                <button
                  key={`report-${n}`}
                  type="button"
                  onClick={() => setLightbox({ kind: "report", n })}
                  aria-label={`View ${title} report page ${n}`}
                  className="relative aspect-[3/4] rounded-lg border border-border bg-paper-card overflow-hidden group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Image
                    src={`/projects/${slug}/report-preview-${n}.jpg`}
                    alt={`${title} report page ${n}`}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 33vw, 200px"
                  />
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] bg-black/60 text-white/80 px-1.5 py-0.5 rounded-sm">
                    p.{n}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {slideCount > 0 && (
          <div>
            <h3 className="font-display text-base font-semibold text-text mb-1">
              Sample presentation slides
            </h3>
            <p className="text-sm text-text-muted mb-4">
              From the PPT deck included with Standard / Complete.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {slidePages.map((n) => (
                <button
                  key={`slide-${n}`}
                  type="button"
                  onClick={() => setLightbox({ kind: "slide", n })}
                  aria-label={`View ${title} slide ${n}`}
                  className="relative aspect-video rounded-lg border border-border bg-paper-card overflow-hidden group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Image
                    src={`/projects/${slug}/slide-preview-${n}.jpg`}
                    alt={`${title} slide ${n}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] bg-black/60 text-white/80 px-1.5 py-0.5 rounded-sm">
                    Slide {n}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightbox && lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white font-mono text-sm"
          >
            Close
          </button>
          <div
            className={`relative w-full ${
              lightbox.kind === "report" ? "max-w-xl aspect-[3/4]" : "max-w-4xl aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt={`${title} ${lightbox.kind} preview ${lightbox.n}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
