'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Package, Sparkles, MapPin } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import CantonFlag from '@/components/CantonFlag';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { cityServiceData } from '@/data/cityLocalBusinessData';

const AdvantageItem = ({ text, delay }: any) => {
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

const UmzugsfirmaBaselPageClient = () => {
  const city = "Basel";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Basel » Günstig zügeln";
  const metaDescription = "Ihre Umzugsfirma in Basel für einen reibungslosen Umzug. Holen Sie kostenlose Offerten von geprüften Zügelfirmen und Reinigungsfirmen in der Region Basel ein.";
  const metaKeywords = "umzugsfirma basel, zügelfirma basel, umzug basel, reinigung basel, umzugsreinigung, umzugsservice basel";
  const canonicalUrl = '/umzugsfirma-basel';

  const costTableRows = [
    { size: "1.5 - 2.5 Zimmer", cost: "CHF 750 – 1.400" },
    { size: "3.5 Zimmer", cost: "CHF 1.100 – 1.900" },
    { size: "4.5 Zimmer", cost: "CHF 1.400 – 2.600" },
    { size: "5.5+ Zimmer", cost: "ab CHF 1.800" }
  ];

  const costFactors = [
    "Volumen des Umzugsguts (in m³)",
    "Distanz zwischen alter und neuer Adresse",
    "Stockwerke und das Vorhandensein eines Lifts",
    "De- und Montage von Möbeln",
    "Ein- und Auspackservice"
  ];

  const savingsTips = [
    "Wählen Sie einen Umzugstermin unter der Woche (Mo-Do).",
    "Entrümpeln Sie vorab und verkaufen oder spenden Sie Unnötiges.",
    "Organisieren Sie Umzugskartons selbst, z.B. im Freundeskreis.",
    "Packen Sie alles, was möglich ist, selbst ein und aus."
  ];

  const extraServices = [
    { icon: Package, title: "Ein- & Auspackservice", text: "Lassen Sie Ihr Umzugsgut von Profis sicher verpacken." },
    { icon: Sparkles, title: "Umzugsreinigung", text: "Mit Abnahmegarantie für eine problemlose Wohnungsübergabe." },
    { icon: MapPin, title: "Möbellagerung", text: "Falls Sie Möbel temporär einlagern müssen." }
  ];

  const platformAdvantages = [
    "Nur eine Anfrage für mehrere Offerten.",
    "Alle Partnerfirmen sind von uns geprüft und bewertet.",
    "100% kostenloser und unverbindlicher Service.",
    "Direkter Vergleich spart nachweislich Kosten.",
    "Lokale Expertise für einen reibungslosen Ablauf in Basel."
  ];

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  const cityData = cityServiceData[city];
  
  // Service Schema with areaServed (correct for platform/aggregator model)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": cityData.displayName,
    "description": `Geprüfte Umzugsfirmen und Zügelfirmen in ${city} vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen.`,
    "serviceType": ["MovingCompany", "Moving and Storage", "CleaningService"],
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "City",
      "name": city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityData.addressLocality,
        "addressRegion": cityData.addressRegion,
        "addressCountry": "CH"
    },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    },
    "url": `https://online-offerten.ch${canonicalUrl}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CHF",
      "name": "Kostenlose Umzugsofferten"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
            "@type": "Question",
            "name": ((item.question as any).de || item.question as any).replace('{city}', city),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.map((ans: any) => typeof ans === 'string' ? ans : (ans.de || ans)).join(' ').replace(/{city}/g, city)
            }
        }))
  };

  // Combined Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      faqSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
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
              <CantonFlag canton={(locationData as any)?.canton} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 text-shadow-md">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Basel</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Einfach und professionell umziehen. Finden Sie hier die besten Umzugs- und Reinigungsfirmen für Ihren Umzug in und um Basel.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Professionell umziehen in der Kulturstadt Basel</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Ein Umzug in Basel, dem dynamischen Zentrum am Rhein, erfordert Präzision und einen verlässlichen Partner. Egal, ob es sich um einen Umzug innerhalb der Grossbasler Altstadt, nach Kleinbasel oder aus einem anderen Kanton handelt – wir verbinden Sie mit den führenden Umzugsfirmen der Region. So stellen Sie sicher, dass Ihr Umzug effizient, sicher und stressfrei verläuft.</p>
                <p className="text-gray-700 leading-relaxed mb-4">Unser Portal ermöglicht es Ihnen, mit nur einer Anfrage bis zu 6 kostenlose und unverbindliche Offerten von qualitätsgeprüften Umzugs- und Reinigungsunternehmen aus Basel zu vergleichen. Sparen Sie wertvolle Zeit und bis zu 40% der Kosten.</p>
              </article>

              <div className="mt-8 text-center bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Startklar für Ihren Umzug in Basel?</h3>
                <p className="text-gray-700 mb-5">Vergleichen Sie jetzt Offerten und sichern Sie sich die beste Offerte für Ihren Umzug.</p>
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Basel">
                    Jetzt Offerten für Basel erhalten
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Was kostet ein Umzug in Basel?</h2>
                  <p>Die Umzugskosten in Basel variieren je nach Wohnungsgrösse, Distanz und gewünschten Zusatzleistungen. Hier finden Sie eine Übersicht zur Orientierung.</p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 pt-4">Durchschnittliche Umzugskosten in Basel</h3>
                  <div className="my-4 overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead className="bg-gray-50">
                              <tr>
                                  <th className="p-3 font-semibold text-sm text-gray-600 border-b-2 border-gray-200">Wohnungsgrösse</th>
                                  <th className="p-3 font-semibold text-sm text-gray-600 border-b-2 border-gray-200 text-right">Geschätzte Kosten</th>
                              </tr>
                          </thead>
                          <tbody>
                            {costTableRows.map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                  <td className="p-3 border-b border-gray-200">{row.size}</td>
                                  <td className="p-3 border-b border-gray-200 font-medium text-right">{row.cost}</td>
                              </tr>
                            ))}
                          </tbody>
                      </table>
                  </div>
                  <p className="text-sm text-gray-600 italic">Die Preise sind Richtwerte und können je nach Aufwand abweichen.</p>
                  
                  <h3 className="text-xl font-semibold text-gray-800 pt-4">Faktoren, die den Preis beeinflussen:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4 mt-2">
                    {costFactors.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                  </ul>
              </article>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Schritt für Schritt zum erfolgreichen Umzug</h2>
                <p>Eine gute Vorbereitung ist alles. Mit unserer Checkliste behalten Sie den Überblick.</p>
                <h3 className="text-xl font-semibold text-gray-800 pt-4">1. Planung & Organisation</h3>
                <p>Beginnen Sie frühzeitig mit der Planung. Legen Sie ein Umzugsdatum fest und erstellen Sie eine Inventarliste. Dies hilft den Umzugsfirmen, eine genaue Offerte zu erstellen.</p>
                <h3 className="text-xl font-semibold text-gray-800 pt-4">2. Offerten vergleichen & Firma buchen</h3>
                <p>Nutzen Sie unser Formular, um Offerten einzuholen. Achten Sie beim Vergleich nicht nur auf den Preis, sondern auch auf inkludierte Leistungen wie Versicherung und Verpackungsmaterial.</p>
                <div className="grid md:grid-cols-3 gap-4 text-center mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg border"><ShieldCheck className="mx-auto h-8 w-8 text-green-600 mb-2"/><h4 className="font-semibold">Versicherungsschutz</h4><p className="text-sm text-gray-600">Für einen sicheren Transport Ihres Hab und Guts.</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg border"><Award className="mx-auto h-8 w-8 text-yellow-600 mb-2"/><h4 className="font-semibold">Geprüfte Qualität</h4><p className="text-sm text-gray-600">Nur Firmen mit positiven Bewertungen.</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg border"><h4 className="font-semibold">Transparente Preise</h4><p className="text-sm text-gray-600">Keine versteckten Gebühren.</p></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 pt-4">3. Umzugstag & Übergabe</h3>
                <p>Koordinieren Sie den Umzugstag mit der Firma. Stellen Sie sicher, dass Parkplätze reserviert sind. Bei einer Umzugsreinigung ist eine Abnahmegarantie entscheidend.</p>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Geld sparen beim Zügeln in Basel</h2>
                <p>Mit einigen cleveren Massnahmen können Sie Ihr Umzugsbudget schonen:</p>
                <ul className="list-decimal list-inside space-y-3 text-gray-700 pl-4 marker:font-bold">
                    {savingsTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Zusatzleistungen für einen komfortablen Umzug</h2>
                  <p>Viele Firmen bieten mehr als nur den reinen Transport:</p>
                  <ul className="space-y-4">
                    {extraServices.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <li key={index} className="flex items-start">
                          <Icon className="w-6 h-6 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                          <span><strong>{service.title}:</strong> {service.text}</span>
                        </li>
                      );
                    })}
                  </ul>
              </article>
              
               <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Professionelle Umzugsreinigung in Basel</h2>
                   <p>Buchen Sie Ihre Umzugsreinigung mit Abnahmegarantie direkt mit. Die Reinigungsfirmen kümmern sich um eine blitzsaubere Wohnung, damit die Übergabe an den Vermieter reibungslos verläuft.</p>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Spezialtransporte für heikle Güter</h2>
                <p>Für den Transport von Klavieren, Kunstwerken oder anderen wertvollen Gegenständen sind spezialisierte Firmen mit dem nötigen Know-how und Equipment die richtige Wahl. Geben Sie dies in Ihrer Anfrage an.</p>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Warum über Online-Offerten.ch?</h2>
                <p>Profitieren Sie von einem einfachen und transparenten Prozess:</p>
                <ul className="space-y-4 mt-4">
                    {platformAdvantages.map((item, index) => (
                        <AdvantageItem key={index} text={item} delay={index + 1} />
                    ))}
                </ul>
              </article>
            </motion.main>

            <LocationSidebar 
              city={city} 
              districts={{
                title: "Quartiere in Basel",
                text: "Unsere Partner sind in ganz Basel-Stadt für Sie da:",
                list: [
                  "Grossbasel Altstadt",
                  "Kleinbasel Altstadt",
                  "St. Alban",
                  "Gundeldingen",
                  "Bruderholz",
                  "Bachletten",
                  "Gotthelf",
                  "Iselin",
                  "St. Johann",
                  "Matthäus",
                  "Klybeck",
                  "Rosental",
                  "Wettstein",
                  "Hirzbrunnen",
                  "Riehen",
                  "Bettingen"
                ]
              }}
              searches={{
                title: "Beliebte Suchen",
                list: [
                  "Günstig umziehen Basel",
                  "Reinigungsfirma Basel",
                  "Klaviertransport Basel",
                  "Möbellift mieten",
                  "Zügelfirma mit Einpackservice",
                  "Umzug und Reinigung"
                ]
              }}
            />
          </div>
          

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaBaselPageClient;
