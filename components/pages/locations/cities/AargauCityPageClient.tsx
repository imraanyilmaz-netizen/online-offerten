'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, MapPin, Building, Home, Package, Globe, Truck, ShieldCheck, Clock, Users } from 'lucide-react'
import { aargauCityData } from '@/data/aargauCityData'
import type { AargauCityData } from '@/data/aargauCityData'

interface AargauCityPageClientProps {
  city: string
}

const AargauCityPageClient: React.FC<AargauCityPageClientProps> = ({ city }) => {
  const cityData: AargauCityData | undefined = aargauCityData[city.toLowerCase()]
  
  if (!cityData) {
    return <div>Stadt nicht gefunden</div>
  }

  const cityName = cityData.name
  const canonicalUrl = `/umzugsfirma/aargau/${city}`

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

  const services = [
    { name: 'Privatumzug', icon: Home, link: '/umzugsfirma/privatumzug' },
    { name: 'Geschäftsumzug', icon: Building, link: '/umzugsfirma/geschaeftsumzug' },
    { name: 'Internationaler Umzug', icon: Globe, link: '/umzugsfirma/internationale-umzuege' },
    { name: 'Spezialtransport', icon: Package, link: '/umzugsfirma/spezialtransporte' }
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
              <Link href="/umzugsfirma/aargau" className="text-gray-600 hover:text-green-600">Umzugsfirma Aargau</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{cityName}</span>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            {/* Portal-focused Introduction - First paragraph per plan */}
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
                    const matchingService = services.find(s => s.name === serviceDetail.name);
                    return (
                      <div
                        key={index}
                        className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-all"
                      >
                        {matchingService && (
                          <matchingService.icon className="w-8 h-8 text-green-600 mb-3" />
                        )}
                        <h3 className="heading-3">
                          {serviceDetail.name}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {serviceDetail.description}
                        </p>
                        {matchingService && (
                          <Link href={matchingService.link} className="inline-flex items-center mt-4 text-green-600 hover:text-green-800 font-semibold">
                            Mehr erfahren
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        href={service.link}
                        className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg"
                      >
                        <service.icon className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {service.name}
                        </h3>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>

            {/* Local Features */}
            <article className="mb-12">
              <h2 className="heading-2">Umzugs-Herausforderungen in {cityName}</h2>
              <p className="text-gray-700 leading-relaxed">
                {cityData.localFeatures}
              </p>
            </article>

            {/* Advantages */}
            <article className="mb-12">
              <h2 className="heading-2">Vorteile eines Umzugs nach {cityName}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {cityData.advantages}
              </p>
              {cityData.advantagesExtended && (
                <p className="text-gray-700 leading-relaxed">
                  {cityData.advantagesExtended}
                </p>
              )}
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

            {/* Internal Links - Varied anchor texts per plan */}
            <article className="mb-12">
              <h2 className="heading-2">Weitere Informationen</h2>
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Erfahren Sie mehr über <Link href="/umzugsfirma/aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Zurück zur Aargau-Übersicht</Link>, <Link href="/umzugsfirma/aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Alle Umzugsfirmen im Aargau</Link> oder <Link href="/umzugsfirma/aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Weitere Standorte im Kanton</Link>. Informieren Sie sich auch über die <Link href="/umzugskosten-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten in {cityName} berechnen</Link>, die <Link href="/umzugskosten-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Preise für Umzüge in {cityName}</Link> oder <Link href="/umzugskosten-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Was kostet ein Umzug nach {cityName}?</Link>.
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

export default AargauCityPageClient



