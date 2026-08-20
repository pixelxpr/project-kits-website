import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

function PostThumb({ category }: { category: string }) {
  // Gradient placeholder thumbnail keyed off category — swap for a real
  // cover image per post whenever the blog engine is built.
  return (
    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gradient-to-br from-cyan/20 via-violet/20 to-magenta/20 border border-border flex items-center justify-center">
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">{category}</span>
    </div>
  );
}

export default function BlogPreview() {
  return (
    <section className="bg-void-raised border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
        <FadeIn className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-text">From the blog</h2>
            <p className="text-text-muted mt-3 max-w-xl">
              Architecture explainers, viva prep, and project-picking guides.
            </p>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex font-mono text-sm text-cyan hover:underline shrink-0">
            View all posts &rarr;
          </Link>
        </FadeIn>

        <StaggerGroup className="grid sm:grid-cols-3 gap-5 mt-10">
          {blogPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block rounded-xl glass overflow-hidden hover:border-cyan/40 transition-colors">
                <PostThumb category={post.category} />
                <div className="p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-text-faint">
                    <span>{post.readTime}</span>
                    <span>&middot;</span>
                    <span>{post.category}</span>
                  </div>
                  <p className="font-display font-semibold text-text mt-2 group-hover:text-cyan transition-colors">
                    {post.title}
                  </p>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-8 sm:hidden">
          <Link href="/blog" className="font-mono text-sm text-cyan hover:underline">
            View all posts &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
