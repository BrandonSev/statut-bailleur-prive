import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tauxNeuf = [
  { type: "Loyer standard", taux: "3,5%", plafond: "8 000 €" },
  { type: "Loyer modéré", taux: "4,5%", plafond: "10 000 €" },
  { type: "Loyer très modéré", taux: "5,5%", plafond: "12 000 €" },
];

const tauxRenove = [
  { type: "Loyer standard", taux: "3%", plafond: "10 700 €" },
  { type: "Loyer modéré", taux: "3,5%", plafond: "10 700 €" },
  { type: "Loyer très modéré", taux: "4%", plafond: "10 700 €" },
];

export const RatesSection = () => {
  return (
    <section id="taux" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Barème d'amortissement annuel
          </h2>
          <p className="text-muted-foreground text-lg">
            Plus le loyer pratiqué est modéré, plus l'avantage fiscal augmente
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="neuf" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="neuf">Construction neuve</TabsTrigger>
              <TabsTrigger value="renove">Réhabilitation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="neuf">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Immeubles neufs</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Conformes RE2020, étiquette énergie A ou B, livrés à partir de 2026
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Niveau de loyer</TableHead>
                        <TableHead className="text-center">Taux annuel</TableHead>
                        <TableHead className="text-right">Plafond déductible</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tauxNeuf.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.type}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {row.taux}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{row.plafond}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="renove">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Logements réhabilités</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Travaux représentant au moins 30% du coût d'acquisition, DPE A ou B après rénovation
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Niveau de loyer</TableHead>
                        <TableHead className="text-center">Taux annuel</TableHead>
                        <TableHead className="text-right">Plafond déductible</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tauxRenove.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.type}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {row.taux}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{row.plafond}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            <strong>Base de calcul :</strong> 80% du prix d'acquisition (la quote-part terrain est exclue). 
            Limité à 2 logements par contribuable.
          </p>
        </div>
      </div>
    </section>
  );
};
