'use client'

import React from 'react';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, ShieldCheck } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import CantonFlag from '@/components/CantonFlag';
import LocationFAQ from '@/components/locations/LocationFAQ';
import { faqs } from '@/data/locationFaqs';
import LocationSidebar from '@/components/locations/LocationSidebar';

const AdvantageItem = ({ text, delay }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 + 0.5 }}
      className="flex items-start"
    >
      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
      <span className="text-gray-700 leading-relaxed">{text}</span>
    </motion.li>
  );
};

const UmzugsfirmaAargauPageClient = () => {
  const city = "Aargau";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Aargau | Top Umzugsunternehmen im Kanton";
  const metaDescription = "Finden Sie die beste Umzugsfirma im Aargau. Vergleichen Sie lokale, geprüfte Partner für Ihren Umzug und erhalten Sie unverbindliche Offerten.";
  const metaKeywords = "umzugsfirma aargau, umzug aargau, zügelfirma aargau, umzugsunternehmen aargau, rüebliland umzug";
  const canonicalUrl = '/umzugsfirma-aargau';

  const advantages = [
    "Lokale Expertise: Unsere Partner kennen die Verkehrswege und Besonderheiten im ganzen Kanton.",
    "Flexible Offerten: Vom einfachen Möbeltransport bis zum kompletten Full-Service-Umzug.",
    "Geprüfte Qualität: Wir arbeiten nur mit versicherten und erfahrenen Umzugsunternehmen zusammen.",
    "Transparente Kosten: Erhalten Sie klare und detaillierte Offerten ohne versteckte Gebühren.",
    "Kostenlos vergleichen: Unser Service ist für Sie komplett kostenlos und unverbindlich."
  ];

  const step1List = [
    "Umzugsvolumen (Anzahl Zimmer oder Kubikmeter)",
    "Zusatzleistungen wie Einpackservice, Möbelmontage oder Endreinigung",
    "Besonderheiten wie ein Klavier oder schwere Designermöbel",
    "Stockwerke und Liftsituation an beiden Orten"
  ];

  const costs = [
    "1.5 - 2.5 Zimmer Wohnung: ca. 600 - 1.200 CHF",
    "3.5 - 4.5 Zimmer Wohnung: ca. 1.200 - 2.200 CHF",
    "5.5+ Zimmer Wohnung/Haus: ab 2.000 CHF"
  ];

  const savingsTips = [
    "Ziehen Sie unter der Woche statt am Wochenende.",
    "Entrümpeln Sie vor dem Umzug und verkaufen oder spenden Sie Unnötiges.",
    "Organisieren Sie Umzugskartons frühzeitig und packen Sie selbst.",
    "Vergleichen Sie mehrere Offerten – mit uns geht das ganz einfach!"
  ];

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": ["MovingCompany", "Moving and Storage", "CleaningService"],
    "provider": {
      "@type": "Organization",
      "name": `Online-Offerten.ch - Umzugsfirmen in ${city}`
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Aargau",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "AG",
        "addressCountry": "CH"
      }
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
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaData}
      />
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 md:py-16">
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
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Aargau</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Von Aarau bis Zofingen – wir finden den perfekten Partner für Ihren Umzug im Rüebliland.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-10"
            >
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Einfach und professionell umziehen im Aargau</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Der Kanton Aargau ist dank seiner zentralen Lage und hohen Lebensqualität ein beliebter Wohn- und Wirtschaftsstandort. Ein Umzug hier erfordert gute Planung und einen zuverlässigen Partner.</p>
                <p className="text-gray-700 leading-relaxed">Mit Online-Offerten.ch vergleichen Sie mit nur einer Anfrage die besten, von uns geprüften Umzugsfirmen aus Ihrer Region im Aargau. Sparen Sie Zeit und Geld und ziehen Sie stressfrei um.</p>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ihre Vorteile bei einem Umzug im Aargau</h3>
                <ul className="space-y-4">
                  {advantages.map((item, index) => (
                    <AdvantageItem key={index} text={item} delay={index + 1} />
                  ))}
                </ul>
              </section>
              
              <div className="mt-8 text-center bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bereit für Ihren Umzug im Aargau?</h3>
                <p className="text-gray-700 mb-5">Starten Sie jetzt Ihre Anfrage und erhalten Sie in Kürze bis zu 5 Offerten.</p>
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Aargau">
                    Kostenlose Aargau-Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Leitfaden: Die richtige Umzugsfirma im Aargau finden</h2>
                  <p>Die Wahl der richtigen Umzugsfirma ist entscheidend für einen gelungenen Umzug. Hier sind die wichtigsten Schritte, um den idealen Partner im Aargau zu finden:</p>

                  <h3 className="text-xl font-semibold text-gray-800 pt-4">1. Bedürfnisse definieren & Anfrage starten</h3>
                  <p>Überlegen Sie sich genau, welche Dienstleistungen Sie benötigen. Füllen Sie dann unser Formular aus und beschreiben Sie Ihr Vorhaben so detailliert wie möglich.</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                    {step1List.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-800 pt-4">2. Offerten vergleichen</h3>
                  <p>Sie erhalten Offerten von verschiedenen Aargauer Umzugsfirmen. Achten Sie nicht nur auf den Preis, sondern auch auf die enthaltenen Leistungen und den Gesamteindruck.</p>
                  <div className="grid md:grid-cols-3 gap-4 text-center mt-4">
                      <div className="p-4 bg-gray-50 rounded-lg border">
                          <ShieldCheck className="mx-auto h-8 w-8 text-green-600 mb-2"/>
                          <h4 className="font-semibold">Versicherung prüfen</h4>
                          <p className="text-sm text-gray-600">Alle unsere Partner verfügen über eine Transport- und Betriebshaftpflichtversicherung.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                          <Award className="mx-auto h-8 w-8 text-yellow-600 mb-2"/>
                          <h4 className="font-semibold">Bewertungen lesen</h4>
                          <p className="text-sm text-gray-600">Prüfen Sie echte Kundenbewertungen, um sich ein Bild von der Zuverlässigkeit zu machen.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                          <h4 className="font-semibold">Leistungsumfang</h4>
                           <p className="text-sm text-gray-600">Stellen Sie sicher, dass alle gewünschten Services in der Offerte detailliert aufgeführt sind.</p>
                      </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 pt-4">3. Kosten realistisch einschätzen</h3>
                  <p>Die Kosten für einen Umzug im Aargau hängen von vielen Faktoren ab. Hier sind einige Richtwerte:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                    {costs.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 italic mt-2">Diese Preise sind Schätzungen und können je nach Distanz, Volumen und Zusatzleistungen variieren.</p>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Spartipps für Ihren Aargau-Umzug</h2>
                <p>Mit der richtigen Vorbereitung können Sie bei Ihrem Umzug bares Geld sparen:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                  {savingsTips.map((item, index) => (
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

export default UmzugsfirmaAargauPageClient;
