import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";

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
      <DialogContent className="sm:max-w-md" style={{ borderRadius: "20px" }}>
        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <CheckCircle className="w-14 h-14" style={{ color: "#046C91" }} />
            <h3 className="text-xl font-bold" style={{ color: "#123768" }}>Demande envoyée !</h3>
            <p className="text-sm text-gray-500">
              Un conseiller vous recontactera sous 24h pour une étude personnalisée.
            </p>
            <button
              onClick={() => handleClose(false)}
              className="mt-2 px-6 py-2 rounded-xl text-white text-sm font-semibold"
              style={{ backgroundColor: "#046C91" }}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold" style={{ color: "#123768" }}>
                Recevoir une étude personnalisée
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Renseignez vos coordonnées, un conseiller vous contactera rapidement.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label style={{ color: "#0B1220" }}>Prénom</Label>
                <Input
                  required
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  className="border-[#9AC0D0]/50 focus-visible:ring-[#046C91]"
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-1.5">
                <Label style={{ color: "#0B1220" }}>Email</Label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-[#9AC0D0]/50 focus-visible:ring-[#046C91]"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label style={{ color: "#0B1220" }}>Téléphone</Label>
                <Input
                  required
                  type="tel"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className="border-[#9AC0D0]/50 focus-visible:ring-[#046C91]"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div className="space-y-1.5">
                <Label style={{ color: "#0B1220" }}>Ville du projet</Label>
                <Input
                  value={form.ville}
                  onChange={(e) => setForm({ ...form, ville: e.target.value })}
                  className="border-[#9AC0D0]/50 focus-visible:ring-[#046C91]"
                  placeholder="Ex : Lyon, Paris, Bordeaux…"
                />
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  className="mt-0.5 border-[#9AC0D0] data-[state=checked]:bg-[#046C91] data-[state=checked]:border-[#046C91]"
                />
                <label htmlFor="consent" className="text-xs text-gray-500 leading-tight cursor-pointer">
                  J'accepte d'être recontacté(e) par un conseiller dans le cadre de cette demande.
                </label>
              </div>
              <button
                type="submit"
                disabled={!consent}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-40"
                style={{ backgroundColor: "#046C91" }}
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
