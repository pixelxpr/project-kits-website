/**
 * SEO topic landings at /project-topics/[slug] for ready projects.
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

function clampMeta(s: string, max: number): string {
  const n = s.replace(/\s+/g, " ").trim();
  if (n.length <= max) return n;
  const cut = n.slice(0, max - 1);
  const i = cut.lastIndexOf(" ");
  const base = (i > Math.floor(max * 0.55) ? cut.slice(0, i) : cut).replace(
    /[,:;.\-–—]\s*$/,
    "",
  );
  return `${base}…`;
}

/** Keep SERP titles ≤60 chars (Ahrefs / Google truncation). */
export function topicSeoTitle(project: Project): string {
  return clampMeta(`${project.title} — Final Year Project`, 60);
}

/** Keep meta descriptions ≤155 chars. */
export function topicMetaDescription(project: Project): string {
  const base = `${project.title}: code, 8-chapter report, slides & viva prep. ${project.tagline}`;
  return clampMeta(base, 155);
}

export function topicH1(project: Project): string {
  return `${project.title} — final year project`;
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
