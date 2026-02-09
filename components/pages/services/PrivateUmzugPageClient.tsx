'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowRight, CheckCircle, PackagePlus, ClipboardList, Users, ShieldCheck, 
  Wrench, HeartHandshake, MapPin, Home, Star, HelpCircle, Info, Calculator,
  Building, Globe, Sparkles, Trash2, Brush as PaintBrush, Box,
  TrendingUp, FileText, Search, Mail, CheckCircle2, ChevronRight, ArrowUpDown
} from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';
import dynamic from 'next/dynamic';

// Lazy load components for better performance
const PricingTable = dynamic(() => import('@/components/SEO/PricingTable'));
const HowItWorks = dynamic(() => import('@/components/SEO/HowItWorks'));
const WhyChooseUs = dynamic(() => import('@/components/SEO/WhyChooseUs'));

const PrivateUmzugPageClient = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = React.useState<string | null>('privatumzug');
  const imageUrl = '/image/umzugsservice-Schweiz/privatumzug-offerten-kostenlos-vergleichen.png';

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

  // SEO Data
  const metaTitle = "Privatumzug Offerten kostenlos vergleichen » Bis zu 40% sparen";
  const metaDescription = "Privatumzug Offerten kostenlos vergleichen ✓ Geprüfte Umzugsfirmen für Wohnungsumzug & Hausumzug. Sicher, stressfrei & bis zu 40% sparen. Jetzt vergleichen!";
  const canonicalUrl = "https://online-offerten.ch/umzugsfirma/privatumzug";
  const ogImageUrl = "https://online-offerten.ch/image/umzugsservice-Schweiz/privatumzug-offerten-kostenlos-vergleichen.png";

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug');
  };

  // Services for Sidebar
  const services = [
    { name: 'Privatumzug', icon: Home, path: '/umzugsfirma/privatumzug', active: true },
    { name: 'Geschäftsumzug', icon: Building, path: '/umzugsfirma/geschaeftsumzug' },
    { name: 'Internationale Umzüge', icon: Globe, path: '/umzugsfirma/internationale-umzuege' },
    { name: 'Spezialtransporte', icon: Box, path: '/umzugsfirma/spezialtransporte' },
    { name: 'Klaviertransport', icon: PiPianoKeysFill, path: '/umzugsfirma/spezialtransporte/klaviertransport' },
    { name: 'Reinigung', icon: Sparkles, path: '/reinigung' },
    { name: 'Räumung & Entsorgung', icon: Trash2, path: '/raeumung-entsorgung' },
    { name: 'Malerarbeiten', icon: PaintBrush, path: '/malerarbeitenkosten' },
  ];

  // Cost Table Data
  const costTableData = [
    { size: "1.5 - 2.5 Zimmer", cost: "600 - 1.200 CHF" },
    { size: "3.5 Zimmer", cost: "1.100 - 1.800 CHF" },
    { size: "4.5 Zimmer", cost: "1.600 - 2.500 CHF" },
    { size: "5.5+ Zimmer", cost: "Ab 2.200 CHF" }
  ];

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
                  Privatumzug
                </li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 font-semibold text-sm mb-6">
                  <MapPin className="h-4 w-4 mr-2" />
                  Privatumzug leicht gemacht!
                </div>
                <div className="heading-1 mb-4" role="presentation">
                  Privatumzug in der Schweiz » Geprüfte Partner vergleichen
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
                  Erhalten Sie in nur 5 Minuten bis zu 5 kostenlose Offerten von geprüften Umzugsunternehmen. Vergleichen Sie Preise und Leistungen und sparen Sie bis zu 40% bei Ihrem Umzug.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug">
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
                      <Home className="h-12 w-12 text-green-600" />
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
              {/* Service Selection Section - Like Zürich Page */}
              <section className="py-8 border-b border-gray-200">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column - Content */}
                  <div className="lg:col-span-8">
                    <h2 className="heading-2 mb-6">
                      Privatumzug in Zürich, Bern, Basel & ganze Schweiz
                    </h2>
                    <div className="text-body mb-8 leading-relaxed space-y-4">
                      <p>
                        Ein Privatumzug ist mehr als nur der Transport von Möbeln von A nach B – er betrifft das ganze Leben einer Familie. Ob Sie in <Link href="/umzugsfirma-in-der-naehe/zuerich" className="text-green-600 hover:text-green-700 font-semibold underline">Zürich</Link>, <Link href="/umzugsfirma-in-der-naehe/bern" className="text-green-600 hover:text-green-700 font-semibold underline">Bern</Link>, <Link href="/umzugsfirma-in-der-naehe/basel" className="text-green-600 hover:text-green-700 font-semibold underline">Basel</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau" className="text-green-600 hover:text-green-700 font-semibold underline">Aargau</Link>, <Link href="/umzugsfirma-in-der-naehe/luzern" className="text-green-600 hover:text-green-700 font-semibold underline">Luzern</Link> oder <Link href="/umzugsfirma-in-der-naehe/st-gallen" className="text-green-600 hover:text-green-700 font-semibold underline">St. Gallen</Link> wohnen: Die Wohnungsabgabe, neue Kita- oder Schulwege, veränderte Arbeitswege und die gesamte Organisation rund um den Wohnungswechsel erfordern eine frühzeitige Planung. Gerade in der Schweiz konzentrieren sich viele Privatumzüge auf bestimmte Stichtage - Ende März, Ende Juni und Ende September sind typische Mietzinswechsel-Termine, an denen die Nachfrage nach Umzugsfirmen besonders hoch ist.
                      </p>
                      <p>
                        Genau hier setzt Online-Offerten.ch an: Als digitale Plattform ermöglicht sie es Ihnen, Ihren geplanten Umzug unkompliziert zu beschreiben und anschliessend mehrere Offerten von geprüften <Link href="/umzugsfirma-in-der-naehe" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsfirmen aus Ihrer Region</Link> zu erhalten. Sie entscheiden selbst, welches Unternehmen am besten zu Ihrem Bedarf passt – ob im Raum Zürichsee, Limmattal, der Agglomeration Bern oder anderswo in der Schweiz.
                      </p>
                      <p>
                        Alle Offerten sind kostenlos und unverbindlich. Das bedeutet: Sie gehen kein Risiko ein und behalten die volle Kontrolle über Ihre Entscheidung. Die Partner von Online-Offerten.ch sind regionale Spezialisten, die auf Privatumzüge spezialisiert sind und wissen, worauf es bei einem reibungslosen Wohnungswechsel ankommt.
                      </p>
                    </div>
                    
                    {/* Image - Below Text */}
                    <Image
                      src="/image/15ea36f2-ae78-403b-9348-4ec683047a94.webp"
                      alt="Ein Umzugswagen steht vor einem typischen Schweizer Mehrfamilienhaus, während Umzugskartons auf dem Gehweg gestapelt sind. Diese Szene zeigt den Beginn eines Privatumzugs, bei dem Möbel und Hausrat sorgfältig transportiert werden."
                      width={800}
                      height={450}
                      className="w-full h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Right Column - Service Selection */}
                  <div className="lg:col-span-4">
                    <div className="sticky top-24">
                      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                          <h3 className="text-xl font-bold text-white">
                            Privatumzug
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

              {/* So funktioniert Section */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  So funktioniert der Privatumzug mit Online-Offerten.ch
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  In wenigen Minuten gelangen Sie über Online-Offerten.ch zu passenden Umzugsfirmen in der Schweiz. Der gesamte Prozess ist so gestaltet, dass Sie mit minimalem Aufwand maximale Transparenz erhalten.
                </p>
                <h3 className="heading-3">
                  Schritt für Schritt zur passenden Umzugsfirma
                </h3>
                <div className="space-y-8 mb-6">
                  {/* Step 1 */}
                  <div className="relative flex gap-6">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg relative z-10">
                        <div className="text-white font-bold text-2xl">1</div>
                      </div>
                      <div className="w-0.5 h-full bg-gradient-to-b from-green-300 to-green-100 mt-4 flex-grow min-h-[80px]"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="bg-white border-2 border-green-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h4 className="heading-4 mb-3">Online-Formular ausfüllen</h4>
                        <p className="text-body leading-relaxed">
                          Geben Sie Ihre alte und neue Adresse ein, Etage, ob ein Lift vorhanden ist, Ihr Wunschdatum, den Umfang in Zimmern sowie besondere Güter wie Klavier, Aquarium oder schwere Gerätschaften.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex gap-6">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg relative z-10">
                        <div className="text-white font-bold text-2xl">2</div>
                      </div>
                      <div className="w-0.5 h-full bg-gradient-to-b from-green-300 to-green-100 mt-4 flex-grow min-h-[80px]"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="bg-white border-2 border-green-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h4 className="heading-4 mb-3">Anfrage wird geprüft</h4>
                        <p className="text-body leading-relaxed">
                          Online-Offerten.ch prüft Ihre Anfrage und leitet sie an passende, regionale Umzugsfirmen weiter – beispielsweise aus Zürich, Winterthur, Baden, Thun oder Chur.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex gap-6">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg relative z-10">
                        <div className="text-white font-bold text-2xl">3</div>
                      </div>
                      <div className="w-0.5 h-full bg-gradient-to-b from-green-300 to-green-100 mt-4 flex-grow min-h-[80px]"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="bg-white border-2 border-green-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h4 className="heading-4 mb-3">Offerten erhalten</h4>
                        <p className="text-body leading-relaxed">
                          Innerhalb von 24–48 Stunden erhalten Sie mehrere Angebote per E-Mail oder Telefon, inklusive detaillierter Leistungsbeschreibung.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex gap-6">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg relative z-10">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white border-2 border-green-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h4 className="heading-4 mb-3">Vergleichen und entscheiden</h4>
                        <p className="text-body leading-relaxed">
                          Prüfen Sie die Offerten in Ruhe: Preis, inkludierte Services (Transport, Verpackung, Montage, Reinigung), Erfahrung und Kundenbewertungen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-body leading-relaxed">
                  Es besteht kein Abschlusszwang. Wenn Ihnen ein Angebot zusagt, schliessen Sie den Auftrag direkt mit dem ausgewählten Unternehmen ab. Die Plattform übernimmt lediglich die Vermittlung – die Zusammenarbeit erfolgt direkt zwischen Ihnen und der Umzugsfirma Ihrer Wahl.
                </p>
              </section>

              {/* Article Section 2 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Welche Leistungen umfasst ein moderner Privatumzug?
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Schweizer Umzugsfirmen bieten heute weit mehr als den reinen Möbeltransport. Ein professioneller Umzugsservice kann den gesamten Prozess von A bis Z übernehmen und Ihnen so erheblichen Stress ersparen.
                </p>
                <p className="text-body leading-relaxed mb-3">Typische Leistungen, die in Offerten auftauchen können:</p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li><strong>Verpackungsservice</strong>: Das Team der Umzugsfirma verpackt Ihren gesamten Hausrat fachgerecht in Umzugskartons</li>
                  <li><strong>Bereitstellung von Verpackungsmaterial</strong>: Kartons, Kleiderboxen, Luftpolsterfolie, Decken</li>
                  <li><strong>Demontage und Montage</strong>: Aufbau und Abbau von Möbeln, Küchen, Lampen</li>
                  <li><strong>Möbellift</strong>: Für grosse Gegenstände oder bei engen Treppenhäusern</li>
                  <li><strong>Entsorgung</strong>: Alte Möbel und Haushaltsgegenstände werden fachgerecht entsorgt</li>
                  <li><strong>Zwischenlagerung</strong>: Lagerraum für Mobiliar, wenn der Einzugstermin später liegt</li>
                  <li><strong>Umzugsreinigung</strong>: Professionelle Räumung und Reinigung mit Abgabegarantie</li>
                </ul>
                  <p className="text-body leading-relaxed mb-4">
                  Viele Firmen in Zürich, Basel, Lausanne oder Genf bieten auch die Abgabereinigung Ihrer alten Wohnung an – oft mit Garantie, dass die Wohnungsabgabe reibungslos klappt.
                </p>
                <p className="text-body leading-relaxed mb-4">
                  Bei der Anfrage auf Online-Offerten.ch sollten Sie gezielt angeben, welche Leistungen Sie wünschen. So können die Anbieter passende Pakete kalkulieren – ob Sie nur den reinen Transport benötigen oder einen Full-Service-Umzug mit Auspackservice und allem Drum und Dran.
                  </p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-8">
                  <p className="text-body leading-relaxed"><strong>Tipp</strong>: Bei grösseren Wohnungen ab 3,5 Zimmern empfiehlt sich ein Besichtigungstermin (vor Ort oder per Video), damit die Offerte realistisch kalkuliert werden kann.</p>
                </div>
                
                <h3 className="heading-3">
                  Typische Zusatzservices beim Privatumzug
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <p className="text-body leading-relaxed mb-3">
                      Die Unterschiede zwischen einzelnen Offerten können erheblich sein, je nachdem welche Extras enthalten sind. Hier einige Beispiele für Zusatzservices, die Sie delegieren können:
                    </p>
                    <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                      <li><strong>Möbellift-Einsatz</strong>: Besonders bei Altbauten mit engen Treppenhäusern oder für den Transport schwerer Gegenstände wie Klaviere, Tresore oder Fitnessgeräte unverzichtbar</li>
                      <li><strong>Kleiderboxen</strong>: Kleidung kann direkt am Bügel transportiert werden – spart Zeit beim Ein- und Auspacken</li>
                      <li><strong>Ein- und Auspackservice</strong>: Profis übernehmen das komplette Auspacken und Einräumen am Zielort</li>
                      <li><strong>Parkplatzreservation</strong>: Einige Firmen organisieren Halteverbotszonen bei der Gemeinde (etwa Stadt Zürich oder Stadt Bern)</li>
                      <li><strong>Entsorgung über Recyclinghöfe</strong>: Alte Möbel werden über regionale Anlagen wie Hagenholz in Zürich oder Rhenus in Basel entsorgt</li>
                      <li><strong>Handwerkerleistungen</strong>: Anschluss von Waschmaschinen, Montage von Lampen oder Aufhängen von Bildern</li>
                    </ul>
                    <p className="text-body leading-relaxed">
                      Bei Online-Offerten.ch können Sie diese Optionen direkt in Ihrer Anfrage markieren. So erhalten Sie von den Umzugsfirmen passgenaue Angebote, die Ihre individuellen Bedürfnisse berücksichtigen.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/image/4e73e4b7-ab5b-4e20-9412-394b5b526cf0.webp"
                      alt="Professionelle Umzugshelfer tragen sorgfältig einen großen Schrank durch ein Treppenhaus, während sie sich um die Sicherheit der Möbel kümmern. Diese Umzugsfirma zeigt ihre Erfahrung und Qualität im Möbeltransport, um den Privatumzug stressfrei zu gestalten."
                      width={800}
                      height={450}
                      className="w-full h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </section>

              {/* Article Section 3 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Kosten eines Privatumzugs: Wovon der Preis in der Schweiz abhängt
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Die Kosten für einen Privatumzug variieren in der Schweiz stark – je nach Stadt, Distanz, Umfang und gewünschten Dienstleistungen. Genau deshalb ist der Vergleich mehrerer Offerten so wichtig: Nur so erhalten Sie ein realistisches Bild davon, was Ihr Umzug tatsächlich kosten wird.
                </p>
                
                <h3 className="heading-3">
                  Zentrale Preisfaktoren im Überblick
                </h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300 bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Faktor</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Einfluss auf den Preis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Wohnungsgrösse</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">2,5-Zimmer vs. 4,5-Zimmer – mehr Volumen bedeutet mehr Aufwand</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Stockwerk & Lift</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Ohne Lift im 4. Stock kostet mehr als Parterre mit Lift</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Distanz</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Umzug innerhalb von Zürich vs. Bern nach Basel</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Anzahl Mitarbeiter</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Je nach Umzugsvolumen 2–5 Umzugshelfer</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Fahrzeuggrösse</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Kleintransporter vs. grosser Umzugs-LKW</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Möbellift-Einsatz</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Zusätzliche Kosten, aber oft günstiger als stundenlanges Treppensteigen</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">Zusatzleistungen</td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Montage, Verpackung, Reinigung, Entsorgung</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-body leading-relaxed mb-3">
                  <strong>Timing ist Geld</strong>: Wochenend- oder Monatsend-Umzüge (30. Juni, 30. September) sind oft teurer als Termine unter der Woche in der Monatsmitte. Wenn Sie flexibel sind, können Sie bares Geld sparen.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                  <p className="text-body leading-relaxed"><strong>Empfehlung</strong>: Reichen Sie Ihre Anfrage möglichst 4–6 Wochen vor Ihrem Wunschtermin ein. So haben die Firmen noch gute Verfügbarkeit, und Sie erhalten bessere Preise.</p>
                </div>
                <p className="text-body leading-relaxed mb-4">
                  Online-Offerten.ch fördert Transparenz: Sie erhalten mehrere konkrete Preisangebote und sehen sofort, welche Leistungen im Pauschalpreis enthalten sind. Achten Sie beim Vergleich auch auf mögliche versteckte Zusatzkosten wie Kilometerentschädigung, Versicherungszuschläge oder Parkgebühren.
                </p>
                
                <h3 className="heading-3">
                  Beispiele für typische Umzugspreise
                </h3>
                <p className="text-body leading-relaxed mb-4">
                  Die folgenden Preisrahmen sind als grobe Orientierung zu verstehen – die tatsächlichen Kosten hängen von vielen Faktoren ab und können nur durch eine konkrete Offerte ermittelt werden.
                </p>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Beispiel 1: Kleiner Stadtumzug in Zürich</h4>
                    <ul className="space-y-1 text-gray-700 text-sm mb-2">
                      <li>• 2,5-Zimmer-Wohnung, Kreis 3 nach Kreis 6, ca. 10 km</li>
                      <li>• Lift in beiden Häusern vorhanden</li>
                      <li>• Nur Transport und Standardmontage</li>
                </ul>
                    <p className="text-green-700 font-semibold">Typischer Rahmen: CHF 800 – 1'400</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Beispiel 2: Kantonswechsel mit Full-Service</h4>
                    <ul className="space-y-1 text-gray-700 text-sm mb-2">
                      <li>• 4,5-Zimmer-Wohnung von Bern nach Luzern, ca. 100 km</li>
                      <li>• Inkl. Demontage, Montage und Möbellift an einem Standort</li>
                      <li>• Verpackung durch Kunden</li>
                    </ul>
                    <p className="text-green-700 font-semibold">Typischer Rahmen: CHF 2'500 – 4'500</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Beispiel 3: Budget-Umzug für Singles</h4>
                    <ul className="space-y-1 text-gray-700 text-sm mb-2">
                      <li>• 1–1,5-Zimmer-Wohnung innerhalb derselben Stadt</li>
                      <li>• Minimaler Service, nur Transport</li>
                    </ul>
                    <p className="text-green-700 font-semibold">Typischer Rahmen: CHF 400 – 800</p>
                  </div>
                </div>
                <p className="text-body leading-relaxed">
                  Diese Angaben sind Richtwerte. Für genaue Preise nutzen Sie das Anfrageformular auf Online-Offerten.ch und erhalten Sie verbindliche Offerten von Umzugsfirmen aus Ihrer Umgebung.
                </p>
              </section>

              {/* Article Section 4 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Privatumzug planen: Checkliste von der Kündigung bis zur Schlüsselübergabe
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Gute Planung reduziert Stress erheblich – besonders in Städten mit angespanntem Wohnungsmarkt wie Zürich, Genf oder Basel. Eine klare zeitliche Struktur hilft Ihnen, nichts Wichtiges zu vergessen.
                </p>
                
                <h3 className="heading-3">
                  Zeitlicher Ablauf für Ihren Umzug
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">2–3 Monate vor dem Umzug:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Mietvertrag kündigen unter Einhaltung der vertraglichen Fristen</li>
                      <li>Falls nötig: Nachmieter suchen</li>
                      <li>Neue Wohnung vertraglich sichern</li>
                      <li>Erste Anfrage auf Online-Offerten.ch stellen</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">4–6 Wochen vorher:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Offerten vergleichen und Umzugsfirma beauftragen</li>
                      <li>Adressänderungen vorbereiten: Einwohnerkontrolle, Postnachsendung, Versicherungen, Banken, Krankenkasse, Arbeitgeber, Schulen</li>
                      <li>Aussortieren und Entsorgung organisieren</li>
                      <li>Bei Bedarf Lagerung reservieren</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">1–2 Wochen vorher:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Verpackungsmaterial besorgen oder vom Umzugsunternehmen liefern lassen</li>
                      <li>Mit dem Packen beginnen</li>
                      <li>Parkplatzreservation für Umzugstag organisieren</li>
                      <li>Nachbarn informieren</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Umzugswoche:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Letzte Kartons packen</li>
                      <li>Kühlschrank abtauen</li>
                      <li>Wohnung reinigen oder Reinigungsfirma beauftragen</li>
                      <li>Zählerstände notieren</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Nach dem Umzug:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Anmeldung am neuen Ort (in den meisten Schweizer Gemeinden innerhalb von 14 Tagen Pflicht)</li>
                      <li>Wohnungsübergabe alte Wohnung mit Protokoll</li>
                      <li>Adressänderungen abschliessen</li>
                    </ul>
                  </div>
                </div>
                <p className="text-body leading-relaxed mb-4">
                  Viele Umzugsfirmen bieten eigene Checklisten an. Über Online-Offerten.ch können Sie Anbieter wählen, die bei der Planung aktiv mithelfen und Sie durch den gesamten Prozess begleiten.
                </p>
                
                <h3 className="heading-3">
                  Praktische Tipps für den Umzugstag
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <p className="text-body leading-relaxed mb-3">
                      Mit guter Vorbereitung verläuft der Umzugstag selbst deutlich entspannter. Hier einige bewährte Tipps aus der Praxis:
                    </p>
                    <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                      <li><strong>Wertsachen separat transportieren</strong>: Dokumente, Schmuck, Medikamente und wichtige Unterlagen gehören in eine Tasche, die Sie persönlich mitnehmen</li>
                      <li><strong>Parkplätze freihalten</strong>: Sorgen Sie dafür, dass der Umzugswagen direkt vor dem Haus stehen kann</li>
                      <li><strong>Nachbarn rechtzeitig informieren</strong>: Ein kurzer Hinweis verhindert Ärger wegen blockierter Zugänge oder Lärm</li>
                      <li><strong>Kinder und Haustiere organisieren</strong>: Bringen Sie sie während des eigentlichen Umzugs bei Freunden, Familie oder in einer Tagesbetreuung unter</li>
                      <li><strong>Kartons sinnvoll beschriften</strong>: Zimmer, Inhalt und Priorität notieren – das erleichtert das Einräumen am Zielort enorm</li>
                      <li><strong>Möbelplan erstellen</strong>: Ein einfacher Grundriss der neuen Wohnung hilft dem Team, alles gleich an den richtigen Ort zu stellen</li>
                    </ul>
                    <p className="text-body leading-relaxed">
                      Am Ende des Umzugs empfiehlt sich eine kurze Kontrolle gemeinsam mit der Umzugsfirma: Sind alle Gegenstände angekommen? Gibt es Schäden? Haben Sie in der alten Wohnung nichts vergessen? Notieren Sie die Zählerstände für Strom, Wasser und Gas.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/image/7946a949-0354-4f72-aff6-a406d89f84db.webp"
                      alt="Eine Familie mit Kindern steht in einer leeren Wohnung, umgeben von Umzugskartons, während sie sich auf ihren bevorstehenden Privatumzug vorbereitet. Die Atmosphäre ist geschäftig und voller Vorfreude auf das neue Zuhause, während die Eltern die Organisation und Planung des Umzugs koordinieren."
                      width={800}
                      height={450}
                      className="w-full h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </section>

              {/* Article Section 5 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Privatumzug innerhalb der Schweiz, ins Ausland oder aus dem Ausland
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Über Online-Offerten.ch können Sie nicht nur regionale Umzüge anfragen, sondern auch grössere Distanzen in der Schweiz sowie internationale Umzüge. Die Art des Umzugs bestimmt, worauf Sie besonders achten sollten.
                </p>
                
                <h3 className="heading-3">
                  Unterschiedliche Umzugstypen
                </h3>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Lokal-Umzug (z. B. innerhalb Zürich):</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Kurze Wege, oft innerhalb weniger Stunden abgeschlossen</li>
                      <li>Fokus auf Effizienz und reibungslose Durchführung</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Kantonswechsel (z. B. von Aargau nach Zug):</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Längere Fahrzeit, eventuell Verkehrsengpässe (Gotthard, Seelisberg)</li>
                      <li>Bei sehr langen Strecken: Möglicherweise Übernachtung des Teams nötig</li>
                      <li>Administrative Schritte: Abmeldung und Anmeldung in unterschiedlichen Kantonen</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Auslandsumzug (z. B. Schweiz–Deutschland, Schweiz–Frankreich):</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Zollbestimmungen beachten</li>
                      <li>Inventarlisten erstellen</li>
                      <li>Einfuhrbeschränkungen je nach Zielland prüfen (EU vs. Nicht-EU)</li>
                      <li>Spezielle Dokumentation für Eigentum und Hausrat</li>
                    </ul>
                  </div>
                </div>
                <p className="text-body leading-relaxed mb-4">
                  Auf Online-Offerten.ch finden Sie auch Umzugsfirmen mit Erfahrung in Zollabwicklung und internationalen Transporten. Bei komplexen Umzügen lohnt sich ein ausführliches Beratungsgespräch mit der gewählten Firma – fragen Sie gezielt nach Referenzen und Erfahrung mit Ihrem Zielort.
                  </p>
                
                <h3 className="heading-3">
                  Besondere Umzüge: Senioren, Familien, WG & Erstwohnung
                </h3>
                <p className="text-body leading-relaxed mb-3">
                  Nicht jeder Privatumzug ist gleich. Unterschiedliche Lebenssituationen bringen unterschiedliche Bedürfnisse mit sich.
                </p>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Seniorenumzug:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Entlastung beim Sortieren, Packen und Entsorgen</li>
                      <li>Behutsamer Umgang mit Erinnerungsstücken und persönlichem Eigentum</li>
                      <li>Koordination mit Heimen oder Altersresidenzen</li>
                      <li>Besondere Rücksicht auf körperliche Einschränkungen</li>
                    </ul>
                </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">Familienumzug:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Planung rund um Schulwechsel und Kita-Plätze</li>
                      <li>Arbeitswege beider Partner berücksichtigen</li>
                      <li>Ideale Umzugstermine: Schulferien (Sommer, Sport, Herbst)</li>
                      <li>Kinderzimmer als erstes einrichten für Normalität</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">WG-Umzug oder Erstwohnung:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside">
                      <li>Oft kleineres Budget</li>
                      <li>Weniger Möbel, dafür vielleicht schwierige Zugänge in Altbauwohnungen</li>
                      <li>Möglichkeit, Eigenleistung mit Profiservice zu kombinieren</li>
                      <li>Flexibilität bei Terminen nutzen</li>
                    </ul>
                  </div>
                </div>
                <p className="text-body leading-relaxed">
                  Bei Ihrer Anfrage auf Online-Offerten.ch können Sie diese Situation kurz beschreiben. So können die Anbieter gezielt auf Ihre Bedürfnisse eingehen und eine passende Lösung vorschlagen.
                </p>
              </section>

              {/* Article Section 6 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Warum Offerten für Ihren Privatumzug vergleichen? Ihre Vorteile mit Online-Offerten.ch
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  In der Schweiz gibt es zahlreiche Umzugsfirmen mit sehr unterschiedlichen Preis- und Leistungsstrukturen. Ohne Vergleich laufen Sie Gefahr, entweder zu viel zu bezahlen oder Leistungen zu buchen, die Sie gar nicht benötigen.
                </p>
                
                <h3 className="heading-3">
                  Die vier grossen Vorteile
                </h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300 bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Vorteil</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Was das für Sie bedeutet</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold"><strong>Zeitersparnis</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Statt jede Firma einzeln zu kontaktieren, stellen Sie einmal eine Anfrage und erhalten mehrere Angebote</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold"><strong>Kostenkontrolle</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Direkte Vergleichbarkeit der Preise und Leistungen, Identifikation von versteckten Zusatzkosten</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold"><strong>Qualität</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Anbieterprofile mit Kundenbewertungen, Referenzen und Spezialisierungen helfen bei der Auswahl</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold"><strong>Sicherheit</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-gray-700">Ausschliesslich professionelle Umzugsfirmen aus der Schweiz, keine anonymen Kleinanzeigen</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-body leading-relaxed mb-4">
                  Der Service von Online-Offerten.ch ist für private Umziehende vollständig kostenlos und unverbindlich. Sie profitieren von der Arbeit, die bereits geleistet wurde: Die Plattform hat geprüfte Partner aus der ganzen Schweiz, sodass Sie dank deren Erfahrung schnell zu seriösen Angeboten kommen.
                </p>
                
                <h3 className="heading-3">
                  So wählen Sie die passende Umzugsfirma aus Ihren Offerten
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <p className="text-body leading-relaxed mb-3">
                      Der günstigste Preis ist nicht immer der beste. Um die richtige Entscheidung zu treffen, sollten Sie die Offerten anhand von vier Kriterien prüfen:
                    </p>
                    <ol className="space-y-2 list-decimal list-inside mb-4 text-gray-700">
                      <li><strong>Preis</strong>: Wie ist das Verhältnis von Kosten zu Leistung?</li>
                      <li><strong>Leistungsumfang</strong>: Sind Möbellift, Verpackungsmaterial, Demontage/Montage, Reinigung explizit erwähnt?</li>
                      <li><strong>Versicherungsdeckung</strong>: Welche Transport- und Haftpflichtversicherung hat die Firma?</li>
                      <li><strong>Kundenbewertungen</strong>: Was sagen andere Kunden über Pünktlichkeit, Sorgfalt und Kommunikation?</li>
                    </ol>
                    <p className="text-body leading-relaxed mb-4">
                      Achten Sie auf klare Beschreibungen in der Offerte. Wenn etwas unklar ist, klären Sie offene Fragen vor der Auftragserteilung per Telefon oder E-Mail – etwa zu Parkplätzen, Zugang oder Spezialtransporten.
                    </p>
                    <p className="text-body leading-relaxed">
                      Am Ende sollten Sie sich für die Firma entscheiden, bei der Kommunikation, Transparenz und Ihr Bauchgefühl stimmen. Erfahrung zeigt: Ein guter erster Kontakt ist oft ein Zeichen für eine professionelle Zusammenarbeit. Online-Offerten.ch übernimmt nur die Kontaktanbahnung – der Vertrag wird direkt mit der Umzugsfirma Ihrer Wahl geschlossen.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/image/c6bed9bf-0e88-4eaf-b57f-0938374cdb53.webp"
                      alt="Ein lächelnder Umzugshelfer übergibt den Schlüssel an zufriedene Kunden, die vor ihrem neuen Zuhause stehen. Diese Szene symbolisiert den erfolgreichen Abschluss eines Privatumzugs, bei dem die Umzugsfirma ihre Dienstleistungen und die Qualität ihrer Arbeit unter Beweis stellt."
                      width={800}
                      height={450}
                      className="w-full h-auto rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </section>

              {/* Article Section 7 - CTA */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Jetzt Ihren Privatumzug online anfragen
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Planen Sie in den nächsten Wochen oder Monaten einen Umzug? Ob innerhalb Ihrer Stadt, in einen anderen Kanton oder sogar ins Ausland – der erste Schritt zu einem entspannten Umzug ist einfacher als gedacht.
                </p>
                <p className="text-body leading-relaxed">
                  Füllen Sie jetzt das Anfrageformular auf <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug" className="text-green-600 hover:underline font-semibold">Kostenlose Offerten anfordern</Link> aus und erhalten Sie schnell mehrere Offerten von Umzugsfirmen aus Ihrer Region. Der Service ist kostenlos, unverbindlich und bringt Ihnen innerhalb von 24–48 Stunden konkrete Angebote direkt in Ihr Postfach.
                </p>
                <p className="text-body leading-relaxed mt-4">
                  Vergleichen Sie in Ruhe, stellen Sie Fragen und entscheiden Sie sich für die Lösung, die am besten zu Ihrem Privatumzug passt. So starten Sie entspannt in Ihr neues Zuhause – mit Profis an Ihrer Seite, die wissen, worauf es ankommt.
                </p>
              </section>

              {/* Related Services Section */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="heading-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                    Weitere Services
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>
                      <Link href="/reinigung" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Umzugsreinigung mit Abnahmegarantie
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma/geschaeftsumzug" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Geschäftsumzug Offerten vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma/internationale-umzuege" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Internationale Umzüge
                      </Link>
                    </li>
                    <li>
                      <Link href="/malerarbeitenkosten" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Malerarbeiten Offerten vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/raeumung-entsorgung" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Räumung & Entsorgung
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma-in-der-naehe" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Umzugsfirma in Ihrer Nähe finden
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="pt-6 border-t border-gray-200">
                <h3 className="heading-3 flex items-center">
                  <HelpCircle size={28} className="mr-3 text-purple-500" />
                  Häufige Fragen zum Privatumzug
                </h3>
                <Accordion type="single" collapsible className="w-full bg-slate-50 rounded-lg shadow">
                  {/* FAQ 1 */}
                    <AccordionItem value="item-1" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          <h4 className="faq-question">Was kostet ein Privatumzug in der Schweiz?</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>
                              Die Kosten hängen stark von der Wohnungsgrösse und dem Umzugsvolumen ab. Unser <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:underline font-semibold">Umzugskosten-Rechner</Link> gibt Ihnen eine gute erste Schätzung. Hier ist eine grobe Übersicht:
                            </p>
                            <div className="my-4">
                              <PricingTable
                                title="Preise für Privatumzüge"
                                subtitle="Durchschnittliche Preise in der Schweiz"
                                rows={costTableData.map(item => ({
                                  size: item.size,
                                  cost: item.cost,
                                  description: item.size.includes('1.5') ? 'Kleine Wohnung, WG-Zimmer' : 
                                               item.size.includes('3.5') ? 'Standard Wohnung' :
                                               item.size.includes('4.5') ? 'Grössere Wohnung' :
                                               'Einfamilienhaus, Villa'
                                }))}
                                serviceType="umzug"
                              />
                            </div>
                            <p className="mt-3 text-sm text-gray-600">Tipp: Vergleichen Sie Offerten kostenlos, um das beste Preis-Leistungs-Verhältnis zu finden. Die Preise können stark variieren.</p>
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                              <div className="flex items-start md:items-center">
                                <Calculator className="w-8 h-8 md:w-6 md:h-6 mr-3 text-green-600 flex-shrink-0 mt-1 md:mt-0" />
                                <p className="text-sm text-green-700 flex-grow">Nutzen Sie unseren Rechner für eine detaillierte Analyse Ihrer Umzugskosten.</p>
                              </div>
                              <Button asChild size="sm" className="mt-3 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white group">
                                <Link href="/umzugsfirma/umzugskosten">
                                  Jetzt Kosten berechnen
                                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 2 */}
                    <AccordionItem value="item-2" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          <h4 className="faq-question">Welche Leistungen sind bei einem Standard-Wohnungsumzug inklusive?</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>Ein Standardangebot einer Zügelfirma umfasst in der Regel folgende Leistungen:</p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Transport der Möbel und Kartons von A nach B",
                                  "Professionelle Fahrer und Zügelmänner",
                                  "Transportversicherung für Ihr Umzugsgut",
                                  "Standard-Verbrauchsmaterial wie Decken und Gurte"
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 3 */}
                    <AccordionItem value="item-3" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          <h4 className="faq-question">Wie bereite ich mich am besten auf den Umzugstag vor?</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>
                              Eine gute Vorbereitung ist alles! Die wichtigsten Schritte sind:
                            </p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Alles, was Sie nicht mehr brauchen, frühzeitig entsorgen oder verkaufen.",
                                  "Alle Kartons klar beschriften (Inhalt und Zimmer).",
                                  "Eine Kiste mit den wichtigsten Dingen für den ersten Tag separat packen (Toilettenartikel, Werkzeug, Ladekabel).",
                                  "Parkplätze für den Umzugswagen organisieren.",
                                  "Unsere detaillierte Umzugs-Checkliste hilft Ihnen, nichts zu vergessen."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <p className="mt-2">
                              Nutzen Sie unsere <Link href="/umzugsfirma/checklists" className="text-green-600 hover:underline font-semibold">detaillierte Umzugs-Checkliste</Link> für eine vollständige Übersicht.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 4 */}
                    <AccordionItem value="item-4" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          <h4 className="faq-question">Was sollte ich bei der Auswahl der Umzugsfirma beachten?</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>Achten Sie auf folgende Punkte, um eine seriöse Firma zu erkennen:</p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Transparente offerten: Alle Kosten sollten klar aufgeschlüsselt sein.",
                                  "Versicherungsnachweis: Lassen Sie sich die Transport- und Betriebshaftpflichtversicherung bestätigen.",
                                  "Kundenbewertungen: Lesen Sie Erfahrungen anderer Kunden.",
                                  "Eintrag im Handelsregister: Prüfen Sie, ob die Firma offiziell registriert ist.",
                                  "Besichtigungstermin: Bei grösseren Umzügen ist ein kostenloser Besichtigungstermin üblich und empfehlenswert."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 5 */}
                    <AccordionItem value="item-5" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          <h4 className="faq-question">Wann sollte ich mit der Planung meines Wohnungsumzugs beginnen?</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="mb-2">
                              Je früher, desto besser! Wir empfehlen, unserer <Link href="/umzugsfirma/checklists" className="text-green-600 hover:underline font-semibold">detaillierten Zeitachse</Link> zu folgen:
                            </p>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">2-3 Monate vorher:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Mietvertrag kündigen, Nachmieter suchen.",
                                  "Umzugsofferten einholen und vergleichen.",
                                  "Umzugsunternehmen buchen."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">1 Monat vorher:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Mit dem Ausmisten und Packen von selten genutzten Dingen beginnen.",
                                  "Ummeldungen (Adressänderungen) vorbereiten.",
                                  "Sonderurlaub für den Umzugstag beantragen."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">1 Woche vorher:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Die meisten Sachen fertig packen.",
                                  "Möbel demontieren, die nicht von der Firma zerlegt werden.",
                                  "Verpflegung für den Umzugstag organisieren."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">Am Umzugstag:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Böden schützen.",
                                  "Zählerstände ablesen.",
                                  "Letzte Kontrolle der alten Wohnung."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">Nach dem Umzug:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Wohnungsübergabe und Protokoll.",
                                  "Offizielle Adressänderung bei allen Stellen durchführen.",
                                  "Das neue Zuhause geniessen!"
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 6 */}
                    <AccordionItem value="item-6" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          <h4 className="faq-question">Lohnt sich ein Ein- und Auspackservice?</h4>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>Ein Packservice lohnt sich besonders, wenn Sie:</p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Wenig Zeit haben.",
                                  "Körperlich nicht in der Lage sind, schwere Kisten zu heben.",
                                  "Wertvolles oder zerbrechliches Inventar haben, das professionell verpackt werden muss.",
                                  "Den Umzug so stressfrei wie möglich gestalten möchten."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </section>

              {/* CTA Button */}
              <div className="mt-10 text-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug">
                    Kostenlose Offerten für Privatumzug
                    <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
            </main>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateUmzugPageClient;

