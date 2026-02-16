import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { SimulateurSection } from "@/components/SimulateurSection";

export const HeroSection = () => {
  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-trust-dark via-primary to-primary/90 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Colonne gauche – Texte */}
          <div>
            <Badge className="mb-6 bg-foreground/10 text-white border-white/20 hover:bg-foreground/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse" />
              Plan de relance logement 2026
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Statut du bailleur privé
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
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

          {/* Colonne droite – Simulateur existant */}
          <div className="w-full">
            <SimulateurSection />
          </div>
        </div>
      </div>
    </section>
  );
};
