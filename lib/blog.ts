// blog.ts — post data lives in blog-posts.json (avoids template-literal escaping issues).

import posts from "./blog-posts.json";

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  body: string;
};

export const blogPosts: BlogPost[] = posts as BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
