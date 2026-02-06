import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Minus } from "lucide-react";

const comparatif = [
  {
    critere: "Mécanisme fiscal",
    pinel: "Crédit d'impôt direct",
    jeanbrun: "Amortissement annuel",
  },
  {
    critere: "Application",
    pinel: "Impôt sur le revenu uniquement",
    jeanbrun: "Revenu global",
  },
  {
    critere: "Taux",
    pinel: "9% à 14% du prix (21% Pinel+)",
    jeanbrun: "3,5% à 5,5% par an",
  },
  {
    critere: "Durée d'engagement",
    pinel: "6, 9 ou 12 ans (au choix)",
    jeanbrun: "9 ans fixe",
  },
  {
    critere: "Zonage",
    pinel: "Zones A bis, A, B1 obligatoires",
    jeanbrun: "Aucun (tout le territoire)",
  },
  {
    critere: "Rénové éligible",
    pinel: "Non",
    jeanbrun: "Oui (min 30% travaux, collectif)",
    pinelBad: true,
    jeanbrunGood: true,
  },
  {
    critere: "Déficit foncier",
    pinel: "Plafonné à 10 700 €",
    jeanbrun: "Plafonné à 10 700 €",
  },
  {
    critere: "Biens éligibles",
    pinel: "Neuf uniquement",
    jeanbrun: "Immeubles collectifs (neuf/rénové)",
  },
  {
    critere: "Coût budgétaire estimé",
    pinel: "7,3 Mds € (2014-2024)",
    jeanbrun: "1,2 Md € prévu",
  },
];

export const ComparatifSection = () => {
  return (
    <section id="comparatif" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Pinel vs Jeanbrun
          </h2>
          <p className="text-muted-foreground text-lg">
            Les différences fondamentales entre les deux dispositifs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Critère</TableHead>
                    <TableHead className="text-center bg-muted/50">
                      <div className="flex flex-col items-center gap-1">
                        <Badge variant="secondary" className="bg-muted">Terminé</Badge>
                        <span className="font-semibold">Pinel (fin 2024)</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center bg-primary/5">
                      <div className="flex flex-col items-center gap-1">
                        <Badge className="bg-primary">Nouveau</Badge>
                        <span className="font-semibold text-primary">Jeanbrun (2026)</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparatif.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.critere}</TableCell>
                      <TableCell className="text-center bg-muted/30">
                        <div className="flex items-center justify-center gap-2">
                          {row.pinelBad && <X className="w-4 h-4 text-destructive" />}
                          <span className="text-sm">{row.pinel}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center bg-primary/5">
                        <div className="flex items-center justify-center gap-2">
                          {row.jeanbrunGood && <Check className="w-4 h-4 text-success" />}
                          <span className="text-sm font-medium">{row.jeanbrun}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            <strong>Note :</strong> Le Pinel a pris fin le 31 décembre 2024. Les investissements Pinel antérieurs 
            conservent leurs avantages jusqu'à la fin de leur engagement.
          </p>
        </div>
      </div>
    </section>
  );
};
