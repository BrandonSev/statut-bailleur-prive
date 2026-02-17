import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { SimulateurSection } from "@/components/SimulateurSection";

export const HeroSection = () => {
  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[85vh] flex items-center bg-gradient-to-br from-trust-dark via-primary to-primary/90 overflow-hidden pt-20 pb-8 md:pt-24 md:pb-10">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-40 w-[500px] h-[500px] bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Colonne gauche – Texte */}
          <div className="max-w-[560px]">
            <Badge className="mb-8 bg-foreground/10 text-white border-white/20 hover:bg-foreground/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse" />
              Plan de relance logement 2026
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Statut du bailleur privé
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed">
              Estimez votre avantage fiscal et découvrez les opportunités
              d'investissement immobilier adaptées à votre situation.
            </p>

            <Button
              size="lg"
              onClick={scrollToTimeline}
              className="text-lg px-8 bg-white text-primary hover:bg-white/90"
            >
              Comprendre le dispositif
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Colonne droite – Simulateur dans card premium */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[560px] max-h-[72vh] overflow-y-auto bg-white rounded-[16px] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.25)] p-5 md:p-6">
              <SimulateurSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
