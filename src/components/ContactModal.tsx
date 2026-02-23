import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { CityAutocomplete } from "./CityAutocomplete";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({ civilite: "", nom: "", prenom: "", email: "", telephone: "", ville: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch("https://www.polyvalence-immobilier.fr/api/jeanbrun/documentation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 9mryHcd5j8vLBfMo4H3Ab9kPLX6l85Eu2dkXviesymGY9wMLURpOWvv3PLTMlG3T",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(`Erreur ${response.status}`);

      setSubmitted(true);
    } catch (err) {
      setApiError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setSubmitted(false);
      setConsent(false);
      setApiError(null);
      setIsLoading(false);
      setForm({ civilite: "", nom: "", prenom: "", email: "", telephone: "", ville: "" });
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-[20px]">
        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <CheckCircle className="w-14 h-14 text-primary" />
            <h3 className="text-xl font-bold text-primary-dark">Demande envoyée !</h3>
            <p className="text-sm text-muted-foreground">
              Un conseiller vous recontactera sous 24h pour une étude personnalisée.
            </p>
            <button
              onClick={() => handleClose(false)}
              className="mt-2 px-6 py-2 rounded-xl text-primary-foreground text-sm font-semibold bg-primary hover:bg-primary/85 transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-primary-dark">
                Recevez votre analyse fiscale personnalisée
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Complétez vos coordonnées pour recevoir une analyse personnalisée intégrant votre fiscalité, votre
                situation et les projections détaillées.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label className="text-foreground">Civilité</Label>
                <div className="flex gap-3">
                  {["M.", "Mme"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, civilite: c })}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        form.civilite === c
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground hover:bg-accent/20"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-foreground">Nom</Label>
                  <Input
                    required
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="border-border focus-visible:ring-ring"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">Prénom</Label>
                  <Input
                    required
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    className="border-border focus-visible:ring-ring"
                    placeholder="Votre prénom"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Email</Label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-border focus-visible:ring-ring"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Téléphone</Label>
                <Input
                  required
                  type="tel"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className="border-border focus-visible:ring-ring"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">Votre ville</Label>
                <CityAutocomplete
                  value={form.ville}
                  onChange={(city, _cp, insee) => {
                    setForm({ ...form, ville: city + " " + _cp });
                  }}
                  placeholder="Rechercher une ville…"
                  className={`h-9 text-sm`}
                />
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="consent" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  J'accepte que mes données soient utilisées afin d'être recontacté(e) dans le cadre de ma demande.{" "}
                  <a href="/politique-de-confidentialite" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Politique de confidentialité</a>
                </label>
              </div>
              <ul>
                <li>✔ Simulation complète</li>
                <li>✔ Projection 9 ans</li>
                <li>✔ Impact fiscal détaillé</li>
                <li>✔ Adaptée à votre TMI</li>
              </ul>
              {apiError && <p className="text-xs text-destructive text-center">{apiError}</p>}
              <button
                type="submit"
                disabled={!consent || isLoading}
                className="w-full p-4 rounded-lg font-semibold text-white text-sm shadow-md transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: "linear-gradient(135deg, #1a6bb5 0%, #0ea5b0 100%)" }}
              >
                {isLoading ? "Envoi en cours…" : "Obtenir mon étude personnalisée"}
              </button>
              <p className="text-xs text-gray-600 leading-relaxed">Sans engagement – réponse sous 24h</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
