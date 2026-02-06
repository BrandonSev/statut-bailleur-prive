import { Check, Clock, FileText, Gavel, Building, Calendar } from "lucide-react";

interface TimelineStep {
  date: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  icon: React.ReactNode;
}

const timelineSteps: TimelineStep[] = [
  {
    date: "15 septembre 2025",
    title: "Présentation du projet de loi",
    description: "Dépôt du projet de loi de finances 2026 incluant le dispositif Jeanbrun",
    status: "completed",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    date: "12 novembre 2025",
    title: "Adoption en Commission",
    description: "Vote favorable en commission des finances de l'Assemblée nationale",
    status: "completed",
    icon: <Gavel className="w-5 h-5" />,
  },
  {
    date: "20 janvier 2026",
    title: "Adoption via 49.3",
    description: "Le gouvernement engage sa responsabilité - Officiellement nommé \"Relance Logement\"",
    status: "completed",
    icon: <Gavel className="w-5 h-5" />,
  },
  {
    date: "En attente",
    title: "Décrets d'application",
    description: "Publication des décrets précisant les modalités d'application du dispositif",
    status: "current",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    date: "Prévision Q2 2026",
    title: "Entrée en vigueur",
    description: "Application effective du dispositif pour les nouveaux investissements",
    status: "upcoming",
    icon: <Building className="w-5 h-5" />,
  },
  {
    date: "31 décembre 2034",
    title: "Fin du dispositif",
    description: "Date limite pour bénéficier du Statut du Bailleur Privé",
    status: "upcoming",
    icon: <Calendar className="w-5 h-5" />,
  },
];

export const TimelineSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Suivi législatif
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Calendrier du dispositif
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez en temps réel l'avancement du Statut du Bailleur Privé, de sa conception à son entrée en vigueur
          </p>
        </div>

        {/* Timeline Desktop */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          {/* Ligne centrale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary/60 to-muted" />
          
          {timelineSteps.map((step, index) => (
            <div 
              key={index}
              className={`relative flex items-center mb-12 last:mb-0 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Contenu */}
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                <div 
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    step.status === "completed" 
                      ? "bg-card border border-primary/20 shadow-lg shadow-primary/5" 
                      : step.status === "current"
                      ? "bg-gold/10 border-2 border-gold shadow-lg shadow-gold/10"
                      : "bg-muted/50 border border-border"
                  }`}
                >
                  <span 
                    className={`text-sm font-semibold ${
                      step.status === "completed" 
                        ? "text-primary" 
                        : step.status === "current"
                        ? "text-gold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.date}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Point central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.status === "completed" 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                      : step.status === "current"
                      ? "bg-gold text-foreground shadow-lg shadow-gold/30 animate-pulse"
                      : "bg-muted text-muted-foreground border-2 border-border"
                  }`}
                >
                  {step.status === "completed" ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
              </div>

              {/* Espace de l'autre côté */}
              <div className="w-5/12" />
            </div>
          ))}
        </div>

        {/* Timeline Mobile */}
        <div className="lg:hidden relative max-w-lg mx-auto">
          {/* Ligne verticale */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-muted" />
          
          {timelineSteps.map((step, index) => (
            <div key={index} className="relative flex items-start mb-8 last:mb-0 pl-16">
              {/* Point */}
              <div className="absolute left-0 z-10">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.status === "completed" 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                      : step.status === "current"
                      ? "bg-gold text-foreground shadow-lg shadow-gold/30 animate-pulse"
                      : "bg-muted text-muted-foreground border-2 border-border"
                  }`}
                >
                  {step.status === "completed" ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
              </div>

              {/* Contenu */}
              <div 
                className={`flex-1 p-4 rounded-xl ${
                  step.status === "completed" 
                    ? "bg-card border border-primary/20 shadow-md" 
                    : step.status === "current"
                    ? "bg-gold/10 border-2 border-gold shadow-md"
                    : "bg-muted/50 border border-border"
                }`}
              >
                <span 
                  className={`text-xs font-semibold ${
                    step.status === "completed" 
                      ? "text-primary" 
                      : step.status === "current"
                      ? "text-gold"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.date}
                </span>
                <h3 className="text-base font-bold text-foreground mt-1 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Légende */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Étape validée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gold animate-pulse" />
            <span className="text-sm text-muted-foreground">En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-muted border border-border" />
            <span className="text-sm text-muted-foreground">À venir</span>
          </div>
        </div>
      </div>
    </section>
  );
};
