'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, MapPin, Building, Home, Package, Globe, Truck, ShieldCheck, Clock, Users, Calculator } from 'lucide-react'
import { zurichCityData } from '@/data/zurichCityData'
import type { ZurichCityData } from '@/data/zurichCityData'
import ServiceGrid from '@/components/pages/locations/ServiceGrid.client'

interface ZurichCityPageClientProps {
  city: string
}

const ZurichCityPageClient: React.FC<ZurichCityPageClientProps> = ({ city }) => {
  const cityData: ZurichCityData | undefined = zurichCityData[city.toLowerCase()]
  
  if (!cityData) {
    return <div>Stadt nicht gefunden</div>
  }

  const cityName = cityData.name
  const canonicalUrl = `/umzugsfirma/zuerich/${city}`

  // Service Schema - Correct structure for location pages
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Umzugsvermittlung",
    "name": String(`Umzugsfirma ${cityName} vergleichen`),
    "description": `Geprüfte Umzugsfirmen und Zügelfirmen in ${cityName} vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen.`,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "City",
      "name": String(cityName),
      "containedInPlace": {
        "@type": "Country",
        "name": "Switzerland"
      }
    },
    "offers": {
      "@type": "Offer",
      "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${cityName}`,
      "price": "0",
      "priceCurrency": "CHF",
      "name": "Kostenlose Umzugsofferten"
    }
  }

  // Combined Schema
  const combinedSchema = {
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
            "name": `Umzugsfirma ${cityName}`,
            "item": `https://online-offerten.ch${canonicalUrl}`
          }
        ]
      },
      serviceSchema
    ]
  }

  // Cost table data - Hourly rates
  const hourlyRates = [
    { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 110.-" },
    { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 170.-" },
    { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 210.-" },
    { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 270.-" },
    { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 325.-" },
    { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 395.-" }
  ]

  // Cost table data - By room size
  const costTableRows = [
    { size: "1.5-Zimmer-Wohnung", cost: "CHF 620 - 660" },
    { size: "2.5-Zimmer-Wohnung", cost: "CHF 660 - 980" },
    { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'080 - 1'250" },
    { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'420 - 1'890" },
    { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'980 - 2'490" },
    { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'490 - 3'150" }
  ]

  const benefits = [
    { icon: ShieldCheck, title: 'Geprüfte Partner', text: 'Alle Umzugsfirmen sind geprüfte Partner nach Schweizer Standards' },
    { icon: Clock, title: 'Schnelle Antworten', text: 'Erhalten Sie Offerten oft innerhalb von 24 Stunden' },
    { icon: Users, title: 'Lokale Expertise', text: `Umzugsfirmen in ${cityName} kennen die lokalen Besonderheiten` },
    { icon: CheckCircle, title: 'Transparente Preise', text: 'Vergleichen Sie mehrere Offerten und finden Sie das beste Angebot' }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-4xl">
              <h1 className="heading-1">
                Umzugsfirma {cityName} – Geprüfte Anbieter vergleichen
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                Kostenlose Offerten von geprüften Umzugsfirmen in {cityName} vergleichen und die beste Firma für Ihren Umzug finden. Professionelle Zügelfirmen bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug und Spezialtransporte.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/kostenlose-offerte-anfordern?service=umzug&city=${cityName}`}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base">
                    {cityData.ctaVariations && cityData.ctaVariations[0] ? cityData.ctaVariations[0] : 'Kostenlose Offerte anfordern'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4 border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-green-600">Start</Link>
              <span className="text-gray-400">/</span>
              <Link href="/umzugsfirma/zuerich" className="text-gray-600 hover:text-green-600">Umzugsfirma Zürich</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{cityName}</span>
            </nav>
          </div>
        </section>

        {/* Service Selection Cards */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="heading-2 text-center mb-8">
              Wählen Sie Ihre gewünschte Dienstleistung
            </h2>
            <ServiceGrid city={cityName} />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            {/* Portal-focused Introduction */}
            <article className="mb-12 bg-green-50 rounded-xl p-8 md:p-10 border border-green-200">
              <h2 className="heading-2">
                Umzugsfirma {cityName} vergleichen – Kostenlose Offerten geprüfter Anbieter
              </h2>
              {cityData.portalIntro && (
                <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                  {cityData.portalIntro}
                </p>
              )}
              <p className="text-gray-700 leading-relaxed mb-4">
                {cityData.intro}
              </p>
              {cityData.humanParagraph && (
                <p className="text-gray-700 leading-relaxed mb-4 italic">
                  {cityData.humanParagraph}
                </p>
              )}
            </article>

            {/* Local Facts */}
            <article className="mb-12">
              <h2 className="heading-2">Lokale Besonderheiten in {cityName}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <MapPin className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="heading-3">Infrastruktur</h3>
                  <p className="text-gray-700 leading-relaxed">{cityData.infrastructure}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <Building className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="heading-3">Wohnungstypen</h3>
                  <p className="text-gray-700 leading-relaxed">{cityData.housingTypes}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <Truck className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="heading-3">Logistische Herausforderungen</h3>
                  <p className="text-gray-700 leading-relaxed">{cityData.logisticsChallenges}</p>
                </div>
              </div>
            </article>

            {/* Services */}
            <article className="mb-12">
              <h2 className="heading-2">Leistungen der Umzugsfirmen in {cityName}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {cityData.services}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {cityData.serviceDetails && cityData.serviceDetails.length > 0 ? (
                  cityData.serviceDetails.map((serviceDetail, index) => {
                    const iconMap: Record<string, typeof Home> = {
                      'Privatumzug': Home,
                      'Geschäftsumzug': Building,
                      'Internationaler Umzug': Globe,
                      'Spezialtransport': Package
                    }
                    const Icon = iconMap[serviceDetail.name] || Home
                    
                    // Service links mapping
                    const serviceLinks: Record<string, string> = {
                      'Privatumzug': '/umzugsfirma/privatumzug',
                      'Geschäftsumzug': '/umzugsfirma/geschaeftsumzug',
                      'Internationaler Umzug': '/umzugsfirma/internationale-umzuege',
                      'Spezialtransport': '/umzugsfirma/spezialtransporte'
                    }
                    const serviceLink = serviceLinks[serviceDetail.name] || '#'
                    
                    return (
                      <div
                        key={index}
                        className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-all"
                      >
                        <Icon className="w-8 h-8 text-green-600 mb-3" />
                        <h3 className="heading-3">
                          {serviceDetail.name}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {serviceDetail.description}
                        </p>
                        <Link href={serviceLink} className="inline-flex items-center mt-4 text-green-600 hover:text-green-800 font-semibold">
                          Mehr erfahren
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </div>
                    );
                  })
                ) : null}
              </div>
            </article>

            {/* Umzugskosten */}
            <article className="mb-12">
              <h2 className="heading-2">Was kostet ein Umzug mit einer Umzugsfirma in {cityName}?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in {cityName} richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von {cityName} und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
              </p>
              
              {/* Hourly Rates Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                  <h3 className="heading-3 text-white">Umzugspreise - Kosten pro Stunde</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">Umzugswagen und Zügelmänner (ca. 25 m³)</th>
                        <th className="px-6 py-4 text-right font-semibold text-gray-900 border-b border-gray-200">Preis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hourlyRates.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-100 text-gray-700">{row.service}</td>
                          <td className="px-6 py-4 border-b border-gray-100 text-right font-semibold text-green-600">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Room Size Costs Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                  <h3 className="heading-3 text-white">Umzugskosten nach Zimmergrössen</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">Anzahl Zimmer</th>
                        <th className="px-6 py-4 text-right font-semibold text-gray-900 border-b border-gray-200">Umzugskosten durchschnittlich (CHF)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costTableRows.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 border-b border-gray-100 text-gray-700">{row.size}</td>
                          <td className="px-6 py-4 border-b border-gray-100 text-right font-semibold text-green-600">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic">
                    Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                  </p>
                </div>
              </div>
            </article>

            {/* Local Features */}
            <article className="mb-12">
              <h2 className="heading-2">Umzugs-Herausforderungen in {cityName}</h2>
              <p className="text-gray-700 leading-relaxed">
                {cityData.localFeatures}
              </p>
            </article>

            {/* Advantages - Shortened */}
            <article className="mb-12">
              <h2 className="heading-2">Vorteile eines Umzugs nach {cityName}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {cityData.advantages}
              </p>
            </article>

            {/* Benefits */}
            <article className="mb-12">
              <h2 className="heading-2">Ihre Vorteile mit online-offerten.ch</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <benefit.icon className="w-10 h-10 text-green-600 mb-4" />
                    <h3 className="heading-3">{benefit.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* FAQ */}
            <article className="mb-12">
              <h2 className="heading-2">Häufige Fragen zu Umzügen in {cityName}</h2>
              <div className="space-y-4">
                {cityData.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="heading-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Internal Links */}
            <article className="mb-12">
              <h2 className="heading-2">Weitere Informationen</h2>
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Erfahren Sie mehr über <Link href="/umzugsfirma/zuerich" className="text-green-600 hover:text-green-800 underline font-semibold">Zurück zur Zürich-Übersicht</Link>, <Link href="/umzugsfirma/zuerich" className="text-green-600 hover:text-green-800 underline font-semibold">Alle Umzugsfirmen im Kanton Zürich</Link> oder <Link href="/umzugsfirma/zuerich" className="text-green-600 hover:text-green-800 underline font-semibold">Weitere Standorte im Kanton</Link>.
                </p>
              </div>
            </article>

            {/* CTA */}
            <article className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="heading-2">Jetzt kostenlose Offerte für {cityName} anfordern</h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Vergleichen Sie mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={`/kostenlose-offerte-anfordern?service=umzug&city=${cityName}`}>
                  <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                    {cityData.ctaVariations && cityData.ctaVariations[1] ? cityData.ctaVariations[1] : 'Kostenlose Offerte anfordern'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                {cityData.ctaVariations && cityData.ctaVariations[2] && (
                  <Link href={`/kostenlose-offerte-anfordern?service=umzug&city=${cityName}`}>
                    <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                      {cityData.ctaVariations[2]}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  )
}

export default ZurichCityPageClient



