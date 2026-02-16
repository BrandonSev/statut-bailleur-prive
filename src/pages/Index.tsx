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
        {/* Hero */}
        <section className="pt-28 pb-10 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Statut du bailleur privé
            </h1>
            <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl mx-auto">
              Simulateur officiel et estimation personnalisée de votre avantage fiscal immobilier
            </p>
          </div>
        </section>

        {/* Simulateur */}
        <section className="pb-6 bg-muted">
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
