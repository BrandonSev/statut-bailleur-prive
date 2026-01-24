import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Qu'est-ce que le Dispositif Jeanbrun / Statut du Bailleur Privé ?",
    answer: "Le Dispositif Jeanbrun, officiellement appelé Statut du Bailleur Privé, est un nouveau dispositif fiscal mis en place par le ministre du Logement Vincent Jeanbrun. Il vise à encourager l'investissement locatif dans le neuf en offrant des avantages fiscaux aux particuliers qui s'engagent à louer leur bien sur une durée déterminée."
  },
  {
    question: "Quels sont les avantages fiscaux du dispositif ?",
    answer: "Le dispositif offre une réduction d'impôt sur le revenu calculée sur le prix d'acquisition du bien. Le taux de réduction varie selon la durée d'engagement locatif choisie : plus vous vous engagez longtemps, plus le taux est avantageux. Des avantages complémentaires peuvent s'appliquer selon votre situation."
  },
  {
    question: "Quelles sont les conditions pour bénéficier du dispositif ?",
    answer: "Pour bénéficier du Statut du Bailleur Privé, vous devez investir dans un logement neuf ou en VEFA, respecter des plafonds de loyers et de ressources des locataires définis par zone géographique, et vous engager à louer le bien nu à usage de résidence principale sur une durée minimale."
  },
  {
    question: "Quelles zones géographiques sont éligibles ?",
    answer: "Le dispositif s'applique dans les zones où la demande locative est forte. Nos programmes à Chartres (Eure-et-Loir) et Metz (Moselle) sont situés dans des zones éligibles. Nous proposons également des programmes dans d'autres villes de France répondant aux critères du dispositif."
  },
  {
    question: "Puis-je cumuler ce dispositif avec d'autres avantages ?",
    answer: "Le cumul avec d'autres dispositifs fiscaux est encadré par la loi. Nos conseillers analysent votre situation personnelle pour optimiser votre stratégie patrimoniale et fiscale. Une étude personnalisée vous permettra de connaître les meilleures options pour votre projet."
  },
  {
    question: "Comment se passe l'accompagnement avec Polyvalence Immobilier ?",
    answer: "Nous vous accompagnons de A à Z : étude de faisabilité, sélection du programme adapté à vos objectifs, montage du financement, suivi de la construction, mise en location et gestion locative si vous le souhaitez. Nos agences à Chartres et Metz sont à votre disposition."
  }
];

export const FAQSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">Questions fréquentes</p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Tout savoir sur le Dispositif Jeanbrun
            </h2>
            <p className="text-muted-foreground text-lg">
              Retrouvez les réponses aux questions les plus courantes sur le Statut du Bailleur Privé.
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

          {/* CTA */}
          <div className="mt-12 text-center bg-trust-light rounded-2xl p-8 border border-primary/20">
            <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nos conseillers experts sont disponibles pour répondre à toutes vos interrogations.
            </p>
            <Button size="lg" onClick={scrollToContact}>
              Poser ma question
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
