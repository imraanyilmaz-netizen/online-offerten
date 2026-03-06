'use client'

import React, { useEffect } from 'react'
// framer-motion removed - CSS for better INP
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Home, Building, Globe, Package, Sparkles,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Truck, Box, Wrench, Shield, Phone, Mail, Calendar, ChevronRight
} from 'lucide-react'

const UmzugsfirmaPageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsfirma'

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
              "name": "Umzugsfirma",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Umzugsfirma finden und vergleichen",
          "serviceType": "Umzugsservice",
          "description": "Finden Sie die beste Umzugsfirma in der Schweiz. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen für Privatumzug, Geschäftsumzug und mehr.",
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
            "name": "Kostenlose Umzugsfirma Offerten"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Was ist eine Umzugsfirma und welche Dienstleistungen bietet sie?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Eine Umzugsfirma ist ein professionelles Unternehmen, das auf den Transport von Umzugsgut spezialisiert ist. Eine gute Umzugsfirma bietet umfassende Dienstleistungen wie Verpackung, Transport, Montage und Demontage von Möbeln, Umzugsreinigung sowie Spezialtransporte für wertvolle Gegenstände wie Klaviere oder Antiquitäten. Eine seriöse Umzugsfirma übernimmt alle organisatorischen Aufgaben rund um Ihren Umzug und sorgt für einen stressfreien Wohnungswechsel."
              }
            },
            {
              "@type": "Question",
              "name": "Wie finde ich die richtige Umzugsfirma für meinen Umzug?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Suche nach der richtigen Umzugsfirma beginnt mit einer klaren Definition Ihrer Bedürfnisse. Überlegen Sie, welche Leistungen Sie benötigen, wann der Umzug stattfinden soll und welches Budget Sie zur Verfügung haben. Nutzen Sie Vergleichsportale wie Online-Offerten.ch, um mehrere Offerten von geprüften Umzugsfirmen zu erhalten. Vergleichen Sie nicht nur die Preise, sondern auch die enthaltenen Leistungen, Versicherungen und Bewertungen. Eine seriöse Umzugsfirma bietet transparente Offerten, ist versichert und verfügt über positive Kundenbewertungen."
              }
            },
            {
              "@type": "Question",
              "name": "Was kostet eine Umzugsfirma in der Schweiz?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Kosten für eine Umzugsfirma hängen von verschiedenen Faktoren ab: Umzugsstrecke, Umfang des Umzugsguts, Anzahl der Stockwerke, benötigte Leistungen und Umzugsdatum. Ein durchschnittlicher Wohnungsumzug in der Schweiz kostet zwischen 1.500 und 4.000 CHF. Geschäftsumzüge oder Umzüge mit Spezialtransporten können deutlich teurer sein. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Umzugsfirmen. Durch den Vergleich können Sie bis zu 40% sparen."
              }
            },
            {
              "@type": "Question",
              "name": "Worauf sollte ich bei der Auswahl einer Umzugsfirma achten?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bei der Auswahl einer Umzugsfirma sollten Sie auf mehrere Kriterien achten: Versicherungsschutz (Transportversicherung und Betriebshaftpflicht), Erfahrung und Referenzen, transparente und detaillierte Offerten, Erreichbarkeit und Kommunikation, Bewertungen und Empfehlungen sowie die Verfügbarkeit am gewünschten Umzugstag. Eine professionelle Umzugsfirma bietet eine kostenlose Besichtigung vor Ort, erstellt eine schriftliche Offerte und beantwortet alle Ihre Fragen transparent."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viele Offerten erhalte ich von Umzugsfirmen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Umzugsfirmen aus Ihrer Region. Diese Offerten werden Ihnen per E-Mail zugesendet und enthalten alle wichtigen Details wie Preis, enthaltene Leistungen, Versicherungen und Kontaktinformationen. So haben Sie die perfekte Vergleichsgrundlage, um die beste Umzugsfirma für Ihren Bedarf zu finden."
              }
            },
            {
              "@type": "Question",
              "name": "Wie wird die Qualität der Umzugsfirmen sichergestellt?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Umzugsfirmen in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen. Unsere Partner sind etablierte Umzugsfirmen mit langjähriger Erfahrung."
              }
            },
            {
              "@type": "Question",
              "name": "Kann ich mit einer Umzugsfirma auch einen internationalen Umzug durchführen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, viele Umzugsfirmen bieten auch Auslandumzüge an. Diese erfordern zusätzliche Planung, Zolldokumentation und Koordination. Bei Online-Offerten.ch können Sie auch für Auslandumzüge Offerten anfordern. Spezialisierte Umzugsfirmen für Auslandumzüge verfügen über die notwendige Expertise und Erfahrung im Umgang mit Zollbestimmungen und Transportlogistik über Landesgrenzen hinweg."
              }
            },
            {
              "@type": "Question",
              "name": "Ist der Service von Online-Offerten.ch wirklich kostenlos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 5 Offerten von geprüften Umzugsfirmen in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten."
              }
            }
          ]
        },
        {
          "@type": "HowTo",
          "name": "Wie finde ich die beste Umzugsfirma?",
          "description": "Schritt-für-Schritt Anleitung zum Finden und Vergleichen von Umzugsfirmen",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Umzugsdetails definieren",
              "text": "Definieren Sie Ihre Umzugsanforderungen: Umzugsdatum, Umzugsstrecke, Wohnungsgrösse, gewünschte Leistungen und Budget."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Offerten anfordern",
              "text": "Fordern Sie über Online-Offerten.ch bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen in Ihrer Region an."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Offerten vergleichen",
              "text": "Vergleichen Sie die erhaltenen Offerten: Preise, enthaltene Leistungen, Versicherungen, Bewertungen und Kommunikation."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Umzugsfirma auswählen",
              "text": "Wählen Sie die Umzugsfirma aus, die am besten zu Ihren Bedürfnissen passt und kontaktieren Sie diese direkt."
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Umzug durchführen",
              "text": "Buchen Sie die Umzugsfirma und führen Sie Ihren Umzug stressfrei durch."
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'umzugsfirma-schema'
    
    const existing = document.getElementById('umzugsfirma-schema')
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
      const scriptToRemove = document.getElementById('umzugsfirma-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        try {
          scriptToRemove.remove()
        } catch (e) {
          // Element zaten kaldırılmış olabilir
        }
      }
    }
  }, [])

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2')
  }

  const faqItems = [
    { 
      q: "Was ist eine Umzugsfirma und welche Dienstleistungen bietet sie?", 
      a: "Eine Umzugsfirma ist ein professionelles Unternehmen, das auf den Transport von Umzugsgut spezialisiert ist. Ein guter Partner bietet umfassende Dienstleistungen wie Verpackung, Transport, Montage und Demontage von Möbeln, Umzugsreinigung sowie Spezialtransporte für wertvolle Gegenstände wie Klaviere oder Antiquitäten. Ein seriöser Dienstleister übernimmt alle organisatorischen Aufgaben rund um Ihren Umzug und sorgt für einen stressfreien Wohnungswechsel. Professionelle Anbieter verfügen über geschultes Personal, spezielle Fahrzeuge und das notwendige Equipment für einen sicheren Transport."
    },
    { 
      q: "Wie finde ich die richtige Umzugsfirma für meinen Umzug?", 
      a: "Die Suche nach dem richtigen Partner beginnt mit einer klaren Definition Ihrer Bedürfnisse. Überlegen Sie, welche Leistungen Sie benötigen, wann der Umzug stattfinden soll und welches Budget Sie zur Verfügung haben. Nutzen Sie Vergleichsportale wie Online-Offerten.ch, um mehrere Offerten von geprüften Partnern zu erhalten. Vergleichen Sie nicht nur die Preise, sondern auch die enthaltenen Leistungen, Versicherungen und Bewertungen. Ein seriöser Dienstleister bietet transparente Offerten, ist versichert und verfügt über positive Kundenbewertungen. Achten Sie auch auf die Erreichbarkeit und Kommunikationsqualität des Anbieters."
    },
    { 
      q: "Was kostet eine Umzugsfirma in der Schweiz?", 
      a: "Die Kosten hängen von verschiedenen Faktoren ab: Umzugsstrecke, Umfang des Umzugsguts, Anzahl der Stockwerke, benötigte Leistungen und Umzugsdatum. Ein durchschnittlicher Wohnungsumzug in der Schweiz kostet zwischen 1.500 und 4.000 CHF. Geschäftsumzüge oder Umzüge mit Spezialtransporten können deutlich teurer sein. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Anbietern. Durch den Vergleich können Sie bis zu 40% sparen. Ein günstiger Anbieter bedeutet nicht immer das beste Angebot – achten Sie auf Qualität und enthaltene Leistungen."
    },
    { 
      q: "Worauf sollte ich bei der Auswahl einer Umzugsfirma achten?", 
      a: "Bei der Auswahl eines Partners sollten Sie auf mehrere Kriterien achten: Versicherungsschutz (Transportversicherung und Betriebshaftpflicht), Erfahrung und Referenzen, transparente und detaillierte Offerten, Erreichbarkeit und Kommunikation, Bewertungen und Empfehlungen sowie die Verfügbarkeit am gewünschten Umzugstag. Ein professioneller Dienstleister bietet eine kostenlose Besichtigung vor Ort, erstellt eine schriftliche Offerte und beantwortet alle Ihre Fragen transparent. Vermeiden Sie Anbieter, die nur mündliche Zusagen machen oder Druck ausüben, sofort zu buchen."
    },
    { 
      q: "Wie viele Offerten erhalte ich von Umzugsfirmen?", 
      a: "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Partnern aus Ihrer Region. Diese Offerten werden Ihnen per E-Mail zugesendet und enthalten alle wichtigen Details wie Preis, enthaltene Leistungen, Versicherungen und Kontaktinformationen. So haben Sie die perfekte Vergleichsgrundlage, um den besten Partner für Ihren Bedarf zu finden. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein."
    },
    { 
      q: "Wie wird die Qualität der Umzugsfirmen sichergestellt?", 
      a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Partner in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen. Unsere Partner sind etablierte Dienstleister mit langjähriger Erfahrung. Wir überprüfen regelmässig die Qualität unserer Partnerfirmen und nehmen nur seriöse Anbieter in unser Netzwerk auf."
    },
    { 
      q: "Kann ich mit einer Umzugsfirma auch einen internationalen Umzug durchführen?", 
      a: "Ja, viele Partner bieten auch Auslandumzüge an. Diese erfordern zusätzliche Planung, Zolldokumentation und Koordination. Bei Online-Offerten.ch können Sie auch für Auslandumzüge Offerten anfordern. Spezialisierte Dienstleister für Auslandumzüge verfügen über die notwendige Expertise und Erfahrung im Umgang mit Zollbestimmungen und Transportlogistik über Landesgrenzen hinweg. Auslandumzüge sind komplexer und erfordern mehr Vorlaufzeit als lokale Umzüge."
    },
    {
      q: "Ist der Service von Online-Offerten.ch wirklich kostenlos?",
      a: "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 5 Offerten von geprüften Partnern in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Die Partner zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen – für Sie bleibt der Service komplett kostenlos."
    },
    {
      q: "Wie lange im Voraus sollte ich eine Umzugsfirma buchen?",
      a: "Wir empfehlen, mindestens 1-2 Monate im Voraus zu buchen, besonders in den Sommermonaten und zum Monatsende, da dies die geschäftigsten Zeiten für Dienstleister sind. Frühzeitige Buchung gibt Ihnen mehr Auswahl und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Partnern ist begrenzt. Planen Sie Ihren Umzug frühzeitig und fordern Sie rechtzeitig Offerten an."
    },
    {
      q: "Was ist der Unterschied zwischen einer Umzugsfirma und einem privaten Umzugshelfer?",
      a: "Ein professioneller Dienstleister ist ein lizenziertes Unternehmen mit versicherten Mitarbeitern, speziellen Fahrzeugen und Equipment. Professionelle Anbieter bieten umfassenden Versicherungsschutz und haften für Schäden. Private Umzugshelfer sind oft günstiger, aber nicht versichert und Sie haften selbst für Schäden. Ein professioneller Partner bietet professionelle Dienstleistungen, Erfahrung und Sicherheit. Für wertvolle Möbel oder komplexe Umzüge ist ein professioneller Dienstleister die bessere Wahl."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <nav className="mb-6 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Umzugsfirma
              </li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                Lokale Umzugsfirmen finden
              </div>
              <h1 className="heading-1 !mt-0">
                Umzugsfirma finden – Kostenlose Offerten vergleichen
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Vergleichen Sie bis zu 5 Offerten von geprüften Umzugsfirmen in Ihrer Region – kostenlos und unverbindlich.
              </p>

              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Dienstleistung aus:</p>
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
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Spezialtransport</p>
                    <p className="text-xs text-gray-600 mt-0.5">Klavier, Safe & mehr</p>
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
                    <Box className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Lagerung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Möbel einlagern</p>
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

            <div className="relative md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/bilder/umzugsfirma-privatumzug-600-400.webp"
                  alt="Umzugsfirma in der Schweiz – Offerten vergleichen"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                <p className="text-sm font-bold">Professioneller Umzugsservice</p>
                <p className="text-xs text-blue-100">In Ihrer Region</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Section - SEO Rich Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-navbar mx-auto prose prose-lg">
            <div
            >
              <div className="space-y-6">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  <div className="lg:col-span-6">
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src="/umzug/umzugsfirma-zurich.webp"
                        alt="Umzugsfirma in Zürich – professionelle Umzugsdienstleistungen"
                        width={700}
                        height={900}
                        className="w-full h-auto lg:min-h-[520px] object-cover"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <h2 className="heading-2 mb-6">
                      Umzugsfirma in der Schweiz: Ihr kompletter Ratgeber
                    </h2>

                    <p className="text-body">
                      Eine <strong>Umzugsfirma</strong> ist Ihr Partner für einen erfolgreichen und stressfreien Umzug in der Schweiz. Wenn Sie einen passenden Anbieter finden möchten, sollten Sie mehrere Dienstleister vergleichen, um die beste Offerte zu erhalten. Bei Online-Offerten.ch können Sie <strong>kostenlose Offerten von geprüften Partnern</strong> anfordern und diese in Ruhe vergleichen. Ein professioneller Dienstleister übernimmt alle wichtigen Aufgaben rund um Ihren <strong>Wohnungswechsel</strong> und sorgt für einen reibungslosen Ablauf.
                    </p>

                    <h3 className="heading-3 mt-8 mb-4">
                      Was macht eine gute Umzugsfirma aus?
                    </h3>
                    <p className="text-body">
                      Ein professioneller Dienstleister zeichnet sich durch mehrere wichtige Merkmale aus. Ein seriöser Anbieter verfügt über eine gültige Transportversicherung und Betriebshaftpflichtversicherung, geschultes Personal, spezielle Fahrzeuge und Equipment für verschiedene Umzugstypen. Ein guter Partner bietet transparente Offerten mit detaillierter Preisaufschlüsselung, ist erreichbar und kommuniziert klar. Der beste Anbieter für Sie ist derjenige, der Ihre spezifischen Bedürfnisse erfüllt und ein faires Preis-Leistungs-Verhältnis bietet. Professionelle Dienstleister verfügen über langjährige Erfahrung, positive Kundenbewertungen und können Referenzen vorweisen. Sie bieten umfassende <strong>Umzugsdienstleistungen</strong> von der <Link href="/ratgeber/umzugsplanung" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsplanung</Link> bis zur Übergabe Ihrer neuen Wohnung.
                    </p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-2">
                  <div className="lg:col-span-7">
                    <h3 className="heading-3 mt-8 mb-4">
                      Umzugsfirma finden: So gehen Sie vor
                    </h3>
                    <p className="text-body">
                      Um den richtigen Partner zu finden, sollten Sie systematisch vorgehen. Zunächst definieren Sie Ihre Anforderungen: Umzugsdatum, Umzugsstrecke, Wohnungsgrösse und gewünschte Leistungen. Eine gute <strong>Umzugsplanung</strong> ist der erste Schritt zu einem erfolgreichen Umzug. Dann fordern Sie mehrere Offerten von verschiedenen Anbietern an – am besten über ein Vergleichsportal wie Online-Offerten.ch. Vergleichen Sie die Offerten nicht nur nach Preis, sondern auch nach enthaltenen Leistungen, Versicherungen und Bewertungen. Ein lokaler Anbieter kann Vorteile haben, aber auch weiter entfernte Partner können gute Angebote machen. Für internationale Umzüge finden Sie passende <Link href="/umzugsfirma/internationale-umzuege" className="text-green-600 hover:text-green-700 font-semibold underline">internationale Umzugsfirmen</Link> in unserem Netzwerk.
                    </p>

                    <h3 className="heading-3 mt-8 mb-4">
                      Umzugsfirma Kosten: Was beeinflusst den Preis?
                    </h3>
                    <p className="text-body">
                      Die <strong>Umzugskosten</strong> variieren je nach verschiedenen Faktoren. Ein professioneller Dienstleister berechnet den Preis basierend auf der Umzugsstrecke, dem Umfang des Umzugsguts, der Anzahl der Stockwerke, benötigten Leistungen und dem Umzugsdatum. Weitere Faktoren, die die <strong>Umzugskosten</strong> beeinflussen, sind: Größe der Wohnung, Menge der Möbel, Spezialtransporte (z.B. Klavier), Verpackungsservice, Montage- und Demontagearbeiten sowie der Zeitpunkt des Umzugs (Sommer und Monatsende sind teurer). Ein durchschnittlicher Wohnungsumzug in der Schweiz kostet zwischen 1.500 und 4.000 CHF, je nach Umfang und Region. Geschäftsumzüge oder Umzüge mit Spezialtransporten können deutlich teurer sein. Der beste Weg, um faire <strong>Umzugskosten</strong> zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Anbietern. Durch den Vergleich können Sie bis zu 40% sparen.
                    </p>
                  </div>

                  <div className="lg:col-span-5 lg:pt-8">
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src="/umzug/umzugsfirmalocal.webp"
                        alt="Umzugsfirma lokal vergleichen – Kosten und Leistungen in der Schweiz"
                        width={700}
                        height={900}
                        className="w-full h-auto lg:min-h-[520px] object-cover"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="heading-3 mt-8 mb-4">
                  Umzugsfirma vergleichen: So sparen Sie bis zu 40%
                </h3>
                <p className="text-body">
                  Der Vergleich mehrerer Anbieter ist der effektivste Weg, um bei Ihrem Umzug Geld zu sparen. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der <strong>Umzugskosten</strong> einsparen können. Dies liegt daran, dass die Preise zwischen verschiedenen Dienstleistern erheblich variieren können. Ein günstiger Anbieter bedeutet nicht immer das beste Angebot – achten Sie auf Qualität, enthaltene Leistungen und Versicherungen. Durch das Vergleichen mehrerer Partner erhalten Sie einen fairen Marktüberblick. Nutzen Sie Vergleichsportale wie Online-Offerten.ch, um bis zu 5 Offerten von geprüften Partnern zu erhalten. Vergleichen Sie nicht nur die Preise, sondern auch die Bewertungen, Versicherungssummen und enthaltenen Leistungen.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Umzugsfirmen im Vergleich: Was ist wichtig?
                </h3>
                <p className="text-body">
                  Wenn Sie verschiedene Anbieter vergleichen, sollten Sie auf mehrere Kriterien achten. Neben dem Preis sind die Versicherungssummen, enthaltenen Leistungen, Erfahrung und Bewertungen wichtig. Ein guter Partner bietet eine detaillierte Offerte mit klarer Preisaufschlüsselung. Prüfen Sie, ob Verpackungsmaterial, Transport, Montage/Demontage und Versicherung im Preis enthalten sind. Ein professioneller Dienstleister verfügt über gültige Versicherungen und kann Referenzen vorweisen. Vergleichen Sie auch die Kommunikationsqualität – ein guter Partner ist erreichbar und antwortet schnell auf Anfragen. Lesen Sie Bewertungen anderer Kunden, um sich ein Bild von der Qualität der Dienstleistung zu machen.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Umzugsfirma Schweiz: Regionale Unterschiede
                </h3>
                <p className="text-body">
                  Die Preise und Verfügbarkeit von Dienstleistern können je nach Region in der Schweiz variieren. In Ballungsgebieten wie Zürich, Basel oder Genf gibt es mehr Anbieter zur Auswahl, aber die Preise sind oft höher. Eine <Link href="/umzugsfirma/bern" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsfirma Bern</Link> oder <Link href="/umzugsfirma/luzern" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsfirma Luzern</Link> hat oft höhere Lohnkosten als ein Partner in ländlicheren Regionen. Dennoch lohnt es sich, auch Anbieter aus anderen Regionen zu kontaktieren, da diese oft günstigere Preise anbieten können. In ländlicheren Regionen sind die <strong>Umzugskosten</strong> oft niedriger, aber die Auswahl an Partnern ist begrenzter.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Umzugsfirma buchen: Tipps für die richtige Wahl
                </h3>
                <p className="text-body">
                  Wenn Sie einen Partner buchen, sollten Sie frühzeitig planen. Die beste Zeit für die <strong>Umzugsplanung</strong> ist 1-2 Monate vor dem Umzugsdatum, besonders in den Sommermonaten und zum Monatsende. Frühzeitige Buchung gibt Ihnen mehr Auswahl und oft auch bessere Preise. Bevor Sie einen Dienstleister buchen, sollten Sie mehrere Offerten vergleichen und eine schriftliche Offerte anfordern. Prüfen Sie die Versicherungen, Bewertungen und Referenzen der Anbieter. Ein professioneller Partner bietet eine kostenlose Besichtigung vor Ort, um eine realistische Offerte zu erstellen. Nach dem Umzug können Sie auch eine <Link href="/reinigung/umzugsreinigung" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsreinigung</Link> buchen, um Ihre neue Wohnung professionell reinigen zu lassen.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Seriöse Umzugsfirma erkennen: Worauf achten?
                </h3>
                <p className="text-body">
                  Einen seriösen Partner erkennt man an mehreren Merkmalen. Er bietet schriftliche, detaillierte Offerten mit klarer Preisaufschlüsselung, verfügt über gültige Versicherungen und kann Referenzen vorweisen. Ein seriöser Dienstleister ist erreichbar, antwortet schnell auf Anfragen und kommuniziert professionell. Vermeiden Sie Anbieter, die nur mündliche Zusagen machen, Druck ausüben oder ungewöhnlich günstige Preise ohne Erklärung anbieten. Ein seriöser Partner ist transparent und beantwortet alle Ihre Fragen. Prüfen Sie auch, ob der Anbieter über eine gültige Transportversicherung und Betriebshaftpflichtversicherung verfügt. Ein professioneller Dienstleister kann Ihnen Versicherungsnachweise zeigen und verfügt über positive Kundenbewertungen.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Umzugsfirma Bewertungen: So erkennen Sie Qualität
                </h3>
                <p className="text-body">
                  <strong>Bewertungen</strong> sind ein wichtiges Kriterium bei der Auswahl. Lesen Sie Bewertungen auf verschiedenen Plattformen, um sich ein umfassendes Bild von der Qualität der Anbieter zu machen. Achten Sie nicht nur auf die Bewertungssterne, sondern auch auf die Inhalte der Bewertungen. Positive Bewertungen erwähnen oft pünktliche Ankunft, sorgfältigen Umgang mit Möbeln, freundliches Personal und transparente Preise. Negative Bewertungen können auf Probleme wie Verspätungen, Schäden oder unprofessionelles Verhalten hinweisen. Ein guter Partner hat überwiegend positive Bewertungen und reagiert professionell auf Kritik. Bei Online-Offerten.ch können Sie Bewertungen unserer Partnerfirmen einsehen, um den besten Dienstleister für Ihren Umzug zu finden.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Umzugsfirma Offerten: Was sollte enthalten sein?
                </h3>
                <p className="text-body">
                  Professionelle <strong>Offerten</strong> sollten alle wichtigen Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Verpackung, Transport, Montage/Demontage), Versicherungsschutz und Deckungssumme, Umzugsdatum und Zeitfenster, Anzahl der Umzugshelfer und Fahrzeuge, Zusatzleistungen und deren Kosten, Zahlungsbedingungen und Stornierungsbedingungen. Ein guter Partner erstellt schriftliche Offerten, die alle Leistungen transparent auflisten. Vergleichen Sie <strong>Offerten</strong> nicht nur nach Preis, sondern auch nach Qualität und Umfang der Leistungen. Eine detaillierte Offerte hilft Ihnen, verschiedene Anbieter objektiv zu vergleichen und den besten Partner für Ihren Bedarf zu finden.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Umzugsfirma in der Nähe: Vorteile und Nachteile
                </h3>
                <p className="text-body">
                  Ein lokaler Partner hat den Vorteil, dass er die lokalen Gegebenheiten kennt und kurze Anfahrtswege hat. Dies kann zu günstigeren <strong>Umzugskosten</strong> führen. Allerdings bedeutet ein lokaler Anbieter nicht automatisch das beste Angebot. Auch weiter entfernte Dienstleister können gute Preise anbieten, besonders wenn sie in Ihrer Zielregion tätig sind. Vergleichen Sie sowohl lokale als auch regionale Partner, um das beste Angebot zu finden. Ein lokaler Dienstleister kann Vorteile bei der Umzugsplanung haben, da er die Gegebenheiten in Ihrer Region kennt. Nutzen Sie unser Vergleichsportal, um sowohl lokale als auch überregionale Anbieter zu vergleichen.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <h4 className="heading-4 mb-3">
                    💡 Pro-Tipp: Umzugsfirma richtig auswählen
                  </h4>
                  <p className="text-body">
                    Beim Vergleich von Anbietern sollten Sie nicht nur auf den Preis achten. Vergleichen Sie auch die enthaltenen Leistungen, Versicherungssummen, Bewertungen und die Kommunikationsqualität. Ein etwas teurerer Partner kann durch bessere Leistungen, Versicherungen und Erfahrung das bessere Angebot sein. Für Spezialtransporte wie <Link href="/umzugsfirma/spezialtransporte/klaviertransport" className="text-blue-700 hover:text-blue-800 font-semibold underline">Klaviertransport</Link> oder <Link href="/umzugsfirma/spezialtransporte" className="text-blue-700 hover:text-blue-800 font-semibold underline">Spezialtransporte</Link> benötigen Sie spezialisierte Dienstleister mit entsprechender Erfahrung. Eine gute <strong>Umzugsplanung</strong> ist der Schlüssel zu einem erfolgreichen Umzug.
                  </p>
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
            <div className="md:col-span-3">
              <div className="mb-8">
                <h2 className="heading-2">
                  Häufige Fragen zu Umzugsfirmen
                </h2>
                <p className="text-body max-w-3xl">
                  Alles, was Sie über Umzugsfirmen wissen müssen – beantwortet von unseren Experten.
                </p>
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

            <div className="relative md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/bilder/umzugsfirma-privatumzug-600-400.webp"
                  alt="Umzugsfirma FAQ – Häufige Fragen zu Umzug, Offerten und Kosten"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                <p className="text-sm font-bold">Fragen & Antworten</p>
                <p className="text-xs text-blue-100">Rund um Umzugsfirmen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center max-w-3xl mx-auto"
          >
            <h4 className="heading-4-white">
              Bereit, Ihren Partner zu finden?
            </h4>
            <p className="text-body-white mb-8">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 5 Offerten von geprüften Partnern an. Vergleichen Sie Preise und sparen Sie bis zu 40% bei Ihrem Umzug.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt kostenlose Offerten anfordern
              </Button>
              <Button
                onClick={() => router.push('/umzugsfirma/umzugskosten')}
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white border-2 border-white text-lg px-8 py-6 shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Kosten berechnen
          </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-green-50">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Unverbindlich</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Nur geprüfte Partner</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Bis zu 40% sparen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default UmzugsfirmaPageClient


