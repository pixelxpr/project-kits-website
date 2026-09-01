import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — FinalYearKit",
  description: "Architecture explainers, viva prep guides, and project-picking advice — written directly from the same college and final year project kits that we build.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "https://finalyearkit.com/blog",
    title: "Blog — FinalYearKit",
    description: "Architecture explainers, viva prep guides, and project-picking advice — written directly from the same college and final year project kits that we build.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Architecture": "text-cyan border-cyan/30 bg-cyan/10",
  "Viva Prep":    "text-violet border-violet/30 bg-violet/10",
  "Guides":       "text-success border-success/30 bg-success/10",
};

function CategoryBadge({ category }: { category: string }) {
  const cls = CATEGORY_COLORS[category] ?? "text-text-muted border-border bg-void-card";
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 rounded-full ${cls}`}>
      {category}
    </span>
  );
}

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">

      {/* Header */}
      <div className="mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-3">Blog</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-text leading-tight">
          Guides, explainers &amp;<br className="hidden sm:block" /> viva prep
        </h1>
        <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
          Real posts — written from the same projects and viva sessions we build kits around. No filler.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <span className="font-mono text-xs text-text-faint">{blogPosts.length} posts</span>
          <span className="text-border">·</span>
          <div className="flex items-center gap-2">
            {Object.entries(CATEGORY_COLORS).map(([cat]) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured post */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group block rounded-2xl border border-border bg-void-card hover:border-cyan/40 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.15)] transition-all duration-300 overflow-hidden mb-6"
      >
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-5">
            <CategoryBadge category={featured.category} />
            <span className="font-mono text-xs text-text-faint">{featured.readTime}</span>
            <span className="font-mono text-xs text-text-faint">
              {new Date(featured.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </div>
          <div className="sm:flex sm:items-end sm:justify-between gap-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-text group-hover:text-cyan transition-colors duration-200 leading-snug max-w-2xl">
                {featured.title}
              </h2>
              <p className="text-text-muted mt-3 leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>
            </div>
            <div className="shrink-0 mt-5 sm:mt-0 flex items-center gap-2 font-mono text-sm text-cyan group-hover:gap-3 transition-all duration-200">
              Read
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      {/* Remaining posts — 2 or 3 column grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-void-card hover:border-cyan/40 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.12)] transition-all duration-300 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <CategoryBadge category={post.category} />
              <span className="font-mono text-[10px] text-text-faint">{post.readTime}</span>
            </div>
            <h2 className="font-display font-bold text-text group-hover:text-cyan transition-colors duration-200 leading-snug flex-1">
              {post.title}
            </h2>
            <p className="text-sm text-text-muted mt-3 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
              <time className="font-mono text-[10px] text-text-faint">
                {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
              </time>
              <span className="text-text-muted group-hover:text-cyan group-hover:translate-x-0.5 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
