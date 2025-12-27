'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Home, Building, Globe, Package, Sparkles,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target
} from 'lucide-react'

const UmzugsoffertenPageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsofferten'

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
              "name": "Umzugsofferten",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Umzugsofferten kostenlos vergleichen",
          "serviceType": "Umzugsofferten",
          "description": "Kostenlose <strong>Umzugsangebote</strong> von geprüften Umzugsfirmen in der Schweiz vergleichen. Bis zu 6 <strong>Preisvorschläge</strong> erhalten und bis zu 40% sparen.",
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch",
            "logo": "https://online-offerten.ch/image/logo.png"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Umzugsofferten"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Was sind Umzugsofferten und wie funktioniert der Vergleich?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Umzugsofferten sind kostenlose Preisangebote von Umzugsfirmen für Ihren geplanten Umzug. Bei Online-Offerten.ch können Sie bis zu 6 <strong>Preisvorschläge</strong> von geprüften Umzugsfirmen in Ihrer Region kostenlos und unverbindlich anfordern. Sie füllen einfach ein kurzes Formular aus, beschreiben Ihren Umzug, und erhalten innerhalb von 24-48 Stunden mehrere <strong>Preisvorschläge</strong> per E-Mail. Diese können Sie dann in Ruhe vergleichen und die beste für Ihre Bedürfnisse auswählen."
              }
            },
            {
              "@type": "Question",
              "name": "Sind Umzugsofferten wirklich kostenlos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, der Service von Online-Offerten.ch ist für Sie als Kunde zu 100% kostenlos und unverbindlich. Sie zahlen keine Gebühren für die Offertenanfrage, keine Vermittlungsgebühren und keine versteckten Kosten. Die Umzugsfirmen zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen. Sie können alle Offerten vergleichen und entscheiden selbst, ob und welche Offerte Sie annehmen möchten."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viele Umzugsofferten erhalte ich?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sie erhalten bis zu 6 Umzugsofferten von verschiedenen geprüften Umzugsfirmen aus Ihrer Region. Die Anzahl der Offerten hängt von der Verfügbarkeit der Partnerfirmen in Ihrer Region und Ihrem Umzugsdatum ab. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 6 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein."
              }
            },
            {
              "@type": "Question",
              "name": "Wie lange dauert es, bis ich Umzugsofferten erhalte?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In der Regel erhalten Sie die ersten <strong>Preisvorschläge</strong> innerhalb von 24-48 Stunden nach Ihrer Anfrage. Einige Umzugsfirmen antworten bereits nach wenigen Stunden. Alle <strong>Angebote</strong> werden Ihnen per E-Mail zugesendet und enthalten detaillierte Informationen zu Preis, Leistungen, Versicherungen und Kontaktdaten der Umzugsfirma."
              }
            },
            {
              "@type": "Question",
              "name": "Was sollte eine gute Umzugsofferte enthalten?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Eine professionelle Umzugsofferte sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Verpackung, Transport, Montage/Demontage), Versicherungsschutz und Deckungssumme, Umzugsdatum und Zeitfenster, Anzahl der Umzugshelfer und Fahrzeuge, Zusatzleistungen und deren Kosten, Zahlungsbedingungen und Stornierungsbedingungen. Achten Sie darauf, dass alle Leistungen schriftlich festgehalten sind."
              }
            },
            {
              "@type": "Question",
              "name": "Kann ich Umzugsofferten auch für Auslandumzüge anfordern?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, Sie können auch für Auslandumzüge <strong>Preisvorschläge</strong> anfordern. Viele unserer Partnerfirmen sind auf Umzüge ins Ausland spezialisiert und können Ihnen <strong>Kostenvoranschläge</strong> für Umzüge nach Deutschland, Österreich, Frankreich, Italien und andere europäische Länder erstellen. Auslandumzüge erfordern zusätzliche Planung und Dokumentation, daher sollten Sie diese frühzeitig anfragen."
              }
            },
            {
              "@type": "Question",
              "name": "Wie kann ich bei Umzugsofferten sparen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Der beste Weg, um bei Umzugsofferten zu sparen, ist der Vergleich mehrerer Offerten. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Umzugskosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Umzugsdatum sein (Wochentage sind oft günstiger), Eigenleistung beim Packen erbringen, vor dem Umzug ausmisten, frühzeitig buchen und Offerten genau vergleichen, nicht nur auf den Preis achten."
              }
            },
            {
              "@type": "Question",
              "name": "Sind die Umzugsfirmen, die Offerten senden, versichert?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, alle Umzugsfirmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Transportversicherung sowie Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Sie können sicher sein, dass alle Firmen, die Ihnen Offerten senden, seriös und versichert sind."
              }
            }
          ]
        },
        {
          "@type": "HowTo",
          "name": "Wie fordere ich Umzugsofferten an?",
          "description": "Schritt-für-Schritt Anleitung zum Anfordern von Umzugsofferten",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Umzugsdetails eingeben",
              "text": "Füllen Sie das Online-Formular aus und geben Sie Ihre Umzugsdetails ein: Umzugsdatum, Umzugsstrecke, Wohnungsgrösse und gewünschte Leistungen."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Kontaktdaten angeben",
              "text": "Geben Sie Ihre Kontaktdaten (Name, E-Mail, Telefon) an, damit die Umzugsfirmen Ihnen die Offerten zusenden können."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Anfrage absenden",
              "text": "Senden Sie Ihre Anfrage ab. Sie erhalten eine Bestätigung per E-Mail."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Offerten vergleichen",
              "text": "Innerhalb von 24-48 Stunden erhalten Sie bis zu 6 <strong>Preisvorschläge</strong> per E-Mail. Vergleichen Sie Preise, Leistungen und Bewertungen."
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Beste Offerte auswählen",
              "text": "Wählen Sie die <strong>Umzugsofferte</strong> aus, die am besten zu Ihren Bedürfnissen passt, und kontaktieren Sie die Umzugsfirma direkt."
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'umzugsofferten-schema'
    
    const existing = document.getElementById('umzugsofferten-schema')
    if (existing) existing.remove()
    
    document.head.appendChild(script)
    
    return () => {
      const scriptToRemove = document.getElementById('umzugsofferten-schema')
      if (scriptToRemove) scriptToRemove.remove()
    }
  }, [])

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug')
  }

  const features = [
    {
      icon: CheckCircle,
      title: 'Bis zu 6 Angebote',
      description: 'Erhalten Sie mehrere Offerten von geprüften Umzugsfirmen in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Bis zu 40% sparen',
      description: 'Durch den Vergleich mehrerer Offerten finden Sie die besten Preise'
    },
    {
      icon: Users,
      title: 'Nur geprüfte Firmen',
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
      q: "Was sind Umzugsofferten und wie funktioniert der Vergleich?",
      a: "Umzugsofferten sind kostenlose Preisangebote von Umzugsfirmen für Ihren geplanten Umzug. Bei Online-Offerten.ch können Sie bis zu 6 <strong>Preisvorschläge</strong> von geprüften Umzugsfirmen in Ihrer Region kostenlos und unverbindlich anfordern. Sie füllen einfach ein kurzes Formular aus, beschreiben Ihren Umzug, und erhalten innerhalb von 24-48 Stunden mehrere <strong>Preisvorschläge</strong> per E-Mail. Diese können Sie dann in Ruhe vergleichen und die beste für Ihre Bedürfnisse auswählen. Der <strong>direkte Vergleich</strong> ist der effektivste Weg, um faire Preise zu finden und bis zu 40% zu sparen."
    },
    {
      q: "Sind Umzugsofferten wirklich kostenlos?",
      a: "Ja, der Service von Online-Offerten.ch ist für Sie als Kunde zu 100% kostenlos und unverbindlich. Sie zahlen keine Gebühren für die Offertenanfrage, keine Vermittlungsgebühren und keine versteckten Kosten. Die Umzugsfirmen zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen. Sie können alle Offerten vergleichen und entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Es gibt keine Mindestlaufzeit oder Verpflichtungen Ihrerseits."
    },
    {
      q: "Wie viele Umzugsofferten erhalte ich?",
      a: "Sie erhalten bis zu 6 <strong>Preisvorschläge</strong> von verschiedenen geprüften Umzugsfirmen aus Ihrer Region. Die Anzahl hängt von der Verfügbarkeit der Partnerfirmen in Ihrer Region und Ihrem Umzugsdatum ab. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 6 <strong>Angebote</strong>, in ländlicheren Regionen können es auch 3-4 sein. Jede Offerte wird Ihnen per E-Mail zugesendet und enthält alle wichtigen Details wie Preis, Leistungen, Versicherungen und Kontaktinformationen."
    },
    {
      q: "Wie lange dauert es, bis ich Umzugsofferten erhalte?",
      a: "In der Regel erhalten Sie die ersten <strong>Preisvorschläge</strong> innerhalb von 24-48 Stunden nach Ihrer Anfrage. Einige Umzugsfirmen antworten bereits nach wenigen Stunden. Alle <strong>Angebote</strong> werden Ihnen per E-Mail zugesendet und enthalten detaillierte Informationen zu Preis, Leistungen, Versicherungen und Kontaktdaten der Umzugsfirma. Falls Sie nach 48 Stunden noch nicht alle <strong>Kostenvoranschläge</strong> erhalten haben, können Sie uns kontaktieren und wir helfen Ihnen gerne weiter."
    },
    {
      q: "Was sollte eine gute Umzugsofferte enthalten?",
      a: "Eine professionelle <strong>Umzugsofferte</strong> sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Verpackung, Transport, Montage/Demontage), Versicherungsschutz und Deckungssumme, Umzugsdatum und Zeitfenster, Anzahl der Umzugshelfer und Fahrzeuge, Zusatzleistungen und deren Kosten, Zahlungsbedingungen und Stornierungsbedingungen. Achten Sie darauf, dass alle Leistungen schriftlich festgehalten sind. Eine seriöse Umzugsfirma bietet transparente <strong>Preise</strong> ohne versteckte Kosten."
    },
    {
      q: "Kann ich Umzugsofferten auch für Auslandumzüge anfordern?",
      a: "Ja, Sie können auch für Auslandumzüge <strong>Preisvorschläge</strong> anfordern. Viele unserer Partnerfirmen sind auf Umzüge ins Ausland spezialisiert und können Ihnen <strong>Kostenvoranschläge</strong> für Umzüge nach Deutschland, Österreich, Frankreich, Italien und andere europäische Länder erstellen. Auslandumzüge erfordern zusätzliche Planung und Dokumentation, daher sollten Sie diese frühzeitig anfragen. Die <strong>Angebote</strong> enthalten dann auch Informationen zu Zollbestimmungen, Transportdauer und internationalen Versicherungen."
    },
    {
      q: "Wie kann ich bei Umzugsofferten sparen?",
      a: "Der beste Weg, um bei <strong>Umzugsangeboten</strong> zu sparen, ist der Vergleich mehrerer <strong>Preise</strong>. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Umzugskosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Umzugsdatum sein (Wochentage sind oft günstiger als Wochenenden), Eigenleistung beim Packen erbringen, vor dem Umzug ausmisten und nicht benötigte Gegenstände verkaufen oder entsorgen, frühzeitig buchen (Last-Minute-Buchungen sind teurer), und <strong>Angebote</strong> genau vergleichen - nicht nur auf den Preis achten, sondern auch auf enthaltene Leistungen."
    },
    {
      q: "Sind die Umzugsfirmen, die Offerten senden, versichert?",
      a: "Ja, alle Umzugsfirmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Transportversicherung sowie Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Sie können sicher sein, dass alle Firmen, die Ihnen Offerten senden, seriös und versichert sind. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen."
    },
    {
      q: "Was ist der Unterschied zwischen Umzugsofferten und einem Festpreis?",
      a: "<strong>Umzugsofferten</strong> sind unverbindliche Preisangebote, die Sie vergleichen können. Ein Festpreis ist ein verbindliches Angebot, das nach der Annahme nicht mehr geändert werden kann. Die meisten <strong>Preisvorschläge</strong>, die Sie erhalten, sind Festpreise für die beschriebenen Leistungen. Das bedeutet, dass der angegebene Preis verbindlich ist, solange sich die Umzugsdetails nicht ändern. Achten Sie darauf, dass alle gewünschten Leistungen enthalten sind, damit es später keine Überraschungen gibt."
    },
    {
      q: "Kann ich Umzugsofferten auch telefonisch anfordern?",
      a: "Ja, Sie können <strong>Preisvorschläge</strong> auch telefonisch anfordern, indem Sie uns unter unserer Service-Hotline kontaktieren. Unser Team hilft Ihnen gerne bei der Erstellung Ihrer Anfrage und beantwortet alle Ihre Fragen. Die <strong>Angebote</strong> werden Ihnen dann per E-Mail zugesendet. Alternativ können Sie auch das Online-Formular nutzen, das rund um die Uhr verfügbar ist und in wenigen Minuten ausgefüllt werden kann."
    }
  ]

  const costFactors = [
    {
      factor: "Wohnungsgrösse",
      description: "Die Anzahl der Zimmer und das Volumen des Umzugsguts bestimmen maßgeblich den Preis. Ein 1.5-Zimmer-Umzug kostet deutlich weniger als ein 5-Zimmer-Umzug."
    },
    {
      factor: "Umzugsstrecke",
      description: "Die Distanz zwischen alter und neuer Wohnung beeinflusst die Kosten. Innerstädtische Umzüge sind günstiger als Umzüge über größere Distanzen."
    },
    {
      factor: "Umzugsdatum",
      description: "Wochenenden, Monatsenden und Sommermonate sind teurer, da die Nachfrage höher ist. Flexibilität beim Datum kann Geld sparen."
    },
    {
      factor: "Leistungsumfang",
      description: "Verpackungsservice, Möbelmontage, Umzugsreinigung und Spezialtransporte erhöhen die Kosten. Eigenleistung reduziert den Preis."
    },
    {
      factor: "Stockwerke",
      description: "Umzüge in höhere Stockwerke ohne Aufzug sind teurer, da mehr Zeit und Personal benötigt wird."
    },
    {
      factor: "Zugänglichkeit",
      description: "Schwierige Zugänge, enge Treppen oder Halteverbotszonen können zusätzliche Kosten verursachen."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Umzugsdetails eingeben",
      description: "Füllen Sie unser kostenloses Online-Formular aus und beschreiben Sie Ihren geplanten Umzug. Geben Sie Umzugsdatum, Umzugsstrecke, Wohnungsgrösse und gewünschte Leistungen an."
    },
    {
      number: "02",
      title: "Kontaktdaten angeben",
      description: "Geben Sie Ihre Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer) ein, damit die Umzugsfirmen Ihnen die Offerten zusenden können. Ihre Daten werden vertraulich behandelt."
    },
    {
      number: "03",
      title: "Anfrage absenden",
      description: "Senden Sie Ihre Anfrage ab. Sie erhalten sofort eine Bestätigungs-E-Mail. Unsere Partnerfirmen werden automatisch über Ihre Anfrage informiert."
    },
    {
      number: "04",
      title: "Offerten vergleichen",
      description: "Innerhalb von 24-48 Stunden erhalten Sie bis zu 6 Umzugsofferten per E-Mail. Vergleichen Sie Preise, Leistungen, Versicherungen und Bewertungen der Umzugsfirmen."
    },
    {
      number: "05",
      title: "Beste Offerte auswählen",
      description: "Wählen Sie die Umzugsofferte aus, die am besten zu Ihren Bedürfnissen und Ihrem Budget passt. Kontaktieren Sie die Umzugsfirma direkt, um Details zu klären und zu buchen."
    }
  ]

  const locations = [
    { name: "Umzugsofferten Zürich", link: "/umzugsfirma-zuerich" },
    { name: "Umzugsofferten Basel", link: "/umzugsfirma-basel" },
    { name: "Umzugsofferten Bern", link: "/umzugsfirma-bern" },
    { name: "Umzugsofferten Genf", link: "/umzugsfirma-genf" },
    { name: "Umzugsofferten Lausanne", link: "/umzugsfirma-lausanne" },
    { name: "Umzugsofferten Luzern", link: "/umzugsfirma-luzern" },
    { name: "Umzugsofferten St. Gallen", link: "/umzugsfirma-st-gallen" },
    { name: "Umzugsofferten Winterthur", link: "/umzugsfirma-winterthur" }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="block">Umzugsofferten</span>
                <span className="block text-green-600 mt-2">kostenlos vergleichen</span>
                <span className="block text-2xl md:text-3xl text-gray-700 font-bold mt-4">
                  Bis zu 40% sparen bei Ihrem Umzug
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Erhalten Sie <strong>bis zu 6 kostenlose Umzugsangebote</strong> von geprüften Umzugsfirmen in der ganzen Schweiz. Vergleichen Sie Preise, Leistungen und Bewertungen – <strong>100% kostenlos und unverbindlich</strong>. Finden Sie die beste Offerte für Ihren Wohnungswechsel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt vergleichen
                </Button>
                <Button
                  onClick={() => router.push('/umzugskosten-rechner')}
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
                  <span>Bis zu 6 Offerten</span>
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ihre Vorteile</h3>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Compare Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum mehrere Angebote vergleichen?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Der Vergleich von <strong>mehreren Preisen</strong> ist der effektivste Weg, um faire Angebote zu finden und bei Ihrem Umzug Geld zu sparen. Studien zeigen, dass Kunden durch den Vergleich mehrerer Preisvorschläge durchschnittlich <strong>30-40% der Umzugskosten einsparen</strong> können.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So funktioniert's: Umzugsofferten anfordern
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              In nur 5 einfachen Schritten erhalten Sie mehrere Umzugsofferten und finden die beste Offerte für Ihren Umzug.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-green-200 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <Card className="relative z-10 h-full border-2 border-green-200 hover:border-green-500 transition-colors">
                  <CardHeader className="text-center">
                    <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.number}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleCtaClick}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
            >
              <FileText className="mr-2 h-5 w-5" />
              Jetzt starten
            </Button>
          </div>
        </div>
      </section>

      {/* Cost Factors Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Was beeinflusst die Kosten für Umzugsangebote?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Die Preise in <strong>Offerten für Ihren Umzug</strong> variieren je nach verschiedenen Faktoren. Verstehen Sie, was die Kosten beeinflusst, um die beste Offerte zu finden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costFactors.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Target className="h-5 w-5 text-green-600 mr-2" />
                      {item.factor}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-green-50 border-2 border-green-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  💡 Tipp: Nutzen Sie unseren Umzugskosten-Rechner
                </h3>
                <p className="text-gray-700 mb-6">
                  Berechnen Sie vorab eine grobe Kostenschätzung für Ihren Umzug. So wissen Sie, welche Preise in den <strong>Umzugsangeboten</strong> realistisch sind.
                </p>
                <Button
                  onClick={() => router.push('/umzugskosten-rechner')}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Zum Umzugskosten-Rechner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Links Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Umzugsangebote nach Region
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Finden Sie <strong>Preisangebote von Umzugsfirmen</strong> in Ihrer Region. Wir vermitteln Ihnen geprüfte Partner aus der ganzen Schweiz.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Häufige Fragen zu Umzugsofferten
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Alles, was Sie über <strong>Umzugsangebote</strong> wissen müssen – beantwortet von unseren Experten.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600">
                    {item.q}
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
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit für Ihre Umzugsofferten?
            </h2>
            <p className="text-xl mb-8 text-green-50">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 6 Umzugsofferten an. Vergleichen Sie Preise und sparen Sie bis zu 40% bei Ihrem Umzug.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt vergleichen
              </Button>
              <Button
                onClick={() => router.push('/umzugskosten-rechner')}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-6"
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
                <span>Nur geprüfte Firmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Bis zu 40% sparen</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Content Section - SEO Rich Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Umzugsangebote in der Schweiz: Ihr Wegweiser zum besten Preis
              </h2>
              
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p className="text-lg">
                  <strong>Umzugsofferten</strong> sind der Schlüssel zu einem erfolgreichen und kostengünstigen Umzug in der Schweiz. Wenn Sie <strong>Preise von Umzugsfirmen</strong> vergleichen, erhalten Sie nicht nur die besten Konditionen, sondern auch einen umfassenden Überblick über die verfügbaren Dienstleistungen verschiedener Umzugsunternehmen. Bei Online-Offerten.ch können Sie <strong>kostenlose Preisvorschläge</strong> von bis zu 6 geprüften Umzugsfirmen in Ihrer Region anfordern und diese in Ruhe vergleichen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Was macht gute Umzugsangebote aus?
                </h3>
                <p>
                  Professionelle <strong>Preisvorschläge</strong> enthalten alle wichtigen Informationen, die Sie für eine fundierte Entscheidung benötigen. Eine seriöse <strong>Umzugsofferte</strong> sollte transparent den Gesamtpreis mit detaillierter Aufschlüsselung aller Leistungen auflisten. Dazu gehören Verpackungsservice, Transport, Montage und Demontage von Möbeln, Versicherungsschutz sowie eventuelle Zusatzleistungen wie Umzugsreinigung oder Spezialtransporte.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Umzugsangebote vergleichen: So sparen Sie bis zu 40%
                </h3>
                <p>
                  Der Vergleich von <strong>mehreren Preisen</strong> ist der effektivste Weg, um bei Ihrem Umzug Geld zu sparen. Studien zeigen, dass Kunden durch den Vergleich mehrerer <strong>Angebote</strong> durchschnittlich 30-40% der Umzugskosten einsparen können. Dies liegt daran, dass die Preise zwischen verschiedenen Umzugsfirmen erheblich variieren können. Durch das Anfordern mehrerer <strong>Umzugsofferten</strong> erhalten Sie einen fairen Marktüberblick und können die beste Offerte für Ihre individuellen Bedürfnisse auswählen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Kostenlose Angebote anfordern: So einfach geht's
                </h3>
                <p>
                  Das Anfordern von <strong>kostenlosen Preisvorschlägen</strong> bei Online-Offerten.ch ist denkbar einfach. Sie füllen ein kurzes Online-Formular aus, in dem Sie Ihre Umzugsdetails angeben: Umzugsdatum, Umzugsstrecke, Wohnungsgrösse und gewünschte Leistungen. Innerhalb von 24-48 Stunden erhalten Sie dann bis zu 6 <strong>Preisvorschläge</strong> per E-Mail. Alle sind kostenlos und unverbindlich – Sie zahlen keine Gebühren und haben keine Verpflichtungen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Regionale Unterschiede verstehen
                </h3>
                <p>
                  Die Preise in <strong>Umzugsangeboten</strong> können je nach Region in der Schweiz variieren. In Ballungsgebieten wie Zürich, Basel oder Genf sind die Preise oft höher als in ländlicheren Regionen. Dies liegt an verschiedenen Faktoren wie höheren Lohnkosten, schwierigeren Zugängen oder höherer Nachfrage. Wenn Sie <strong>Preisangebote</strong> für verschiedene Regionen vergleichen, erhalten Sie ein besseres Verständnis für die Marktpreise in Ihrer Umgebung.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Umzugsangebote online vergleichen: Die moderne Art, Umzugsfirmen zu finden
                </h3>
                <p>
                  <strong>Preisvorschläge online</strong> anzufordern ist die moderne und effiziente Methode, um die beste Umzugsfirma für Ihren Umzug zu finden. Statt stundenlang verschiedene Umzugsunternehmen telefonisch zu kontaktieren, können Sie mit einem einzigen Formular mehrere <strong>Angebote</strong> erhalten. Dies spart nicht nur Zeit, sondern ermöglicht auch einen direkten Vergleich aller Preise auf einen Blick. Alle <strong>Kostenvoranschläge</strong> werden Ihnen digital zugesendet, sodass Sie diese bequem von zu Hause aus vergleichen können.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Günstige Angebote finden: Tipps und Tricks
                </h3>
                <p>
                  Um <strong>günstige Preise</strong> zu finden, sollten Sie mehrere Strategien kombinieren. Zunächst ist es wichtig, mehrere <strong>Angebote</strong> zu vergleichen – dies ist der wichtigste Faktor für Einsparungen. Zusätzlich können Sie durch Flexibilität beim Umzugsdatum sparen: Wochentage sind oft günstiger als Wochenenden, und Nebensaison ist günstiger als Hauptsaison. Eigenleistung beim Packen reduziert ebenfalls die Kosten. Schliesslich sollten Sie frühzeitig buchen, da Last-Minute-Buchungen deutlich teurer sind.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Angebote anfordern: Was Sie beachten sollten
                </h3>
                <p>
                  Beim Anfordern von <strong>Umzugsofferten</strong> sollten Sie einige wichtige Punkte beachten. Geben Sie möglichst genaue Umzugsdetails an, damit die <strong>Preise</strong> realistisch sind. Vergleichen Sie nicht nur die Kosten, sondern auch die enthaltenen Leistungen, Versicherungen und Bewertungen der Umzugsfirmen. Ein günstigeres <strong>Angebot</strong> ist nicht immer das beste – achten Sie auf Transparenz und Seriosität. Lesen Sie alle Details genau durch und stellen Sie Fragen, wenn etwas unklar ist.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Qualität von Umzugsangeboten erkennen
                </h3>
                <p>
                  Nicht alle <strong>Offerten von Umzugsunternehmen</strong> sind gleichwertig. Eine professionelle <strong>Umzugsofferte</strong> sollte detailliert, transparent und schriftlich vorliegen. Seriöse Umzugsfirmen bieten in ihren <strong>Angeboten</strong> eine klare Aufschlüsselung aller Kosten, enthaltenen Leistungen und Versicherungen. Achten Sie darauf, dass die <strong>Umzugsangebote</strong> alle wichtigen Informationen enthalten und keine versteckten Kosten aufweisen. Bewertungen und Referenzen können Ihnen zusätzlich helfen, die Qualität der Umzugsfirma einzuschätzen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Umzug Angebote vs. individuelle Offerten: Der Unterschied
                </h3>
                <p>
                  Während <strong>allgemeine Umzug Angebote</strong> oft nur Preisinformationen enthalten, sind <strong>Umzugsofferten</strong> detaillierte, auf Ihre spezifische Situation zugeschnittene Preisangebote. <strong>Individuelle Kostenvoranschläge</strong> werden nach einer Besichtigung oder detaillierten Beschreibung Ihres Umzugs erstellt und sind daher genauer als allgemeine Preisangaben. Bei Online-Offerten.ch erhalten Sie echte <strong>Umzugsofferten</strong>, die auf Ihre individuellen Bedürfnisse zugeschnitten sind.
                </p>

                <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    💡 Pro-Tipp: Angebote richtig vergleichen
                  </h4>
                  <p className="text-gray-700">
                    Beim Vergleich von <strong>Preisvorschlägen</strong> sollten Sie nicht nur auf den Preis achten. Vergleichen Sie auch die enthaltenen Leistungen, Versicherungssummen, Bewertungen der Umzugsfirmen und die Kommunikationsqualität. Ein etwas teureres <strong>Angebot</strong> kann durch bessere Leistungen und Versicherungen das bessere sein. Nutzen Sie unseren Umzugskosten-Rechner, um eine realistische Preiserwartung zu entwickeln, bevor Sie <strong>Kostenvoranschläge</strong> anfordern.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Weitere Services für Ihren Umzug
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Neben Umzugsofferten bieten wir auch Offerten für weitere Services rund um Ihren Umzug an.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Umzugsreinigung", link: "/umzugsreinigung", icon: Sparkles },
              { name: "Geschäftsumzug", link: "/geschaeftsumzug", icon: Building },
              { name: "Internationale Umzüge", link: "/internationale-umzuege", icon: Globe },
              { name: "Spezialtransporte", link: "/spezialtransporte", icon: Package }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.link}>
                  <Card className="h-full hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <service.icon className="h-10 w-10 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default UmzugsoffertenPageClient

