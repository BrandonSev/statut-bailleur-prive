import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">J</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-foreground text-lg leading-tight">Dispositif Jeanbrun</p>
              <p className="text-xs text-muted-foreground">Statut du Bailleur Privé</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("avantages")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Avantages
            </button>
            <button 
              onClick={() => scrollToSection("simulateur")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Simulateur
            </button>
            <button 
              onClick={() => scrollToSection("programmes")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Programmes
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:0800000000" className="flex items-center gap-2 text-primary font-medium">
              <Phone className="w-4 h-4" />
              <span>0 800 000 000</span>
            </a>
            <Button onClick={() => scrollToSection("contact")}>
              Être rappelé
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("avantages")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Avantages
              </button>
              <button 
                onClick={() => scrollToSection("simulateur")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Simulateur
              </button>
              <button 
                onClick={() => scrollToSection("programmes")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Programmes
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                FAQ
              </button>
              <Button onClick={() => scrollToSection("contact")} className="w-full mt-2">
                Être rappelé
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
