import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { SimulateurSection } from "@/components/SimulateurSection";
import { ProgrammesSection } from "@/components/ProgrammesSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <SimulateurSection />
        <ProgrammesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
