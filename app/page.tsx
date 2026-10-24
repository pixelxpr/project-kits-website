import { projects } from "@/lib/projects";
import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhatsIncluded from "@/components/sections/WhatsIncluded";
import Pricing from "@/components/sections/Pricing";
import SocialProof from "@/components/sections/SocialProof";
import BlogPreview from "@/components/sections/BlogPreview";
import Faq from "@/components/sections/Faq";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects projects={projects} />
      <WhatsIncluded />
      <Pricing />
      <SocialProof />
      <Faq />
      <BlogPreview />
    </div>
  );
}
