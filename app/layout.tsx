import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://finalyearkit.com"),
  title: `${site.brandName} — Submission-Ready Final Year Project Kits`,
  description: site.description,
  keywords: [
    "final year project",
    "college project",
    "final year project for btech",
    "final year project for bca",
    "final year project for bba",
    "final year project for mca",
    "engineering final year project",
    "computer science project",
    "ai ml project for students",
    "final year project with report",
    "final year project kit india",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://finalyearkit.com",
    siteName: site.brandName,
    title: `${site.brandName} — Submission-Ready Final Year Project Kits`,
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1280, height: 720, alt: "FinalYearKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} — Submission-Ready Final Year Project Kits`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  alternates: {
    types: {
      "application/rss+xml": "https://finalyearkit.com/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sourceSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-text">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z0E4JZRWYR"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z0E4JZRWYR');
          `}
        </Script>
      </body>
    </html>
  );
}
