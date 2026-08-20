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
  return { title: `${post.title} — Blog`, description: post.excerpt };
}

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

  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <Link href="/blog" className="text-sm text-text-muted hover:text-cyan transition-colors">
        &larr; All posts
      </Link>

      <div className="mt-6 flex items-center gap-3 font-mono text-xs text-text-faint">
        <span className="text-cyan">{post.category}</span>
        <span>&middot;</span>
        <span>{post.readTime}</span>
        <span>&middot;</span>
        <time dateTime={post.date}>{formattedDate}</time>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
        {post.title}
      </h1>
      <p className="text-text-muted mt-4 text-lg leading-relaxed">{post.excerpt}</p>

      <div className="mt-10 pt-10 border-t border-border">
        <ReactMarkdown
          components={{
            h2: ({ node: _node, ...props }) => <h2 className="font-display text-2xl font-bold text-text mt-10 mb-4" {...props} />,
            h3: ({ node: _node, ...props }) => <h3 className="font-display text-xl font-semibold text-text mt-8 mb-3" {...props} />,
            p: ({ node: _node, ...props }) => <p className="text-text-muted leading-relaxed mb-5" {...props} />,
            strong: ({ node: _node, ...props }) => <strong className="text-text font-semibold" {...props} />,
            ul: ({ node: _node, ...props }) => <ul className="space-y-2 mb-5 pl-1" {...props} />,
            li: ({ node: _node, ...props }) => (
              <li className="text-text-muted leading-relaxed flex gap-2.5">
                <span className="text-cyan mt-0.5 shrink-0">&#8226;</span>
                <span {...props} />
              </li>
            ),
            code: ({ node: _node, ...props }) => <code className="font-mono text-sm bg-void-card border border-border rounded px-1.5 py-0.5 text-cyan" {...props} />,
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>

      <div className="mt-14">
        <WhatsAppInlineCta message={`Hi! I read "${post.title}" and wanted to ask about your project kits.`} />
      </div>
    </article>
  );
}
