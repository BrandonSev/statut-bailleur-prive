import { StatusBanner } from "@/components/StatusBanner";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
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
        {/* Simulateur en premier, visible immédiatement */}
        <section className="pt-28 pb-6 bg-muted">
          <div className="container mx-auto px-4 text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Simulateur du statut du bailleur privé
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Estimez votre avantage fiscal en quelques secondes selon votre situation.
            </p>
          </div>
          <SimulateurSection />
          <p className="text-center text-xs text-muted-foreground mt-4">
            Simulation gratuite • Résultat immédiat • Étude personnalisée possible
          </p>
        </section>
        <HeroSection />
        <TimelineSection />
        <AdvantagesSection />
        <RatesSection />
        <ComparatifSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
