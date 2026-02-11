'use client'

import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';

const UmzugsfirmaStGallenPageClient = () => {
  const city = "St. Gallen";
  const locationData = locations.find(loc => loc.name === city);

  // Cost table data - Hourly rates
  const hourlyRates = [
    { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 105.-" },
    { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 165.-" },
    { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 205.-" },
    { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 265.-" },
    { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 318.-" },
    { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 385.-" }
  ];

  // Cost table data - By room size
  const costTableRows = [
    { size: "1.5-Zimmer-Wohnung", cost: "CHF 600 - 645" },
    { size: "2.5-Zimmer-Wohnung", cost: "CHF 645 - 965" },
    { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'065 - 1'235" },
    { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'405 - 1'875" },
    { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'965 - 2'475" },
    { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'475 - 3'135" }
  ];

  const advantages = [
    "Lokale Expertise für schnelle und reibungslose Abläufe.",
    "Flexible Dienstleistungen: Von reinen Transporten bis zum Full-Service-Umzug.",
    "Transparente Preise ohne versteckte Kosten.",
    "Kostenlose und unverbindliche Vergleichsofferten."
  ];

  return (
    <>
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-green-600 transition-colors">Startseite</Link></li>
              <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
              <li><Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">Umzugsfirma in der Nähe</Link></li>
              <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
              <li className="text-gray-900 font-medium" aria-current="page">Umzugsfirma St. Gallen</li>
            </ol>
          </nav>

          <header
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Umzugsfirma St. Gallen – Ostschweizer Umzugsprofis vergleichen
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Von der Olma Stadt zu Ihrem neuen Zuhause – wir finden die besten Umzugspartner für Sie.
            </p>
          </header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <main
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-xl space-y-8"
            >
              <article>
                <h2 className="heading-2">Einfach und effizient umziehen in St. Gallen</h2>
                <p className="text-gray-700 leading-relaxed mb-4">St. Gallen, bekannt für seine Stiftskirche und die malerische Altstadt, ist ein attraktiver Wohnort. Ein Umzug hierher sollte genauso positiv sein. Mit Online-Offerten.ch vergleichen Sie schnell und unkompliziert die besten Umzugsfirmen der Region.</p>
              </article>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="heading-2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in St. Gallen?</h2>
                <p className="text-body mb-4">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in St. Gallen richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="text-body mb-6">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von St. Gallen und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
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

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-gray-400">
                 <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=St. Gallen">
                    Offerten für St. Gallen anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="heading-2">Wir sind in der gesamten Region St. Gallen für Sie da</h2>
                  <p className="mt-4">Unsere Partnerfirmen bedienen nicht nur die Stadt St. Gallen, sondern auch die umliegenden Gemeinden und den gesamten Kanton. Egal ob Sie innerhalb der Stadt oder in eine Nachbargemeinde ziehen, wir haben den richtigen Partner für Sie.</p>
              </article>
              
              <article className="pt-8 border-t border-gray-200">
                  <h2 className="heading-2 flex items-center"><BookOpen className="mr-3"/>St. Gallens Geschichte und Umzug</h2>
                  <p className="mt-4">Die Geschichte St. Gallens, geprägt von ihrer berühmten Stiftsbibliothek und dem Textilhandel, spiegelt sich in ihrer vielfältigen Architektur und Kultur wider. Ein Umzug in dieser historischen Stadt bedeutet oft auch, sich an neue Gegebenheiten anzupassen. Unsere Umzugspartner kennen die Besonderheiten der Stadt und sorgen für einen reibungslosen Übergang, damit Sie sich schnell in Ihrem neuen Zuhause wohlfühlen.</p>
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

export default UmzugsfirmaStGallenPageClient;


