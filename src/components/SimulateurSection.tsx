import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <div
      className="w-full overflow-hidden rounded-2xl shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #1346a8 0%, #1a6bb5 45%, #0ea5b0 100%)",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:min-h-[560px]">
        {/* ══════════════════════════════════
            COLONNE GAUCHE — Promo
        ══════════════════════════════════ */}
        <div className="flex flex-col justify-center px-8 py-10 lg:px-14 lg:py-16 lg:w-[46%]">
          {/* Badge */}
          <div className="mb-7">
            <span
              className="inline-block text-xs font-medium px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              PLF 2026 • Plan de relance logement
            </span>
          </div>

          {/* Titre */}
          <h2
            className="font-bold text-white leading-tight mb-5"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15 }}
          >
            Simulateur du statut
            <br />
            du bailleur privé
          </h2>

          {/* Accroche */}
          <p className="font-semibold text-white mb-9" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>
            Estimez votre avantage fiscal en quelques secondes.
          </p>

          {/* Checkmarks */}
          <ul className="space-y-4 mb-10">
            {["Simulation gratuite", "Résultat immédiat", "Étude personnalisée"].map((text, i) => (
              <li key={i} className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white font-medium" style={{ fontSize: "clamp(0.875rem, 1.3vw, 1rem)" }}>
                  {text}
                </span>
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
            COLONNE DROITE — Carte simulateur
        ══════════════════════════════════ */}
        <div className="flex items-center justify-center px-5 py-8 lg:px-12 lg:py-12 lg:w-[54%]">
          <div
            className="w-full max-w-[500px] rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
            }}
          >
            {/* Header */}
            <div className="px-7 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(154,192,208,0.2)" }}>
              <h3 className="text-xl font-bold" style={{ color: "#0B1220" }}>
                Simulation
              </h3>
            </div>

            {/* Body */}
            <div className="px-7 py-6 space-y-5">
              {/* Type de bien + Niveau loyer — 2 selects côte à côte */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Type de bien
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Select value="neuf" disabled>
                    <SelectTrigger className="h-10 text-sm border-[#9AC0D0]/50">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neuf">Neuf / VEFA</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={niveauLoyer} onValueChange={(v) => setNiveauLoyer(v as NiveauLoyer)}>
                    <SelectTrigger className="h-10 text-sm border-[#9AC0D0]/50">
                      <SelectValue placeholder="Choisir" />
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
                <div className="flex flex-wrap items-center gap-x-3 pt-0.5">
                  <p className="text-xs" style={{ color: "#046C91", opacity: 0.75 }}>
                    Lots neufs éligibles selon votre budget et votre ville.
                  </p>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-xs underline whitespace-nowrap"
                    style={{ color: "#046C91", opacity: 0.6 }}
                  >
                    Ancien rénové : vérifier en appel
                  </button>
                </div>
              </div>

              {/* Prix d'achat — pleine largeur */}
              <div className="space-y-1.5">
                <Label htmlFor="prix" className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  Prix
                </Label>
                <div className="relative">
                  <Input
                    id="prix"
                    type="number"
                    value={prixAchat}
                    onChange={(e) => setPrixAchat(e.target.value)}
                    className="h-10 pr-8 text-sm focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                </div>
              </div>

              {/* Loyer + Charges — côte à côte */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="loyer" className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                    Loyer annuel
                  </Label>
                  <div className="relative">
                    <Input
                      id="loyer"
                      type="number"
                      value={loyerAnnuel}
                      onChange={(e) => setLoyerAnnuel(e.target.value)}
                      className="h-10 pr-8 text-sm focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                  </div>
                  <p className="text-xs" style={{ color: "#046C91" }}>
                    ≈ {fmt(loyerMensuel)} €/mois
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="charges" className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                    Charges
                  </Label>
                  <div className="relative">
                    <Input
                      id="charges"
                      type="number"
                      value={chargesAnnuelles}
                      onChange={(e) => setChargesAnnuelles(e.target.value)}
                      placeholder="TF, assurance…"
                      className="h-10 pr-8 text-sm focus-visible:ring-[#046C91] border-[#9AC0D0]/50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                  </div>
                </div>
              </div>

              {/* TMI */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold" style={{ color: "#0B1220" }}>
                  TMI %
                </Label>
                <Select value={String(tmi)} onValueChange={(v) => setTmi(Number(v) as TMI)}>
                  <SelectTrigger className="h-10 text-sm border-[#9AC0D0]/50 w-40">
                    <SelectValue placeholder="Sélectionner" />
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

              {/* Séparateur */}
              <div
                className="w-full h-px"
                style={{ background: "linear-gradient(to right, transparent, #9AC0D0, transparent)" }}
              />

              {/* Résultat */}
              <div className="text-center py-1">
                <p className="text-sm font-semibold mb-1" style={{ color: "#0B1220" }}>
                  Économie annuelle estimée
                </p>
                <p className="font-bold leading-none" style={{ color: "#0B1220", fontSize: "2.6rem" }}>
                  {fmt(resultats.economieAnnuelle)} €
                </p>
                {/* Badges récap discrets */}
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  <Badge
                    className="text-xs bg-gray-50"
                    style={{ color: "#123768", border: "1px solid rgba(154,192,208,0.45)" }}
                  >
                    Amort. {fmt(resultats.amortissementAnnuel)} €/an
                  </Badge>
                  <Badge
                    className="text-xs bg-gray-50"
                    style={{ color: "#123768", border: "1px solid rgba(154,192,208,0.45)" }}
                  >
                    Sur 9 ans : {fmt(resultats.economieAnnuelle * 9)} €
                  </Badge>
                  {resultats.deficitFoncier > 0 && (
                    <Badge
                      className="text-xs bg-gray-50"
                      style={{ color: "#046C91", border: "1px solid rgba(4,108,145,0.25)" }}
                    >
                      Déficit {fmt(resultats.deficitFoncier)} €
                    </Badge>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 py-3.5 font-semibold text-sm rounded-xl transition-colors"
                style={{ backgroundColor: "#046C91", color: "#ffffff" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#035D7D")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#046C91")}
              >
                Recevoir une étude personnalisée
                <span className="font-normal opacity-75 text-xs">(lots neufs éligibles)</span>
              </button>

              {/* Disclaimer */}
              <p className="text-xs text-center leading-relaxed" style={{ color: "#0B1220", opacity: 0.38 }}>
                <strong>Simulation indicative</strong> — Taux PLF 2026, modalités définitives par décret. Engagement 9
                ans, location nue obligatoire. Hors intérêts d'emprunt.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
