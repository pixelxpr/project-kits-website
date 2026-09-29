import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHubView from "@/components/ProjectHubView";
import { categoryHubs, getCategoryHub } from "@/lib/project-hubs";

export function generateStaticParams() {
  return categoryHubs.map((h) => ({ category: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const hub = getCategoryHub(category);
  if (!hub) return {};
  return {
    title: hub.seoTitle,
    description: hub.description,
    alternates: { canonical: hub.path },
    openGraph: {
      type: "website",
      siteName: "FinalYearKit",
      url: `https://finalyearkit.com${hub.path}`,
      title: hub.seoTitle,
      description: hub.description,
      images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "FinalYearKit" }],
    },
    twitter: {
      card: "summary_large_image",
      title: hub.seoTitle,
      description: hub.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const hub = getCategoryHub(category);
  if (!hub) return notFound();
  return <ProjectHubView hub={hub} />;
}
