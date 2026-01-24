import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Euro, ArrowRight, Building2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const programmes = [
  {
    id: 1,
    nom: "37 Saint-Thiébault",
    ville: "Metz",
    departement: "57",
    types: "T1 au T4",
    prix: "139 278",
    surface: "97",
    lots: 34,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    nom: "Arborescence",
    ville: "Angers",
    departement: "49",
    types: "T1 au T5",
    prix: "229 900",
    surface: "94",
    lots: 19,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    nom: "C'view",
    ville: "Chartres",
    departement: "28",
    types: "T3 au T4",
    prix: "248 000",
    surface: "89",
    lots: 7,
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    nom: "Domaine de Wendel",
    ville: "Hayange",
    departement: "57",
    types: "T1 au T4",
    prix: "189 200",
    surface: "98",
    lots: 13,
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    nom: "Héritage",
    ville: "Montigny-lès-Metz",
    departement: "57",
    types: "T3",
    prix: "338 307",
    surface: "72",
    lots: 6,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    nom: "Horizon Cathédrale",
    ville: "Chartres",
    departement: "28",
    types: "T3 au T4",
    prix: "285 000",
    surface: "91",
    lots: 10,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop"
  },
  {
    id: 7,
    nom: "L'Aparté",
    ville: "Metz",
    departement: "57",
    types: "T1 au T3",
    prix: "161 825",
    surface: "74",
    lots: 16,
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=600&h=400&fit=crop"
  },
  {
    id: 8,
    nom: "L'Écrin",
    ville: "Chartres",
    departement: "28",
    types: "T2 au T5",
    prix: "155 900",
    surface: "99",
    lots: 23,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop"
  },
  {
    id: 9,
    nom: "Le Domaine des Rives",
    ville: "Chartres",
    departement: "28",
    types: "T4 (Maisons)",
    prix: "323 000",
    surface: "74",
    lots: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop"
  },
  {
    id: 10,
    nom: "Le Domaine Maceria",
    ville: "Maizières-lès-Metz",
    departement: "57",
    types: "T2 au T3",
    prix: "162 000",
    surface: "71",
    lots: 8,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"
  },
  {
    id: 11,
    nom: "Le Manoir de Jade",
    ville: "Rédange",
    departement: "57",
    types: "T1 au T4",
    prix: "140 800",
    surface: "81",
    lots: 10,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop"
  },
  {
    id: 12,
    nom: "Le Parvis des Lumières",
    ville: "Chartres",
    departement: "28",
    types: "T2 au T3",
    prix: "192 000",
    surface: "68",
    lots: 14,
    image: "https://images.unsplash.com/photo-1600573472591-ee6c563d7d54?w=600&h=400&fit=crop"
  },
  {
    id: 13,
    nom: "Les Hauts de Manom",
    ville: "Manom",
    departement: "57",
    types: "T1 au T4",
    prix: "145 000",
    surface: "93",
    lots: 19,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop"
  },
  {
    id: 14,
    nom: "Oxygene",
    ville: "Montigny-lès-Metz",
    departement: "57",
    types: "T2 au T5",
    prix: "195 000",
    surface: "95",
    lots: 29,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop"
  },
  {
    id: 15,
    nom: "Panorama Cathédrale",
    ville: "Champhol",
    departement: "28",
    types: "T1 au T4",
    prix: "139 900",
    surface: "94",
    lots: 14,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop"
  },
  {
    id: 16,
    nom: "Sérénie",
    ville: "Chartres",
    departement: "28",
    types: "T2 au T4",
    prix: "150 000",
    surface: "86",
    lots: 23,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop"
  },
  {
    id: 17,
    nom: "Villa Kléber",
    ville: "Le Chesnay",
    departement: "78",
    types: "T4 au T5",
    prix: "793 000",
    surface: "96",
    lots: 7,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop"
  },
  {
    id: 18,
    nom: "Villa Luxembourg",
    ville: "Villerupt",
    departement: "54",
    types: "T2 au T3",
    prix: "164 045",
    surface: "69",
    lots: 13,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=400&fit=crop"
  }
];

// Get unique departments for the stats
const uniqueDepartements = [...new Set(programmes.map(p => p.departement))];
const totalLots = programmes.reduce((acc, p) => acc + p.lots, 0);

export const ProgrammesSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="programmes" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-primary font-semibold mb-2">Nos programmes</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            {programmes.length} programmes éligibles au Dispositif Jeanbrun
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Découvrez notre sélection de programmes neufs partout en France, 
            tous éligibles au Statut du Bailleur Privé.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">{totalLots} lots disponibles</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">{uniqueDepartements.length} départements</span>
            </div>
          </div>
        </div>

        {/* Programmes carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full mb-10"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {programmes.map((programme) => (
              <CarouselItem key={programme.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="overflow-hidden border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group h-full">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={programme.image} 
                      alt={programme.nom}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-success text-success-foreground text-xs">
                      Éligible Jeanbrun
                    </Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                      {programme.lots} lots
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    {/* Location */}
                    <div className="flex items-center gap-1 text-primary mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="font-medium text-sm">{programme.ville}</span>
                      <span className="text-muted-foreground text-xs">({programme.departement})</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1">
                      {programme.nom}
                    </h3>

                    {/* Details */}
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        <span>{programme.types}</span>
                        <span className="mx-1">•</span>
                        <span>Jusqu'à {programme.surface}m²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Euro className="w-3 h-3" />
                        <span className="font-semibold text-foreground">À partir de {programme.prix} €</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full group/btn text-xs" onClick={scrollToContact}>
                      Demander des infos
                      <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Vous recherchez un programme spécifique ? Nous commercialisons des programmes neufs partout en France.
          </p>
          <Button size="lg" onClick={scrollToContact}>
            Être rappelé par un conseiller
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
