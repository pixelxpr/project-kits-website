import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdsDestinationView from "@/components/AdsDestinationView";
import { adsDestinations, getAdsDestination } from "@/lib/ad-landing";

export function generateStaticParams() {
  return adsDestinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getAdsDestination(slug);
  if (!dest) return {};
  return {
    title: dest.seoTitle,
    description: dest.description,
    robots: { index: false, follow: true },
    alternates: { canonical: `https://finalyearkit.com${dest.path}` },
    openGraph: {
      type: "website",
      siteName: "Final Year Projects",
      url: `https://finalyearkit.com${dest.path}`,
      title: dest.seoTitle,
      description: dest.description,
      images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "Final year projects" }],
    },
  };
}

export default async function AdsDestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getAdsDestination(slug);
  if (!dest) return notFound();
  return <AdsDestinationView destination={dest} />;
}
