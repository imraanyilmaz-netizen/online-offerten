'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  ArrowRight, CheckCircle, Building2, Shield, TrendingDown, Clock, Users, Award,
  MessageSquare, ChevronRight, MapPin, Building, ShieldCheck, TrendingUp, Home,
  Globe, Box, Package, CheckCircle2
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
      id: 'lagerung',
      name: 'Lagerung',
      description: 'Möbel sicher einlagern',
      icon: Package,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-100',
      iconBgHover: 'bg-rose-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=lagerung'
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
      <div className="bg-white">
        {/* Hero Section - Like Umzugsfirma in der Nähe Page */}
        <section className="relative py-12 md:py-16 overflow-hidden bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 pt-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <BreadcrumbHomeLink />
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
                <h1 className="heading-1 mb-4">
                  <span className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 font-semibold text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    Geschäftsumzug Offerten vergleichen
                  </span>
                  <br />
                  Geschäftsumzug in der Schweiz | Vergleich von geprüften und zuverlässigen Unternehmen
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
                  Vergleichen Sie kostenlose Offerten von geprüften und zuverlässigen Unternehmen für Ihren Geschäftsumzug in der Schweiz. Stellen Sie Leistungen und Preise transparent gegenüber und wählen Sie den Anbieter, der am besten zu Ihrem Betrieb passt.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug">
                      Jetzt Offerten vergleichen
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
            
            <main className="space-y-8">
              {/* Service Selection Section - Like Privatumzug Page */}
              <section className="py-8 border-b border-gray-200">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column - Content */}
                  <div className="lg:col-span-8">
                    <p className="text-body leading-relaxed mb-6">
                      Ein <strong>Geschäftsumzug in der Schweiz</strong> erfordert einen umfassenderen und spezielleren Ansatz als
                      gewöhnliche Umzugsdienstleistungen. Geschäftsumzüge können die Zukunft von Unternehmen erheblich
                      beeinflussen.
                    </p>
                    <p className="text-body leading-relaxed mb-6">
                      Bei Büro-, Unternehmens- oder Geschäftsverlagerungen ist es notwendig, mit professionellen
                      Umzugsfirmen zusammenzuarbeiten, damit der Geschäftsbetrieb ohne Unterbrechung weiterlaufen kann.
                    </p>
                    <p className="text-body leading-relaxed mb-6">
                      Wenn Sie für einen Geschäftsumzug in der Schweiz nach einer professionellen Lösung suchen, sollten
                      Sie Unternehmen bevorzugen, die sowohl in der Planung als auch in der Umsetzung effektive
                      Lösungen anbieten.
                    </p>

                    <h2 className="heading-2 mb-4">
                      Wie hoch sind die Kosten für einen Geschäftsumzug in der Schweiz?
                    </h2>
                    <p className="text-body leading-relaxed mb-6">
                      Die Kosten für einen Geschäftsumzug in der Schweiz können variieren. Viele Faktoren wie Umfang,
                      Distanz und Komplexität des Umzugs beeinflussen den Preis. Durchschnittlich liegen die Preise
                      ungefähr in folgendem Bereich:
                    </p>
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Unternehmensgrösse</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-900">Betrag in CHF</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-200">
                            <td className="px-4 py-3 text-body">Kleine Büro-Umzüge</td>
                            <td className="px-4 py-3 text-body">ab etwa 2'000 CHF</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="px-4 py-3 text-body">Grosse Unternehmens- oder Büro-Umzüge</td>
                            <td className="px-4 py-3 text-body">10'000 CHF oder mehr</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="heading-3 mb-4">
                      Faktoren, die die Kosten eines Geschäftsumzugs in der Schweiz beeinflussen
                    </h3>
                    <p className="text-body leading-relaxed mb-4">
                      Es gibt verschiedene Faktoren, die die Kosten eines Geschäftsumzugs in der Schweiz beeinflussen.
                      Der Umfang der Dienstleistung, die Entfernung sowie die Art des Transports spielen eine wichtige
                      Rolle.
                    </p>
                    <ul className="space-y-2 text-body mb-6 list-disc pl-6">
                      <li>Volumen der Gegenstände</li>
                      <li>Entfernung zwischen den Standorten</li>
                      <li>Spezielle Transportanforderungen für Maschinen oder schwere Geräte</li>
                      <li>Verpackungsservice</li>
                      <li>Möbelmontage</li>
                      <li>Temporäre Lagerung</li>
                    </ul>
                    <p className="text-body leading-relaxed mb-6">
                      Um die besten und günstigsten Preise zu finden, ist es sinnvoll, Angebote von mehreren
                      Umzugsfirmen einzuholen. Durch einen detaillierten Vergleich können Sie den für Sie passendsten
                      Service auswählen.
                    </p>

                    <h2 className="heading-2 mb-4">
                      Wie findet man das richtige Umzugsunternehmen für einen Geschäftsumzug in der Schweiz?
                    </h2>
                    <p className="text-body leading-relaxed mb-6">
                      Bevor Sie einen Geschäftsumzug in der Schweiz durchführen, sollten Sie eine gründliche Recherche
                      durchführen. Um das richtige Umzugsunternehmen zu finden, sollten Sie mit mehreren Firmen
                      sprechen und Angebote einholen.
                    </p>
                    <p className="text-body leading-relaxed mb-6">
                      Wenn Sie ein Umzugsunternehmen für Ihren Geschäftsumzug suchen, sollten Sie Firmen bevorzugen,
                      die sich in Ihrer Region auskennen und Ihnen die besten Lösungen anbieten können.
                    </p>
                    <p className="text-body leading-relaxed mb-6">
                      Ein lokales Umzugsunternehmen kennt die Besonderheiten der Region und sorgt für einen schnellen
                      und effizienten Ablauf. Unsere Plattform bietet Ihnen dabei folgende Vorteile:
                    </p>
                    <ul className="space-y-2 text-body mb-6 list-disc pl-6">
                      <li>Sie finden schnell und einfach zuverlässige Umzugsunternehmen in Ihrer Nähe.</li>
                      <li>Sie beschreiben Ihren Bedarf einmal und erhalten passende Offerten.</li>
                      <li>Sie vergleichen Bewertungen, Versicherungsumfang und Erfahrung im Geschäftsumzug.</li>
                    </ul>
                    <p className="text-body leading-relaxed mb-6">
                      Professionelle Umzugsunternehmen bieten oft eine kostenlose Beratung, um eine präzise Offerte zu
                      erstellen. Über unsere Plattform können Sie viele professionelle Umzugsfirmen erreichen.
                    </p>

                    <h2 className="heading-2 mb-4">
                      Vergleich professioneller Unternehmen für Geschäftsumzüge in der Schweiz
                    </h2>
                    <p className="text-body leading-relaxed mb-6">
                      Für einen Geschäftsumzug in der Schweiz möchten viele Unternehmen verschiedene Anbieter
                      vergleichen – und das ist eine sehr sinnvolle Entscheidung.
                    </p>
                    <p className="text-body leading-relaxed mb-6">
                      Durch Offerten verschiedener Umzugsfirmen erhalten Sie eine bessere Übersicht und können einen
                      detaillierten Vergleich durchführen. Gleichzeitig können Sie durch Preisvergleiche bis zu 40 %
                      Kosten sparen.
                    </p>
                    <p className="text-body leading-relaxed mb-4">
                      Bei dringenden Umzügen können Sie zusätzlich nach Unternehmen suchen, die folgende Leistungen
                      anbieten:
                    </p>
                    <ul className="space-y-2 text-body list-disc pl-6">
                      <li>Wochenend-Umzüge</li>
                      <li>Möbellifte oder Aussenaufzüge</li>
                      <li>Zusätzliche Serviceleistungen</li>
                    </ul>
                    <p className="text-body leading-relaxed mt-6">
                      Beim Vergleich von Umzugsunternehmen sollten Sie nicht nur auf den Preis achten, sondern auch auf
                      Referenzen, Versicherungsschutz und Erfahrung im Bereich Geschäftsumzüge.
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
                  <h3 className="heading-3">Offerten & Planung für Ihren Firmenumzug: Umzugspreise vergleichen</h3>
                  <p className="text-gray-700 mb-6 text-lg">Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Ihren Büroumzug oder Firmenumzug. Profitieren Sie von transparenten Preisen und wählen Sie das passende Angebot für Ihr Unternehmen.</p>
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

              {/* FAQ Section */}
              <section className="py-12 md:py-16 bg-white border-t border-gray-200 mt-6">
                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                  <div className="md:col-span-3">
                    <div className="mb-8">
                      <h2 className="heading-2">Häufig gestellte Fragen (FAQ)</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Was kostet ein Büroumzug?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Die Kosten für einen Büroumzug hängen von Umfang, Distanz und Aufwand ab. Ein kleiner Büroumzug kann ab 2.000 CHF beginnen, grössere Firmenumzüge kosten oft 10.000 CHF oder mehr. Holen Sie kostenlose Offerten ein, um die besten Preise zu vergleichen.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Wie finde ich die richtige Firma für meinen Firmenumzug?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Vergleichen Sie Angebote regionaler Umzugsfirmen in Ihrer Nähe für einen professionellen Firmenumzug. Über unsere Plattform erhalten Sie schnell passende Offerten von geprüften Partnern. Achten Sie auf Versicherungen, positive Bewertungen und Spezialisierung auf Geschäftsumzüge.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Wie lange dauert ein Geschäftsumzug?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Die Dauer hängt von der Unternehmensgrösse und dem Umfang ab. Kleinere Büros können an einem Wochenende umziehen, grössere Unternehmen benötigen mehrere Tage. Eine genaue Zeitplanung erfolgt nach einer Vor-Ort-Besichtigung.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Was übernehmen professionelle Umzugsfirmen?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Professionelle Umzugsfirmen übernehmen die komplette Planung, Demontage und Montage von Büromöbeln, den sicheren Transport von IT-Equipment, Verpackungsservice, Zwischenlagerung, Entsorgung von Altmobiliar und die Koordination mit Handwerkern am neuen Standort.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Was muss man bei einem Firmenumzug beachten?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Bei einem Firmenumzug müssen organisatorische, rechtliche und logistische Punkte
                          berücksichtigt werden. Dazu gehören ein klarer Zeitplan, die Koordination mit Mitarbeitenden,
                          die Beauftragung einer professionellen Umzugsfirma sowie die frühzeitige Planung von IT,
                          Telefonie und Internet am neuen Standort.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-6" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Wie teuer ist eine Umzugsfirma in der Schweiz?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Die Kosten hängen von Grösse, Distanz, Personalaufwand und Zusatzleistungen ab. Für kleine
                          Umzüge starten die Preise oft im unteren vierstelligen Bereich, grössere Firmenumzüge können
                          deutlich höher ausfallen. Ein Vergleich mehrerer Offerten sorgt für bessere Transparenz.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-7" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Was muss ich beachten, wenn ich in die Schweiz ziehe?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Bei einem Umzug in die Schweiz sind je nach Situation Zoll- und Meldepflichten zu beachten.
                          Wichtig sind unter anderem eine vollständige Inventarliste, die Anmeldung bei der Gemeinde
                          sowie die rechtzeitige Klärung von Aufenthalts- und Arbeitsfragen.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-8" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Wie viel kostet eine Umzugsfirma pro Tag?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Die Tageskosten richten sich nach Teamgrösse, Fahrzeug und gewünschtem Leistungsumfang.
                          Benötigen Sie Zusatzleistungen wie Verpackung, Möbellift oder Spezialtransporte, steigen die
                          Kosten entsprechend.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-9" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Welche Fehler werden häufig beim Umzug gemacht?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Häufige Fehler sind zu kurzfristige Planung, fehlendes Ausmisten, unklare Zuständigkeiten und
                          unzureichende Beschriftung von Kartons. Eine strukturierte Vorbereitung verhindert
                          Verzögerungen und unnötige Zusatzkosten.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-10" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">In welchem Alter ist ein Umzug am schwierigsten?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Ein <Link href="/umzugsfirma" className="text-green-700 hover:underline">Umzug</Link> kann in jeder Lebensphase herausfordernd sein. Gleichzeitig kann ein <Link href="/umzugsfirma" className="text-green-700 hover:underline">Umzug</Link> für Familien mit Kindern die Umstellung im Alltag erschweren, während für ältere Menschen die körperliche Belastung häufig höher ist. Eine gute Planung hilft in allen Fällen.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-11" className="border-b border-gray-200 last:border-b-0">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Wie entscheidet man, ob man umziehen sollte oder nicht?</h4>
                        </AccordionTrigger>
                        <AccordionContent className="text-body leading-relaxed">
                          Die Entscheidung sollte auf Faktoren wie Kosten, Infrastruktur, beruflichen Chancen,
                          Erreichbarkeit und langfristigen Zielen basieren. Ein strukturierter Vergleich der Vor- und
                          Nachteile hilft bei einer sicheren Entscheidung.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="relative md:col-span-2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                      <img
                        src="/fotos/offerten.webp"
                        alt="Geschäftsumzug FAQ – Antworten rund um Kosten, Planung und Ablauf"
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                      <p className="text-sm font-bold">Fragen & Antworten</p>
                      <p className="text-xs text-blue-100">Rund um Geschäftsumzüge</p>
                    </div>
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



