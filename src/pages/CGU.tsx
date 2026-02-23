import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CGU = () => {
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
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-3">Conditions Générales d'Utilisation</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-[800px]">
        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">1. Objet du site</h2>
            <p>Le présent site a pour objet de présenter le statut du bailleur privé (dispositif Jeanbrun) instauré par la loi n°2026-103 du 19 février 2026 (article 47), ainsi que de proposer :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>un outil de simulation indicative,</li>
              <li>des contenus pédagogiques,</li>
              <li>une demande d'étude personnalisée.</li>
            </ul>
            <p className="mt-2">L'utilisation du site implique l'acceptation pleine et entière des présentes Conditions Générales d'Utilisation.</p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">2. Positionnement professionnel</h2>
            <div className="space-y-2">
              <p>Polyvalence Développement est une structure spécialisée dans l'immobilier neuf et réhabilité à neuf, intervenant dans la commercialisation et l'accompagnement d'opérations d'investissement immobilier sur l'ensemble du territoire français.</p>
              <p>La société propose des solutions d'investissement patrimonial reposant exclusivement sur des actifs immobiliers, dans une logique de structuration et de détention à long terme.</p>
              <p>Polyvalence Développement exerce son activité dans le cadre de la réglementation applicable aux professionnels de l'immobilier (loi n°70-9 du 2 janvier 1970 dite « loi Hoguet »).</p>
              <p>La société n'exerce pas d'activité de conseil en gestion de patrimoine (CGP) au sens réglementaire du terme.</p>
              <p>Les informations diffusées sur le site ont un caractère pédagogique et informatif. Elles ne constituent ni un conseil fiscal personnalisé, ni une consultation juridique, ni une recommandation d'investissement individualisée.</p>
              <p>Toute décision d'investissement doit être prise après analyse complète de la situation personnelle de l'investisseur et, le cas échéant, consultation d'un professionnel compétent.</p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">3. Simulateur et estimations</h2>
            <p>Le simulateur proposé sur le site :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>repose sur des données déclaratives fournies par l'utilisateur,</li>
              <li>s'appuie sur l'état des textes connus à la date de consultation,</li>
              <li>ne tient pas compte de l'intégralité des paramètres fiscaux et patrimoniaux individuels,</li>
              <li>est fourni à titre indicatif et non contractuel.</li>
            </ul>
            <p className="mt-2">Les résultats affichés constituent des estimations théoriques.</p>
            <p className="mt-1">Ils peuvent évoluer en fonction :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>des décrets d'application,</li>
              <li>de la doctrine administrative (BOFiP),</li>
              <li>de modifications législatives ultérieures,</li>
              <li>de la situation fiscale réelle de l'utilisateur.</li>
            </ul>
            <p className="mt-2">Polyvalence Développement ne saurait être tenue responsable d'une décision d'investissement prise sur la seule base des résultats fournis par le simulateur.</p>
            <p className="mt-1">Une étude personnalisée demeure nécessaire avant toute décision.</p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">4. Clause spécifique – Investissement immobilier</h2>
            <p>L'investissement immobilier comporte des risques, notamment :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>risque de vacance locative,</li>
              <li>évolution du marché immobilier,</li>
              <li>variation des taux d'intérêt,</li>
              <li>modification des règles fiscales,</li>
              <li>évolution de la valeur du bien.</li>
            </ul>
            <p className="mt-2">Les performances fiscales ou patrimoniales présentées sur le site ne constituent pas une garantie.</p>
            <p className="mt-1">Les dispositifs fiscaux sont soumis à des conditions légales strictes (durée de détention, plafonds de loyers, plafonds de ressources, respect des engagements locatifs). Le non-respect de ces conditions peut entraîner la remise en cause des avantages fiscaux obtenus.</p>
            <p className="mt-2">L'investisseur demeure seul responsable :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>de ses choix patrimoniaux,</li>
              <li>de son niveau d'endettement,</li>
              <li>de l'adéquation de l'investissement à sa situation personnelle.</li>
            </ul>
            <p className="mt-2">Polyvalence Développement intervient dans le cadre de la commercialisation de biens immobiliers et de l'accompagnement du projet immobilier, sans fournir de garantie de performance financière.</p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">5. Responsabilité</h2>
            <p>Polyvalence Développement s'efforce d'assurer l'exactitude des informations diffusées.</p>
            <p className="mt-1">Toutefois, la société ne pourra être tenue responsable en cas :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>d'erreur ou omission involontaire,</li>
              <li>d'interprétation erronée des textes,</li>
              <li>d'évolution ultérieure de la réglementation,</li>
              <li>de perte financière liée à une opération d'investissement.</li>
            </ul>
            <p className="mt-2">L'utilisateur reconnaît utiliser le site sous sa seule responsabilité.</p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">6. Accès au site</h2>
            <p>Le site est accessible gratuitement.</p>
            <p className="mt-1">L'éditeur ne garantit pas :</p>
            <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
              <li>une disponibilité permanente,</li>
              <li>l'absence d'interruption technique,</li>
              <li>l'absence d'erreurs.</li>
            </ul>
            <p className="mt-2">Le site peut être modifié, suspendu ou interrompu à tout moment sans préavis.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">7. Propriété intellectuelle</h2>
            <p>L'ensemble des contenus du site (textes, éléments graphiques, simulateur, structure, design) est protégé par le droit de la propriété intellectuelle.</p>
            <p className="mt-1">Toute reproduction ou exploitation sans autorisation préalable est interdite.</p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">8. Données personnelles</h2>
            <p>
              Les données collectées via les formulaires sont traitées conformément à la{" "}
              <Link to="/politique-de-confidentialite" className="text-primary underline underline-offset-2">
                Politique de confidentialité et cookies
              </Link>{" "}
              accessible sur le site.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">9. Modification des CGU</h2>
            <p>Polyvalence Développement se réserve le droit de modifier les présentes CGU à tout moment.</p>
            <p className="mt-1">La version applicable est celle en vigueur à la date de consultation.</p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold text-primary-dark mb-3">10. Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit français.</p>
            <p className="mt-1">Tout litige relatif à l'utilisation du site relève de la compétence des juridictions françaises.</p>
          </section>

        </div>
      </main>
    </div>
  );
};

export default CGU;
