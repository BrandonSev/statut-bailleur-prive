import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Simulateur fiscal", id: "simulateur" },
  { label: "Plafonds de loyers & amortissement", id: "plafonds" },
  { label: "Jeanbrun vs Pinel", id: "comparatif" },
  { label: "Etude personnalisée", id: "contact" },
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="50" height="50">
              <defs>
                <style>{`.cls-1 { fill: #000; }`}</style>
              </defs>
              <g>
                <g>
                  {/* Fenêtres gauche */}
                  <rect className="cls-1" x="63.8110962" y="95.4837646" width="9.9246216" height="9.9245605" />
                  <rect className="cls-1" x="80.1650391" y="95.4837646" width="9.9246216" height="9.9245605" />
                  <rect className="cls-1" x="63.8110962" y="111.1781616" width="9.9246216" height="9.9246216" />
                  <rect className="cls-1" x="80.1650391" y="111.1781616" width="9.9246216" height="9.9246216" />

                  {/* Fenêtres droite */}
                  <rect className="cls-1" x="109.9103394" y="95.4837646" width="9.9246216" height="9.9245605" />
                  <rect className="cls-1" x="126.2642822" y="95.4837646" width="9.9246216" height="9.9245605" />
                  <rect className="cls-1" x="109.9103394" y="111.1781616" width="9.9246216" height="9.9246216" />
                  <rect className="cls-1" x="126.2642822" y="111.1781616" width="9.9246216" height="9.9246216" />

                  {/* Corps du bâtiment + toit */}
                  <path
                    className="cls-1"
                    d="M194.8105469,128.7063599h-46.1738281v-43.4628906c0-1.4013672-1.1357422-2.5371094-2.5371094-2.5371094h-45.2824097l-22.3850708-16.1088867c-.8857422-.6376953-2.078125-.6376953-2.9638672,0l-23.0493164,16.5869141c-.6625977.4765625-1.0551758,1.2426758-1.0551758,2.059082v43.4628906H5.1899414c-1.4560547,0-2.6362305,1.1806641-2.6362305,2.6367188s1.1801758,2.6367188,2.6362305,2.6367188h189.6206055c1.4560547,0,2.6367188-1.1806641,2.6367188-2.6367188s-1.1806641-2.6367188-2.6367188-2.6367188ZM143.5625,128.7063599h-41.0253906v-40.9257812h41.0253906v40.9257812ZM56.4379883,86.5432739l20.512207-14.7612305,20.5126953,14.7612305v42.1630859h-41.0249023v-42.1630859Z"
                  />
                </g>
              </g>
            </svg>
            Statut du bailleur privé
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
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
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t border-border">
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
