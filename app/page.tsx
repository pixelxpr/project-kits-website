import { projects } from "@/lib/projects";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Categories from "@/components/sections/Categories";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const heroProject = projects[0];

  return (
    <div>
      <Hero heroProject={heroProject} />
      <TrustBar />
      <FeaturedProjects projects={projects} />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview />
      <Pricing />
      <Faq />
      <CtaBanner />
    </div>
  );
}
