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
    title: "Amortissement fiscal",
    description: "Contrairement au Pinel (crédit d'impôt), le dispositif Jeanbrun propose un amortissement annuel de 3,5% à 5,5% déductible du revenu global."
  },
  {
    icon: MapPin,
    title: "Sans zonage",
    description: "Fini les zones A, A bis, B1 du Pinel. Le dispositif s'applique sur tout le territoire français, métropole et outre-mer."
  },
  {
    icon: Building2,
    title: "Logements collectifs uniquement",
    description: "Le dispositif est réservé aux immeubles collectifs. Les maisons individuelles sont exclues, qu'elles soient neuves ou rénovées."
  },
  {
    icon: Wallet,
    title: "Déficit foncier",
    description: "L'amortissement peut créer un déficit déductible du revenu global, plafonné à 10 700 €/an, réduisant l'impôt sur les autres revenus."
  },
  {
    icon: Clock,
    title: "Engagement 9 ans",
    description: "Durée de location fixe en résidence principale du locataire. Le bien doit être loué nu (non meublé)."
  },
  {
    icon: Home,
    title: "Plafonds Pinel par zone",
    description: "Loyers plafonnés selon les barèmes Pinel par zone ABC : A bis (19,51 €/m²), A (14,49 €/m²), B1 (11,68 €/m²), B2/C (10,15 €/m²)."
  }
];

export const AdvantagesSection = () => {
  return (
    <section id="avantages" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Points clés du dispositif
          </h2>
          <p className="text-muted-foreground text-lg">
            Un changement de paradigme pour l'investissement locatif en France
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
