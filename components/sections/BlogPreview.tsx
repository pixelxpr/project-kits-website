import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import FadeIn from "@/components/motion/FadeIn";

export default function BlogPreview() {
  const posts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-12">
        <FadeIn className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="font-display text-lg font-semibold text-text-muted">From the blog</h2>
          <Link href="/blog" className="font-mono text-xs text-text-faint hover:text-teal transition-colors">
            All posts →
          </Link>
        </FadeIn>
        <ul className="grid sm:grid-cols-3 gap-x-8 gap-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                  {post.category} · {post.readTime}
                </p>
                <p className="font-display text-sm font-medium text-text mt-1 group-hover:text-teal transition-colors leading-snug">
                  {post.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
