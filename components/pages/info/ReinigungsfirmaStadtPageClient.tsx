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
  Star, Calculator, MapPin, Home, Building, Globe, Sparkles, Droplets,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Phone, Mail, Calendar, Navigation2, Route, Sparkle, Wrench, Shield
} from 'lucide-react'

interface StadtInfo {
  name: string
  slug: string
  canonicalUrl: string
  description: string
  population?: string
  region?: string
}

interface ReinigungsfirmaStadtPageClientProps {
  stadtInfo: StadtInfo
}

const ReinigungsfirmaStadtPageClient = ({ stadtInfo }: ReinigungsfirmaStadtPageClientProps) => {
  const router = useRouter()
  const { name, slug, canonicalUrl, description } = stadtInfo

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
              "item": "https://online-offerten.ch/reinigungsfirma"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": `Reinigungsfirma ${name}`,
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": `Reinigungsfirma ${name} finden`,
          "serviceType": "Reinigungsservice",
          "description": `Finden Sie die besten Reinigungsunternehmen in ${name}. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Reinigungsanbietern in ${name} für Büroreinigung, Haushaltsreinigung und mehr.`,
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch",
            "logo": "https://online-offerten.ch/image/logo.png"
          },
          "areaServed": {
            "@type": "City",
            "name": name
          },
          "offers": {
            "@type": "Offer",
            "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung&step=2&city=${encodeURIComponent(name)}`,
            "priceCurrency": "CHF",
            "price": "0",
            "name": `Kostenlose Reinigungsfirma Offerten in ${name}`
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://online-offerten.ch/#organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/logo.png",
          "description": `Vergleichsportal für Reinigungsfirmen in ${name}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": name,
            "addressCountry": "CH"
          },
          "areaServed": {
            "@type": "City",
            "name": name
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `Wie finde ich eine Reinigungsfirma in ${name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Um Reinigungsunternehmen in ${name} zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihre Reinigungsanforderungen. Wir vermitteln Ihnen dann bis zu 5 geprüfte Reinigungsanbieter aus ${name}, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen.`
              }
            },
            {
              "@type": "Question",
              "name": `Wie viel kostet eine Reinigungsfirma in ${name}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Die Kosten für einen Reinigungsservice in ${name} hängen von verschiedenen Faktoren ab: Art der Reinigung (Büroreinigung, Haushaltsreinigung, Endreinigung), Grösse der zu reinigenden Fläche, Häufigkeit der Reinigung und benötigte Leistungen. Eine durchschnittliche Wohnungsreinigung in ${name} kostet zwischen 500 und 1.200 CHF. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Reinigungsunternehmen in ${name}.`
              }
            },
            {
              "@type": "Question",
              "name": `Warum sollte ich eine Reinigungsfirma in ${name} wählen?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Ein Reinigungsservice in ${name} bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten, lokale Expertise über örtliche Gegebenheiten in ${name}, schnellere Reaktionszeiten bei Notfällen, persönlicherer Service und bessere Erreichbarkeit. Regionale Reinigungsunternehmen in ${name} kennen die örtlichen Gegebenheiten besonders gut.`
              }
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = `reinigungsfirma-${slug}-schema`
    
    const existing = document.getElementById(`reinigungsfirma-${slug}-schema`)
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
      const scriptToRemove = document.getElementById(`reinigungsfirma-${slug}-schema`)
      if (scriptToRemove && scriptToRemove.parentNode) {
        try {
          scriptToRemove.remove()
        } catch (e) {
          // Element zaten kaldırılmış olabilir
        }
      }
    }
  }, [name, slug, canonicalUrl])

  const handleCtaClick = () => {
    router.push(`/kostenlose-offerte-anfordern?service=reinigung&step=2&city=${encodeURIComponent(name)}`)
  }

  const features = [
    {
      icon: MapPin,
      title: `Reinigungsfirmen in ${name}`,
      description: `Finden Sie geprüfte Reinigungsfirmen direkt in ${name}`
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
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
      icon: Navigation2,
      title: 'Lokale Expertise',
      description: `Reinigungsfirmen in ${name} kennen die örtlichen Gegebenheiten besonders gut`
    }
  ]

  const faqItems = [
    {
      q: `Wie finde ich eine Reinigungsfirma in ${name}?`,
      a: `Um Reinigungsunternehmen in ${name} zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihre Reinigungsanforderungen. Wir vermitteln Ihnen dann bis zu 5 geprüfte Reinigungsanbieter aus ${name}, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen. Die Reinigungsunternehmen in ${name} kennen die örtlichen Gegebenheiten besonders gut.`
    },
    {
      q: `Wie viel kostet eine Reinigungsfirma in ${name}?`,
      a: `Die Kosten für einen Reinigungsservice in ${name} hängen von verschiedenen Faktoren ab: Art der Reinigung (Büroreinigung, Haushaltsreinigung, Endreinigung), Grösse der zu reinigenden Fläche, Häufigkeit der Reinigung und benötigte Leistungen. Eine durchschnittliche Wohnungsreinigung in ${name} kostet zwischen 500 und 1.200 CHF. Büroreinigung kann zwischen 200 und 800 CHF pro Reinigung kosten. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Reinigungsunternehmen in ${name}.`
    },
    {
      q: `Warum sollte ich eine Reinigungsfirma in ${name} wählen?`,
      a: `Ein Reinigungsservice in ${name} bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten und Umweltbelastung, lokale Expertise über örtliche Gegebenheiten in ${name}, schnellere Reaktionszeiten bei Notfällen oder kurzfristigen Änderungen, persönlicherer Service und bessere Erreichbarkeit, sowie Unterstützung der lokalen Wirtschaft. Reinigungsunternehmen in ${name} kennen die örtlichen Gegebenheiten besonders gut und können flexibler auf Ihre Bedürfnisse eingehen.`
    },
    {
      q: `Wie viele Offerten erhalte ich von Reinigungsfirmen in ${name}?`,
      a: `Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Reinigungsanbietern aus ${name}. Nachdem Sie das Formular ausgefüllt haben, nehmen die Reinigungsunternehmen in ${name} direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. In ${name} erhalten Sie meist alle 5 Offerten, da es eine grosse Auswahl an Reinigungsanbietern gibt. Jede Offerte wird individuell auf Ihre Bedürfnisse zugeschnitten.`
    },
    {
      q: `Sind die Reinigungsfirmen in ${name} versichert?`,
      a: `Ja, alle Reinigungsunternehmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Die Reinigungsfirmen in ${name} sind alle versichert und seriös. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen.`
    },
    {
      q: `Wie lange im Voraus sollte ich eine Reinigungsfirma in ${name} buchen?`,
      a: `Wir empfehlen, mindestens 1-2 Wochen im Voraus zu buchen, besonders für Endreinigungen oder regelmässige Reinigungen. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei Reinigungsanbietern in ${name} und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Reinigungsunternehmen ist begrenzt. Planen Sie Ihre Reinigung in ${name} frühzeitig und fordern Sie rechtzeitig Offerten an.`
    }
  ]

  const benefits = [
    {
      icon: Route,
      title: "Kürzere Anfahrtswege",
      description: `Reinigungsunternehmen in ${name} haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert.`
    },
    {
      icon: Navigation2,
      title: "Lokale Expertise",
      description: `Reinigungsfirmen in ${name} kennen die örtlichen Gegebenheiten, Zugänglichkeiten und baulichen Besonderheiten besonders gut.`
    },
    {
      icon: Clock,
      title: "Schnellere Reaktionszeiten",
      description: `Bei Notfällen oder kurzfristigen Änderungen können Reinigungsfirmen in ${name} schneller reagieren.`
    },
    {
      icon: HeartHandshake,
      title: "Persönlicher Service",
      description: `Lokale Reinigungsfirmen in ${name} legen oft mehr Wert auf persönliche Beziehungen und langfristige Kundenbindung.`
    },
    {
      icon: Building,
      title: "Unterstützung der lokalen Wirtschaft",
      description: `Durch die Beauftragung einer Reinigungsfirma in ${name} unterstützen Sie lokale Unternehmen.`
    },
    {
      icon: ShieldCheck,
      title: "Bessere Erreichbarkeit",
      description: `Reinigungsfirmen in ${name} sind erreichbarer und reagieren schneller auf Ihre Anliegen.`
    }
  ]

  const services = [
    {
      title: "Wohnungsreinigung",
      description: "Professionelle Reinigung für Ihre Wohnung. Gründlich, zuverlässig und individuell auf Ihre Bedürfnisse abgestimmt.",
      icon: Home,
      link: "/reinigung/wohnungsreinigung"
    },
    {
      title: "Hausreinigung",
      description: "Umfassende Reinigung für Ihr gesamtes Haus. Von Küche bis Bad – wir sorgen für makellose Sauberkeit.",
      icon: Home,
      link: "/reinigung/hausreinigung"
    },
    {
      title: "Büroreinigung",
      description: "Professionelle Büro- und Gewerbereinigung für ein sauberes Arbeitsumfeld. Regelmässig oder einmalig.",
      icon: Building,
      link: "/reinigung/bueroreinigung"
    },
    {
      title: "Umzugsreinigung",
      description: "Professionelle Endreinigung für Wohnungsübergabe. Mit Abnahmegarantie für sorgenfreien Auszug.",
      icon: Sparkles,
      link: "/reinigung/umzugsreinigung"
    },
    {
      title: "Unterhaltsreinigung",
      description: "Regelmässige Reinigung für Privathaushalte und Firmen. Individuell auf Ihre Bedürfnisse zugeschnitten.",
      icon: Clock,
      link: "/reinigung/unterhaltsreinigung"
    },
    {
      title: "Grundreinigung",
      description: "Intensive Tiefenreinigung für einen sauberen Start. Ideal für den Einzug oder nach Renovationen.",
      icon: Droplets,
      link: "/reinigung/grundreinigung"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Reinigungsfirmen in {name}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="block">Reinigungsfirma</span>
                <span className="block text-blue-600 mt-2">{name}</span>
                <span className="block text-2xl md:text-3xl text-gray-700 font-bold mt-4">
                  Professionelle Reinigung in {name}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Finden Sie die <strong>beste Reinigungsfirma in {name}</strong>. Vergleichen Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften <strong>Reinigungsunternehmen in {name}</strong>. Lokale Expertise, kürzere Wege, bessere Preise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt vergleichen
                </Button>
                <Button
                  onClick={() => router.push('/reinigung/reinigungskosten')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Reinigungskosten berechnen
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Reinigungsfirmen in {name}</span>
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
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-blue-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Sparkles className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Finden Sie Ihre Reinigungsfirma in {name}
                </h3>
                <div className="space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <feature.icon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
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

      {/* Why Local Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum eine Reinigungsfirma in {name} wählen?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Reinigungsunternehmen in {name} bieten zahlreiche Vorteile. Erfahren Sie, warum ein <strong>Reinigungsservice in {name}</strong> die beste Wahl für Ihre Reinigung sein kann.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
              >
                <Card className="h-full border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <benefit.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
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
              Welche Reinigungsleistungen benötigen Sie in {name}?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Verschiedene Reinigungsbetriebe in {name} spezialisieren sich auf unterschiedliche Arten von Reinigungsarbeiten. Finden Sie den richtigen Fachbetrieb für Ihren spezifischen Bedarf.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
              >
                <Link href={service.link}>
                  <Card className="h-full hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
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
                      <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
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

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So finden Sie einen Reinigungsservice in {name}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              In nur 3 einfachen Schritten finden Sie die perfekten Reinigungsunternehmen in {name}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihre Reinigungsanforderungen in unserem Formular. Geben Sie Art der Reinigung, Flächengrösse, Reinigungstermin und gewünschte Leistungen an.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: `Erhalten Sie bis zu 5 Offerten von Reinigungsunternehmen in ${name}. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.`,
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: `Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Reinigungsanbieter in ${name} für Ihre Reinigung aus.`,
                icon: Star
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative"
              >
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
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Section - SEO Rich Content */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Reinigungsfirma {name}: Ihr kompletter Ratgeber
              </h2>
              
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p className="text-lg">
                  Eine <strong>Reinigungsfirma in {name}</strong> zu finden, ist der erste Schritt zu einer professionellen und kostengünstigen Reinigung. Wenn Sie nach einem <strong>Reinigungsservice in {name}</strong> suchen, sollten Sie mehrere <strong>Reinigungsunternehmen in {name} vergleichen</strong>, um die beste Offerte zu erhalten. Bei Online-Offerten.ch können Sie <strong>kostenlose Offerten von geprüften Reinigungsanbietern in {name}</strong> anfordern und diese in Ruhe vergleichen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Warum eine Reinigungsfirma in {name} wählen?
                </h3>
                <p>
                  Ein <strong>Reinigungsservice in {name}</strong> bietet zahlreiche Vorteile. <strong>Reinigungsunternehmen in {name}</strong> kennen die örtlichen Gegebenheiten, Zugänglichkeiten und baulichen Besonderheiten besonders gut. Eine <strong>Reinigungsfirma in {name}</strong> hat kürzere Anfahrtswege, was die Kosten reduziert. Regionale <strong>Reinigungsbetriebe in {name}</strong> sind oft flexibler bei kurzfristigen Änderungen oder Notfällen. Lokale Anbieter in {name} legen oft mehr Wert auf persönliche Beziehungen und langfristige Kundenbindung.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  So finden Sie einen Reinigungsservice in {name}
                </h3>
                <p>
                  Um den richtigen <strong>Reinigungsanbieter in {name}</strong> zu finden, sollten Sie systematisch vorgehen. Zunächst definieren Sie Ihre Anforderungen: Art der Reinigung (Büroreinigung, Haushaltsreinigung, Endreinigung), zu reinigende Flächen, Reinigungstermin und gewünschte Leistungen. Dann fordern Sie mehrere Offerten von verschiedenen <strong>Reinigungsunternehmen in {name}</strong> an – am besten über ein Vergleichsportal wie Online-Offerten.ch. Vergleichen Sie die Offerten nicht nur nach Preis, sondern auch nach enthaltenen Leistungen, verwendeten Reinigungsmitteln und Bewertungen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Wie viel kostet eine Reinigungsfirma in {name}?
                </h3>
                <p>
                  Die Kosten für einen <strong>Reinigungsanbieter in {name}</strong> hängen von verschiedenen Faktoren ab: Art der Reinigung, Grösse der zu reinigenden Fläche, Häufigkeit der Reinigung, benötigte Leistungen und Reinigungstermin. <strong>Reinigungsunternehmen in {name}</strong> können durch kürzere Anfahrtswege günstigere Preise anbieten. Eine durchschnittliche Wohnungsreinigung in {name} kostet zwischen 500 und 1.200 CHF. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen <strong>Reinigungsanbietern in {name}</strong>.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    ğŸ’¡ Pro-Tipp: Reinigungsunternehmen in {name} richtig auswählen
                  </h4>
                  <p className="text-gray-700">
                    Beim Vergleich von <strong>Reinigungsanbietern in {name}</strong> sollten Sie nicht nur auf den Preis achten. Vergleichen Sie auch die enthaltenen Leistungen, verwendeten Reinigungsmittel, Versicherungssummen, Bewertungen und die Kommunikationsqualität. Ein <strong>Reinigungsservice in {name}</strong> mit lokaler Expertise kann trotz etwas höherem Preis das bessere Angebot sein, da er die örtlichen Gegebenheiten besser kennt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Häufig gestellte Fragen (FAQ)
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Alles, was Sie über Reinigungsunternehmen in {name} wissen müssen – beantwortet von unseren Experten.
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit, Reinigungsunternehmen in {name} zu finden?
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 5 Offerten von geprüften Reinigungsanbietern in {name} an. Vergleichen Sie Preise und finden Sie die beste Offerte für Ihre Reinigung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt Anfrage senden
              </Button>
              <Button
                onClick={() => router.push('/reinigung/reinigungskosten')}
                size="lg"
                className="bg-blue-500 hover:bg-blue-400 text-white border-2 border-white text-lg px-8 py-6 shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Reinigungskosten berechnen
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-50">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Unverbindlich</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Nur geprüfte Reinigungsfirmen</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReinigungsfirmaStadtPageClient



