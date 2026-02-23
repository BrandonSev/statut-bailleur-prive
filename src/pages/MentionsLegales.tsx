import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="w-full py-6"
        style={{ background: "linear-gradient(135deg, #1346a8 0%, #1a6bb5 50%, #0ea5b0 100%)" }}
      >
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-3">Mentions légales</h1>
        </div>
      </header>

      {/* Contenu */}
      <main className="container mx-auto px-6 py-12 max-w-[800px]">
        <div className="prose prose-sm max-w-none space-y-8 text-foreground">

          {/* Éditeur du site */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Éditeur du site</h2>
            <p className="leading-relaxed text-sm text-muted-foreground">
              Le présent site est édité par :
            </p>
            <div className="text-sm text-muted-foreground leading-relaxed mt-2 space-y-1">
              <p className="font-semibold text-foreground">Polyvalence Développement</p>
              <p>SASU au capital de 15 000,00 €</p>
              <p>Immatriculée au RCS de Chartres sous le numéro 878 578 905</p>
              <p>N° TVA intracommunautaire : FR56878578905</p>
              <p>Siège social : 8 rue des Côtes, 28000 Chartres</p>
              <p>
                Adresse mail :{" "}
                <a href="mailto:info@polyvalence-immobilier.fr" className="text-primary underline underline-offset-2">
                  info@polyvalence-immobilier.fr
                </a>
              </p>
            </div>
          </section>

          {/* Responsable de la publication */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Responsable de la publication</h2>
            <p className="text-sm text-muted-foreground">Paul Baudinet</p>
          </section>

          {/* Activité réglementée */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Activité réglementée</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
              <p>
                Le titre professionnel d'agent immobilier est régi par la loi n°70-9 du 2 janvier 1970 dite « loi Hoguet » et son décret d'application du 20 juillet 1972.
              </p>
              <p>Carte professionnelle n° CPI28012019000043375</p>
              <p>Délivrée par la CCI d'Eure-et-Loir (France)</p>
              <p className="mt-3 font-semibold text-foreground">Assurance responsabilité civile professionnelle :</p>
              <p>ALLIANZ</p>
              <p>57 Rue du Grand Faubourg</p>
              <p>28000 Chartres</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Hébergement</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
              <p className="font-semibold text-foreground">OVHcloud</p>
              <p>SAS au capital de 10 174 560 €</p>
              <p>RCS Lille Métropole 424 761 419</p>
              <p>Siège social : 2 rue Kellermann, 59100 Roubaix, France</p>
            </div>
          </section>

          {/* Objet du site */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Objet du site</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Le présent site a pour objet de fournir des informations relatives au statut du bailleur privé (dispositif Jeanbrun) instauré par la loi n°2026-103 du 19 février 2026 (article 47), ainsi que de proposer des outils de simulation et des demandes d'étude personnalisée.
              </p>
              <p>Les informations publiées sont fournies à titre informatif et pédagogique.</p>
              <p>Elles ne constituent ni un conseil fiscal, ni un conseil juridique, ni une consultation personnalisée.</p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Responsabilité</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>Polyvalence Développement s'efforce d'assurer l'exactitude des informations diffusées sur le site.</p>
              <p>Toutefois, la société ne saurait être tenue responsable :</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>d'erreurs ou omissions,</li>
                <li>d'une mauvaise interprétation des informations,</li>
                <li>des conséquences résultant de l'utilisation du site.</li>
              </ul>
              <p>Les simulations proposées sont indicatives et non contractuelles.</p>
              <p>
                Les modalités d'application définitives du dispositif peuvent faire l'objet de précisions ultérieures via la doctrine administrative (BOFiP).
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Propriété intellectuelle</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                L'ensemble des éléments présents sur le site (textes, visuels, logos, simulateur, structure) est protégé par le droit de la propriété intellectuelle.
              </p>
              <p>Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable écrite est interdite.</p>
            </div>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Données personnelles</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Les données collectées via les formulaires du site sont destinées exclusivement à Polyvalence Développement afin de répondre aux demandes d'étude personnalisée.
              </p>
              <p>Elles ne sont ni vendues ni cédées à des tiers.</p>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), toute personne dispose d'un droit :
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>d'accès,</li>
                <li>de rectification,</li>
                <li>d'effacement,</li>
                <li>de limitation,</li>
                <li>d'opposition,</li>
                <li>et de portabilité de ses données.</li>
              </ul>
              <p>
                Toute demande peut être adressée au Délégué à la protection des données (DPO) :{" "}
                <a href="mailto:dpo@polyvalence-immobilier.fr" className="text-primary underline underline-offset-2">
                  dpo@polyvalence-immobilier.fr
                </a>
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">Droit applicable</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
              <p>Le présent site est soumis au droit français.</p>
              <p>Tout litige relève de la compétence des juridictions françaises.</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default MentionsLegales;
