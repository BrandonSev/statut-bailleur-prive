import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Info, Calculator } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { CityAutocomplete } from "./CityAutocomplete";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getZoneByInsee, type ZoneABC } from "@/data/zonesABC";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type NiveauLoyer = "intermediaire" | "social" | "tres_social";
type TMI = 0 | 11 | 30 | 41 | 45;

// ─── CONSTANTES OFFICIELLES PLF 2026 ──────────────────────────────────────────

const TAUX_AMORTISSEMENT: Record<NiveauLoyer, number> = {
  intermediaire: 0.035,
  social: 0.045,
  tres_social: 0.055,
};

const PLAFONDS_AMORTISSEMENT: Record<NiveauLoyer, number> = {
  intermediaire: 8_000,
  social: 10_000,
  tres_social: 12_000,
};

const PLAFONDS_LOYER_M2: Record<ZoneABC, Record<NiveauLoyer, number>> = {
  "A bis": { intermediaire: 19.51, social: 13.64, tres_social: 10.63 },
  A: { intermediaire: 14.49, social: 10.49, tres_social: 8.18 },
  B1: { intermediaire: 11.68, social: 9.04, tres_social: 7.04 },
  B2: { intermediaire: 10.15, social: 8.67, tres_social: 6.74 },
  C: { intermediaire: 10.15, social: 8.05, tres_social: 6.25 },
};

const DECOTE_NIVEAU: Record<NiveauLoyer, number> = {
  intermediaire: 1.0,
  social: 0.85,
  tres_social: 0.7,
};

const LABELS_LOYER: Record<NiveauLoyer, string> = {
  intermediaire: "Intermédiaire",
  social: "Social",
  tres_social: "Très social",
};

const TAUX_PS = 0.172;

// ─── CALCULS ──────────────────────────────────────────────────────────────────

const calculLoyerMensuel = (surface: number, zone: ZoneABC, niveauLoyer: NiveauLoyer): number => {
  if (!surface || surface <= 0) return 0;
  // Étape 1 : coefficient arrondi à 2 décimales (méthode BOFiP)
  const coefficient = Math.round(Math.min(0.7 + 19 / surface, 1.2) * 100) / 100;
  const plafondM2 = PLAFONDS_LOYER_M2[zone][niveauLoyer];
  // Étape 2 : (plafond × coefficient) arrondi à 2 décimales AVANT multiplication par la surface
  // ex: 11.68 × 1.12 = 13.0816 → 13.08
  const plafondAjuste = Math.round(plafondM2 * coefficient * 100) / 100;
  // Étape 3 : loyer mensuel avec centimes, sans arrondi ici
  // ex: 13.08 × 45 = 588.60
  return plafondAjuste * surface;
};

interface Resultats {
  loyerMensuel: number;
  loyerAnnuel: number;
  chargesAnnuelles: number;
  baseAmortissable: number;
  amortissementAnnuel: number;
  revenuNetSans: number;
  revenuNetAvec: number;
  deficitImputable: number;
  impotIRSans: number;
  impotPSSans: number;
  impotTotalSans: number;
  impotIRAvec: number;
  impotPSAvec: number;
  impotTotalAvec: number;
  economieAnnuelle: number;
  economieSur9ans: number;
}

