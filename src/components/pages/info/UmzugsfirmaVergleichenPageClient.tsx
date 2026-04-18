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
  BarChart3, BadgePercent, Calculator, Lightbulb, AlertTriangle,
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
              "name": "Startseite",
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
          "name": "Umzugsfirmen vergleichen in der Schweiz: Bis zu 5 kostenlose Umzugsofferten",
          "serviceType": "Umzugsfirma Vergleichsportal",
          "description": "Umzugsfirmen in der Schweiz vergleichen: Bis zu 5 kostenlose Umzugsofferten von regionalen Umzugsfirmen – schnell, unverbindlich, transparent. Jetzt Offerten einholen.",
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
              "acceptedAnswer": { "@type": "Answer", "text": "Es empfiehlt sich, mindestens vier bis fünf Offerten von verschiedenen Umzugsunternehmen einzuholen, um ein gutes Preis-Leistungs-Verhältnis zu finden." }
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
      a: "Es empfiehlt sich, mindestens vier bis fünf Offerten von verschiedenen Umzugsunternehmen einzuholen, um ein gutes Preis-Leistungs-Verhältnis zu finden."
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
      <section className="relative overflow-hidden bg-muted/60 py-12 md:py-16 dark:bg-muted/25">
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-muted/60 dark:bg-muted/20" />
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div
                className="mb-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-300"
                aria-label="In 2 Minuten, Gratis, 5 Offerten"
              >
                <Clock className="h-4 w-4 flex-shrink-0" aria-hidden />
                <span>In 2 Minuten</span>
                <span className="text-emerald-600/50 dark:text-emerald-400/45" aria-hidden>
                  ·
                </span>
                <span>Gratis</span>
                <span className="text-emerald-600/50 dark:text-emerald-400/45" aria-hidden>
                  ·
                </span>
                <span>5 Offerten</span>
              </div>
              <h1 className="heading-1 !mt-0">
                Umzugsfirmen vergleichen in der Schweiz: Bis zu 5 kostenlose Umzugsofferten
              </h1>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Vergleichen Sie kostenlos regionale Umzugsfirmen für Ihren Umzug und erhalten Sie in 2 Minuten Gratis-Umzugsofferten.
              </p>

              {/* Service Buttons */}
              <p className="mb-2 text-sm font-semibold text-foreground">Wählen Sie Ihre Umzugsart:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug"
                  className="group flex w-full items-center gap-2 rounded-lg border-2 border-border bg-card p-2.5 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md dark:hover:bg-blue-950/35 sm:flex-col sm:items-center sm:p-3 sm:text-center"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-500 dark:bg-blue-950/45 sm:h-10 sm:w-10">
                    <Home className="h-4 w-4 text-blue-600 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="text-sm font-semibold text-foreground sm:text-base">Privatumzug</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Wohnungsumzug</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug"
                  className="group flex w-full items-center gap-2 rounded-lg border-2 border-border bg-card p-2.5 transition-all duration-300 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md dark:hover:bg-purple-950/35 sm:flex-col sm:items-center sm:p-3 sm:text-center"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-500 dark:bg-purple-950/45 sm:h-10 sm:w-10">
                    <Building className="h-4 w-4 text-purple-600 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="text-sm font-semibold text-foreground sm:text-base">Geschäftsumzug</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Firmenumzug</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international"
                  className="group flex w-full items-center gap-2 rounded-lg border-2 border-border bg-card p-2.5 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md dark:hover:bg-emerald-950/35 sm:flex-col sm:items-center sm:p-3 sm:text-center"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 transition-colors group-hover:bg-emerald-500 dark:bg-emerald-950/45 sm:h-10 sm:w-10">
                    <Globe className="h-4 w-4 text-emerald-600 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="text-sm font-semibold text-foreground sm:text-base">Auslandumzug</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">International</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=klaviertransport&special_transport_type=klaviertransport"
                  className="group flex w-full items-center gap-2 rounded-lg border-2 border-border bg-card p-2.5 transition-all duration-300 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md dark:hover:bg-amber-950/35 sm:flex-col sm:items-center sm:p-3 sm:text-center"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 transition-colors group-hover:bg-amber-500 dark:bg-amber-950/45 sm:h-10 sm:w-10">
                    <PiPianoKeysFill className="h-4 w-4 text-amber-600 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="text-sm font-semibold text-foreground sm:text-base">Klaviertransport</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Piano & Flügel</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport"
                  className="group flex w-full items-center gap-2 rounded-lg border-2 border-border bg-card p-2.5 transition-all duration-300 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md dark:hover:bg-teal-950/35 sm:flex-col sm:items-center sm:p-3 sm:text-center"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 transition-colors group-hover:bg-teal-500 dark:bg-teal-950/45 sm:h-10 sm:w-10">
                    <Package className="h-4 w-4 text-teal-600 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="text-sm font-semibold text-foreground sm:text-base">Kleintransport</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Einzelne Gegenstände</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=lagerung"
                  className="group flex w-full items-center gap-2 rounded-lg border-2 border-border bg-card p-2.5 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md dark:hover:bg-indigo-950/35 sm:flex-col sm:items-center sm:p-3 sm:text-center"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 transition-colors group-hover:bg-indigo-500 dark:bg-indigo-950/45 sm:h-10 sm:w-10">
                    <Package className="h-4 w-4 text-indigo-600 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="text-sm font-semibold text-foreground sm:text-base">Lagerung</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Möbel einlagern</p>
                  </div>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Versicherte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Bis zu 5 Offerten vergleichen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </div>

            {/* Side Card */}
            <div className="relative md:col-span-2">
              <div className="rounded-2xl border-4 border-emerald-200 bg-card p-8 shadow-2xl dark:border-emerald-800/80">
                <div className="mb-6 flex items-center justify-center">
                  <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-950/50">
                    <BarChart3 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <h3 className="heading-3 text-center">
                  Finden Sie eine Umzugsfirma in Ihrer Nähe
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: 'Kurzes Formular ausfüllen – in ca. 2 Minuten erledigt',
                      description: 'Nur die wichtigsten Angaben zu Ihrem Umzug – schnell und unkompliziert.',
                    },
                    {
                      step: 2,
                      title: 'Bis zu fünf Offerten regionaler Anbieter gegenüberstellen',
                      description: 'Transparent vergleichen und das beste Preis-Leistungs-Verhältnis finden.',
                    },
                    {
                      step: 3,
                      title: 'Überzeugt ein Angebot? Umzugsfirma direkt beauftragen',
                      description: 'Sie entscheiden – buchen Sie, wenn ein Angebot zu Ihnen passt.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white dark:bg-emerald-500"
                        aria-hidden
                      >
                        {item.step}
                      </span>
                      <div>
                        <p className="font-semibold leading-snug text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
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
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="mb-3 inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-300">
                <Lightbulb className="mr-2 h-4 w-4" />
                Der richtige Vergleich
              </div>
              <h2 className="heading-2 !mt-0">
                Der Weg zum stressfreien Umzug beginnt mit dem richtigen Vergleich
            </h2>
              <p className="text-body mb-6">
                Ein Umzug in der Schweiz kostet durchschnittlich zwischen <strong>1&apos;500 und 4&apos;000 CHF</strong> – je nach Wohnungsgrösse und Distanz. Das Problem: Bei über 500 aktiven Umzugsfirmen schweizweit variieren die Preise für identische Leistungen um bis zu <strong>800 CHF</strong>. Ohne systematischen Vergleich zahlen Sie schnell zu viel oder landen bei einem Anbieter, dessen Service nicht Ihren Erwartungen entspricht.
              </p>
              <p className="text-body mb-6">
                Die gute Nachricht: Mit einer strukturierten Suche nach Umzugsofferten finden Sie in wenigen Schritten den passenden Umzugspartner für Ihre Bedürfnisse. Über <strong>Online-Offerten.ch</strong> können Sie durch das Ausfüllen eines kurzen Formulars gezielt Angebote von Umzugsfirmen erhalten, die zu Ihren Anforderungen passen. Dieser Leitfaden zeigt Ihnen, wie Sie seriöse Umzugsunternehmen erkennen, typische Fehler vermeiden und das beste Preis-Leistungsverhältnis für Ihren <Link href="/umzugsfirma/privatumzug" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Privatumzug</Link> oder <Link href="/umzugsfirma/geschaeftsumzug" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Firmenumzug</Link> erzielen.
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
      <section className="bg-gradient-to-b from-muted/45 to-background py-12 md:py-16 dark:from-muted/15">
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
                description: 'Bei identischer Leistung liegen die Preisunterschiede zwischen Umzugsfirmen oft bei 300 bis 800 CHF. Durch das Einholen von mindestens vier Offerten sparen Kunden im Durchschnitt 20 bis 40% der Umzugskosten.'
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
              <Card
                key={index}
                className="border-2 border-border bg-card shadow-md transition-shadow hover:border-emerald-300/80 hover:shadow-lg dark:hover:border-emerald-700/50"
              >
                      <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
                    <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-950/45">
                      <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                          </div>
                            {item.title}
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
            ))}
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/90 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-body italic">
              Mit einem strukturierten Vergleich verwandeln Sie die stressige Suche nach dem richtigen Umzugsservice in einen überschaubaren Prozess mit klarem Ergebnis.
            </p>
                  </div>
            </div>
          </section>

      {/* ===== WIE FUNKTIONIERT EIN UMZUGSVERGLEICH (5 Schritte) ===== */}
      <section className="bg-background py-12 md:py-16">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white shadow-lg dark:bg-emerald-500 md:h-14 md:w-14">
                        {step.number}
                      </div>
                </div>
                <div className="flex-1 bg-card border border-border rounded-lg p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-body">{step.description}</p>
                      </div>
                    </div>
            ))}
          </div>

          {/* Vorteile Online-Offerten.ch */}
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/90 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="mb-3 text-xl font-semibold text-foreground">Vorteile mit Online-Offerten.ch gegenüber eigenständiger Suche</h3>
            <p className="text-body mb-4">
              <strong>Online-Offerten.ch</strong> spart Ihnen die zeitaufwändige Recherche im Internet. Statt einzelne Unternehmen anzurufen und Informationen zusammenzutragen, erhalten Sie mit einer einzigen Anfrage mehrere vergleichbare Offerten. Die von uns vermittelten geprüften Anbieter sind regional aktiv, verfügen über einen festen Standort in der Schweiz und sind auf Umzüge in Ihrer Region spezialisiert.
            </p>
            <p className="text-body mb-4">
              Bei uns finden Sie zudem Bewertungen und Erfahrungsberichte früherer Kunden, die Ihnen bei der Auswahl helfen. Zusätzlich können Sie auf Online-Offerten.ch gezielt nach Umzugsfirmen in Ihrer Region oder mit speziellen Zusatzleistungen wie <Link href="/reinigung/umzugsreinigung" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Endreinigung</Link> oder Montageservice filtern – so wird die Suche für Sie einfacher.
            </p>
            <p className="text-body">
              So vergleichen Sie mit Online-Offerten.ch Umzugsservices in der Schweiz effizient und sicher und finden den passenden Anbieter für Ihren Umzug.
                    </p>
                  </div>
            </div>
          </section>

      {/* ===== KOSTENÜBERSICHT NACH WOHNUNGSGRÖSSE ===== */}
      <section className="bg-gradient-to-b from-muted/45 to-background py-12 md:py-16 dark:from-muted/15">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-3 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800 dark:bg-blue-950/45 dark:text-blue-300">
            <Calculator className="mr-2 h-4 w-4" />
            Kostenübersicht
          </div>
          <h2 className="heading-2 !mt-0">
            Umzugspreis nach Wohnungsgrösse
            </h2>
          <p className="text-body mb-8">
            Die <Link href="/umzugsfirma/umzugskosten" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Umzugskosten in der Schweiz</Link> hängen von mehreren Faktoren ab. Die folgende Übersicht zeigt typische Preisbereiche:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-card border border-border rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-emerald-600 text-white dark:bg-emerald-700">
                  <th className="px-6 py-4 text-left font-bold">Wohnungsgrösse</th>
                  <th className="px-6 py-4 text-left font-bold">Lokaler Umzug</th>
                  <th className="px-6 py-4 text-left font-bold">Kantonsübergreifend</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-background">
                  <td className="px-6 py-4 font-semibold text-foreground border-b border-border">1–2 Zimmer</td>
                  <td className="px-6 py-4 text-muted-foreground border-b border-border">800 – 1&apos;500 CHF</td>
                  <td className="px-6 py-4 text-muted-foreground border-b border-border">1&apos;200 – 2&apos;200 CHF</td>
                </tr>
                <tr className="bg-muted/35 dark:bg-muted/20">
                  <td className="px-6 py-4 font-semibold text-foreground border-b border-border">3–4 Zimmer</td>
                  <td className="px-6 py-4 text-muted-foreground border-b border-border">1&apos;500 – 2&apos;800 CHF</td>
                  <td className="px-6 py-4 text-muted-foreground border-b border-border">2&apos;200 – 4&apos;000 CHF</td>
                </tr>
                <tr className="bg-background">
                  <td className="px-6 py-4 font-semibold text-foreground border-b border-border">5+ Zimmer</td>
                  <td className="px-6 py-4 text-muted-foreground border-b border-border">2&apos;800 – 4&apos;500 CHF</td>
                  <td className="px-6 py-4 text-muted-foreground border-b border-border">4&apos;000 – 7&apos;000 CHF</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Zusatzkosten & Preisfaktoren */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Zusatzkosten, die häufig anfallen
              </h3>
              <ul className="text-sm text-muted-foreground space-y-3">
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
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Faktoren, die den Preis beeinflussen
              </h3>
              <ul className="text-sm text-muted-foreground space-y-3">
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

          <div className="rounded-lg border border-amber-200 bg-amber-50/90 p-6 dark:border-amber-900/50 dark:bg-amber-950/25">
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-body">
                <strong>Tipp:</strong> Fordern Sie immer einen Festpreis statt Stundenlohn an. So vermeiden Sie unerwartete Mehrkosten, wenn der Umzug länger dauert als geplant.
              </p>
            </div>
                        </div>
                      </div>
      </section>

      {/* ===== SPEZIALDIENSTLEISTUNGEN UND ZUSATZLEISTUNGEN ===== */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-3 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-800 dark:bg-purple-950/45 dark:text-purple-300">
            <Truck className="mr-2 h-4 w-4" />
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
              <Card key={index} className="border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-950/45">
                      <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
              ))}
          </div>

          <p className="text-body">
            Die gezielte Auswahl dieser Zusatzleistungen ermöglicht es, den Umzugsservice optimal auf die eigenen Anforderungen abzustimmen. Erfahren Sie mehr über <Link href="/umzugsfirma/klaviertransport" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Spezialtransporte</Link> oder starten Sie jetzt Ihre <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">kostenlose Anfrage</Link>.
          </p>
            </div>
          </section>

      {/* ===== SERIÖSE UMZUGSFIRMA ERKENNEN ===== */}
      <section className="bg-gradient-to-b from-muted/45 to-background py-12 md:py-16 dark:from-muted/15">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="mb-3 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800 dark:bg-blue-950/45 dark:text-blue-300">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Qualitätskriterien
              </div>
              <h2 className="heading-2 !mt-0">
                Woran erkennt man eine seriöse Umzugsfirma
              </h2>
              <p className="text-body mb-6">
                Die Auswahl des richtigen Umzugsunternehmens ist entscheidend für einen reibungslosen Ablauf. Diese Kriterien helfen bei der Beurteilung:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2">Rechtliche Kriterien:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" /> Eintrag im Handelsregister mit Schweizer Geschäftssitz</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" /> Gültige Mehrwertsteuer-Nummer (UID)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" /> Gewerbebewilligung für Gütertransporte</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2">Versicherungsschutz:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" /> Transportversicherung mit mindestens 1&apos;000 CHF pro Kubikmeter</li>
                    <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" /> Haftpflichtversicherung für Schäden an Ihrem Eigentum und in der Wohnung</li>
                    <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" /> Klare Regelung zur Schadensmeldung und -abwicklung</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2">Transparenz und Professionalität:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Detaillierte schriftliche Offerte mit allen Leistungen</li>
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Keine Forderung nach Vorauskasse</li>
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Kostenlose Besichtigung bei grösseren Umzügen</li>
                    <li className="flex items-start gap-2"><Eye className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" /> Geschultes Personal und eigener Fuhrpark</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2">Referenzen und Bewertungen:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-2"><Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" /> Positive <Link href="/kunden-bewertungen" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Kundenbewertungen</Link> auf Google oder Bewertungsportalen</li>
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
              <div className="rounded-lg border border-red-200 bg-red-50/90 p-6 dark:border-red-900/55 dark:bg-red-950/35">
                <h4 className="mb-3 flex items-center gap-2 font-bold text-red-900 dark:text-red-200">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  Warnsignale, bei denen Sie vorsichtig sein sollten:
                </h4>
                <ul className="space-y-2 text-sm text-red-800 dark:text-red-200/95">
                  <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" /> Angebote deutlich unter dem Marktpreis</li>
                  <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" /> Haustürgeschäfte ohne schriftliche Unterlagen</li>
                  <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" /> Fehlende oder unvollständige Kontaktdaten</li>
                  <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400" /> Druck zur sofortigen Unterschrift ohne Bedenkzeit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TYPISCHE FEHLER BEIM OFFERTENVERGLEICH ===== */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-3 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800 dark:bg-orange-950/45 dark:text-orange-300">
            <AlertTriangle className="mr-2 h-4 w-4" />
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
              <div
                key={index}
                className="rounded-lg border-2 border-border bg-card p-5 shadow-sm transition-colors hover:border-orange-300/80 dark:hover:border-orange-700/50"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-800 dark:bg-orange-950/50 dark:text-orange-300">
                    {error.number}
                  </div>
                  <h4 className="font-bold text-foreground">{error.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{error.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/90 p-6 dark:border-amber-900/50 dark:bg-amber-950/25">
            <p className="text-body italic">
              Erfahrung zeigt: 70% aller Beschwerden bei Konsumentenschutzstellen entstehen durch fehlende schriftliche Vereinbarungen oder unzureichenden Versicherungsschutz.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAZIT UND NÄCHSTE SCHRITTE ===== */}
      <section className="bg-gradient-to-b from-muted/45 to-background py-12 md:py-16 dark:from-muted/15">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2">Fazit und nächste Schritte</h2>
          <p className="text-body mb-6">
            Der Vergleich von Umzugsfirmen in der Schweiz ist kein Luxus, sondern eine sinnvolle Investition Ihrer Zeit. Mit dem richtigen Vorgehen sparen Sie mehrere Hundert Franken und vermeiden Stress am Umzugstag.
          </p>

          <div className="bg-card border border-border rounded-lg p-6 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Die wichtigsten Punkte zusammengefasst:</h3>
            <ul className="space-y-3 text-body">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                <span>Holen Sie mindestens vier Offerten ein</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                <span>Vergleichen Sie Leistungen, nicht nur Preise</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                <span>Prüfen Sie Versicherung und Referenzen</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                <span>Buchen Sie 4 bis 6 Wochen im Voraus</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                <span>Lassen Sie alles schriftlich bestätigen</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/90 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="mb-3 text-xl font-bold text-foreground">Ihr nächster Schritt:</h3>
            <p className="text-body mb-4">
              Starten Sie jetzt Ihre kostenlose Anfrage über <strong>Online-Offerten.ch</strong>. In wenigen Klicks erhalten Sie bis zu fünf unverbindliche Angebote von geprüften Umzugsfirmen aus Ihrer Umgebung. Der Service ist 100% kostenlos und ohne Verpflichtung.
            </p>
            <p className="text-body mb-6">
              Egal ob <Link href="/umzugsfirma/privatumzug" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Privatumzug</Link> in <Link href="/umzugsfirma/zuerich" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Zürich</Link>, <Link href="/umzugsfirma/geschaeftsumzug" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Geschäftsumzug</Link> in <Link href="/umzugsfirma/bern" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Bern</Link> oder Zügeln von Kanton zu Kanton: Die Plattform vermittelt neutral zwischen Ihnen und qualifizierten Partnerfirmen, die auf Ihre Art von Umzug spezialisiert sind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                className="group rounded-lg bg-emerald-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2">
                  Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-emerald-800 dark:text-emerald-300">
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
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Umzugsfirmen in Ihrer Region vergleichen</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Finden Sie <Link href="/umzugsfirma-in-der-naehe" className="text-emerald-700 underline font-medium hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">Umzugsfirmen in der Nähe</Link> und vergleichen Sie die besten Anbieter in den grössten Städten der Schweiz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {locations.map((location) => (
              <Link key={location.name} href={location.href}>
                <Card className="h-full cursor-pointer transition-all hover:border-emerald-500 hover:shadow-lg dark:hover:border-emerald-600">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <MapPin className="mr-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-foreground">Umzugsfirma {location.name}</span>
                      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Service Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
                  <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Umzug
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { name: 'Umzugsfirma finden', href: '/umzugsfirma' },
                    { name: 'Privatumzug', href: '/umzugsfirma/privatumzug' },
                    { name: 'Geschäftsumzug', href: '/umzugsfirma/geschaeftsumzug' },
                    { name: 'Internationale Umzüge', href: '/umzugsfirma/auslandumzug' },
                    { name: 'Spezialtransporte', href: '/umzugsfirma/klaviertransport' },
                    { name: 'Umzugskosten', href: '/umzugsfirma/umzugskosten' },
                    { name: 'Umzugsfirma in der Nähe', href: '/umzugsfirma-in-der-naehe' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
                  <Star className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                  Reinigung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { name: 'Reinigungsfirma finden', href: '/reinigung' },
                    { name: 'Umzugsreinigung', href: '/reinigung/umzugsreinigung' },
                    { name: 'Fensterreinigung', href: '/reinigung/fensterreinigung' },
                    { name: 'Büroreinigung', href: '/reinigung/buero_reinigung' },
                    { name: 'Baureinigung', href: '/reinigung/baureinigung' },
                    { name: 'Reinigungskosten', href: '/reinigung/reinigungskosten' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
                  <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
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
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
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
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            <div className="md:col-span-3">
              <div className="mb-8">
                <h2 className="heading-2">Häufig gestellte Fragen (FAQ) zu Umzugsfirmen vergleichen in der Schweiz</h2>
                <p className="text-body max-w-2xl">
                  Alles Wichtige rund um das Vergleichen von Umzugsfirmen
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-blue-600 dark:hover:text-blue-400">
                      <h4 className="faq-question">{item.q}</h4>
                    </AccordionTrigger>
                    <AccordionContent className="text-body leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="relative md:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border-4 border-background shadow-2xl">
                <NextImage
                  src="/bilder/umzugsfirma-privatumzug-600-400.webp"
                  alt="FAQ zum Vergleich von Umzugsfirmen in der Schweiz"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                <p className="text-sm font-bold">Fragen & Antworten</p>
                <p className="text-xs text-blue-100">Rund um Umzugsfirmen-Vergleich</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 md:py-16 relative" style={{ backgroundImage: 'url(/umzug/b073e2a2-3bd4-4499-af1a-f2cf4f3e1a92.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl text-left">
            <h2 className="heading-2-white">
              Jetzt Umzugsofferten vergleichen
            </h2>

            {/* Search Form */}
            <UmzugsfirmaInDerNaeheHeroForm />

            {/* Rating Card */}
            {ratingStats.reviewCount > 0 && (
              <div
                className="mt-6 flex flex-col items-start gap-4 rounded-xl bg-card p-5 transition-all duration-300 sm:p-6 md:flex-row md:items-start"
                style={{
                  boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex-1 pt-1 w-full md:w-auto">
                  <div className="flex flex-wrap justify-start items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-muted-foreground">Kostenlos & unverbindlich</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-muted-foreground">Versicherte Partner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-muted-foreground">Bis zu 40% sparen</span>
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
