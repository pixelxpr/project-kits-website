/** On-page + OG cover for a blog post. Static diagram in /public/blog-covers. */
export function blogCoverSrc(slug: string): string {
  return `/blog-covers/${slug}.jpg`;
}

export function blogCoverAbsoluteUrl(slug: string): string {
  return `https://finalyearkit.com${blogCoverSrc(slug)}`;
}
