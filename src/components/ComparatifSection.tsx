import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

const comparatif = [
  {
    critere: "Nature de l'avantage",
    pinel: "Réduction d'impôt directe",
    jeanbrun: "Charge déductible du revenu",
  },
  {
    critere: "Assiette d'imputation",
    pinel: "Impôt sur le revenu",
    jeanbrun: "Revenu global (tous revenus)",
  },
  {
    critere: "Taux ou montant",
    pinel: "Jusqu'à 21% du prix sur 12 ans",
    jeanbrun: "3% à 5,5% par an pendant 9 ans",
  },
  {
    critere: "Durée de location",
    pinel: "Modulable : 6, 9 ou 12 ans",
    jeanbrun: "Fixe : 9 ans",
  },
  {
    critere: "Contrainte géographique",
    pinel: "Zones tendues uniquement",
    jeanbrun: "Tout le territoire",
  },
  {
    critere: "Ancien avec travaux",
    pinel: "Exclu",
    jeanbrun: "Éligible si rénovation ≥ 30%",
    pinelBad: true,
    jeanbrunGood: true,
  },
  {
    critere: "Report de déficit",
    pinel: "Max 10 700 €/an",
    jeanbrun: "Max 10 700 €/an",
  },
  {
    critere: "Type de logement",
    pinel: "Neuf en zone éligible",
    jeanbrun: "Collectif neuf ou réhabilité",
  },
];

export const ComparatifSection = () => {
  return (
    <section id="comparatif" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Ancien vs nouveau régime
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprendre la transition entre le dispositif historique et son successeur
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
                        <Badge variant="secondary" className="bg-muted">Clôturé</Badge>
                        <span className="font-semibold">Dispositif Pinel</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center bg-primary/5">
                      <div className="flex flex-col items-center gap-1">
                        <Badge className="bg-primary">2026</Badge>
                        <span className="font-semibold text-primary">Nouveau cadre</span>
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
            <strong>Rappel :</strong> Les engagements Pinel contractés avant fin 2024 
            restent valides jusqu'à leur terme prévu.
          </p>
        </div>
      </div>
    </section>
  );
};
