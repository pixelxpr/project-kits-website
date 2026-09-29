import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";
import {
  categoryHubs,
  degreeHubs,
  categoryNav,
  projectsForHub,
  type ProjectHub,
} from "@/lib/project-hubs";
import { projects } from "@/lib/projects";
import { hubInterestMessage } from "@/lib/whatsapp-messages";

export default function ProjectHubView({
  hub,
  showAllCategories = false,
}: {
  hub: ProjectHub;
  /** Main catalog: render every category section */
  showAllCategories?: boolean;
}) {
  const list = projectsForHub(hub);
  const cats = categoryNav();

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <nav className="font-mono text-xs text-text-faint mb-8 flex flex-wrap gap-2 items-center">
        <Link href="/" className="hover:text-teal transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/final-year-projects" className="hover:text-teal transition-colors">
          Final year projects
        </Link>
        {hub.path !== "/final-year-projects" && (
          <>
            <span>/</span>
            <span className="text-text-muted">{hub.label}</span>
          </>
        )}
      </nav>

      <header className="max-w-3xl mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
          Project catalog
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text leading-[1.25]">
          {hub.h1}
        </h1>
        <p className="text-text-muted mt-4 text-lg leading-relaxed">{hub.intro}</p>
        <p className="font-mono text-xs text-text-faint mt-4">
          {list.length} kit{list.length === 1 ? "" : "s"}
          {hub.categoryId ? ` in this category` : ` available`} · From ₹1,499
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/final-year-projects"
          className={`font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-lg border transition-colors ${
            hub.path === "/final-year-projects"
              ? "bg-teal text-white border-teal"
              : "border-border text-text-muted hover:border-teal/40 hover:text-teal"
          }`}
        >
          All ({projects.length})
        </Link>
        {cats.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className={`font-mono text-xs uppercase tracking-wider px-3 py-2 rounded-lg border transition-colors ${
              hub.categoryId === c.id
                ? "bg-teal text-white border-teal"
                : "border-border text-text-muted hover:border-teal/40 hover:text-teal"
            }`}
          >
            {c.label} ({c.count})
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {degreeHubs.map((d) => (
          <Link
            key={d.slug}
            href={d.path}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              hub.slug === d.slug
                ? "border-teal/40 bg-teal/10 text-teal"
                : "border-border text-text-muted hover:border-teal/30 hover:text-text"
            }`}
          >
            {d.label}
          </Link>
        ))}
      </div>

      {hub.ideas.length > 0 && (
        <section className="mb-14 rounded-2xl border border-border bg-paper-raised p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-text mb-4">
            Popular ideas in this track
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {hub.ideas.map((idea) => (
              <li key={idea} className="flex items-start gap-2.5 text-sm text-text-muted">
                <span className="text-teal font-mono mt-0.5 shrink-0">▸</span>
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showAllCategories ? (
        <div className="space-y-16">
          {categoryHubs.map((cat) => {
            const catProjects = projectsForHub(cat);
            if (catProjects.length === 0) return null;
            return (
              <section key={cat.slug} id={cat.slug} className="scroll-mt-28">
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-text">{cat.label}</h2>
                    <p className="text-sm text-text-muted mt-1 max-w-xl line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <Link
                    href={cat.path}
                    className="shrink-0 font-mono text-xs text-teal hover:underline"
                  >
                    View hub →
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {catProjects.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section>
          <h2 className="font-display text-2xl font-bold text-text mb-6">
            {hub.categoryId ? "Kits in this category" : "Recommended kits"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 grid sm:grid-cols-2 gap-4">
        <Link
          href="/blog/choosing-a-final-year-project"
          className="rounded-2xl border border-border bg-paper-card p-5 hover:border-teal/40 transition-colors"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-teal">Guide</p>
          <p className="font-display font-semibold text-text mt-2">
            How to choose a project you won&apos;t regret
          </p>
        </Link>
        <Link
          href="/blog/ai-vs-mern-final-year-project"
          className="rounded-2xl border border-border bg-paper-card p-5 hover:border-teal/40 transition-colors"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-teal">Guide</p>
          <p className="font-display font-semibold text-text mt-2">
            AI vs MERN — honest comparison for viva
          </p>
        </Link>
      </section>

      <div className="mt-14 p-6 rounded-2xl border border-border bg-paper-card">
        <p className="font-display font-semibold text-text mb-1">
          Need help picking a kit for your course?
        </p>
        <p className="text-sm text-text-muted mb-5">
          Message us with your degree (B.Tech / BCA / BBA / MCA) and domain — we&apos;ll recommend
          a kit you can demo and defend.
        </p>
        <WhatsAppInlineCta
          message={hubInterestMessage(hub.label)}
        />
      </div>
    </div>
  );
}
