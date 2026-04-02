import { WhoIsThisFor } from "@/components/general/WhoIsThisFor";
import { Hero } from "@/components/layout/HeroSection";
import { MainCta } from "@/components/general/MainCTA";
import { ProblemSection } from "@/components/general/ProblemSection";
import { SolutionSection } from "@/components/general/SolutionSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Hero />
      <WhoIsThisFor />
      <ProblemSection />
      <SolutionSection />
      {/* <MainCta /> */}
    </div>
  );
}