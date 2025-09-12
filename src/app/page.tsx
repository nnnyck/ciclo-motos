import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemAgitation from "@/components/ProblemAgitation";
import SolutionPresentation from "@/components/SolutionPresentation";
import FeaturedMotorcycles from "@/components/FeaturedMotorcycles";
import ServiceBenefits from "@/components/ServiceBenefits";
import PricingTransparency from "@/components/Princing";

export default function Home() {
  return (
    <>
      <Header />
       <Hero />
       <ProblemAgitation />
       <SolutionPresentation />
       <FeaturedMotorcycles />
       <ServiceBenefits />
       <PricingTransparency />
    </>
  );
}
