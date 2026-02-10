'use client'

import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Globe, ChevronRight } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';

const UmzugsfirmaGenfPageClient = () => {
  const city = "Genf";
  const locationData = locations.find(loc => loc.name === city);

  // Cost table data - Hourly rates
  const hourlyRates = [
    { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 120.-" },
    { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 180.-" },
    { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 220.-" },
    { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 280.-" },
    { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 340.-" },
    { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 410.-" }
  ];

  // Cost table data - By room size
  const costTableRows = [
    { size: "1.5-Zimmer-Wohnung", cost: "CHF 650 - 700" },
    { size: "2.5-Zimmer-Wohnung", cost: "CHF 700 - 1'020" },
    { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'120 - 1'300" },
    { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'480 - 1'950" },
    { size: "5.5-Zimmer-Wohnung", cost: "CHF 2'050 - 2'580" },
    { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'580 - 3'280" }
  ];

  const services = [
    "Privat- und Geschäftsumzüge in und um Genf.",
    "Auslandumzug, insbesondere von und nach Frankreich.",
    "Professionelle Umzugsreinigung mit Abnahmegarantie.",
    "Möbellagerung in sicheren und modernen Lagerräumen.",
    "Spezialtransporte für Kunst und wertvolle Gegenstände."
  ];

  return (
    <>
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
                  Startseite
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
                Umzugsfirma Genf
              </li>
            </ol>
          </nav>
          
          <header
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <h1 className="heading-1">
              Umzugsfirma Genf – Professionelle Umzugsofferten vergleichen
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Planen Sie Ihren Umzug in der internationalen Stadt Genf? Finden Sie hier die besten Partner.
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <main
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-xl space-y-8"
            >
              <article>
                <h2 className="heading-2">Professionell umziehen in der internationalen Metropole</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Genf, als Sitz vieler internationaler Organisationen, ist ein einzigartiger Ort für einen Umzug. Ob Sie aus dem Ausland zuziehen oder innerhalb der Stadt umziehen, unsere Partnerfirmen bieten massgeschneiderte Lösungen. Vergleichen Sie Offerten, um den besten Service für Ihre Bedürfnisse in Genf zu finden.</p>
              </article>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="heading-2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in Genf?</h2>
                <p className="text-body mb-4">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Genf richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="text-body mb-6">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Genf und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Hourly Rates Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="heading-3 !text-white">Umzugspreise - Kosten pro Stunde</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left heading-4 border-b border-gray-200 w-2/3">Umzugswagen und Zügelmänner (ca. 25 m³)</th>
                            <th className="px-4 py-3 text-right heading-4 border-b border-gray-200 w-1/3">Preis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hourlyRates.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 text-body">{row.service}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right text-body font-semibold text-green-600">{row.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Room Size Costs Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="heading-3 !text-white">Umzugskosten nach Zimmergrössen</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left heading-4 border-b border-gray-200 w-2/3">Anzahl Zimmer</th>
                            <th className="px-4 py-3 text-right heading-4 border-b border-gray-200 w-1/3">Umzugskosten durchschnittlich (CHF)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {costTableRows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 text-body">{row.size}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right text-body font-semibold text-green-600">{row.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-200">
                  <p className="text-body text-gray-600 italic">
                    Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                  </p>
                </div>
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
            </main>

            <LocationSidebar city={city} districts={undefined as any} searches={undefined as any} />
          </div>
          

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaGenfPageClient;