const calculer = (prixAchat: number, surface: number, zone: ZoneABC, niveauLoyer: NiveauLoyer, tmi: TMI): Resultats => {
  const loyerMensuelBrut = calculLoyerMensuel(surface, zone, niveauLoyer);
  // Arrondi sur l'annuel : 588.60 × 12 = 7063.20 → Math.round → 7063 ✅
  const loyerAnnuel = Math.round(loyerMensuelBrut * 12);
  const loyerMensuel = Math.round(loyerMensuelBrut); // pour affichage uniquement
  const chargesAnnuelles = Math.round(loyerAnnuel * 0.2);

  const baseAmortissable = prixAchat * 0.8;
  const amortissementBrut = baseAmortissable * TAUX_AMORTISSEMENT[niveauLoyer];
  const amortissementAnnuel = Math.min(amortissementBrut, PLAFONDS_AMORTISSEMENT[niveauLoyer]);

  const revenuNetSans = loyerAnnuel - chargesAnnuelles;
  const revenuNetAvec = loyerAnnuel - chargesAnnuelles - amortissementAnnuel;

  const deficitImputable = revenuNetAvec < 0 ? Math.min(Math.abs(revenuNetAvec), 10_700) : 0;

  const tauxIR = tmi / 100;
  const baseSans = Math.max(revenuNetSans, 0);

  const impotIRSans = Math.round(baseSans * tauxIR);
  const impotPSSans = Math.round(baseSans * TAUX_PS);
  const impotTotalSans = impotIRSans + impotPSSans;

  let impotIRAvec = 0;
  let impotPSAvec = 0;

  if (revenuNetAvec > 0) {
    impotIRAvec = Math.round(revenuNetAvec * tauxIR);
    impotPSAvec = Math.round(revenuNetAvec * TAUX_PS);
  } else {
    impotIRAvec = -Math.round(deficitImputable * tauxIR);
    impotPSAvec = 0;
  }

  const impotTotalAvec = impotIRAvec + impotPSAvec;
  const economieAnnuelle = impotTotalSans - impotTotalAvec;

  return {
    loyerMensuel,
    loyerAnnuel,
    chargesAnnuelles,
    baseAmortissable: Math.round(baseAmortissable),
    amortissementAnnuel: Math.round(amortissementAnnuel),
    revenuNetSans: Math.round(revenuNetSans),
    revenuNetAvec: Math.round(revenuNetAvec),
    deficitImputable: Math.round(deficitImputable),
    impotIRSans,
    impotPSSans,
    impotTotalSans,
    impotIRAvec,
    impotPSAvec,
    impotTotalAvec,
    economieAnnuelle: Math.round(economieAnnuelle),
    economieSur9ans: Math.round(economieAnnuelle * 9),
  };
};

const fmt = (n: number) => Math.abs(n).toLocaleString("fr-FR", { maximumFractionDigits: 0 });

// ─── COMPOSANT ────────────────────────────────────────────────────────────────

