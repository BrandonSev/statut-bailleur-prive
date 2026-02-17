import { Wallet } from "lucide-react";

type NiveauLoyer = "intermediaire" | "social" | "tres_social";

const LOYERS: Record<NiveauLoyer, { zone_abis: string; zone_a: string; zone_b1: string; zone_b2: string }> = {
  intermediaire: { zone_abis: "18,25 €/m²", zone_a: "13,57 €/m²", zone_b1: "10,93 €/m²", zone_b2: "9,50 €/m²" },
  social: { zone_abis: "15,51 €/m²", zone_a: "11,53 €/m²", zone_b1: "9,29 €/m²", zone_b2: "8,08 €/m²" },
  tres_social: { zone_abis: "12,78 €/m²", zone_a: "9,50 €/m²", zone_b1: "7,65 €/m²", zone_b2: "6,65 €/m²" },
};

const LABELS: Record<NiveauLoyer, string> = {
  intermediaire: "Intermédiaire",
  social: "Social",
  tres_social: "Très social",
};

const ZONES = [
  { key: "zone_abis" as const, label: "A bis" },
  { key: "zone_a" as const, label: "A" },
  { key: "zone_b1" as const, label: "B1" },
  { key: "zone_b2" as const, label: "B2" },
];

const AMORTISSEMENTS = [
  { niveau: "Intermédiaire", montant: "8 000", texte: "Plafond annuel d'amortissement." },
  { niveau: "Social", montant: "10 000", texte: "Avantage fiscal renforcé." },
  { niveau: "Très social", montant: "12 000", texte: "Niveau maximal d'incitation fiscale." },
];

import { useState } from "react";

export const PlafondsSection = () => {
  const [selectedNiveau, setSelectedNiveau] = useState<NiveauLoyer>("intermediaire");

  return (
    <section id="plafonds" className="w-full bg-secondary py-16 md:py-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary-dark">Plafonds &amp; taux applicables</h2>
        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl">
          Les avantages fiscaux sont encadrés par des plafonds de loyers et des limites annuelles d'amortissement.
        </p>

        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Plafonds de loyers */}
          <div className="mb-12 lg:mb-0">
            <h3 className="text-base font-semibold mb-4 text-primary-dark">Plafonds de loyers par zone</h3>

            {/* Tabs niveau de loyer */}
            <div className="flex gap-2 mb-4">
              {(["intermediaire", "social", "tres_social"] as NiveauLoyer[]).map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNiveau(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedNiveau === n
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {LABELS[n]}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2.5 pr-6 font-semibold text-foreground/70">Zone</th>
                    <th className="text-right py-2.5 font-semibold text-foreground/70">Plafond mensuel</th>
                  </tr>
                </thead>
                <tbody>
                  {ZONES.map((zone) => (
                    <tr key={zone.key} className="border-b border-border/50">
                      <td className="py-2.5 pr-6 font-medium text-foreground">{zone.label}</td>
                      <td className="py-2.5 text-right font-semibold text-primary">
                        {LOYERS[selectedNiveau][zone.key]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Le loyer final peut inclure un coefficient multiplicateur selon la surface.
            </p>
          </div>

          {/* Plafonds d'amortissement */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-base font-semibold mb-4 text-primary-dark">Plafonds annuels d'amortissement</h3>
            <div className="flex flex-col gap-4">
              {AMORTISSEMENTS.map((item) => (
                <div
                  key={item.niveau}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-trust-light flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-0.5">{item.niveau}</p>
                    <p className="text-xl font-bold text-primary">
                      {item.montant}&nbsp;€<span className="text-sm font-medium text-muted-foreground"> / an</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{item.texte}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center pt-2">
              Barèmes indicatifs – susceptibles d'évolution selon publication des textes officiels.
            </p>
          </div>
        </div>

        {/* CTA step indicator */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-success-light text-success text-sm font-bold">1</span>
            <span className="text-sm font-medium text-muted-foreground">Comprendre les plafonds</span>
            <span className="text-success text-sm">✓</span>
          </div>
          <a
            href="#comparatif"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Avancer : étape suivante pour investir
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
