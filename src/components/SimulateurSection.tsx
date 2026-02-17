import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, TrendingUp, Wallet, Mail } from "lucide-react";
import { ContactModal } from "./ContactModal";

type NiveauLoyer = "intermediaire" | "social" | "tres_social";
type TMI = 0 | 11 | 30 | 41 | 45;

const TAUX_AMORTISSEMENT: Record<NiveauLoyer, number> = {
  intermediaire: 0.035,
  social: 0.045,
  tres_social: 0.055,
};

const PLAFONDS: Record<NiveauLoyer, number> = {
  intermediaire: 8000,
  social: 10000,
  tres_social: 12000,
};

const LABELS_LOYER: Record<NiveauLoyer, string> = {
  intermediaire: "Intermédiaire",
  social: "Social (≈ -15%)",
  tres_social: "Très social (≈ -30%)",
};

export const SimulateurSection = () => {
  const [niveauLoyer, setNiveauLoyer] = useState<NiveauLoyer>("intermediaire");
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [loyerAnnuel, setLoyerAnnuel] = useState<string>("9600");
  const [chargesAnnuelles, setChargesAnnuelles] = useState<string>("2000");
  const [tmi, setTmi] = useState<TMI>(30);
  const [modalOpen, setModalOpen] = useState(false);

  const resultats = useMemo(() => {
    const prix = parseFloat(prixAchat) || 0;
    const loyer = parseFloat(loyerAnnuel) || 0;
    const charges = parseFloat(chargesAnnuelles) || 0;

    const baseAmortissable = prix * 0.8;
    const taux = TAUX_AMORTISSEMENT[niveauLoyer];
    const plafond = PLAFONDS[niveauLoyer];
    const amortissementBrut = baseAmortissable * taux;
    const amortissementAnnuel = Math.min(amortissementBrut, plafond);
    const revenuFoncierSans = loyer - charges;
    const impotSans = revenuFoncierSans > 0 ? revenuFoncierSans * (tmi / 100) : 0;
    const revenuFoncierAvec = loyer - charges - amortissementAnnuel;
    const deficit = revenuFoncierAvec < 0 ? Math.min(Math.abs(revenuFoncierAvec), 10700) : 0;
    const impotAvec = revenuFoncierAvec > 0 ? revenuFoncierAvec * (tmi / 100) : -deficit * (tmi / 100);
    const economie = impotSans - impotAvec;

    return {
      amortissementAnnuel,
      impotSans,
      impotAvec,
      economie,
      deficit,
      taux: taux * 100,
    };
  }, [niveauLoyer, prixAchat, loyerAnnuel, chargesAnnuelles, tmi]);

  const fmt = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
  const loyerMensuel = Math.round((parseFloat(loyerAnnuel) || 0) / 12);

  return (
    <div className="w-full bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-600 text-white rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* ── COLONNE GAUCHE : Texte promotionnel ── */}
        <div className="px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16 bg-black/10 backdrop-blur-[2px]">
          <div className="inline-block mb-5">
            <span className="bg-white/15 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
              PLF 2026 • Plan de relance logement
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight mb-6">
            Simulateur du statut
            <br />
            du bailleur privé
          </h2>

          <p className="text-lg md:text-xl text-blue-100/90 mb-9 max-w-xl">
            Estimez votre avantage fiscal en quelques secondes.
          </p>

          <ul className="space-y-5 mb-10">
            {["Simulation gratuite", "Résultat immédiat", "Étude personnalisée"].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-base md:text-lg">
                <div className="w-7 h-7 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-cyan-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-5 items-start mb-10">
            <a
              href="#comprendre"
              className="text-cyan-200 hover:text-white text-base transition-colors underline underline-offset-4 decoration-cyan-300/50 hover:decoration-white/80"
            >
              Comprendre le dispositif
            </a>
          </div>
        </div>

        {/* ── COLONNE DROITE : Simulateur ── */}
        <div className="bg-white/97 p-6 md:p-8 lg:p-10 border-l border-white/10 lg:border-l-0">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="space-y-6">
                {/* Inputs */}
                <div className="space-y-6 text-gray-900">
                  {/* Type de bien */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Type de bien</Label>
                    <Select value="neuf" disabled>
                      <SelectTrigger className="border-cyan-200/60 focus:ring-cyan-500/40">
                        <SelectValue placeholder="Neuf / VEFA (recommandé)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neuf">Neuf / VEFA (recommandé)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-cyan-700/80">
                      Recevez une sélection de lots neufs éligibles selon votre budget et votre ville.
                    </p>
                  </div>

                  {/* Niveau de loyer */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Niveau de loyer</Label>
                    <div className="flex flex-wrap gap-2.5">
                      {(["intermediaire", "social", "tres_social"] as NiveauLoyer[]).map((niveau) => (
                        <button
                          key={niveau}
                          onClick={() => setNiveauLoyer(niveau)}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            niveauLoyer === niveau
                              ? "bg-indigo-800 text-white shadow-md"
                              : "bg-white border border-cyan-200/70 text-gray-800 hover:bg-cyan-50/60"
                          }`}
                        >
                          {LABELS_LOYER[niveau]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prix, Loyer, Charges, TMI */}
                  {[
                    { id: "prix", label: "Prix d'achat (€)", value: prixAchat, setter: setPrixAchat },
                    { id: "loyer", label: "Loyer annuel brut (€/an)", value: loyerAnnuel, setter: setLoyerAnnuel },
                    {
                      id: "charges",
                      label: "Charges annuelles (€/an)",
                      value: chargesAnnuelles,
                      setter: setChargesAnnuelles,
                    },
                  ].map((field) => (
                    <div key={field.id} className="space-y-1.5">
                      <Label htmlFor={field.id} className="font-semibold">
                        {field.label}
                      </Label>
                      <div className="relative">
                        <Input
                          id={field.id}
                          type="number"
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          className="pr-10 border-cyan-200/60 focus-visible:ring-cyan-500/40"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                      </div>
                      {field.id === "loyer" && <p className="text-xs text-cyan-700/80">≈ {fmt(loyerMensuel)} €/mois</p>}
                    </div>
                  ))}

                  {/* TMI */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Votre TMI</Label>
                    <div className="flex flex-wrap gap-2.5">
                      {[0, 11, 30, 41, 45].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setTmi(rate as TMI)}
                          className={`min-w-[64px] px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            tmi === rate
                              ? "bg-indigo-800 text-white shadow-md"
                              : "bg-white border border-cyan-200/70 text-gray-800 hover:bg-cyan-50/60"
                          }`}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Résultats */}
                <div className="space-y-6 pt-4 border-t border-gray-200/60">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gray-50/70 border border-gray-200/80 rounded-xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Sans dispositif
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-gray-800">{fmt(resultats.impotSans)} €</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-cyan-50/40 border border-cyan-200/60 rounded-xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-cyan-800 flex items-center gap-2">
                          <TrendingDown className="w-4 h-4" />
                          Avec dispositif
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-cyan-800">{fmt(resultats.impotAvec)} €</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gradient-to-br from-cyan-50/60 to-blue-50/40 border border-cyan-200/50 rounded-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Wallet className="w-6 h-6 text-cyan-700" />
                        <span className="text-gray-800 font-medium">Économie annuelle estimée</span>
                      </div>
                      <p className="text-4xl font-extrabold text-indigo-900">{fmt(resultats.economie)} €</p>
                      <div className="mt-3 space-y-1 text-sm text-cyan-800">
                        <p>≈ {fmt(Math.round(resultats.economie / 12))} €/mois</p>
                        <p>Sur 9 ans : {fmt(resultats.economie * 9)} €</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-5">
                        <Badge variant="outline" className="border-cyan-300/60 bg-white/60 text-indigo-900">
                          Taux : {resultats.taux.toFixed(1)}% / an
                        </Badge>
                        <Badge variant="outline" className="border-cyan-300/60 bg-white/60 text-indigo-900">
                          Amort. : {fmt(resultats.amortissementAnnuel)} €
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-4 bg-indigo-800 hover:bg-indigo-900 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Mail className="w-5 h-5" />
                    Recevoir une étude personnalisée
                  </button>

                  <p className="text-xs text-center text-gray-600">
                    Simulation indicative – PLF 2026 – Engagement 9 ans – Location nue obligatoire
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
