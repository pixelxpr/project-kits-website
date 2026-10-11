"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AdsFooter, AdsHeader } from "@/components/AdsSiteChrome";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdsLanding = pathname?.startsWith("/ads");

  if (isAdsLanding) {
    return (
      <>
        <AdsHeader />
        <main className="flex-1">{children}</main>
        <AdsFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
