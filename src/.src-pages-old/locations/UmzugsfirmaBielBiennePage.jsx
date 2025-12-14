import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import CantonFlag from '@/components/CantonFlag';
import LocationFAQ from '@/components/locations/LocationFAQ';
import { faqs } from '@/data/locationFaqs';
import LocationSidebar from '@/components/locations/LocationSidebar';

const UmzugsfirmaBielBiennePage = () => {
  const city = "Biel/Bienne";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Biel/Bienne | Experten für Ihren Umzug";
  const metaDescription = "Finden Sie die beste Umzugsfirma in Biel/Bienne. Profitieren Sie von zweisprachigen Teams und erhalten Sie kostenlose Offerten für Ihren Umzug.";
  const metaKeywords = "umzugsfirma biel, zügelfirma bienne, umzug biel/bienne, zweisprachiger umzug, umzugsunternehmen jura";
  const canonicalUrl = "https://online-offerten.ch/umzugsfirma-biel-bienne";

  const services = [
    "Professioneller Ein- und Auspackservice",
    "Möbel-Demontage und -Montage durch erfahrene Schreiner",
    "Spezialtransporte für Klaviere oder Kunstgegenstände",
    "Endreinigung mit Abnahmegarantie",
    "Fachgerechte Entsorgung und Räumung"
  ];

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": ["MovingCompany", "CleaningService"],
    "provider": {
      "@type": "Organization",
      "name": `Online-Offerten.ch - Umzugsfirmen in ${city}`
    },
    "areaServed": {
      "@type": "City",
      "name": "Biel/Bienne"
    },
    "name": metaTitle,
    "description": metaDescription,
    "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
            "@type": "Question",
            "name": (item.question.de || item.question).replace('{city}', city),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.map(ans => typeof ans === 'string' ? ans : (ans.de || ans)).join(' ').replace(/{city}/g, city)
            }
        }))
    }
  };

  return (
    <>
      
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 py-12 md:py-16">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          
          <motion.header 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <div className="inline-block p-3 bg-white rounded-full shadow-xl mb-6">
              <CantonFlag canton={locationData.canton} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 text-shadow-md">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Biel/Bienne</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Ihr Partner für einen reibungslosen Umzug in der grössten zweisprachigen Stadt der Schweiz.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-10"
            >
              <article>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Willkommen in Biel/Bienne – Umziehen leicht gemacht</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Ein Umzug in der Uhrenmetropole Biel/Bienne, wo deutsche und französische Kultur aufeinandertreffen, ist eine besondere Erfahrung. Unsere lokalen Partnerfirmen sind auf die Gegebenheiten der Stadt spezialisiert und unterstützen Sie kompetent bei jedem Schritt. Vergleichen Sie jetzt und finden Sie das perfekte Umzugsunternehmen.</p>
              </article>

              <div className="mt-8 text-center bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bereit für Ihren Umzug?</h3>
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Biel-Bienne">
                    Kostenlose Offerten für Biel/Bienne anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Zweisprachigkeit als Vorteil</h2>
                  <p>Die Kommunikation ist der Schlüssel zu einem erfolgreichen Umzug. In Biel/Bienne, wo Deutsch und Französisch gleichermassen gesprochen werden, bieten unsere Partnerfirmen oft zweisprachige Teams an. So werden alle Ihre Wünsche verstanden und Missverständnisse vermieden.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border flex items-center">
                      <Users className="mx-auto h-8 w-8 text-teal-600 mr-4"/>
                      <p className="text-gray-700">Profitieren Sie von lokalen, zweisprachigen Umzugsteams, die Ihre Sprache sprechen.</p>
                  </div>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Umfassende Dienstleistungen für Ihren Umzug</h2>
                <p>Unsere Partner bieten mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                  {services.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </article>
            </motion.main>

            <LocationSidebar city={city} />
          </div>
          
          <LocationFAQ city={city} faqs={faqs} />

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaBielBiennePage;
