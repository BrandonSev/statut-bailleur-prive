import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Shield, Clock, Lock } from "lucide-react";
import { CityAutocomplete } from "./CityAutocomplete";

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [form, setForm] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    ville: "",
    code_postal: "",
  });

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

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? `Erreur ${response.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setConsent(false);
    setApiError(null);
    setForm({ civilite: "", nom: "", prenom: "", email: "", telephone: "", ville: "", code_postal: "" });
  };

  return (
    <section id="contact" className="w-full bg-trust-light py-16 md:py-20">
      <div className="max-w-[900px] mx-auto px-6">
        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <CheckCircle className="w-14 h-14 text-primary" />
            <h3 className="text-xl font-bold text-primary-dark">Demande envoyée !</h3>
            <p className="text-sm text-muted-foreground">
              Un conseiller vous recontactera sous 24h pour une étude personnalisée.
            </p>
            <button
              onClick={handleReset}
              className="mt-2 px-6 py-2 rounded-xl text-primary-foreground text-sm font-semibold bg-primary hover:bg-primary/90 transition-colors"
            >
              Nouvelle demande
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary-dark">
                Recevez votre étude personnalisée
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Analyse gratuite et sans engagement de votre situation patrimoniale.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto space-y-4">
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
                  onChange={(city, cp) => setForm({ ...form, ville: city, code_postal: cp })}
                  placeholder="Rechercher une ville…"
                  className="h-9 text-sm"
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
                  J’accepte que mes données soient utilisées afin d’être recontacté(e) dans le cadre de ma demande.
                </label>
              </div>

              {apiError && <p className="text-xs text-destructive text-center">{apiError}</p>}

              <button
                type="submit"
                disabled={!consent || isLoading}
                className="w-full py-3 rounded-xl text-primary-foreground font-semibold text-sm transition-opacity disabled:opacity-40 bg-primary hover:bg-primary/85"
              >
                {isLoading ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Données strictement confidentielles
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Aucune revente de données
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Réponse sous 24h ouvrées
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
