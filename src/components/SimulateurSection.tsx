import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
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
  social: "Social",
  tres_social: "Très social",
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
  }, [niveauLoyer, prixAchat, loyerAnnuel, chargesAnnuelles, tmi]);

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
          {/* ══════════════════════════════════
              COLONNE GAUCHE — Ultra-compact
          ══════════════════════════════════ */}
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

          {/* ══════════════════════════════════
              COLONNE DROITE — Carte minimaliste
          ══════════════════════════════════ */}
          <div className="rounded-xl shadow-xl overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
            {/* Formulaire */}
            <div className="p-5 space-y-3">
              {/* Ligne 1 : Prix + Loyer */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="prix" className="text-xs font-medium text-gray-700">
                    Prix d'achat
                  </Label>
                  <div className="relative">
                    <Input
                      id="prix"
                      type="number"
                      value={prixAchat}
                      onChange={(e) => setPrixAchat(e.target.value)}
                      placeholder="200000"
                      className="h-9 pr-8 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="loyer" className="text-xs font-medium text-gray-700">
                    Loyer annuel
                  </Label>
                  <div className="relative">
                    <Input
                      id="loyer"
                      type="number"
                      value={loyerAnnuel}
                      onChange={(e) => setLoyerAnnuel(e.target.value)}
                      placeholder="9600"
                      className="h-9 pr-8 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                  </div>
                </div>
              </div>

              {/* Ligne 2 : Charges + TMI */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="charges" className="text-xs font-medium text-gray-700">
                    Charges/an
                  </Label>
                  <div className="relative">
                    <Input
                      id="charges"
                      type="number"
                      value={chargesAnnuelles}
                      onChange={(e) => setChargesAnnuelles(e.target.value)}
                      placeholder="2000"
                      className="h-9 pr-8 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">TMI</Label>
                  <Select value={String(tmi)} onValueChange={(v) => setTmi(Number(v) as TMI)}>
                    <SelectTrigger className="h-9 border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                        <SelectItem key={rate} value={String(rate)}>
                          {rate}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Ligne 3 : Niveau de loyer */}
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-700">Niveau de loyer</Label>
                <Select value={niveauLoyer} onValueChange={(v) => setNiveauLoyer(v as NiveauLoyer)}>
                  <SelectTrigger className="h-9 border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["intermediaire", "social", "tres_social"] as NiveauLoyer[]).map((n) => (
                      <SelectItem key={n} value={n}>
                        {LABELS_LOYER[n]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Séparateur */}
              <div className="border-t border-gray-100 my-3"></div>

              {/* Résultat — Ultra-compact */}
              <div className="text-center py-2 bg-green-100 border border-green-200">
                <p className="text-xs text-gray-500 mb-1">Économie annuelle estimée</p>
                <p
                  className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  style={{ lineHeight: 1.1 }}
                >
                  {fmt(resultats.economieAnnuelle)} €
                </p>
                <p className="text-xs text-gray-400 mt-1">{fmt(resultats.economieAnnuelle * 9)} € sur 9 ans</p>
              </div>

              {/* CTA unique */}
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
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          BLOC DÉTAILS BAS DE PAGE (optionnel)
      ══════════════════════════════════ */}
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
                {
                  icon: "🏢",
                  title: "Biens éligibles",
                  desc: "Lots neufs compatibles avec votre budget",
                },
                {
                  icon: "🤝",
                  title: "Accompagnement",
                  desc: "Conseils personnalisés par nos experts",
                },
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
              style={{
                background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)",
              }}
            >
              Je demande mon étude
            </button>
            <p className="text-xs text-gray-400 mt-3">Sans engagement • Vos données restent confidentielles</p>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
