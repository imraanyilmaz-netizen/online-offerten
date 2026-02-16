'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle, AlertTriangle, Calculator, MapPin, ShieldCheck, TrendingUp } from 'lucide-react'

const KlaviertransportKostenPageClient = () => {
  const quoteUrl = "/kostenlose-offerte-anfordern"

  // Pricing table data
  const costTableRows = [
    {
      situation: "Klaviertransport EG zu EG",
      price: "ab 350.–"
    },
    {
      situation: "1.–2. Stock ohne Lift",
      price: "ab 420.–"
    },
    {
      situation: "Mehrere Etagen ohne Lift",
      price: "ab 500.–"
    },
    {
      situation: "Flügeltransport",
      price: "ab 700.–"
    },
    {
      situation: "Einsatz Möbellift / Kran",
      price: "ab 200.–"
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <nav className="mb-6 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">
                  Umzugsfirma
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/umzugsfirma/spezialtransporte" className="hover:text-green-600 transition-colors">
                  Spezialtransporte
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/umzugsfirma/spezialtransporte/klaviertransport" className="hover:text-green-600 transition-colors">
                  Klaviertransport
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Kosten
              </li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="heading-1 mb-6">
                Klaviertransport Kosten in der Schweiz – Preise, Faktoren & Spartipps
              </h1>
              <p className="text-body text-lg leading-relaxed mb-8">
                Was kostet ein Klaviertransport in der Schweiz? Diese Frage stellen sich viele, die ein Klavier oder einen Flügel sicher transportieren möchten. Die Kosten für einen professionellen Klaviertransport hängen von mehreren Faktoren ab und lassen sich nicht pauschal festlegen. Auf dieser Seite erfahren Sie, welche Preisfaktoren entscheidend sind, mit welchen Richtwerten Sie rechnen können und wie Sie durch den Vergleich mehrerer Offerten bis zu 40 % sparen.
              </p>
            </div>
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/umzug/25484813265.webp"
                alt="Klaviertransport Kosten in der Schweiz"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl space-y-12">
          
          {/* Wovon hängen die Kosten ab */}
          <section id="kostenfaktoren">
            <h2 className="heading-2 mb-6">Wovon hängen die Klaviertransport Kosten ab?</h2>
            <p className="text-body leading-relaxed mb-6">
              Die Preise für einen Klaviertransport variieren je nach Situation. Die wichtigsten Kostenfaktoren sind:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="heading-3 mb-3">Art und Gewicht des Instruments</h3>
                <p className="text-body leading-relaxed">
                  Ein Pianino ist deutlich günstiger zu transportieren als ein Flügel. Besonders Konzertflügel mit einem Gewicht von bis zu 1.000 kg erfordern einen erheblich höheren Aufwand.
                </p>
              </div>

              <div>
                <h3 className="heading-3 mb-3">Transportdistanz</h3>
                <p className="text-body leading-relaxed">
                  Ob innerhalb derselben Stadt oder quer durch die Schweiz – je länger die Distanz zwischen Abhol- und Zielort, desto höher die Kosten.
                </p>
              </div>

              <div>
                <h3 className="heading-3 mb-3">Etagen, Treppen und Lift</h3>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li><strong>Erdgeschoss</strong> → günstigste Variante</li>
                  <li><strong>Mehrere Stockwerke ohne Lift</strong> → höherer Aufwand</li>
                  <li><strong>Enge oder gewundene Treppen</strong> → Kostensteigerung</li>
                </ul>
              </div>

              <div>
                <h3 className="heading-3 mb-3">Zugänglichkeit</h3>
                <p className="text-body leading-relaxed">
                  Enge Türen, schmale Gänge oder empfindliche Böden erhöhen den Aufwand. In manchen Fällen ist der Einsatz eines Möbellifts oder Krans notwendig.
                </p>
              </div>

              <div>
                <h3 className="heading-3 mb-3">Zusatzleistungen</h3>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Zwischenlagerung des Klaviers</li>
                  <li>Demontage / Montage (bei Flügeln)</li>
                  <li>Entsorgung eines alten Instruments</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Richtpreise */}
          <section id="richtpreise">
            <h2 className="heading-2 mb-6">Richtpreise für einen Klaviertransport in der Schweiz</h2>
            <p className="text-body leading-relaxed mb-6">
              Die folgenden Preise dienen als Orientierungswerte:
            </p>

            {/* Pricing Table */}
            <Card className="border-2 border-green-100 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <th className="px-6 py-4 text-left font-bold text-lg">Situation</th>
                        <th className="px-6 py-4 text-right font-bold text-lg">Preis ab (CHF)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costTableRows.map((row, index) => (
                        <tr 
                          key={index}
                          className={`border-b border-gray-200 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          } hover:bg-green-50 transition-colors`}
                        >
                          <td className="px-6 py-4 text-body font-medium">{row.situation}</td>
                          <td className="px-6 py-4 text-right text-body font-semibold text-green-700">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-body font-semibold text-amber-900 mb-1">Wichtig:</p>
                  <p className="text-body text-amber-800">
                    Der effektive Preis hängt immer von den individuellen Gegebenheiten ab. Eine verbindliche Offerte erhalten Sie erst nach genauer Prüfung.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Kosten senken */}
          <section id="kosten-senken">
            <h2 className="heading-2 mb-6">Klaviertransport Kosten senken – so sparen Sie bis zu 40 %</h2>
            <p className="text-body leading-relaxed mb-6">
              Viele Kunden zahlen unnötig zu viel, weil sie nur eine einzige Offerte einholen. Der effektivste Weg zu sparen ist der Vergleich mehrerer spezialisierter Anbieter.
            </p>

            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="heading-3 mb-4">So sparen Sie Geld:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Mehrere Offerten vergleichen</strong> – Der Vergleich zeigt Ihnen die besten Preise</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Lokale Firmen bevorzugen</strong> – Kürzere Anfahrtswege bedeuten niedrigere Kosten</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Flexible Termine wählen</strong> – Ausserhalb der Hauptsaison sind Preise oft günstiger</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Zusatzleistungen nur bei Bedarf buchen</strong> – Sparen Sie, indem Sie nur das Nötigste beauftragen</span>
                </li>
              </ul>
            </div>

            <p className="text-body leading-relaxed">
              Über unsere Plattform erhalten Sie bis zu 5 kostenlose und unverbindliche Offerten von geprüften Klaviertransportfirmen.
            </p>
          </section>

          {/* Kosten vs. Eigenleistung */}
          <section id="kosten-vs-eigenleistung">
            <h2 className="heading-2 mb-6">Klaviertransport Kosten vs. Eigenleistung – lohnt sich selber tragen?</h2>
            <p className="text-body leading-relaxed mb-6">
              Ein Klavier selbst zu transportieren scheint auf den ersten Blick günstiger, ist jedoch mit hohen Risiken verbunden:
            </p>

            <div className="bg-red-50 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Beschädigung des Instruments</strong> – Reparaturen können teurer sein als ein professioneller Transport</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Schäden an Treppenhäusern oder Böden</strong> – Haftung für Gebäudeschäden</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Verletzungsgefahr</strong> – Rücken, Gelenke und andere Verletzungen durch falsches Heben</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-body"><strong>Keine Versicherung bei Schäden</strong> – Bei Eigenleistung haften Sie selbst</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 rounded-r-lg p-4">
              <p className="text-body font-semibold">
                ⚡ Ein professioneller Klaviertransport ist keine Luxusleistung, sondern eine sichere und oft langfristig günstigere Lösung.
              </p>
            </div>
          </section>

          {/* Versicherung */}
          <section id="versicherung">
            <h2 className="heading-2 mb-6">Sind die Klaviertransporte versichert?</h2>
            <p className="text-body leading-relaxed">
              Ja. Alle geprüften Partnerfirmen verfügen über eine Transportversicherung, die Schäden am Instrument während des gesamten Transports abdeckt. Die genauen Versicherungsbedingungen sind transparent in der jeweiligen Offerte aufgeführt.
            </p>
          </section>

          {/* CTA Section */}
          <section id="cta" className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="heading-2 text-white mb-4">Jetzt Klaviertransport Kosten vergleichen & sparen</h2>
            <p className="text-lg md:text-xl text-green-50 mb-8 leading-relaxed">
              Erhalten Sie in wenigen Minuten mehrere Offerten von spezialisierten Klaviertransportfirmen aus Ihrer Region. Der Vergleich ist 100 % kostenlos, unverbindlich und hilft Ihnen, den besten Preis zu finden.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 font-bold text-lg px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              <Link href={`${quoteUrl}?service=umzug&step=2&umzugArt=spezialtransport&special_transport_type=klaviertransport`}>
                Jetzt Klaviertransport Kosten in der Schweiz vergleichen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>

        </div>
      </div>
    </div>
  )
}

export default KlaviertransportKostenPageClient



