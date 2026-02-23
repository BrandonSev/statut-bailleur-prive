import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Le dispositif Jeanbrun est-il officiellement en vigueur ?",
    a: "Oui. Le statut du bailleur privé a été instauré par la loi de finances 2026 (article 47), publiée au Journal Officiel le 20 février 2026. Il s’applique aux acquisitions réalisées (signature de l'acte authentique de vente chez le notaire) entre le 21 février 2026 et le 31 décembre 2028. Des précisions complémentaires pourront être apportées via la doctrine administrative (BOFiP).",
  },
  {
    q: "Comment fonctionne l’amortissement du statut du bailleur privé ?",
    a: "Le statut du bailleur privé permet de déduire chaque année un pourcentage du prix d’acquisition du logement (hors foncier estimé forfaitairement à 20 %), au titre de l’amortissement fiscal. Ce mécanisme réduit directement le revenu foncier imposable et diminue l’impôt sur les loyers perçus.",
  },
  {
    q: "Quels logements sont éligibles ?",
    a: "Logements neufs ou en VEFA Logements issus de réhabilitation lourde Situés dans un immeuble collectif Loués nus à usage de résidence principale",
  },
  {
    q: "Quels logements sont éligibles ?",
    a: "Logements collectifs neufs ou anciens rénovés répondant aux critères du dispositif.",
  },
  {
    q: "Le statut du bailleur privé est-il réservé aux zones tendues ?",
    a: "Le dispositif ne repose pas sur un zonage restrictif comparable au Pinel. Les plafonds de loyers et de ressources sont adaptés selon la zone du bien, mais l’investissement reste possible sur l’ensemble du territoire sous réserve de respecter les critères d’éligibilité.",
  },
  {
    q: "L’avantage fiscal est-il plafonné ?",
    a: "Oui. Le montant de l’amortissement déductible est plafonné : 8 000 € par an Majoré à 10 000 € ou 12 000 € selon la part de logements loués en social ou très social Le cumul total des amortissements ne peut excéder la valeur du bien hors foncier (forfaitairement estimé à 80 % du prix d’acquisition).",
  },
  {
    q: "Quelle est la durée d’engagement du statut du bailleur privé Jeanbrun ? ",
    a: "Le propriétaire s’engage à louer le bien nu à usage de résidence principale pendant une durée minimale de 9 ans. Il est toutefois possible de conserver le bien au-delà de cette période et de continuer à pratiquer l’amortissement dans la limite du plafond annuel et du montant total amortissable.",
  },
  {
    q: "Que se passe-t-il en cas de revente après 9 ans ?",
    a: "Si l’engagement minimal de 9 ans est respecté, les amortissements pratiqués ne sont pas remis en cause. En revanche, en cas de rupture anticipée, les amortissements peuvent être réintégrés fiscalement.",
  },
  {
    q: "L’amortissement peut-il créer un déficit foncier ?",
    a: "Oui. Si le montant de l’amortissement dépasse les revenus fonciers perçus, un déficit peut être constaté. Sous certaines conditions, ce déficit peut être imputé sur le revenu global dans la limite légale (10 700 € par an), le surplus étant reportable sur les revenus fonciers futurs.",
  },
  {
    q: "Peut-on investir via une SCI à l’IR ?",
    a: "Oui. Le dispositif est applicable aux sociétés non soumises à l’impôt sur les sociétés (SCI à l’IR notamment), sous réserve que les associés conservent leurs parts pendant la durée d’engagement locatif.",
  },
   {
    q: "Peut-on louer à un membre de sa famille ? ",
    a: "Non. Le logement ne peut pas être loué à un membre du foyer fiscal, ni à un ascendant ou descendant jusqu’au deuxième degré.,
  },
     {
    q: "Quelle est la différence entre le dispositif Jeanbrun et le Pinel, et pourquoi est-il présenté comme une alternative ?",
    a: "Contrairement au Pinel qui reposait sur une réduction d’impôt, le dispositif Jeanbrun fonctionne par amortissement fiscal. Il s’inscrit dans une logique patrimoniale de détention longue et peut s’avérer plus performant pour les contribuables fortement imposés (TMI 30 % et plus). Il ne s’agit pas d’une réduction d’impôt. Il s’agit d’un amortissement fiscal. Le dispositif n’est pas limité à certaines zones tendues. Il peut s’appliquer sur une durée plus longue que 9 ans",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="w-full bg-background py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-primary-dark">Les questions clés avant d’investir</h2>
        <p className="text-center text-muted-foreground text-sm md:text-base mb-10">
          Les réponses essentielles avant d'investir.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-2xl px-5 data-[state=open]:shadow-sm transition-shadow"
            >
              <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline text-primary-dark">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Une question spécifique ?{" "}
          <a href="#contact" className="text-primary underline underline-offset-2">
            Contactez-nous
          </a>{" "}
          pour une étude personnalisée.
        </p>
      </div>
    </section>
  );
};
