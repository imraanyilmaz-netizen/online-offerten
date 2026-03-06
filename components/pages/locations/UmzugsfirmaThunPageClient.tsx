'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ChevronRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import Image from 'next/image';
import ServiceGrid from '@/components/pages/locations/ServiceGrid.client';

const UmzugsfirmaThunPageClient = () => {
  const city = "Thun";
  const locationData = locations.find(loc => loc.name === city);

  // Cost table data - Hourly rates
  const hourlyRates = [
    { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 107.-" },
    { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 167.-" },
    { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 207.-" },
    { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 267.-" },
    { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 322.-" },
    { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 390.-" }
  ];

  // Cost table data - By room size
  const costTableRows = [
    { size: "1.5-Zimmer-Wohnung", cost: "CHF 615 - 655" },
    { size: "2.5-Zimmer-Wohnung", cost: "CHF 655 - 975" },
    { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'075 - 1'245" },
    { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'415 - 1'885" },
    { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'975 - 2'485" },
    { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'485 - 3'145" }
  ];

  const advantages = [
    "Ortskenntnis, um auch enge Gassen in der Altstadt zu meistern.",
    "Full-Service-Pakete inklusive Verpackung, Montage und Endreinigung.",
    "Moderne Fahrzeuge und Ausrüstung für einen sicheren Transport.",
    "Faire und transparente Preisgestaltung."
  ];

  return (
    <>
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section
          className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50"
          aria-label="Umzugsfirma Thun - Kostenlose Offerten"
        >
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '60px 60px',
              }}
            />
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <nav className="mb-6" aria-label="Breadcrumb">
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
                  <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">
                    Umzugsfirma
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  Thun
                </li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-4">
                  Thun & Berner Oberland
                </div>
                <h1 className="heading-1 !mt-0 mb-4">
                  Umzugsfirma Thun - Umzugspartner am Thunersee finden und vergleichen
                </h1>
                <p className="hero-description text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl">
                  Vergleichen Sie geprüfte Umzugsfirmen in Thun und Umgebung. Mit nur einer Anfrage erhalten Sie mehrere Offerten für einen sicheren und stressfreien Umzug.
                </p>

                <div className="bg-white/95 rounded-xl p-3 sm:p-4 mb-6 border border-gray-200 shadow-sm">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                    Welche Dienstleistung benötigen Sie?
                  </h2>
                  <ServiceGrid city={city} compact />
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">100% kostenlos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Geprüfte Partner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Bis zu 40% sparen</span>
                  </div>
                </div>
              </div>

              <div className="relative md:col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={(locationData as any)?.image || '/image/default-umzug.jpg'}
                    alt="Professionelle Zügelfirma in Thun - Umzugsunternehmen bei der Arbeit"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Bis zu 40% sparen</p>
                  <p className="text-xs text-green-100">Kostenlos & unverbindlich</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Layout: Content Left, Sidebar Right */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-8">
                <h2 className="heading-2">
                  Umzugsfirma Thun: Sicher umziehen in der Region Thunersee
                </h2>
                <div className="text-gray-700 mb-8 leading-relaxed space-y-4">
                  <p>
                    Thun verbindet See, Altstadt und Nähe zum Berner Oberland - eine attraktive, aber logistisch anspruchsvolle Region für Umzüge. Unterschiedliche Wohnlagen, enge Zufahrten in einzelnen Quartieren und saisonale Verkehrssituationen erfordern eine gute Planung.
                  </p>
                  <p>
                    Über Online-Offerten.ch vergleichen Sie mehrere geprüfte Umzugsunternehmen in Thun mit transparenten Leistungen und klaren Preisen. So finden Sie einfacher den Anbieter, der zu Ihrem Zeitplan, Ihrem Umzugsvolumen und Ihrem Budget passt.
                  </p>
                  <p>
                    Ob Wohnungswechsel innerhalb der Stadt, Umzug ins Umland oder Transport Richtung Oberland: Mit dem passenden Umzugspartner reduzieren Sie Aufwand und Risiko und starten deutlich entspannter in den neuen Abschnitt.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <LocationSidebar city={city} districts={undefined as any} searches={undefined as any} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="heading-2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in Thun?</h2>
                <p className="text-body mb-4">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Thun richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="text-body mb-6">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Thun und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
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

              <article className="pt-8 border-t border-gray-200">
                <h2 className="heading-2">Unsere Partner für Thun bieten Ihnen</h2>
                <ul className="list-none space-y-3 mt-4">
                  {advantages.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <div className="text-center bg-green-50 p-8 rounded-lg border-l-4 border-green-500 shadow-md">
                <h3 className="heading-3">Jetzt Umzugsofferten für Thun einholen</h3>
                <p className="text-gray-700 mb-6 font-medium">
                  Mit nur einer Anfrage erhalten Sie bis zu fünf kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Thun.
                </p>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Thun">
                    Offerten für Thun vergleichen
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </main>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </section>
      </div>
    </>
  );
};

export default UmzugsfirmaThunPageClient;



