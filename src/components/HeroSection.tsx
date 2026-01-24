import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Shield } from "lucide-react";

export const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSimulateur = () => {
    document.getElementById("simulateur")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-trust-light via-background to-gold-light overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-gold-light text-foreground border-gold hover:bg-gold-light">
            <Shield className="w-3 h-3 mr-1" />
            Nouveau dispositif 2025
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Investissez dans l'immobilier neuf avec le{" "}
            <span className="text-primary">Dispositif Jeanbrun</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Le nouveau <strong>Statut du Bailleur Privé</strong> vous permet de bénéficier 
            d'avantages fiscaux exceptionnels tout en constituant un patrimoine immobilier solide.
          </p>

          {/* Key points */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-medium">Réduction d'impôts</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-medium">Revenus locatifs</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-medium">Patrimoine sécurisé</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToContact} className="text-lg px-8">
              Télécharger le guide gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToSimulateur} className="text-lg px-8">
              Simuler mes économies
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Accompagnement par des experts de confiance</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">années d'expérience</p>
              </div>
              <div className="w-px h-12 bg-border hidden md:block" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">investisseurs accompagnés</p>
              </div>
              <div className="w-px h-12 bg-border hidden md:block" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">2</p>
                <p className="text-sm text-muted-foreground">agences en France</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
