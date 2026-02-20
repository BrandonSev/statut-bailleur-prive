import { Building2, CalendarCheck, ShieldCheck, Landmark, BarChart3 } from "lucide-react";

const secondaryCards = [
  { icon: Building2, title: "Logements éligibles", text: "Appartements neufs ou rénovés destinés à la location nue." },
  {
    icon: CalendarCheck,
    title: "Engagement de location",
    text: "Location en résidence principale pendant une durée minimale de 9 ans.",
  },
  {
    icon: ShieldCheck,
    title: "Plafonds encadrés",
    text: "Respect des plafonds de loyers et de ressources des locataires.",
  },
  {
    icon: Landmark,
    title: "Objectif patrimonial",
    text: "Constituer un patrimoine immobilier avec une fiscalité optimisée.",
  },
];

export const MecanismeSection = () => {
  return (
    <section id="mecanisme" className="w-full bg-background py-16 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-primary-dark">
          Les avantages du statut du bailleur privé
        </h2>
        <p className="text-center text-muted-foreground text-sm md:text-base mb-10 max-w-2xl mx-auto">
          Dispositif Jeanbrun : Un mécanisme d’amortissement fiscal inédit pour optimiser durablement vos revenus
          locatifs.
        </p>

        <div className="rounded-2xl border border-primary/15 bg-trust-light p-6 md:p-8 mb-6 flex gap-5 items-start">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BarChart3 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-2 text-primary-dark">
              Amortissement fiscal du bien immobilier
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Le statut du bailleur privé permet d'amortir jusqu'à 80 % de la valeur du bien, ce qui réduit la base
              imposable et diminue la fiscalité sur les revenus locatifs pendant plusieurs années.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {secondaryCards.map((card, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-trust-light flex items-center justify-center shrink-0">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1 text-primary-dark">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
