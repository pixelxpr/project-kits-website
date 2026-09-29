import type { Metadata } from "next";
import ProjectHubView from "@/components/ProjectHubView";
import { mainCatalogHub } from "@/lib/project-hubs";

export const metadata: Metadata = {
  title: mainCatalogHub.seoTitle,
  description: mainCatalogHub.description,
  alternates: { canonical: mainCatalogHub.path },
  openGraph: {
    type: "website",
    siteName: "FinalYearKit",
    url: `https://finalyearkit.com${mainCatalogHub.path}`,
    title: mainCatalogHub.seoTitle,
    description: mainCatalogHub.description,
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "FinalYearKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: mainCatalogHub.seoTitle,
    description: mainCatalogHub.description,
    images: ["/og-image.jpg"],
  },
};

export default function FinalYearProjectsPage() {
  return <ProjectHubView hub={mainCatalogHub} showAllCategories />;
}
