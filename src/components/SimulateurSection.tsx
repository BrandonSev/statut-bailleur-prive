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
import { Calculator, TrendingDown, TrendingUp, Wallet, Mail } from "lucide-react";

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

    const baseAmortissable = (prix + renovation) * 0.8;
    const taux = TAUX_AMORTISSEMENT[typeBien][niveauLoyer];
    const plafond = PLAFONDS[typeBien][niveauLoyer];
    const amortissementBrut = baseAmortissable * taux;
    const amortissementAnnuel = Math.min(amortissementBrut, plafond);
    const revenuFoncierSansJeanbrun = loyer - charges;
    const impotSansJeanbrun = revenuFoncierSansJeanbrun > 0 
      ? revenuFoncierSansJeanbrun * (tmi / 100)
      : 0;
    const revenuFoncierAvecJeanbrun = loyer - charges - amortissementAnnuel;
    const deficitFoncier = revenuFoncierAvecJeanbrun < 0 
      ? Math.min(Math.abs(revenuFoncierAvecJeanbrun), 10700)
      : 0;
    const impotAvecJeanbrun = revenuFoncierAvecJeanbrun > 0 
      ? revenuFoncierAvecJeanbrun * (tmi / 100)
      : -deficitFoncier * (tmi / 100);
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

  const fmt = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });

  return (
    <section id="simulateur" className="py-16 md:py-24" style={{ backgroundColor: "#F6FAFC" }}>
      <div className="container mx-auto px-4">
        {/* Header avec gradient */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-br from-[#123768] to-[#046C91] text-white px-6 py-3 rounded-2xl mb-6">
            <img 
              src="/picto-jeanbrun.png" 
              alt="Pictogramme Jeanbrun" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight">Simulateur Jeanbrun</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: "#0B1220" }}>
            Estimez vos économies d'impôts
          </h2>
          <p className="text-base md:text-lg" style={{ color: "#0B1220", opacity: 0.6 }}>
            Simulation indicative basée sur les taux annoncés dans le PLF 2026
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card 
            className="shadow-lg" 
            style={{ 
              backgroundColor: "#FFFFFF", 
              border: "1px solid rgba(154, 192, 208, 0.3)", 
              borderRadius: "20px" 
            }}
          >
            <CardContent className="p-6 md:p-10">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Inputs */}
                <div className="space-y-5">
                  {/* Type de bien */}
                  <div className="space-y-2">
                    <Label className="font-semibold" style={{ color: "#0B1220" }}>Type de bien</Label>
                    <Select value={typeBien} onValueChange={(v) => setTypeBien(v as TypeBien)}>
                      <SelectTrigger className="focus:ring-[#046C91] border-[#9AC0D0]/50">
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
                    <Label className="font-semibold" style={{ color: "#0B1220" }}>Niveau de loyer</Label>
                    <Select value={niveauLoyer} onValueChange={(v) => setNiveauLoyer(v as NiveauLoyer)}>
                      <SelectTrigger className="focus:ring-[#046C91] border-[#9AC0D0]/50">
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
                    <Label htmlFor="prix" className="font-semibold" style={{ color: "#0B1220" }}>Prix d'achat</Label>
                    <div className="relative">
                      <Input
                        id="prix"
                        type="number"
                        value={prixAchat}
                        onChange={(e) => setPrixAchat(e.target.value)}
                        placeholder="Prix du bien en euros"
                        className="pr-8 focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    </div>
                  </div>

                  {/* Montant rénovation */}
                  {typeBien === "renove" && (
                    <div className="space-y-2">
                      <Label htmlFor="renovation" className="font-semibold" style={{ color: "#0B1220" }}>Montant travaux</Label>
                      <div className="relative">
                        <Input
                          id="renovation"
                          type="number"
                          value={montantRenovation}
                          onChange={(e) => setMontantRenovation(e.target.value)}
                          placeholder="Minimum 30% du prix pour éligibilité"
                          className="pr-8 focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                      </div>
                      <p className="text-xs" style={{ color: "#046C91" }}>
                        Minimum 30% du prix d'achat pour être éligible
                      </p>
                    </div>
                  )}

                  {/* Loyer annuel */}
                  <div className="space-y-2">
                    <Label htmlFor="loyer" className="font-semibold" style={{ color: "#0B1220" }}>Loyer annuel brut</Label>
                    <div className="relative">
                      <Input
                        id="loyer"
                        type="number"
                        value={loyerAnnuel}
                        onChange={(e) => setLoyerAnnuel(e.target.value)}
                        className="pr-8 focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    </div>
                  </div>

                  {/* Charges annuelles */}
                  <div className="space-y-2">
                    <Label htmlFor="charges" className="font-semibold" style={{ color: "#0B1220" }}>Charges annuelles</Label>
                    <div className="relative">
                      <Input
                        id="charges"
                        type="number"
                        value={chargesAnnuelles}
                        onChange={(e) => setChargesAnnuelles(e.target.value)}
                        placeholder="Taxe foncière, assurance, etc."
                        className="pr-8 focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    </div>
                  </div>

                  {/* TMI */}
                  <div className="space-y-2">
                    <Label className="font-semibold" style={{ color: "#0B1220" }}>Votre TMI (Taux Marginal d'Imposition)</Label>
                    <div className="flex flex-wrap gap-2">
                      {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setTmi(rate)}
                          className="min-w-[60px] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                          style={tmi === rate 
                            ? { backgroundColor: "#123768", color: "#FFFFFF" } 
                            : { backgroundColor: "transparent", border: "1.5px solid #9AC0D0", color: "#0B1220" }
                          }
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Sans Jeanbrun */}
                    <Card className="border-gray-200 bg-gray-50" style={{ borderRadius: "16px" }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Sans dispositif
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400 mb-1">Impôt annuel</p>
                        <p className="text-2xl font-bold text-gray-700">
                          {fmt(resultats.impotSansJeanbrun)} €
                        </p>
                      </CardContent>
                    </Card>

                    {/* Avec Jeanbrun */}
                    <Card style={{ borderRadius: "16px", backgroundColor: "rgba(4, 108, 145, 0.06)", border: "1px solid rgba(4, 108, 145, 0.25)" }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: "#046C91" }}>
                          <TrendingDown className="w-4 h-4" />
                          Avec Jeanbrun
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-400 mb-1">Impôt annuel</p>
                        <p className="text-2xl font-bold" style={{ color: "#046C91" }}>
                          {fmt(resultats.impotAvecJeanbrun)} €
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Économie */}
                  <Card style={{ 
                    borderRadius: "16px", 
                    backgroundColor: "rgba(154, 192, 208, 0.15)", 
                    border: "1px solid rgba(154, 192, 208, 0.4)" 
                  }}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Wallet className="w-6 h-6" style={{ color: "#046C91" }} />
                        <span className="text-gray-600 font-medium">Économie annuelle estimée</span>
                      </div>
                      <p className="text-3xl md:text-4xl font-bold" style={{ color: "#123768" }}>
                        {fmt(resultats.economieAnnuelle)} €
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm" style={{ color: "#046C91" }}>
                          Soit ≈ {fmt(Math.round(resultats.economieAnnuelle / 12))} €/mois
                        </p>
                        <p className="text-sm" style={{ color: "#046C91" }}>
                          Sur 9 ans : {fmt(resultats.economieAnnuelle * 9)} €
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge className="bg-white/70 border border-[#9AC0D0]/40" style={{ color: "#123768" }}>
                          Taux : {resultats.taux.toFixed(1)}% / an
                        </Badge>
                        <Badge className="bg-white/70 border border-[#9AC0D0]/40" style={{ color: "#123768" }}>
                          Amortissement : {fmt(resultats.amortissementAnnuel)} €
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Détails */}
                  <div className="rounded-2xl p-4" style={{ backgroundColor: "#F6FAFC" }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: "#0B1220" }}>Détails :</p>
                    <ul className="text-sm space-y-1" style={{ color: "#0B1220", opacity: 0.65 }}>
                      <li>• Amortissement annuel : {fmt(resultats.amortissementAnnuel)} €</li>
                      {resultats.deficitFoncier > 0 && (
                        <li>• Déficit foncier imputable : {fmt(resultats.deficitFoncier)} €</li>
                      )}
                      <li>• Économie sur 9 ans : {fmt(resultats.economieAnnuelle * 9)} €</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={scrollToContact} 
                    className="w-full text-white hover:opacity-90 transition-opacity" 
                    size="lg"
                    style={{ backgroundColor: "#046C91", borderRadius: "14px" }}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Recevoir une étude personnalisée
                  </Button>

                  <p className="text-xs text-center" style={{ color: "#0B1220", opacity: 0.45 }}>
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
