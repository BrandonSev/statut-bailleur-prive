import { useState } from "react";
import { ContactModal } from "./ContactModal";

export const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const navLinks = [
    { label: "Simulateur", href: "#simulateur" },
    { label: "Plafonds & taux", href: "#plafonds" },
    { label: "Comparatif Pinel", href: "#comparatif" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[hsl(196,100%,10%)] text-white/80">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-sm md:justify-items-center">
          {/* Col 1 — À propos */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 leading-snug">
              Statut du bailleur privé
              <br />
              <span className="font-normal text-white/60 text-xs">Dispositif Jeanbrun</span>
            </h4>
            <p className="text-white/50 text-xs leading-relaxed mb-3">
              Plateforme d'information et de simulation dédiée au statut du bailleur privé issu du Plan de relance
              logement 2026. Analyse pédagogique et études personnalisées.
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
            <h4 className="text-white font-bold text-sm mb-3">Informations légales</h4>
            <ul className="text-white/50 text-xs space-y-1.5 mb-4 leading-relaxed">
              <li>• Dispositif intégré à la loi de finances 2026</li>
              <li>• Décrets d'application en attente</li>
              <li>• Simulations indicatives et non contractuelles</li>
            </ul>
            <div className="flex flex-col gap-1.5">
              {["Mentions légales", "Politique de confidentialité", "CGU", "Gestion des cookies"].map((t) => (
                <a key={t} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                  {t}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — CTA */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Votre étude personnalisée</h4>
            <p className="text-white/50 text-xs mb-4">Étude gratuite et sans engagement.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-white text-xs font-semibold bg-primary hover:bg-primary/80 transition-colors mb-3"
            >
              Recevoir mon étude
            </button>
            <ul className="text-white/40 text-[11px] space-y-1">
              <li>✓ Réponse sous 24h ouvrées</li>
              <li>✓ Données confidentielles</li>
              <li>✓ Aucun spam</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-5 text-center space-y-1.5">
          <p className="text-white/40 text-xs">© 2026 Polyvalence Immobilier – Tous droits réservés</p>
          <p className="text-white/30 text-[11px]">
            Statut du bailleur privé (dispositif Jeanbrun) – Plan de relance logement 2026
          </p>
          <p className="text-white/20 text-[10px]">
            Amortissement immobilier • Investissement locatif • Fiscalité immobilière 2026 • Alternative au Pinel
          </p>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </footer>
  );
};
