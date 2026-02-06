import { StatusBanner } from "@/components/StatusBanner";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { RatesSection } from "@/components/RatesSection";
import { SimulateurSection } from "@/components/SimulateurSection";
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
        <HeroSection />
        <AdvantagesSection />
        <RatesSection />
        <SimulateurSection />
        <ComparatifSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
