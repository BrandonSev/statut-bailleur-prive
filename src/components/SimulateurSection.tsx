import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, TrendingDown, TrendingUp, Wallet } from "lucide-react";

type TypeBien = "neuf" | "renove";
type NiveauLoyer = "intermediaire" | "social" | "tres_social";
type TMI = 0 | 11 | 30 | 41 | 45;

const TAUX_AMORTISSEMENT: Record<TypeBien, Record<NiveauLoyer, number>> = {
  neuf: {
    intermediaire: 0.035,
    social: 0.045,
    tres_social: 0.055,
  },
  renove: {
    intermediaire: 0.03,
    social: 0.035,
    tres_social: 0.04,
  },
};

const PLAFONDS: Record<TypeBien, Record<NiveauLoyer, number>> = {
  neuf: {
    intermediaire: 8000,
    social: 10000,
    tres_social: 12000,
  },
  renove: {
    intermediaire: 10700,
    social: 10700,
    tres_social: 10700,
  },
};

const LABELS_LOYER: Record<NiveauLoyer, string> = {
  intermediaire: "Intermédiaire (plafond Pinel)",
  social: "Social (-15% sur Pinel)",
  tres_social: "Très social (-30% sur Pinel)",
};

export const SimulateurSection = () => {
  const [typeBien, setTypeBien] = useState<TypeBien>("neuf");
  const [niveauLoyer, setNiveauLoyer] = useState<NiveauLoyer>("intermediaire");
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [montantRenovation, setMontantRenovation] = useState<string>("60000");
  const [loyerAnnuel, setLoyerAnnuel] = useState<string>("9600");
  const [chargesAnnuelles, setChargesAnnuelles] = useState<string>("2000");
  const [tmi, setTmi] = useState<TMI>(30);

  const resultats = useMemo(() => {
    const prix = parseFloat(prixAchat) || 0;
    const renovation = typeBien === "renove" ? (parseFloat(montantRenovation) || 0) : 0;
    const loyer = parseFloat(loyerAnnuel) || 0;
    const charges = parseFloat(chargesAnnuelles) || 0;

    // Base amortissable = 80% du prix (hors foncier)
    const baseAmortissable = (prix + renovation) * 0.8;
    
    // Taux d'amortissement
    const taux = TAUX_AMORTISSEMENT[typeBien][niveauLoyer];
    const plafond = PLAFONDS[typeBien][niveauLoyer];

    // Amortissement annuel (plafonné)
    const amortissementBrut = baseAmortissable * taux;
    const amortissementAnnuel = Math.min(amortissementBrut, plafond);

    // Revenu foncier sans Jeanbrun
    const revenuFoncierSansJeanbrun = loyer - charges;
    
    // Impôt sans Jeanbrun (sur le revenu foncier positif uniquement)
    const impotSansJeanbrun = revenuFoncierSansJeanbrun > 0 
      ? revenuFoncierSansJeanbrun * (tmi / 100)
      : 0;

    // Revenu foncier avec Jeanbrun (amortissement déduit)
    const revenuFoncierAvecJeanbrun = loyer - charges - amortissementAnnuel;
    
    // Déficit foncier imputable sur revenu global (max 10 700€)
    const deficitFoncier = revenuFoncierAvecJeanbrun < 0 
      ? Math.min(Math.abs(revenuFoncierAvecJeanbrun), 10700)
      : 0;

    // Impôt avec Jeanbrun
    const impotAvecJeanbrun = revenuFoncierAvecJeanbrun > 0 
      ? revenuFoncierAvecJeanbrun * (tmi / 100)
      : -deficitFoncier * (tmi / 100); // Économie grâce au déficit

    // Économie annuelle
    const economieAnnuelle = impotSansJeanbrun - impotAvecJeanbrun;

    return {
      amortissementAnnuel,
      impotSansJeanbrun,
      impotAvecJeanbrun,
      economieAnnuelle,
      deficitFoncier,
      taux: taux * 100,
    };
  }, [typeBien, niveauLoyer, prixAchat, montantRenovation, loyerAnnuel, chargesAnnuelles, tmi]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="simulateur" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Simulateur Jeanbrun
          </h2>
          <p className="text-muted-foreground text-lg">
            Estimez vos économies d'impôts annuelles avec le nouveau dispositif
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-6 md:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  {/* Type de bien */}
                  <div className="space-y-2">
                    <Label>Type de bien</Label>
                    <Select value={typeBien} onValueChange={(v) => setTypeBien(v as TypeBien)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neuf">Neuf / VEFA</SelectItem>
                        <SelectItem value="renove">Rénové</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Niveau de loyer */}
                  <div className="space-y-2">
                    <Label>Niveau de loyer</Label>
                    <Select value={niveauLoyer} onValueChange={(v) => setNiveauLoyer(v as NiveauLoyer)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intermediaire">{LABELS_LOYER.intermediaire}</SelectItem>
                        <SelectItem value="social">{LABELS_LOYER.social}</SelectItem>
                        <SelectItem value="tres_social">{LABELS_LOYER.tres_social}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prix d'achat */}
                  <div className="space-y-2">
                    <Label htmlFor="prix">Prix d'achat</Label>
                    <div className="relative">
                      <Input
                        id="prix"
                        type="number"
                        value={prixAchat}
                        onChange={(e) => setPrixAchat(e.target.value)}
                        placeholder="Prix du bien en euros"
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    </div>
                  </div>

                  {/* Montant rénovation (si rénové) */}
                  {typeBien === "renove" && (
                    <div className="space-y-2">
                      <Label htmlFor="renovation">Montant travaux</Label>
                      <div className="relative">
                        <Input
                          id="renovation"
                          type="number"
                          value={montantRenovation}
                          onChange={(e) => setMontantRenovation(e.target.value)}
                          placeholder="Minimum 30% du prix pour éligibilité"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Minimum 30% du prix d'achat pour être éligible
                      </p>
                    </div>
                  )}

                  {/* Loyer annuel */}
                  <div className="space-y-2">
                    <Label htmlFor="loyer">Loyer annuel brut</Label>
                    <div className="relative">
                      <Input
                        id="loyer"
                        type="number"
                        value={loyerAnnuel}
                        onChange={(e) => setLoyerAnnuel(e.target.value)}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    </div>
                  </div>

                  {/* Charges annuelles */}
                  <div className="space-y-2">
                    <Label htmlFor="charges">Charges annuelles</Label>
                    <div className="relative">
                      <Input
                        id="charges"
                        type="number"
                        value={chargesAnnuelles}
                        onChange={(e) => setChargesAnnuelles(e.target.value)}
                        placeholder="Taxe foncière, assurance, etc."
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    </div>
                  </div>

                  {/* TMI */}
                  <div className="space-y-2">
                    <Label>Votre TMI (Taux Marginal d'Imposition)</Label>
                    <div className="flex flex-wrap gap-2">
                      {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                        <Button
                          key={rate}
                          variant={tmi === rate ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTmi(rate)}
                          className="min-w-[60px]"
                        >
                          {rate}%
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Sans Jeanbrun */}
                    <Card className="bg-muted border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Sans Jeanbrun
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Impôt annuel</p>
                        <p className="text-2xl font-bold text-foreground">
                          {resultats.impotSansJeanbrun.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €
                        </p>
                      </CardContent>
                    </Card>

                    {/* Avec Jeanbrun */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
                          <TrendingDown className="w-4 h-4" />
                          Avec Jeanbrun
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Impôt annuel</p>
                        <p className="text-2xl font-bold text-primary">
                          {resultats.impotAvecJeanbrun.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Économie */}
                  <Card className="bg-success/10 border-success/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Wallet className="w-6 h-6 text-success" />
                        <span className="text-muted-foreground">Économie annuelle estimée</span>
                      </div>
                      <p className="text-3xl md:text-4xl font-bold text-success">
                        {resultats.economieAnnuelle.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className="bg-success-light text-success border-success/30">
                          Taux : {resultats.taux.toFixed(1)}% / an
                        </Badge>
                        <Badge className="bg-success-light text-success border-success/30">
                          Amortissement : {resultats.amortissementAnnuel.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Détails */}
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-foreground mb-2">Détails :</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Amortissement annuel : {resultats.amortissementAnnuel.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €</li>
                      {resultats.deficitFoncier > 0 && (
                        <li>• Déficit foncier imputable : {resultats.deficitFoncier.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €</li>
                      )}
                      <li>• Économie sur 9 ans : {(resultats.economieAnnuelle * 9).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €</li>
                    </ul>
                  </div>

                  <Button onClick={scrollToContact} className="w-full" size="lg">
                    <Calculator className="w-5 h-5 mr-2" />
                    Recevoir une étude personnalisée
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    <strong>Simulation indicative :</strong> Ce calcul repose sur les taux annoncés dans le PLF 2026. 
                    Les modalités définitives seront précisées par décret. Engagement 9 ans, location nue obligatoire.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
