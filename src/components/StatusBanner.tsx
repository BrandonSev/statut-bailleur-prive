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
        className="fixed top-0 left-0 right-0 z-[60] bg-secondary border-b border-border py-1.5 px-4"
      >
        <div className="container mx-auto">
          <p className="text-center text-xs font-medium text-muted-foreground">
            [15:50] Paul Baudinet - Polyvalence Immobilier Statut du bailleur privé – Plan de relance logement 2026 •
            Publication officielle au JO de l'article 47, le 20/02/2026 • Décrets d'application en attente • Dernière
            mise à jour : 20 Février 2026
          </p>
        </div>
      </div>
      <style>{`:root { --banner-height: ${height}px; }`}</style>
    </>
  );
};
