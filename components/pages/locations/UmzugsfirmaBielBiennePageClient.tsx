'use client'

import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Users, ChevronRight } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';

const UmzugsfirmaBielBiennePageClient = () => {
  const city = "Biel/Bienne";
  const locationData = locations.find(loc => loc.name === city);

  // Cost table data - Hourly rates
  const hourlyRates = [
    { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 109.-" },
    { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 169.-" },
    { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 209.-" },
    { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 269.-" },
    { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 323.-" },
    { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 392.-" }
  ];

  // Cost table data - By room size
  const costTableRows = [
    { size: "1.5-Zimmer-Wohnung", cost: "CHF 618 - 658" },
    { size: "2.5-Zimmer-Wohnung", cost: "CHF 658 - 978" },
    { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'078 - 1'248" },
    { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'418 - 1'888" },
    { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'978 - 2'488" },
    { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'488 - 3'148" }
  ];

  const services = [
    "Professioneller Ein- und Auspackservice",
    "Möbel-Demontage und -Montage durch erfahrene Schreiner",
    "Spezialtransporte für Klaviere oder Kunstgegenstände",
    "Endreinigung mit Abnahmegarantie",
    "Fachgerechte Entsorgung und Räumung"
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-green-600 transition-colors">Startseite</Link></li>
              <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
              <li><Link href="/umzugsfirma-in-der-naehe" className="hover:text-green-600 transition-colors">Umzugsfirma in der Nähe</Link></li>
              <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
              <li className="text-gray-900 font-medium" aria-current="page">Umzugsfirma Biel/Bienne</li>
            </ol>
          </nav>

          <header
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <h1 className="heading-1">
              Umzugsfirma Biel/Bienne – Zweisprachige Umzugsexperten vergleichen
            </h1>
            <p className="text-body text-gray-700 max-w-3xl mx-auto">
              Ihr Partner für einen reibungslosen Umzug in der grössten zweisprachigen Stadt der Schweiz.
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <main
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-10"
            >
              <article>
                <h2 className="heading-2">Willkommen in Biel/Bienne – Umziehen leicht gemacht</h2>
                <p className="text-body text-gray-700 leading-relaxed mb-4">Ein Umzug in der Uhrenmetropole Biel/Bienne, wo deutsche und französische Kultur aufeinandertreffen, ist eine besondere Erfahrung. Unsere lokalen Partnerfirmen sind auf die Gegebenheiten der Stadt spezialisiert und unterstützen Sie kompetent bei jedem Schritt. Vergleichen Sie jetzt und finden Sie das perfekte Umzugsunternehmen.</p>
              </article>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="heading-2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in Biel/Bienne?</h2>
                <p className="text-body text-gray-700 mb-4 leading-relaxed">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Biel/Bienne richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="text-body text-gray-700 mb-6 leading-relaxed">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Biel/Bienne und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
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
                              <td className="px-4 py-3 border-b border-gray-100 text-gray-700">{row.service}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right font-semibold text-green-600">{row.price}</td>
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
                              <td className="px-4 py-3 border-b border-gray-100 text-gray-700">{row.size}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right font-semibold text-green-600">{row.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-200">
                  <p className="text-body text-gray-600 italic leading-relaxed">
                    Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                  </p>
                </div>
              </article>

              <div className="mt-8 text-center bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                <h3 className="heading-3">Bereit für Ihren Umzug?</h3>
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Biel-Bienne">
                    Kostenlose Offerten für Biel/Bienne anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="heading-2">Zweisprachigkeit als Vorteil</h2>
                  <p className="text-body text-gray-700 leading-relaxed">Die Kommunikation ist der Schlüssel zu einem erfolgreichen Umzug. In Biel/Bienne, wo Deutsch und Französisch gleichermassen gesprochen werden, bieten unsere Partnerfirmen oft zweisprachige Teams an. So werden alle Ihre Wünsche verstanden und Missverständnisse vermieden.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border flex items-center">
                      <Users className="mx-auto h-8 w-8 text-teal-600 mr-4"/>
                      <p className="text-body text-gray-700">Profitieren Sie von lokalen, zweisprachigen Umzugsteams, die Ihre Sprache sprechen.</p>
                  </div>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="heading-2">Umfassende Dienstleistungen für Ihren Umzug</h2>
                <p className="text-body text-gray-700 leading-relaxed">Unsere Partner bieten mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
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

export default UmzugsfirmaBielBiennePageClient;


