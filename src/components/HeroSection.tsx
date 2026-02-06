import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const scrollToRates = () => {
    document.getElementById("taux")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-gradient-to-br from-trust-dark via-primary to-primary/90 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl">
          {/* Badge */}
          <Badge className="mb-6 bg-foreground/10 text-white border-white/20 hover:bg-foreground/20 backdrop-blur-sm">
            <span className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse" />
            PLF 2026 – Article 12 octies
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Le Dispositif{" "}
            <span className="text-gold">Jeanbrun</span>
            <br />
            Expliqué Simplement
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            Le successeur du Pinel transforme la fiscalité des bailleurs privés : 
            amortissement jusqu'à 5,5%, déficit foncier de 10 700 euros, sans zonage. 
            Réservé aux logements collectifs uniquement.
          </p>

          {/* CTA */}
          <Button 
            size="lg" 
            onClick={scrollToRates} 
            className="text-lg px-8 bg-white text-primary hover:bg-white/90"
          >
            Découvrir les taux
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Date indicator */}
          <p className="mt-10 text-white/50 text-sm">
            Données à jour — 30 janvier 2026
          </p>
        </div>
      </div>
    </section>
  );
};
