'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  CheckCircle, MapPin, Home, Building, Sparkles, Droplets,
  Sparkle, Wrench, Clock, ShieldCheck, FileText, Mail, Star,
  ArrowRight, Zap,
  ChevronRight as ChevronRightIcon
} from 'lucide-react'

const ReinigungsfirmaInDerNaehePageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/reinigungsfirma'

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2')
  }

  // Inject structured data
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
              "name": "Reinigungsfirma in der Nähe",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Reinigungsfirma in der Nähe finden",
          "serviceType": "Reinigungsservice",
          "description": "Finden Sie die besten lokalen Reinigungsunternehmen. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Reinigungsanbietern in Ihrer Region für Büroreinigung, Haushaltsreinigung und mehr.",
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
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Reinigungsfirma Offerten in der Nähe"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://online-offerten.ch/#organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/logo-icon.webp",
          "description": "Vergleichsportal für Reinigungsfirmen in der Schweiz",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CH"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wie schnell erhalte ich Offerten von Reinigungsfirmen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die meisten Kunden erhalten innerhalb von 24 bis 48 Stunden die ersten Angebote. Bei dringenden Aufträgen geht es oft noch schneller."
              }
            },
            {
              "@type": "Question",
              "name": "Bin ich verpflichtet, eines der Angebote anzunehmen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nein, die Nutzung ist komplett unverbindlich. Sie entscheiden frei, ob und welchen Auftrag Sie vergeben möchten."
              }
            },
            {
              "@type": "Question",
              "name": "Wie werden die Reinigungsfirmen ausgewählt und überprüft?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Alle Partner durchlaufen einen Verifizierungsprozess. Wir prüfen Handelsregistereinträge, Versicherungen und sammeln kontinuierlich Feedback von Kunden."
              }
            },
            {
              "@type": "Question",
              "name": "Was passiert, wenn ich unzufrieden mit einem vermittelten Anbieter bin?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kontaktieren Sie uns direkt. Wir nehmen jedes Feedback ernst und arbeiten nur mit Reinigungsfirmen zusammen, die konstant gute Qualität liefern."
              }
            },
            {
              "@type": "Question",
              "name": "In welchen Regionen der Schweiz ist der Service verfügbar?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir decken die gesamte Schweiz ab – von Grossstädten wie Zürich und Bern bis zu ländlichen Gemeinden. Unser Netzwerk wächst kontinuierlich."
              }
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'reinigungsfirma-schema'
    
    const existing = document.getElementById('reinigungsfirma-schema')
    if (existing && existing.parentNode) {
      try {
        existing.remove()
      } catch (e) {
        // Element zaten kaldırılmış olabilir
      }
    }
    
    document.head.appendChild(script)
    
    return () => {
      if (typeof document === 'undefined') return
      const scriptToRemove = document.getElementById('reinigungsfirma-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        try {
          scriptToRemove.remove()
        } catch (e) {
          // Element zaten kaldırılmış olabilir
        }
      }
    }
  }, [])

  const faqItems = [
    {
      q: "Wie schnell erhalte ich Offerten von Reinigungsfirmen?",
      a: "Die meisten Kunden erhalten innerhalb von 24 bis 48 Stunden die ersten Angebote. Bei dringenden Aufträgen geht es oft noch schneller."
    },
    {
      q: "Bin ich verpflichtet, eines der Angebote anzunehmen?",
      a: "Nein, die Nutzung ist komplett unverbindlich. Sie entscheiden frei, ob und welchen Auftrag Sie vergeben möchten."
    },
    {
      q: "Wie werden die Reinigungsfirmen ausgewählt und überprüft?",
      a: "Alle Partner durchlaufen einen Verifizierungsprozess. Wir prüfen Handelsregistereinträge, Versicherungen und sammeln kontinuierlich Feedback von Kunden."
    },
    {
      q: "Was passiert, wenn ich unzufrieden mit einem vermittelten Anbieter bin?",
      a: "Kontaktieren Sie uns direkt. Wir nehmen jedes Feedback ernst und arbeiten nur mit Reinigungsfirmen zusammen, die konstant gute Qualität liefern."
    },
    {
      q: "In welchen Regionen der Schweiz ist der Service verfügbar?",
      a: "Wir decken die gesamte Schweiz ab – von Grossstädten wie Zürich und Bern bis zu ländlichen Gemeinden. Unser Netzwerk wächst kontinuierlich."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li><ChevronRightIcon className="w-4 h-4 text-gray-400" /></li>
              <li className="text-gray-900 font-medium" aria-current="page">Reinigungsfirma</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Left: Text */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                Lokale Reinigungsfirmen finden
              </div>
              <h1 className="heading-1 !mt-0">
                Reinigungsfirma in der Nähe finden – Kostenlose Offerten vergleichen
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Vergleichen Sie bis zu 5 Offerten von geprüften Reinigungsfirmen in Ihrer Region – kostenlos und unverbindlich.
              </p>

              {/* Reinigung Type Buttons */}
              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Dienstleistung aus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                {/* Endreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Endreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">mit Abnahmegarantie</p>
                  </div>
                </Link>

                {/* Wohnungsreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=wohnungsreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Wohnungsreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Privathaushalte</p>
                  </div>
                </Link>

                {/* Büroreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=buero"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Büroreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Gewerberäume</p>
                  </div>
                </Link>

                {/* Grundreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=grundreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                    <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Grundreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Tiefenreinigung</p>
                  </div>
                </Link>

                {/* Fensterreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=fensterreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                    <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Fensterreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Innen & Aussen</p>
                  </div>
                </Link>

                {/* Baureinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=baureinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Baureinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Nach Umbau/Neubau</p>
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 5 Offerten</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/reinigungsfirma/bbbd13c1-cc55-4a7c-88fb-781a368f7553.webp"
                  alt="Reinigungsfirma in der Nähe finden – Saubere Wohnung nach professioneller Reinigung"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                <p className="text-sm font-bold">Professionelle Reinigung</p>
                <p className="text-xs text-blue-100">In Ihrer Region</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Das Problem Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="heading-2">
                Das Problem: Zuverlässige Reinigungsfirmen in der Nähe zu finden ist zeitaufwändig und schwierig
              </h2>
              <p className="text-body mb-6">
                Die Suche nach einer passenden Reinigungsfirma in der Nähe kostet Zeit und Nerven. Dutzende Anbieter versprechen Qualität und Zuverlässigkeit, doch welches Reinigungsunternehmen hält wirklich, was es verspricht? Bewertungen auf Google liefern oft ein unvollständiges Bild, und persönliche Empfehlungen sind nicht immer verfügbar.
              </p>
              <p className="text-body">
                Online-Offerten.ch löst dieses Problem als neutrale Vergleichsplattform für die Schweiz. Statt selbst stundenlang zu recherchieren, beschreiben Sie einmalig Ihr Reinigungsprojekt – und erhalten direkt mehrere Angebote von regionalen Reinigungsfirmen. Die Anfrage ist <strong>kostenlos und unverbindlich</strong>, sodass Sie ohne Risiko die beste Wahl für Ihre Bedürfnisse treffen können.
              </p>
            </div>
            <div>
              <Image
                src="/reinigungsfirma/professionelle_wohnungsreinigung_team.webp"
                alt="Professionelle Reinigung – Saubere und gepflegte Wohnung"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warum Online-Offerten.ch Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <h2 className="heading-2">
              Warum Online-Offerten.ch für Ihre Reinigungsfirma-Suche nutzen?
            </h2>
            <p className="text-body mb-8">
              Fünf überzeugende Gründe sprechen für unsere Plattform bei der Auswahl Ihrer Reinigungsfirma:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Bis zu 5 regionale Anbieter</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Reinigungsfirmen aus Ihrer Umgebung melden sich persönlich bei Ihnen, ob in Zürich, Bern oder einer anderen Region der Schweiz.</p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">100% kostenlos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Für Sie entstehen keine Kosten, weder für die Anfrage noch für den Vergleich der Offerten. Komplett unverbindlich.</p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Verifizierte Betriebe</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Wir arbeiten ausschliesslich mit geprüften Partner-Betrieben zusammen, die über nachweisliches Know-how verfügen.</p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 p-3 rounded-lg mr-4">
                    <Star className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Transparenter Vergleich</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Sie sehen Preise, Leistungen und Konditionen auf einen Blick und treffen Ihre Wahl unabhängig.</p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Zeitersparnis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Statt fünf separate Anfragen zu stellen, erreichen Sie alle relevanten Anbieter mit einem einzigen Formular.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <p className="text-body italic">
              Mit Online-Offerten.ch erhalten Sie die Kraft eines professionellen Reinigungsservice ohne den Aufwand der Suche. Entwickelt für Privathaushalte und Unternehmen, liefert unsere Plattform Ergebnisse in wenigen Stunden.
            </p>
          </div>
        </div>
      </section>

      {/* So funktioniert es Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <h2 className="heading-2">
              So funktioniert die Offerten-Anfrage
            </h2>
            <p className="text-body">
              In drei einfachen Schritten finden Sie die passende Reinigungsfirma für Ihr Projekt:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Reinigungsprojekt beschreiben",
                description: "Füllen Sie unser Formular aus und geben Sie alle relevanten Details an: Art der Reinigung, Grösse der Räumlichkeiten, gewünschter Zeitplan und besondere Anforderungen. Je genauer Ihre Angaben, desto präziser die Offerten.",
                icon: FileText
              },
              {
                number: "02",
                title: "Anfrage wird weitergeleitet",
                description: "Basierend auf Ihrem Standort und Ihren Bedürfnissen leiten wir Ihre Anfrage an passende Reinigungsunternehmen in Ihrer Nähe weiter. Diese erhalten alle notwendigen Informationen für ein massgeschneidertes Angebot.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: "Innerhalb kurzer Zeit melden sich die Reinigungsfirmen direkt bei Ihnen. Vergleichen Sie die Angebote in Ruhe, stellen Sie Fragen und entscheiden Sie sich für den Anbieter, der am besten passt.",
                icon: Star
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-blue-200 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <Card className="relative z-10 h-full border-2 border-blue-200 hover:border-blue-500 transition-colors">
                  <CardHeader className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <step.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-body italic">
              Die gesamte Abwicklung erfolgt schnell, unkompliziert und ohne versteckte Verpflichtungen.
            </p>
          </div>
        </div>
      </section>

      {/* Reinigungsdienstleistungen Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <h2 className="heading-2">
              Welche Reinigungsdienstleistungen finden Sie über unsere Plattform?
            </h2>
            <p className="text-body">
              Unsere Partner-Reinigungsfirmen decken das gesamte Spektrum professioneller Reinigungsdienstleistungen ab – für Ihr Zuhause wie für Ihr Büro.
            </p>
          </div>

          {/* Privat- und Haushaltsreinigung */}
          <div className="mb-12">
            <h3 className="heading-3 mb-6">Privat- und Haushaltsreinigung</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Home className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Wohnungsreinigung</h4>
                </div>
                <p className="text-body">
                  Gründliche Reinigung aller Räume in Ihrer Wohnung. Von Küche über Bad bis zum Wohnbereich sorgen professionelle Reinigungskräfte für Sauberkeit und Hygiene. Besonders bei Allergien oder Haustieren zahlt sich der Einsatz spezialisierter Ausrüstung aus.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=wohnungsreinigung" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Umzugsreinigung / Endreinigung</h4>
                </div>
                <p className="text-body">
                  Garantiert eine einwandfreie Übergabe bei Auszug oder Einzug. Viele Reinigungsfirmen bieten hier eine <strong>Abnahmegarantie</strong> – falls der Vermieter nicht zufrieden ist, wird kostenlos nachgereinigt. Umfasst typischerweise Fensterreinigung, Bodenreinigung und Säuberung aller Einbaugeräte.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-teal-100 p-2 rounded-lg mr-3">
                    <Clock className="h-5 w-5 text-teal-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Unterhaltsreinigung</h4>
                </div>
                <p className="text-body">
                  Regelmässige Pflege nach festem Zeitplan – wöchentlich, zweiwöchentlich oder monatlich. So bleibt Ihr Zuhause dauerhaft in bestem Zustand, ohne dass sich Schmutz ansammelt.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=2" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 p-2 rounded-lg mr-3">
                    <Droplets className="h-5 w-5 text-amber-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Grundreinigung</h4>
                </div>
                <p className="text-body">
                  Geht in die Tiefe: Hartnäckige Verschmutzungen, Kalkablagerungen und vernachlässigte Ecken werden gründlich behandelt. Bildet oft die Basis für eine anschliessende Unterhaltsreinigung.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=grundreinigung" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-teal-100 p-2 rounded-lg mr-3">
                    <Sparkle className="h-5 w-5 text-teal-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Fensterreinigung</h4>
                </div>
                <p className="text-body">
                  Streifenfreier Glanz durch Profis – auch bei schwer zugänglichen Fenstern. Mit spezieller Ausrüstung erreichen Reinigungskräfte selbst Oberlichter und Dachfenster sicher.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=2" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Home className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Hausreinigung</h4>
                </div>
                <p className="text-body">
                  Erweitert den Service auf das gesamte Haus inklusive Treppenhausreinigung, Garage und Aussenbereiche. Für Familien mit wenig Zeit eine echte Entlastung im Alltag.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=hausreinigung" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Gewerbliche Reinigungsdienste */}
          <div>
            <h3 className="heading-3 mb-6">Gewerbliche Reinigungsdienste</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <Building className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Büroreinigung</h4>
                </div>
                <p className="text-body">
                  Hält Arbeitsplätze hygienisch und repräsentativ. Ein sauberes Büro steigert nachweislich die Produktivität und das Wohlbefinden im Team. Flexible Einsatzzeiten ausserhalb der Geschäftszeiten.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=buero" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <Wrench className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Baureinigung</h4>
                </div>
                <p className="text-body">
                  Von der Grob- bis zur Feinreinigung nach Neu- oder Umbauten. Spezialisierte Betriebe entfernen Baustaub, Klebereste und Schutzfolien professionell und machen Ihr Objekt bezugsfertig.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=baureinigung" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-rose-100 p-2 rounded-lg mr-3">
                    <Droplets className="h-5 w-5 text-rose-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Bodenreinigung</h4>
                </div>
                <p className="text-body">
                  Pflege aller Bodenbeläge: Parkett, Laminat, Fliesen, Teppich oder Industrieböden. Je nach Material kommen unterschiedliche Techniken zum Einsatz, um den Wert des Bodens langfristig zu erhalten.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=2" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-orange-100 p-2 rounded-lg mr-3">
                    <Building className="h-5 w-5 text-orange-600" />
                  </div>
                  <h4 className="heading-4 !mt-0">Fassaden- & Hofreinigung</h4>
                </div>
                <p className="text-body">
                  Beseitigt Verschmutzungen, Graffiti und Algenbefall an Gebäudeaussenwänden. Hochdruckreinigung oder schonende Verfahren – erfahrene Reinigungsunternehmen wählen die passende Methode. Inklusive gepflegter Eingangsbereiche, Parkplätze und Höfe.
                </p>
                <Link href="/kostenlose-offerte-anfordern?service=reinigung&step=2" className="inline-flex items-center text-blue-600 font-semibold text-sm mt-3 hover:text-blue-800 transition-colors">
                  Offerte anfordern <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Was macht Online-Offerten.ch anders Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2 mb-8">
            Was macht Online-Offerten.ch anders?
          </h2>
          <p className="text-body mb-8">
            Wir unterscheiden uns grundlegend von einzelnen Reinigungsfirmen oder Bewertungsportalen:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">Neutrale Plattform</h4>
                  <p className="text-body">Wir vermitteln ausschliesslich und haben kein Interesse daran, einen bestimmten Anbieter zu bevorzugen. Ihre freie Wahl steht im Mittelpunkt.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">Fokus auf regionale Anbieter</h4>
                  <p className="text-body">Ob Zürich, Bern, Basel oder ländliche Regionen: Wir kennen die lokalen Gegebenheiten und verbinden Sie mit Reinigungsfirmen in Ihrer Nähe.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">Transparenter Vergleichsprozess</h4>
                  <p className="text-body">Was Sie sehen, ist was Sie bekommen. Keine Gebühren, keine Verpflichtungen, keine Überraschungen.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">Schweizspezifische Kenntnisse</h4>
                  <p className="text-body">Von Mietrecht über typische Abnahmestandards bis zu regionalen Preisen: Unsere Plattform ist auf den Schweizer Markt zugeschnitten.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kosten und Konditionen Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2 mb-8">
            Kosten und Konditionen
          </h2>
          <p className="text-body mb-8">
            Transparenz steht bei uns an erster Stelle:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">100% kostenlose Nutzung</h4>
                  <p className="text-body">Für Privatkunden und Unternehmen. Die Anfrage, der Vergleich und die Beratung kosten Sie nichts.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">Keine Vermittlungsgebühren</h4>
                  <p className="text-body">Sie bezahlen ausschliesslich die Reinigungsfirma Ihrer Wahl für deren erbrachte Dienstleistungen. Keine versteckten Kosten.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">Faire Konditionen</h4>
                  <p className="text-body">Die Reinigungsunternehmen entrichten eine Gebühr für qualifizierte Anfragen. Dies stellt sicher, dass nur seriöse Betriebe aktiv sind.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="heading-5 mb-2">Volle Preistransparenz</h4>
                  <p className="text-body">Die Preise für die eigentliche Reinigung legen die Anbieter fest. Durch den Vergleich sehen Sie sofort, welche Kosten marktüblich sind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Left: FAQ */}
            <div className="md:col-span-3">
              <div className="mb-8">
                <h2 className="heading-2">
                  Häufig gestellte Fragen (FAQ)
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                      <h4 className="faq-question">{item.q}</h4>
                    </AccordionTrigger>
                    <AccordionContent className="text-body leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right: Image */}
            <div className="relative md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/reinigungsfirma/f1fd77b6.webp"
                  alt="Reinigungsfirma FAQ – Häufig gestellte Fragen zur professionellen Reinigung"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                <p className="text-sm font-bold">Fragen & Antworten</p>
                <p className="text-xs text-blue-100">Rund um Reinigungsfirmen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-6">
              Jetzt kostenlose Offerten anfordern
            </h2>
            <p className="text-body mb-8">
              Finden Sie in wenigen Minuten die passende Reinigungsfirma für Ihre Räumlichkeiten – ob Wohnungsreinigung, Büroreinigung oder Baureinigung.
            </p>
            <Button
              onClick={handleCtaClick}
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 shadow-xl"
            >
              <Zap className="mr-2 h-5 w-5" />
              Jetzt Offerten anfordern
            </Button>
            <p className="mt-6 text-gray-500 text-sm italic">
              Kein Risiko. Keine Kosten. Nur passende Angebote von Reinigungsfirmen in Ihrer Nähe.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span>Unverbindlich</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span>Geprüfte Schweizer Reinigungsunternehmen</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReinigungsfirmaInDerNaehePageClient
