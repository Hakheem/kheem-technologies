import { WhoIsThisFor } from "@/components/general/WhoIsThisFor";
import { Hero } from "@/components/layout/HeroSection";
import { MainCta } from "@/components/general/MainCTA";
import { ProblemSection } from "@/components/general/ProblemSection";
import { SolutionSection } from "@/components/general/SolutionSection";
import { ServicesSection } from "@/components/general/ServicesSection";
import { ProcessSection } from "@/components/general/Process";
import { WorkSection } from "@/components/general/WorkSection";
import { TestimonialsSection } from "@/components/general/Testimonial";
import { FinalCTASection } from "@/components/general/FinalCTA";
import { TrustedSection } from "@/components/general/TrustedBy";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Hero />
      <WhoIsThisFor />
      <ProblemSection />
      <SolutionSection />
      <ServicesSection />
      <TrustedSection/>
      <ProcessSection />
      <WorkSection />
      <TestimonialsSection />
      <FinalCTASection />
      {/* <MainCta /> */}
    </div>
  );
}
