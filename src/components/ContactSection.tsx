import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  CheckCircle,
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
        title: "Erreur",
        description: "Veuillez accepter les conditions pour continuer.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Demande envoyée !",
      description: "Vous recevrez votre guide par email dans quelques instants."
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
              Recevez notre guide Jeanbrun
            </h2>
            <p className="text-muted-foreground text-lg">
              Documentation gratuite sur le dispositif d'amortissement Jeanbrun, envoyée par email.
            </p>
          </div>

          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom (optionnel)</Label>
                  <Input
                    id="nom"
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
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
                    placeholder="06 00 00 00 00"
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
                    J'autorise un conseiller à me contacter pour m'envoyer de la documentation ou me conseiller gratuitement.
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Recevoir
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Vos données sont sécurisées et confidentielles</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
