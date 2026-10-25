import type { Project } from "@/lib/projects";
import { getProjectMetaDescription } from "@/lib/projects";
import type { BlogPost } from "@/lib/blog";
import { blogCoverAbsoluteUrl } from "@/lib/blog-cover";
import { site } from "@/lib/site";

const BASE = "https://finalyearkit.com";

export type Crumb = {
  name: string;
  /** Absolute URL or site path starting with / */
  href: string;
};

export function absoluteUrl(href: string): string {
  if (href.startsWith("http")) return href;
  if (href === "/") return `${BASE}/`;
  return `${BASE}${href.startsWith("/") ? href : `/${href}`}`;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

const CATEGORY_LABEL: Record<Project["category"], string> = {
  "ai-ml": "AI / ML",
  mern: "MERN Stack",
  ecommerce: "E-commerce",
  mobile: "Mobile Apps",
};

export function projectCategoryPath(category: Project["category"]): string {
  return `/final-year-projects/${category}`;
}

export function projectBreadcrumbs(project: Project): Crumb[] {
  return [
    { name: "Home", href: "/" },
    { name: "Final year projects", href: "/final-year-projects" },
    {
      name: CATEGORY_LABEL[project.category],
      href: projectCategoryPath(project.category),
    },
    { name: project.title, href: `/projects/${project.slug}` },
  ];
}

export function hubBreadcrumbs(hub: {
  path: string;
  label: string;
}): Crumb[] {
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Final year projects", href: "/final-year-projects" },
  ];
  if (hub.path !== "/final-year-projects") {
    crumbs.push({ name: hub.label, href: hub.path });
  }
  return crumbs;
}

/** Sitewide Organization — required by Ahrefs / Google for publisher entity. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/og-image.jpg`,
      width: 1280,
      height: 720,
    },
    email: site.email,
    sameAs: [
      `https://www.instagram.com/${site.instagramHandle}/`,
      `https://www.youtube.com/@${site.youtubeHandle}`,
    ].filter(Boolean),
  };
}

/** Category / catalog pages — list of projects. */
export function itemListJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.url),
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

type WebArticleInput = {
  headline: string;
  description: string;
  path: string;
  image: string;
  /** ISO date YYYY-MM-DD — defaults to a stable site launch date when unknown */
  datePublished?: string;
  dateModified?: string;
  /** e.g. Guide, Comparison — Helps Ahrefs AI Discoverability */
  articleSection?: string;
};

/**
 * Guide / comparison pages Ahrefs classifies as Article
 * (project-topics, github-vs-kit, etc.) — plain Article type.
 */
export function webArticleJsonLd(input: WebArticleInput) {
  const url = absoluteUrl(input.path);
  const published = input.datePublished ?? "2026-03-01";
  const modified = input.dateModified ?? published;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: [input.image.startsWith("http") ? input.image : absoluteUrl(input.image)],
    datePublished: published,
    dateModified: modified,
    articleSection: input.articleSection,
    author: {
      "@type": "Person",
      name: site.author.name,
      url: `${BASE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: site.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

/** Blog posts — Article + BlogPosting for AI / rich-result crawlers. */
export function articleJsonLd(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    headline: post.title,
    description: post.excerpt,
    image: [blogCoverAbsoluteUrl(post.slug)],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${BASE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: site.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    isPartOf: {
      "@type": "Blog",
      name: "Final Year Project Guides",
      url: `${BASE}/blog`,
    },
  };
}

/** Product + AggregateOffer (base ₹999 through base + all add-ons). No review/aggregateRating. */
export function productKitJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const low = site.pricingTiers[0];
  const high = site.pricingTiers[site.pricingTiers.length - 1];

  const lowPrice = low.price.replace(/[^\d]/g, "");
  const highPrice = high.price.replace(/[^\d]/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${project.title} — Final Year Project`,
    description: getProjectMetaDescription(project),
    image: [`${BASE}/api/covers/${project.slug}`],
    sku: project.slug,
    brand: {
      "@type": "Brand",
      name: site.brandName,
    },
    category: CATEGORY_LABEL[project.category],
    url,
    offers: {
      "@type": "AggregateOffer",
      url,
      priceCurrency: "INR",
      lowPrice,
      highPrice,
      offerCount: site.pricingTiers.length,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: site.brandName,
      },
    },
  };
}
