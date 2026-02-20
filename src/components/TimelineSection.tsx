import { FileText, Gavel, Check, Clock } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Présentation du dispositif",
    text: "Le dispositif Jeanbrun a été présenté dans le cadre du projet de réforme du logement et de l'investissement locatif.",
    done: true,
  },
  {
    icon: <Gavel className="w-5 h-5" />,
    title: "Examen parlementaire",
    text: "Le texte a été étudié et débattu dans le cadre du processus législatif.",
    done: true,
  },
  {
    icon: <Check className="w-5 h-5" />,
    title: "Vote",
    text: "Le dispositif a fait l'objet d'un vote dans le cadre de l'adoption du texte dans le PLF 2026",
    done: true,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Promulgation & décrets d'application",
    text: "L'entrée en vigueur définitive est conditionnée à la publication des décrets d'application.",
    done: false,
  },
];

export const TimelineSection = () => {
  return (
    <section id="timeline" className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center mb-10">
          Avancement législatif du dispositif Jeanbrun
        </h2>

        {/* Desktop horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative mb-8">
          {/* Connecting line */}
          <div className="absolute top-5 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  step.done
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {step.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-tight max-w-[180px]">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-5 mb-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  step.done
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {step.icon}
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border border-border rounded-lg px-5 py-4 bg-background">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Les informations présentées sont fournies à titre indicatif. L'application définitive du dispositif dépendra
            des textes officiels publiés au Journal Officiel.
          </p>
        </div>
      </div>
    </section>
  );
};
