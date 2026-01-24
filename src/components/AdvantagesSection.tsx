import { Card, CardContent } from "@/components/ui/card";
import { 
  PiggyBank, 
  Home, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users 
} from "lucide-react";

const advantages = [
  {
    icon: PiggyBank,
    title: "Réduction d'impôts significative",
    description: "Bénéficiez d'une réduction d'impôt sur le revenu proportionnelle à votre investissement immobilier."
  },
  {
    icon: Home,
    title: "Patrimoine immobilier",
    description: "Constituez un patrimoine solide et transmissible grâce à l'investissement dans le neuf."
  },
  {
    icon: TrendingUp,
    title: "Revenus locatifs garantis",
    description: "Percevez des revenus complémentaires réguliers grâce à la location de votre bien."
  },
  {
    icon: Shield,
    title: "Cadre juridique sécurisé",
    description: "Le Statut du Bailleur Privé offre un cadre légal clair et des garanties pour les investisseurs."
  },
  {
    icon: Clock,
    title: "Engagement flexible",
    description: "Choisissez la durée d'engagement qui correspond à votre stratégie patrimoniale."
  },
  {
    icon: Users,
    title: "Accompagnement expert",
    description: "Nos conseillers vous accompagnent de A à Z dans votre projet d'investissement."
  }
];

export const AdvantagesSection = () => {
  return (
    <section id="avantages" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-primary font-semibold mb-2">Pourquoi investir ?</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Les avantages du Dispositif Jeanbrun
          </h2>
          <p className="text-muted-foreground text-lg">
            Le nouveau Statut du Bailleur Privé offre des opportunités uniques 
            pour les investisseurs souhaitant allier défiscalisation et constitution de patrimoine.
          </p>
        </div>

        {/* Advantages grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((advantage, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-xl bg-trust-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <advantage.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
