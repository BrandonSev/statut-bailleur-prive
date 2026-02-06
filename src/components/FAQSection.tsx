import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Le dispositif Jeanbrun est-il déjà en vigueur ?",
    answer: "Non. Au 26 janvier 2026, le gouvernement a utilisé l'article 49.3 le 20 janvier 2026, mais la loi n'est pas encore définitivement promulguée. Le dispositif a été officiellement nommé \"Relance Logement\" lors de sa présentation gouvernementale le 23 janvier 2026. Aucun décret d'application n'a été publié."
  },
  {
    question: "Puis-je louer à ma famille ?",
    answer: "Non. L'amendement I-3970 exclut explicitement la location aux ascendants, descendants et beaux-parents jusqu'au 2e degré. Cette interdiction vise à prévenir les schémas d'optimisation fiscale familiale."
  },
  {
    question: "Comment sont calculés les plafonds de loyer ?",
    answer: "Les plafonds de loyer sont basés sur les plafonds Pinel par zone ABC, ajustés par un coefficient de structure (0,7 + 19/Surface, plafonné à 1,2). Plafonds 2025 : A bis : 19,51 €/m², A : 14,49 €/m², B1 : 11,68 €/m², B2 : 10,15 €/m², C : 10,15 €/m². Niveau intermédiaire = plafond Pinel, social = Pinel × 0,85 (-15%), très social = Pinel × 0,70 (-30%)."
  },
  {
    question: "Quelle différence entre amortissement et crédit d'impôt ?",
    answer: "Le crédit d'impôt (Pinel) réduisait directement l'impôt dû, avec un plafond lié au montant de l'impôt. L'amortissement (Jeanbrun) est une charge déductible qui réduit le revenu imposable. Il peut être imputé sur le revenu global, une première pour un dispositif immobilier. Concrètement, l'amortissement peut créer un déficit qui réduit l'impôt sur les salaires et autres revenus."
  },
  {
    question: "Quand le dispositif entre-t-il en application ?",
    answer: "Le dispositif couvre les acquisitions réalisées entre le 1er janvier 2026 et le 31 décembre 2028. Cependant, son application effective dépend de la promulgation de la loi de finances et de la publication des décrets. Les professionnels recommandent d'attendre les textes officiels avant de s'engager."
  },
  {
    question: "Combien de biens puis-je acquérir ?",
    answer: "Le dispositif est limité à maximum 2 biens par foyer fiscal. Cette limite vise à concentrer l'avantage fiscal sur les petits et moyens investisseurs plutôt que sur les grands portefeuilles."
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
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground text-lg">
              Réponses aux questions les plus courantes
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
