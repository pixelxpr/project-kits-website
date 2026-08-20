"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col rounded-xl glass overflow-hidden hover:border-cyan/40 hover:glow-cyan transition-[border-color,box-shadow] duration-300"
      >
        <div className="relative aspect-[4/3] bg-void-card border-b border-border">
          <Image
            src={`/projects/${project.slug}/cover.jpg`}
            alt={project.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider bg-void/80 backdrop-blur-sm border border-border text-cyan px-2 py-1 rounded-sm">
            {project.category === "ai-ml" ? "AI / ML" : project.category}
          </span>
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div>
            <h3 className="font-display font-semibold text-text group-hover:text-cyan transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-text-muted mt-1">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {project.techStack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] rounded-sm bg-void-card border border-border px-1.5 py-0.5 text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
