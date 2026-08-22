import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import ChatMockup from "@/components/ChatMockup";
import StampBadge from "@/components/StampBadge";
import FaqAccordion from "@/components/FaqAccordion";
import PricingTiers from "@/components/PricingTiers";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Final Year Project Kit | FinalYearKit`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Final Year Project Kit`,
      description: project.tagline,
      url: `https://finalyearkit.com/projects/${slug}`,
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
              <h2 className="font-display text-xl font-bold text-text mb-6">Screenshots</h2>
            </FadeIn>
            <StaggerGroup className="grid sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <StaggerItem key={n}>
                  <div className="relative aspect-video rounded-lg border border-border bg-void-card overflow-hidden">
                    <Image
                      src={`/projects/${project.slug}/screenshot-${n}.jpg`}
                      alt={`${project.title} screenshot ${n}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* Demo video */}
      {project.demoYoutubeId && (
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-12">
          <FadeIn>
            <h2 className="font-display text-xl font-bold text-text mb-6">Watch the demo</h2>
            <div className="relative w-full rounded-xl overflow-hidden border border-border bg-void-card" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${project.demoYoutubeId}?rel=0&modestbranding=1`}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </FadeIn>
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
