"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { hasStaticProjectCover, projectCoverSrc } from "@/lib/project-media";

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI / ML",
  mern: "MERN Stack",
  ecommerce: "E-commerce",
  mobile: "Mobile Apps",
};

const INTERVAL_MS = 4200;

export default function HeroProjectProof({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused || projects.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, projects.length]);

  if (projects.length === 0) return null;

  const project = projects[index]!;
  const categoryLabel = CATEGORY_LABELS[project.category] ?? project.category;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative aspect-[16/11] sm:aspect-[5/4] lg:aspect-[4/3] overflow-hidden rounded-sm bg-wash/40">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group absolute inset-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              aria-label={`View ${project.title} project`}
            >
              <Image
                src={projectCoverSrc(project.slug)}
                unoptimized={!hasStaticProjectCover(project.slug)}
                alt={`${project.title} — final year project preview`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 48vw"
                preload={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a]/75 via-[#0b1f3a]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/75">
                  {categoryLabel}
                </p>
                <p className="font-display text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                  {project.title}
                </p>
                <p className="text-sm text-white/80 mt-1.5 line-clamp-2 max-w-md leading-relaxed">
                  {project.tagline}
                </p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {projects.length > 1 && (
        <div
          className="mt-4 flex items-center gap-2"
          role="tablist"
          aria-label="Featured project previews"
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${p.title}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-teal" : "w-1.5 bg-border-strong hover:bg-text-faint"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
