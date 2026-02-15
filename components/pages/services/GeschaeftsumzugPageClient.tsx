'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { 
  ArrowRight, CheckCircle, Building2, Shield, TrendingDown, Clock, Users, Award,
  MessageSquare, ChevronRight, MapPin, Search, Calculator, Building, ShieldCheck, TrendingUp, Home,
  Globe, Box, ArrowUpDown, CheckCircle2
} from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'

const GeschaeftsumzugPageClient = () => {
  const router = useRouter()
  const [selectedService, setSelectedService] = React.useState<string | null>('geschaeftsumzug');

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
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport'
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

  // SEO Data (moved to server component, but kept for schema generation if needed client-side)
  const metaTitle = "Geschäftsumzug: Kostenlose Offerten vergleichen"
  const metaDescription = "Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen. Schnell, transparent und regional."
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = "/umzugsfirma/geschaeftsumzug"

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug')
  }

  const stats = [
    { icon: Building2, value: '500+', label: 'Erfolgreiche Umzüge' },
    { icon: Users, value: '98%', label: 'Zufriedene Kunden' },
    { icon: Clock, value: '< 24h', label: 'Schnelle Antwort' },
    { icon: Award, value: '4.8/5', label: 'Durchschnittliche Bewertung' },
  ]

  const benefits = [
    { icon: CheckCircle, text: "Bis zu 40% sparen" },
    { icon: Shield, text: "Nur geprüfte Firmen" },
    { icon: TrendingDown, text: "100% kostenlos & unverbindlich" },
  ]

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section - Like Umzugsfirma in der Nähe Page */}
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
                <li className="text-gray-900 font-medium" aria-current="page">
                  Geschäftsumzug
                </li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 font-semibold text-sm mb-6">
                  <MapPin className="h-4 w-4 mr-2" />
                  Geschäftsumzug Offerten vergleichen
                </div>
                <h1 className="heading-1 mb-4">
                  Geschäftsumzug in der Schweiz » Geprüfte Partner vergleichen
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
                  Erhalten Sie in nur 5 Minuten bis zu 5 kostenlose Offerten von geprüften Umzugsunternehmen. Vergleichen Sie Preise und Leistungen und sparen Sie bis zu 40% bei Ihrem Geschäftsumzug.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug">
                      <Search className="mr-2 h-5 w-5" />
                      Jetzt Umzugsunternehmen vergleichen
                    </Link>
                  </Button>
                  <Button
                    onClick={() => router.push('/umzugsfirma/umzugskosten')}
                    variant="outline"
                    size="lg"
                    className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 text-lg px-8 py-6"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Kosten berechnen
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
                      <Building className="h-12 w-12 text-green-600" />
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
        
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="w-full">
            
            <main 
              className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-8"
            >
              {/* Service Selection Section - Like Privatumzug Page */}
              <section className="py-8 border-b border-gray-200">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column - Content */}
                  <div className="lg:col-span-8">
                    <p className="text-body leading-relaxed mb-6">
                      Ein Geschäftsumzug ist mehr als nur der Transport von Möbeln – es ist ein strategisches Projekt, das die Zukunft Ihres Unternehmens massgeblich beeinflussen kann. Ob Büroumzug, Firmenumzug oder Unternehmensumzug: Professionelle Planung und Durchführung sind entscheidend, um Betriebsunterbrechungen zu minimieren und einen reibungslosen Übergang zu gewährleisten. Wir unterstützen Sie beim Firmenumzug in Zürich, Bern, Basel, Luzern und der ganzen Schweiz mit geprüften regionalen Umzugsfirmen in Ihrer Nähe.
                    </p>
                    
                    <h2 className="heading-2 mb-4">
                      Geschäftsumzug – Professionelle Lösungen für Unternehmen
                    </h2>
                    <p className="text-body leading-relaxed mb-6">
                      Ein Geschäftsumzug erfordert präzise Planung und professionelle Durchführung, um Ausfallzeiten zu minimieren und einen nahtlosen Übergang zu gewährleisten. Unsere spezialisierten Partnerfirmen verstehen die Komplexität von Firmenumzügen und bieten massgeschneiderte Lösungen für Unternehmen jeder Grösse. Von der detaillierten Inventarisierung über den sicheren Transport von Büromöbeln und IT-Equipment bis hin zur termingerechten Einrichtung am neuen Standort – wir koordinieren jeden Schritt Ihres Geschäftsumzugs sorgfältig.
                    </p>
                    
                    <h2 className="heading-2 mb-4">
                      Geschäftsumzug – Was kostet ein Firmenumzug?
                    </h2>
                    <p className="text-body leading-relaxed mb-6">
                      Die Kosten für einen Geschäftsumzug variieren stark je nach Umfang, Distanz und Aufwand. Ein kleiner Büroumzug kann bereits ab 2.000 CHF beginnen, während grössere Firmenumzüge schnell 10.000 CHF oder mehr kosten können. Die wichtigsten Faktoren sind das Volumen des Umzugsguts, die Entfernung zwischen den Standorten, der Bedarf an Spezialtransporten für IT-Equipment oder schwere Maschinen sowie zusätzliche Dienstleistungen wie Verpackung, Möbelmontage oder Zwischenlagerung. Um die besten Preise zu finden, sollten Sie mehrere Offerten von geprüften Umzugsfirmen vergleichen. Durch einen detaillierten Vergleich können Sie bis zu 40% der Kosten sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                    </p>
                    
                    <h2 className="heading-2 mb-4">
                      Büroumzug in der Nähe – So finden Sie die richtige Umzugsfirma
                    </h2>
                    <p className="text-body leading-relaxed mb-6">
                      Bei der Suche nach einer Umzugsfirma für Ihren Büroumzug ist es wichtig, regionale Umzugsfirmen in Ihrer Nähe zu bevorzugen, die die örtlichen Gegebenheiten kennen. Eine lokale Umzugsfirma kennt sich mit Parkregelungen, Zufahrtsbeschränkungen und den Besonderheiten Ihrer Region aus. Über unsere Plattform können Sie schnell und einfach geprüfte Umzugsfirmen in Ihrer Nähe finden. Beschreiben Sie Ihren Bedarf einmal und erhalten Sie passende Offerten von qualifizierten Partnern. Achten Sie bei der Auswahl auf Versicherungen, positive Kundenbewertungen und eine Spezialisierung auf Geschäftsumzüge. Ein professionelles Unternehmen bietet immer eine kostenlose Vor-Ort-Besichtigung an, um eine genaue Offerte zu erstellen.
                    </p>
                    
                    <h2 className="heading-2 mb-4">
                      Firmenumzug planen – Checkliste für Unternehmen
                    </h2>
                    <p className="text-body leading-relaxed mb-6">
                      Ein erfolgreicher Firmenumzug erfordert sorgfältige Planung. Beginnen Sie mindestens 3-6 Monate vor dem Umzugstermin mit der strategischen Planung. Wichtige Schritte umfassen die Bildung eines Projektteams, die Erstellung eines detaillierten Budgets und die Definition der Anforderungen an den neuen Standort. 2-3 Monate vor dem Umzug sollten Sie eine professionelle Umzugsfirma beauftragen, die Mitarbeiterkommunikation starten und den IT-Umzug im Detail planen. In den letzten Wochen vor dem Umzug geht es um praktische Vorbereitungen wie Ausmisten, Beschriftungssysteme und Adressänderungen. Am Umzugstag selbst ist eine gute Koordination entscheidend, und nach dem Umzug sollten Sie die technische Funktionalität sicherstellen.
                    </p>
                    
                    <h2 className="heading-2 mb-4">
                      Umzugsfirmen vergleichen – Warum Offerten wichtig sind
                    </h2>
                    <p className="text-body leading-relaxed">
                      Ein detaillierter Vergleich von Offerten verschiedener Umzugsfirmen ist unerlässlich, um das beste Preis-Leistungs-Verhältnis zu finden. Durch den Vergleich können Sie nicht nur bis zu 40% der Kosten sparen, sondern auch sicherstellen, dass alle wichtigen Leistungen abgedeckt sind. Achten Sie dabei auf transparente Kostenvoranschläge, die alle Leistungen klar auflisten. Fragen Sie gezielt nach möglichen Zusatzkosten für Parkgenehmigungen, Aussenaufzüge oder Wochenendzuschläge. Ein seriöses Unternehmen wird alle Kosten transparent kommunizieren. Vergleichen Sie nicht nur die Preise, sondern auch Versicherungen, Referenzen und die Erfahrung mit Geschäftsumzügen. <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug" className="text-green-600 hover:text-green-700 font-semibold underline">👉 Jetzt Firmenumzug-Offerten vergleichen (100% kostenlos)</Link>
                    </p>
                  </div>
                  
                  {/* Right Column - Service Selection */}
                  <div className="lg:col-span-4">
                    <div className="sticky top-24">
                      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                          <h3 className="text-xl font-bold text-white">
                            Geschäftsumzug
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


              {/* CTA in Middle */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-8 text-center">
                  <h3 className="heading-3">👉 Jetzt Firmenumzug-Offerten vergleichen (100% kostenlos)</h3>
                  <p className="text-gray-700 mb-6 text-lg">Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Ihren Büroumzug oder Firmenumzug. Bis zu 40% sparen, schnell und unverbindlich.</p>
                  <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </section>

              {/* Cities Section */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
                  <p className="text-base font-medium">Wir unterstützen Sie beim Firmenumzug in Zürich, Bern, Basel, Luzern und der ganzen Schweiz.</p>
                </div>
              </section>

              {/* H2 Section 5 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="heading-2">
                  Wie lange dauert ein Geschäftsumzug?
                </h2>
                <div className="text-body leading-relaxed text-lg space-y-4">
                  <p>
                    Die Dauer eines Geschäftsumzugs hängt von verschiedenen Faktoren ab: der Grösse des Unternehmens, der Menge des zu transportierenden Inventars und der Entfernung zwischen den Standorten. Kleinere Büros können oft an einem Wochenende umziehen, während grössere Unternehmen mehrere Tage oder sogar Wochen benötigen können. Ein typischer Büroumzug für ein mittelgrosses Unternehmen dauert in der Regel 1-3 Tage. Die genaue Zeitplanung wird nach einer Vor-Ort-Besichtigung durch die Umzugsfirma erstellt. Wichtig ist, dass Sie ausreichend Zeit für die Planung einplanen, um Betriebsunterbrechungen zu minimieren und einen reibungslosen Ablauf zu gewährleisten.
                  </p>
                </div>
              </section>

              {/* H2 Section 6 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="heading-2">
                  Tipps für einen erfolgreichen Büro- und Firmenumzug
                </h2>
                <div className="text-body leading-relaxed text-lg space-y-4">
                  <p>
                    Für einen erfolgreichen Büroumzug oder Firmenumzug gibt es einige wichtige Tipps zu beachten. Planen Sie frühzeitig und beginnen Sie mindestens 3-6 Monate vor dem Umzugstermin. Bilden Sie ein internes Projektteam und klären Sie Verantwortlichkeiten. Nutzen Sie die Gelegenheit zum Ausmisten und Entrümpeln, um Umzugskosten zu sparen. Entwickeln Sie ein klares Beschriftungssystem für Kartons und Möbel. Planen Sie den IT-Umzug besonders sorgfältig, da dies das Herzstück der meisten Unternehmen ist. Kommunizieren Sie transparent mit Ihren Mitarbeitern über den bevorstehenden Umzug. Und schliesslich: Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen, um das beste Preis-Leistungs-Verhältnis zu finden.
                  </p>
                </div>
              </section>


              {/* FAQ Section */}
              <section className="pt-8 border-t-2 border-gray-300">
                <h3 className="heading-3">Häufig gestellte Fragen zum Geschäftsumzug</h3>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="heading-4">Was kostet ein Büroumzug?</h4>
                    <p className="text-body leading-relaxed text-base">
                      Die Kosten für einen Büroumzug hängen von Umfang, Distanz und Aufwand ab. Ein kleiner Büroumzug kann ab 2.000 CHF beginnen, grössere Firmenumzüge kosten oft 10.000 CHF oder mehr. Holen Sie kostenlose Offerten ein, um die besten Preise zu vergleichen.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="heading-4">Wie finde ich die richtige Firma für meinen Firmenumzug?</h4>
                    <p className="text-body leading-relaxed text-base">
                      Vergleichen Sie Angebote regionaler Umzugsfirmen in Ihrer Nähe für einen professionellen Firmenumzug. Über unsere Plattform erhalten Sie schnell passende Offerten von geprüften Partnern. Achten Sie auf Versicherungen, positive Bewertungen und Spezialisierung auf Geschäftsumzüge.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="heading-4">Wie lange dauert ein Geschäftsumzug?</h4>
                    <p className="text-body leading-relaxed text-base">
                      Die Dauer hängt von der Unternehmensgrösse und dem Umfang ab. Kleinere Büros können an einem Wochenende umziehen, grössere Unternehmen benötigen mehrere Tage. Eine genaue Zeitplanung erfolgt nach einer Vor-Ort-Besichtigung.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="heading-4">Was übernehmen professionelle Umzugsfirmen?</h4>
                    <p className="text-body leading-relaxed text-base">
                      Professionelle Umzugsfirmen übernehmen die komplette Planung, Demontage und Montage von Büromöbeln, den sicheren Transport von IT-Equipment, Verpackungsservice, Zwischenlagerung, Entsorgung von Altmobiliar und die Koordination mit Handwerkern am neuen Standort.
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeschaeftsumzugPageClient



