"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI / ML",
  "mern": "MERN Stack",
  "ecommerce": "E-commerce",
};

export default function ProjectCard({ project }: { project: Project }) {
  const hasVideo = !!project.demoYoutubeId;
  const hasScreenshots = project.hasScreenshots !== false;
  const categoryLabel = CATEGORY_LABELS[project.category] ?? project.category;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col rounded-2xl border border-border bg-void-card overflow-hidden hover:border-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] h-full"
      >
        {/* Cover image */}
        <div className="relative aspect-video bg-void-raised overflow-hidden border-b border-border">
          <Image
            src={`/projects/${project.slug}/cover.jpg`}
            alt={project.title}
            fill
            className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transform"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void-card/60 via-transparent to-transparent" />

          {/* Category badge */}
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider bg-void/80 backdrop-blur-sm border border-border/80 text-cyan px-2 py-1 rounded-sm">
            {categoryLabel}
          </span>

          {/* Media badges */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {hasVideo && (
              <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm border border-white/10 text-white/70 px-2 py-1 rounded-sm text-[10px] font-mono">
                <svg className="w-2.5 h-2.5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Video
              </span>
            )}
            {hasScreenshots && (
              <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm border border-white/10 text-white/70 px-2 py-1 rounded-sm text-[10px] font-mono">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                </svg>
                Screens
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Title + tagline */}
          <div>
            <h3 className="font-display font-semibold text-text group-hover:text-cyan transition-colors duration-200 leading-snug">
              {project.title}
            </h3>
            <p className="text-sm text-text-muted mt-1.5 leading-relaxed line-clamp-2">
              {project.tagline}
            </p>
          </div>

          {/* Top 3 features */}
          <ul className="space-y-1.5">
            {project.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                <span className="text-cyan font-mono mt-0.5 shrink-0">✓</span>
                <span className="line-clamp-1">{f}</span>
              </li>
            ))}
          </ul>

          {/* Footer: tech stack + arrow */}
          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] rounded-sm bg-void border border-border px-1.5 py-0.5 text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="shrink-0 text-text-muted group-hover:text-cyan group-hover:translate-x-0.5 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
