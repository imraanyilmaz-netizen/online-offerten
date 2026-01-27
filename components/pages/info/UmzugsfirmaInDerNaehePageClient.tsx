'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Home, Building, Globe, Package, Sparkles,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Truck, Navigation, Phone, Mail, Calendar, Navigation2, Route
} from 'lucide-react'
import HomeHeroForm from '@/components/HomeHeroForm'

const UmzugsfirmaInDerNaehePageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsfirma-in-der-naehe'
  
  // Rating stats - can be fetched from API or use defaults
  const [ratingStats] = useState({
    reviewCount: 1,
    averageRating: 4.8
  })

  const faqItems = [
    {
      q: "Wie finde ich eine Umzugsfirma in der Nähe?",
      a: "Nutzen Sie unser kostenloses Vergleichsportal. Füllen Sie das Online-Formular aus und beschreiben Sie Ihren geplanten Umzug. Wir vermitteln Ihnen bis zu 6 geprüfte Anbieter aus Ihrer Region, die sich direkt bei Ihnen melden und individuelle Offerten erstellen."
    },
    {
      q: "Wie viel kostet eine Umzugsfirma?",
      a: "Die Kosten hängen von Umzugsstrecke, Umfang, Stockwerken und benötigten Leistungen ab. Ein durchschnittlicher Wohnungsumzug kostet zwischen 1.500 und 4.000 CHF. Der Vergleich mehrerer Offerten hilft Ihnen, faire Preise zu finden."
    },
    {
      q: "Warum sollte ich eine Umzugsfirma in der Nähe wählen?",
      a: "Kürzere Anfahrtswege reduzieren Kosten, lokale Expertise über Verkehr und Parkregelungen, und schnellere Reaktionszeiten bei Änderungen. Regionale Anbieter kennen die örtlichen Gegebenheiten besonders gut."
    },
    {
      q: "Wie viele Offerten erhalte ich?",
      a: "Sie erhalten bis zu 6 kostenlose und unverbindliche Offerten. In Ballungsgebieten meist alle 6, in ländlicheren Regionen können es auch 3-4 sein. Jede Offerte wird individuell auf Ihre Bedürfnisse zugeschnitten."
    },
    {
      q: "Ist der Service wirklich kostenlos?",
      a: "Ja, unser Service ist für Sie zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 6 Offerten ohne Gebühren. Es gibt keine versteckten Kosten oder Verpflichtungen."
    },
    {
      q: "Wie wird die Qualität sichergestellt?",
      a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Anbieter durchlaufen einen strengen Prüfprozess. Zusätzlich können Sie Bewertungen anderer Kunden einsehen."
    },
    {
      q: "Wie lange im Voraus sollte ich buchen?",
      a: "Wir empfehlen mindestens 1-2 Monate im Voraus, besonders in den Sommermonaten und zum Monatsende. Frühzeitige Buchung gibt Ihnen mehr Auswahl und oft bessere Preise."
    },
    {
      q: "Was sollte eine gute Offerte enthalten?",
      a: "Gesamtpreis mit Aufschlüsselung, alle enthaltenen Leistungen, Versicherungsschutz, Umzugsdatum und Zeitfenster, Anzahl der Helfer und Fahrzeuge, sowie Zahlungs- und Stornierungsbedingungen."
    },
    {
      q: "Wie kann ich sparen?",
      a: "Der Vergleich mehrerer Offerten spart durchschnittlich 30-40%. Weitere Tipps: Flexibel beim Umzugsdatum sein, selbst packen, frühzeitig buchen und Offerten genau vergleichen."
    },
    {
      q: "Was passiert nach der Anfrage?",
      a: "Ihre Anfrage wird an passende Umzugsunternehmen weitergeleitet. Diese nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten. Sie erhalten in der Regel innerhalb von 24-48 Stunden die ersten Rückmeldungen."
    }
  ]

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
              "name": "Umzugsfirma in der Nähe",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Umzugsfirma in der Nähe finden",
          "serviceType": "Umzugsservice",
          "description": "Finden Sie die besten lokalen Umzugsunternehmen. Vergleichen Sie bis zu 6 kostenlose Offerten von geprüften Umzugsanbietern in Ihrer Region für Privatumzug, Geschäftsumzug und mehr.",
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
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Umzugsfirma Offerten in der Nähe"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://online-offerten.ch/#organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/logo.png",
          "description": "Vergleichsportal für Umzugsfirmen in der Schweiz",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CH"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
          }
        },
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'umzugsfirma-in-der-naehe-schema'
    
    const existing = document.getElementById('umzugsfirma-in-der-naehe-schema')
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
      const scriptToRemove = document.getElementById('umzugsfirma-in-der-naehe-schema')
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
      icon: MapPin,
      title: 'Qualifizierte Anbieter',
      description: 'Finden Sie qualifizierte Anbieter direkt in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Transparente Preise & individuelle Offerten',
      description: 'Durch den Vergleich mehrerer lokaler Umzugsfirmen finden Sie die besten Preise'
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
      icon: Navigation,
      title: 'Regionale Expertise',
      description: 'Lokale Umzugsfirmen kennen die örtlichen Gegebenheiten besonders gut'
    }
  ]

  const benefits = [
    {
      icon: Navigation2,
      title: "Lokale Expertise",
      description: "Kennen die örtlichen Gegebenheiten, Verkehrssituationen und Parkregelungen besonders gut."
    },
    {
      icon: Route,
      title: "Kürzere Anfahrtswege",
      description: "Reduzieren die Kosten und minimieren die Umweltbelastung."
    },
    {
      icon: Clock,
      title: "Schnellere Reaktionszeiten",
      description: "Können bei Notfällen oder kurzfristigen Änderungen schneller reagieren."
    }
  ]

  const locations = [
    { name: "Umzugsfirma Zürich", link: "/umzugsfirma-in-der-naehe/zuerich" },
    { name: "Umzugsfirma Basel", link: "/umzugsfirma-in-der-naehe/basel" },
    { name: "Umzugsfirma Bern", link: "/umzugsfirma-in-der-naehe/bern" },
    { name: "Umzugsfirma Genf", link: "/umzugsfirma-in-der-naehe/genf" },
    { name: "Umzugsfirma Lausanne", link: "/umzugsfirma-in-der-naehe/lausanne" },
    { name: "Umzugsfirma Luzern", link: "/umzugsfirma-in-der-naehe/luzern" },
    { name: "Umzugsfirma St. Gallen", link: "/umzugsfirma-in-der-naehe/st-gallen" },
    { name: "Umzugsfirma Thun", link: "/umzugsfirma-in-der-naehe/thun" },
    { name: "Umzugsfirma Biel-Bienne", link: "/umzugsfirma-in-der-naehe/biel-bienne" },
    { name: "Umzugsfirma Lugano", link: "/umzugsfirma-in-der-naehe/lugano" },
    { name: "Umzugsfirma Aargau", link: "/umzugsfirma-in-der-naehe/aargau" }
  ]

  return (
    <>
      {/* Hero Section - Unique Design for Local Search */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-r from-green-600 via-green-600 to-green-800">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 via-green-600/90 to-green-800/90"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-3"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/90 rounded-full text-green-700 font-semibold text-sm mb-6 backdrop-blur-sm">
                <MapPin className="h-4 w-4 mr-2" />
                Umzugsfirmen vergleichen
              </div>
              <h1 className="heading-1-white drop-shadow-lg">
                Umzugsfirma in der Nähe finden » Geprüfte Partner vergleichen
              </h1>
              <p className="text-base sm:text-lg text-white/95 mb-8 leading-relaxed drop-shadow-md">
                Finden Sie geprüfte Umzugsunternehmen in Ihrer Region. Vergleichen Sie kostenlos bis zu 6 Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt Umzugsfirma in der Nähe finden
                </Button>
                <Button
                  onClick={() => router.push('/umzugsfirma/umzugskosten')}
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Kosten berechnen
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/90">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>Versicherte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>Nur geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative md:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Navigation className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="heading-3 text-center">
                  Finden Sie Ihre Umzugsfirma
                </h3>
                <div className="space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Local Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="heading-2">
              Warum eine lokale Umzugsfirma wählen?
            </h2>
            <p className="text-body mb-6">
              Eine Umzugsfirma aus Ihrer Nähe kennt die regionalen Besonderheiten: Verkehrssituationen, Parkregelungen, Gebäudezugänge und lokale Vorschriften. Das spart nicht nur Zeit, sondern auch Geld durch kürzere Anfahrtswege. Lokale Anbieter sind flexibler bei kurzfristigen Änderungen und können schneller auf Ihre individuellen Bedürfnisse eingehen. Zusätzlich unterstützen Sie mit Ihrer Wahl die regionale Wirtschaft und erhalten oft persönlicheren Service.
            </p>
            
            <div className="mb-8">
              <h3 className="heading-3">
                Ihre Vorteile mit einer lokalen Umzugsfirma:
              </h3>
              <ul className="space-y-3 text-body">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Kürzere Anfahrtswege = niedrigere Kosten</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Lokale Expertise = reibungsloser Ablauf</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Schnellere Reaktionszeiten = mehr Flexibilität</strong></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Persönlicher Service = individuelle Betreuung</strong></span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                So finden Sie die beste Umzugsfirma in Ihrer Nähe
              </h3>
              <p className="text-body">
                Der Vergleich mehrerer Anbieter ist der Schlüssel zum Erfolg. Studien zeigen, dass Umzugskosten für identische Leistungen um bis zu 40% variieren können. Mit unserem Service erhalten Sie mit nur einer Anfrage bis zu 6 detaillierte Offerten von geprüften Umzugsunternehmen aus Ihrer Region.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="heading-2">
              So funktioniert's
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihren Umzug in unserem Formular. Geben Sie Umzugsdatum, Wohnungsgrösse, Start- und Zielort an.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: "Erhalten Sie bis zu 6 Offerten. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: "Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Anbieter für Ihren Umzug aus.",
                icon: Star
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Links Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              Umzugsfirmen in Ihrer Region
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Finden Sie Umzugsfirmen in den grössten Städten der Schweiz. Wir vermitteln Ihnen qualifizierte Anbieter aus Ihrer Region.
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

      {/* CTA Section with Form */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl text-left">
            <h2 className="heading-2">
              Lokale Umzugsfirma finden
            </h2>
          
            {/* Search Form */}
            <HomeHeroForm />
            
            {/* Rating Card */}
            {ratingStats.reviewCount > 0 && (
              <div 
                className="bg-white rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-start items-start gap-4 transition-all duration-300 mt-6"
                style={{
                  boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex-1 pt-1 w-full md:w-auto">
                  {/* Trust Badges */}
                  <div className="flex flex-wrap justify-start items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Kostenlos & unverbindlich</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Nur geprüfte Firmen</span>
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

export default UmzugsfirmaInDerNaehePageClient