export const SimulateurSection = () => {
  const [niveauLoyer, setNiveauLoyer] = useState<NiveauLoyer>("intermediaire");
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [surface, setSurface] = useState<string>("45");
  const [tmi, setTmi] = useState<TMI>(30);
  const [modalOpen, setModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [ville, setVille] = useState("");
  const [codeInsee, setCodeInsee] = useState<string | undefined>();

  const zone: ZoneABC = codeInsee ? getZoneByInsee(codeInsee) : "C";

  const r = useMemo<Resultats>(
    () => calculer(parseFloat(prixAchat) || 0, parseFloat(surface) || 0, zone, niveauLoyer, tmi),
    [prixAchat, surface, zone, niveauLoyer, tmi],
  );

  const hasDeficit = r.revenuNetAvec < 0;

  const ZONE_BADGE: Record<ZoneABC, string> = {
    "A bis": "bg-purple-100 text-purple-700",
    A: "bg-red-100 text-red-700",
    B1: "bg-orange-100 text-orange-700",
    B2: "bg-yellow-100 text-yellow-700",
    C: "bg-gray-100 text-gray-600",
  };

  const [villeError, setVilleError] = useState(false);

  const handleSimuler = () => {
    if (!ville) {
      setVilleError(true);
      return;
    }
    setVilleError(false);
    setShowResults(true);
  };

  return (
    <div
      id="simulateur"
      className="w-full"
      style={{ background: "linear-gradient(135deg, #1346a8 0%, #1a6bb5 50%, #0ea5b0 100%)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:pt-32">
        <div className="mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-center">
          {/* ── COLONNE GAUCHE ── */}
          <div className="text-white space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50/85 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 flex-wrap">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              PLF 2026 — Projet de Loi de Finances
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Simulateur du
              <br />
              <span className="text-[#D4AF37]">DISPOSITIF JEANBRUN</span>
            </h2>
            <p className="text-base sm:text-lg text-white/90">
              Le Statut du Bailleur Privé : Un nouveau levier fiscal pour les investisseurs immobiliers.
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              La loi de finances 2026 introduit un mécanisme d'amortissement en location nue permettant de réduire
              durablement la pression fiscale sur les revenus locatifs.
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "Amortissement jusqu'à 80 % du prix (hors foncier)",
                "Taux annuel de 3,5 % à 5,5 %",
                "Engagement minimal de 9 ans",
                "Absence de réintégration dans la plus-value",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-white/75 leading-relaxed">
              Mesurez immédiatement l'impact sur votre situation fiscale.
            </p>
            <ul className="space-y-2 text-sm">
              {["Simulation gratuite", "Analyse simplifiée", "Sans engagement"].map((text, i) => (
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

          {/* ── COLONNE DROITE — Formulaire ── */}
          <TooltipProvider delayDuration={200}>
            <div className="rounded-xl shadow-xl overflow-hidden bg-white">
              <div className="p-4 sm:p-5 space-y-3">
                {/* 1 — Prix + Ville */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="prix" className="text-xs font-medium text-gray-700 font-bold">
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

                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-gray-700 font-bold">
                      Ville d'investissement souhaitée
                    </Label>
                    <CityAutocomplete
                      value={ville}
                      onChange={(city, _cp, insee) => {
                        setVille(city);
                        setVilleError(false);
                        setCodeInsee(insee);
                      }}
                      placeholder="Rechercher une ville…"
                      className={`h-9 text-sm ${villeError ? "border-red-400 ring-1 ring-red-300" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                    />
                    {villeError && <span className="text-[10px] text-red-500">Veuillez sélectionner une ville</span>}
                    {codeInsee && (
                      <span
                        className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${ZONE_BADGE[zone]}`}
                      >
                        Zone {zone}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2 — Surface + TMI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="surface" className="text-xs font-medium text-gray-700 font-bold">
                        Surface légale à louer
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px] text-xs">
                          Surface habitable + (surface extérieure / 2) plafonnée à 8 m².
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
                      <Label className="text-xs font-medium text-gray-700 font-bold">Votre TMI</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px] text-xs">
                          Taux marginal d'imposition. L'impôt total inclut 17,2% de prélèvements sociaux sur les revenus
                          fonciers.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setTmi(rate)}
                          className={`min-w-[44px] px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all ${
                            tmi === rate
                              ? "bg-primary text-white shadow-sm"
                              : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3 — Niveau de loyer */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-gray-700 font-bold">
                    Choix du plafond de loyer et de l'avantage d'amortissement annuel
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                    {(["intermediaire", "social", "tres_social"] as NiveauLoyer[]).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNiveauLoyer(n)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                          niveauLoyer === n
                            ? "bg-primary text-white shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        <span className="font-semibold">{LABELS_LOYER[n]}</span>
                        <br />
                        <span className={`text-[10px] ${niveauLoyer === n ? "text-blue-100" : "text-gray-400"}`}>
                          Amortissement : {(TAUX_AMORTISSEMENT[n] * 100).toFixed(1)}%/an
                        </span>
                        <span className={`block text-[10px] ${niveauLoyer === n ? "text-blue-100" : "text-gray-400"}`}>
                          {PLAFONDS_AMORTISSEMENT[n].toLocaleString("fr-FR")} €/an max
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bouton Simuler */}
                {!showResults && (
                  <button
                    onClick={handleSimuler}
                    className="w-full h-10 rounded-lg font-semibold text-white text-sm shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)" }}
                  >
                    <Calculator className="w-4 h-4" />
                    Estimer mon économie fiscale
                  </button>
                )}

                {/* ── RÉSULTATS ── */}
                {showResults && (
                  <>
                    <div className="border-t border-gray-100 pt-3 space-y-2">
                      {/* Ligne 1 — Loyer annuel + Amortissement */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="flex flex-wrap items-center justify-between sm:gap-x-1 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                            <p className="text-blue-500">Loyer annuel brut</p>
                            <p className="font-bold text-blue-800 text-sm">
                              {fmt(r.loyerAnnuel)} €<span className="font-normal text-blue-500">/an</span>
                            </p>
                          </div>
                          <p className="text-blue-500">Loyer plafonné selon la zone {codeInsee ? zone : "N/A"}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between sm:gap-x-1 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                          <p className="text-blue-500">
                            Amortissement ({(TAUX_AMORTISSEMENT[niveauLoyer] * 100).toFixed(1)}%/an)
                          </p>
                          <p className="font-bold text-blue-800 text-sm">
                            {fmt(r.amortissementAnnuel)} €<span className="font-normal text-blue-500">/an</span>
                          </p>
                          <p className="text-blue-500">Montant venant réduire votre revenu foncier imposable</p>
                        </div>
                      </div>

                      {/* Ligne 2 — Sans dispositif vs Avec Jeanbrun */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-center">
                        <div className="flex items-center justify-between sm:flex-col sm:items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                          <div>
                            <p className="text-gray-500 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block flex-shrink-0" />
                              Investissement classique
                            </p>
                            <p className="text-gray-400 text-[10px]">Impôt annuel</p>
                          </div>
                          <div className="text-right sm:text-center">
                            <p className="font-bold text-gray-700 text-base">{fmt(r.impotTotalSans)} €</p>
                            <p className="text-[10px] text-gray-400">sur revenus fonciers</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-center bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
                          <div>
                            <p className="text-blue-700 flex items-center gap-1 font-medium">
                              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block flex-shrink-0" />
                              Avec amortissement Jeanbrun
                            </p>
                            <p className="text-blue-500 text-[10px]">Impôt annuel</p>
                          </div>
                          <div className="text-right sm:text-center">
                            <p className="font-bold text-blue-700 text-base">{fmt(Math.max(r.impotTotalAvec, 0))} €</p>
                            <p className="text-[10px] text-blue-500">sur revenus fonciers</p>
                          </div>
                        </div>
                      </div>

                      {/* Ligne 3 — Économie bloc vert */}
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-3">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full blur-3xl opacity-20" />
                        <div className="relative z-10 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
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
                              Économie fiscale estimée
                            </p>
                          </div>
                          <p className="text-3xl font-extrabold text-green-600 leading-none mb-0.5">
                            {fmt(r.economieAnnuelle)} €/an
                          </p>
                          <p className="text-sm font-normal text-green-600">
                            <span>soit </span>
                            <span className="font-semibold text-green-700">{fmt(r.economieSur9ans)} € </span>
                            <span>sur la période minimale de 9 ans</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      Estimation réalisée à partir des données que vous avez saisies et des textes du PLF 2026 en
                      vigueur. Ne tenant pas compte d’une éventuelle optimisation complémentaire.
                    </p>

                    {/* CTA */}
                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full p-4 rounded-lg font-semibold text-white text-sm shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                      style={{ background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)" }}
                    >
                      <div className="flex items-center justify-center gap-2 flex-wrap text-base sm:text-xl">
                        <Calculator className="w-8 h-8 hidden sm:block" />
                        <div>
                          Recevoir gratuitement ma simulation personnalisée
                          <p className="text-[10px] text-white/80 leading-relaxed font-normal mt-0.5">
                            Analyse détaillée incluant : cash-flow, fiscalité, projection long terme.
                          </p>
                        </div>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* ── BLOC BAS DE PAGE ── */}
      {showResults && (
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Votre étude personnalisée inclut</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
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
