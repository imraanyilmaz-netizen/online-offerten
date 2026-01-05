'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { faqs } from '@/data/locationFaqs';

const UmzugsfirmaThunPageClient = () => {
  const city = "Thun";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Thun | Ihr Umzugspartner am Thunersee";
  const metaDescription = "Professionelle Umzugsfirma in Thun für private und geschäftliche Umzüge. Vergleichen Sie Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.";
  const metaKeywords = "umzugsfirma thun, umzug thun, zügelfirma thun, umzugsunternehmen thunersee, günstig umziehen thun";
  const canonicalUrl = '/umzugsfirma-thun';

  const advantages = [
    "Ortskenntnis, um auch enge Gassen in der Altstadt zu meistern.",
    "Full-Service-Pakete inklusive Verpackung, Montage und Endreinigung.",
    "Moderne Fahrzeuge und Ausrüstung für einen sicheren Transport.",
    "Faire und transparente Preisgestaltung."
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
      "name": "Thun"
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
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Thun</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Vom Tor zum Berner Oberland in Ihr neues Zuhause – stressfrei und zuverlässig.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Sorgenfrei umziehen in der Alpenstadt Thun</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Thun, idyllisch am Thunersee gelegen und umgeben von einer atemberaubenden Bergkulisse, bietet hohe Lebensqualität. Damit Ihr Umzug in oder aus Thun genauso reibungslos verläuft, verbinden wir Sie mit den besten lokalen Umzugsunternehmen. Holen Sie sich jetzt Ihre unverbindlichen Offerten.</p>
              </article>

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-blue-500">
                 <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Thun">
                    Offerten für Thun vergleichen
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Unsere Partner für Thun bieten Ihnen:</h2>
                  <ul className="list-none space-y-3 mt-4">
                    {advantages.map((item, index) => (
                      <li key={index} className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2"/>{item}</li>
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

export default UmzugsfirmaThunPageClient;
