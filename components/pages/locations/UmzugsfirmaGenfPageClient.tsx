'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { faqs } from '@/data/locationFaqs';

const UmzugsfirmaGenfPageClient = () => {
  const city = "Genf";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Genf | Top Umzugsunternehmen | Günstige Offerten";
  const metaDescription = "Ihre professionelle Umzugsfirma in Genf. Erhalten Sie kostenlose & unverbindliche Offerten von geprüften Umzugsunternehmen für Ihren Umzug in Genf.";
  const metaKeywords = "umzugsfirma genf, umzug genf, zügelfirma genf, umzugsunternehmen genf, internationaler umzug genf, umzugsofferte genf";
  const canonicalUrl = '/umzugsfirma-genf';

  const services = [
    "Privat- und Geschäftsumzüge in und um Genf.",
    "Auslandumzug, insbesondere von und nach Frankreich.",
    "Professionelle Umzugsreinigung mit Abnahmegarantie.",
    "Möbellagerung in sicheren und modernen Lagerräumen.",
    "Spezialtransporte für Kunst und wertvolle Gegenstände."
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://online-offerten.ch/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `Umzugsfirma ${city}`,
            "item": `https://online-offerten.ch${canonicalUrl}`
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Umzugsvermittlung",
        "name": `Umzugsfirma ${city} vergleichen`,
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
        "areaServed": {
          "@type": "City",
          "name": city,
          "containedInPlace": {
            "@type": "Country",
            "name": "Switzerland"
          }
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=" + city,
          "priceCurrency": "CHF",
          "price": "0"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          
          <motion.header 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Genf</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Planen Sie Ihren Umzug in der internationalen Stadt Genf? Finden Sie hier die besten Partner.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Professionell umziehen in der internationalen Metropole</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Genf, als Sitz vieler internationaler Organisationen, ist ein einzigartiger Ort für einen Umzug. Ob Sie aus dem Ausland zuziehen oder innerhalb der Stadt umziehen, unsere Partnerfirmen bieten massgeschneiderte Lösungen. Vergleichen Sie Offerten, um den besten Service für Ihre Bedürfnisse in Genf zu finden.</p>
              </article>

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-red-500">
                 <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Genf">
                    Kostenlose Offerten für Genf erhalten
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Spezialist für Auslandumzüge</h2>
                  <div className="p-4 bg-blue-50 rounded-lg border flex items-center mt-4">
                      <Globe className="h-8 w-8 text-blue-600 mr-4"/>
                      <p className="text-gray-700">Dank der Grenznähe zu Frankreich sind unsere Partner in Genf Experten für Auslandumzüge und Zollformalitäten.</p>
                  </div>
              </article>
              
              <article className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Unsere Dienstleistungen in Genf</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4 mt-4">
                  {services.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </article>
            </motion.main>

            <LocationSidebar city={city} districts={undefined as any} searches={undefined as any} />
          </div>
          

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaGenfPageClient;
