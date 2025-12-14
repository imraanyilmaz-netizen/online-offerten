import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import CantonFlag from '@/components/CantonFlag';
import LocationFAQ from '@/components/locations/LocationFAQ';
import { faqs } from '@/data/locationFaqs';
import LocationSidebar from '@/components/locations/LocationSidebar';

const UmzugsfirmaLuganoPage = () => {
  const city = "Lugano";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Lugano | Günstige Offerten | Top Service";
  const metaDescription = "Ihre Umzugsfirma in Lugano für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten im Tessin.";
  const metaKeywords = "umzugsfirma lugano, umzug lugano, zügelfirma lugano, umzugsunternehmen tessin, günstig umziehen lugano";
  const canonicalUrl = "https://online-offerten.ch/umzugsfirma-lugano";

  const services = [
    "Professionelles Verpacken und Demontage.",
    "Sicherer Transport von Möbeln, Klavieren und Kunstgegenständen.",
    "Endreinigungsservice mit Abnahmegarantie.",
    "Möbellagerung für kurze oder lange Zeiträume.",
    "Räumung und umweltgerechte Entsorgung."
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
      "name": "Lugano"
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
      
      <div className="bg-gray-50 py-12 md:py-16">
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
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Lugano</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Vom See bis zum Berg – Ihr Umzug in Lugano mit den besten Profis im Tessin.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-xl space-y-8"
            >
              <article>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Umziehen in Lugano: Einfachheit und Stil</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Lugano, mit seinem mediterranen Charme und seiner Schweizer Effizienz, ist ein wunderbarer Ort zum Leben. Ihr Umzug sollte genauso angenehm sein. Mit Online-Offerten.ch können Sie schnell die besten lokalen Umzugsfirmen für einen makellosen Service vergleichen.</p>
              </article>

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-green-500">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Lugano">
                    Offerten für Lugano anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Vollständige Dienstleistungen für Ihren Umzug</h2>
                  <p className="mt-4">Unsere Partner bieten eine vollständige Palette von Dienstleistungen, um alle Ihre Bedürfnisse zu erfüllen:</p>
                  <ul className="list-none space-y-3 mt-4">
                    {services.map((item, index) => (
                      <li key={index} className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2"/>{item}</li>
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

export default UmzugsfirmaLuganoPage;
