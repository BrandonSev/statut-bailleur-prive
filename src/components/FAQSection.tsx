import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Peut-on investir dès maintenant ?",
    answer: "Pas encore. Le texte a été adopté en janvier 2026, mais les décrets d'application n'ont pas été publiés. Il est prudent d'attendre leur parution avant de concrétiser un projet pour éviter toute mauvaise surprise sur les critères d'éligibilité."
  },
  {
    question: "Puis-je louer le bien à un proche ?",
    answer: "Non, la loi interdit expressément de louer aux membres du foyer fiscal ainsi qu'aux ascendants et descendants (parents, enfants, petits-enfants). Cette mesure vise à éviter les montages d'optimisation intrafamiliaux."
  },
  {
    question: "Comment déterminer le loyer maximum ?",
    answer: "Le plafond dépend de la zone géographique du bien et du niveau de conventionnement choisi. Les barèmes s'appuient sur les anciens plafonds Pinel, avec un coefficient correcteur basé sur la surface. Trois niveaux existent : standard, modéré (-15%) et très modéré (-30%)."
  },
  {
    question: "Quelle est la différence concrète avec le Pinel ?",
    answer: "Le Pinel offrait une réduction d'impôt plafonnée. Le nouveau mécanisme crée une charge déductible du revenu global. Concrètement, cela peut générer un déficit imputable sur vos autres revenus (salaires, etc.), ce qui n'était pas possible avant."
  },
  {
    question: "Sur quelle période le dispositif est-il ouvert ?",
    answer: "Les acquisitions réalisées entre le 1er janvier 2026 et le 31 décembre 2028 sont visées par le texte actuel. L'amortissement s'étale ensuite sur 9 années pleines de location effective."
  },
  {
    question: "Y a-t-il une limite au nombre de logements ?",
    answer: "Oui, le bénéfice est plafonné à deux biens par foyer fiscal. Au-delà, l'amortissement supplémentaire n'est plus admis en déduction."
  }
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Vos interrogations
            </h2>
            <p className="text-muted-foreground text-lg">
              Les points essentiels à connaître avant de vous lancer
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
