import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  MapPin, 
  Building2, 
  Wallet, 
  Clock, 
  Home 
} from "lucide-react";

const keyPoints = [
  {
    icon: TrendingUp,
    title: "Déduction sur le revenu global",
    description: "L'amortissement génère une charge déductible impactant l'ensemble de vos revenus, pas seulement les revenus fonciers."
  },
  {
    icon: MapPin,
    title: "Liberté géographique",
    description: "Plus de restrictions de zones. Investissez là où le marché locatif a du sens, partout en France métropolitaine et outre-mer."
  },
  {
    icon: Building2,
    title: "Habitat collectif requis",
    description: "Seuls les appartements en immeuble collectif sont concernés. Les pavillons individuels restent exclus du périmètre."
  },
  {
    icon: Wallet,
    title: "Création de déficit possible",
    description: "Si l'amortissement dépasse vos revenus fonciers, le surplus s'impute sur votre revenu global (limite 10 700 €/an)."
  },
  {
    icon: Clock,
    title: "Bail de 9 ans",
    description: "Une durée unique et fixe. Le logement doit être loué non-meublé comme habitation principale du locataire."
  },
  {
    icon: Home,
    title: "Loyers encadrés",
    description: "Les plafonds varient selon la zone et le niveau de conventionnement choisi : standard, modéré ou très modéré."
  }
];

export const AdvantagesSection = () => {
  return (
    <section id="avantages" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Ce qui change pour les investisseurs
          </h2>
          <p className="text-muted-foreground text-lg">
            Un nouveau modèle fiscal pensé pour relancer l'offre de logements abordables
          </p>
        </div>

        {/* Key points grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {keyPoints.map((point, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6 md:p-8">
                <div className="w-12 h-12 rounded-xl bg-trust-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <point.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
