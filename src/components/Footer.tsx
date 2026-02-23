import { useState } from "react";
import { ContactModal } from "./ContactModal";

export const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const navLinks = [
    { label: "Simulateur fiscal", href: "#simulateur" },
    { label: "Plafonds de loyers & amortissement", href: "#plafonds" },
    { label: "Jeanbrun vs Pinel", href: "#comparatif" },
    { label: "FAQ", href: "#faq" },
    { label: "Étude personnalisée", href: "#contact" },
  ];

  return (
    <footer className="bg-[hsl(196,100%,10%)] text-white/80">
      <div className="container mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-sm md:justify-items-center">
          {/* Col 1 — À propos */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 leading-snug">
              Statut du bailleur privé (dispositif Jeanbrun) – Amortissement fiscal immobilier 2026
              <br />
              <span className="font-normal text-white/60 text-xs">
                Mesure du plan de relance logement intégrée à la loi de finances 2026 (article 47)
              </span>
            </h4>
            <p className="text-white/50 text-xs leading-relaxed mb-3">
              Plateforme d’information et de simulation dédiée au statut du bailleur privé (dispositif Jeanbrun),
              instauré par la loi de finances 2026. Outil pédagogique et stratégique destiné aux investisseurs
              souhaitant optimiser la fiscalité de leurs revenus locatifs dans le neuf.
            </p>
            <a
              href="#simulateur"
              className="text-primary-light text-xs underline underline-offset-2 hover:text-white transition-colors"
            >
              En savoir plus
            </a>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/50 text-xs hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Juridique */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Cadre réglementaire & informations légales</h4>
            <ul className="text-white/50 text-xs space-y-1.5 mb-4 leading-relaxed">
              <li>• Dispositif instauré par la loi n°2026-103 du 19 février 2026 (article 47)</li>
              <li>• Applicable aux acquisitions réalisées entre le 21 février 2026 et le 31 décembre 2028</li>
              <li>• Doctrine administrative (BOFiP) en attente de publication</li>
              <li>• Simulations fournies à titre indicatif et non contractuel</li>
            </ul>
            <div className="flex flex-col gap-1.5">
              {["Mentions légales", "Politique de confidentialité", "CGU"].map((t) => (
                <a key={t} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                  {t}
                </a>
              ))}
            </div>
            <p className="text-white/50 text-xs space-y-1.5 mb-4 leading-relaxed">
              Les informations présentées ne constituent ni un conseil fiscal ni un conseil juridique personnalisé.
            </p>
          </div>

          {/* Col 4 — CTA */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Recevez votre analyse fiscale personnalisée</h4>
            <p className="text-white/50 text-xs mb-4">
              Analyse personnalisée basée sur votre situation fiscale et patrimoniale.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-white text-xs font-semibold bg-primary hover:bg-primary/80 transition-colors mb-3"
            >
              Obtenir mon étude fiscale personnalisée
            </button>
            <ul className="text-white/40 text-[11px] space-y-1">
              <li>✓ Réponse sous 24h ouvrées</li>
              <li>✓ Conseiller dédié</li>
              <li>✓ Aucune obligation d’investissement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5 text-center space-y-1.5">
          <p className="text-white/40 text-xs">Site édité par Polyvalence Immobilier</p>
          <p className="text-white/40 text-xs">© 2026 Polyvalence Immobilier – Tous droits réservés</p>
          <p className="text-white/30 text-[11px]">
            Plateforme dédiée au statut du bailleur privé (dispositif Jeanbrun), instauré par la loi de finances 2026
            (article 47).
          </p>
          <p className="text-white/20 text-[10px]">
            Amortissement fiscal immobilier 2026 · Investissement locatif neuf · Alternative au Pinel
          </p>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </footer>
  );
};
