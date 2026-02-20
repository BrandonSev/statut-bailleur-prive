import { useRef, useEffect, useState } from "react";

export const StatusBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(32);

  useEffect(() => {
    const update = () => {
      if (bannerRef.current) setHeight(bannerRef.current.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <div
        ref={bannerRef}
        className="inline-flex items-center gap-2 rounded-full bg-[#2c968d]/10 px-4 py-2 text-sm font-medium text-[#2c968d] fixed top-0 left-0 right-0 z-[60]0"
      >
        <div className="container mx-auto">
          <p className="text-center text-xs font-medium text-muted-foreground">
            Statut du bailleur privé – Plan de relance logement 2026 • Publication officielle au JO de l'article 47, le
            20/02/2026 • Décrets d'application en attente • Dernière mise à jour : 20 Février 2026
          </p>
        </div>
      </div>
      <style>{`:root { --banner-height: ${height}px; }`}</style>
    </>
  );
};
