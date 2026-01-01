'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Home,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target
} from 'lucide-react'

// Lazy load heavy sections for better Core Web Vitals
const UmzugsoffertenFAQSection = dynamic(
  () => import('./UmzugsoffertenFAQSection'),
  { 
    ssr: true,
    loading: () => (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="space-y-3 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

const UmzugsoffertenSEORichContent = dynamic(
  () => import('./UmzugsoffertenSEORichContent'),
  { 
    ssr: true,
    loading: () => (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

const UmzugsoffertenRelatedServices = dynamic(
  () => import('./UmzugsoffertenRelatedServices'),
  { 
    ssr: true,
    loading: () => (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
)

const UmzugsoffertenPageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsofferten'

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


  // Inject canonical link
  useEffect(() => {
    if (typeof document === 'undefined') return
    
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)
    
    return () => {
      if (typeof document === 'undefined') return
      const canonicalToRemove = document.querySelector('link[rel="canonical"]')
      if (canonicalToRemove && canonicalToRemove.parentNode && canonicalToRemove.getAttribute('href') === canonicalUrl) {
        try {
          canonicalToRemove.remove()
        } catch (e) {
          // Element zaten kaldırılmış olabilir, hata yok say
        }
      }
    }
  }, [canonicalUrl])

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2')
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
      title: 'Günstige Preise finden',
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

  const costFactors = [
    {
      factor: "Wohnungsgrösse",
      description: "Die Anzahl der Zimmer und das Volumen des Umzugsguts bestimmen massgeblich den Preis. Ein 1.5-Zimmer-Umzug kostet deutlich weniger als ein 5-Zimmer-Umzug."
    },
    {
      factor: "Umzugsstrecke",
      description: "Die Distanz zwischen alter und neuer Wohnung beeinflusst die Kosten. Innerstädtische Umzüge sind günstiger als Umzüge über grössere Distanzen."
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
    { name: "Umzugsofferten Zürich", link: "/umzugsfirma-zuerich", title: "Zürich Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Basel", link: "/umzugsfirma-basel", title: "Basel Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Bern", link: "/umzugsfirma-bern", title: "Bern Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Genf", link: "/umzugsfirma-genf", title: "Genf Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Lausanne", link: "/umzugsfirma-lausanne", title: "Lausanne Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Luzern", link: "/umzugsfirma-luzern", title: "Luzern Umzugsofferten vergleichen" },
    { name: "Umzugsofferten St. Gallen", link: "/umzugsfirma-st-gallen", title: "St. Gallen Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Winterthur", link: "/umzugsfirma-winterthur", title: "Winterthur Umzugsofferten vergleichen" }
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
                  Kostenlose Umzugsofferten erhalten
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
                <Link href={location.link} title={location.title}>
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

      {/* FAQ Section - Lazy Loaded */}
      <UmzugsoffertenFAQSection faqItems={faqItems} />

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
                Bis zu 6 Offerten sichern
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Rich Content Section - Lazy Loaded */}
      <UmzugsoffertenSEORichContent />

      {/* Related Services Section - Lazy Loaded */}
      <UmzugsoffertenRelatedServices />
    </>
  )
}

export default UmzugsoffertenPageClient

