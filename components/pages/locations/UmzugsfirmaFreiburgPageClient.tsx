'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { faqs } from '@/data/locationFaqs';

const UmzugsfirmaFreiburgPageClient = () => {
  const city = "Freiburg";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Freiburg | Umzug im Üechtland";
  const metaDescription = "Ihre Umzugsfirma in Freiburg für einen reibungslosen Umzug. Erhalten Sie kostenlose Offerten von geprüften Zügelfirmen in der Region Freiburg.";
  const metaKeywords = "umzugsfirma freiburg, umzug freiburg, zügelfirma freiburg, umzugsunternehmen freiburg, üechtland umzug";
  const canonicalUrl = '/umzugsfirma-freiburg';

  const services = [
    "Komplette Umzugsplanung und -organisation.",
    "Mehrsprachige Teams für reibungslose Kommunikation.",
    "Professioneller Verpackungsservice für Ihr Hab und Gut.",
    "Möbelmontage und Anschluss von Geräten.",
    "Endreinigung mit Abnahmegarantie."
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
      "name": "Freiburg"
    },
    "name": metaTitle,
    "description": metaDescription,
    "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
            "@type": "Question",
            "name": ((item.question as any).de || item.question as any).replace('{city}', city),
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
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Freiburg</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Ihr Umzug in der Zähringerstadt – effizient, zuverlässig und mehrsprachig.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Stressfrei umziehen in der Kulturstadt Freiburg</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Freiburg, die Brücke zwischen Deutsch- und Westschweiz, besticht durch ihre mittelalterliche Altstadt und lebendige Kultur. Wir sorgen dafür, dass Ihr Umzug in dieser einzigartigen Stadt ebenso reibungslos verläuft. Vergleichen Sie die besten lokalen Umzugsfirmen und starten Sie entspannt in Ihr neues Kapitel.</p>
              </article>

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-gray-400">
                <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Freiburg">
                    Jetzt Offerten für Freiburg erhalten
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Unsere Dienstleistungen in Freiburg</h2>
                  <p className="mt-4">Ob Privatumzug, Bürowechsel oder Spezialtransport – unsere Partner bieten massgeschneiderte Lösungen:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4 mt-4">
                    {services.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
              </article>

              {/* Internal Links Section */}
              <article className="pt-8 border-t border-gray-200">
                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Weitere Informationen & Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Umzugsservices</h4>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/privatumzug" className="text-green-600 hover:text-green-700 font-medium underline">
                            Privatumzug Offerten vergleichen
                          </Link>
                        </li>
                        <li>
                          <Link href="/geschaeftsumzug" className="text-green-600 hover:text-green-700 font-medium underline">
                            Geschäftsumzug Offerten
                          </Link>
                        </li>
                        <li>
                          <Link href="/umzugsofferten" className="text-green-600 hover:text-green-700 font-medium underline">
                            Umzugsofferten vergleichen
                          </Link>
                        </li>
                        <li>
                          <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-medium underline">
                            Umzugsfirmen finden
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Verwandte Services</h4>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/umzugsreinigung" className="text-green-600 hover:text-green-700 font-medium underline">
                            Umzugsreinigung mit Abnahmegarantie
                          </Link>
                        </li>
                        <li>
                          <Link href="/reinigung" className="text-green-600 hover:text-green-700 font-medium underline">
                            Reinigungsfirmen vergleichen
                          </Link>
                        </li>
                        <li>
                          <Link href="/ratgeber" className="text-green-600 hover:text-green-700 font-medium underline">
                            Ratgeber & Tipps
                          </Link>
                        </li>
                        <li>
                          <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-700 font-medium underline">
                            Umzugskosten berechnen
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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

export default UmzugsfirmaFreiburgPageClient;
