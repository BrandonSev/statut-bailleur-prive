import { Building2, CalendarCheck, PiggyBank, TrendingDown } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "1. Vous investissez",
    text: "Achat d'un appartement neuf ou rénové éligible, destiné à la location nue en résidence principale.",
  },
  {
    icon: CalendarCheck,
    title: "2. Vous vous engagez 9 ans",
    text: "Location sous plafonds de loyers et de ressources du locataire.",
  },
  {
    icon: PiggyBank,
    title: "3. Vous amortissez 80 % du bien",
    text: "Une partie du prix est déduite fiscalement chaque année, dans la limite des plafonds annuels.",
  },
  {
    icon: TrendingDown,
    title: "4. Vous réduisez votre impôt",
    text: "L'amortissement vient diminuer vos revenus fonciers et donc votre fiscalité.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-primary-dark">
          Comment fonctionne le dispositif ?
        </h2>
        <p className="text-center text-muted-foreground text-sm md:text-base mb-10">
          Un mécanisme simple basé sur l'amortissement fiscal.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-trust-light flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1 text-primary-dark">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
