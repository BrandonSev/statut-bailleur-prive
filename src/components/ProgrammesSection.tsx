import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Euro, ArrowRight } from "lucide-react";

const programmes = [
  {
    id: 1,
    ville: "Chartres",
    region: "Eure-et-Loir",
    nom: "Résidence Les Jardins de l'Eure",
    prix: "À partir de 185 000 €",
    types: "T2, T3, T4",
    livraison: "2026",
    eligible: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    ville: "Metz",
    region: "Moselle",
    nom: "L'Écrin de la Seille",
    prix: "À partir de 165 000 €",
    types: "T1, T2, T3",
    livraison: "2025",
    eligible: true,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    ville: "Chartres",
    region: "Eure-et-Loir",
    nom: "Domaine Saint-Martin",
    prix: "À partir de 210 000 €",
    types: "T3, T4",
    livraison: "2026",
    eligible: true,
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop"
  }
];

export const ProgrammesSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="programmes" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-semibold mb-2">Nos programmes</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Programmes éligibles au Dispositif Jeanbrun
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez notre sélection de programmes neufs à Chartres et Metz, 
            tous éligibles au Statut du Bailleur Privé.
          </p>
        </div>

        {/* Programmes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {programmes.map((programme) => (
            <Card 
              key={programme.id} 
              className="overflow-hidden border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={programme.image} 
                  alt={programme.nom}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {programme.eligible && (
                  <Badge className="absolute top-3 left-3 bg-success text-success-foreground">
                    Éligible Jeanbrun
                  </Badge>
                )}
                <Badge variant="secondary" className="absolute top-3 right-3">
                  Livraison {programme.livraison}
                </Badge>
              </div>

              <CardContent className="p-5">
                {/* Location */}
                <div className="flex items-center gap-1 text-primary mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{programme.ville}</span>
                  <span className="text-muted-foreground text-sm">• {programme.region}</span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {programme.nom}
                </h3>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Home className="w-4 h-4" />
                    <span>{programme.types}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Euro className="w-4 h-4" />
                    <span>{programme.prix}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button variant="outline" className="w-full group/btn" onClick={scrollToContact}>
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Vous recherchez un programme spécifique ? Nous commercialisons des programmes neufs partout en France.
          </p>
          <Button size="lg" onClick={scrollToContact}>
            Découvrir tous nos programmes
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
