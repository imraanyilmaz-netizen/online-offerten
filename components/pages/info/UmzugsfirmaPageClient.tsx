'use client'

import React, { useEffect } from 'react'
// framer-motion removed - CSS for better INP
import Link from 'next/link'
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

  const features = [
    {
      icon: CheckCircle,
      title: 'Bis zu 5 Anbieter vergleichen',
      description: 'Erhalten Sie mehrere Offerten von geprüften Partnern in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Bis zu 40% sparen',
      description: 'Durch den Vergleich mehrerer Anbieter finden Sie die besten Preise'
    },
    {
      icon: Users,
      title: 'Nur geprüfte Partner',
      description: 'Alle Partnerfirmen sind versichert und verfügen über positive Bewertungen'
    },
    {
      icon: Clock,
      title: 'Schnelle Antworten',
      description: 'Erhalten Sie die ersten Offerten bereits innerhalb von 24 Stunden'
    },
    {
      icon: Award,
      title: 'Transparente Preise',
      description: 'Alle Offerten enthalten detaillierte Preisaufschlüsselungen'
    }
  ]

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

  const services = [
    {
      title: "Privatumzug",
      description: "Wohnungsumzüge und Hausumzüge für Privatpersonen mit vollständiger Betreuung von der Planung bis zur Übergabe.",
      link: "/umzugsfirma/privatumzug",
      icon: Home
    },
    {
      title: "Geschäftsumzug",
      description: "Professionelle Büroumzüge mit minimaler Geschäftsunterbrechung und spezieller Logistik für Büroausstattung.",
      link: "/umzugsfirma/geschaeftsumzug",
      icon: Building
    },
    {
      title: "Umzugsreinigung",
      description: "Gründliche Reinigung der alten und neuen Wohnung, damit Sie sofort einziehen können.",
      link: "/reinigung/umzugsreinigung",
      icon: Sparkles
    },
    {
      title: "Auslandumzug",
      description: "Umzüge ins Ausland mit Zolldokumentation und internationaler Logistik.",
      link: "/umzugsfirma/internationale-umzuege",
      icon: Globe
    },
    {
      title: "Spezialtransporte",
      description: "Transport von Klavieren, Antiquitäten, Kunstwerken und anderen wertvollen Gegenständen.",
      link: "/umzugsfirma/spezialtransporte",
      icon: Package
    },
    {
      title: "Klaviertransport",
      description: "Professioneller Transport von Klavieren und Flügeln durch spezialisierte Umzugsfirmen.",
      link: "/umzugsfirma/spezialtransporte/klaviertransport",
      icon: Box
    }
  ]

  const selectionCriteria = [
    {
      icon: Shield,
      title: "Versicherungsschutz",
      description: "Ein seriöser Partner verfügt über eine gültige Transportversicherung und Betriebshaftpflichtversicherung. Prüfen Sie die Deckungssummen und Versicherungsdetails in den Offerten."
    },
    {
      icon: Star,
      title: "Bewertungen und Referenzen",
      description: "Lesen Sie Bewertungen anderer Kunden und fragen Sie nach Referenzen. Ein guter Partner hat positive Bewertungen und kann Referenzen vorweisen."
    },
    {
      icon: FileText,
      title: "Transparente Offerten",
      description: "Ein professioneller Partner erstellt detaillierte, schriftliche Offerten mit klarer Preisaufschlüsselung aller Leistungen. Vermeiden Sie mündliche Zusagen."
    },
    {
      icon: Phone,
      title: "Erreichbarkeit und Kommunikation",
      description: "Ein guter Partner ist erreichbar, antwortet schnell auf Anfragen und kommuniziert klar. Testen Sie die Erreichbarkeit vor der Buchung."
    },
    {
      icon: Calendar,
      title: "Verfügbarkeit",
      description: "Prüfen Sie, ob der Partner am gewünschten Umzugsdatum verfügbar ist. Flexible Anbieter bieten alternative Termine an."
    },
    {
      icon: Award,
      title: "Erfahrung und Expertise",
      description: "Wählen Sie einen Partner mit langjähriger Erfahrung und Expertise in Ihrem Umzugstyp. Spezialisierte Dienstleister bieten bessere Qualität."
    }
  ]

  const locations = [
    { name: "Umzugsfirma Zürich", link: "/umzugsfirma/zuerich" },
    { name: "Umzugsfirma Basel", link: "/umzugsfirma/basel" },
    { name: "Umzugsfirma Bern", link: "/umzugsfirma/bern" },
    { name: "Umzugsfirma Genf", link: "/umzugsfirma/genf" },
    { name: "Umzugsfirma Lausanne", link: "/umzugsfirma/lausanne" },
    { name: "Umzugsfirma Luzern", link: "/umzugsfirma/luzern" },
    { name: "Umzugsfirma St. Gallen", link: "/umzugsfirma/st-gallen" }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
            >
              <h1 className="heading-1">
                <span className="block">Umzugsfirma</span>
                <span className="block text-green-600 mt-2">finden & vergleichen</span>
                <span className="block heading-4 text-gray-700 mt-4">
                  Bis zu 40% sparen bei Ihrem Umzug
                </span>
          </h1>
              <p className="text-body mb-8">
                Finden Sie den <strong>besten Partner</strong> für Ihren Umzug in der Schweiz. Vergleichen Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften Anbietern – <strong>100% kostenlos und unverbindlich</strong>. Sparen Sie Zeit und Geld durch den direkten Vergleich professioneller Dienstleister. Mit unserem Vergleichsportal finden Sie schnell den passenden Partner für Ihren Bedarf.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt Umzugsfirma finden
                </Button>
                <Button
                  onClick={() => router.push('/umzugsfirma/umzugskosten')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Kosten berechnen
          </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Bis zu 5 Umzugsfirmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Nur geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </div>
            <div
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="heading-3 mb-4">Ihre Vorteile</h3>
                  <ul className="space-y-3">
                    {features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <feature.icon className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">{feature.title}</p>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
              </section>

      {/* Why Compare Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              Warum mehrere Umzugsfirmen vergleichen?
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Der Vergleich mehrerer Anbieter ist der effektivste Weg, um faire Preise zu finden und bei Ihrem Umzug Geld zu sparen. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich <strong>30-40% der Umzugskosten einsparen</strong> können. Eine gute <strong>Umzugsplanung</strong> mit Vergleich mehrerer Dienstleister hilft Ihnen, das beste Preis-Leistungs-Verhältnis zu finden.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
              >
                <Card className="h-full border-2 hover:border-green-500 transition-colors">
                    <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <feature.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
              </div>
            ))}
          </div>
                </div>
              </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              Welche Umzugsfirma brauchen Sie?
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Verschiedene Anbieter spezialisieren sich auf unterschiedliche Umzugstypen. Finden Sie den richtigen Partner für Ihren spezifischen Bedarf. Von <strong>Privatumzug</strong> bis <strong>Geschäftsumzug</strong> – wir helfen Ihnen, den passenden Dienstleister zu finden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
              >
                <Link href={service.link}>
                  <Card className="h-full hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                          <service.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{service.description}</p>
                      <div className="mt-4 flex items-center text-green-600 font-semibold">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selection Criteria Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              Worauf sollten Sie bei der Auswahl einer Umzugsfirma achten?
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Nicht alle Anbieter sind gleich. Diese Kriterien helfen Ihnen, den besten Partner für Ihren Umzug zu finden. Eine gute <strong>Umzugsplanung</strong> beginnt mit der richtigen Auswahl des Dienstleisters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectionCriteria.map((criterion, index) => (
              <div
                key={index}
              >
                <Card className="h-full">
                    <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <criterion.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{criterion.title}</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-gray-600">{criterion.description}</p>
                    </CardContent>
                  </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Links Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              Umzugsfirmen nach Region
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Finden Sie Anbieter in Ihrer Region. Wir vermitteln Ihnen geprüfte Partner aus der ganzen Schweiz – von den grossen Städten bis in die ländlichen Regionen. Finden Sie den passenden Dienstleister in Ihrer Nähe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <div
                key={index}
              >
                <Link href={location.link}>
                  <Card className="h-full hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-green-600 mr-3" />
                        <span className="font-semibold text-gray-900">{location.name}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
                </div>
              </section>

      {/* Detailed Content Section - SEO Rich Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div
            >
              <h2 className="heading-2 mb-6">
                Umzugsfirma in der Schweiz: Ihr kompletter Ratgeber
              </h2>
              
              <div className="space-y-6">
                <p className="text-body">
                  Eine <strong>Umzugsfirma</strong> ist Ihr Partner für einen erfolgreichen und stressfreien Umzug in der Schweiz. Wenn Sie einen passenden Anbieter finden möchten, sollten Sie mehrere Dienstleister vergleichen, um die beste Offerte zu erhalten. Bei Online-Offerten.ch können Sie <strong>kostenlose Offerten von geprüften Partnern</strong> anfordern und diese in Ruhe vergleichen. Ein professioneller Dienstleister übernimmt alle wichtigen Aufgaben rund um Ihren <strong>Wohnungswechsel</strong> und sorgt für einen reibungslosen Ablauf.
                </p>

                <h3 className="heading-3 mt-8 mb-4">
                  Was macht eine gute Umzugsfirma aus?
                </h3>
                <p className="text-body">
                  Ein professioneller Dienstleister zeichnet sich durch mehrere wichtige Merkmale aus. Ein seriöser Anbieter verfügt über eine gültige Transportversicherung und Betriebshaftpflichtversicherung, geschultes Personal, spezielle Fahrzeuge und Equipment für verschiedene Umzugstypen. Ein guter Partner bietet transparente Offerten mit detaillierter Preisaufschlüsselung, ist erreichbar und kommuniziert klar. Der beste Anbieter für Sie ist derjenige, der Ihre spezifischen Bedürfnisse erfüllt und ein faires Preis-Leistungs-Verhältnis bietet. Professionelle Dienstleister verfügen über langjährige Erfahrung, positive Kundenbewertungen und können Referenzen vorweisen. Sie bieten umfassende <strong>Umzugsdienstleistungen</strong> von der <strong>Umzugsplanung</strong> bis zur Übergabe Ihrer neuen Wohnung.
                </p>

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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              Häufige Fragen zu Umzugsfirmen
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Alles, was Sie über Umzugsfirmen wissen müssen – beantwortet von unseren Experten.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600">
                    <h4 className="faq-question">{item.q}</h4>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
                Jetzt Partner finden
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


