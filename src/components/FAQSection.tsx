import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Le dispositif Jeanbrun est-il officiellement en vigueur ?",
    a: "Le dispositif est intégré à la loi de finances 2026. Certaines modalités restent susceptibles d'être précisées par les décrets d'application.",
  },
  {
    q: "Quelle est la durée d'engagement ?",
    a: "L'engagement de location est de 9 ans minimum en résidence principale.",
  },
  {
    q: "Peut-on louer à un membre de sa famille ?",
    a: "Sous conditions de respect des plafonds de ressources et hors foyer fiscal, selon les règles fiscales en vigueur.",
  },
  {
    q: "Quels logements sont éligibles ?",
    a: "Logements collectifs neufs ou anciens rénovés répondant aux critères du dispositif.",
  },
  {
    q: "L'avantage fiscal est-il plafonné ?",
    a: "Oui. L'amortissement annuel est encadré par des plafonds selon le niveau choisi (intermédiaire, social, très social).",
  },
  {
    q: "Quelle différence avec le Pinel ?",
    a: "Le Pinel reposait sur une réduction d'impôt. Le statut du bailleur privé repose sur un mécanisme d'amortissement fiscal venant réduire la base imposable des revenus locatifs.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="w-full bg-background py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#123768" }}>
          Questions fréquentes
        </h2>
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
              <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline" style={{ color: "#123768" }}>
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Une question spécifique ? <a href="#contact" className="text-primary underline underline-offset-2">Contactez-nous</a> pour une étude personnalisée.
        </p>
      </div>
    </section>
  );
};
