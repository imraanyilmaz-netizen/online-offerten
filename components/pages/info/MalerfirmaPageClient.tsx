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
  Star, Calculator, MapPin, Home, Building, Paintbrush, Palette, Sparkles,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Brush, Droplets, Wrench, Shield, Phone, Mail, Calendar, Layers
} from 'lucide-react'

const MalerfirmaPageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/malerfirma'

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
              "name": "Malerfirma",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Malerfirma finden und vergleichen",
          "serviceType": "Malerarbeiten",
          "description": "Finden Sie den besten Fachbetrieb für Malerarbeiten in der Schweiz. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Malerbetrieben für Innenanstrich, Aussenanstrich, Fassadenanstrich und mehr.",
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
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=maler&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Malerfirma Offerten"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Was ist eine Malerfirma und welche Dienstleistungen bietet sie?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Eine Malerfirma ist ein professionelles Unternehmen, das auf Malerarbeiten und Anstriche spezialisiert ist. Eine gute Malerfirma bietet umfassende Dienstleistungen wie Innenanstrich, Aussenanstrich, Fassadenanstrich, Tapezierarbeiten, Spachtelarbeiten, Lackierarbeiten und Renovierungsarbeiten. Eine seriöse Malerfirma übernimmt alle Arbeiten von der Vorbereitung über den Anstrich bis zur Nachbearbeitung und sorgt für ein professionelles Ergebnis."
              }
            },
            {
              "@type": "Question",
              "name": "Wie finde ich die richtige Malerfirma für meine Malerarbeiten?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Suche nach dem richtigen Fachbetrieb beginnt mit einer klaren Definition Ihrer Bedürfnisse. Überlegen Sie, welche Art von Malerarbeiten Sie benötigen (Innenanstrich, Aussenanstrich, Fassadenanstrich), wann die Arbeiten stattfinden sollen und welches Budget Sie zur Verfügung haben. Nutzen Sie Vergleichsportale wie Online-Offerten.ch, um mehrere Offerten von geprüften Malerbetrieben zu erhalten. Vergleichen Sie nicht nur die Preise, sondern auch die enthaltenen Leistungen, verwendete Materialien und Bewertungen."
              }
            },
            {
              "@type": "Question",
              "name": "Was kostet eine Malerfirma in der Schweiz?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Kosten für einen Malerbetrieb hängen von verschiedenen Faktoren ab: Art der Malerarbeiten (Innenanstrich, Aussenanstrich, Fassadenanstrich), Grösse der zu streichenden Fläche, Anzahl der Stockwerke, benötigte Vorarbeiten (Spachteln, Grundieren) und verwendete Materialien. Ein durchschnittlicher Innenanstrich in der Schweiz kostet zwischen 15 und 35 CHF pro Quadratmeter. Fassadenanstrich kann zwischen 30 und 80 CHF pro Quadratmeter kosten. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Anbietern."
              }
            },
            {
              "@type": "Question",
              "name": "Worauf sollte ich bei der Auswahl einer Malerfirma achten?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bei der Auswahl eines Fachbetriebs sollten Sie auf mehrere Kriterien achten: Erfahrung und Referenzen, verwendete Materialien und Farbqualität, Versicherungsschutz, transparente und detaillierte Offerten, Erreichbarkeit und Kommunikation, Bewertungen und Empfehlungen sowie die Verfügbarkeit am gewünschten Termin. Ein professioneller Malerservice bietet eine kostenlose Besichtigung vor Ort, erstellt eine schriftliche Offerte und beantwortet alle Ihre Fragen transparent."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viele Offerten erhalte ich von Malerfirmen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Malerfirmen aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die Malerfirmen direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. So haben Sie die perfekte Vergleichsgrundlage, um die beste Malerfirma für Ihren Bedarf zu finden."
              }
            },
            {
              "@type": "Question",
              "name": "Wie wird die Qualität der Malerfirmen sichergestellt?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Malerbetriebe in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen. Unsere Partner sind etablierte Handwerksbetriebe mit langjähriger Erfahrung."
              }
            },
            {
              "@type": "Question",
              "name": "Bieten Malerfirmen auch Tapezierarbeiten an?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, viele Malerfirmen bieten auch Tapezierarbeiten an. Dies umfasst das Tapezieren von Wänden, das Entfernen alter Tapeten, das Vorbereiten der Untergründe und das Anbringen neuer Tapeten. Wenn Sie sowohl Malerarbeiten als auch Tapezierarbeiten benötigen, kann eine Malerfirma, die beide Dienstleistungen anbietet, kosteneffizienter sein. Fragen Sie in Ihrer Anfrage nach, ob die Malerfirma auch Tapezierarbeiten anbietet."
              }
            },
            {
              "@type": "Question",
              "name": "Ist der Service von Online-Offerten.ch wirklich kostenlos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 5 Offerten von geprüften Malerbetrieben in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten."
              }
            }
          ]
        },
        {
          "@type": "HowTo",
              "name": "Wie finde ich den besten Fachbetrieb?",
              "description": "Schritt-für-Schritt Anleitung zum Finden und Vergleichen von Malerbetrieben",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Malerarbeiten definieren",
              "text": "Definieren Sie Ihre Anforderungen: Art der Malerarbeiten (Innenanstrich, Aussenanstrich, Fassadenanstrich), zu streichende Flächen, gewünschte Farben und Termin."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Offerten anfordern",
              "text": "Fordern Sie über Online-Offerten.ch bis zu 5 kostenlose Offerten von geprüften Malerfirmen in Ihrer Region an."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Offerten vergleichen",
              "text": "Vergleichen Sie die erhaltenen Offerten: Preise, enthaltene Leistungen, verwendete Materialien, Bewertungen und Kommunikation."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Malerfirma auswählen",
              "text": "Wählen Sie den Fachbetrieb aus, der am besten zu Ihren Bedürfnissen passt und kontaktieren Sie diesen direkt."
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Malerarbeiten durchführen",
              "text": "Buchen Sie die Malerfirma und führen Sie Ihre Malerarbeiten professionell durch."
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'malerfirma-schema'
    
    const existing = document.getElementById('malerfirma-schema')
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
      const scriptToRemove = document.getElementById('malerfirma-schema')
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
    router.push('/kostenlose-offerte-anfordern?service=maler&step=2')
  }

  const features = [
    {
      icon: CheckCircle,
      title: 'Bis zu 5 Malerfirmen vergleichen',
      description: 'Erhalten Sie mehrere Offerten von geprüften Malerfirmen in Ihrer Region'
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
      title: 'Nur geprüfte Betriebe',
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
      q: "Was ist eine Malerfirma und welche Dienstleistungen bietet sie?",
      a: "Ein Malerbetrieb ist ein professionelles Unternehmen, das auf Malerarbeiten und Anstriche spezialisiert ist. Ein guter Fachbetrieb bietet umfassende Dienstleistungen wie Innenanstrich, Aussenanstrich, Fassadenanstrich, Tapezierarbeiten, Spachtelarbeiten, Lackierarbeiten und Renovierungsarbeiten. Ein seriöser Handwerksbetrieb übernimmt alle Arbeiten von der Vorbereitung über den Anstrich bis zur Nachbearbeitung und sorgt für ein professionelles Ergebnis. Professionelle Malerbetriebe verfügen über geschultes Personal, hochwertige Materialien und das notwendige Equipment für verschiedene Arten von Malerarbeiten."
    },
    {
      q: "Wie finde ich die richtige Malerfirma für meine Malerarbeiten?",
      a: "Die Suche nach der richtigen Malerfirma beginnt mit einer klaren Definition Ihrer Bedürfnisse. Überlegen Sie, welche Art von Malerarbeiten Sie benötigen (Innenanstrich, Aussenanstrich, Fassadenanstrich), wann die Arbeiten stattfinden sollen und welches Budget Sie zur Verfügung haben. Nutzen Sie Vergleichsportale wie Online-Offerten.ch, um mehrere Offerten von geprüften Malerfirmen zu erhalten. Vergleichen Sie nicht nur die Preise, sondern auch die enthaltenen Leistungen, verwendete Materialien und Bewertungen. Eine seriöse Malerfirma bietet transparente Offerten, ist versichert und verfügt über positive Kundenbewertungen. Achten Sie auch auf die Erreichbarkeit und Kommunikationsqualität der Malerfirma."
    },
    {
      q: "Was kostet eine Malerfirma in der Schweiz?",
      a: "Die Kosten für einen Malerbetrieb hängen von verschiedenen Faktoren ab: Art der Malerarbeiten (Innenanstrich, Aussenanstrich, Fassadenanstrich), Grösse der zu streichenden Fläche, Anzahl der Stockwerke, benötigte Vorarbeiten (Spachteln, Grundieren) und verwendete Materialien. Ein durchschnittlicher Innenanstrich in der Schweiz kostet zwischen 15 und 35 CHF pro Quadratmeter. Fassadenanstrich kann zwischen 30 und 80 CHF pro Quadratmeter kosten. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Anbietern. Durch den Vergleich können Sie bis zu 40% sparen. Ein günstiger Handwerksbetrieb bedeutet nicht immer das beste Angebot – achten Sie auf Qualität und enthaltene Leistungen."
    },
    {
      q: "Worauf sollte ich bei der Auswahl einer Malerfirma achten?",
      a: "Bei der Auswahl einer Malerfirma sollten Sie auf mehrere Kriterien achten: Erfahrung und Referenzen, verwendete Materialien und Farbqualität, Versicherungsschutz, transparente und detaillierte Offerten, Erreichbarkeit und Kommunikation, Bewertungen und Empfehlungen sowie die Verfügbarkeit am gewünschten Termin. Eine professionelle Malerfirma bietet eine kostenlose Besichtigung vor Ort, erstellt eine schriftliche Offerte und beantwortet alle Ihre Fragen transparent. Vermeiden Sie Malerfirmen, die nur mündliche Zusagen machen oder Druck ausüben, sofort zu buchen."
    },
    {
      q: "Wie viele Offerten erhalte ich von Malerfirmen?",
      a: "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Malerbetrieben aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die Anbieter direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte mit allen wichtigen Details wie Preis, enthaltene Leistungen, verwendete Materialien und Kontaktinformationen. So haben Sie die perfekte Vergleichsgrundlage, um den besten Fachbetrieb für Ihren Bedarf zu finden. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein."
    },
    {
      q: "Wie wird die Qualität der Malerfirmen sichergestellt?",
      a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Malerfirmen in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen. Unsere Partner sind etablierte Malerfirmen mit langjähriger Erfahrung. Wir überprüfen regelmässig die Qualität unserer Partnerfirmen und nehmen nur seriöse Malerfirmen in unser Netzwerk auf."
    },
    {
      q: "Bieten Malerfirmen auch Tapezierarbeiten an?",
      a: "Ja, viele Malerbetriebe bieten auch Tapezierarbeiten an. Dies umfasst das Tapezieren von Wänden, das Entfernen alter Tapeten, das Vorbereiten der Untergründe und das Anbringen neuer Tapeten. Wenn Sie sowohl Malerarbeiten als auch Tapezierarbeiten benötigen, kann ein Fachbetrieb, der beide Dienstleistungen anbietet, kosteneffizienter sein. Fragen Sie in Ihrer Anfrage nach, ob der Anbieter auch Tapezierarbeiten anbietet. Professionelle Handwerksbetriebe können Ihnen auch bei der Auswahl der richtigen Tapeten und Farbkombinationen helfen."
    },
    {
      q: "Ist der Service von Online-Offerten.ch wirklich kostenlos?",
      a: "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 5 Offerten von geprüften Malerbetrieben in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Die Anbieter zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen – für Sie bleibt der Service komplett kostenlos."
    },
    {
      q: "Wie lange im Voraus sollte ich eine Malerfirma buchen?",
      a: "Wir empfehlen, mindestens 2-4 Wochen im Voraus zu buchen, besonders in den Sommermonaten, da dies die geschäftigsten Zeiten für Malerbetriebe sind. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei den Anbietern und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Fachbetrieben ist begrenzt. Planen Sie Ihre Malerarbeiten frühzeitig und fordern Sie rechtzeitig Offerten an."
    },
    {
      q: "Was ist der Unterschied zwischen Innenanstrich und Aussenanstrich?",
      a: "Innenanstrich bezieht sich auf Malerarbeiten im Innenbereich von Gebäuden (Wände, Decken, Türen, Fensterrahmen). Aussenanstrich umfasst Malerarbeiten an der Aussenfassade von Gebäuden. Aussenanstrich erfordert spezielle Farben, die wetterbeständig sind und UV-Strahlung standhalten. Ein Malerbetrieb, der Aussenanstrich anbietet, benötigt oft Gerüste und spezielle Ausrüstung. Viele Handwerksbetriebe bieten beide Dienstleistungen an, aber einige spezialisieren sich auf eine bestimmte Art von Malerarbeiten."
    }
  ]

  const services = [
    {
      title: "Innenanstrich",
      description: "Professionelle Malerarbeiten im Innenbereich: Wände, Decken, Türen und Fensterrahmen streichen mit hochwertigen Farben.",
      icon: Home
    },
    {
      title: "Aussenanstrich",
      description: "Wetterbeständiger Aussenanstrich für Fassaden, Balkone und Aussenwände mit speziellen Fassadenfarben.",
      icon: Building
    },
    {
      title: "Fassadenanstrich",
      description: "Professioneller Fassadenanstrich für Wohn- und Geschäftshäuser mit langlebigen, hochwertigen Farben.",
      icon: Layers
    },
    {
      title: "Tapezierarbeiten",
      description: "Tapezieren von Wänden, Entfernen alter Tapeten und professionelle Vorbereitung der Untergründe.",
      icon: Palette
    },
    {
      title: "Spachtelarbeiten",
      description: "Vorbereitung der Wände durch Spachteln, Glätten und Grundieren für einen perfekten Anstrich.",
      icon: Wrench
    },
    {
      title: "Renovierungsarbeiten",
      description: "Komplette Renovierung von Räumen inklusive Malerarbeiten, Tapezierarbeiten und Ausbesserungsarbeiten.",
      icon: Brush
    }
  ]

  const selectionCriteria = [
    {
      icon: Shield,
      title: "Erfahrung und Referenzen",
      description: "Ein seriöser Malerbetrieb verfügt über langjährige Erfahrung und kann Referenzen vorweisen. Prüfen Sie die bisherigen Projekte und Bewertungen des Anbieters."
    },
    {
      icon: Palette,
      title: "Materialqualität",
      description: "Ein guter Fachbetrieb verwendet hochwertige Farben und Materialien. Fragen Sie nach den verwendeten Marken und Qualitäten in den Offerten."
    },
    {
      icon: FileText,
      title: "Transparente Offerten",
      description: "Ein professioneller Malerservice erstellt detaillierte, schriftliche Offerten mit klarer Preisaufschlüsselung aller Leistungen und Materialien."
    },
    {
      icon: Phone,
      title: "Erreichbarkeit und Kommunikation",
      description: "Ein guter Handwerksbetrieb ist erreichbar, antwortet schnell auf Anfragen und kommuniziert klar über Termine, Abläufe und Kosten."
    },
    {
      icon: Calendar,
      title: "Verfügbarkeit",
      description: "Prüfen Sie, ob der Anbieter am gewünschten Termin verfügbar ist. Flexible Betriebe bieten alternative Termine an."
    },
    {
      icon: Award,
      title: "Versicherungsschutz",
      description: "Wählen Sie einen Malerbetrieb mit gültiger Betriebshaftpflichtversicherung. Dies schützt Sie bei eventuellen Schäden während der Arbeiten."
    }
  ]

  const costFactors = [
    {
      factor: "Art der Malerarbeiten",
      description: "Innenanstrich ist meist günstiger als Aussenanstrich oder Fassadenanstrich, da weniger spezielle Materialien benötigt werden."
    },
    {
      factor: "Flächengrösse",
      description: "Die zu streichende Fläche in Quadratmetern bestimmt massgeblich den Preis. Grössere Flächen können pro Quadratmeter günstiger sein."
    },
    {
      factor: "Vorarbeiten",
      description: "Spachteln, Grundieren, Entfernen alter Tapeten oder Farben erhöhen die Kosten. Eine gute Malerfirma führt alle notwendigen Vorarbeiten durch."
    },
    {
      factor: "Materialqualität",
      description: "Hochwertige Farben und Materialien sind teurer, bieten aber bessere Haltbarkeit und Ergebnisqualität."
    },
    {
      factor: "Zugänglichkeit",
      description: "Schwierige Zugänge, hohe Stockwerke oder Gerüstbedarf können zusätzliche Kosten verursachen."
    },
    {
      factor: "Termin",
      description: "Sommermonate und Hauptsaison sind teurer, da die Nachfrage höher ist. Flexibilität beim Termin kann Geld sparen."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                <span className="block">Malerfirma</span>
                <span className="block text-blue-600 mt-2">finden & vergleichen</span>
                <span className="block text-2xl md:text-3xl text-gray-700 font-bold mt-4">
                  Professionelle Malerarbeiten bis zu 40% günstiger
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Finden Sie die <strong>beste Malerfirma</strong> für Ihre Malerarbeiten in der Schweiz. Vergleichen Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften Malerfirmen – <strong>100% kostenlos und unverbindlich</strong>. Innenanstrich, Aussenanstrich, Fassadenanstrich – sparen Sie Zeit und Geld durch den direkten Vergleich professioneller Malerfirmen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt Malerfirma finden
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Info className="mr-2 h-5 w-5" />
                  Mehr erfahren
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 5 Anbieter</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Nur geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </div>
            <div
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Palette className="h-6 w-6 text-blue-600 mr-2" />
                    Ihre Vorteile
                  </h3>
                  <ul className="space-y-3">
                    {features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <feature.icon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum mehrere Anbieter vergleichen?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Der Vergleich mehrerer Malerbetriebe ist der effektivste Weg, um faire Preise zu finden und bei Ihren Malerarbeiten Geld zu sparen. Studien zeigen, dass Kunden durch den Vergleich mehrerer Anbieter durchschnittlich <strong>30-40% der Kosten einsparen</strong> können.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
              >
                <Card className="h-full border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <feature.icon className="h-6 w-6 text-blue-600" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welche Malerarbeiten benötigen Sie?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Verschiedene Malerfirmen spezialisieren sich auf unterschiedliche Arten von Malerarbeiten. Finden Sie die richtige Malerfirma für Ihren spezifischen Bedarf.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
              >
                <Card className="h-full hover:border-blue-500 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <service.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Worauf sollten Sie bei der Auswahl achten?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Nicht alle Anbieter sind gleich. Diese Kriterien helfen Ihnen, den besten Fachbetrieb für Ihre Malerarbeiten zu finden.
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
                      <div className="bg-purple-100 p-3 rounded-lg mr-4">
                        <criterion.icon className="h-6 w-6 text-purple-600" />
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

      {/* Cost Factors Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Was beeinflusst die Kosten für Malerarbeiten?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Die Preise von Malerbetrieben variieren je nach verschiedenen Faktoren. Verstehen Sie, was die Kosten beeinflusst, um die beste Offerte zu finden.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costFactors.map((item, index) => (
              <div
                key={index}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Target className="h-5 w-5 text-blue-600 mr-2" />
                      {item.factor}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Professionelle Malerarbeiten in der Schweiz: Ihr kompletter Ratgeber
              </h2>
              
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p className="text-lg">
                  Eine <strong>Malerfirma</strong> ist Ihr Partner für professionelle Malerarbeiten in der Schweiz. Wenn Sie einen <strong>Fachbetrieb für Malerarbeiten finden</strong> möchten, der zu Ihren Bedürfnissen passt, sollten Sie mehrere <strong>Malerbetriebe vergleichen</strong>, um die beste Offerte zu erhalten. Bei Online-Offerten.ch können Sie <strong>kostenlose Offerten von geprüften Malerunternehmen</strong> anfordern und diese in Ruhe vergleichen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Was macht einen professionellen Anbieter aus?
                </h3>
                <p>
                  Ein professioneller <strong>Malerbetrieb</strong> zeichnet sich durch mehrere wichtige Merkmale aus. Ein seriöser <strong>Handwerksbetrieb</strong> verfügt über langjährige Erfahrung, geschultes Personal, hochwertige Materialien und Equipment für verschiedene Arten von Malerarbeiten. Ein guter <strong>Malerservice</strong> bietet transparente Offerten mit detaillierter Preisaufschlüsselung, ist versichert und kommuniziert klar. Der <strong>beste Anbieter</strong> für Sie ist derjenige, der Ihre spezifischen Bedürfnisse erfüllt und ein faires Preis-Leistungs-Verhältnis bietet.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  So finden Sie den richtigen Fachbetrieb
                </h3>
                <p>
                  Um den richtigen <strong>Malerbetrieb</strong> zu finden, sollten Sie systematisch vorgehen. Zunächst definieren Sie Ihre Anforderungen: Art der Malerarbeiten (Innenanstrich, Aussenanstrich, Fassadenanstrich), zu streichende Flächen, gewünschte Farben und Termin. Dann fordern Sie mehrere Offerten von verschiedenen <strong>Malerunternehmen</strong> an – am besten über ein Vergleichsportal wie Online-Offerten.ch. Vergleichen Sie die Offerten nicht nur nach Preis, sondern auch nach enthaltenen Leistungen, verwendeten Materialien und Bewertungen. Ein <strong>Malerservice in der Nähe</strong> kann Vorteile haben, aber auch weiter entfernte <strong>Anbieter</strong> können gute Angebote machen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Anbieter vergleichen: So sparen Sie bis zu 40%
                </h3>
                <p>
                  Der Vergleich mehrerer <strong>Malerbetriebe</strong> ist der effektivste Weg, um bei Ihren Malerarbeiten Geld zu sparen. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Kosten einsparen können. Dies liegt daran, dass die Preise zwischen verschiedenen <strong>Handwerksbetrieben</strong> erheblich variieren können. Ein <strong>günstiger Anbieter</strong> bedeutet nicht immer das beste Angebot – achten Sie auf Qualität, enthaltene Leistungen und verwendete Materialien. Durch das Vergleichen mehrerer <strong>Malerunternehmen</strong> erhalten Sie einen fairen Marktüberblick.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Regionale Unterschiede in der Schweiz
                </h3>
                <p>
                  Die Preise und Verfügbarkeit von <strong>Malerbetrieben</strong> können je nach Region in der Schweiz variieren. In Ballungsgebieten wie Zürich, Basel oder Genf gibt es mehr <strong>Fachbetriebe</strong> zur Auswahl, aber die Preise sind oft höher. Ein <strong>Malerbetrieb in Zürich</strong> oder <strong>Basel</strong> hat oft höhere Lohnkosten als ein <strong>Handwerksbetrieb</strong> in ländlicheren Regionen. Dennoch lohnt es sich, auch <strong>Anbieter</strong> aus anderen Regionen zu kontaktieren, da diese oft günstigere Preise anbieten können.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Seriöse Anbieter erkennen: Worauf achten?
                </h3>
                <p>
                  Einen <strong>seriösen Malerbetrieb</strong> erkennt man an mehreren Merkmalen. Er bietet schriftliche, detaillierte Offerten mit klarer Preisaufschlüsselung, verfügt über gültige Versicherungen und kann Referenzen vorweisen. Ein <strong>seriöser Handwerksbetrieb</strong> ist erreichbar, antwortet schnell auf Anfragen und kommuniziert professionell. Vermeiden Sie <strong>Anbieter</strong>, die nur mündliche Zusagen machen, Druck ausüben oder ungewöhnlich günstige Preise ohne Erklärung anbieten. Ein <strong>seriöser Malerservice</strong> ist transparent und beantwortet alle Ihre Fragen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Was sollte in einer professionellen Offerte enthalten sein?
                </h3>
                <p>
                  Professionelle <strong>Offerten von Malerbetrieben</strong> sollten alle wichtigen Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Vorarbeiten, Anstrich, Nachbearbeitung), verwendete Materialien und Farbqualität, Anzahl der benötigten Arbeitsstunden, Versicherungsschutz, Termin und Zeitfenster, Zahlungsbedingungen und Garantien. Ein guter <strong>Fachbetrieb</strong> erstellt schriftliche Offerten, die alle Leistungen transparent auflisten. Vergleichen Sie <strong>Offerten</strong> nicht nur nach Preis, sondern auch nach Qualität und Umfang der Leistungen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Innenanstrich vs. Aussenanstrich: Was brauchen Sie?
                </h3>
                <p>
                  <strong>Innenanstrich</strong> bezieht sich auf Malerarbeiten im Innenbereich von Gebäuden (Wände, Decken, Türen, Fensterrahmen). <strong>Aussenanstrich</strong> umfasst Malerarbeiten an der Aussenfassade von Gebäuden. <strong>Aussenanstrich</strong> erfordert spezielle Farben, die wetterbeständig sind und UV-Strahlung standhalten. Ein <strong>Malerbetrieb</strong>, der <strong>Aussenanstrich</strong> anbietet, benötigt oft Gerüste und spezielle Ausrüstung. Viele <strong>Handwerksbetriebe</strong> bieten beide Dienstleistungen an, aber einige spezialisieren sich auf eine bestimmte Art von Malerarbeiten. Wählen Sie einen <strong>Fachbetrieb</strong>, der Erfahrung mit Ihrer spezifischen Art von Malerarbeiten hat.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    ğŸ’¡ Pro-Tipp: Den richtigen Anbieter auswählen
                  </h4>
                  <p className="text-gray-700">
                    Beim Vergleich von <strong>Malerbetrieben</strong> sollten Sie nicht nur auf den Preis achten. Vergleichen Sie auch die enthaltenen Leistungen, verwendeten Materialien, Versicherungssummen, Bewertungen und die Kommunikationsqualität. Ein etwas teurerer <strong>Anbieter</strong> kann durch bessere Materialien, Versicherungen und Erfahrung das bessere Angebot sein. Fragen Sie nach Referenzen und besichtigen Sie wenn möglich bereits durchgeführte Projekte des <strong>Handwerksbetriebs</strong>.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Häufige Fragen zu Malerfirmen
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Alles, was Sie über Malerbetriebe und Malerarbeiten wissen müssen – beantwortet von unseren Experten.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
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

      {/* Internal Links Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="max-w-4xl mx-auto"
          >
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 md:p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Weitere Informationen & Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Malerarbeiten</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/malerarbeitenkosten" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Malerarbeiten Offerten vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/malerfirma" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Malerfirma in der Nähe finden
                      </Link>
                    </li>
                    <li>
                      <Link href="/malerfirma/zuerich" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Malerfirma Zürich
                      </Link>
                    </li>
                    <li>
                      <Link href="/malerfirma/basel" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Malerfirma Basel
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Verwandte Services</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/reinigung" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Reinigungsfirmen vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Umzugsfirmen finden
                      </Link>
                    </li>
                    <li>
                      <Link href="/ratgeber" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Ratgeber & Tipps
                      </Link>
                    </li>
                    <li>
                      <Link href="/kostenlose-offerte-anfordern" className="text-blue-600 hover:text-blue-700 font-medium underline">
                        Kostenlose Offerten anfordern
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit, Ihre Malerfirma zu finden?
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 5 Offerten von geprüften Malerfirmen an. Vergleichen Sie Preise und sparen Sie bis zu 40% bei Ihren Malerarbeiten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt Malerfirma finden
              </Button>
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-400 text-white border-2 border-white text-lg px-8 py-6 shadow-lg"
              >
                <Info className="mr-2 h-5 w-5" />
                Mehr Informationen
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-50">
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
                <span>Nur geprüfte Betriebe</span>
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

export default MalerfirmaPageClient



