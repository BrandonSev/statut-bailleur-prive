import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ArrowRight, Info, Calculator } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { CityAutocomplete } from "./CityAutocomplete";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  social: "Social",
  tres_social: "Très social",
};

// Zonage simplifié basé sur le code postal
const getZone = (codePostal?: string): string => {
  if (!codePostal) return "—";
  const cp = codePostal.slice(0, 2);
  if (codePostal.startsWith("75")) return "A bis";
  if (["92", "93", "94"].includes(cp)) return "A bis";
  if (["78", "91", "95"].includes(cp)) return "A";
  if (["69", "13", "33", "31", "59", "67", "68"].includes(cp)) return "B1";
  if (["06", "34", "44", "35", "57", "54", "51", "21", "37", "45", "63", "38", "73", "74"].includes(cp)) return "B1";
  return "B2 / C";
};

export const SimulateurSection = () => {
  const [niveauLoyer, setNiveauLoyer] = useState<NiveauLoyer>("intermediaire");
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [surface, setSurface] = useState<string>("45");
  const [tmi, setTmi] = useState<TMI>(30);
  const [modalOpen, setModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Ville
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState<string | undefined>();
  const zone = useMemo(() => getZone(codePostal), [codePostal]);

  // Calcul du loyer plafonné selon zone + surface + niveau
  const loyerPlafond = useMemo(() => {
    const s = parseFloat(surface) || 0;
    const plafonds: Record<string, Record<NiveauLoyer, number>> = {
      "A bis": { intermediaire: 18.25, social: 7.62, tres_social: 7.62 },
      A: { intermediaire: 14.03, social: 7.14, tres_social: 7.14 },
      B1: { intermediaire: 11.31, social: 6.45, tres_social: 6.45 },
      "B2 / C": { intermediaire: 9.83, social: 6.2, tres_social: 6.2 },
    };
    const prixM2 = plafonds[zone]?.[niveauLoyer] ?? 9.83;
    return Math.round(prixM2 * s * 12);
  }, [zone, surface, niveauLoyer]);

  const resultats = useMemo(() => {
    const prix = parseFloat(prixAchat) || 0;
    const loyer = loyerPlafond;
    const charges = Math.round(loyer * 0.2); // estimation charges 20%

    const baseAmortissable = prix * 0.8;
    const taux = TAUX_AMORTISSEMENT[niveauLoyer];
    const plafond = PLAFONDS[niveauLoyer];
    const amortissementBrut = baseAmortissable * taux;
    const amortissementAnnuel = Math.min(amortissementBrut, plafond);
    const revenuFoncierSansJeanbrun = loyer - charges;
    const impotSansJeanbrun = revenuFoncierSansJeanbrun > 0 ? revenuFoncierSansJeanbrun * (tmi / 100) : 0;
    const revenuFoncierAvecJeanbrun = loyer - charges - amortissementAnnuel;
    const deficitFoncier = revenuFoncierAvecJeanbrun < 0 ? Math.min(Math.abs(revenuFoncierAvecJeanbrun), 10700) : 0;
    const impotAvecJeanbrun =
      revenuFoncierAvecJeanbrun > 0 ? revenuFoncierAvecJeanbrun * (tmi / 100) : -deficitFoncier * (tmi / 100);
    const economieAnnuelle = impotSansJeanbrun - impotAvecJeanbrun;

    return {
      amortissementAnnuel,
      impotSansJeanbrun,
      impotAvecJeanbrun,
      economieAnnuelle,
      deficitFoncier,
      taux: taux * 100,
    };
  }, [niveauLoyer, prixAchat, loyerPlafond, tmi]);

  const fmt = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 0 });

  return (
    <div
      id="simulateur"
      className="w-full"
      style={{
        background: "linear-gradient(135deg, #1346a8 0%, #1a6bb5 50%, #0ea5b0 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 lg:pt-32">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-center">
          {/* COLONNE GAUCHE */}
          <div className="text-white space-y-4">
            <div className="inline-block">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                PLF 2026
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Simulateur du statut
              <br />
              du bailleur privé
            </h2>

            <p className="text-base sm:text-lg text-white/90">Calculez votre avantage fiscal en 2 minutes.</p>

            <ul className="space-y-2 text-sm">
              {["Simulation gratuite", "Résultat immédiat", "Sans engagement"].map((text, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE DROITE — Formulaire */}
          <TooltipProvider delayDuration={200}>
            <div className="rounded-xl shadow-xl overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
              <div className="p-5 space-y-3">
                {/* 1 — Prix d'achat */}
                <div className="space-y-1">
                  <Label htmlFor="prix" className="text-xs font-medium text-gray-700">
                    Prix d'achat envisagé
                  </Label>
                  <div className="relative">
                    <Input
                      id="prix"
                      type="number"
                      value={prixAchat}
                      onChange={(e) => setPrixAchat(e.target.value)}
                      placeholder="200 000"
                      className="h-9 pr-8 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                  </div>
                </div>

                {/* 2 — Ville + Zone */}
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Ville d'investissement souhaitée</Label>
                  <CityAutocomplete
                    value={ville}
                    onChange={(city, cp) => {
                      setVille(city);
                      setCodePostal(cp);
                    }}
                    placeholder="Rechercher une ville…"
                    className="h-9 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {codePostal && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Zone {zone}
                      </span>
                    </div>
                  )}
                </div>

                {/* 3 — Surface + 4 — TMI */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="surface" className="text-xs font-medium text-gray-700">
                        Surface légale à louer
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px] text-xs">
                          Surface hab. + surf. ext. / 2 plafonné à 8 m²
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="relative">
                      <Input
                        id="surface"
                        type="number"
                        value={surface}
                        onChange={(e) => setSurface(e.target.value)}
                        placeholder="45"
                        className="h-9 pr-8 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">m²</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Label className="text-xs font-medium text-gray-700">Votre TMI</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px] text-xs">
                          Votre TMI actuelle (Taux marginal d'imposition)
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setTmi(rate)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                            tmi === rate
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          {rate} %
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5 — Niveau de loyer / amortissement */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700">
                    Choix de l'amortissement et plafond de loyer
                  </Label>
                  <div className="flex gap-1.5">
                    {(["intermediaire", "social", "tres_social"] as NiveauLoyer[]).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNiveauLoyer(n)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                          niveauLoyer === n
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        {LABELS_LOYER[n]} <br /> {(TAUX_AMORTISSEMENT[n] * 100).toFixed(2)}% amort. /{" "}
                        {PLAFONDS[n].toLocaleString("fr-FR")} € plafond
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bouton Simuler */}
                {!showResults && (
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full h-10 rounded-lg font-semibold text-white text-sm shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)",
                    }}
                  >
                    <Calculator className="w-4 h-4" />
                    Lancer la simulation
                  </button>
                )}

                {/* Résultats — visibles après clic */}
                {showResults && (
                  <>
                    <div className="border-t border-gray-100 my-3"></div>

                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-3">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full blur-3xl opacity-20"></div>
                      <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-2">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wide">
                            Économie d'impôt
                          </p>
                        </div>
                        <p className="text-3xl font-extrabold text-green-600 leading-none mb-1">
                          {fmt(resultats.economieAnnuelle)} €
                        </p>
                        <p className="text-xs text-green-600 font-medium mb-2">par an</p>
                        <div className="w-12 h-px bg-green-300 mx-auto mb-2"></div>
                        <p className="text-sm font-semibold text-green-700">
                          {fmt(resultats.economieAnnuelle * 9)} €{" "}
                          <span className="font-normal text-green-600">sur 9 ans</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full h-10 rounded-lg font-semibold text-white text-sm shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)",
                      }}
                    >
                      Recevoir mon étude gratuite
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[10px] text-center text-gray-400 leading-relaxed">
                      Sélection de biens neufs éligibles + analyse personnalisée
                    </p>
                  </>
                )}
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* BLOC DÉTAILS BAS DE PAGE — visible uniquement après simulation */}
      {showResults && (
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Votre étude personnalisée inclut</h3>

              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  {
                    icon: "💰",
                    title: "Cash-flow détaillé",
                    desc: "Effort d'épargne réel après crédit et avantage fiscal",
                  },
                  { icon: "🏢", title: "Biens éligibles", desc: "Lots neufs compatibles avec votre budget" },
                  { icon: "🤝", title: "Accompagnement", desc: "Conseils personnalisés par nos experts" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="text-4xl">{item.icon}</div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="mt-8 px-7 py-3 rounded-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)" }}
              >
                Je demande mon étude
              </button>
              <p className="text-xs text-gray-400 mt-3">Sans engagement • Vos données restent confidentielles</p>
            </div>
          </div>
        </div>
      )}

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
