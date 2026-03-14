'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowRight, CheckCircle, PackagePlus, ClipboardList, Users, ShieldCheck, 
  Wrench, HeartHandshake, MapPin, Home, Star, Calculator,
  Building, Globe, Sparkles, Trash2, Brush as PaintBrush, Box, Package,
  TrendingUp, FileText, Mail, CheckCircle2, ChevronRight
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
      id: 'lagerung',
      name: 'Lagerung',
      description: 'Möbel sicher einlagern',
      icon: Package,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-100',
      iconBgHover: 'bg-rose-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=lagerung'  // Lagerung
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
      <div className="bg-white">
        {/* Hero Section - Like Umzugsfirma in der Nähe Page */}
        <section className="relative py-12 md:py-16 overflow-hidden bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="mb-3 pt-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">Startseite</Link>
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
                <div className="space-y-2 mb-4">
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 font-semibold text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Stressfrei umziehen mit Umzugspreisvergleich
                </div>
                  <div className="heading-1" role="presentation">
                  Privatumzug in der Schweiz – Umzugsfirma Vergleichen und Stressfrei Umziehen
                  </div>
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
                  Erhalten Sie bis zu 5 kostenlose Offerten von geprüften Umzugsunternehmen. Vergleichen Sie Preise und Leistungen und sparen Sie bis zu 40% bei Ihrem Umzug.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug">
                      Jetzt Umzugspreise vergleichen
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
                  <h3 className="heading-3 text-center mb-6">
                    Die besten Umzugsfirmen bei Online-Offerten.ch finden
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Kostenlose und unverbindliche Anfrage</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Ausschliesslich qualitätsgeprüfte Umzugsfirmen</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Auswahl aus mehreren Anbietern in Ihrer Region</p>
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
              className="space-y-8"
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
                        Ein Privatumzug in der Schweiz gehört zu den Ereignissen im Leben, die oft mit viel Organisation, Planung und körperlicher Arbeit verbunden sind. Egal ob Sie innerhalb derselben Stadt umziehen oder in eine andere Region ziehen - ein Privatumzug in der Schweiz erfordert meist eine gute Vorbereitung.
                      </p>
                      <p>
                        Viele Menschen unterschätzen den Aufwand, den ein Privatumzug in der Schweiz mit sich bringt. Möbel müssen abgebaut, sorgfältig verpackt und sicher transportiert werden. Gleichzeitig müssen Termine koordiniert, Helfer organisiert und Transportmöglichkeiten eingeplant werden. Ohne Erfahrung kann ein Privatumzug in der Schweiz schnell stressig werden.
                      </p>
                      <p>
                        Eine professionelle Umzugsfirma kann den gesamten Prozess deutlich erleichtern. Wer mehrere Angebote einholt und Umzugsfirmen vergleicht, kann einen Privatumzug in der Schweiz deutlich effizienter und oft auch günstiger organisieren.
                      </p>
                      <p>
                        Über Plattformen wie Online-Offerten können Sie innerhalb weniger Minuten mehrere Angebote erhalten und die passende Umzugsfirma für Ihren Privatumzug in der Schweiz auswählen.
                      </p>

                      <h3 className="heading-3 pt-2">Privatumzug in Zürich</h3>
                      <p>
                        Ein <Link href="/umzugsfirma/zuerich" className="text-green-700 hover:underline">Privatumzug in Zürich</Link> erfordert oft eine besonders gute Planung, da die Stadt sehr dicht besiedelt ist. Parkplätze für Umzugswagen sind häufig begrenzt, weshalb eine frühzeitige Organisation wichtig ist. Ausserdem ist die Nachfrage nach Umzugsfirmen in Zürich besonders hoch.
                      </p>

                      <h3 className="heading-3 pt-2">Privatumzug in Bern</h3>
                      <p>
                        Ein <Link href="/umzugsfirma/bern" className="text-green-700 hover:underline">Privatumzug in Bern</Link> ist meist etwas entspannter als in grösseren Städten, dennoch sollte die Planung rechtzeitig beginnen. Gerade in der Altstadt können enge Strassen und eingeschränkte Zufahrten den Umzug erschweren. Eine erfahrene Umzugsfirma kann hier viel Zeit sparen.
                      </p>

                      <h3 className="heading-3 pt-2">Privatumzug in Basel</h3>
                      <p>
                        Ein <Link href="/umzugsfirma/basel" className="text-green-700 hover:underline">Privatumzug in Basel</Link> findet häufig auch im internationalen Kontext statt, da viele Menschen aus beruflichen Gründen in die Stadt ziehen. Besonders bei Umzügen über längere Distanzen ist eine professionelle Planung hilfreich. Zudem sind viele Wohnhäuser in Basel älter, was den Möbeltransport erschweren kann.
                      </p>

                      <h3 className="heading-3 pt-2">Privatumzug im Aargau</h3>
                      <p>
                        Ein <Link href="/umzugsfirma/aargau" className="text-green-700 hover:underline">Privatumzug im Aargau</Link> ist oft etwas einfacher zu organisieren, da viele Gemeinden über gute Zufahrtsmöglichkeiten verfügen. Dennoch lohnt es sich, verschiedene Umzugsfirmen zu vergleichen, um das beste Angebot zu finden. Gerade bei Familienumzügen spielt eine gute Vorbereitung eine wichtige Rolle.
                      </p>

                      <h3 className="heading-3 pt-2">Privatumzug in Luzern</h3>
                      <p>
                        Ein <Link href="/umzugsfirma/luzern" className="text-green-700 hover:underline">Privatumzug in Luzern</Link> kann aufgrund der Lage rund um den See und der historischen Altstadt besondere Herausforderungen mit sich bringen. Enge Strassen und begrenzte Parkmöglichkeiten sollten bei der Planung berücksichtigt werden. Eine frühzeitige Organisation erleichtert den Ablauf deutlich.
                      </p>

                      <h3 className="heading-3 pt-2">Privatumzug in St. Gallen</h3>
                      <p>
                        Ein <Link href="/umzugsfirma/st-gallen" className="text-green-700 hover:underline">Privatumzug in St. Gallen</Link> ist häufig mit kürzeren Distanzen verbunden, da viele Umzüge innerhalb der Region stattfinden. Trotzdem sollte auch hier eine sorgfältige Planung erfolgen, besonders wenn grössere Möbel transportiert werden müssen. Mit der richtigen Umzugsfirma lässt sich der Umzug effizient durchführen.
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

                <div className="pt-6 border-t border-gray-200 mt-6">
                <h2 className="heading-2">
                  Umzugsfirma vergleichen für einen Privatumzug in der Schweiz
                </h2>
                <p className="text-body leading-relaxed mb-3">
                  Wer einen Privatumzug in der Schweiz plant, sollte mehrere Angebote vergleichen. Dadurch lassen sich Preisunterschiede erkennen und die beste Umzugsfirma auswählen.
                </p>
                <p className="text-body leading-relaxed mb-4">
                  Ein Offertenvergleich kann den gesamten Privatumzug in der Schweiz deutlich einfacher machen.
                </p>

                    <div className="grid sm:grid-cols-1 gap-4 mb-4">
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mb-3">1</div>
                        <h4 className="heading-4 mb-2">Schritt 1 – Formular ausfüllen</h4>
                        <p className="text-body leading-relaxed mb-2">
                          Für einen Privatumzug in der Schweiz geben Sie grundlegende Informationen ein:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-body">
                          <li>aktuelle Adresse</li>
                          <li>neue Adresse</li>
                          <li>Wohnungsgrösse</li>
                          <li>Umzugsdatum</li>
                        </ul>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mb-3">2</div>
                        <h4 className="heading-4 mb-2">Schritt 2 – Offerten erhalten</h4>
                        <p className="text-body leading-relaxed">
                          Nach der Anfrage erhalten Sie mehrere Angebote für Ihren Privatumzug in der Schweiz.
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mb-3">3</div>
                        <h4 className="heading-4 mb-2">Schritt 3 – Angebote vergleichen</h4>
                        <p className="text-body leading-relaxed">
                          Sie können Preise und Leistungen vergleichen und die passende Umzugsfirma für Ihren Privatumzug in der Schweiz auswählen.
                        </p>
                      </div>
                    </div>
                </div>
              </section>

              {/* Article Section 2 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Leistungen bei einem Privatumzug in der Schweiz
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Viele Umzugsfirmen bieten verschiedene Dienstleistungen für einen Privatumzug in der Schweiz an.
                </p>
                <h3 className="heading-3">Möbeltransport</h3>
                <p className="text-body leading-relaxed mb-4">
                  Der Transport von Möbeln ist der wichtigste Bestandteil eines Privatumzugs in der Schweiz.
                </p>
                <h3 className="heading-3">Verpackungsservice</h3>
                <p className="text-body leading-relaxed mb-4">
                  Ein professioneller Verpackungsservice kann einen Privatumzug in der Schweiz deutlich einfacher machen.
                </p>
                <h3 className="heading-3">Möbelmontage</h3>
                <p className="text-body leading-relaxed mb-4">
                  Viele Umzugsfirmen übernehmen die Montage und Demontage von Möbeln während eines Privatumzugs in der Schweiz.
                </p>
                <h3 className="heading-3">Umzugsreinigung</h3>
                <p className="text-body leading-relaxed mb-4">
                  Nach einem Privatumzug in der Schweiz muss häufig eine gründliche Reinigung der Wohnung durchgeführt werden.
                </p>
                <h3 className="heading-3">Lagerung</h3>
                <p className="text-body leading-relaxed mb-4">
                  Manchmal ist eine Zwischenlagerung von Möbeln während eines Privatumzugs in der Schweiz notwendig.
                </p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-8">
                  <p className="text-body leading-relaxed"><strong>Tipp</strong>: Bei grösseren Wohnungen ab 3,5 Zimmern empfiehlt sich ein Besichtigungstermin (vor Ort oder per Video), damit die Offerte realistisch kalkuliert werden kann.</p>
                </div>
                
                <h3 className="heading-3">
                  Tipps für einen erfolgreichen Privatumzug in der Schweiz
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <p className="text-body leading-relaxed mb-3">
                      Mit einer guten Vorbereitung kann ein Privatumzug in der Schweiz deutlich entspannter verlaufen.
                    </p>
                    <div className="space-y-4 mb-4">
                      <div>
                        <h4 className="heading-4 mb-1">Frühzeitig planen</h4>
                        <p className="text-body leading-relaxed">
                          Ein Privatumzug in der Schweiz lässt sich deutlich entspannter organisieren, wenn Sie frühzeitig mit der Planung beginnen. Idealerweise sollten Sie mehrere Wochen vor dem Umzug Angebote von Umzugsfirmen vergleichen und wichtige Termine festlegen. Eine rechtzeitige Planung hilft dabei, Stress zu vermeiden und den gesamten Ablauf besser zu koordinieren.
                        </p>
                      </div>
                      <div>
                        <h4 className="heading-4 mb-1">Kartons richtig packen</h4>
                        <p className="text-body leading-relaxed">
                          Beim Packen für einen Privatumzug in der Schweiz ist es wichtig, Umzugskartons sinnvoll zu befüllen. Schwere Gegenstände sollten auf mehrere Kartons verteilt werden, damit sie leichter zu tragen sind. Beschriften Sie die Kartons zusätzlich mit dem jeweiligen Raum, damit beim Einzug alles schneller seinen Platz findet.
                        </p>
                      </div>
                      <div>
                        <h4 className="heading-4 mb-1">Unnötige Dinge aussortieren</h4>
                        <p className="text-body leading-relaxed">
                          Vor einem Privatumzug in der Schweiz lohnt es sich, alte oder nicht mehr benötigte Gegenstände auszusortieren. Dadurch reduzieren Sie die Anzahl der Kartons und erleichtern den Transport. Gleichzeitig sparen Sie Platz und können Ihr neues Zuhause übersichtlicher einrichten.
                        </p>
                      </div>
                      <div>
                        <h4 className="heading-4 mb-1">Parkplatz reservieren</h4>
                        <p className="text-body leading-relaxed">
                          Ein reservierter Parkplatz kann einen Privatumzug in der Schweiz erheblich vereinfachen. Wenn der Umzugswagen direkt vor der Wohnung stehen kann, verkürzt sich der Transportweg deutlich. Dadurch sparen Sie Zeit und der gesamte Umzug kann schneller durchgeführt werden.
                        </p>
                      </div>
                    </div>
                    <p className="text-body leading-relaxed">
                      Mit diesen Tipps planen Sie Ihren Privatumzug in der Schweiz strukturierter und vermeiden unnötige Verzögerungen.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/image/4e73e4b7-ab5b-4e20-9412-394b5b526cf0.webp"
                      alt="Professionelle Umzugshelfer tragen sorgfältig einen grossen Schrank durch ein Treppenhaus, während sie sich um die Sicherheit der Möbel kümmern. Diese Umzugsfirma zeigt ihre Erfahrung und Qualität im Möbeltransport, um den Privatumzug stressfrei zu gestalten."
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
                  Kosten für einen Privatumzug in der Schweiz
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Die Kosten für einen Privatumzug in der Schweiz können je nach Umfang und Entfernung unterschiedlich sein. Mehrere Faktoren beeinflussen den Preis eines Privatumzugs in der Schweiz.
                </p>
                <h3 className="heading-3">Durchschnittliche Kosten</h3>
                <p className="text-body leading-relaxed mb-3">
                  Typische Preise für einen Privatumzug in der Schweiz können ungefähr so aussehen:
                </p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li>2 Zimmer Wohnung: etwa 800 - 1300 CHF</li>
                  <li>3 Zimmer Wohnung: etwa 1200 - 1800 CHF</li>
                  <li>4 Zimmer Wohnung: etwa 1500 - 2500 CHF</li>
                </ul>

                <p className="text-body leading-relaxed mb-4">
                  Der genaue Preis für einen Privatumzug in der Schweiz hängt jedoch von verschiedenen Faktoren ab.
                </p>

                <h3 className="heading-3">Wohnungsgrösse</h3>
                <p className="text-body leading-relaxed mb-4">
                  Je grösser der Haushalt ist, desto mehr Möbel müssen bei einem Privatumzug in der Schweiz transportiert werden.
                </p>

                <h3 className="heading-3">Entfernung</h3>
                <p className="text-body leading-relaxed mb-4">
                  Ein Privatumzug in der Schweiz innerhalb derselben Stadt ist meist günstiger als ein Umzug zwischen zwei Kantonen.
                </p>

                <h3 className="heading-3">Stockwerk und Lift</h3>
                <p className="text-body leading-relaxed mb-4">
                  Wenn kein Lift vorhanden ist, kann ein Privatumzug in der Schweiz mehr Zeit und Arbeitsaufwand erfordern.
                </p>

                <h3 className="heading-3">Zusatzleistungen</h3>
                <p className="text-body leading-relaxed">
                  Zusätzliche Services wie Verpackung oder Möbelmontage können einen Privatumzug in der Schweiz komfortabler machen, erhöhen jedoch oft auch den Preis.
                </p>
              </section>

              {/* Article Section 4 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Checkliste für den Privatumzug
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Für eine stressfreie Planung finden Sie auf unserer Checklisten-Seite praktische Vorlagen für alle Umzugsphasen - von der Vorbereitung bis zur Übergabe.
                </p>
                <p className="text-body leading-relaxed mb-4">
                  Sie können die Checklisten direkt online nutzen und als PDF herunterladen.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/umzugsfirma/checklists">
                    Zur Umzugs-Checkliste
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </section>

              {/* Article Section 5 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Privatumzug ins Ausland - Internationale Umzüge gezielt vergleichen
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Wenn Sie aus der Schweiz ins Ausland umziehen, ist eine erfahrene Umzugsfirma besonders wichtig. Je nach Zielland unterscheiden sich Zoll, Transportdauer, Dokumente und Kosten deutlich. Über Online-Offerten.ch vergleichen Sie internationale Offerten und finden passende Spezialisten für Ihren Auslandsumzug.
                </p>

                <h3 className="heading-3">Beliebte Ziele für den Auslandsumzug</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Link href="/umzugsfirma/internationale-umzuege/umzug-nach-deutschland" className="text-green-700 hover:underline font-semibold">
                      Umzug nach Deutschland
                    </Link>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Link href="/umzugsfirma/internationale-umzuege/umzug-nach-italien" className="text-green-700 hover:underline font-semibold">
                      Umzug nach Italien
                    </Link>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Link href="/umzugsfirma/internationale-umzuege/umzug-nach-frankreich" className="text-green-700 hover:underline font-semibold">
                      Umzug nach Frankreich
                    </Link>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Link href="/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich" className="text-green-700 hover:underline font-semibold">
                      Umzug nach Oesterreich
                    </Link>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Link href="/umzugsfirma/internationale-umzuege/umzug-nach-spanien" className="text-green-700 hover:underline font-semibold">
                      Umzug nach Spanien
                    </Link>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Link href="/umzugsfirma/internationale-umzuege/umzug-nach-portugal" className="text-green-700 hover:underline font-semibold">
                      Umzug nach Portugal
                    </Link>
                  </div>
                </div>

                <p className="text-body leading-relaxed mb-4">
                  Typische Erfolgsfaktoren bei einem Privatumzug ins Ausland sind eine saubere Inventarliste, klare Absprachen zur Versicherung sowie die fruehzeitige Planung von Zoll- und Einfuhrunterlagen.
                </p>
                <p className="text-body leading-relaxed">
                  Beschreiben Sie Ihre Route und Anforderungen moeglichst genau, damit Sie vergleichbare Offerten fuer Ihren Auslandsumzug erhalten - von der Schweiz nach Deutschland, Italien oder in andere europaeische Ziellaender.
                </p>
              </section>

              {/* Article Section 6 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Was Bedeutet Privatumzug in der Schweiz?
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Ein Privatumzug in der Schweiz beschreibt den Umzug eines privaten Haushalts von einer Wohnung oder einem Haus in ein neues Zuhause. Dabei werden Möbel, Haushaltsgeräte, persönliche Gegenstände und Umzugskartons transportiert.
                </p>
                <p className="text-body leading-relaxed mb-4">
                  Ein Privatumzug in der Schweiz kann sehr unterschiedlich aussehen. Manche Menschen ziehen aus einer kleinen Wohnung in eine grössere Wohnung, während andere einen kompletten Haushalt in ein Haus verlegen. Je nach Umfang kann ein Privatumzug in der Schweiz wenige Stunden oder sogar mehrere Tage dauern.
                </p>
                <h3 className="heading-3">Typische Situationen für einen Privatumzug in der Schweiz sind</h3>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li>Umzug in eine grössere Wohnung</li>
                  <li>Wohnortwechsel wegen eines neuen Jobs</li>
                  <li>Zusammenzug mit Partner oder Familie</li>
                  <li>Umzug in eine andere Stadt</li>
                  <li>Wechsel in ein neues Haus</li>
                </ul>
                <p className="text-body leading-relaxed">
                  Viele Menschen entscheiden sich dafür, für ihren Privatumzug in der Schweiz eine professionelle Umzugsfirma zu beauftragen, da dies Zeit spart und den gesamten Ablauf erleichtert.
                </p>
              </section>

              {/* Article Section 7 - CTA */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Privatumzug in der Schweiz anfragen und Umzugsfirma vergleichen
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

              {/* FAQ Section */}
              <section className="py-12 md:py-16 bg-white border-t border-gray-200 mt-6">
                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                  <div className="md:col-span-3">
                    <div className="mb-8">
                      <h2 className="heading-2">
                        Häufig gestellte Fragen (FAQ)
                      </h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                  {/* FAQ 1 */}
                    <AccordionItem value="item-1" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Was kostet ein Privatumzug in der Schweiz?</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed">
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
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 2 */}
                    <AccordionItem value="item-2" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Welche Leistungen sind bei einem Standard-Wohnungsumzug inklusive?</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed">
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
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 3 */}
                    <AccordionItem value="item-3" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Wie bereite ich mich am besten auf den Umzugstag vor?</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed">
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
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 4 */}
                    <AccordionItem value="item-4" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Was sollte ich bei der Auswahl der Umzugsfirma beachten?</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed">
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
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 5 */}
                    <AccordionItem value="item-5" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Wann sollte ich mit der Planung meines Wohnungsumzugs beginnen?</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed">
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
                      </AccordionContent>
                    </AccordionItem>

                  {/* FAQ 6 */}
                    <AccordionItem value="item-6" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                          <h4 className="faq-question">Lohnt sich ein Ein- und Auspackservice?</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed">
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
                      </AccordionContent>
                    </AccordionItem>
                </Accordion>
                  </div>
                  <div className="relative md:col-span-2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                      <Image
                        src="/fotos/umzugstag.webp"
                        alt="Privatumzug FAQ – Antworten rund um Planung, Kosten und Leistungen"
                        width={600}
                        height={450}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                      <p className="text-sm font-bold">Fragen & Antworten</p>
                      <p className="text-xs text-blue-100">Rund um Privatumzüge</p>
                    </div>
                  </div>
                </div>
              </section>

            </main>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateUmzugPageClient;



