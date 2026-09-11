import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — FinalYearKit",
  description:
    "Architecture explainers, viva prep guides, and project-picking advice — written from the same final year project kits we build.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "https://finalyearkit.com/blog",
    title: "Blog — FinalYearKit",
    description:
      "Architecture explainers, viva prep guides, and project-picking advice — written from the same final year project kits we build.",
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "FinalYearKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — FinalYearKit",
    description:
      "Architecture explainers, viva prep guides, and project-picking advice — written from the same final year project kits we build.",
    images: ["/og-image.jpg"],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Architecture: "text-teal border-teal/30 bg-teal/10",
  "Viva Prep": "text-text border-border bg-paper-raised",
  Guides: "text-success border-success/30 bg-success/10",
};

function CategoryBadge({ category }: { category: string }) {
  const cls = CATEGORY_COLORS[category] ?? "text-text-muted border-border bg-paper-card";
  return (
    <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 rounded-full ${cls}`}>
      {category}
    </span>
  );
}

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20">
      <div className="mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">Blog</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-text leading-[1.25]">
          Guides, explainers &amp; viva prep
        </h1>
        <p className="text-text-muted mt-4 max-w-xl leading-relaxed">
          Written from the same projects and viva sessions we build kits around. No filler.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <span className="font-mono text-xs text-text-faint">{blogPosts.length} posts</span>
          <span className="text-border">·</span>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.keys(CATEGORY_COLORS).map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
        </div>
      </div>

      <Link
        href={`/blog/${featured.slug}`}
        className="group block rounded-2xl border border-border bg-paper-card hover:border-teal/40 transition-all duration-300 overflow-hidden mb-6"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[280px] bg-paper-raised">
            <Image
              src={`/api/blog-covers/${featured.slug}`}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <CategoryBadge category={featured.category} />
              <span className="font-mono text-xs text-text-faint">{featured.readTime}</span>
              <span className="font-mono text-xs text-text-faint">
                {new Date(featured.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text group-hover:text-teal transition-colors duration-200 leading-snug">
              {featured.title}
            </h2>
            <p className="text-text-muted mt-3 leading-relaxed">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-2 font-mono text-sm text-teal">
              Read
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-paper-card hover:border-teal/40 transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-[16/10] bg-paper-raised border-b border-border">
              <Image
                src={`/blog/${post.slug}.png`}
                alt=""
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4 gap-2">
                <CategoryBadge category={post.category} />
                <span className="font-mono text-[10px] text-text-faint shrink-0">{post.readTime}</span>
              </div>
              <h2 className="font-display font-bold text-text group-hover:text-teal transition-colors duration-200 leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-sm text-text-muted mt-3 leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                <time className="font-mono text-[10px] text-text-faint">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className="text-text-muted group-hover:text-teal group-hover:translate-x-0.5 transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
