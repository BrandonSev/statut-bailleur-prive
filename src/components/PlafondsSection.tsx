import { Wallet, Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const ZONES = [
  { label: "A bis", intermediaire: "19,51 €", social: "13,64 €", tres_social: "10,63 €" },
  { label: "A", intermediaire: "14,49 €", social: "10,49 €", tres_social: "8,18 €" },
  { label: "B1", intermediaire: "11,68 €", social: "9,04 €", tres_social: "7,04 €" },
  { label: "B2", intermediaire: "10,15 €", social: "8,67 €", tres_social: "6,74 €" },
  { label: "C", intermediaire: "10,15 €", social: "8,05 €", tres_social: "6,25 €" },
];

const AMORTISSEMENTS = [
  { niveau: "Intermédiaire", montant: "8 000", taux: "3,5 %", texte: "Plafond annuel minimal d'amortissement." },
  { niveau: "Social", montant: "10 000", taux: "4,5 %", texte: "Avantage fiscal renforcé." },
  { niveau: "Très social", montant: "12 000", taux: "5,5 %", texte: "Niveau maximal d'incitation fiscale." },
];

export const PlafondsSection = () => {
  return (
    <section id="plafonds" className="w-full bg-secondary py-16 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary-dark">Plafonds &amp; taux applicables</h2>
        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl">
          Les avantages fiscaux sont encadrés par des plafonds de loyers et des limites annuelles d'amortissement.
        </p>

        <div className="lg:grid lg:grid-cols-2 lg:gap-10 relative">
          {/* Plafonds de loyers */}
          <div className="mb-12 lg:mb-0">
            <h3 className="text-base font-semibold mb-4 text-primary-dark">
              Plafonds de loyers par zone (€/m²)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="inline w-3.5 h-3.5 text-muted-foreground cursor-help align-text-bottom ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-[220px]">
                      Le loyer final intègre un coefficient multiplicateur selon la surface légale à louer du logement.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2.5 pr-4 font-semibold text-foreground/70">Zone</th>
                    <th className="text-right py-2.5 px-2 font-semibold text-foreground/70">Intermédiaire</th>
                    <th className="text-right py-2.5 px-2 font-semibold text-foreground/70">Social</th>
                    <th className="text-right py-2.5 pl-2 font-semibold text-foreground/70">Très social</th>
                  </tr>
                </thead>
                <tbody>
                  {ZONES.map((zone) => (
                    <tr key={zone.label} className="border-b border-border/50">
                      <td className="py-2.5 pr-4 font-medium text-foreground">{zone.label}</td>
                      <td className="py-2.5 px-2 text-right font-semibold text-primary">{zone.intermediaire}</td>
                      <td className="py-2.5 px-2 text-right font-semibold text-primary">{zone.social}</td>
                      <td className="py-2.5 pl-2 text-right font-semibold text-primary">{zone.tres_social}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-gray-600 leading-relaxed">
              <p className="font-medium text-gray-800 mb-1.5">Fondement juridique des plafonds de loyers</p>

              <p className="mb-2">
                Conformément aux dispositions issues de la loi de finances 2026 publiées au Journal Officiel le 20
                février, le dispositif Jeanbrun renvoie :
              </p>

              <ul className="list-disc pl-5 mb-2 space-y-1">
                <li>
                  pour le logement locatif intermédiaire, aux plafonds prévus à l’article 199 novovicies III du Code
                  général des impôts, fixés à l’article 2 terdecies D de l’annexe III du CGI ;
                </li>
                <li>
                  pour le logement locatif social et très social, aux conventions mentionnées à l’article L.321-8 du
                  Code de la construction et de l’habitation, auxquelles renvoie l’article 199 tricies du CGI, les
                  montants étant précisés à l’article 2 terdecies G de l’annexe III du CGI.
                </li>
              </ul>

              <p className="mb-1.5">Ces plafonds sont exprimés hors charges et actualisés annuellement.</p>

              <p className="italic">
                Cette approche permet de sécuriser l’analyse et d’éviter toute approximation dans l’application des
                plafonds, dans un contexte réglementaire en évolution.
              </p>
            </div>
          </div>

          {/* Plafonds d'amortissement */}
          <div className="mb-8 lg:mb-0 sticky top-0">
            <h3 className="text-base font-semibold mb-4 text-primary-dark">Plafonds annuels d'amortissement</h3>
            <div className="flex flex-col gap-4">
              {AMORTISSEMENTS.map((item) => (
                <div
                  key={item.niveau}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-trust-light flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">
                      {item.niveau} ({item.taux})
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {item.montant}&nbsp;€<span className="text-sm font-medium text-muted-foreground"> / an</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{item.texte}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center pt-2">
              Barèmes en vigueur depuis la publication des textes officiels le 20/02/2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
