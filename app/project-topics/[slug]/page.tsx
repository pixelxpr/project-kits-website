import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs, { JsonLd } from "@/components/Breadcrumbs";
import CheckoutButton from "@/components/CheckoutButton";
import {
  getTopicProject,
  readyTopicProjects,
  relatedTopicProjects,
  topicAudience,
  topicH1,
  topicMetaDescription,
  topicPath,
  topicSeoTitle,
  topicVivaAngles,
} from "@/lib/project-topics";
import { breadcrumbJsonLd, projectCategoryPath, webArticleJsonLd } from "@/lib/json-ld";
import { BASE_PRICE_INR, chargeInr, formatInr } from "@/lib/pricing";
import { projectDeliveryMode } from "@/lib/projects";

export function generateStaticParams() {
  return readyTopicProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getTopicProject(slug);
  if (!project) return {};
  const title = topicSeoTitle(project);
  const description = topicMetaDescription(project);
  const url = `https://finalyearkit.com${topicPath(slug)}`;
  const ogImage = `https://finalyearkit.com/api/covers/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: topicPath(slug) },
    openGraph: {
      type: "article",
      siteName: "Final Year Projects",
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1280, height: 720, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  "ai-ml": "AI / ML",
  mern: "MERN Stack",
  ecommerce: "E-commerce",
  mobile: "Mobile Apps",
};

export default async function ProjectTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getTopicProject(slug);
  if (!project) return notFound();

  const related = relatedTopicProjects(project);
  const deliveryMode = projectDeliveryMode(project);
  const due = chargeInr(deliveryMode, []);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Final year projects", href: "/final-year-projects" },
    { name: "Project topics", href: "/project-topics" },
    { name: project.title, href: topicPath(slug) },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16 pb-24">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={webArticleJsonLd({
          headline: topicSeoTitle(project),
          description: topicMetaDescription(project),
          path: topicPath(slug),
          image: `/api/covers/${slug}`,
          articleSection: "Guide",
        })}
      />
      <Breadcrumbs items={crumbs} className="mb-8" />

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        <article>
          <p className="font-mono text-[11px] uppercase tracking-wider text-teal mb-3">
            {CATEGORY_LABEL[project.category]} · Final year project topic
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25]">
            {topicH1(project)}
          </h1>
          <p className="text-text-muted mt-4 text-lg leading-relaxed">{project.tagline}</p>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-text mb-3">
              Problem this project solves
            </h2>
            <p className="text-text-muted leading-relaxed">{project.description}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-text mb-3">Who it fits</h2>
            <p className="text-text-muted leading-relaxed">{topicAudience(project)}.</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-text mb-3">Tech stack</h2>
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <li
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded-md border border-border bg-paper-raised text-text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-text mb-3">
              What you can defend in viva
            </h2>
            <ul className="space-y-2.5">
              {topicVivaAngles(project).map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-text-muted">
                  <span className="text-teal font-mono shrink-0 mt-0.5">▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-text mb-3">What&apos;s included</h2>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.whatIncluded.map((w) => (
                <li
                  key={w}
                  className="text-sm text-text-muted rounded-lg border border-border bg-paper-card px-3 py-2.5"
                >
                  {w}
                </li>
              ))}
            </ul>
            <p className="text-sm text-text-faint mt-4 leading-relaxed">
              From {formatInr(BASE_PRICE_INR)} ·{" "}
              {deliveryMode === "instant"
                ? "Instant download after payment"
                : "50% now · deliver in a few hours"}
              .
            </p>
          </section>
        </article>

        <aside className="lg:sticky lg:top-24 space-y-5">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-paper-raised">
            <Image
              src={`/api/covers/${project.slug}`}
              unoptimized
              alt={`${project.title} — final year project cover`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 360px"
            />
          </div>
          <div className="rounded-2xl border border-border bg-paper-card p-5 space-y-3">
            <CheckoutButton
              projectSlug={project.slug}
              projectTitle={project.title}
              deliveryMode={deliveryMode}
              addonIds={[]}
              amountInr={due}
              label={
                deliveryMode === "instant"
                  ? `Pay ${formatInr(due)} · download`
                  : `Pay ${formatInr(due)} · 50%`
              }
              className="w-full justify-center"
            />
            <Link
              href={`/projects/${project.slug}`}
              className="block text-center text-sm text-teal hover:underline"
            >
              Full project page — screenshots, pricing & FAQ →
            </Link>
            <Link
              href={projectCategoryPath(project.category)}
              className="block text-center text-xs text-text-faint hover:text-teal"
            >
              More {CATEGORY_LABEL[project.category]} projects
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="font-display text-xl font-bold text-text mb-5">Related topics</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={topicPath(p.slug)}
                  className="block rounded-xl border border-border bg-paper-raised px-4 py-3 hover:border-teal/40 transition-colors"
                >
                  <p className="font-display font-semibold text-text text-sm">{p.title}</p>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">{p.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
