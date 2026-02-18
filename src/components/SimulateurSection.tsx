import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
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

// Barèmes Pinel 2026 (BOFiP) — référence Jeanbrun pour le loyer intermédiaire
const PLAFONDS_LOYER_M2: Record<ZoneABC, number> = {
  "A bis": 19.51,
  A: 14.49,
  B1: 11.59,
  B2: 10.06,
  C: 10.06, // même plafond que B2 (Jeanbrun sans zonage)
};

// Décotes loyer social / très social (en attente décrets ANAH/Loc'Avantages)
const DECOTE_NIVEAU: Record<NiveauLoyer, number> = {
  intermediaire: 1.0,
  social: 0.85, // –15%
  tres_social: 0.7, // –30%
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
  const coefficient = Math.min(0.7 + 19 / surface, 1.2);
  const plafondM2 = PLAFONDS_LOYER_M2[zone] * DECOTE_NIVEAU[niveauLoyer];
  return Math.round(surface * coefficient * plafondM2);
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
  const loyerMensuel = calculLoyerMensuel(surface, zone, niveauLoyer);
  const loyerAnnuel = loyerMensuel * 12;
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
    // Déficit → économie IR uniquement (PS non imputables sur revenu global)
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

  // CityAutocomplete doit passer le code INSEE (5 chiffres) en 3e argument du onChange
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

  const { toast } = useToast();

  const handleSimuler = () => {
    if (!ville) {
      toast({
        title: "Ville requise",
        description: "Veuillez sélectionner une ville d'investissement pour lancer la simulation.",
        variant: "destructive",
      });
      return;
    }
    setShowResults(true);
  };

  return (
    <div
      id="simulateur"
      className="w-full"
      style={{ background: "linear-gradient(135deg, #1346a8 0%, #1a6bb5 50%, #0ea5b0 100%)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 lg:pt-32">
        <div className="mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-center">
          {/* ── COLONNE GAUCHE ── */}
          <div className="text-white space-y-4">
            <div className="inline-block">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
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

          {/* ── COLONNE DROITE — Formulaire ── */}
          <TooltipProvider delayDuration={200}>
            <div className="rounded-xl shadow-xl overflow-hidden bg-white">
              <div className="p-5 space-y-3">
                {/* 1 — Prix + Ville */}
                <div className="grid grid-cols-2 gap-3">
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

                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-gray-700">Ville d'investissement</Label>
                    {/*
                      ⚠️  CityAutocomplete doit appeler :
                          onChange(nomVille: string, codePostal: string, codeInsee: string)
                      Le code INSEE à 5 chiffres est requis pour le zonage officiel ABC.
                    */}
                    <CityAutocomplete
                      value={ville}
                      onChange={(city, _cp, insee) => {
                        console.log(city, _cp, insee);
                        setVille(city);
                        console.log(getZoneByInsee(insee), "here", insee);
                        setCodeInsee(insee);
                      }}
                      placeholder="Rechercher une ville…"
                      className="h-9 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="surface" className="text-xs font-medium text-gray-700">
                        Surface habitable
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px] text-xs">
                          Surface habitable du logement. Le loyer plafonné est calculé avec la formule : coeff = min(0,7
                          + 19/S, 1,2).
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
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                            tmi === rate
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
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
                  <Label className="text-xs font-medium text-gray-700">Niveau de loyer & amortissement</Label>
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
                        <span className="font-semibold">{LABELS_LOYER[n]}</span>
                        <br />
                        <span className={`text-[10px] ${niveauLoyer === n ? "text-blue-100" : "text-gray-400"}`}>
                          {(TAUX_AMORTISSEMENT[n] * 100).toFixed(1)}% amort. /{" "}
                          {PLAFONDS_AMORTISSEMENT[n].toLocaleString("fr-FR")} € max
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loyer estimé — visible dès surface + ville renseignés */}
                {r.loyerMensuel > 0 && codeInsee && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <span className="text-xs text-blue-700">Loyer plafonné estimé</span>
                    <span className="text-sm font-bold text-blue-800">
                      {fmt(r.loyerMensuel)} €<span className="font-normal text-blue-600">/mois</span>
                    </span>
                  </div>
                )}

                {/* Bouton Simuler */}
                {!showResults && (
                  <button
                    onClick={handleSimuler}
                    className="w-full h-10 rounded-lg font-semibold text-white text-sm shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)" }}
                  >
                    <Calculator className="w-4 h-4" />
                    Lancer la simulation
                  </button>
                )}

                {/* ── RÉSULTATS ── */}
                {showResults && (
                  <>
                    <div className="border-t border-gray-100 pt-3 space-y-2">
                      {/* Économie principale */}
                      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-3">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full blur-3xl opacity-20" />
                        <div className="relative z-10 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1.5">
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
                              Économie d'impôt estimée
                            </p>
                          </div>
                          <p className="text-3xl font-extrabold text-green-600 leading-none mb-0.5">
                            {fmt(r.economieAnnuelle)} €
                          </p>
                          <p className="text-xs text-green-600 font-medium mb-2">par an (IR + PS)</p>
                          <div className="w-12 h-px bg-green-300 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-green-700">
                            {fmt(r.economieSur9ans)} € <span className="font-normal text-green-600">sur 9 ans</span>
                          </p>
                        </div>
                      </div>

                      {/* Tableau détail fiscal */}
                      {/* <div className="rounded-lg border border-gray-100 bg-gray-50 divide-y divide-gray-100 text-xs">
                        <div className="grid grid-cols-3 px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                          <span>Détail fiscal</span>
                          <span className="text-center">Sans Jeanbrun</span>
                          <span className="text-right">Avec Jeanbrun</span>
                        </div>

                        <div className="grid grid-cols-3 px-3 py-1.5 text-gray-600">
                          <span>Loyers perçus</span>
                          <span className="text-center">{fmt(r.loyerAnnuel)} €</span>
                          <span className="text-right">{fmt(r.loyerAnnuel)} €</span>
                        </div>

                        <div className="grid grid-cols-3 px-3 py-1.5 text-gray-600">
                          <span>Charges (–20%)</span>
                          <span className="text-center">–{fmt(r.chargesAnnuelles)} €</span>
                          <span className="text-right">–{fmt(r.chargesAnnuelles)} €</span>
                        </div>

                        <div className="grid grid-cols-3 px-3 py-1.5 text-gray-600">
                          <span className="flex items-center gap-1">
                            Amortissement
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[200px] text-xs">
                                Base (prix × 80%) × {(TAUX_AMORTISSEMENT[niveauLoyer] * 100).toFixed(1)}%,
                                plafonné à {PLAFONDS_AMORTISSEMENT[niveauLoyer].toLocaleString("fr-FR")} €/an.
                              </TooltipContent>
                            </Tooltip>
                          </span>
                          <span className="text-center text-gray-400">—</span>
                          <span className="text-right font-medium text-blue-700">
                            –{fmt(r.amortissementAnnuel)} €
                          </span>
                        </div>

                        <div className="grid grid-cols-3 px-3 py-1.5 font-semibold text-gray-700">
                          <span>Revenu foncier net</span>
                          <span className="text-center">{fmt(r.revenuNetSans)} €</span>
                          <span className={`text-right ${hasDeficit ? "text-orange-600" : ""}`}>
                            {hasDeficit ? "–" : ""}{fmt(r.revenuNetAvec)} €
                          </span>
                        </div>

                        {hasDeficit && (
                          <div className="grid grid-cols-3 px-3 py-1.5 text-orange-700 bg-orange-50">
                            <span className="flex items-center gap-1 col-span-2">
                              Déficit imputable (rev. global)
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-3 h-3 text-orange-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-[220px] text-xs">
                                  Nouveauté Jeanbrun : le déficit foncier s'impute sur votre revenu global, dans la limite de 10 700 €/an.
                                </TooltipContent>
                              </Tooltip>
                            </span>
                            <span className="text-right font-semibold">{fmt(r.deficitImputable)} €</span>
                          </div>
                        )}

                        <div className="grid grid-cols-3 px-3 py-1.5 text-gray-600">
                          <span>Impôt IR ({tmi}%)</span>
                          <span className="text-center">{fmt(r.impotIRSans)} €</span>
                          <span className={`text-right ${r.impotIRAvec < 0 ? "text-green-600 font-semibold" : ""}`}>
                            {r.impotIRAvec < 0 ? "–" : ""}{fmt(r.impotIRAvec)} €
                          </span>
                        </div>

                        <div className="grid grid-cols-3 px-3 py-1.5 text-gray-600">
                          <span>Prélèv. sociaux (17,2%)</span>
                          <span className="text-center">{fmt(r.impotPSSans)} €</span>
                          <span className="text-right">{fmt(r.impotPSAvec)} €</span>
                        </div>

                        <div className="grid grid-cols-3 px-3 py-2 font-bold text-gray-800 bg-white rounded-b-lg">
                          <span>Total impôts</span>
                          <span className="text-center">{fmt(r.impotTotalSans)} €</span>
                          <span className="text-right text-blue-700">
                            {fmt(Math.max(r.impotTotalAvec, 0))} €
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-400 leading-relaxed text-center">
                        Simulation indicative — barèmes PLF 2026 & zonage ABC officiel du 5 sept. 2025.
                        Loyers social/très social en attente des décrets ANAH.
                      </p> */}
                    </div>

                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full h-10 rounded-lg font-semibold text-white text-sm shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                      style={{ background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)" }}
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

      {/* ── BLOC BAS DE PAGE ── */}
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
