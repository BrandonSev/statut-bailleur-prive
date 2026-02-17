import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const comparatif = [
  { critere: "Statut", bailleur: "Actif – PLF 2026", pinel: "Inactif depuis fin 2024" },
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
                <TableHead className="py-3.5 text-center font-semibold text-xs uppercase tracking-wide bg-success-light text-primary">
                  <div className="flex items-center justify-center gap-2">
                    Statut du bailleur privé
                    <Badge className="bg-success/20 text-success border-success/30 text-[10px]">Nouveau</Badge>
                  </div>
                </TableHead>
                <TableHead className="py-3.5 text-center font-semibold text-xs uppercase tracking-wide text-foreground/40 bg-muted/50">
                  <div className="flex items-center justify-center gap-2">
                    Pinel
                    <Badge variant="outline" className="text-destructive border-destructive/30 text-[10px]">Inactif</Badge>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparatif.map((row, i) => (
                <TableRow key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                  <TableCell className="font-medium text-sm text-foreground py-3">{row.critere}</TableCell>
                  <TableCell className="text-center text-sm font-medium py-3 bg-success-light/50 text-foreground">{row.bailleur}</TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground/70 py-3 bg-muted/30 line-through decoration-muted-foreground/30">{row.pinel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-2xl border border-primary/15 bg-trust-light p-5 md:p-6 mb-6">
          <h3 className="text-sm font-bold mb-2 text-primary-dark">En résumé</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Le dispositif Pinel a pris fin le 31 décembre 2024.
            Le statut du bailleur privé (dispositif Jeanbrun) le remplace avec un mécanisme d'amortissement venant réduire la base imposable des revenus locatifs.
          </p>
        </div>

        {/* CTA step indicator */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-success-light text-success text-sm font-bold">2</span>
            <span className="text-sm font-medium text-muted-foreground">Comparer les dispositifs</span>
            <span className="text-success text-sm">✓</span>
          </div>
          <a
            href="#parcours"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Avancer : les étapes pour investir
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l7 7-7 7" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Comparatif indicatif basé sur les dernières règles connues du dispositif Pinel.
        </p>
      </div>
    </section>
  );
};
