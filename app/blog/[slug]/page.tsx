import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { blogPosts, getBlogPost } from "@/lib/blog";
import WhatsAppInlineCta from "@/components/WhatsAppInlineCta";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://finalyearkit.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://finalyearkit.com/blog/${slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FinalYearKit Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — FinalYearKit Blog`,
      description: post.excerpt,
      images: ["/og-image.png"],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Architecture": "text-cyan border-cyan/30 bg-cyan/10",
  "Viva Prep":    "text-violet border-violet/30 bg-violet/10",
  "Guides":       "text-success border-success/30 bg-success/10",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const catCls = CATEGORY_COLORS[post.category] ?? "text-text-muted border-border bg-void-card";

  // Related posts — same category, excluding current
  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  const otherPosts = related.length > 0
    ? related
    : blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Article */}
      <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-cyan transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All posts
        </Link>

        {/* Meta */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 rounded-full ${catCls}`}>
            {post.category}
          </span>
          <span className="font-mono text-xs text-text-faint">{post.readTime}</span>
          <span className="text-border">·</span>
          <time dateTime={post.date} className="font-mono text-xs text-text-faint">
            {formattedDate}
          </time>
        </div>

        {/* Title & excerpt */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-5 leading-tight">
          {post.title}
        </h1>
        <p className="text-text-muted mt-4 text-lg leading-relaxed border-l-2 border-cyan/40 pl-4 italic">
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="mt-10 border-t border-border" />

        {/* Body */}
        <div className="mt-10 prose-custom">
          <ReactMarkdown
            components={{
              h2: ({ node: _node, ...props }) => (
                <h2
                  className="font-display text-2xl font-bold text-text mt-12 mb-4 pb-3 border-b border-border"
                  {...props}
                />
              ),
              h3: ({ node: _node, ...props }) => (
                <h3
                  className="font-display text-xl font-semibold text-text mt-8 mb-3"
                  {...props}
                />
              ),
              p: ({ node: _node, ...props }) => (
                <p className="text-text-muted leading-[1.85] mb-6 text-[1.05rem]" {...props} />
              ),
              strong: ({ node: _node, ...props }) => (
                <strong className="text-text font-semibold" {...props} />
              ),
              ul: ({ node: _node, ...props }) => (
                <ul className="space-y-3 mb-6 pl-1" {...props} />
              ),
              ol: ({ node: _node, ...props }) => (
                <ol className="space-y-3 mb-6 pl-5 list-decimal marker:text-cyan marker:font-mono marker:text-sm" {...props} />
              ),
              li: ({ node: _node, ...props }) => (
                <li className="text-text-muted leading-relaxed flex gap-3">
                  <span className="text-cyan mt-1.5 shrink-0 text-xs">▸</span>
                  <span {...props} />
                </li>
              ),
              code: ({ node: _node, ...props }) => (
                <code
                  className="font-mono text-sm bg-void-card border border-border rounded px-1.5 py-0.5 text-cyan"
                  {...props}
                />
              ),
              blockquote: ({ node: _node, ...props }) => (
                <blockquote
                  className="border-l-2 border-cyan/40 pl-4 my-6 italic text-text-muted"
                  {...props}
                />
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-14 p-6 rounded-2xl border border-border bg-void-card">
          <p className="font-display font-semibold text-text mb-1">
            Ready to work on your own project?
          </p>
          <p className="text-sm text-text-muted mb-5">
            We build complete project kits with source code, report, slides, and viva prep — message us on WhatsApp to get started.
          </p>
          <WhatsAppInlineCta
            message={`Hi! I read "${post.title}" on your blog and want to know more about your project kits.`}
          />
        </div>
      </article>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 sm:px-8 pb-20">
          <div className="border-t border-border pt-12">
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6">
              More posts
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {otherPosts.map((p) => {
                const cc = CATEGORY_COLORS[p.category] ?? "text-text-muted border-border bg-void-card";
                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col p-5 rounded-2xl border border-border bg-void-card hover:border-cyan/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 rounded-full ${cc}`}>
                        {p.category}
                      </span>
                      <span className="font-mono text-[10px] text-text-faint">{p.readTime}</span>
                    </div>
                    <p className="font-display font-semibold text-text group-hover:text-cyan transition-colors leading-snug text-sm">
                      {p.title}
                    </p>
                    <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed">{p.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
