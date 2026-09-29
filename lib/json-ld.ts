import type { Project } from "@/lib/projects";
import { getProjectMetaDescription } from "@/lib/projects";
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

/** Product + AggregateOffer (Starter–Complete). No review/aggregateRating. */
export function productKitJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const starter = site.pricingTiers[0];
  const complete = site.pricingTiers[site.pricingTiers.length - 1];

  const lowPrice = starter.price.replace(/[^\d]/g, "");
  const highPrice = complete.price.replace(/[^\d]/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${project.title} — Final Year Project Kit`,
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
