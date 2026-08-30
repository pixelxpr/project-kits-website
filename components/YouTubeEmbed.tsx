"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  videoId: string;
  title: string;
};

export default function YouTubeEmbed({ videoId, title }: Props) {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border bg-void-card shadow-2xl" style={{ aspectRatio: "16/9" }}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title} demo`}
          className="absolute inset-0 w-full h-full group focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-void"
        >
          <Image
            src={thumbnailUrl}
            alt={`${title} demo video thumbnail`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 896px"
            unoptimized
            onError={(e) => {
              // fallback to hqdefault if maxres not available
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-200" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-cyan/20 blur-xl group-hover:bg-cyan/30 transition-all duration-300 scale-150" />
              {/* Circle background */}
              <div className="relative w-full h-full rounded-full bg-white/10 border-2 border-white/30 group-hover:border-cyan group-hover:bg-cyan/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center">
                {/* Triangle play icon */}
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1 group-hover:text-cyan transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Duration/label badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Watch demo
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
