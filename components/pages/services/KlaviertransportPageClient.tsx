'use client'

import React from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, AlertTriangle, Shield, Users, HelpCircle, Star, Package, MapPin, Clock, Calculator, Sparkles, BookOpen, ChevronRight, Search, ShieldCheck, TrendingUp, Building, Home, Globe, Box, ArrowUpDown, CheckCircle2 } from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'

const Hero = ({ quoteUrl }: { quoteUrl: string }) => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
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
            <li>
              <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">
                Umzugsfirma
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/umzugsfirma/spezialtransporte" className="hover:text-green-600 transition-colors">
                Spezialtransporte
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-gray-900 font-medium" aria-current="page">
              Klaviertransport
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 font-semibold text-sm mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              Klaviertransport leicht gemacht!
            </div>
            <h1 className="heading-1 mb-4">
              Klaviertransport in der Schweiz » Geprüfte Partner vergleichen
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              Erhalten Sie in nur 5 Minuten bis zu 5 kostenlose Offerten von geprüften Spezialisten für Klaviertransport. Vergleichen Sie Preise und Leistungen und sparen Sie bis zu 40% bei Ihrem Klaviertransport.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                <Link href={`${quoteUrl}?service=umzug&step=2&umzugArt=spezialtransport&special_transport_type=klaviertransport`}>
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt Klaviertransport vergleichen
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 text-lg px-8 py-6"
              >
                <Link href="/umzugsfirma/spezialtransporte/klaviertransport/kosten">
                <Calculator className="mr-2 h-5 w-5" />
                Kosten berechnen
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-700">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>Versicherte Firmen</span>
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
          <div className="relative md:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <PiPianoKeysFill className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h3 className="heading-3 text-center mb-6">
                Finden Sie Ihre Umzugsfirma
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Qualifizierte Anbieter</p>
                    <p className="text-sm text-gray-600">Finden Sie qualifizierte Anbieter direkt in Ihrer Region</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">100% kostenlos & unverbindlich</p>
                    <p className="text-sm text-gray-600">Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Transparente Preise</p>
                    <p className="text-sm text-gray-600">Durch den Vergleich mehrerer lokaler Umzugsfirmen finden Sie die besten Preise</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Versicherte Partner</p>
                    <p className="text-sm text-gray-600">Alle Partnerfirmen sind versichert und verfügen über positive Bewertungen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ContentSection = ({ sectionData }: { sectionData: any }) => {
  const icons: Record<string, React.ReactNode> = {
    why: <AlertTriangle className="w-8 h-8 text-green-600" />,
    process: <Users className="w-8 h-8 text-green-600" />,
    costs: <Calculator className="w-8 h-8 text-green-600" />,
    types: <PiPianoKeysFill className="w-8 h-8 text-green-600" />,
    services: <Package className="w-8 h-8 text-green-600" />,
    distance: <MapPin className="w-8 h-8 text-green-600" />,
    insurance: <Shield className="w-8 h-8 text-green-600" />,
    checklist: <CheckCircle className="w-8 h-8 text-green-600" />,
  }

  const bgColors: Record<string, string> = {
    why: "bg-white",
    process: "bg-gray-50",
    costs: "bg-white",
    types: "bg-gray-50",
    services: "bg-white",
    distance: "bg-gray-50",
    insurance: "bg-white",
    checklist: "bg-gray-50",
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className={`py-16 md:py-20 ${bgColors[sectionData.key] || 'bg-white'}`}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="text-left mb-6">
          <h2 className="heading-2">{sectionData.title}</h2>
          {sectionData.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              {sectionData.subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <div className="space-y-6 text-body leading-relaxed text-base md:text-lg">
            {sectionData.paragraphs.map((p: string, i: number) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} className="mb-4" />
            ))}
          </div>

          {/* Points Grid */}
          {sectionData.points && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                {sectionData.points.map((point: any, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{point.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

const FaqSection = ({ faqData }: { faqData: any }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-left mb-12">
          <h2 className="heading-2">{faqData.title}</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">{faqData.subtitle}</p>
        </div>
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6 md:p-8">
        <Accordion type="single" collapsible className="w-full">
          {faqData.questions.map((item: any, index: number) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-b border-gray-200 last:border-0 px-4 py-2"
                >
                  <AccordionTrigger className="font-semibold text-left hover:no-underline py-4 text-gray-900">
                <h4 className="faq-question text-left">{item.q}</h4>
              </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <p className="text-body leading-relaxed">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}


const Cta = ({ quoteUrl }: { quoteUrl: string }) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7 }}
    className="bg-gradient-to-r from-green-600 to-green-800"
  >
    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20 text-center text-white">
      <Star className="w-16 h-16 text-white/50 mx-auto mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Kostenlose Offerten für Klaviertransport Zürich anfordern</h2>
      <p className="text-lg md:text-xl text-green-200 max-w-3xl mx-auto mb-8">
        Erhalten Sie kostenlos und unverbindlich Offerten von geprüften Spezialisten aus Ihrer Region. Vergleichen Sie Preise und Leistungen und finden Sie den perfekten Partner für den Transport Ihres wertvollen Instruments. Bis zu 40% sparen!
      </p>
      <Button
        asChild
        size="lg"
        className="bg-white text-green-700 hover:bg-green-50 group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Link href={`${quoteUrl}?service=umzug&special=klaviertransport`}>
          Jetzt kostenlose Offerten anfordern
          <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </Button>
    </div>
  </motion.section>
)

const KlaviertransportPageClient = () => {
  const router = useRouter()
  const [selectedService, setSelectedService] = React.useState<string | null>('spezialtransport');
  const canonicalUrl = "/umzugsfirma/spezialtransporte/klaviertransport"
  const quoteUrl = "/kostenlose-offerte-anfordern"
  const heroImageUrl = "https://online-offerten.ch/bilder/klaviertransport.avif"

  // Service selection data
  const serviceOptions = [
    { 
      id: 'privatumzug',
      name: 'Privatumzug',
      description: 'Wohnung, Haus, WG',
      icon: Home,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      iconBgHover: 'bg-blue-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug'
    },
    { 
      id: 'geschaeftsumzug',
      name: 'Geschäftsumzug',
      description: 'Büro, Ladenlokal',
      icon: Building,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      iconBgHover: 'bg-purple-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug'
    },
    { 
      id: 'international',
      name: 'Internationaler Umzug',
      description: 'Umzüge ins Ausland',
      icon: Globe,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      iconBgHover: 'bg-emerald-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international'
    },
    { 
      id: 'spezialtransport',
      name: 'Spezialtransport',
      description: 'Klavier, Tresor, Kunst',
      icon: PiPianoKeysFill,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      iconBgHover: 'bg-amber-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&special_transport_type=klaviertransport'
    },
    { 
      id: 'kleintransport',
      name: 'Kleintransport',
      description: 'Einzelne Möbel',
      icon: Box,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      iconBgHover: 'bg-indigo-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=kleintransport'
    },
    { 
      id: 'moebellift',
      name: 'Möbellift mieten',
      description: 'Bis 400 kg, max. 27m',
      icon: ArrowUpDown,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-100',
      iconBgHover: 'bg-rose-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=moebellift'
    }
  ];

  const selectedServiceData = serviceOptions.find(s => s.id === selectedService);

  const whyData = {
    key: "why",
    title: "Warum ein professioneller Klaviertransport unerlässlich ist",
    subtitle: "",
    paragraphs: [
      "Ein Klavier auf eigene Faust zu transportieren ist nicht nur riskant, sondern kann auch zu irreparablen Schäden am Instrument und zu Verletzungen führen. Für viele Menschen ist das Klavier ein Instrument, das ihnen besonders am Herzen liegt und mit dem sie emotionale Erinnerungen verbinden. Ein Spezialtransport ist keine Luxus, sondern eine Notwendigkeit. Musik und die Leidenschaft für hochwertige Musikinstrumente wie Klaviere und Flügel verdienen einen besonders sorgfältigen Umgang beim Transport.",
      "Ein Klavier oder Flügel ist ein komplexes Meisterwerk aus Holz, Metall und filigraner Mechanik. Sein hohes Gewicht (oft zwischen 200 und 500 kg, bei Konzertflügeln sogar bis zu 1000 kg) und seine sperrige Form machen den Transport zu einer extremen Herausforderung. Laienhafte Versuche, ein solches Instrument zu bewegen, enden oft mit kostspieligen Schäden am Klavier selbst, an Treppenhäusern, Böden oder Türrahmen. Noch schlimmer sind die gesundheitlichen Risiken: Falsches Heben kann zu schweren Rückenverletzungen führen.",
      "Professionelle Klaviertransportfirmen verfügen nicht nur über die nötige Muskelkraft, sondern vor allem über das Fachwissen, die Erfahrung und die spezielle Ausrüstung. Sie kennen die kritischen Punkte eines jeden Instruments und wissen, wie man es sicher verpackt, anhebt und transportiert. Der Einsatz von Tragegurten, Klavierrollern, Schutzdecken und bei Bedarf sogar einem Kran gehört zum Standard, um auch schwer zugängliche Orte sicher zu erreichen. Bei besonders schwierigen Zugängen kann das Klavier zudem über ein Dach transportiert werden, um Schäden am Instrument und am Gebäude zu vermeiden. Zudem ist Ihr wertvolles Instrument während des gesamten Transports versichert. Vergleichen Sie mehrere Spezialisten, um die beste Firma zu finden. Egal ob Transport in Zürich, Flügeltransport in Bern oder Piano-Transport in Basel – ein professioneller Zügelservice mit Klavier-Erfahrung ist daher die klügste und sicherste Wahl."
    ],
    points: [
      {
        title: "Spezialausrüstung",
        description: "Einsatz von Tragegurten, Klavier-Rollwagen, Rampen, Schutzmaterialien und bei Bedarf auch einem Kran, um Schäden zu vermeiden."
      },
      {
        title: "Erfahrenes Personal",
        description: "Geschulte Teams, die die Statik und die empfindlichen Teile eines Klaviers kennen und sicher handhaben können. Unser qualifiziertes Team sorgt mit Erfahrung und Sorgfalt für einen reibungslosen und sicheren Klaviertransport."
      },
      {
        title: "Umfassender Versicherungsschutz",
        description: "Ihr Instrument ist gegen alle Eventualitäten während des Transports versichert – für Ihre vollkommene Sorgenfreiheit."
      },
      {
        title: "Effizienz und Zeitersparnis",
        description: "Profis erledigen den Transport schnell und sicher, während Sie sich auf andere Aspekte Ihres Umzugs konzentrieren können."
      }
    ]
  }

  const processData = {
    key: "process",
    title: "Professioneller Ablauf beim Klaviertransport",
    subtitle: "Ein reibungsloser Transport folgt einem bewährten und sorgfältig geplanten Prozess. Vom ersten Kontakt bis zum Aufstellen am neuen Standort – so arbeiten unsere Profis.",
    paragraphs: [
      "Ein erfolgreicher Klaviertransport (auch Flügeltransport oder Piano transportieren genannt) beginnt lange vor dem eigentlichen Tragen. Alles startet mit einer detaillierten Planung. Unsere Partnerfirmen werden Sie nach den Details fragen: Art des Instruments (Klavier, Flügel), Grösse, Gewicht, sowie die Gegebenheiten am Abhol- und Zielort. Für die Angebotserstellung und eine reibungslose Organisation ist die genaue Adresse von Abhol- und Zielort unerlässlich. Gibt es enge Treppenhäuser, viele Stufen oder andere Hindernisse? Diese Informationen sind entscheidend für die Wahl der richtigen Ausrüstung und der Teamgrösse. Wir bieten individuelle Lösungen für jede Transportsituation, um auf Ihre speziellen Anforderungen optimal einzugehen.",
      "Am Transporttag selbst wird das Instrument zuerst professionell für den Transport vorbereitet. Bewegliche Teile wie der Deckel und die Tastenklappe werden gesichert. Anschliessend wird das Klavier sorgfältig in spezielle Schutzdecken und Folien eingepackt, um es vor Kratzern und Stössen zu schützen. Beim Transport selbst kommen spezielle Tragegurte zum Einsatz, die das Gewicht gleichmässig verteilen und eine kontrollierte Bewegung ermöglichen. Auf ebenen Flächen wird ein Klavierroller verwendet. Nach dem sicheren Verladen im gepolsterten Transportfahrzeug wird das Instrument am Zielort wieder entladen und an der von Ihnen gewünschten Stelle platziert. Die Lieferung des Instruments an den gewünschten Ort ist ein zentraler Bestandteil unseres Service. Dieser gesamte Vorgang ist ein Paradebeispiel für den professionellen Transport empfindlicher Güter."
    ]
  }

  const costsData = {
    key: "costs",
    title: "Was kostet ein Klaviertransport?",
    subtitle: "Die Kosten für einen Klaviertransport sind so individuell wie das Instrument selbst. Hier erfahren Sie, welche Faktoren den Preis beeinflussen und mit welchen Richtwerten Sie rechnen können.",
    paragraphs: [
      "Ein Klavierumzug wird sowohl innerhalb einer Stadt als auch schweizweit angeboten, wobei professionelle Anbieter massgeschneiderte und sichere Lösungen für den Transport Ihres Klaviers oder Flügels bieten. Die Frage nach den <a href=\"/umzugsfirma/spezialtransporte/klaviertransport/kosten\" class=\"text-green-600 hover:text-green-800 font-semibold underline\">Kosten</a> für einen Klaviertransport lässt sich nicht pauschal beantworten. Der Preis hängt von einer Vielzahl von Faktoren ab. Der wichtigste Faktor ist die Art und das Gewicht des Instruments. Ein kleineres Klavier (Pianino) ist günstiger zu transportieren als ein schwerer Konzertflügel. Die Distanz zwischen Abhol- und Zielort spielt ebenfalls eine grosse Rolle.",
      "Je nach Stadt und Region in der Schweiz können die Preise für einen Klavierumzug variieren, da lokale Gegebenheiten und unterschiedliche Anfahrtswege berücksichtigt werden müssen. Besonders ins Gewicht fallen die örtlichen Gegebenheiten. Muss das Klavier über mehrere Stockwerke getragen werden? Gibt es einen Aufzug, der gross genug ist? Enge oder gewundene Treppenhäuser erhöhen den Aufwand und damit die Kosten erheblich. In manchen Fällen kann sogar der Einsatz eines Möbellifts oder Krans notwendig werden, was den Preis weiter beeinflusst. Ein Möbeltransport mit Klavier ist daher immer ein Fall für eine individuelle Offerte. Um genaue Preise zu erhalten, ist es unerlässlich, mehrere Spezialisten zu vergleichen, die auf den Transport von Klavieren spezialisiert sind. Vergleichen Sie mehrere Offerten von verschiedenen Firmen, um das beste Preis-Leistungs-Verhältnis für Ihren Spezialtransport zu finden und bis zu 40% zu sparen."
    ],
    points: [
      {
        title: "Art und Gewicht des Instruments",
        description: "Ein Flügeltransport ist aufwändiger und teurer als der Transport eines Pianos."
      },
      {
        title: "Transportdistanz",
        description: "Die Entfernung zwischen dem alten und neuen Standort."
      },
      {
        title: "Etagen und Treppen",
        description: "Die Anzahl der Stockwerke, die überwunden werden müssen, ist ein wesentlicher Kostenfaktor."
      },
      {
        title: "Zugänglichkeit",
        description: "Enge Gänge, Türen oder die Notwendigkeit eines Aussenlifts können den Preis beeinflussen."
      },
      {
        title: "Zusatzleistungen",
        description: "Einlagerung oder die Entsorgung eines alten Instruments."
      }
    ]
  }

  const typesData = {
    key: "types",
    title: "Transport für jeden Klaviertyp",
    subtitle: "Ob Pianino, Flügel oder Cembalo – jedes Tasteninstrument hat seine eigenen Anforderungen an den Transport. Unsere Spezialisten kennen sie alle und setzen moderne Spezialfahrzeuge ein, um jedes Instrument sicher und schonend zu befördern.",
    paragraphs: [
      "Nicht jedes Klavier ist gleich. Die Transportmethoden und Transportmöglichkeiten müssen an den spezifischen Typ des Instruments und die jeweiligen Gegebenheiten angepasst werden. Ein aufrecht stehendes Klavier (Pianino) ist die häufigste Art. Obwohl es kompakter ist, erfordert sein hohes Gewicht und sein hoher Schwerpunkt grosse Sorgfalt, insbesondere in schwierigen Situationen wie engen Treppenhäusern.",
      "Ein Flügel ist die Königsklasse im Musikinstrumente transportieren und stellt eine besondere Spezialität unserer Partnerfirmen dar. Für den Transport müssen zunächst die Füsse und die Pedale (die Lyra) demontiert werden. Der Korpus wird dann hochkant auf ein spezielles Klavierbrett (auch Transportschlitten genannt) gestellt, sicher verzurrt und dick eingepackt. Dieser Vorgang erfordert grosses Fachwissen, um die empfindliche Mechanik und die polierte Oberfläche nicht zu beschädigen. Bei besonders wertvollen oder restaurierungsbedürftigen Instrumenten arbeiten wir eng mit erfahrenen Klavierbauern zusammen, um höchste Qualität und Werterhalt zu gewährleisten. Auch andere Tasteninstrumente wie Cembali, Orgeln oder E-Pianos benötigen eine fachgerechte Behandlung. In besonderen Situationen, etwa bei sehr engen Zugängen oder empfindlichen Böden, sind spezielle Lösungen und besondere Sorgfalt gefragt. Unabhängig vom Typ Ihres Instruments stellen unsere Partner sicher, dass es sicher und unversehrt an seinem neuen Platz ankommt."
    ]
  }

  const servicesData = {
    key: "services",
    title: "Spezialisierte Dienstleistungen beim Klaviertransport",
    subtitle: "",
    paragraphs: [
      "Ein Klaviertransport ist weit mehr als nur das Bewegen eines schweren Gegenstands – er erfordert spezialisierte Dienstleistungen, die auf die besonderen Anforderungen von Klavieren, Flügeln und Pianos zugeschnitten sind. Eine erfahrene Klaviertransportfirma bietet individuelle Lösungen, die exakt auf Ihr Instrument und den gewünschten Zielort abgestimmt sind. Von der ersten Kontaktaufnahme bis zur sicheren Ankunft am Bestimmungsort profitieren Sie von einer professionellen Planung, die alle Details des Transports berücksichtigt.",
      "Die Auswahl der passenden Transportmittel, wie speziell ausgestattete Fahrzeuge und moderne Gurtsysteme, ist dabei ebenso wichtig wie die fachgerechte Handhabung durch geschulte Experten. Dank der engen Zusammenarbeit mit erfahrenen Spezialisten und dem Einsatz von Hilfsmitteln, die eigens für den Transport von Klavieren entwickelt wurden, wird Ihr Instrument optimal geschützt und sicher befördert. Ob Sie einen Flügel, ein Piano oder ein anderes Musikinstrument transportieren möchten – die Klaviertransportfirma stellt sicher, dass jedes Angebot individuell auf Ihre Situation zugeschnitten ist.",
      "Ein besonderer Service ist die kostenlose und unverbindliche Offerte, die Ihnen eine transparente Übersicht über die geplanten Dienstleistungen und die zu erwartenden Kosten bietet. So erhalten Sie ein massgeschneidertes Angebot, das alle Aspekte des Transports abdeckt – von der Organisation über die Durchführung bis hin zur Ankunft am Zielort. Vertrauen Sie auf die Kompetenz und Erfahrung einer spezialisierten Firma, um Ihr wertvolles Instrument sicher und stressfrei an seinen neuen Platz zu bringen."
    ]
  }

  const distanceData = {
    key: "distance",
    title: "Distanz und Stockwerke: Herausforderungen beim Klaviertransport",
    subtitle: "",
    paragraphs: [
      "Die Distanz zwischen Ausgangsort und Zielort sowie die Anzahl der zu überwindenden Stockwerke stellen beim Transport von Klavieren oft eine besondere Herausforderung dar. Je weiter der Transportweg und je mehr Etagen zu bewältigen sind, desto komplexer wird der gesamte Ablauf. Eine professionelle Klaviertransportfirma analysiert diese Faktoren im Vorfeld genau, um einen reibungslosen und sicheren Transport zu gewährleisten.",
      "Mit Hilfe von Spezialfahrzeugen, modernen Liftsystemen und erfahrenen Teams werden auch schwierige Transportwege souverän gemeistert. Ob Ihr Klavier in ein Dachgeschoss transportiert werden muss oder mehrere Stockwerke zu überwinden sind – die Firma plant den Ablauf präzise und setzt die passenden Hilfsmittel ein, um Ihr Instrument ohne Schäden an den Zielort zu bringen. Dabei werden alle Transportwege sorgfältig geprüft und die besten Lösungen für Ihre individuelle Situation gefunden.",
      "Ein weiterer Vorteil: Sie erhalten bereits im Vorfeld eine transparente Kostenschätzung, die alle relevanten Faktoren wie Distanz, Stockwerke und besondere Anforderungen berücksichtigt. So wissen Sie genau, mit welchen Kosten Sie rechnen können und erleben beim Klaviertransport keine bösen Überraschungen. Die enge Abstimmung mit der Klaviertransportfirma sorgt dafür, dass Ihr Instrument sicher, effizient und termingerecht ankommt – ganz gleich, wie anspruchsvoll die Transportwege auch sein mögen."
    ]
  }

  const insuranceData = {
    key: "insurance",
    title: "Versicherung und Haftung beim Klaviertransport",
    subtitle: "",
    paragraphs: [
      "Beim Transport von Klavieren, Flügeln und anderen Musikinstrumenten steht die Sicherheit Ihres wertvollen Instruments an erster Stelle. Die Klaviertransportfirma in Zürich bietet deshalb eine umfassende Versicherung, die speziell auf den Transport von Klavieren zugeschnitten ist. Diese Versicherung schützt Sie zuverlässig vor unerwarteten Kosten, falls es beim Transport zu Schäden am Instrument kommen sollte. So können Sie sich entspannt zurücklehnen, während Ihr Klavier in erfahrenen Händen ist.",
      "Die Haftung ist ein zentrales Thema, das die Klaviertransportfirma mit höchster Sorgfalt behandelt. Dank langjähriger Erfahrung und fundiertem Know-how im Umgang mit empfindlichen Musikinstrumenten werden alle Transportwege und -möglichkeiten im Vorfeld genau geplant. Die Experten der Firma setzen moderne Hilfsmittel und bewährte Systeme ein, um das Risiko von Schäden auf ein Minimum zu reduzieren. Jedes Teammitglied ist speziell geschult, um den sicheren und schonenden Umgang mit Klavieren und Flügeln zu gewährleisten – vom Start bis zum Zielort.",
      "Wenn Sie eine Offerte für den Klaviertransport wünschen, können Sie diese ganz einfach per E-Mail oder über das praktische Formular auf der Website anfordern. In Ihrer Anfrage geben Sie die wichtigsten Informationen zu Ihrem Instrument, dem gewünschten Transportweg und dem Zielort an. Die Klaviertransportfirma erstellt daraufhin eine transparente Offerte, in der alle Kosten, Transportmöglichkeiten und eingesetzten Hilfsmittel klar aufgeführt sind. So erhalten Sie einen vollständigen Überblick und können sicher sein, dass Ihr Instrument in besten Händen ist.",
      "Die Zusammenarbeit mit erfahrenen Experten und die umfassende Versicherung machen die Klaviertransportfirma in Zürich zu einem verlässlichen Partner für den Transport von Klavieren und Flügeln. Vertrauen Sie auf Qualität, Kompetenz und einen professionellen Service, der Ihr Instrument sicher an seinen neuen Bestimmungsort bringt."
    ]
  }

  const checklistData = {
    key: "checklist",
    title: "Checkliste für einen reibungslosen Klaviertransport",
    subtitle: "Eine gute Vorbereitung ist der Schlüssel zum Erfolg. Mit dieser Checkliste stellen Sie sicher, dass am Transporttag alles glattläuft.",
    paragraphs: [
      "Damit Ihr Zügelservice mit Klavier reibungslos verläuft, können Sie einige wichtige Vorbereitungen treffen. Eine gute Planung und Kommunikation mit der Transportfirma kann viele potenzielle Probleme von vornherein vermeiden."
    ],
    points: [
      {
        title: "Genaue Angaben machen",
        description: "Informieren Sie die Umzugsfirma exakt über Klaviertyp, Masse, Gewicht und die Gegebenheiten vor Ort (Etagen, enge Stellen)."
      },
      {
        title: "Transportwege freimachen",
        description: "Sorgen Sie dafür, dass der Weg vom alten Standort zum Fahrzeug und vom Fahrzeug zum neuen Standort frei von Hindernissen ist."
      },
      {
        title: "Böden schützen",
        description: "Auch wenn die Profis Schutzmaterial mitbringen, kann es sinnvoll sein, empfindliche Böden zusätzlich mit Abdeckvlies zu schützen."
      },
      {
        title: "Fotos machen",
        description: "Dokumentieren Sie den Zustand Ihres Klaviers vor dem Transport. Dies ist nützlich für den unwahrscheinlichen Fall eines Schadens."
      },
      {
        title: "Sichere Lagerung bei Bedarf",
        description: "Falls eine Zwischenlagerung notwendig ist, fragen Sie nach der Möglichkeit, Ihr Instrument in einem spezialisierten Lager unterzubringen. Achten Sie darauf, dass optimale Lagerungsbedingungen wie konstante Temperatur und Luftfeuchtigkeit gewährleistet sind, um den Werterhalt Ihres Klaviers zu sichern."
      },
      {
        title: "Nach dem Transport",
        description: "Lassen Sie das Klavier nach dem Transport 2-3 Wochen am neuen Standort akklimatisieren, bevor Sie es stimmen lassen."
      },
      {
        title: "Kundendienst nutzen",
        description: "Bei Fragen oder für Serviceleistungen nach dem Transport steht Ihnen der Kundendienst der Transportfirma zur Verfügung."
      }
    ]
  }

  const faqData = {
    title: "Häufig gestellte Fragen",
        subtitle: "Hier finden Sie Antworten auf die wichtigsten Fragen rund um den Transport von Klavieren und Flügeln.",
    questions: [
      {
        q: "Wie viel kostet ein Klaviertransport in der Schweiz?",
        a: "Die Kosten variieren stark je nach Instrumententyp (Klavier, Flügel), Gewicht, Distanz, Stockwerken und Zugänglichkeit. Ein kleineres Klavier ist günstiger als ein Konzertflügel. Die Preise liegen oft ab etwa 380 CHF, können aber je nach Aufwand höher sein. Für genaue Preise empfiehlt sich eine individuelle Offerte von spezialisierten Firmen."
      },
      {
        q: "Wie lange dauert der Transport eines Klaviers?",
        a: "Die Dauer hängt von der Entfernung, den Zugangsbedingungen und der Vorbereitung ab. Ein gut geplanter Transport innerhalb einer Stadt kann meist an einem Tag erledigt werden. Bei weiteren Strecken oder komplexen Situationen kann es länger dauern."
      },
      {
        q: "Wie erhalte ich ein Angebot?",
        a: "Sie können ein kostenloses und unverbindliches Angebot per E-Mail anfordern, meist über ein Online-Formular, in dem Sie Details zu Ihrem Instrument und den Transportbedingungen angeben."
      },
      {
        q: "Gibt es versteckte Kosten beim Klaviertransport?",
        a: "Seriöse Anbieter arbeiten mit Festpreisen und transparenter Kostendarstellung, sodass keine versteckten Kosten entstehen. Zusatzleistungen wie Einlagerung oder Demontage können separat berechnet werden, werden aber im Angebot klar ausgewiesen."
      },
      {
        q: "Welche Versicherungen bieten Sie für den Klaviertransport an?",
        a: "Professionelle Klaviertransporte sind umfassend gegen Schäden versichert, sodass Ihr Instrument während des gesamten Transports geschützt ist."
      },
      {
        q: "Wie bereiten Sie ein Klavier für den Transport vor?",
        a: "Das Instrument wird fachgerecht gesichert, bewegliche Teile wie Deckel und Tastenklappe werden fixiert, und es wird mit Schutzdecken und Folien vor Kratzern und Stossen geschützt. Bei Flügeln werden oft Füsse und Pedale demontiert."
      },
      {
        q: "Transportieren Sie auch Konzertflügel oder andere grosse Instrumente?",
        a: "Ja, der Transport von Konzertflügeln ist eine Spezialität vieler Klaviertransportfirmen. Auch andere Tasteninstrumente wie Cembali oder Digitalpianos werden fachgerecht transportiert."
      },
      {
        q: "Was ist der Unterschied zwischen einem normalen Umzug und einem Klaviertransport?",
        a: "Ein Klaviertransport erfordert spezielles Know-how, Ausrüstung und Erfahrung, da Klaviere sehr empfindlich und schwer sind. Normale Umzugsfirmen verfügen oft nicht über die nötigen Mittel und Kenntnisse, um Schäden zu vermeiden."
      },
      {
        q: "Wie läuft ein Klaviertransport Zürich ab?",
        a: "Beim Klaviertransport Zürich setzen wir auf erfahrene Spezialisten, die Ihr Instrument sicher und professionell an den gewünschten Ort bringen. Dabei wird nichts dem Zufall überlassen – von der Planung bis zur fachgerechten Sicherung Ihres Klaviers."
      },
      {
        q: "Sind Sie auf der Suche nach einer zuverlässigen Klaviertransportfirma?",
        a: "Unsere Experten unterstützen Sie gerne bei Ihrer Suche nach dem passenden Partner für Ihren Klaviertransport und stehen Ihnen mit massgeschneiderten Lösungen zur Seite."
      }
    ]
  }

  const metaTitle = "Klaviertransport: Kostenlose Offerten vergleichen"
  const metaDescription = "Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr. Professionell versichert, bis zu 40% sparen!"

  return (
    <>
      <div className="bg-white">
        <Hero quoteUrl={quoteUrl} />
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="w-full">
            <main className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-8">
              {/* Service Selection Section - Like Geschäftsumzug Page */}
              <section className="py-8 border-b border-gray-200">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column - Content */}
                  <div className="lg:col-span-8">
                    {/* Hero Image - Above "Warum ein professioneller Klaviertransport unerlässlich ist" */}
                    <div className="mb-12">
                      <img
                        src="https://online-offerten.ch/bilder/klaviertransport.avif"
                        alt="Professioneller Klaviertransport in der Schweiz - Kostenlose Offerten vergleichen"
                        className="w-full h-auto object-cover rounded-2xl shadow-lg"
                        loading="eager"
                        width="1200"
                        height="600"
                      />
                    </div>
                    <ContentSection sectionData={whyData} />
                    <ContentSection sectionData={processData} />
                    <ContentSection sectionData={costsData} />
                    <ContentSection sectionData={typesData} />
                    <ContentSection sectionData={servicesData} />
                    <ContentSection sectionData={distanceData} />
                    <ContentSection sectionData={insuranceData} />
                    <ContentSection sectionData={checklistData} />
                  </div>
                  
                  {/* Right Column - Service Selection */}
                  <div className="lg:col-span-4">
                    <div className="sticky top-24">
                      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                          <h3 className="text-xl font-bold text-white">
                            Spezialtransport
                          </h3>
                          <p className="text-sm text-green-50 mt-1">
                            Wählen Sie Ihre Dienstleistung
                          </p>
                        </div>
                        
                        {/* Services List */}
                        <div className="p-4 space-y-3">
                          {serviceOptions.map((service) => {
                            const Icon = service.icon
                            const isSelected = selectedService === service.id
                            
                            return (
                              <button
                                key={service.id}
                                onClick={() => setSelectedService(service.id)}
                                className={`
                                  w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                                  ${isSelected 
                                    ? 'border-green-500 bg-green-50 shadow-md' 
                                    : 'border-gray-100 hover:border-green-400 hover:bg-green-50'
                                  }
                                `}
                              >
                                <div className={`
                                  w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                                  ${isSelected 
                                    ? `${service.iconBgHover}` 
                                    : `${service.iconBg}`
                                  }
                                `}>
                                  <Icon className={`
                                    w-5 h-5 transition-colors
                                    ${isSelected ? 'text-white' : service.iconColor}
                                  `} />
                                </div>
                                <div className="flex-1 text-left">
                                  <p className={`
                                    font-semibold transition-colors
                                    ${isSelected ? 'text-green-600' : 'text-gray-900'}
                                  `}>
                                    {service.name}
                                  </p>
                                  <p className="text-xs text-gray-600">{service.description}</p>
                                </div>
                                {isSelected && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                                {!isSelected && (
                                  <ArrowRight className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                            )
                          })}
                        </div>
                        
                        {/* CTA Button */}
                        {selectedService && selectedServiceData && (
                          <div className="px-4 pb-4 transition-all duration-300">
                            <Button 
                              asChild
                              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                              <Link href={selectedServiceData.url}>
                                Jetzt kostenlose Offerten anfordern
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
        <FaqSection faqData={faqData} />
        <Cta quoteUrl={quoteUrl} />
      </div>
    </>
  )
}

export default KlaviertransportPageClient
