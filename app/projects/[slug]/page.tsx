import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import ChatMockup from "@/components/ChatMockup";
import StampBadge from "@/components/StampBadge";
import FaqAccordion from "@/components/FaqAccordion";
import PricingTiers from "@/components/PricingTiers";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";
import FadeIn from "@/components/motion/FadeIn";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import YouTubeEmbed from "@/components/YouTubeEmbed";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const ogImage = `https://finalyearkit.com/api/covers/${slug}`;
  return {
    title: `${project.title} — Final Year Project Kit | FinalYearKit`,
    description: project.tagline,
    alternates: {
      canonical: `https://finalyearkit.com/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Final Year Project Kit`,
      description: project.tagline,
      url: `https://finalyearkit.com/projects/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Final Year Project Kit`,
      description: project.tagline,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-8">
        <Link href="/#projects" className="text-sm text-text-muted hover:text-cyan transition-colors">
          &larr; All project kits
        </Link>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <span className="font-mono text-[11px] uppercase tracking-wider bg-void-card border border-border text-cyan px-2 py-1 rounded-sm">
              {{ "ai-ml": "AI / ML", "mern": "MERN Stack", "ecommerce": "E-commerce" }[project.category]}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-text leading-tight mt-4">
              {project.title}
            </h1>
            <p className="text-text-muted mt-3 text-lg leading-relaxed">{project.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs rounded-sm bg-void-card border border-border px-2 py-1 text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <WhatsAppInlineCta message={`Hi! I'm interested in the ${project.title} project kit.`} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="relative">
            <ChatMockup {...project.demoExchange} />
            <StampBadge className="absolute -top-6 -right-4 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28" text="TESTED" />
          </FadeIn>
        </div>
      </section>

      {/* Screenshots gallery */}
      {project.hasScreenshots !== false && (
        <section className="border-y border-border bg-void-raised">
          <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="font-display text-xl font-bold text-text">Screenshots</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ScreenshotGallery
                slug={project.slug}
                title={project.title}
                count={project.screenshotCount ?? 3}
              />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Demo video */}
      {project.demoYoutubeId && (
        <section className="border-y border-border bg-void-raised">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
            <FadeIn>
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-cyan" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <h2 className="font-display text-xl font-bold text-text">Watch the demo</h2>
              </div>
              <YouTubeEmbed videoId={project.demoYoutubeId} title={project.title} />
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
            <div className="rounded-xl glass p-6 h-fit">
              <h3 className="font-display font-semibold text-text mb-4">What&apos;s included</h3>
              <ul className="space-y-2.5 text-sm">
                {project.whatIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-text-muted">
                    <span className="text-cyan font-mono mt-0.5">{"\u2713"}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <WhatsAppInlineCta message={`Hi! I'm interested in the ${project.title} project kit.`} full />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-void-raised border-y border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          <FadeIn>
            <h2 className="font-display text-xl font-bold text-text mb-2">Pricing</h2>
            <p className="text-text-muted mb-8">Same pricing tiers across every project kit.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <PricingTiers />
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
    </div>
  );
}
