import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type ConsentState = "pending" | "accepted" | "refused" | "custom";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
}

const COOKIE_KEY = "cookie_consent";

const getStoredConsent = (): ConsentState | null => {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state ?? null;
    }
  } catch {}
  return null;
};

const storeConsent = (state: ConsentState, preferences: CookiePreferences) => {
  localStorage.setItem(COOKIE_KEY, JSON.stringify({ state, preferences, date: new Date().toISOString() }));
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) setVisible(true);
  }, []);

  const acceptAll = () => {
    const prefs = { necessary: true, analytics: true, advertising: true };
    storeConsent("accepted", prefs);
    setVisible(false);
  };

  const refuseAll = () => {
    const prefs = { necessary: true, analytics: false, advertising: false };
    storeConsent("refused", prefs);
    setVisible(false);
  };

  const saveCustom = () => {
    storeConsent("custom", preferences);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card shadow-2xl p-5 md:p-6">
        <h3 className="text-base font-semibold text-foreground mb-2">🍪 Gestion des cookies</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ce site utilise des cookies pour améliorer votre expérience, mesurer l'audience et personnaliser les contenus publicitaires.
          Vous pouvez accepter, refuser ou paramétrer vos préférences.{" "}
          <Link to="/politique-de-confidentialite" className="text-primary underline hover:text-primary/80">
            En savoir plus
          </Link>
        </p>

        {showDetails && (
          <div className="mb-4 space-y-3 rounded-lg border border-border bg-muted/50 p-4">
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked disabled className="h-4 w-4 accent-primary" />
              <span>
                <strong className="text-foreground">Cookies nécessaires</strong>
                <span className="text-muted-foreground"> — Indispensables au fonctionnement du site</span>
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                className="h-4 w-4 accent-primary"
              />
              <span>
                <strong className="text-foreground">Cookies analytiques</strong>
                <span className="text-muted-foreground"> — Mesure d'audience (Google Analytics)</span>
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.advertising}
                onChange={(e) => setPreferences((p) => ({ ...p, advertising: e.target.checked }))}
                className="h-4 w-4 accent-primary"
              />
              <span>
                <strong className="text-foreground">Cookies publicitaires</strong>
                <span className="text-muted-foreground"> — Google Ads, Meta Pixel, remarketing</span>
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          {!showDetails ? (
            <>
              <Button onClick={acceptAll} size="sm" className="flex-1">
                Tout accepter
              </Button>
              <Button onClick={refuseAll} variant="outline" size="sm" className="flex-1">
                Tout refuser
              </Button>
              <Button onClick={() => setShowDetails(true)} variant="ghost" size="sm" className="flex-1">
                Paramétrer
              </Button>
            </>
          ) : (
            <>
              <Button onClick={saveCustom} size="sm" className="flex-1">
                Enregistrer mes choix
              </Button>
              <Button onClick={refuseAll} variant="outline" size="sm" className="flex-1">
                Tout refuser
              </Button>
              <Button onClick={acceptAll} variant="ghost" size="sm" className="flex-1">
                Tout accepter
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
