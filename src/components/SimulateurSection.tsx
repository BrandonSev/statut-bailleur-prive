import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, PiggyBank, Home } from "lucide-react";

export const SimulateurSection = () => {
  const [investissement, setInvestissement] = useState([200000]);
  const [duree, setDuree] = useState([12]);

  // Simulation simplifiée (à adapter selon les règles réelles du dispositif)
  const tauxReduction = duree[0] === 6 ? 0.12 : duree[0] === 9 ? 0.18 : 0.21;
  const reductionTotale = investissement[0] * tauxReduction;
  const reductionAnnuelle = reductionTotale / duree[0];
  const loyerMensuelEstime = investissement[0] * 0.004; // ~4.8% rendement brut annuel

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="simulateur" className="py-16 md:py-24 bg-gradient-to-br from-trust-light via-background to-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-semibold mb-2">Simulateur fiscal</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Estimez vos économies d'impôts
          </h2>
          <p className="text-muted-foreground text-lg">
            Calculez en quelques clics les avantages fiscaux du Dispositif Jeanbrun 
            selon votre projet d'investissement.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Votre projet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Montant investissement */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-medium text-foreground">Montant de l'investissement</label>
                    <span className="text-primary font-bold text-lg">
                      {investissement[0].toLocaleString("fr-FR")} €
                    </span>
                  </div>
                  <Slider
                    value={investissement}
                    onValueChange={setInvestissement}
                    min={100000}
                    max={400000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>100 000 €</span>
                    <span>400 000 €</span>
                  </div>
                </div>

                {/* Durée engagement */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-medium text-foreground">Durée d'engagement</label>
                    <span className="text-primary font-bold text-lg">{duree[0]} ans</span>
                  </div>
                  <div className="flex gap-3">
                    {[6, 9, 12].map((annees) => (
                      <Button
                        key={annees}
                        variant={duree[0] === annees ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setDuree([annees])}
                      >
                        {annees} ans
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-gold-light rounded-lg p-4 border border-gold/30">
                  <p className="text-sm text-foreground">
                    <strong>💡 Bon à savoir :</strong> Plus la durée d'engagement est longue, 
                    plus le taux de réduction fiscale est avantageux.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="border-primary/30 bg-gradient-to-br from-card to-trust-light/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Vos avantages estimés
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Réduction totale */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <PiggyBank className="w-6 h-6 text-success" />
                    <span className="text-muted-foreground">Réduction d'impôt totale</span>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-success">
                    {reductionTotale.toLocaleString("fr-FR")} €
                  </p>
                  <Badge className="mt-2 bg-success-light text-success border-success/30">
                    Taux : {(tauxReduction * 100).toFixed(0)}% sur {duree[0]} ans
                  </Badge>
                </div>

                {/* Réduction annuelle */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6 text-primary" />
                    <span className="text-muted-foreground">Économie annuelle</span>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    {reductionAnnuelle.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € / an
                  </p>
                </div>

                {/* Loyer estimé */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Home className="w-6 h-6 text-accent" />
                    <span className="text-muted-foreground">Loyer mensuel estimé</span>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-accent">
                    {loyerMensuelEstime.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € / mois
                  </p>
                </div>

                <Button onClick={scrollToContact} className="w-full" size="lg">
                  Affiner mon étude personnalisée
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Simulation indicative. Les résultats définitifs dépendent de votre situation fiscale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
