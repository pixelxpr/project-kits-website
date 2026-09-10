"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI / ML",
  mern: "MERN Stack",
  ecommerce: "E-commerce",
};

export default function ProjectCard({ project }: { project: Project }) {
  const hasVideo = !!project.demoYoutubeId;
  const hasScreenshots = project.hasScreenshots !== false;
  const categoryLabel = CATEGORY_LABELS[project.category] ?? project.category;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col rounded-2xl border border-border bg-paper-card overflow-hidden hover:border-teal/40 transition-all duration-300 hover:shadow-[0_12px_32px_-16px_rgba(11,31,58,0.2)] h-full"
      >
        <div className="relative aspect-video bg-paper-raised overflow-hidden border-b border-border">
          <Image
            src={`/api/covers/${project.slug}`}
            unoptimized
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider bg-paper-card/95 border border-border text-teal px-2 py-1 rounded-sm">
            {categoryLabel}
          </span>
          <div className="absolute top-3 right-3 flex gap-1.5">
            {hasVideo && (
              <span className="flex items-center gap-1 bg-text/80 text-white px-2 py-1 rounded-sm text-[10px] font-mono">
                Video
              </span>
            )}
            {hasScreenshots && (
              <span className="flex items-center gap-1 bg-text/80 text-white px-2 py-1 rounded-sm text-[10px] font-mono">
                Screens
              </span>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col gap-4 flex-1">
          <div>
            <h3 className="font-display font-semibold text-text group-hover:text-teal transition-colors duration-200 leading-snug">
              {project.title}
            </h3>
            <p className="text-sm text-text-muted mt-1.5 leading-relaxed line-clamp-2">
              {project.tagline}
            </p>
          </div>

          <ul className="space-y-1.5">
            {project.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                <span className="text-teal font-mono mt-0.5 shrink-0">✓</span>
                <span className="line-clamp-1">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] rounded-sm bg-paper-raised border border-border px-1.5 py-0.5 text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="shrink-0 text-text-muted group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-200">
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
