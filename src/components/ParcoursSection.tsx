export const ParcoursSection = () => {
  const steps = [
    {
      num: "01",
      title: "Étude patrimoniale",
      text: "Analyse de votre TMI, capacité d'emprunt et stratégie adaptée.",
    },
    {
      num: "02",
      title: "Sélection du bien",
      text: "Choix d'un programme éligible et validation des plafonds.",
    },
    {
      num: "03",
      title: "Acquisition & financement",
      text: "Signature, montage du crédit et paramétrage fiscal.",
    },
    {
      num: "04",
      title: "Mise en location",
      text: "Location conforme aux règles et suivi fiscal annuel.",
    },
  ];

  return (
    <section className="w-full bg-secondary py-14 md:py-18">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "#123768" }}>
          Les 4 étapes pour investir en Jeanbrun
        </h2>
        <p className="text-center text-muted-foreground text-sm md:text-base mb-10 max-w-xl mx-auto">
          Un parcours simple et encadré, de l'étude à la mise en location.
        </p>

        {/* Desktop : horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative mb-6">
          {/* Ligne continue */}
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground mb-4 shadow-sm"
                style={{ backgroundColor: "#123768" }}
              >
                {step.num}
              </div>
              <h3 className="text-sm font-bold mb-1" style={{ color: "#123768" }}>
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile : vertical */}
        <div className="md:hidden relative pl-10 space-y-6 mb-6">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-start gap-4">
              <div
                className="absolute left-[-22px] w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm shrink-0"
                style={{ backgroundColor: "#123768" }}
              >
                {step.num}
              </div>
              <div>
                <h3 className="text-sm font-bold mb-0.5" style={{ color: "#123768" }}>
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Durée d'engagement : 9 ans minimum.
        </p>
      </div>
    </section>
  );
};
