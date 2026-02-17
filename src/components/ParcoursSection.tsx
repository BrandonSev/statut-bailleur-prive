import { useState } from "react";
import { Mail } from "lucide-react";
import { ContactModal } from "./ContactModal";

export const ParcoursSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const steps = [
    { num: "01", title: "Étude patrimoniale", text: "Analyse de votre TMI, capacité d'emprunt et stratégie adaptée." },
    { num: "02", title: "Sélection du bien", text: "Choix d'un programme éligible et validation des plafonds." },
    { num: "03", title: "Acquisition & financement", text: "Signature, montage du crédit et paramétrage fiscal." },
    { num: "04", title: "Mise en location", text: "Location conforme aux règles et suivi fiscal annuel." },
  ];

  return (
    <section id="parcours" className="w-full bg-secondary py-14 md:py-18">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-success-light text-success text-sm font-bold">01</span>
          <span className="text-sm font-medium text-muted-foreground">Étape suivante : votre parcours d'investissement</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-primary-dark">
          Les 4 étapes pour investir en Jeanbrun
        </h2>
        <p className="text-center text-muted-foreground text-sm md:text-base mb-10 max-w-xl mx-auto">
          Un parcours simple et encadré, de l'étude à la mise en location.
        </p>

        {/* Desktop : horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative mb-6">
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border" />
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground mb-4 shadow-sm bg-primary-dark">
                {step.num}
              </div>
              <h3 className="text-sm font-bold mb-1 text-primary-dark">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Mobile : vertical */}
        <div className="md:hidden space-y-5 mb-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm shrink-0 bg-primary-dark">
                {step.num}
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-bold mb-0.5 text-primary-dark">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">Durée d'engagement : 9 ans minimum.</p>

        <div className="flex flex-col items-center gap-3 mt-8">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Mail className="w-4 h-4" />
            Être accompagné pour investir
          </button>
          <p className="text-xs text-muted-foreground">Sans engagement • Réponse sous 24h</p>
        </div>
      </div>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
