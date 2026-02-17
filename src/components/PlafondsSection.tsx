import { Wallet } from "lucide-react";

const LOYERS = [
  { zone: "A bis", plafond: "18,25 €/m²" },
  { zone: "A", plafond: "13,57 €/m²" },
  { zone: "B1", plafond: "10,93 €/m²" },
  { zone: "B2", plafond: "9,50 €/m²" },
];

const AMORTISSEMENTS = [
  { niveau: "Intermédiaire", montant: "8 000", texte: "Plafond annuel d'amortissement." },
  { niveau: "Social", montant: "10 000", texte: "Avantage fiscal renforcé." },
  { niveau: "Très social", montant: "12 000", texte: "Niveau maximal d'incitation fiscale." },
];

export const PlafondsSection = () => {
  return (
    <section id="plafonds" className="w-full bg-secondary py-16 md:py-20">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary-dark">
          Plafonds &amp; taux applicables
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl">
          Les avantages fiscaux sont encadrés par des plafonds de loyers et des limites annuelles d'amortissement.
        </p>

        <div className="mb-12">
          <h3 className="text-base font-semibold mb-4 text-primary-dark">Plafonds de loyers par zone</h3>
          <div className="overflow-x-auto">
            <table className="w-full max-w-lg text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 pr-6 font-semibold text-foreground/70">Zone</th>
                  <th className="text-right py-2.5 font-semibold text-foreground/70">Plafond mensuel</th>
                </tr>
              </thead>
              <tbody>
                {LOYERS.map((row) => (
                  <tr key={row.zone} className="border-b border-border/50">
                    <td className="py-2.5 pr-6 font-medium text-foreground">{row.zone}</td>
                    <td className="py-2.5 text-right font-semibold text-primary">{row.plafond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Le loyer final peut inclure un coefficient multiplicateur selon la surface.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-base font-semibold mb-4 text-primary-dark">Plafonds annuels d'amortissement</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {AMORTISSEMENTS.map((item) => (
              <div key={item.niveau} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-trust-light flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">{item.niveau}</p>
                  <p className="text-xl font-bold text-primary">{item.montant}&nbsp;€<span className="text-sm font-medium text-muted-foreground"> / an</span></p>
                  <p className="text-xs text-muted-foreground mt-1">{item.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-2">
          Barèmes indicatifs – susceptibles d'évolution selon publication des textes officiels.
        </p>
      </div>
    </section>
  );
};
