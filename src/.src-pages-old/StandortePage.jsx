import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { locations } from '@/data/locations';
import CantonFlag from '@/components/CantonFlag';
import { ArrowRight, Map } from 'lucide-react';

const LocationCard = ({ location, delay }) => {
  if (!location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.05 }}
      className="h-full"
    >
      <Link href={`/${location.slug}`} className="group block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
        <div className="relative">
          <img src={location.image} className="w-full h-48 object-cover" alt={`Bild von ${location.name}`} />
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md">
            <CantonFlag canton={location.canton} className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">Professionelle Umzugs-, Reinigungs- und Malerfirmen in Ihrer Nähe.</p>
          <div className="flex items-center text-green-600 font-semibold mt-auto">
            <span>Mehr erfahren</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const StandortePage = () => {
  const canonicalPath = '/standorte';

  const metaTitle = "Standorte | Umzugsfirmen in Ihrer Nähe | Online-Offerten.ch";
  const metaDescription = "Finden Sie lokale und geprüfte Umzugsfirmen und Reinigungsunternehmen in Zürich, Bern, Basel, Genf und der ganzen Schweiz. Holen Sie jetzt Ihre offerten ein.";
  const metaKeywords = "standorte, umzugsfirma zürich, umzugsfirma bern, umzugsfirma basel, umzugsfirma genf, reinigungsfirma schweiz, malerfirma schweiz, lokale firmen, umzugsunternehmen nach kanton";

  const pageTitle = "Unsere Standorte in der Schweiz";
  const pageSubtitle = "Von Zürich bis Genf, von Basel bis Lugano – auf unserer Plattform finden Sie verlässliche Umzugsfirmen aus Ihrer Region. Holen Sie jetzt kostenlose Offerten ein!";

  const seoContent = {
    title: "Standorte in der gesamten Schweiz",
    p1: "Online-Offerten.ch ist Ihre zentrale Anlaufstelle für professionelle Dienstleistungen in der gesamten Schweiz. Wir verbinden Sie mit geprüften Umzugs-, Reinigungs- und Malerfirmen in allen wichtigen Städten und Regionen der Schweiz. Egal ob Sie in Zürich, Bern, Basel, Luzern oder einer anderen Stadt wohnen – wir haben den richtigen Partner für Sie.",
    p2: "Unsere Plattform deckt alle grossen Städte und Regionen der Schweiz ab. Von den urbanen Zentren wie Zürich, Genf und Basel bis hin zu kleineren Städten wie Thun, Biel oder Freiburg – überall finden Sie qualifizierte Partnerfirmen, die Ihnen bei Ihrem Umzug, Ihrer Reinigung oder Ihren Malerarbeiten helfen können.",
    p3: "Jeder Standort bietet eine Auswahl an lokalen Experten, die die regionalen Besonderheiten und Anforderungen kennen. Unsere Partnerfirmen sind nicht nur fachlich qualifiziert, sondern auch mit den örtlichen Gegebenheiten vertraut. Das garantiert Ihnen eine reibungslose und effiziente Durchführung Ihrer Projekte.",
    p4: "Die Vorteile unserer Standortübersicht sind vielfältig: Sie sparen Zeit bei der Suche nach passenden Dienstleistern, erhalten transparente Preise durch unseren Offertenvergleich und können sich auf geprüfte Qualität verlassen. Alle unsere Partnerfirmen werden sorgfältig ausgewählt und regelmässig überprüft, um höchste Standards zu gewährleisten.",
    p5: "Wählen Sie einfach Ihren Standort aus der Übersicht unten aus, um mehr über die verfügbaren Dienstleistungen in Ihrer Region zu erfahren. Sie erhalten detaillierte Informationen zu den lokalen Partnern und können direkt kostenlose Offerten anfordern. So finden Sie schnell und einfach den perfekten Dienstleister für Ihre Bedürfnisse."
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        canonicalUrl={`https://online-offerten.ch${canonicalPath}`}
        schemaMarkup={locations && locations.length > 0 ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": pageTitle,
          "description": metaDescription,
          "url": `https://online-offerten.ch${canonicalPath}`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": locations.map((location, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": location.name,
              "url": `https://online-offerten.ch/${location.slug}`
            }))
          }
        } : {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": pageTitle,
          "description": metaDescription,
          "url": `https://online-offerten.ch${canonicalPath}`
        }}
      />
      <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 py-12 md:py-16">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <Map className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-shadow">
              {pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {pageSubtitle}
            </p>
          </motion.header>

          {/* SEO Content Section */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {seoContent.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {seoContent.p1}
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {seoContent.p2}
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {seoContent.p3}
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {seoContent.p4}
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {seoContent.p5}
            </p>
          </motion.article>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {locations.map((location, index) => (
              <LocationCard key={location.slug} location={location} delay={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StandortePage;
