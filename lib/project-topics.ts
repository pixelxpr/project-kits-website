/**
 * SEO topic landings at /project-topics/[slug] for ready kits.
 * Unique copy + self-canonical; product CTA still lives on /projects/[slug].
 */
import { projects, type Project } from "@/lib/projects";

const CATEGORY_DEGREE_HINT: Record<Project["category"], string> = {
  "ai-ml": "B.Tech CSE, MCA, and BCA students building AI/ML demos",
  mern: "B.Tech, BCA, and MCA students defending full-stack MERN systems",
  ecommerce: "CS and BBA students who need a storefront with real checkout logic",
  mobile: "Students submitting Flutter or React Native mobile apps",
};

export function readyTopicProjects(): Project[] {
  return projects.filter((p) => p.hasDocPreviews === true);
}

export function getTopicProject(slug: string): Project | undefined {
  const p = projects.find((x) => x.slug === slug);
  if (!p || !p.hasDocPreviews) return undefined;
  return p;
}

export function topicPath(slug: string): string {
  return `/project-topics/${slug}`;
}

export function topicSeoTitle(project: Project): string {
  return `${project.title} Final Year Project — Code, Report & PPT`;
}

export function topicMetaDescription(project: Project): string {
  return `${project.title} final year project kit with working source code, 8-chapter report, presentation slides, and viva prep. ${project.tagline}`;
}

export function topicH1(project: Project): string {
  return `${project.title} — final year project kit`;
}

export function topicAudience(project: Project): string {
  return CATEGORY_DEGREE_HINT[project.category];
}

export function topicVivaAngles(project: Project): string[] {
  return project.features.slice(0, 5);
}

export function relatedTopicProjects(project: Project, limit = 4): Project[] {
  return readyTopicProjects()
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, limit);
}
