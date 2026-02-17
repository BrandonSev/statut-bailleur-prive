import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparatif = [
  { critere: "Nature de l'avantage fiscal", bailleur: "Charge déductible du revenu (amortissement)", pinel: "Réduction d'impôt directe" },
  { critere: "Durée d'engagement", bailleur: "9 ans (fixe)", pinel: "6, 9 ou 12 ans (modulable)" },
  { critere: "Plafonds de loyers", bailleur: "Oui, par zone et niveau de loyer", pinel: "Oui, par zone" },
  { critere: "Plafonds de ressources", bailleur: "Oui, selon le niveau de loyer choisi", pinel: "Oui" },
  { critere: "Zonage", bailleur: "Tout le territoire", pinel: "Zones tendues uniquement" },
  { critere: "Impact sur revenus fonciers", bailleur: "Réduit la base imposable des revenus locatifs", pinel: "Aucun impact sur les revenus fonciers" },
  { critere: "Logements éligibles", bailleur: "Collectif neuf ou réhabilité (rénovation ≥ 30 %)", pinel: "Neuf en zone éligible uniquement" },
];

export const ComparatifSection = () => {
  return (
    <section id="comparatif" className="w-full bg-background py-16 md:py-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary-dark">
          Statut du bailleur privé vs Pinel : ce qui change
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl">
          Un mécanisme différent, basé sur l'amortissement plutôt que sur une réduction d'impôt.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-border shadow-sm mb-8">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-border">
                <TableHead className="w-[220px] py-3.5 text-foreground/70 font-semibold text-xs uppercase tracking-wide">Critère</TableHead>
                <TableHead className="py-3.5 text-center font-semibold text-xs uppercase tracking-wide bg-trust-light text-primary">Statut du bailleur privé</TableHead>
                <TableHead className="py-3.5 text-center font-semibold text-xs uppercase tracking-wide text-foreground/70">Pinel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparatif.map((row, i) => (
                <TableRow key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                  <TableCell className="font-medium text-sm text-foreground py-3">{row.critere}</TableCell>
                  <TableCell className="text-center text-sm font-medium py-3 bg-trust-light/50 text-foreground">{row.bailleur}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground py-3">{row.pinel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-2xl border border-primary/15 bg-trust-light p-5 md:p-6 mb-6">
          <h3 className="text-sm font-bold mb-2 text-primary-dark">En résumé</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Le dispositif Pinel reposait sur une réduction d'impôt calculée sur le prix d'achat.
            Le statut du bailleur privé repose sur un mécanisme d'amortissement venant réduire la base imposable des revenus locatifs.
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Comparatif indicatif basé sur les dernières règles connues du dispositif Pinel.
        </p>
      </div>
    </section>
  );
};
