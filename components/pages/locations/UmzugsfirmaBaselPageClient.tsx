'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Package, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { cityServiceData } from '@/data/cityLocalBusinessData';
import { faqs } from '@/data/locationFaqs';

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
  const canonicalUrl = '/umzugsfirma-in-der-naehe/basel';

  // Cost table data - Hourly rates
  const hourlyRates = [
    { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 110.-" },
    { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 170.-" },
    { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 210.-" },
    { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 270.-" },
    { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 325.-" },
    { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 395.-" }
  ];

  // Cost table data - By room size
  const costTableRows = [
    { size: "1.5-Zimmer-Wohnung", cost: "CHF 620 - 660" },
    { size: "2.5-Zimmer-Wohnung", cost: "CHF 660 - 980" },
    { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'080 - 1'250" },
    { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'420 - 1'890" },
    { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'980 - 2'490" },
    { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'490 - 3'150" }
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
            "name": "Umzugsfirma in der Nähe",
            "item": "https://online-offerten.ch/umzugsfirma-in-der-naehe"
          },
          {
            "@type": "ListItem",
            "position": 3,
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
      
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
              <li>
                <Link href="/umzugsfirma-in-der-naehe" className="hover:text-green-600 transition-colors">
                  Umzugsfirma in der Nähe
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Umzugsfirma Basel
              </li>
            </ol>
          </nav>
          
          <motion.header 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 pt-8"
          >
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
                  <h2 className="typography-h2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in Basel?</h2>
                  <p className="typography-p mb-4">
                    Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Basel richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                  </p>
                  <p className="typography-p mb-6">
                    Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Basel und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Hourly Rates Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                        <h3 className="typography-h3 !text-white">Umzugspreise - Kosten pro Stunde</h3>
                      </div>
                      <div className="overflow-x-auto flex-1">
                        <table className="w-full table-fixed">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left typography-h4 border-b border-gray-200 w-2/3">Umzugswagen und Zügelmänner (ca. 25 m³)</th>
                              <th className="px-4 py-3 text-right typography-h4 border-b border-gray-200 w-1/3">Preis</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hourlyRates.map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 border-b border-gray-100 typography-p">{row.service}</td>
                                <td className="px-4 py-3 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Room Size Costs Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                        <h3 className="typography-h3 !text-white">Umzugskosten nach Zimmergrössen</h3>
                      </div>
                      <div className="overflow-x-auto flex-1">
                        <table className="w-full table-fixed">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left typography-h4 border-b border-gray-200 w-2/3">Anzahl Zimmer</th>
                              <th className="px-4 py-3 text-right typography-h4 border-b border-gray-200 w-1/3">Umzugskosten durchschnittlich (CHF)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {costTableRows.map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 border-b border-gray-100 typography-p">{row.size}</td>
                                <td className="px-4 py-3 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.cost}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-200">
                    <p className="typography-p text-gray-600 italic">
                      Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                    </p>
                  </div>
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
