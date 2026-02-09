'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, 
  Star, Calculator, MapPin, Home, Building, Paintbrush, Palette, Sparkles,
  FileText, Search, HeartHandshake, Zap, Layers, Navigation2, Route, Mail, HelpCircle
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const MalerfirmaZurichPageClient = () => {
  const router = useRouter()
  const city = 'Zürich'
  const canonicalUrl = 'https://online-offerten.ch/malerfirma-in-der-naehe/zuerich'

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
              "name": "Malerfirma in der Nähe",
              "item": "https://online-offerten.ch/malerfirma-in-der-naehe"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": `Malerfirma ${city}`,
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "serviceType": "Maler-Vermittlung",
          "name": `Malerfirma in ${city} finden`,
          "description": `Finden Sie die besten Malerbetriebe in ${city}. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Maleranbietern in ${city} für Innenanstrich, Aussenanstrich, Fassadenanstrich und mehr.`,
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch"
          },
          "areaServed": {
            "@type": "City",
            "name": city,
            "containedInPlace": {
              "@type": "Country",
              "name": "Switzerland"
            }
          },
          "offers": {
            "@type": "Offer",
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=maler&step=2",
            "priceCurrency": "CHF",
            "price": "0"
          }
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'malerfirma-zuerich-schema'
    
    const existing = document.getElementById('malerfirma-zuerich-schema')
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
      const scriptToRemove = document.getElementById('malerfirma-zuerich-schema')
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

  const services = [
    {
      title: "Innenanstrich",
      description: "Professioneller Innenanstrich für Ihre Wohnung oder Ihr Haus in Zürich. Von Altbauwohnungen bis zu modernen Neubauten – lokale Malerbetriebe kennen die regionalen Besonderheiten.",
      icon: Home
    },
    {
      title: "Aussenanstrich",
      description: "Wetterfester Aussenanstrich für Fassaden, Balkone und Aussenbereiche in Zürich. Lokale Malerfirmen kennen die örtlichen Wetterbedingungen und Bauvorschriften.",
      icon: Building
    },
    {
      title: "Fassadenanstrich",
      description: "Professionelle Fassadenrenovation und -anstrich in Zürich. Wir geben Ihrem Gebäude ein neues, gepflegtes Erscheinungsbild – von historischen Altbauten bis zu modernen Gebäuden.",
      icon: Layers
    }
  ]

  const localAdvantages = [
    {
      icon: Navigation2,
      title: "Kürzere Anfahrtswege in Zürich",
      description: "Lokale Malerbetriebe in Zürich haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert. Besonders in den verschiedenen Stadtkreisen von Zürich ist dies ein wichtiger Vorteil."
    },
    {
      icon: ShieldCheck,
      title: "Kenntnisse lokaler Bauvorschriften",
      description: "Malerbetriebe in Zürich kennen die spezifischen Bauvorschriften und Denkmalschutzbestimmungen der Stadt. Dies ist besonders wichtig bei Altbauwohnungen und denkmalgeschützten Gebäuden."
    },
    {
      icon: Clock,
      title: "Schnelle Reaktionszeiten",
      description: "Bei Notfällen oder kurzfristigen Änderungen können regionale Malerunternehmen in Zürich schneller reagieren. Die kurzen Anfahrtswege ermöglichen flexible Terminplanung."
    },
    {
      icon: Building,
      title: "Erfahrung mit Altbau & Neubau",
      description: "Zürich bietet eine Mischung aus historischen Altbauten und modernen Neubauten. Lokale Malerbetriebe haben Erfahrung mit beiden Gebäudetypen und kennen die spezifischen Anforderungen."
    }
  ]

  const neighboringCities = [
    { name: "Malerfirma Basel", link: "/malerfirma-in-der-naehe/basel" },
    { name: "Malerfirma Bern", link: "/malerfirma-in-der-naehe/bern" },
    { name: "Malerfirma Winterthur", link: "/malerfirma-in-der-naehe/winterthur" }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold text-sm mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Malerbetriebe in Zürich
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Malerfirma in Zürich finden & vergleichen – Bis zu 40% sparen
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 font-bold mb-4">
                Lokale Malerbetriebe in Zürich vergleichen
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                In Zürich sind professionelle Malerarbeiten besonders gefragt – von Altbauwohnungen in den historischen Stadtteilen bis zu modernen Neubauten. Lokale <strong>Malerbetriebe in Zürich</strong> kennen die regionalen Bauvorschriften, Denkmalschutzbestimmungen und bieten schnelle Reaktionszeiten. Vergleichen Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften <strong>Maleranbietern in Zürich</strong> – <strong>100% kostenlos und unverbindlich</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt vergleichen
                </Button>
                <Button
                  onClick={() => router.push('/malerarbeitenkosten')}
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
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Lokale Malerbetriebe in {city}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Nur geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
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
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-purple-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Paintbrush className="h-12 w-12 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Finden Sie Ihre Malerfirma in Zürich
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Lokale Malerbetriebe</p>
                      <p className="text-sm text-gray-600">Geprüfte regionale Malerunternehmen direkt in {city}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">100% kostenlos</p>
                      <p className="text-sm text-gray-600">Keine Gebühren, keine Verpflichtungen</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Bis zu 40% sparen</p>
                      <p className="text-sm text-gray-600">Durch Vergleich mehrerer Offerten</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Nur geprüfte Firmen</p>
                      <p className="text-sm text-gray-600">Versichert und mit positiven Bewertungen</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* City-Specific Introduction */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Warum eine Malerfirma in Zürich wählen?
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p className="text-lg">
                  Zürich ist die grösste Stadt der Schweiz und bietet eine einzigartige Mischung aus historischen Altbauten und modernen Neubauten. Lokale <strong>Malerbetriebe in Zürich</strong> kennen die spezifischen Herausforderungen der Stadt: von den engen Gassen der Altstadt bis zu den modernen Hochhäusern in den neuen Stadtteilen.
                </p>
                <p>
                  Eine <strong>Malerfirma in Zürich</strong> zu wählen, bietet zahlreiche Vorteile. Regionale <strong>Malerbetriebe</strong> kennen die örtlichen Bauvorschriften, Denkmalschutzbestimmungen und die spezifischen Anforderungen verschiedener Stadtkreise. Sie haben Erfahrung mit den unterschiedlichen Gebäudetypen in Zürich – von denkmalgeschützten Altbauten bis zu modernen Neubauten.
                </p>
                <p>
                  Lokale <strong>Maleranbieter in Zürich</strong> haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert. Besonders in den verschiedenen Stadtkreisen von Zürich ist dies ein wichtiger Vorteil. Regionale <strong>Malerunternehmen</strong> können schneller auf Notfälle oder kurzfristige Änderungen reagieren und bieten flexiblere Terminplanung.
                </p>
                <p>
                  Besonders in Stadtkreisen wie Zürich 1, 4 oder 11 sind Malerarbeiten stark nachgefragt – sowohl bei Mietwohnungen als auch bei Eigentum. Viele lokale Malerbetriebe haben spezielle Erfahrung mit den unterschiedlichen Anforderungen der verschiedenen Zürcher Stadtkreise.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welche Malerarbeiten benötigen Sie in {city}?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Verschiedene Malerbetriebe in Zürich spezialisieren sich auf unterschiedliche Arten von Malerarbeiten. Finden Sie den richtigen Fachbetrieb für Ihren spezifischen Bedarf.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-purple-500 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-lg mr-4">
                        <service.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Advantages */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vorteile lokaler Malerfirmen in {city}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Regionale Malerbetriebe in Zürich bieten zahlreiche Vorteile, die oft übersehen werden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {localAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-lg mr-4">
                        <advantage.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl">{advantage.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Examples */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Was kosten Malerarbeiten in {city}?
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  💰 Preisbeispiele für {city}
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="border-l-4 border-purple-600 pl-4">
                    <p className="font-semibold text-gray-900 mb-1">Innenanstrich</p>
                    <p><strong>Beispiel:</strong> Eine 3.5-Zimmer-Wohnung (95 m²) in Zürich kostet für einen Innenanstrich durchschnittlich <strong>CHF 1.400–3.300</strong>. Eine 4-Zimmer-Wohnung (120 m²) kostet <strong>CHF 1.800–4.200</strong>.</p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <p className="font-semibold text-gray-900 mb-1">Fassadenanstrich</p>
                    <p><strong>Beispiel:</strong> Ein Einfamilienhaus (200 m² Fassadenfläche) in Zürich kostet für einen Fassadenanstrich durchschnittlich <strong>CHF 6.000–16.000</strong>. Die Preise variieren je nach Gebäudetyp und Zugänglichkeit.</p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <p className="font-semibold text-gray-900 mb-1">Aussenanstrich</p>
                    <p><strong>Beispiel:</strong> Eine Wohnung (80 m² Aussenfläche) in Zürich kostet für einen Aussenanstrich durchschnittlich <strong>CHF 2.400–6.400</strong>. Besonders bei Altbauten können zusätzliche Vorarbeiten anfallen.</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-sm text-gray-600 italic">
                      <strong>Hinweis:</strong> Diese Preise sind Richtwerte für Zürich und können je nach Anbieter, Maleraufwand, Materialqualität, Termin und Stadtkreis variieren. Durch den Vergleich mehrerer Offerten von lokalen Malerbetrieben in Zürich können Sie bis zu 40% sparen.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So finden Sie eine Malerfirma in {city}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              In nur 3 einfachen Schritten finden Sie die perfekten Malerbetriebe in Zürich.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihre Malerarbeiten-Anforderungen in unserem Formular. Geben Sie Art der Arbeiten, Flächengrösse, gewünschten Zeitpunkt und benötigte Leistungen an.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: "Erhalten Sie bis zu 5 Offerten von lokalen Malerbetrieben in {city}. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: "Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Maleranbieter in {city} für Ihre Malerarbeiten aus.",
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
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-purple-200 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <Card className="relative z-10 h-full border-2 border-purple-200 hover:border-purple-500 transition-colors">
                  <CardHeader className="text-center">
                    <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <step.icon className="h-6 w-6 text-purple-600" />
                      </div>
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Häufig gestellte Fragen
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <h4 className="faq-question">Was kostet eine Malerfirma in {city}?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Die Kosten für einen Malerservice in Zürich hängen von verschiedenen Faktoren ab: Art der Malerarbeiten (Innenanstrich, Aussenanstrich, Fassadenanstrich), Grösse der zu streichenden Fläche, Anzahl der Stockwerke, benötigte Vorarbeiten und verwendete Materialien. Ein durchschnittlicher Innenanstrich in Zürich kostet zwischen 15 und 35 CHF pro Quadratmeter. Eine 3.5-Zimmer-Wohnung (95 m²) kostet für einen Innenanstrich durchschnittlich CHF 1.400–3.300. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen lokalen Malerbetrieben in Zürich.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <h4 className="faq-question">Wie viele Offerten erhalte ich?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Malerbetrieben aus Ihrer Region. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten basierend auf Ihren spezifischen Anforderungen.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <h4 className="faq-question">Sind die Malerfirmen in {city} versichert?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Ja, alle Malerbetriebe in Zürich, die über unser Portal vermittelt werden, sind geprüft und verfügen über die notwendigen Versicherungen. Wir stellen sicher, dass nur qualifizierte und versicherte regionale Malerunternehmen in unserem Netzwerk sind, um Ihnen Sicherheit und Qualität zu gewährleisten.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Internal Linking */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Weitere Informationen
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <Link href="/malerfirma-in-der-naehe" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                    Alle Malerfirmen in der Schweiz vergleichen
                  </Link> – Finden Sie Malerbetriebe in Ihrer Region.
                </p>
                <p>
                  Auch in <Link href="/malerfirma-in-der-naehe/basel" className="text-purple-600 hover:text-purple-700 font-semibold underline">Basel</Link> finden Sie lokale Malerbetriebe. Weitere regionale Malerunternehmen finden Sie in <Link href="/malerfirma-in-der-naehe/bern" className="text-purple-600 hover:text-purple-700 font-semibold underline">Bern</Link> und <Link href="/malerfirma-in-der-naehe/winterthur" className="text-purple-600 hover:text-purple-700 font-semibold underline">Winterthur</Link>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit, Malerbetriebe in {city} zu finden?
            </h2>
            <p className="text-xl mb-8 text-purple-50">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 5 Offerten von geprüften Maleranbietern in Zürich an. Vergleichen Sie Preise und sparen Sie bis zu 40% bei Ihren Malerarbeiten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt vergleichen
              </Button>
              <Button
                onClick={() => router.push('/malerarbeitenkosten')}
                size="lg"
                className="bg-purple-500 hover:bg-purple-400 text-white border-2 border-white text-lg px-8 py-6 shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Malerpreise berechnen
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-purple-50">
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
                <span>Nur geprüfte Malerfirmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Bis zu 40% sparen</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default MalerfirmaZurichPageClient
