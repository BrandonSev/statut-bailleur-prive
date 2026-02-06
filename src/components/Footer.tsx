export const Footer = () => {
  return (
    <footer className="bg-trust-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <span className="font-medium">jeanbrun.immo</span>
          </div>
          
          <p className="text-white/60 text-sm text-center">
            © 2026 – Information sur le dispositif Jeanbrun / Relance Logement
          </p>

          <div className="text-white/60 text-sm">
            PLF 2026 – Article 12 octies
          </div>
        </div>
      </div>
    </footer>
  );
};
