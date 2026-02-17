import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, TrendingUp, Wallet, Mail, CheckCircle2, ArrowRight } from "lucide-react";
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

const LABELS_LOYER_DETAIL: Record<NiveauLoyer, string> = {
  intermediaire: "",
  social: "≈ −15 %",
  tres_social: "≈ −30 %",
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
  const loyerMensuel = Math.round((parseFloat(loyerAnnuel) || 0) / 12);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl shadow-2xl"
      style={{ background: "linear-gradient(135deg, #1a2f5e 0%, #1a5276 40%, #0e6b8a 100%)" }}
    >
      {/* ═══════════════════════════════
          HEADER BANDE SUPÉRIEURE (mobile seulement)
          → sur desktop, remplacée par la colonne gauche
      ═══════════════════════════════ */}
      <div className="lg:hidden px-6 pt-8 pb-6" style={{ background: "rgba(0,0,0,0.15)" }}>
        <span
          className="inline-block mb-4 text-xs font-medium px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          PLF 2026 • Plan de relance logement
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
          Simulateur du statut
          <br />
          du bailleur privé
        </h2>
        <p className="text-blue-200 text-sm sm:text-base">Estimez votre avantage fiscal en quelques secondes.</p>
      </div>

      {/* ═══════════════════════════════
          GRILLE PRINCIPALE desktop : [promo | simulateur]
      ═══════════════════════════════ */}
      <div className="lg:grid lg:grid-cols-[420px_1fr]">
        {/* ── COLONNE GAUCHE : Promo (desktop uniquement) ── */}
        <div className="hidden lg:flex flex-col justify-between px-10 py-14" style={{ background: "rgba(0,0,0,0.12)" }}>
          <div>
            <span
              className="inline-block mb-6 text-xs font-medium px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              PLF 2026 • Plan de relance logement
            </span>

            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-5">
              Simulateur du statut
              <br />
              du bailleur privé
            </h2>

            <p className="text-blue-200 text-lg mb-10 leading-relaxed">
              Estimez votre avantage fiscal en quelques secondes grâce au nouveau dispositif Jeanbrun.
            </p>

            <ul className="space-y-4 mb-10">
              {["Simulation gratuite & immédiate", "Taux actualisés PLF 2026", "Étude personnalisée sur demande"].map(
                (text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#67e8f9" }} />
                    <span className="text-white/90 text-sm xl:text-base">{text}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <a
              href="#comprendre"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "#67e8f9" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#67e8f9")}
            >
              Comprendre le dispositif
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mini bloc chiffre clé */}
            <div
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <p className="text-white/60 text-xs mb-1 uppercase tracking-widest">Économie potentielle</p>
              <p className="text-3xl font-bold text-white">{fmt(resultats.economieAnnuelle * 9)} €</p>
              <p className="text-cyan-300 text-sm mt-1">sur 9 ans d'engagement</p>
            </div>
          </div>
        </div>

        {/* ── COLONNE DROITE : Simulateur ── */}
        <div className="bg-white p-5 sm:p-8 lg:p-10">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            {/* ────────────────────────────────────
                INPUTS
            ──────────────────────────────────── */}
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              {/* Type de bien */}
              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Type de bien
                </Label>
                <Select value="neuf" disabled>
                  <SelectTrigger className="border-[#9AC0D0]/50 h-10">
                    <SelectValue placeholder="Neuf / VEFA (recommandé)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neuf">Neuf / VEFA (recommandé)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <p className="text-xs" style={{ color: "#046C91", opacity: 0.8 }}>
                    Sélection de lots neufs éligibles selon votre budget et votre ville.
                  </p>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-xs underline whitespace-nowrap"
                    style={{ color: "#046C91", opacity: 0.7 }}
                  >
                    Ancien rénové : vérifier en appel
                  </button>
                </div>
              </div>

              {/* Niveau de loyer */}
              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Niveau de loyer
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(["intermediaire", "social", "tres_social"] as NiveauLoyer[]).map((niveau) => (
                    <button
                      key={niveau}
                      onClick={() => setNiveauLoyer(niveau)}
                      className="flex items-baseline gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
                      style={
                        niveauLoyer === niveau
                          ? { backgroundColor: "#123768", color: "#FFFFFF" }
                          : {
                              backgroundColor: "transparent",
                              border: "1.5px solid #9AC0D0",
                              color: "#0B1220",
                            }
                      }
                      onMouseEnter={(e) => {
                        if (niveauLoyer !== niveau) e.currentTarget.style.backgroundColor = "rgba(154,192,208,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        if (niveauLoyer !== niveau) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {LABELS_LOYER[niveau]}
                      {LABELS_LOYER_DETAIL[niveau] && (
                        <span
                          className="text-xs font-normal"
                          style={{
                            color: niveauLoyer === niveau ? "rgba(255,255,255,0.7)" : "#046C91",
                          }}
                        >
                          {LABELS_LOYER_DETAIL[niveau]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#0B1220", opacity: 0.4 }}>
                  Références indicatives, susceptibles d'évoluer avec les textes d'application.
                </p>
              </div>

              {/* Prix d'achat */}
              <div className="space-y-1.5">
                <Label htmlFor="prix" className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Prix d'achat
                </Label>
                <div className="relative">
                  <Input
                    id="prix"
                    type="number"
                    value={prixAchat}
                    onChange={(e) => setPrixAchat(e.target.value)}
                    placeholder="Ex : 250 000"
                    className="pr-8 h-10 focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                </div>
              </div>

              {/* Loyer annuel */}
              <div className="space-y-1.5">
                <Label htmlFor="loyer" className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Loyer annuel brut
                </Label>
                <div className="relative">
                  <Input
                    id="loyer"
                    type="number"
                    value={loyerAnnuel}
                    onChange={(e) => setLoyerAnnuel(e.target.value)}
                    className="pr-8 h-10 focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                </div>
                <p className="text-xs" style={{ color: "#046C91" }}>
                  ≈ {fmt(loyerMensuel)} €/mois
                </p>
              </div>

              {/* Charges annuelles */}
              <div className="space-y-1.5">
                <Label htmlFor="charges" className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Charges annuelles
                </Label>
                <div className="relative">
                  <Input
                    id="charges"
                    type="number"
                    value={chargesAnnuelles}
                    onChange={(e) => setChargesAnnuelles(e.target.value)}
                    placeholder="TF, assurance…"
                    className="pr-8 h-10 focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                </div>
                <p className="text-xs" style={{ color: "#046C91", opacity: 0.7 }}>
                  TF + copro + assurance + gestion
                </p>
              </div>

              {/* TMI */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Votre TMI
                </Label>
                <div className="flex flex-wrap gap-2">
                  {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setTmi(rate)}
                      className="min-w-[52px] px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
                      style={
                        tmi === rate
                          ? { backgroundColor: "#123768", color: "#FFFFFF" }
                          : {
                              backgroundColor: "transparent",
                              border: "1.5px solid #9AC0D0",
                              color: "#0B1220",
                            }
                      }
                      onMouseEnter={(e) => {
                        if (tmi !== rate) e.currentTarget.style.backgroundColor = "rgba(154,192,208,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        if (tmi !== rate) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ────────────────────────────────────
                SÉPARATEUR
            ──────────────────────────────────── */}
            <div
              className="w-full h-px mb-6"
              style={{ background: "linear-gradient(to right, transparent, #9AC0D0, transparent)" }}
            />

            {/* ────────────────────────────────────
                RÉSULTATS
            ──────────────────────────────────── */}
            <div className="space-y-4">
              {/* Ligne : sans / avec + économie */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Sans dispositif */}
                <div className="rounded-xl p-4" style={{ background: "#F8F9FA", border: "1px solid #E5E7EB" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <p className="text-xs font-medium text-gray-400">Sans dispositif</p>
                  </div>
                  <p className="text-xs text-gray-400 mb-0.5">Impôt / an</p>
                  <p className="text-xl font-bold text-gray-600">{fmt(resultats.impotSansJeanbrun)} €</p>
                </div>

                {/* Avec Jeanbrun */}
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(4,108,145,0.06)", border: "1px solid rgba(4,108,145,0.2)" }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingDown className="w-4 h-4" style={{ color: "#046C91" }} />
                    <p className="text-xs font-medium" style={{ color: "#046C91" }}>
                      Avec Jeanbrun
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mb-0.5">Impôt / an</p>
                  <p className="text-xl font-bold" style={{ color: "#046C91" }}>
                    {fmt(resultats.impotAvecJeanbrun)} €
                  </p>
                </div>

                {/* Économie — mise en valeur */}
                <div
                  className="rounded-xl p-4 sm:col-span-1"
                  style={{ background: "linear-gradient(135deg, #123768 0%, #1a5276 100%)" }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Wallet className="w-4 h-4 text-cyan-300" />
                    <p className="text-xs font-medium text-cyan-300">Économie / an</p>
                  </div>
                  <p className="text-xs text-white/60 mb-0.5">Estimée</p>
                  <p className="text-xl font-bold text-white">{fmt(resultats.economieAnnuelle)} €</p>
                </div>
              </div>

              {/* Bande récap économies */}
              <div
                className="rounded-xl px-5 py-4"
                style={{ background: "rgba(154,192,208,0.15)", border: "1px solid rgba(154,192,208,0.35)" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-5">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Mensuel</p>
                      <p className="text-base font-bold" style={{ color: "#123768" }}>
                        ≈ {fmt(Math.round(resultats.economieAnnuelle / 12))} €
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Sur 9 ans</p>
                      <p className="text-base font-bold" style={{ color: "#123768" }}>
                        {fmt(resultats.economieAnnuelle * 9)} €
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className="bg-white/80 text-xs"
                      style={{ color: "#123768", border: "1px solid rgba(154,192,208,0.5)" }}
                    >
                      Taux {resultats.taux.toFixed(1)} % / an
                    </Badge>
                    <Badge
                      className="bg-white/80 text-xs"
                      style={{ color: "#123768", border: "1px solid rgba(154,192,208,0.5)" }}
                    >
                      Amort. {fmt(resultats.amortissementAnnuel)} €
                    </Badge>
                    {resultats.deficitFoncier > 0 && (
                      <Badge
                        className="bg-white/80 text-xs"
                        style={{ color: "#046C91", border: "1px solid rgba(4,108,145,0.3)" }}
                      >
                        Déficit {fmt(resultats.deficitFoncier)} €
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm rounded-xl transition-colors"
                style={{ backgroundColor: "#046C91" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#035D7D")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#046C91")}
              >
                <Mail className="w-4 h-4" />
                Recevoir une étude personnalisée – lots neufs éligibles
              </button>

              {/* Disclaimers */}
              <div className="space-y-1 text-center">
                <p className="text-xs" style={{ color: "#0B1220", opacity: 0.4 }}>
                  <strong>Simulation indicative</strong> — Taux annoncés dans le PLF 2026, modalités définitives par
                  décret. Engagement 9 ans, location nue obligatoire.
                </p>
                <p className="text-xs" style={{ color: "#0B1220", opacity: 0.35 }}>
                  Hors intérêts d'emprunt et situation fiscale complète (affinés en étude).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
