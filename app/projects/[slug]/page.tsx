import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  getProject,
  getProjectMetaDescription,
  projectDeliveryMode,
} from "@/lib/projects";
import { getProjectGuides } from "@/lib/project-related";
import { BASE_PRICE_INR, chargeInr, formatInr } from "@/lib/pricing";
import ChatMockup from "@/components/ChatMockup";
import StampBadge from "@/components/StampBadge";
import FaqAccordion from "@/components/FaqAccordion";
import ProjectBuyPanel from "@/components/ProjectBuyPanel";
import CheckoutButton from "@/components/CheckoutButton";
import StickyBookBar from "@/components/StickyBookBar";
import Breadcrumbs, { JsonLd } from "@/components/Breadcrumbs";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import DocPreviewGallery from "@/components/DocPreviewGallery";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import {
  breadcrumbJsonLd,
  productKitJsonLd,
  projectBreadcrumbs,
} from "@/lib/json-ld";
import { topicPath } from "@/lib/project-topics";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const ogImage = `https://finalyearkit.com/api/covers/${slug}`;
  const description = getProjectMetaDescription(project);
  return {
    title: `${project.title} — Final Year Project`,
    description,
    alternates: {
      canonical: `https://finalyearkit.com/projects/${slug}`,
    },
    openGraph: {
      type: "website",
      siteName: "Final Year Projects",
      title: `${project.title} — Final Year Project`,
      description,
      url: `https://finalyearkit.com/projects/${slug}`,
      images: [{ url: ogImage, width: 1280, height: 720, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Final Year Project`,
      description,
      images: [ogImage],
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI / ML",
  mern: "MERN Stack",
  ecommerce: "E-commerce",
  mobile: "Mobile Apps",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  const crumbs = projectBreadcrumbs(project);
  const showScreenshots = project.hasScreenshots !== false;
  const screenshotCount = project.screenshotCount ?? 3;
  const showDocPreviews = project.hasDocPreviews === true;
  const reportPreviewCount = project.reportPreviewCount ?? 3;
  const slidePreviewCount = project.slidePreviewCount ?? 3;
  const deliveryMode = projectDeliveryMode(project);
  const baseDue = chargeInr(deliveryMode, []);

  return (
    <div className="pb-24 md:pb-0">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={productKitJsonLd(project)} />
      <StickyBookBar
        projectSlug={project.slug}
        projectTitle={project.title}
        deliveryMode={deliveryMode}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8">
        <Breadcrumbs items={crumbs} />
      </div>

      {/* Header */}
      <section id="project-hero" className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider bg-paper-card border border-border text-teal px-2 py-1 rounded-sm">
              {CATEGORY_LABELS[project.category] ?? project.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25] mt-4">
              {project.title}
            </h1>
            <p className="text-text-muted mt-3 text-lg leading-relaxed">{project.tagline}</p>
            {project.hasDocPreviews && (
              <p className="mt-3 text-sm">
                <Link href={topicPath(project.slug)} className="text-teal hover:underline">
                  Topic overview — problem, stack & viva angles →
                </Link>
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs rounded-sm bg-paper-card border border-border px-2 py-1 text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <p
              className={`mt-6 inline-flex font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                deliveryMode === "instant"
                  ? "border-teal/40 bg-teal/10 text-teal"
                  : "border-border bg-paper-raised text-text-muted"
              }`}
            >
              {deliveryMode === "instant"
                ? "Instant download"
                : "50% now · deliver in a few hours"}
            </p>
            <div className="mt-5">
              <CheckoutButton
                projectSlug={project.slug}
                projectTitle={project.title}
                deliveryMode={deliveryMode}
                addonIds={[]}
                amountInr={baseDue}
                label={
                  deliveryMode === "instant"
                    ? `Buy · ${formatInr(BASE_PRICE_INR)}`
                    : `Pay 50% · ${formatInr(baseDue)}`
                }
              />
            </div>
            <p className="mt-3 font-mono text-xs text-text-faint leading-relaxed max-w-md">
              From {formatInr(BASE_PRICE_INR)} · code + report + slides. Optional add-ons below.
            </p>
          </div>
          <FadeIn delay={0.15} className="relative overflow-visible">
            {showScreenshots ? (
              <div className="relative aspect-video rounded-xl border border-border overflow-hidden bg-paper-card shadow-[0_16px_40px_-20px_rgba(11,31,58,0.35)]">
                <Image
                  src={`/projects/${slug}/screenshot-1.jpg`}
                  alt={`${project.title} screenshot`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <ChatMockup {...project.demoExchange} />
            )}
            {/* Outside overflow-hidden media so the stamp is not clipped */}
            <StampBadge
              className="absolute -top-4 -right-2 sm:-top-5 sm:-right-5 z-10 w-[4.75rem] h-[4.75rem] sm:w-[5.5rem] sm:h-[5.5rem] text-[10px] sm:text-xs px-2 py-2"
              text="TESTED"
            />
          </FadeIn>
        </div>
      </section>

      {/* Screenshots gallery */}
      {showScreenshots && (
        <section className="border-y border-border bg-paper-raised">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="font-display text-xl font-bold text-text">Screenshots</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ScreenshotGallery
                slug={project.slug}
                title={project.title}
                count={screenshotCount}
              />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Demo video */}
      {project.demoYoutubeId && (
        <section className="border-y border-border bg-paper-raised">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-teal" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <h2 className="font-display text-xl font-bold text-text">Watch the demo</h2>
              </div>
              <YouTubeEmbed videoId={project.demoYoutubeId} title={project.title} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Report + PPT sample pages */}
      {showDocPreviews && (
        <section className="border-y border-border">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
            <FadeIn>
              <h2 className="font-display text-xl font-bold text-text mb-2">
                Report &amp; slides preview
              </h2>
              <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
                Sample pages from the Word report and presentation deck — so you can see the academic
                deliverables before you book.
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <DocPreviewGallery
                slug={project.slug}
                title={project.title}
                reportCount={reportPreviewCount}
                slideCount={slidePreviewCount}
              />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Description + features */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <FadeIn className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-text mb-4">What it does</h2>
            <p className="text-text-muted leading-relaxed">{project.description}</p>

            <h2 className="font-display text-xl font-bold text-text mt-10 mb-4">Features</h2>
            <ul className="space-y-2.5">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-text-muted">
                  <span className="text-success font-mono mt-0.5">{"\u2713"}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-xl surface p-6 h-fit lg:sticky lg:top-24">
              <h3 className="font-display font-semibold text-text mb-4">What&apos;s included</h3>
              <ul className="space-y-2.5 text-sm">
                {project.whatIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-text-muted">
                    <span className="text-teal font-mono mt-0.5">{"\u2713"}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[11px] text-text-faint leading-relaxed">
                Package from {formatInr(BASE_PRICE_INR)}. See pricing below for Instant vs
                made-to-order and optional add-ons.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-paper-raised border-y border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <FadeIn>
            <h2 className="font-display text-xl font-bold text-text mb-2">Buy this project</h2>
            <p className="text-text-muted mb-8">
              {formatInr(BASE_PRICE_INR)} for code + report + slides. Add-ons are optional and
              unchecked by default.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ProjectBuyPanel
              projectSlug={project.slug}
              projectTitle={project.title}
              deliveryMode={deliveryMode}
            />
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-5 sm:px-8 py-16">
        <FadeIn>
          <h2 className="font-display text-xl font-bold text-text mb-6">Questions about this project</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <FaqAccordion items={project.faq} />
        </FadeIn>
      </section>

      {/* Related guides — builds crawlable inlinks both ways */}
      {(() => {
        const guides = getProjectGuides(slug, project.category);
        if (guides.length === 0) return null;
        return (
          <section className="border-t border-border">
            <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
              <FadeIn>
                <h2 className="font-display text-lg font-semibold text-text-muted mb-2">
                  Guides for this project
                </h2>
                <p className="text-sm text-text-faint mb-8">
                  Viva prep and architecture notes that match this project.
                </p>
              </FadeIn>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block h-full rounded-xl border border-border/80 bg-paper p-5 hover:border-border transition-colors"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                        {post.category}
                      </span>
                      <p className="font-display font-medium text-text mt-2 leading-snug text-sm">
                        {post.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })()}

      {/* More projects — same category, fill from others if needed */}
      {(() => {
        const same = projects.filter((p) => p.category === project.category && p.slug !== slug);
        const fillers = projects.filter((p) => p.category !== project.category && p.slug !== slug);
        const related = [...same, ...fillers].slice(0, 6);
        if (related.length === 0) return null;
        return (
          <section className="border-t border-border bg-paper-raised">
            <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
              <FadeIn>
                <h2 className="font-display text-lg font-semibold text-text-muted mb-8">
                  More projects
                </h2>
              </FadeIn>
              <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <StaggerItem key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex flex-col gap-2 rounded-xl border border-border/80 bg-paper p-5 hover:border-border transition-colors"
                    >
                      <p className="font-display font-medium text-text group-hover:text-teal transition-colors leading-snug text-sm">
                        {p.title}
                      </p>
                      <p className="text-sm text-text-faint leading-relaxed line-clamp-2">
                        {p.tagline}
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        );
      })()}
    </div>
  );
}
