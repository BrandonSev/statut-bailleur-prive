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
  { type: "Intermédiaire (plafond Pinel)", taux: "3,5%", plafond: "8 000 €" },
  { type: "Social (-15% sur Pinel)", taux: "4,5%", plafond: "10 000 €" },
  { type: "Très social (-30% sur Pinel)", taux: "5,5%", plafond: "12 000 €" },
];

const tauxRenove = [
  { type: "Intermédiaire (plafond Pinel)", taux: "3%", plafond: "10 700 €" },
  { type: "Social (-15% sur Pinel)", taux: "3,5%", plafond: "10 700 €" },
  { type: "Très social (-30% sur Pinel)", taux: "4%", plafond: "10 700 €" },
];

export const RatesSection = () => {
  return (
    <section id="taux" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Taux d'amortissement
          </h2>
          <p className="text-muted-foreground text-lg">
            Les taux varient selon le type de bien et le niveau de loyer pratiqué
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="neuf" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="neuf">Logement neuf</TabsTrigger>
              <TabsTrigger value="renove">Logement rénové</TabsTrigger>
            </TabsList>
            
            <TabsContent value="neuf">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Logement neuf</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    RE2020, DPE classe A ou B, achevé après le 01/01/2026
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type de location</TableHead>
                        <TableHead className="text-center">Taux / an</TableHead>
                        <TableHead className="text-right">Plafond</TableHead>
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
                  <CardTitle className="text-lg">Logement rénové</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Minimum 30% de rénovation du prix d'achat, DPE A ou B après travaux
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type de location</TableHead>
                        <TableHead className="text-center">Taux / an</TableHead>
                        <TableHead className="text-right">Plafond</TableHead>
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
            <strong>Assiette amortissable :</strong> 80% du prix d'acquisition du bien (hors foncier). 
            Maximum 2 biens par foyer fiscal.
          </p>
        </div>
      </div>
    </section>
  );
};
