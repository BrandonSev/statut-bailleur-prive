import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Simulateur", id: "simulateur" },
  { label: "Plafonds & taux", id: "plafonds" },
  { label: "Comparatif Pinel", id: "comparatif" },
  { label: "FAQ", id: "faq" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border"
      style={{ top: "var(--banner-height, 32px)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Brand */}
          <span className="flex items-center gap-3 font-semibold text-foreground text-sm whitespace-nowrap">
            <img
              src="https://doc.polyvalence-immobilier.fr/imgs/polyvalence/pictos/investir/defisc-png-15.png"
              width="50"
            />
            Statut du bailleur privé
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button size="sm" onClick={() => scrollToSection("simulateur")}>
              Simuler ma situation
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-border">
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => scrollToSection("simulateur")} className="w-full mt-1" size="sm">
                Simuler ma situation
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
