import type { Metadata } from "next";
import Script from "next/script";
import { Inter, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://finalyearkit.com"),
  title: `${site.brandName} \u2014 Final Year & College Project Kits That Actually Work`,
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
    title: `${site.brandName} \u2014 Final Year & College Project Kits That Actually Work`,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FinalYearKit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} \u2014 Final Year & College Project Kits That Actually Work`,
    description: site.description,
    images: ["/og-image.png"],
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
      className={`${inter.variable} ${plexMono.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-void">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        {/* Google Analytics — lazyOnload defers until page is fully idle */}
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
