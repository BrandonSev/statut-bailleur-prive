import { Building2, CalendarCheck, ShieldCheck, Landmark, BarChart3 } from "lucide-react";

const secondaryCards = [
  {
    icon: Building2,
    title: "Logements éligibles",
    text: "Le dispositif concerne exclusivement les logements situés dans des bâtiments d’habitation collectifs, sur l’ensemble du territoire français, avec une priorité et une facilité d'application aux logements neufs. Les opérations dans l’ancien sont possibles sous conditions exigeantes de réhabilitation lourde et de conformité technique.",
  },
  {
    icon: CalendarCheck,
    title: "Engagement encadré et flexible",
    text: "Le dispositif prévoit un engagement locatif nu de 9 ans minimum, tout en permettant une détention prolongée et la poursuite de l’amortissement au-delà de cette période. En cas de revente après la période minimale, les amortissements pratiqués ne sont pas remis en cause.",
  },
  {
    icon: ShieldCheck,
    title: "Une stratégie locative modulable",
    text: "L’investisseur choisit un niveau de loyer (Intermédiaire, Social ou Très social) déterminant le taux d’amortissement applicable. Plus le loyer est abordable, plus l’avantage fiscal est renforcé. Les plafonds de loyers et de ressources sont définis selon la zone du bien.",
  },
  {
    icon: Landmark,
    title: "Une stratégie de détention optimisée",
    text: "Le mécanisme articule optimisation fiscale et constitution d’un actif immobilier durable, inscrit dans une logique patrimoniale long terme. Pour les contribuables fortement fiscalisés (TMI 30 % et plus), l’amortissement permet de réduire la pression sur les revenus fonciers et les prélèvements sociaux. Le cas échéant, un déficit foncier peut être imputé sur le revenu global dans la limite prévue par la loi (10 700 € par an). Une analyse personnalisée reste indispensable pour mesurer l’effet réel du dispositif.",
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
              Le dispositif permet de réduire la base imposable de vos revenus locatifs pendant plusieurs années grâce à
              un mécanisme d’amortissement encadré par la loi de finances 2026. Concrètement, jusqu’à 80 % de la valeur
              du bien (hors foncier) peut être amortie progressivement.
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
