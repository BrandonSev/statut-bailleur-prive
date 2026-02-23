import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-3">Politique de confidentialité et cookies</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-[800px]">
        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">1. Responsable du traitement</h2>
            <p>Les données personnelles collectées sur le présent site sont traitées par :</p>
            <div className="mt-2 space-y-1">
              <p className="font-semibold text-foreground">Polyvalence Développement</p>
              <p>SASU au capital de 15 000 €</p>
              <p>RCS Chartres 878 578 905</p>
              <p>Siège social : 8 rue des Côtes, 28000 Chartres</p>
              <p>Email : <a href="mailto:info@polyvalence-immobilier.fr" className="text-primary underline underline-offset-2">info@polyvalence-immobilier.fr</a></p>
              <p>Responsable du traitement : Paul Baudinet</p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">2. Données collectées</h2>
            <p>Dans le cadre des formulaires présents sur le site, peuvent être collectées les données suivantes :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Ville ou localisation du projet</li>
              <li>Informations relatives au projet immobilier (si renseignées)</li>
            </ul>
            <p className="mt-2">Ces données sont strictement nécessaires pour répondre aux demandes d'étude personnalisée.</p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">3. Finalité du traitement</h2>
            <p>Les données sont collectées afin de :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>Répondre aux demandes d'étude personnalisée</li>
              <li>Contacter l'utilisateur dans le cadre de son projet immobilier</li>
              <li>Fournir des informations relatives au statut du bailleur privé</li>
              <li>Améliorer les services proposés</li>
            </ul>
            <p className="mt-2">Les données ne sont pas utilisées à des fins de revente ou de cession à des tiers.</p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">4. Base légale du traitement</h2>
            <p>Le traitement repose sur :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>Le consentement explicite de l'utilisateur (via la case à cocher du formulaire)</li>
              <li>L'intérêt légitime de la société à répondre à une demande volontaire de contact</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">5. Durée de conservation</h2>
            <p>Les données sont conservées :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>Pendant une durée maximale de 3 ans à compter du dernier contact</li>
              <li>Ou jusqu'à demande de suppression par l'utilisateur</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">6. Destinataires des données</h2>
            <p>Les données sont exclusivement destinées à Polyvalence Développement.</p>
            <p className="mt-1">Elles peuvent être traitées par des prestataires techniques (hébergeur, outils de gestion CRM) dans le strict cadre de leur mission.</p>
            <p className="mt-1">Aucune donnée n'est vendue ni transmise à des tiers à des fins commerciales.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">7. Droits des utilisateurs</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit d'effacement</li>
              <li>Droit de limitation du traitement</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité</li>
            </ul>
            <p className="mt-2">
              Vous pouvez exercer ces droits en adressant votre demande à :{" "}
              <a href="mailto:dpo@polyvalence-immobilier.fr" className="text-primary underline underline-offset-2">dpo@polyvalence-immobilier.fr</a>
            </p>
            <p className="mt-1">Un délégué à la protection des données est désigné au sein de la société.</p>
            <p className="mt-1">
              En cas de litige, vous disposez du droit d'introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">www.cnil.fr</a>).
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">8. Cookies</h2>
            <p>Le site peut utiliser des cookies :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>Cookies techniques nécessaires au fonctionnement</li>
              <li>Cookies de mesure d'audience</li>
            </ul>
            <p className="mt-2">L'utilisateur peut accepter, refuser ou paramétrer les cookies via le bandeau prévu à cet effet.</p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">9. Sécurité des données</h2>
            <p>Polyvalence Développement met en œuvre des mesures techniques et organisationnelles appropriées afin d'assurer la sécurité et la confidentialité des données personnelles.</p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">10. Cookies et outils de mesure</h2>
            <p>Le site utilise différents types de cookies et traceurs.</p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-2">10.1 Cookies strictement nécessaires</h3>
            <p>Ces cookies sont indispensables au fonctionnement du site (sécurité, gestion du formulaire, mémorisation des préférences).</p>
            <p className="mt-1">Ils ne nécessitent pas de consentement préalable.</p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-2">10.2 Cookies de mesure d'audience</h3>
            <p>Le site peut utiliser :</p>
            <ul className="list-disc list-inside pl-2 mt-1"><li>Google Analytics</li></ul>
            <p className="mt-1">Ces outils permettent d'analyser la fréquentation du site et d'améliorer l'expérience utilisateur.</p>
            <p className="mt-1">Ces cookies sont déposés uniquement après acceptation explicite de l'utilisateur via le bandeau de gestion des cookies.</p>
            <p className="mt-1">Durée maximale de conservation : 13 mois.</p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-2">10.3 Cookies publicitaires et de suivi</h3>
            <p>Le site peut utiliser :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-1">
              <li>Google Ads</li>
              <li>Meta (Facebook / Instagram) Pixel</li>
              <li>Outils de remarketing ou de suivi des conversions</li>
            </ul>
            <p className="mt-2">Ces traceurs permettent :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-1">
              <li>De mesurer la performance des campagnes publicitaires</li>
              <li>D'analyser les conversions</li>
              <li>De proposer des publicités adaptées aux centres d'intérêt des utilisateurs</li>
            </ul>
            <p className="mt-2">Ces cookies ne sont activés qu'après consentement explicite.</p>
            <p className="mt-1">Durée maximale de conservation : 13 mois.</p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-2">10.4 Base légale</h3>
            <p>Le dépôt des cookies analytiques et publicitaires repose sur le consentement de l'utilisateur (article 6.1.a du RGPD).</p>
            <p className="mt-1">L'utilisateur peut refuser ou retirer son consentement à tout moment via le module de gestion des cookies, sans que cela n'affecte l'accès au site.</p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-2">10.5 Transferts hors Union européenne</h3>
            <p>Les plateformes publicitaires peuvent transférer certaines données vers des pays situés en dehors de l'Union européenne, conformément à leurs propres conditions d'utilisation et mécanismes de protection des données.</p>
          </section>

        </div>
      </main>
    </div>
  );
};

export default PolitiqueConfidentialite;
