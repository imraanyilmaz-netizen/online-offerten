'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award,
  Star, MapPin, Home, Building, Globe, Sparkles, FileText, Search,
  Truck, Navigation, Mail, ChevronRight, Paintbrush, Recycle,
  Package, Zap, Target, HeartHandshake, CheckCircle2, Layers, Grid2x2, SprayCan, Hammer,
  BarChart3, BadgePercent, ArrowUpDown
} from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'

const OffertenPortalPageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/offerten-portal'

  // Structured Data (Schema.org)
  useEffect(() => {
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
              "name": "Offertenportal",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "WebApplication",
          "name": "Online-Offerten.ch – Offertenportal Schweiz",
          "applicationCategory": "Vergleichsportal",
          "description": "Kostenloses Vergleichsportal für Umzug, Reinigung und Malerarbeiten in der Schweiz. Vergleichen Sie bis zu 5 Offerten von geprüften Firmen.",
          "url": canonicalUrl,
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CHF",
            "description": "Kostenloser Offerten-Vergleich"
          },
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch",
            "logo": "https://online-offerten.ch/image/logo-icon.webp"
          }
        },
        {
          "@type": "Service",
          "serviceType": "Vermittlung von Dienstleistungsangeboten",
          "name": "Offertenportal für Umzug, Reinigung und Malerarbeiten in der Schweiz",
          "description": "Vergleichen Sie kostenlos und unverbindlich Offerten für Umzüge, Reinigungen und Malerarbeiten. Bis zu 5 Offerten von geprüften Firmen aus Ihrer Region.",
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch",
            "logo": "https://online-offerten.ch/image/logo-icon.webp"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Verfügbare Dienstleistungen",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzugsdienstleistungen" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reinigungsdienstleistungen" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Malerarbeiten" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Räumung & Entsorgung" } }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Ist die Nutzung von Online-Offerten.ch wirklich kostenlos?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ja, absolut. Unser Service ist für Sie als Auftraggeber von der Anfrage bis zur Auftragsvergabe komplett kostenlos und unverbindlich. Sie zahlen nur die Firma, die Sie am Ende beauftragen." }
            },
            {
              "@type": "Question",
              "name": "Wie viele Offerten erhalte ich?",
              "acceptedAnswer": { "@type": "Answer", "text": "Sie erhalten in der Regel bis zu 5 Offerten von passenden Firmen aus Ihrer Region. So haben Sie eine gute Auswahl, um Preise und Leistungen zu vergleichen." }
            },
            {
              "@type": "Question",
              "name": "Sind die Firmen auf dem Portal geprüft?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ja. Jede Firma wird von uns sorgfältig geprüft. Wir kontrollieren unter anderem den Handelsregistereintrag und das Vorhandensein einer Betriebshaftpflichtversicherung." }
            },
            {
              "@type": "Question",
              "name": "Bin ich verpflichtet, eine der Offerten anzunehmen?",
              "acceptedAnswer": { "@type": "Answer", "text": "Nein, Ihre Anfrage ist absolut unverbindlich. Wenn Ihnen keine der Offerten zusagt, müssen Sie keinen Auftrag vergeben." }
            },
            {
              "@type": "Question",
              "name": "Wie schnell erhalte ich die Offerten?",
              "acceptedAnswer": { "@type": "Answer", "text": "Die meisten Firmen melden sich innerhalb von 24-48 Stunden mit einer Offerte bei Ihnen. Oft erhalten Sie die ersten Offerten sogar schon nach wenigen Stunden." }
            },
            {
              "@type": "Question",
              "name": "Was kostet ein Umzug in der Schweiz?",
              "acceptedAnswer": { "@type": "Answer", "text": "Die Kosten variieren je nach Umfang, Distanz und Zusatzleistungen. Ein durchschnittlicher Wohnungsumzug kostet zwischen CHF 1'500 und CHF 4'000. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen." }
            },
            {
              "@type": "Question",
              "name": "Was ist die Abnahmegarantie bei Reinigungen?",
              "acceptedAnswer": { "@type": "Answer", "text": "Die Abnahmegarantie bedeutet, dass die Reinigungsfirma bei der Wohnungsübergabe anwesend ist und kostenlos nachreinigt, bis der Vermieter die Sauberkeit bestätigt." }
            },
            {
              "@type": "Question",
              "name": "Welche Malerarbeiten werden angeboten?",
              "acceptedAnswer": { "@type": "Answer", "text": "Unsere Partner bieten Innenanstriche, Fassadenanstriche, Tapezierarbeiten und Lackierarbeiten an. Von der Farbberatung bis zur Ausführung – alles aus einer Hand." }
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'offerten-portal-schema'

    const existing = document.getElementById('offerten-portal-schema')
    if (existing && existing.parentNode) {
      try { existing.remove() } catch (e) { /* */ }
    }

    document.head.appendChild(script)

    return () => {
      if (typeof document === 'undefined') return
      const scriptToRemove = document.getElementById('offerten-portal-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        try { scriptToRemove.remove() } catch (e) { /* */ }
      }
    }
  }, [])
  
  const faqItems = [
    {
      q: "Ist die Nutzung von Online-Offerten.ch wirklich kostenlos?",
      a: "Ja, absolut. Unser Service ist für Sie als Auftraggeber von der Anfrage bis zur Auftragsvergabe komplett kostenlos und unverbindlich. Sie zahlen nur die Firma, die Sie am Ende beauftragen."
    },
    {
      q: "Wie viele Offerten erhalte ich?",
      a: "Sie erhalten in der Regel bis zu 5 Offerten von passenden Firmen aus Ihrer Region. So haben Sie eine gute Auswahl, um Preise und Leistungen zu vergleichen."
    },
    {
      q: "Sind die Firmen auf dem Portal geprüft?",
      a: "Ja. Jede Firma wird von uns sorgfältig geprüft. Wir kontrollieren unter anderem den Handelsregistereintrag und das Vorhandensein einer Betriebshaftpflichtversicherung."
    },
    {
      q: "Bin ich verpflichtet, eine der Offerten anzunehmen?",
      a: "Nein, Ihre Anfrage ist absolut unverbindlich. Wenn Ihnen keine der Offerten zusagt, müssen Sie keinen Auftrag vergeben."
    },
    {
      q: "Wie schnell erhalte ich die Offerten?",
      a: "Die meisten Firmen melden sich innerhalb von 24-48 Stunden mit einer Offerte bei Ihnen. Oft erhalten Sie die ersten Offerten sogar schon nach wenigen Stunden."
    },
    {
      q: "Was kostet ein Umzug in der Schweiz?",
      a: "Die Kosten variieren je nach Umfang, Distanz und Zusatzleistungen. Ein durchschnittlicher Wohnungsumzug kostet zwischen CHF 1'500 und CHF 4'000. Durch den Vergleich mehrerer Offerten auf unserem Vergleichsportal können Sie bis zu 40% sparen."
    },
    {
      q: "Was ist die Abnahmegarantie bei Reinigungen?",
      a: "Die Abnahmegarantie bedeutet, dass die Reinigungsfirma bei der Wohnungsübergabe anwesend ist und kostenlos nachreinigt, bis der Vermieter die Sauberkeit im Abnahmeprotokoll bestätigt."
    },
    {
      q: "Welche Malerarbeiten werden angeboten?",
      a: "Unsere Partner bieten Innenanstriche, Fassadenanstriche, Tapezierarbeiten und Lackierarbeiten an. Von der Farbberatung bis zur professionellen Ausführung – alles aus einer Hand."
    }
  ]

  const locations = [
    { name: 'Zürich', href: '/umzugsfirma/zuerich' },
    { name: 'Bern', href: '/umzugsfirma/bern' },
    { name: 'Basel', href: '/umzugsfirma/basel' },
    { name: 'Luzern', href: '/umzugsfirma/luzern' },
    { name: 'St. Gallen', href: '/umzugsfirma/st-gallen' },
    { name: 'Lausanne', href: '/umzugsfirma/lausanne' },
    { name: 'Genf', href: '/umzugsfirma/genf' },
    { name: 'Lugano', href: '/umzugsfirma/lugano' },
    { name: 'Biel/Bienne', href: '/umzugsfirma/biel-bienne' },
    { name: 'Thun', href: '/umzugsfirma/thun' },
    { name: 'Winterthur', href: '/umzugsfirma/zuerich/winterthur' },
    { name: 'Aargau', href: '/umzugsfirma/aargau' },
  ]

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gray-100"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-3">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ihr Vergleichsportal für die Schweiz
              </div>
              <h1 className="heading-1 !mt-0">
                Offerten von Umzugsfirma & Reinigungsfirma vergleichen
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Willkommen auf <strong>Online-Offerten.ch</strong> – Ihrem zentralen Vergleichsportal für <Link href="/umzugsfirma" className="text-green-700 hover:text-green-800 underline font-medium">Umzug</Link>, <Link href="/reinigung" className="text-green-700 hover:text-green-800 underline font-medium">Reinigung</Link> und <Link href="/malerarbeitenkosten" className="text-green-700 hover:text-green-800 underline font-medium">Malerarbeiten</Link> in der ganzen Schweiz. Mit nur einer Anfrage erhalten Sie bis zu 5 Offerten von geprüften Firmen aus Ihrer Region.
              </p>

              {/* Service Buttons */}
              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Dienstleistung:</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Umzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Privat, Geschäft, International</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-yellow-100 group-hover:bg-yellow-500 transition-colors">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Reinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">End-, Büro-, Fensterreinigung</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=maler&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Paintbrush className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Malerarbeiten</p>
                    <p className="text-xs text-gray-600 mt-0.5">Innen-, Fassadenanstrich</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=raeumung&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-pink-500 hover:bg-pink-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-pink-100 group-hover:bg-pink-500 transition-colors">
                    <Recycle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Räumung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Entrümpelung & Entsorgung</p>
                  </div>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Versicherte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>100% kostenlos & unverbindlich</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Geprüfte Partnerfirmen</span>
                </div>
              </div>
            </div>

            {/* Side Card */}
            <div className="relative md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <BarChart3 className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="heading-3 text-center">
                  Ihr Vergleichsportal
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Search, title: 'Schnell & einfach', description: 'Nur eine Anfrage für bis zu 5 Offerten' },
                    { icon: ShieldCheck, title: 'Nur geprüfte Firmen', description: 'Alle Partner sind versichert und qualitätsgeprüft' },
                    { icon: TrendingUp, title: 'Transparent vergleichen', description: 'Preise, Leistungen und Bewertungen auf einen Blick' },
                    { icon: HeartHandshake, title: 'Unverbindlich', description: 'Keine Verpflichtung – die Entscheidung liegt bei Ihnen' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <feature.icon className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <h2 className="heading-2">
              So einfach funktioniert's –<br />Offerten vergleichen in 3 Schritten
            </h2>
                            </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihren Auftrag in wenigen Minuten. Je genauer Ihre Angaben, desto präziser die Offerten. Wählen Sie einfach zwischen Umzug, Reinigung oder Malerarbeiten.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: "Sie erhalten bis zu 5 massgeschneiderte Offerten von qualitätsgeprüften Firmen aus Ihrer Region. Die Anbieter nehmen direkt Kontakt mit Ihnen auf.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & beauftragen",
                description: "Vergleichen Sie Preise und Leistungen in Ruhe. Wählen Sie die Firma, die am besten zu Ihren Bedürfnissen passt. 100% unverbindlich.",
                icon: Star
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-green-200 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <Card className="relative z-10 h-full border-2 border-green-200 hover:border-green-500 transition-colors">
                  <CardHeader className="text-center">
                    <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <step.icon className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-center">{step.description}</p>
                  </CardContent>
                </Card>
                            </div>
            ))}
                    </div>
                </div>
            </section>

      {/* ===== PORTAL INTRO / ABOUT ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-3">
                <Target className="h-4 w-4 mr-2" />
                Vergleichsportal Schweiz
              </div>
              <h2 className="heading-2 !mt-0">
                Willkommen auf dem Offertenportal Schweiz
              </h2>
              <p className="text-body mb-6">
                Online-Offerten.ch ist Ihr zentrales <strong>Vergleichsportal</strong>, um schnell, einfach und kostenlos die besten Offerten für Umzüge, Reinigungen und Malerarbeiten in der gesamten Schweiz zu finden. Wir verbinden Sie mit einem Netzwerk von über 200 geprüften und qualifizierten Fachfirmen.
              </p>
              <p className="text-body mb-6">
                Egal ob Sie einen Privatumzug planen, eine professionelle <Link href="/reinigung/umzugsreinigung" className="text-green-700 hover:text-green-800 underline font-medium">Endreinigung</Link> benötigen oder Ihre Wände neu streichen lassen möchten – unser Offertenportal spart Ihnen Zeit, Geld und Nerven. Mit nur einer Anfrage erreichen Sie mehrere Anbieter und können deren Offerten bequem online <Link href="/umzugsfirma-vergleichen" className="text-green-700 hover:text-green-800 underline font-medium">vergleichen</Link>.
              </p>

              <div className="mb-6">
                <h3 className="heading-3">Ihre Vorteile auf einen Blick:</h3>
                <ul className="space-y-3 text-body">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Kostenlos & unverbindlich</strong> – keine versteckten Gebühren</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Bis zu 5 Offerten</strong> von geprüften Firmen aus Ihrer Region</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Bis zu 40% sparen</strong> durch direkten Preisvergleich</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span><strong>Alle Dienstleistungen</strong> – Umzug, Reinigung, Maler & Räumung</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hidden lg:block">
              <NextImage
                src="/bilder/umzugshilfe-finden-vergleichen.webp"
                alt="Offertenportal Schweiz – Offerten vergleichen"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Warum ein Vergleichsportal nutzen?
            </h3>
            <p className="text-body">
              Studien zeigen, dass die Kosten für identische Leistungen um bis zu 40% variieren können. Ein Vergleich mehrerer Anbieter ist der Schlüssel zu einem fairen Preis. Mit unserem Offertenportal erhalten Sie mit nur einer Anfrage bis zu 5 detaillierte Offerten von geprüften Firmen – ohne mühsames Suchen und Telefonieren. So behalten Sie die volle Kontrolle und treffen die beste Entscheidung.
            </p>
          </div>
        </div>
      </section>

      {/* ===== UMZUG SECTION ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
            <Truck className="h-4 w-4 mr-2" />
            Umzugsofferten vergleichen
          </div>
          <h2 className="heading-2 !mt-0">
            Alles rund um Ihren Umzug
          </h2>
          <p className="text-body mb-6">
            Ein Umzug muss nicht stressig sein. Auf unserem Vergleichsportal finden Sie spezialisierte Umzugsfirmen für jede Art von Umzug – ob in <Link href="/umzugsfirma/zuerich" className="text-green-700 hover:text-green-800 underline font-medium">Zürich</Link>, <Link href="/umzugsfirma/bern" className="text-green-700 hover:text-green-800 underline font-medium">Bern</Link>, <Link href="/umzugsfirma/basel" className="text-green-700 hover:text-green-800 underline font-medium">Basel</Link> oder einer anderen Stadt in der Schweiz.
          </p>

          <p className="text-sm font-semibold text-gray-700 mb-2">Umzugsart auswählen:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-8">
            {[
              { label: 'Privatumzug', sub: 'Wohnungsumzug', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug', icon: Home, color: 'blue' },
              { label: 'Geschäftsumzug', sub: 'Firmenumzug', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug', icon: Building, color: 'purple' },
              { label: 'Auslandumzug', sub: 'International', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international', icon: Globe, color: 'emerald' },
              { label: 'Klaviertransport', sub: 'Piano & Flügel', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport', icon: PiPianoKeysFill, color: 'amber' },
              { label: 'Kleintransport', sub: 'Einzelne Gegenstände', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport', icon: Package, color: 'teal' },
              { label: 'Möbellift', sub: 'Bis 400 kg, 27m', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=moebellift', icon: ArrowUpDown, color: 'indigo' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-${item.color}-500 hover:bg-${item.color}-50 hover:shadow-md group`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-${item.color}-100 group-hover:bg-${item.color}-500 transition-colors`}>
                  <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${item.color}-600 group-hover:text-white transition-colors`} />
                </div>
                <div className="flex-1 text-left sm:text-center">
                  <p className="font-semibold text-sm sm:text-base text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="heading-3">Unsere Umzugsdienstleistungen</h3>
          <p className="text-body mb-4">Unsere Partner bieten ein breites Spektrum an Umzugsdienstleistungen an:</p>
          <ul className="text-body list-disc pl-5 space-y-2 mb-6">
            <li><Link href="/umzugsfirma/privatumzug" className="text-green-700 hover:text-green-800 underline font-semibold">Privatumzüge</Link>: Vom kleinen Apartment bis zum grossen Einfamilienhaus.</li>
            <li><Link href="/umzugsfirma/geschaeftsumzug" className="text-green-700 hover:text-green-800 underline font-semibold">Geschäftsumzüge</Link>: Effiziente und schnelle Verlagerung von Büros und Gewerberäumen.</li>
            <li><Link href="/umzugsfirma/internationale-umzuege" className="text-green-700 hover:text-green-800 underline font-semibold">Internationale Umzüge</Link>: Komplettservice für Ihren Umzug ins oder aus dem Ausland.</li>
            <li><Link href="/umzugsfirma/spezialtransporte" className="text-green-700 hover:text-green-800 underline font-semibold">Spezialtransporte</Link>: Sicherer Transport von Klavieren, Kunstwerken und anderen wertvollen Gütern.</li>
            <li><strong>Klaviertransport</strong>: Professioneller und schonender Transport von Klavieren und Flügeln mit Spezialtechnik.</li>
            <li><strong>Möbellift</strong>: Bequemer Möbeltransport über das Fenster – ideal für schwere und sperrige Möbel bis 400 kg.</li>
          </ul>
          <p className="text-body">Erfahren Sie mehr über <Link href="/umzugsfirma/umzugskosten" className="text-green-700 hover:text-green-800 underline font-medium">Umzugskosten in der Schweiz</Link>.</p>
        </div>
            </section>
            
      {/* ===== REINIGUNG SECTION ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-yellow-700 font-semibold text-sm mb-3">
            <Sparkles className="h-4 w-4 mr-2" />
            Reinigungsofferten vergleichen
          </div>
          <h2 className="heading-2 !mt-0">
            Professionelle Reinigung mit Abnahmegarantie
          </h2>
          <p className="text-body mb-6">
            Eine besenreine Wohnung ist bei der Übergabe Pflicht. Unsere Partner für professionelle Reinigungen garantieren eine reibungslose Wohnungsabgabe. Informieren Sie sich über die <Link href="/reinigung/reinigungskosten" className="text-green-700 hover:text-green-800 underline font-medium">Reinigungskosten</Link> in der Schweiz.
          </p>

          <p className="text-sm font-semibold text-gray-700 mb-2">Reinigungsart auswählen:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-8">
            {[
              { label: 'Endreinigung', sub: 'mit Abnahmegarantie', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung', icon: Sparkles, color: 'blue' },
              { label: 'Büroreinigung', sub: 'Geschäftsräume', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=buero', icon: Building, color: 'emerald' },
              { label: 'Fensterreinigung', sub: 'Glas & Rahmen', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=fensterreinigung', icon: Grid2x2, color: 'teal' },
              { label: 'Grundreinigung', sub: 'Tiefenreinigung', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=grundreinigung', icon: Zap, color: 'amber' },
              { label: 'Baureinigung', sub: 'Nach Umbau', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=baureinigung', icon: Hammer, color: 'orange' },
              { label: 'Unterhaltsreinigung', sub: 'Regelmässig', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=unterhaltsreinigung', icon: SprayCan, color: 'indigo' },
              { label: 'Bodenreinigung', sub: 'Alle Bodenarten', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=bodenreinigung', icon: Layers, color: 'rose' },
              { label: 'Wohnungsreinigung', sub: 'Private Räume', href: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=wohnungsreinigung', icon: Home, color: 'purple' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-${item.color}-500 hover:bg-${item.color}-50 hover:shadow-md group`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-${item.color}-100 group-hover:bg-${item.color}-500 transition-colors`}>
                  <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${item.color}-600 group-hover:text-white transition-colors`} />
                </div>
                <div className="flex-1 text-left sm:text-center">
                  <p className="font-semibold text-sm sm:text-base text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="heading-3">Die Abnahmegarantie</h3>
          <p className="text-body mb-4">Was bedeutet die Abnahmegarantie? Die Reinigungsfirma verpflichtet sich:</p>
          <ul className="text-body list-disc pl-5 space-y-2 mb-6">
            <li>Bei der Wohnungsübergabe anwesend zu sein.</li>
            <li>Eventuelle Nachreinigungen sofort und ohne zusätzliche Kosten durchzuführen.</li>
            <li>Solange zu arbeiten, bis der Vermieter die Sauberkeit im Abnahmeprotokoll bestätigt.</li>
                    </ul>

          <h3 className="heading-3">Umfang unserer Reinigungsdienstleistungen</h3>
          <p className="text-body mb-4">Unsere Partner decken ein breites Spektrum an Reinigungsarbeiten ab:</p>
          <ul className="text-body list-disc pl-5 space-y-2 mb-4">
            <li><strong>Umzugsreinigung</strong>: Die komplette Endreinigung Ihrer alten Wohnung mit Abnahmegarantie.</li>
            <li><Link href="/reinigung/fensterreinigung" className="text-green-700 hover:text-green-800 underline font-semibold">Fensterreinigung</Link>: Streifenfreie Sauberkeit für Fenster, Rahmen und Storen.</li>
            <li><Link href="/reinigung/bueroreinigung" className="text-green-700 hover:text-green-800 underline font-semibold">Büroreinigung</Link>: Regelmässige Unterhaltsreinigung für saubere und repräsentative Geschäftsräume.</li>
            <li><Link href="/reinigung/baureinigung" className="text-green-700 hover:text-green-800 underline font-semibold">Baureinigung</Link>: Professionelle Reinigung nach Neu- oder Umbauten für einen sauberen Start.</li>
          </ul>
          <p className="text-body">Mehr Informationen finden Sie auf unserer Reinigungskosten-Seite.</p>
                </div>
            </section>

      {/* ===== MALER SECTION ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold text-sm mb-3">
            <Paintbrush className="h-4 w-4 mr-2" />
            Maler-Offerten vergleichen
          </div>
          <h2 className="heading-2 !mt-0">
            Professionelle Malerarbeiten für Ihr Zuhause
          </h2>
          <p className="text-body mb-6">
            Neue Farbe bringt frischen Wind in Ihre Räume. Unsere qualifizierten Malerpartner sorgen für ein perfektes Ergebnis, das lange Freude bereitet. Erfahren Sie mehr über <Link href="/malerarbeitenkosten" className="text-green-700 hover:text-green-800 underline font-medium">Malerarbeiten und deren Kosten</Link>.
          </p>

          <h3 className="heading-3">Unsere Maler-Dienstleistungen</h3>
          <p className="text-body mb-4">Verleihen Sie Ihrem Eigentum neuen Glanz mit einer Vielzahl von professionellen Malerarbeiten:</p>
          <ul className="text-body list-disc pl-5 space-y-2 mb-6">
            <li><strong>Innenanstriche</strong>: Streichen von Wänden, Decken, Türen und Fenstern für ein frisches Wohngefühl.</li>
            <li><strong>Fassadenanstriche</strong>: Schutz und Verschönerung Ihrer Hausfassade mit wetterbeständigen Farben.</li>
            <li><strong>Tapezierarbeiten</strong>: Professionelles Anbringen von Tapeten aller Art für eine individuelle Wandgestaltung.</li>
            <li><strong>Lackierarbeiten</strong>: Hochwertiges Lackieren von Holzwerk, Metallteilen und Heizkörpern.</li>
                    </ul>
                </div>
            </section>

      {/* ===== VORTEILE SECTION ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Ihre Vorteile mit unserem Vergleichsportal</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Über 200 geprüfte Partnerfirmen – ein Portal für alle Dienstleistungen</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BadgePercent, title: 'Bis zu 40% sparen', description: 'Durch den direkten Vergleich mehrerer Offerten finden Sie den besten Preis für Ihre Dienstleistung.', color: 'green' },
              { icon: ShieldCheck, title: 'Nur geprüfte Firmen', description: 'Alle Partnerfirmen sind versichert, im Handelsregister eingetragen und qualitätsgeprüft.', color: 'blue' },
              { icon: Clock, title: 'Schnelle Antworten', description: 'Erhalten Sie die ersten Offerten bereits innerhalb von 24 Stunden nach Ihrer Anfrage.', color: 'orange' },
              { icon: Award, title: 'Zeit & Nerven sparen', description: 'Mit nur einer Anfrage erreichen Sie mehrere Anbieter. Kein mühsames Suchen und Telefonieren mehr.', color: 'purple' },
              { icon: Users, title: 'Über 200 Partner', description: 'Ein grosses Netzwerk von qualifizierten Fachfirmen in der ganzen Schweiz steht Ihnen zur Verfügung.', color: 'teal' },
              { icon: HeartHandshake, title: '100% unverbindlich', description: 'Keine Verpflichtungen, keine versteckten Kosten. Die Entscheidung liegt vollständig bei Ihnen.', color: 'rose' },
            ].map((item, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow border-2 border-gray-100 hover:border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <div className={`p-2 rounded-lg bg-${item.color}-100`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
                </div>
            </section>
            
      {/* ===== REGIONAL LINKS ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Offerten in Ihrer Region</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unser Vergleichsportal deckt die gesamte Schweiz ab. Finden Sie Umzugsfirmen, Reinigungsfirmen und Maler in Ihrer Nähe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {locations.map((location) => (
              <Link key={location.name} href={location.href}>
                <Card className="h-full hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-900">Umzugsfirma {location.name}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Service Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white shadow-md">
                        <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Umzug
                </CardTitle>
                        </CardHeader>
                        <CardContent>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { name: 'Umzugsfirma finden', href: '/umzugsfirma' },
                    { name: 'Privatumzug', href: '/umzugsfirma/privatumzug' },
                    { name: 'Geschäftsumzug', href: '/umzugsfirma/geschaeftsumzug' },
                    { name: 'Internationale Umzüge', href: '/umzugsfirma/internationale-umzuege' },
                    { name: 'Spezialtransporte', href: '/umzugsfirma/spezialtransporte' },
                    { name: 'Umzugskosten', href: '/umzugsfirma/umzugskosten' },
                    { name: 'Umzugsfirma vergleichen', href: '/umzugsfirma-vergleichen' },
                  ].map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-2 text-slate-700 hover:text-green-700 transition-colors py-1.5 px-2 rounded-md hover:bg-green-50 text-sm">
                      <ChevronRight className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {item.name}
                    </Link>
                  ))}
                </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md">
                        <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Reinigung
                </CardTitle>
                        </CardHeader>
                        <CardContent>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { name: 'Reinigungsfirma finden', href: '/reinigung' },
                    { name: 'Umzugsreinigung', href: '/reinigung/umzugsreinigung' },
                    { name: 'Fensterreinigung', href: '/reinigung/fensterreinigung' },
                    { name: 'Büroreinigung', href: '/reinigung/bueroreinigung' },
                    { name: 'Baureinigung', href: '/reinigung/baureinigung' },
                    { name: 'Grundreinigung', href: '/reinigung/grundreinigung' },
                    { name: 'Reinigungskosten', href: '/reinigung/reinigungskosten' },
                  ].map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-2 text-slate-700 hover:text-green-700 transition-colors py-1.5 px-2 rounded-md hover:bg-green-50 text-sm">
                      <ChevronRight className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {item.name}
                    </Link>
                  ))}
                </div>
                        </CardContent>
                    </Card>

                     <Card className="bg-white shadow-md">
                        <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
                  <Paintbrush className="w-5 h-5 text-purple-500" />
                  Malerarbeiten
                </CardTitle>
                        </CardHeader>
                        <CardContent>
                <div className="grid grid-cols-1 gap-1">
                  <Link href="/malerarbeitenkosten" className="flex items-center gap-2 text-slate-700 hover:text-green-700 transition-colors py-1.5 px-2 rounded-md hover:bg-green-50 text-sm">
                    <ChevronRight className="w-3 h-3 text-green-500 flex-shrink-0" />
                    Malerarbeiten & Kosten
                  </Link>
                </div>
                        </CardContent>
                    </Card>
          </div>
                </div>
            </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Häufig gestellte Fragen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alles, was Sie über unser Vergleichsportal wissen müssen
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full bg-white p-4 rounded-lg shadow-xl border border-gray-200">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-slate-800">
                          <h4 className="faq-question">{item.q}</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-slate-600 leading-relaxed pt-2 pb-4">
                            {item.a}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
        </div>
            </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 md:py-16 relative" style={{ backgroundImage: 'url(/umzug/7946a949.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bereit, die beste Firma für Ihr Vorhaben zu finden?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Starten Sie jetzt Ihre kostenlose Anfrage auf unserem Vergleichsportal und erhalten Sie in Kürze die ersten Offerten.
            </p>
            <Button
              onClick={() => router.push('/kostenlose-offerte-anfordern')}
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-100 font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
                    Jetzt kostenlos Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Kostenlos & unverbindlich</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                <span>Versicherte Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-400" />
                <span>Bis zu 40% sparen</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OffertenPortalPageClient
