import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemAgitation from "@/components/ProblemAgitation";
import SolutionPresentation from "@/components/SolutionPresentation";
import FeaturedMotorcycles from "@/components/FeaturedMotorcycles";
import ServiceBenefits from "@/components/ServiceBenefits";
import PricingTransparency from "@/components/Princing";
import TestimonialsSection from "@/components/Testimonials";
import FAQSection from "@/components/FaqSection";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
       <Hero />
       <ProblemAgitation />
       <SolutionPresentation />
       <FeaturedMotorcycles />
       <ServiceBenefits />
       <PricingTransparency />
       <TestimonialsSection />
       <FAQSection />
       <ContactSection />
       <Footer />
    </>
  );
}
