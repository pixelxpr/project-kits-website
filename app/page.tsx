import { projects } from "@/lib/projects";
import Hero from "@/components/sections/Hero";
import KitIncludes from "@/components/sections/KitIncludes";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import HowItWorks from "@/components/sections/HowItWorks";
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
      <KitIncludes />
      <FeaturedProjects projects={projects} />
      <HowItWorks />
      <Pricing />
      <SocialProof />
      <BlogPreview />
      <Faq />
    </div>
  );
}
