import type { Metadata } from "next";
import ProjectHubView from "@/components/ProjectHubView";
import { getDegreeHub } from "@/lib/project-hubs";

const hub = getDegreeHub("mca")!;

export const metadata: Metadata = {
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

export default function McaProjectsPage() {
  return <ProjectHubView hub={hub} />;
}
