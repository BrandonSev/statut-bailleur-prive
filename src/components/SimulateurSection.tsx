import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, TrendingDown, Sparkles } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { CityAutocomplete } from "./CityAutocomplete";

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
  social: "Social (-15%)",
  tres_social: "Très social (-30%)",
};

export const SimulateurSection = () => {
  const [niveauLoyer, setNiveauLoyer] = useState<NiveauLoyer>("intermediaire");
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [loyerAnnuel, setLoyerAnnuel] = useState<string>("9600");
  const [chargesAnnuelles, setChargesAnnuelles] = useState<string>("2000");
  const [tmi, setTmi] = useState<TMI>(30);
  const [modalOpen, setModalOpen] = useState(false);
  const [ville, setVille] = useState<string>("");

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
  const loyerMensuel = Math.round((parseFloat(loyerAnnuel) || 0) / 12);

  return (
    <div
      id="simulateur"
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1346a8 0%, #1a6bb5 50%, #0ea5b0 100%)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-center">
          {/* ══════════════════════════════════
              COLONNE GAUCHE — Accroche
          ══════════════════════════════════ */}
          <div className="text-white space-y-6">
            <div className="inline-block">
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                PLF 2026 • Plan de relance logement
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Simulateur du statut
              <br />
              du bailleur privé
            </h2>

            <p className="text-lg sm:text-xl font-medium text-white/90">Estimez votre avantage fiscal en 2 minutes.</p>

            <ul className="space-y-3">
              {["Simulation gratuite & immédiate", "Résultat personnalisé", "Sans engagement"].map((text, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#mecanisme"
              className="inline-block text-sm underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all"
            >
              Comment fonctionne le dispositif ?
            </a>
          </div>

          {/* ══════════════════════════════════
              COLONNE DROITE — Formulaire épuré
          ══════════════════════════════════ */}
          <div className="rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
            {/* Header simplifié */}
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Calculez votre économie</h3>
              <p className="text-sm text-gray-500 mt-0.5">Quelques informations suffisent</p>
            </div>

            {/* Formulaire */}
            <div className="px-6 py-6 space-y-5">
              {/* Prix d'achat */}
              <div className="space-y-1.5">
                <Label htmlFor="prix" className="text-sm font-medium text-gray-700">
                  Prix d'achat du bien
                </Label>
                <div className="relative">
                  <Input
                    id="prix"
                    type="number"
                    value={prixAchat}
                    onChange={(e) => setPrixAchat(e.target.value)}
                    placeholder="Ex : 250 000"
                    className="h-11 pr-10 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">€</span>
                </div>
              </div>

              {/* Loyer + Charges en ligne */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="loyer" className="text-sm font-medium text-gray-700">
                    Loyer annuel
                  </Label>
                  <div className="relative">
                    <Input
                      id="loyer"
                      type="number"
                      value={loyerAnnuel}
                      onChange={(e) => setLoyerAnnuel(e.target.value)}
                      placeholder="9 600"
                      className="h-11 pr-10 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                      €
                    </span>
                  </div>
                  <p className="text-xs text-blue-600">≈ {fmt(loyerMensuel)} €/mois</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="charges" className="text-sm font-medium text-gray-700">
                    Charges/an
                  </Label>
                  <div className="relative">
                    <Input
                      id="charges"
                      type="number"
                      value={chargesAnnuelles}
                      onChange={(e) => setChargesAnnuelles(e.target.value)}
                      placeholder="2 000"
                      className="h-11 pr-10 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                      €
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">TF, assurance, etc.</p>
                </div>
              </div>

              {/* Ville (autocomplete API gouv) */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">Ville du bien</Label>
                <CityAutocomplete
                  value={ville}
                  onChange={(city) => setVille(city)}
                  className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Niveau de loyer + TMI en ligne */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Niveau de loyer</Label>
                  <Select value={niveauLoyer} onValueChange={(v) => setNiveauLoyer(v as NiveauLoyer)}>
                    <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
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

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">Votre TMI</Label>
                  <Select value={String(tmi)} onValueChange={(v) => setTmi(Number(v) as TMI)}>
                    <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                        <SelectItem key={rate} value={String(rate)}>
                          {rate} %
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Séparateur */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-xs text-gray-400 font-medium">Votre économie</span>
                </div>
              </div>

              {/* Résultat économie — mise en avant forte */}
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <p className="text-sm font-medium text-gray-600">Économie annuelle estimée</p>
                </div>
                <p
                  className="text-5xl font-extrabold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  style={{ lineHeight: 1.1 }}
                >
                  {fmt(resultats.economieAnnuelle)} €
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Soit {fmt(Math.round(resultats.economieAnnuelle / 12))} €/mois • {fmt(resultats.economieAnnuelle * 9)}{" "}
                  € sur 9 ans
                </p>
              </div>

              {/* CTA principal */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full h-12 rounded-xl font-semibold text-white text-base shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)",
                }}
              >
                <Mail className="w-5 h-5" />
                Recevoir mon étude personnalisée
              </button>

              <p className="text-xs text-center text-gray-400 leading-relaxed">
                Obtenez une sélection de biens neufs éligibles + analyse détaillée de votre projet
              </p>
            </div>

            {/* Footer info */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong>Dispositif PLF 2026</strong> — Amortissement {resultats.taux.toFixed(1)}% par an, engagement 9
                  ans location nue. Simulation indicative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          BLOC CONVERSION BAS DE PAGE
      ══════════════════════════════════ */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Votre étude personnalisée comprend</h3>
            <p className="text-gray-600 mb-10">
              Allez au-delà de la simulation avec une analyse complète de votre projet
            </p>

            <div className="grid sm:grid-cols-3 gap-8 mb-10">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Cash-flow détaillé",
                  desc: "Effort d'épargne mensuel réel incluant crédit + charges - loyers - avantage fiscal",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  ),
                  title: "Sélection de biens",
                  desc: "Lots neufs éligibles correspondant à votre budget et votre localisation",
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                  title: "Accompagnement",
                  desc: "Conseils personnalisés et réponses à vos questions par nos experts",
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600"
                    style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)" }}
                  >
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)",
              }}
            >
              Je demande mon étude gratuite
            </button>
            <p className="text-xs text-gray-400 mt-3">Sans engagement • Vos données restent confidentielles</p>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-success-light text-success text-sm font-bold">0</span>
              <span className="text-sm font-medium text-gray-500">Simulation réalisée</span>
              <span className="text-success text-sm">✓</span>
            </div>
            <a
              href="#plafonds"
              className="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Avancer : découvrir les plafonds
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
