import { MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <div>
                <p className="font-bold text-lg">Dispositif Jeanbrun</p>
                <p className="text-sm text-muted-foreground">Statut du Bailleur Privé</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md mb-4">
              Investissez dans l'immobilier neuf et bénéficiez d'avantages fiscaux avec le nouveau 
              Statut du Bailleur Privé. Accompagnement expert par Polyvalence Immobilier.
            </p>
            <a 
              href="https://polyvalence-immobilier.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              polyvalence-immobilier.fr
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#avantages" className="hover:text-primary transition-colors">
                  Avantages
                </a>
              </li>
              <li>
                <a href="#simulateur" className="hover:text-primary transition-colors">
                  Simulateur
                </a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-primary transition-colors">
                  Programmes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Agencies */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Nos agences</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Chartres (28) - Eure-et-Loir</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Metz (57) - Moselle</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Polyvalence Immobilier. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                CGU
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
