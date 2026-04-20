import { WhoIsThisFor } from "@/components/general/WhoIsThisFor";
import { Hero } from "@/components/layout/HeroSection";
import { ProblemSection } from "@/components/general/ProblemSection";
import { SolutionSection } from "@/components/general/SolutionSection";
import { ServicesSection } from "@/components/general/ServicesSection";
import { ProcessSection } from "@/components/general/Process";
import { WorkSection } from "@/components/general/WorkSection";
import { TestimonialsSection } from "@/components/general/Testimonial";
import { TrustedSection } from "@/components/general/TrustedBy";
import { StrongCTA } from "@/components/general/StrongCTA";
import WhatWeProvide from "@/components/general/WhatWeProvide";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Hero />
      <WhoIsThisFor />
      <WhatWeProvide/>
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <TrustedSection/>
      <ProcessSection />
      <WorkSection />
      <TestimonialsSection />
   <StrongCTA
  backgroundImage="/images/home-cta-background.webp"
  buttonHref="/contact"
  secondaryButtonHref="/work"
  headingLine1="Build something amazing? "
  description="Custom description here"
  stats={[
    { value: "40+", label: "Projects" },
    { value: "99%", label: "Success Rate" }
  ]}
/>
    </div>
  );
}
