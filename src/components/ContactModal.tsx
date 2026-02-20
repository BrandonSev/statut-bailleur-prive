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
  const [form, setForm] = useState({ prenom: "", email: "", telephone: "", ville: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  };

  const handleClose = (v: boolean) => {
    if (!v) {
      setSubmitted(false);
      setConsent(false);
      setForm({ prenom: "", email: "", telephone: "", ville: "" });
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
                Recevoir une étude personnalisée
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Renseignez vos coordonnées, un conseiller vous contactera rapidement.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
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
                <Label className="text-foreground">Ville du projet</Label>
                <Input
                  value={form.ville}
                  onChange={(e) => setForm({ ...form, ville: e.target.value })}
                  className="border-border focus-visible:ring-ring"
                  placeholder="Ex : Lyon, Paris, Bordeaux…"
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
                  J'accepte d'être recontacté(e) par un conseiller dans le cadre de cette demande.
                </label>
              </div>
              <button
                type="submit"
                disabled={!consent}
                className="w-full py-3 rounded-xl text-primary-foreground font-semibold text-sm transition-opacity disabled:opacity-40 bg-primary hover:bg-primary/85"
              >
                Envoyer ma demande
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
