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
    <div className="w-full bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-600 text-white overflow-hidden pt-20">
      <div className="container mx-auto grid lg:grid-cols-12">
        {/* ══════════════════════════════════
            COLONNE GAUCHE — calquée sur l'image
        ══════════════════════════════════ */}
        <div className="flex flex-col justify-center px-6 py-6 md:p-0 backdrop-blur-[2px] lg:col-span-4">
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
              PLF 2026 • Plan de relance logement
            </span>
          </div>

          {/* Titre */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3">
            Simulateur du statut
            <br />
            du bailleur privé
          </h2>

          {/* Accroche */}
          <p className="text-base md:text-lg font-semibold text-white mb-5">
            Estimez votre avantage fiscal en quelques secondes.
          </p>

          {/* Checkmarks */}
          <ul className="space-y-3 mb-6">
            {["Simulation gratuite", "Résultat immédiat", "Étude personnalisée"].map((text, i) => (
              <li key={i} className="flex items-center gap-2 text-sm md:text-base">
                <svg
                  className="w-4 h-4 flex-shrink-0 text-white"
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

          {/* Lien */}
          <a
            href="#comprendre"
            className="text-white text-sm underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all w-fit"
          >
            Comprendre le dispositif
          </a>
        </div>

        {/* ══════════════════════════════════
            COLONNE DROITE — simulateur ORIGINAL inchangé
        ══════════════════════════════════ */}
        <div className="p-4 md:p-0 lg:col-span-8">
          <div className="max-w-5xl mx-auto">
            <Card
              className="shadow-lg"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(154, 192, 208, 0.3)",
                borderRadius: "20px",
              }}
            >
              <CardContent className="p-4 md:p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* ── INPUTS ── */}
                  <div className="space-y-3">
                    {/* Type de bien – VEFA uniquement */}
                    <div className="space-y-2">
                      <Label className="font-semibold" style={{ color: "#0B1220" }}>
                        Type de bien
                      </Label>
                      <Select value="neuf" disabled>
                        <SelectTrigger className="border-[#9AC0D0]/50">
                          <SelectValue placeholder="Neuf / VEFA (recommandé)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="neuf">Neuf / VEFA (recommandé)</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <p className="text-xs" style={{ color: "#046C91", opacity: 0.7 }}>
                        Recevez une sélection de lots neufs éligibles selon votre budget et votre ville.
                      </p> */}
                      <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="text-xs underline cursor-pointer"
                        style={{ color: "#046C91", opacity: 0.75 }}
                      >
                        Ancien rénové : cas particulier (conditions strictes) – vérifier en appel
                      </button>
                    </div>

                    {/* Niveau de loyer */}
                    <div className="space-y-2">
                      <Label className="font-semibold" style={{ color: "#0B1220" }}>
                        Niveau de loyer
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {(["intermediaire", "social", "tres_social"] as NiveauLoyer[]).map((niveau) => (
                          <button
                            key={niveau}
                            onClick={() => setNiveauLoyer(niveau)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                            style={
                              niveauLoyer === niveau
                                ? { backgroundColor: "#123768", color: "#FFFFFF" }
                                : { backgroundColor: "transparent", border: "1.5px solid #9AC0D0", color: "#0B1220" }
                            }
                            onMouseEnter={(e) => {
                              if (niveauLoyer !== niveau)
                                e.currentTarget.style.backgroundColor = "rgba(154,192,208,0.15)";
                            }}
                            onMouseLeave={(e) => {
                              if (niveauLoyer !== niveau) e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            {LABELS_LOYER[niveau]}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: "#0B1220", opacity: 0.45 }}>
                        Références indicatives, susceptibles d'évoluer avec les textes d'application.
                      </p>
                    </div>

                    {/* Prix d'achat */}
                    <div className="space-y-2">
                      <Label htmlFor="prix" className="font-semibold" style={{ color: "#0B1220" }}>
                        Prix d'achat (€)
                      </Label>
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

                    {/* Loyer annuel + micro-aide */}
                    <div className="space-y-2">
                      <Label htmlFor="loyer" className="font-semibold" style={{ color: "#0B1220" }}>
                        Loyer annuel brut (€/an)
                      </Label>
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
                      <p className="text-xs" style={{ color: "#046C91" }}>
                        ≈ {fmt(loyerMensuel)} €/mois
                      </p>
                    </div>

                    {/* Charges annuelles + micro-aide */}
                    <div className="space-y-2">
                      <Label htmlFor="charges" className="font-semibold" style={{ color: "#0B1220" }}>
                        Charges annuelles (€/an)
                      </Label>
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
                      <p className="text-xs" style={{ color: "#046C91", opacity: 0.7 }}>
                        TF + copro + assurance + gestion (hors crédit)
                      </p>
                    </div>

                    {/* TMI */}
                    <div className="space-y-2">
                      <Label className="font-semibold" style={{ color: "#0B1220" }}>
                        Votre TMI (Taux Marginal d'Imposition)
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {([0, 11, 30, 41, 45] as TMI[]).map((rate) => (
                          <button
                            key={rate}
                            onClick={() => setTmi(rate)}
                            className="min-w-[60px] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                            style={
                              tmi === rate
                                ? { backgroundColor: "#123768", color: "#FFFFFF" }
                                : { backgroundColor: "transparent", border: "1.5px solid #9AC0D0", color: "#0B1220" }
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

                  {/* ── RESULTS ── */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Sans dispositif */}
                      <Card className="border-gray-200 bg-gray-50" style={{ borderRadius: "16px" }}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Sans dispositif
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-gray-400 mb-1">Impôt annuel</p>
                          <p className="text-2xl font-bold text-gray-700">{fmt(resultats.impotSansJeanbrun)} €</p>
                        </CardContent>
                      </Card>

                      {/* Avec Jeanbrun */}
                      <Card
                        style={{
                          borderRadius: "16px",
                          backgroundColor: "rgba(4, 108, 145, 0.06)",
                          border: "1px solid rgba(4, 108, 145, 0.25)",
                        }}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle
                            className="text-sm font-medium flex items-center gap-2"
                            style={{ color: "#046C91" }}
                          >
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
                    <Card
                      style={{
                        borderRadius: "16px",
                        backgroundColor: "rgba(154, 192, 208, 0.2)",
                        border: "1px solid rgba(154, 192, 208, 0.4)",
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Wallet className="w-5 h-5" style={{ color: "#046C91" }} />
                          <span className="text-gray-600 font-medium text-sm">Économie annuelle estimée</span>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold" style={{ color: "#123768" }}>
                          {fmt(resultats.economieAnnuelle)} €
                        </p>
                        <div className="mt-1 space-y-0.5">
                          <p className="text-sm" style={{ color: "#046C91" }}>
                            Soit ≈ {fmt(Math.round(resultats.economieAnnuelle / 12))} €/mois
                          </p>
                          <p className="text-sm" style={{ color: "#046C91" }}>
                            Sur 9 ans : {fmt(resultats.economieAnnuelle * 9)} €
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
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
                    <div className="rounded-xl p-3" style={{ backgroundColor: "#F6FAFC" }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: "#0B1220" }}>
                        Détails :
                      </p>
                      <ul className="text-xs space-y-0.5" style={{ color: "#0B1220", opacity: 0.65 }}>
                        <li>• Amortissement annuel : {fmt(resultats.amortissementAnnuel)} €</li>
                        {resultats.deficitFoncier > 0 && (
                          <li>• Déficit foncier imputable : {fmt(resultats.deficitFoncier)} €</li>
                        )}
                        <li>• Économie sur 9 ans : {fmt(resultats.economieAnnuelle * 9)} €</li>
                      </ul>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-white font-semibold text-sm transition-colors"
                      style={{ backgroundColor: "#046C91", borderRadius: "14px" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#035D7D")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#046C91")}
                    >
                      <Mail className="w-5 h-5" />
                      Recevoir une étude personnalisée (lots neufs éligibles)
                    </button>

                    <p className="text-xs text-center" style={{ color: "#0B1220", opacity: 0.45 }}>
                      <strong>Simulation indicative :</strong> Ce calcul repose sur les taux annoncés dans le PLF 2026.
                      Les modalités définitives seront précisées par décret. Engagement 9 ans, location nue obligatoire.
                    </p>
                    <p className="text-xs text-center" style={{ color: "#0B1220", opacity: 0.4 }}>
                      N'inclut pas : intérêts d'emprunt et situation fiscale complète (affinés en étude).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          BLOC CONVERSION PREMIUM
      ══════════════════════════════════ */}
      <div className="w-full bg-trust-light">
        <div className="max-w-[900px] mx-auto px-6 py-12 md:py-16">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: "#123768" }}>
            Allez plus loin avec votre étude personnalisée
          </h3>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: (
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                text: "Effort d'épargne mensuel réel",
              },
              {
                icon: (
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                text: "Cash-flow estimé sur 9 ans",
              },
              {
                icon: (
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
                text: "Sélection de biens compatibles avec votre profil",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-sm font-medium text-foreground/80">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 rounded-xl text-white font-semibold text-sm shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "#046C91" }}
            >
              Recevoir mon étude personnalisée
            </button>
            <p className="text-xs text-muted-foreground">Vos données restent confidentielles. Aucun spam.</p>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
