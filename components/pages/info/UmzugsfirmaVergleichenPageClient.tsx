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
  Star, MapPin, Home, Building, Globe, Package, FileText, Mail,
  Truck, Navigation, ChevronRight, ArrowUpDown,
  BarChart3, BadgePercent, HeartHandshake, Calculator, Lightbulb, AlertTriangle,
  ListChecks, ClipboardCheck, Search, Eye, XCircle, CalendarClock,
  ShieldAlert, FileWarning, Briefcase, Warehouse,
  PackageCheck, Wrench, Trash2
} from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'
import UmzugsfirmaInDerNaeheHeroForm from './UmzugsfirmaInDerNaeheHeroForm'

const UmzugsfirmaVergleichenPageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsfirma-vergleichen'

  const [ratingStats] = useState({
    reviewCount: 1,
    averageRating: 4.8
  })

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
              "name": "Umzugsfirmen vergleichen",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Umzugsfirmen vergleichen Schweiz",
          "serviceType": "Umzugsfirma Vergleichsportal",
          "description": "Vergleichen Sie kostenlos bis zu 5 Offerten von geprüften Umzugsfirmen in der Schweiz. Transparent, unverbindlich und bis zu 40% günstiger.",
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
          "offers": {
            "@type": "Offer",
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Umzugsofferten vergleichen"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Warum sollte ich Umzugsfirmen vergleichen?",
              "acceptedAnswer": { "@type": "Answer", "text": "Der Vergleich mehrerer Umzugsfirmen hilft Ihnen, Kosten zu sparen, den passenden Service zu finden und böse Überraschungen zu vermeiden. So erhalten Sie transparente Offerten und können Leistungen sowie Preise gezielt gegenüberstellen." }
            },
            {
              "@type": "Question",
              "name": "Wie viele Offerten sollte ich einholen?",
              "acceptedAnswer": { "@type": "Answer", "text": "Es empfiehlt sich, mindestens drei bis fünf Offerten von verschiedenen Umzugsunternehmen einzuholen, um ein gutes Preis-Leistungs-Verhältnis zu finden." }
            },
            {
              "@type": "Question",
              "name": "Sind die Angebote über Online-Vergleichsplattformen wirklich kostenlos und unverbindlich?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ja, Plattformen wie Online-Offerten.ch bieten Ihnen kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Ihrer Region an." }
            },
            {
              "@type": "Question",
              "name": "Was sollte ich bei der Auswahl einer Umzugsfirma beachten?",
              "acceptedAnswer": { "@type": "Answer", "text": "Achten Sie auf eine transparente Offerte, Versicherungsschutz, Erfahrung, Kundenbewertungen und ob Zusatzleistungen wie Endreinigung oder Montageservice angeboten werden." }
            },
            {
              "@type": "Question",
              "name": "Muss ich bei der Buchung eine Anzahlung leisten?",
              "acceptedAnswer": { "@type": "Answer", "text": "Das variiert je nach Umzugsunternehmen. Seriöse Firmen klären Zahlungsmodalitäten im Voraus und verlangen oft eine Anzahlung, um den Termin zu sichern." }
            },
            {
              "@type": "Question",
              "name": "Kann ich auch Reinigungsfirmen über Vergleichsplattformen finden?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ja, viele Plattformen vermitteln neben Umzugsfirmen auch Reinigungsfirmen, die beispielsweise die Endreinigung Ihrer alten Wohnung übernehmen." }
            },
            {
              "@type": "Question",
              "name": "Wie vermeide ich versteckte Kosten im Umzugsangebot?",
              "acceptedAnswer": { "@type": "Answer", "text": "Lesen Sie das Kleingedruckte sorgfältig und fragen Sie nach, welche Leistungen genau enthalten sind. Ein Festpreis statt Stundenlohn bietet mehr Kostensicherheit." }
            },
            {
              "@type": "Question",
              "name": "Wie früh sollte ich meine Umzugsfirma buchen?",
              "acceptedAnswer": { "@type": "Answer", "text": "Mindestens 4 bis 6 Wochen vor dem Umzug, in der Hochsaison sogar besser 8 Wochen, um Verfügbarkeit und Wunschtermine sicherzustellen." }
            },
            {
              "@type": "Question",
              "name": "Bieten Umzugsfirmen auch Serviceleistungen wie Möbelabbau oder Einlagerung an?",
              "acceptedAnswer": { "@type": "Answer", "text": "Viele Umzugsunternehmen bieten Zusatzservices wie Möbelmontage, Verpackung, Entsorgung und auch Einlagerung an. Informieren Sie sich bei der Anfrage." }
            },
            {
              "@type": "Question",
              "name": "Wie kann ich die Qualität einer Umzugsfirma einschätzen?",
              "acceptedAnswer": { "@type": "Answer", "text": "Nutzen Sie Kundenbewertungen und Erfahrungsberichte auf Vergleichsplattformen und achten Sie auf transparente Kommunikation sowie eine schriftliche Offerte." }
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'umzugsfirma-vergleichen-schema'

    const existing = document.getElementById('umzugsfirma-vergleichen-schema')
    if (existing && existing.parentNode) {
      try { existing.remove() } catch (e) { /* */ }
    }

    document.head.appendChild(script)

    return () => {
      if (typeof document === 'undefined') return
      const scriptToRemove = document.getElementById('umzugsfirma-vergleichen-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        try { scriptToRemove.remove() } catch (e) { /* */ }
      }
    }
  }, [])

  const faqItems = [
    {
      q: "Warum sollte ich Umzugsfirmen vergleichen?",
      a: "Der Vergleich mehrerer Umzugsfirmen hilft Ihnen, Kosten zu sparen, den passenden Service zu finden und böse Überraschungen zu vermeiden. So erhalten Sie transparente Offerten und können Leistungen sowie Preise gezielt gegenüberstellen."
    },
    {
      q: "Wie viele Offerten sollte ich einholen?",
      a: "Es empfiehlt sich, mindestens drei bis fünf Offerten von verschiedenen Umzugsunternehmen einzuholen, um ein gutes Preis-Leistungs-Verhältnis zu finden."
    },
    {
      q: "Sind die Angebote über Online-Vergleichsplattformen wirklich kostenlos und unverbindlich?",
      a: "Ja, Online-Offerten.ch bietet Ihnen kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Ihrer Region an."
    },
    {
      q: "Was sollte ich bei der Auswahl einer Umzugsfirma beachten?",
      a: "Achten Sie auf eine transparente Offerte, Versicherungsschutz, Erfahrung, Kundenbewertungen und ob Zusatzleistungen wie Endreinigung oder Montageservice angeboten werden."
    },
    {
      q: "Muss ich bei der Buchung eine Anzahlung leisten?",
      a: "Das variiert je nach Umzugsunternehmen. Seriöse Firmen klären Zahlungsmodalitäten im Voraus und verlangen oft eine Anzahlung, um den Termin zu sichern."
    },
    {
      q: "Kann ich auch Reinigungsfirmen über Vergleichsplattformen finden?",
      a: "Ja, Online-Offerten.ch vermittelt neben Umzugsfirmen auch Reinigungsfirmen, die beispielsweise die Endreinigung Ihrer alten Wohnung übernehmen."
    },
    {
      q: "Wie vermeide ich versteckte Kosten im Umzugsangebot?",
      a: "Lesen Sie das Kleingedruckte sorgfältig und fragen Sie nach, welche Leistungen genau enthalten sind. Ein Festpreis statt Stundenlohn bietet mehr Kostensicherheit."
    },
    {
      q: "Wie früh sollte ich meine Umzugsfirma buchen?",
      a: "Mindestens 4 bis 6 Wochen vor dem Umzug, in der Hochsaison sogar besser 8 Wochen, um Verfügbarkeit und Wunschtermine sicherzustellen."
    },
    {
      q: "Bieten Umzugsfirmen auch Serviceleistungen wie Möbelabbau oder Einlagerung an?",
      a: "Viele Umzugsunternehmen bieten Zusatzservices wie Möbelmontage, Verpackung, Entsorgung und auch Einlagerung an. Informieren Sie sich bei der Anfrage."
    },
    {
      q: "Wie kann ich die Qualität einer Umzugsfirma einschätzen?",
      a: "Nutzen Sie Kundenbewertungen und Erfahrungsberichte auf Vergleichsplattformen und achten Sie auf transparente Kommunikation sowie eine schriftliche Offerte."
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
                Vergleichsportal Schweiz
              </div>
              <h1 className="heading-1 !mt-0">
                Umzugsfirmen vergleichen Schweiz: So finden Sie den besten Anbieter für Ihren Umzug
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
                Ein systematischer Vergleich von <Link href="/umzugsfirma" className="text-green-700 hover:text-green-800 underline font-medium">Umzugsfirmen</Link> spart Ihnen bis zu 40% der Kosten und schützt vor bösen Überraschungen. Die effizienteste Methode, Umzugsfirmen zu vergleichen, ist die Nutzung spezialisierter Online-Vergleichsportale.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Professionelle Umzugsfirmen nehmen Ihnen einen grossen Teil der Arbeit ab, indem sie den gesamten Arbeitsaufwand rund um den Umzug effizient und fachgerecht übernehmen. So profitieren Sie von der Erfahrung und dem Know-how der Umzugshelfer, was den Ablauf deutlich erleichtert.
              </p>

              {/* Service Buttons */}
              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre Umzugsart:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Privatumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Wohnungsumzug</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Geschäftsumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Firmenumzug</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Auslandumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">International</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                    <PiPianoKeysFill className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Klaviertransport</p>
                    <p className="text-xs text-gray-600 mt-0.5">Piano & Flügel</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Kleintransport</p>
                    <p className="text-xs text-gray-600 mt-0.5">Einzelne Gegenstände</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=lagerung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Lagerung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Möbel einlagern</p>
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
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Bis zu 5 Offerten vergleichen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
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
                  Umzugsfirmen vergleichen
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, title: 'Bis zu 40% sparen', description: 'Bei identischen Leistungen liegen die Preise oft 300–800 CHF auseinander' },
                    { icon: ShieldCheck, title: 'Geprüfte Partnerfirmen', description: 'Alle Firmen sind versichert und qualitätsgeprüft' },
                    { icon: MapPin, title: 'Regionale Anbieter', description: 'Lokale Firmen kennen die Gegebenheiten vor Ort' },
                    { icon: HeartHandshake, title: '100% unverbindlich', description: 'Keine Verpflichtung – die Wahl liegt bei Ihnen' },
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

      {/* ===== DER WEG ZUM STRESSFREIEN UMZUG ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-3">
                <Lightbulb className="h-4 w-4 mr-2" />
                Der richtige Vergleich
              </div>
              <h2 className="heading-2 !mt-0">
                Der Weg zum stressfreien Umzug beginnt mit dem richtigen Vergleich
              </h2>
              <p className="text-body mb-6">
                Ein Umzug in der Schweiz kostet durchschnittlich zwischen <strong>1&apos;500 und 4&apos;000 CHF</strong> – je nach Wohnungsgrösse und Distanz. Das Problem: Bei über 500 aktiven Umzugsfirmen schweizweit variieren die Preise für identische Leistungen um bis zu <strong>800 CHF</strong>. Ohne systematischen Vergleich zahlen Sie schnell zu viel oder landen bei einem Anbieter, dessen Service nicht Ihren Erwartungen entspricht.
              </p>
              <p className="text-body mb-6">
                Die gute Nachricht: Mit einer strukturierten Suche nach Umzugsofferten finden Sie in wenigen Schritten den passenden Umzugspartner für Ihre Bedürfnisse. Über <strong>Online-Offerten.ch</strong> können Sie durch das Ausfüllen eines kurzen Formulars gezielt Angebote von Umzugsfirmen erhalten, die zu Ihren Anforderungen passen. Dieser Leitfaden zeigt Ihnen, wie Sie seriöse Umzugsunternehmen erkennen, typische Fehler vermeiden und das beste Preis-Leistungsverhältnis für Ihren <Link href="/umzugsfirma/privatumzug" className="text-green-700 hover:text-green-800 underline font-medium">Privatumzug</Link> oder <Link href="/umzugsfirma/geschaeftsumzug" className="text-green-700 hover:text-green-800 underline font-medium">Firmenumzug</Link> erzielen.
              </p>
              <p className="text-body mb-6">
                Beim Vergleich von Umzugsfirmen in der Schweiz ist die Qualität der Dienstleistung ein entscheidendes Kriterium. Achten Sie dabei besonders auf die Professionalität, Höflichkeit und die Servicequalität der Anbieter.
              </p>
            </div>
            <div className="hidden lg:block">
              <NextImage
                src="/umzug/29dafe69-70a5-4e15-b5fe-fac7d8d03bc7.webp"
                alt="Umzugshelfer tragen Möbelstücke aus einem Wohnhaus in einen Transporter für einen reibungslosen Umzug"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== WARUM VERGLEICHEN SINNVOLL IST ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2">
            Warum Umzugsfirmen vergleichen sinnvoll ist
          </h2>
          <p className="text-body mb-8">Der Vergleich mehrerer Anbieter vor der Buchung lohnt sich aus fünf wesentlichen Gründen:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: BadgePercent,
                title: 'Erhebliche Kostenersparnis',
                description: 'Bei identischer Leistung liegen die Preisunterschiede zwischen Umzugsfirmen oft bei 300 bis 800 CHF. Durch das Einholen von mindestens drei Offerten sparen Kunden im Durchschnitt 20 bis 40% der Umzugskosten.'
              },
              {
                icon: ShieldCheck,
                title: 'Qualitätssicherung durch Transparenz',
                description: 'Nicht jede Zügelfirma bietet die gleichen Versicherungsleistungen. Während seriöse Anbieter eine Haftpflichtversicherung mit mindestens 100\'000 CHF Deckung vorweisen, arbeiten andere mit minimaler Absicherung.'
              },
              {
                icon: Search,
                title: 'Breite Servicevielfalt entdecken',
                description: 'Von der reinen Möbellieferung bis zum Vollservice mit Verpackung, Endreinigung und Entsorgung: Erst der Vergleich zeigt, welche Dienstleistungen verfügbar sind und was sie kosten.'
              },
              {
                icon: MapPin,
                title: 'Regionale Spezialisierung nutzen',
                description: 'Lokale Zügelunternehmen in Ihrer Nähe kennen die Gegebenheiten vor Ort. In Zürich etwa sind Parkbewilligungen und enge Treppenhäuser Alltag, während ländliche Anbieter andere Stärken mitbringen.'
              },
              {
                icon: CalendarClock,
                title: 'Verfügbarkeit sichern',
                description: 'Besonders während der Umzugshochsaison von Mai bis September sind gute Firmen früh ausgebucht. Wer mehrere Offerten einholt, hat bessere Chancen auf den Wunschtermin.'
              },
            ].map((item, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow border-2 border-gray-100 hover:border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                    <div className="p-2 rounded-lg bg-green-100">
                      <item.icon className="w-6 h-6 text-green-600" />
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <p className="text-body italic">
              Mit einem strukturierten Vergleich verwandeln Sie die stressige Suche nach dem richtigen Umzugsservice in einen überschaubaren Prozess mit klarem Ergebnis.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WIE FUNKTIONIERT EIN UMZUGSVERGLEICH (5 Schritte) ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2">
            Wie funktioniert ein Umzugsvergleich in der Schweiz
          </h2>
          <p className="text-body mb-10">Ein effektiver Vergleich folgt einem klaren Ablauf in fünf Schritten:</p>

          <div className="space-y-6 mb-10">
            {[
              {
                number: "1",
                title: "Anfrage stellen – Ihre Umzugsdaten erfassen",
                description: "Erfassen Sie alle relevanten Informationen: Wohnungsgrösse (Anzahl Zimmer oder Kubikmeter), Umzugsdatum, Start- und Zielort sowie gewünschte Zusatzservices wie Verpackung oder Reinigung. Je präziser Ihre Angaben, desto genauer fallen die Angebote aus.",
                icon: FileText
              },
              {
                number: "2",
                title: "Offerten erhalten – Anbieter melden sich",
                description: "Über Online-Offerten.ch erhalten Sie kostenlos und unverbindlich bis zu fünf Offerten von regionalen Partnerfirmen. Die Rückmeldung erfolgt in der Regel binnen 24 bis 48 Stunden.",
                icon: Mail
              },
              {
                number: "3",
                title: "Angebote vergleichen – Preise und Leistungen prüfen",
                description: "Vergleichen Sie nicht nur die Kosten, sondern auch den Leistungsumfang: Sind Umzugskartons inklusive? Welche Versicherung ist enthalten? Gibt es eine Abnahmegarantie bei der Endreinigung?",
                icon: Eye
              },
              {
                number: "4",
                title: "Firmen kontaktieren – Besichtigung vereinbaren",
                description: "Bei grösseren Umzügen empfiehlt sich eine Vor-Ort-Besichtigung. Seriöse Umzugsprofis bieten diese kostenlos an und können so ein verbindliches Umzugsangebot erstellen.",
                icon: Navigation
              },
              {
                number: "5",
                title: "Entscheidung treffen – Vertrag abschliessen",
                description: "Wählen Sie den Anbieter mit dem besten Preis-Leistungsverhältnis und lassen Sie sich alles schriftlich bestätigen. Achten Sie auf klare AGB und das Kleingedruckte.",
                icon: ClipboardCheck
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-4 md:gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-body">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Vorteile von Vergleichsplattformen */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Vorteile von Vergleichsplattformen gegenüber eigenständiger Suche</h3>
            <p className="text-body mb-4">
              Eine Vergleichsplattform spart Ihnen die zeitaufwändige Recherche im Internet. Statt einzelne Unternehmen anzurufen und Informationen zusammenzutragen, erhalten Sie mit einer einzigen Anfrage mehrere vergleichbare Offerten. Die geprüften Anbieter sind regional aktiv, verfügen über einen festen Standort in der Schweiz und sind auf Umzüge in Ihrer Region spezialisiert.
            </p>
            <p className="text-body mb-4">
              Viele Plattformen bieten zusätzlich Bewertungen und Erfahrungsberichte von früheren Kunden, was Ihnen bei der Auswahl hilft. Auch die Möglichkeit, gezielt nach Umzugsfirmen in Ihrer Region oder mit speziellen Zusatzleistungen wie <Link href="/reinigung/umzugsreinigung" className="text-green-700 hover:text-green-800 underline font-medium">Endreinigung</Link> oder Montageservice zu filtern, macht die Suche einfacher.
            </p>
            <p className="text-body">
              Insgesamt sind Vergleichsplattformen ein wertvolles Werkzeug, um Umzugsservices in der Schweiz effizient und sicher zu vergleichen und den besten Anbieter für Ihren Umzug zu finden.
            </p>
          </div>
        </div>
      </section>

      {/* ===== KOSTENÜBERSICHT NACH WOHNUNGSGRÖSSE ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
            <Calculator className="h-4 w-4 mr-2" />
            Kostenübersicht
          </div>
          <h2 className="heading-2 !mt-0">
            Kostenübersicht nach Wohnungsgrösse
          </h2>
          <p className="text-body mb-8">
            Die <Link href="/umzugsfirma/umzugskosten" className="text-green-700 hover:text-green-800 underline font-medium">Umzugskosten in der Schweiz</Link> hängen von mehreren Faktoren ab. Die folgende Übersicht zeigt typische Preisbereiche:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Wohnungsgrösse</th>
                  <th className="px-6 py-4 text-left font-bold">Lokaler Umzug</th>
                  <th className="px-6 py-4 text-left font-bold">Kantonsübergreifend</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-semibold text-gray-900 border-b border-gray-100">1–2 Zimmer</td>
                  <td className="px-6 py-4 text-gray-700 border-b border-gray-100">800 – 1&apos;500 CHF</td>
                  <td className="px-6 py-4 text-gray-700 border-b border-gray-100">1&apos;200 – 2&apos;200 CHF</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900 border-b border-gray-100">3–4 Zimmer</td>
                  <td className="px-6 py-4 text-gray-700 border-b border-gray-100">1&apos;500 – 2&apos;800 CHF</td>
                  <td className="px-6 py-4 text-gray-700 border-b border-gray-100">2&apos;200 – 4&apos;000 CHF</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-semibold text-gray-900 border-b border-gray-100">5+ Zimmer</td>
                  <td className="px-6 py-4 text-gray-700 border-b border-gray-100">2&apos;800 – 4&apos;500 CHF</td>
                  <td className="px-6 py-4 text-gray-700 border-b border-gray-100">4&apos;000 – 7&apos;000 CHF</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Zusatzkosten & Preisfaktoren */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Zusatzkosten, die häufig anfallen
              </h3>
              <ul className="text-sm text-gray-700 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">•</span>
                  <span><strong>Verpackungsmaterial</strong> – Umzugskartons, Luftpolsterfolie, Klebeband: 50 bis 200 CHF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">•</span>
                  <span><strong>Endreinigung der Wohnung</strong> – Abhängig von Grösse und Zustand: 200 bis 500 CHF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">•</span>
                  <span><strong>Einlagerung</strong> – Pro Kubikmeter und Monat: 15 bis 40 CHF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold mt-0.5">•</span>
                  <span><strong>Entsorgung</strong> – Sperrmüll und alte Möbel: 100 bis 400 CHF</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Faktoren, die den Preis beeinflussen
              </h3>
              <ul className="text-sm text-gray-700 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span><strong>Stockwerk und Lift</strong> – Jedes Stockwerk ohne Aufzug erhöht die Kosten um 100 bis 200 CHF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span><strong>Distanz</strong> – Pro Kilometer rechnen Firmen mit 1 bis 2 CHF Zuschlag</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span><strong>Umzugstermin</strong> – In der Hochsaison (Mai bis September) und an Monatsenden steigen die Preise um bis zu 30%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span><strong>Zusatzservices</strong> – Möbelmontage, Einpacken durch Profis, Reinigung durch Dienstleister</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-body">
                <strong>Tipp:</strong> Fordern Sie immer einen Festpreis statt Stundenlohn an. So vermeiden Sie unerwartete Mehrkosten, wenn der Umzug länger dauert als geplant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPEZIALDIENSTLEISTUNGEN UND ZUSATZLEISTUNGEN ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold text-sm mb-3">
            <Truck className="h-4 w-4 mr-2" />
            Dienstleistungen
          </div>
          <h2 className="heading-2 !mt-0">
            Spezialdienstleistungen und Zusatzleistungen im Überblick
          </h2>
          <p className="text-body mb-8">
            Viele Umzugsfirmen in der Schweiz bieten weit mehr als den reinen Transport von Möbeln und Umzugskartons. Wer seinen Umzug möglichst stressfrei gestalten möchte, profitiert von einer Vielzahl an Spezialdienstleistungen und Zusatzservices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: PackageCheck,
                title: 'Vollservice-Umzug',
                description: 'Sämtliche Arbeitsschritte – von der detaillierten Planung über das sichere Verpacken bis hin zur Endreinigung und dem Wiederaufbau der Möbel am neuen Ort.'
              },
              {
                icon: Briefcase,
                title: 'Firmenumzüge & Geschäftsumzüge',
                description: 'Spezialisierte Umzugsfirmen minimieren Betriebsunterbrechungen – von der IT-Infrastruktur bis zur Archivierung.'
              },
              {
                icon: Globe,
                title: 'Internationaler Umzug',
                description: 'Organisation des Transports, Abwicklung von Zoll- und Einfuhrbestimmungen sowie Koordination mit Partnerfirmen im Ausland.'
              },
              {
                icon: Warehouse,
                title: 'Einlagerung',
                description: 'Flexible Lagerlösungen für einige Tage oder mehrere Monate – ideal, wenn der Einzugstermin noch nicht feststeht.'
              },
              {
                icon: ShieldCheck,
                title: 'Transportversicherung',
                description: 'Umfassender Schutz vor finanziellen Verlusten bei Beschädigung oder Verlust während des Transports.'
              },
              {
                icon: Trash2,
                title: 'Haushaltsauflösung & Entsorgung',
                description: 'Fachgerechte Entsorgung nicht mehr benötigter Gegenstände – Sperrmüll und Verwertung brauchbarer Möbel.'
              },
              {
                icon: Wrench,
                title: 'Montageservice',
                description: 'Fachgerechtes Zerlegen und Wiederaufbauen Ihrer Möbel – besonders bei komplexen oder hochwertigen Einrichtungsgegenständen.'
              },
              {
                icon: PiPianoKeysFill,
                title: 'Klavierumzug',
                description: 'Spezialisierte Teams mit dem nötigen Know-how und Equipment für den sicheren Transport empfindlicher oder schwerer Instrumente.'
              },
            ].map((item, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <item.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-body">
            Die gezielte Auswahl dieser Zusatzleistungen ermöglicht es, den Umzugsservice optimal auf die eigenen Anforderungen abzustimmen. Erfahren Sie mehr über <Link href="/umzugsfirma/spezialtransporte" className="text-green-700 hover:text-green-800 underline font-medium">Spezialtransporte</Link> oder starten Sie jetzt Ihre <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2" className="text-green-700 hover:text-green-800 underline font-medium">kostenlose Anfrage</Link>.
          </p>
        </div>
      </section>

      {/* ===== SERIÖSE UMZUGSFIRMA ERKENNEN ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Qualitätskriterien
              </div>
              <h2 className="heading-2 !mt-0">
                Woran erkennt man eine seriöse Umzugsfirma
              </h2>
              <p className="text-body mb-6">
                Die Auswahl des richtigen Umzugsunternehmens ist entscheidend für einen reibungslosen Ablauf. Diese Kriterien helfen bei der Beurteilung:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Rechtliche Kriterien:</h4>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Eintrag im Handelsregister mit Schweizer Geschäftssitz</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Gültige Mehrwertsteuer-Nummer (UID)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /> Gewerbebewilligung für Gütertransporte</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Versicherungsschutz:</h4>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" /> Transportversicherung mit mindestens 1&apos;000 CHF pro Kubikmeter</li>
                    <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" /> Haftpflichtversicherung für Schäden an Ihrem Eigentum und in der Wohnung</li>
                    <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" /> Klare Regelung zur Schadensmeldung und -abwicklung</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Transparenz und Professionalität:</h4>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Detaillierte schriftliche Offerte mit allen Leistungen</li>
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Keine Forderung nach Vorauskasse</li>
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Kostenlose Besichtigung bei grösseren Umzügen</li>
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Geschultes Personal und eigener Fuhrpark</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Referenzen und Bewertungen:</h4>
                  <ul className="text-sm text-gray-700 space-y-1.5">
                    <li className="flex items-start gap-2"><Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> Positive <Link href="/kunden-bewertungen" className="text-green-700 hover:text-green-800 underline font-medium">Kundenbewertungen</Link> auf Google oder Bewertungsportalen</li>
                    <li className="flex items-start gap-2"><Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> Mitgliedschaft im Schweizerischen Zügelverband (SZV)</li>
                    <li className="flex items-start gap-2"><Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> Nachweisbare Erfahrung und Empfehlungen</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-6">
              <NextImage
                src="/umzug/b073e2a2-3bd4-4499-af1a-f2cf4f3e1a92.webp"
                alt="Professionelle Umzugshelfer vor einem Umzugswagen bereit für den Umzugsservice in der Schweiz"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
              {/* Warnsignale */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Warnsignale, bei denen Sie vorsichtig sein sollten:
                </h4>
                <ul className="text-sm text-red-700 space-y-2">
                  <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Angebote deutlich unter dem Marktpreis</li>
                  <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Haustürgeschäfte ohne schriftliche Unterlagen</li>
                  <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Fehlende oder unvollständige Kontaktdaten</li>
                  <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" /> Druck zur sofortigen Unterschrift ohne Bedenkzeit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TYPISCHE FEHLER BEIM OFFERTENVERGLEICH ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-700 font-semibold text-sm mb-3">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Fehler vermeiden
          </div>
          <h2 className="heading-2 !mt-0">
            Typische Fehler beim Offertenvergleich
          </h2>
          <p className="text-body mb-8">Diese sechs Fehler kosten Sie Zeit, Geld oder Nerven – so vermeiden Sie sie:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                number: "1",
                title: "Nur auf den Preis achten",
                description: "Das günstigste Angebot ist selten das beste. Prüfen Sie genau, welche Leistungen enthalten sind. Ein Anbieter mit höherem Preis, aber inklusive Verpackung und Versicherung, kann unter dem Strich günstiger sein.",
                color: "red"
              },
              {
                number: "2",
                title: "Unvollständige Angaben machen",
                description: "Vergessene Möbelstücke, nicht erwähnte Stockwerke ohne Lift oder fehlende Parkplatzsituation führen zu Nachforderungen am Umzugstag. Erfassen Sie alle Details bei der Anfrage.",
                color: "orange"
              },
              {
                number: "3",
                title: "Zu spät buchen",
                description: "Wer in der Hochsaison erst zwei Wochen vor dem Umzug bucht, hat eingeschränkte Wahl und zahlt Aufschläge. Planen Sie 4 bis 6 Wochen Vorlauf ein, in der Hochsaison besser 8 Wochen.",
                color: "yellow"
              },
              {
                number: "4",
                title: "Versicherung vernachlässigen",
                description: "Die Standardversicherung vieler Firmen deckt oft nur 200 CHF pro beschädigtem Gegenstand. Bei wertvollen Möbeln oder Elektronik lohnt sich eine Zusatzversicherung.",
                color: "purple"
              },
              {
                number: "5",
                title: "Keine Besichtigung durchführen",
                description: "Ohne Vor-Ort-Termin basiert das Umzugsangebot auf Schätzungen. Bei einer 4-Zimmer-Wohnung kann die Differenz zwischen Schätzung und Realität 500 CHF und mehr betragen.",
                color: "blue"
              },
              {
                number: "6",
                title: "Mündliche Absprachen treffen",
                description: '«Das machen wir dann so» reicht nicht. Jede Vereinbarung gehört schriftlich in den Auftrag. Das schützt vor Konflikten und sorgt für klare Verhältnisse.',
                color: "teal"
              }
            ].map((error, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-5 shadow-sm hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-100 text-orange-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {error.number}
                  </div>
                  <h4 className="font-bold text-gray-900">{error.title}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{error.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-body italic">
              Erfahrung zeigt: 70% aller Beschwerden bei Konsumentenschutzstellen entstehen durch fehlende schriftliche Vereinbarungen oder unzureichenden Versicherungsschutz.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAZIT UND NÄCHSTE SCHRITTE ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2">Fazit und nächste Schritte</h2>
          <p className="text-body mb-6">
            Der Vergleich von Umzugsfirmen in der Schweiz ist kein Luxus, sondern eine sinnvolle Investition Ihrer Zeit. Mit dem richtigen Vorgehen sparen Sie mehrere Hundert Franken und vermeiden Stress am Umzugstag.
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Die wichtigsten Punkte zusammengefasst:</h3>
            <ul className="space-y-3 text-body">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span>Holen Sie mindestens drei Offerten ein</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span>Vergleichen Sie Leistungen, nicht nur Preise</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span>Prüfen Sie Versicherung und Referenzen</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span>Buchen Sie 4 bis 6 Wochen im Voraus</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span>Lassen Sie alles schriftlich bestätigen</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ihr nächster Schritt:</h3>
            <p className="text-body mb-4">
              Starten Sie jetzt Ihre kostenlose Anfrage über <strong>Online-Offerten.ch</strong>. In wenigen Klicks erhalten Sie bis zu fünf unverbindliche Angebote von geprüften Umzugsfirmen aus Ihrer Umgebung. Der Service ist 100% kostenlos und ohne Verpflichtung.
            </p>
            <p className="text-body mb-6">
              Egal ob <Link href="/umzugsfirma/privatumzug" className="text-green-700 hover:text-green-800 underline font-medium">Privatumzug</Link> in <Link href="/umzugsfirma/zuerich" className="text-green-700 hover:text-green-800 underline font-medium">Zürich</Link>, <Link href="/umzugsfirma/geschaeftsumzug" className="text-green-700 hover:text-green-800 underline font-medium">Geschäftsumzug</Link> in <Link href="/umzugsfirma/bern" className="text-green-700 hover:text-green-800 underline font-medium">Bern</Link> oder Zügeln von Kanton zu Kanton: Die Plattform vermittelt neutral zwischen Ihnen und qualifizierten Partnerfirmen, die auf Ihre Art von Umzug spezialisiert sind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2">
                  Jetzt kostenlose Offerten anfragen
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-green-700">
              <span>🔒 Geprüfte Anbieter</span>
              <span>|</span>
              <span>Neutrale Vermittlung</span>
              <span>|</span>
              <span>Schweizweit verfügbar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REGIONAL LINKS ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Umzugsfirmen in Ihrer Region vergleichen</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Finden Sie <Link href="/umzugsfirma-in-der-naehe" className="text-green-700 hover:text-green-800 underline font-medium">Umzugsfirmen in der Nähe</Link> und vergleichen Sie die besten Anbieter in den grössten Städten der Schweiz.
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
                    { name: 'Umzugsfirma in der Nähe', href: '/umzugsfirma-in-der-naehe' },
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
                  <Star className="w-5 h-5 text-yellow-500" />
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
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  Vergleich & Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { name: 'Offertenportal', href: '/offerten-portal' },
                    { name: 'Malerarbeiten & Kosten', href: '/malerarbeitenkosten' },
                    { name: 'Kundenbewertungen', href: '/kunden-bewertungen' },
                    { name: 'Ratgeber', href: '/ratgeber' },
                  ].map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-2 text-slate-700 hover:text-green-700 transition-colors py-1.5 px-2 rounded-md hover:bg-green-50 text-sm">
                      <ChevronRight className="w-3 h-3 text-green-500 flex-shrink-0" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Häufig gestellte Fragen (FAQ) zu Umzugsfirmen vergleichen in der Schweiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alles Wichtige rund um das Vergleichen von Umzugsfirmen
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
      <section className="py-12 md:py-16 relative" style={{ backgroundImage: 'url(/umzug/b073e2a2-3bd4-4499-af1a-f2cf4f3e1a92.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl text-left">
            <h2 className="heading-2-white">
              Jetzt Umzugsfirmen vergleichen | Kostenlos & unverbindlich
            </h2>

            {/* Search Form */}
            <UmzugsfirmaInDerNaeheHeroForm />

            {/* Rating Card */}
            {ratingStats.reviewCount > 0 && (
              <div
                className="bg-white rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-start items-start gap-4 transition-all duration-300 mt-6"
                style={{
                  boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex-1 pt-1 w-full md:w-auto">
                  <div className="flex flex-wrap justify-start items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Kostenlos & unverbindlich</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Versicherte Partner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Bis zu 40% sparen</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default UmzugsfirmaVergleichenPageClient
