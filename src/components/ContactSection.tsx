import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    acceptConditions: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptConditions) {
      toast({
        title: "Action requise",
        description: "Merci de valider les conditions pour poursuivre.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "C'est parti !",
      description: "Consultez votre boîte mail dans quelques instants."
    });
    
    setFormData({
      nom: "",
      email: "",
      telephone: "",
      acceptConditions: false
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Documentation complète
            </h2>
            <p className="text-muted-foreground text-lg">
              Recevez par email notre synthèse détaillée sur le nouveau cadre fiscal bailleur.
            </p>
          </div>

          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom (facultatif)</Label>
                  <Input
                    id="nom"
                    placeholder="Comment vous appeler ?"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vous@exemple.fr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="Pour un rappel éventuel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="conditions"
                    checked={formData.acceptConditions}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, acceptConditions: checked as boolean })
                    }
                  />
                  <Label htmlFor="conditions" className="text-sm text-muted-foreground leading-relaxed">
                    J'accepte d'être recontacté(e) pour recevoir des informations complémentaires sur ce dispositif.
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Obtenir le document
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Données protégées, aucune revente</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
