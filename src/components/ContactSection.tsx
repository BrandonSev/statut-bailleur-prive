import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  CheckCircle,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
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
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      acceptConditions: false
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="pb-4">
                <Badge className="w-fit mb-3 bg-gold-light text-foreground border-gold">
                  <Download className="w-3 h-3 mr-1" />
                  Guide gratuit
                </Badge>
                <CardTitle className="text-2xl md:text-3xl text-foreground">
                  Recevez votre guide complet sur le Dispositif Jeanbrun
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Remplissez ce formulaire pour recevoir notre guide détaillé et être recontacté par un conseiller expert.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        placeholder="Votre prénom"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        placeholder="Votre nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        required
                      />
                    </div>
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
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      placeholder="06 00 00 00 00"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      required
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
                      J'accepte d'être recontacté par Polyvalence Immobilier et je reconnais avoir pris connaissance de la politique de confidentialité.
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Recevoir le guide gratuit
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

            {/* Contact info */}
            <div className="space-y-8">
              {/* Guide preview */}
              <Card className="bg-trust-light border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-4">
                    Dans votre guide, vous découvrirez :
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Le fonctionnement détaillé du Statut du Bailleur Privé",
                      "Les conditions d'éligibilité et zones concernées",
                      "Le calcul précis de votre avantage fiscal",
                      "Les pièges à éviter et nos conseils d'experts",
                      "Des exemples concrets d'investissements réussis"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Agencies */}
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-4">
                  Nos agences
                </h3>
                <div className="space-y-4">
                  <Card className="border-border">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Chartres (28)</p>
                          <p className="text-sm text-muted-foreground">Eure-et-Loir</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Metz (57)</p>
                          <p className="text-sm text-muted-foreground">Moselle</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact direct */}
              <div className="space-y-4">
                <a 
                  href="tel:0800000000" 
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                    <Phone className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold">Appel gratuit</p>
                    <p className="text-primary font-bold">0 800 000 000</p>
                  </div>
                </a>
                <a 
                  href="mailto:contact@polyvalence-immobilier.fr" 
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-trust-light flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Par email</p>
                    <p className="text-muted-foreground">contact@polyvalence-immobilier.fr</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
