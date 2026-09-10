import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export default function BlogPreview() {
  const posts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
      <FadeIn className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">Blog</p>
          <h2 className="font-display text-3xl font-bold text-text">From the blog</h2>
          <p className="text-text-muted mt-3 max-w-xl">
            Architecture explainers, viva prep, and project-picking guides.
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex font-mono text-sm text-teal hover:underline shrink-0"
        >
          View all posts &rarr;
        </Link>
      </FadeIn>

      <StaggerGroup className="grid sm:grid-cols-3 gap-5 mt-10">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-border bg-paper-card overflow-hidden hover:border-teal/40 transition-colors"
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
              <div className="p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] text-text-faint">
                  <span>{post.readTime}</span>
                  <span>&middot;</span>
                  <span>{post.category}</span>
                </div>
                <p className="font-display font-semibold text-text mt-2 group-hover:text-teal transition-colors">
                  {post.title}
                </p>
                <p className="text-sm text-text-muted mt-2 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-8 sm:hidden">
        <Link href="/blog" className="font-mono text-sm text-teal hover:underline">
          View all posts &rarr;
        </Link>
      </div>
    </section>
  );
}
