import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { blogPosts } from "@/lib/blog";
import { categoryHubs, degreeHubs, mainCatalogHub } from "@/lib/project-hubs";
import { readyTopicProjects, topicPath } from "@/lib/project-topics";

const BASE = "https://finalyearkit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}${mainCatalogHub.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...categoryHubs.map((h) => ({
      url: `${BASE}${h.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...degreeHubs.map((h) => ({
      url: `${BASE}${h.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${BASE}/project-topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/github-vs-kit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/refund`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const topicPages: MetadataRoute.Sitemap = readyTopicProjects().map((p) => ({
    url: `${BASE}${topicPath(p.slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...topicPages, ...blogPages];
}
