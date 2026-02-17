import { StatusBanner } from "@/components/StatusBanner";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { RatesSection } from "@/components/RatesSection";
import { SimulateurSection } from "@/components/SimulateurSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PlafondsSection } from "@/components/PlafondsSection";
import { MecanismeSection } from "@/components/MecanismeSection";
import { ParcoursSection } from "@/components/ParcoursSection";

import { ComparatifSection } from "@/components/ComparatifSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StatusBanner />
      <Header />
      <main>
        {/* <HeroSection /> */}
        {/* <TimelineSection /> */}
        <SimulateurSection />
        {/* <HowItWorksSection /> */}
        <MecanismeSection />
        <PlafondsSection />
        <AdvantagesSection />
        <RatesSection />
        <ComparatifSection />
        <ParcoursSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
