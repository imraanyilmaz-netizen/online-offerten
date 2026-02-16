'use client'

import React from 'react'

// Framer Motion removed for better performance - using CSS transitions instead
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, ShieldCheck, Clock, Sparkles, ThumbsUp, BookOpen, Award, HelpCircle, Home, Building, Brush, MapPin, ChevronRight, Star, FileText, Zap } from 'lucide-react'
import NextImage from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PricingTable from '@/components/SEO/PricingTable'
import HowItWorks from '@/components/SEO/HowItWorks'

const ReinigungPageClient = () => {
  const router = useRouter()

  // SEO Data (moved to server component, but kept for schema generation if needed client-side)
  const metaTitle = "Reinigungsfirma – Kostenlose Offerten vergleichen | Schweiz"
  const metaDescription = "Professionelle Reinigungsdienstleistungen für Wohnung, Haus und Büro. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Region und sparen Sie bis zu 40%."
  const metaKeywords = "umzugsreinigung mit abnahmegarantie, endreinigung wohnung, reinigungsfirma für umzug, wohnungsreinigung mit abnahmegarantie, umzugsreinigung preise, reinigungsofferte, endreinigung kosten, umzugsreinigung zürich, reinigung nach umzug, privatumzug reinigung"
  const canonicalUrl = "/reinigung"

  // Schema Data - Single JSON-LD Service schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": metaTitle,
    "serviceType": "Reinigungsvermittlung",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
      "priceCurrency": "CHF",
      "price": "0",
      "name": "Kostenlose Offerte für Reinigung"
    }
  }

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2')
  }

  const handleCalculatorClick = () => {
    router.push('/reinigung/reinigungskosten')
  }

  const benefits = [
    { icon: ShieldCheck, title: "Abnahmegarantie", text: "Unsere Partner sind bei der Übergabe anwesend und garantieren die Abnahme durch den Vermieter. Falls Nachbesserungen nötig sind, werden diese kostenlos erledigt.", color: "blue" },
    { icon: Clock, title: "Zeitersparnis & Stressreduktion", text: "Konzentrieren Sie sich auf das Einrichten Ihres neuen Heims, während Profis die aufwändige Endreinigung übernehmen.", color: "emerald" },
    { icon: Sparkles, title: "Professionelle Ausrüstung", text: "Reinigungsfirmen verfügen über spezielle Geräte und Mittel, um auch hartnäckigsten Schmutz zu entfernen und perfekte Ergebnisse zu erzielen.", color: "purple" },
    { icon: ThumbsUp, title: "Geprüfte Qualität", text: "Wir arbeiten nur mit qualifizierten und versicherten Reinigungsfirmen zusammen, die höchste Standards erfüllen.", color: "amber" },
  ]

  const colorMap: Record<string, { bg: string; icon: string; hoverBg: string }> = {
    blue: { bg: 'bg-blue-100', icon: 'text-blue-600', hoverBg: 'group-hover:bg-blue-200' },
    emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600', hoverBg: 'group-hover:bg-emerald-200' },
    purple: { bg: 'bg-purple-100', icon: 'text-purple-600', hoverBg: 'group-hover:bg-purple-200' },
    amber: { bg: 'bg-amber-100', icon: 'text-amber-600', hoverBg: 'group-hover:bg-amber-200' },
  }

  const includedServices = [
    "Gründliche Reinigung von Küche (inkl. Backofen, Dampfabzug, Kühlschrank)",
    "Komplette Bad- und WC-Reinigung (inkl. Entkalkung von Armaturen)",
    "Fensterreinigung (innen und aussen), inkl. Rahmen und Fensterbänke",
    "Reinigung von Storen, Rollläden und Lamellen",
    "Bodenreinigung (alle Beläge: Parkett, Laminat, Fliesen etc.)",
    "Reinigung von Türen, Türrahmen, Griffen und Lichtschaltern",
    "Reinigung von Einbauschränken (innen und aussen)",
    "Reinigung von Sockelleisten, Heizkörpern und Fenstersimsen",
    "Reinigung von Balkon, Terrasse und Kellerabteil (besenrein)"
  ]

  const costData = [
    "1.5-2.5 Zimmer: CHF 500-800",
    "3.5 Zimmer: CHF 800-1'100",
    "4.5 Zimmer: CHF 950-1'300",
    "5.5+ Zimmer: ab CHF 1'200"
  ]

  const pricingTableData = [
    { size: "1.5 - 2.5 Zimmer", cost: "500 - 800 CHF", description: "Kleine Wohnung, WG-Zimmer" },
    { size: "3.5 Zimmer", cost: "800 - 1'100 CHF", description: "Standard Wohnung" },
    { size: "4.5 Zimmer", cost: "950 - 1'300 CHF", description: "Grössere Wohnung" },
    { size: "5.5+ Zimmer", cost: "Ab 1'200 CHF", description: "Einfamilienhaus, Villa" }
  ]

  const oldCostData = [
    "1.5 - 2.5 Zimmer-Wohnung: CHF 500 - 800",
    "3.5 Zimmer-Wohnung: CHF 800 - 1'100",
    "4.5 Zimmer-Wohnung: CHF 950 - 1'300",
    "5.5 Zimmer-Wohnung oder grösser: ab CHF 1'200"
  ]

  const reinigungServices = [
    { path: '/reinigung/wohnungsreinigung', title: 'Wohnungsreinigung', icon: Home, description: 'Gründliche Reinigung Ihrer Wohnung' },
    { path: '/reinigung/hausreinigung', title: 'Hausreinigung', icon: Building, description: 'Professionelle Hausreinigung' },
    { path: '/reinigung/bueroreinigung', title: 'Büroreinigung', icon: FileText, description: 'Sauberes Arbeitsumfeld' },
    { path: '/reinigung/umzugsreinigung', title: 'Umzugsreinigung', icon: Sparkles, description: 'Mit Abnahmegarantie' },
    { path: '/reinigung/unterhaltsreinigung', title: 'Unterhaltsreinigung', icon: Clock, description: 'Regelmässig & zuverlässig' },
    { path: '/reinigung/grundreinigung', title: 'Grundreinigung', icon: Brush, description: 'Tiefenreinigung vom Profi' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                </li>
                <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                <li className="text-gray-900 font-medium" aria-current="page">Reinigung</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Professionelle Reinigung in der Schweiz
                </div>
                <h1 className="heading-1 !mt-0">
                  Reinigungsfirma finden & Offerten vergleichen » Bis zu 40% sparen
                </h1>
                <p className="text-body mb-8">
                  Sorgenfrei zur Wohnungsübergabe. Unsere geprüften Partner sorgen für eine blitzblanke Sauberkeit, damit Sie sich auf Ihr neues Zuhause konzentrieren können. Ideal nach einem Privatumzug.
                </p>

                <p id="reinigungsart" className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Reinigungsart:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                  {/* Umzugsreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=umzugsreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                      <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Umzugsreinigung</p>
                      <p className="text-xs text-gray-600 mt-0.5">Mit Abnahmegarantie</p>
                    </div>
                  </Link>

                  {/* Wohnungsreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=wohnungsreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Wohnungsreinigung</p>
                      <p className="text-xs text-gray-600 mt-0.5">Gründlich & sauber</p>
                    </div>
                  </Link>

                  {/* Büroreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=bueroreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Büroreinigung</p>
                      <p className="text-xs text-gray-600 mt-0.5">Professionell & zuverlässig</p>
                    </div>
                  </Link>

                  {/* Grundreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=grundreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                      <Brush className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Grundreinigung</p>
                      <p className="text-xs text-gray-600 mt-0.5">Tiefenreinigung</p>
                    </div>
                  </Link>

                  {/* Fensterreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=fensterreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Fensterreinigung</p>
                      <p className="text-xs text-gray-600 mt-0.5">Streifenfrei & klar</p>
                    </div>
                  </Link>

                  {/* Unterhaltsreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=unterhaltsreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                      <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Unterhaltsreinigung</p>
                      <p className="text-xs text-gray-600 mt-0.5">Regelmässig & sauber</p>
                    </div>
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Geprüfte Reinigungsfirmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Mit Abnahmegarantie</span>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative md:col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <NextImage
                    src="/bilder/reinigungsfirma-600-400.webp"
                    alt="Professionelle Reinigung Schweiz"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Mit Abnahmegarantie</p>
                  <p className="text-xs text-blue-100">In der ganzen Schweiz</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warum eine professionelle Umzugsreinigung */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold text-xs mb-4">
                  WARUM PROFESSIONELLE REINIGUNG?
                </div>
                <h2 className="heading-2 mb-6">Warum eine professionelle Umzugsreinigung?</h2>
                <p className="text-body">
                  Eine Wohnungsübergabe kann stressig sein. Vermieter haben hohe Ansprüche an die Sauberkeit. Ob Reinigung für Privatpersonen nach einem Wohnungswechsel oder eine gründliche Endreinigung vor der Übergabe – mit einer professionellen Reinigungsfirma an Ihrer Seite sparen Sie nicht nur Zeit und Nerven, sondern sichern sich auch dank der Abnahmegarantie gegen teure Nachreinigungen ab. Vergleichen Sie kostenlose Reinigungsofferten von mehreren geprüften Firmen und finden Sie das beste Angebot. Erfahren Sie mehr über unsere <Link href="/umzugsfirma/privatumzug" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Privatumzug</Link> Dienstleistungen und wie wir Ihnen bei Ihrem Umzug helfen können.
                </p>
              </div>
              <div className="relative">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <img  
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Professionelles Reinigungsteam bei der Endreinigung einer Wohnung"
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                {/* Floating stat */}
                <div className="absolute -bottom-4 -right-4 bg-white px-5 py-3 rounded-xl shadow-lg border border-gray-100 hidden md:block">
                  <p className="text-2xl font-bold text-blue-600">40%</p>
                  <p className="text-xs text-gray-600">Durchschnittliche Ersparnis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <HowItWorks
              title="So einfach ist es"
              ctaText="Jetzt kostenlose Reinigungs-Offerten anfordern"
              ctaLink="/kostenlose-offerte-anfordern?service=reinigung"
            />
          </div>
        </section>

        {/* Ihre Vorteile auf einen Blick */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold text-xs mb-4">
                IHRE VORTEILE
              </div>
              <h2 className="heading-2">Ihre Vorteile auf einen Blick</h2>
            </div>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                const colors = colorMap[benefit.color] || colorMap.blue
                return (
                  <div
                    key={index}
                    className="group w-[75vw] min-w-[240px] max-w-[300px] md:w-auto md:min-w-0 md:max-w-none snap-start flex-shrink-0 md:flex-shrink bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <div className={`inline-flex p-4 rounded-2xl mb-5 ${colors.bg} ${colors.hoverBg} transition-colors`}>
                      <Icon className={`w-7 h-7 ${colors.icon}`} />
                    </div>
                    <h3 className="heading-5 mb-3">{benefit.title}</h3>
                    <p className="text-body">{benefit.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Was ist in einer Umzugsreinigung enthalten? */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 font-semibold text-xs mb-4">
                  LEISTUNGSUMFANG
                </div>
                <h2 className="heading-2 mb-4">Was ist in einer Umzugsreinigung enthalten?</h2>
                <p className="text-body mb-6">Eine Standard-Umzugsreinigung mit Abnahmegarantie umfasst alle notwendigen Arbeiten für eine erfolgreiche Wohnungsübergabe. Vergleichen Sie Reinigungsofferten von verschiedenen Anbietern, um das beste Angebot zu finden:</p>
                <ul className="space-y-3">
                  {includedServices.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img   
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Glänzende saubere Küche nach einer professionellen Umzugsreinigung"
                    src="https://images.unsplash.com/photo-1641823911769-c55f23c25143" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
          
        {/* Article Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold text-xs mb-4">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                RATGEBER
              </div>
              <h2 className="heading-2 mb-8">
                Ihr Leitfaden für die perfekte Umzugsreinigung
              </h2>
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-body">
                  Die Schlüsselübergabe steht bevor und der Umzugsstress erreicht seinen Höhepunkt. Inmitten von Kisten und Chaos ist die Endreinigung der alten Wohnung oft die letzte Hürde, die es zu überwinden gilt. Doch diese Hürde hat es in sich: Vermieter in der Schweiz sind für ihre hohen Ansprüche an die Sauberkeit bekannt. Ein nicht gründlich gereinigter Backofen oder Kalkrückstände im Bad können schnell zu teuren Nachreinigungen oder sogar zur Einbehaltung der Mietkaution führen. Genau hier kommt die professionelle Umzugsreinigung mit Abnahmegarantie ins Spiel – Ihr Schutzschild für eine reibungslose und stressfreie Übergabe. Es geht nicht nur darum, eine Reinigungsfirma zu beauftragen, sondern den richtigen, vertrauenswürdigen Partner für diese wichtige Aufgabe zu finden. Ein Partner, der Qualität liefert und dessen Preis-Leistungs-Verhältnis überzeugt.
                </p>
                <p className="text-body">
                  Die Suche nach diesem idealen Partner kann jedoch schnell zu einer zeitraubenden Aufgabe werden. Unzählige Anbieter werben mit ihren Diensten, doch wie trennt man die Spreu vom Weizen? Wie stellt man sicher, dass die versprochene Qualität auch wirklich geliefert wird? An dieser Stelle wird der Wert einer Plattform wie Online-Offerten.ch unschätzbar. Statt stundenlang zu recherchieren und einzelne Offerten einzuholen, ermöglichen wir Ihnen, mit nur einer einzigen Anfrage mehrere Offerten von geprüften und bewerteten Reinigungsfirmen aus Ihrer Region zu erhalten. Sie vergleichen nicht nur Preise, sondern auch Kundenbewertungen und Leistungsumfänge. So treffen Sie eine fundierte Entscheidung und finden eine Firma, die nicht nur sauber putzt, sondern der Sie voll und ganz vertrauen können. Dieser Leitfaden führt Sie durch alle wichtigen Aspekte der Umzugsreinigung und zeigt Ihnen, wie Sie mit dem richtigen Vorgehen Zeit, Geld und vor allem Nerven sparen.
                </p>
                
                {/* Abnahmegarantie Highlight Box */}
                <div className="!mt-10 !mb-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white"/>
                    </div>
                    <h3 className="heading-3 pt-1">
                      Die Abnahmegarantie: Mehr als nur ein Versprechen für Ihre Reinigung
                    </h3>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1">
                      <p className="text-body">
                        Der Begriff &apos;Abnahmegarantie&apos; ist das wohl wichtigste Qualitätsmerkmal bei einer Umzugsreinigung. Doch was verbirgt sich genau dahinter? Es ist weit mehr als nur eine Zusage für Sauberkeit. Eine echte Abnahmegarantie bedeutet, dass ein Vertreter der Reinigungsfirma bei der Wohnungsübergabe an den Vermieter anwesend ist. Gemeinsam wird die Wohnung inspiziert. Sollte der Vermieter einen Mangel feststellen – sei es ein übersehener Fleck an der Wand oder eine nicht perfekt entkalkte Duschbrause – wird dieser umgehend und ohne zusätzliche Kosten von der Reinigungsfirma nachgebessert. Die Garantie gilt so lange, bis der Vermieter die Sauberkeit im Übergabeprotokoll bestätigt und seine Unterschrift daruntersetzt. Diese Garantie gibt Ihnen die absolute Sicherheit, dass die Reinigung den strengen Schweizer Standards entspricht und Sie keine unerwarteten Kosten fürchten müssen. Sie kaufen nicht nur eine Dienstleistung, sondern ein sorgenfreies Ergebnis.
                      </p>
                    </div>
                    <div className="w-full md:w-80 flex-shrink-0">
                      <img 
                        src="/bilder/wohnungsreinigung-mit-abnahmegarantie.webp" 
                        alt="Professionelle Reinigung mit Abnahmegarantie in der Schweiz" 
                        className="rounded-xl shadow-lg w-full h-auto object-cover border-2 border-white" 
                      />
                    </div>
                  </div>
                </div>

                <h3 className="heading-3 !mt-10 !mb-4">Der richtige Partner: Warum der Vergleich auf Online-Offerten.ch entscheidend ist</h3>
                <p className="text-body">
                  Die Auswahl der richtigen Reinigungsfirma ist der Schlüssel zum Erfolg. Ein günstiger Preis allein ist kein Garant für Qualität. Auf unserer Plattform legen wir Wert auf Transparenz und Vertrauen. Alle Partnerfirmen werden von uns sorgfältig geprüft. Sie können auf echte Kundenbewertungen zugreifen und sehen auf einen Blick, welche Erfahrungen andere Mieter mit den jeweiligen Unternehmen gemacht haben. Indem Sie mehrere Offerten vergleichen, bekommen Sie ein realistisches Gefühl für die marktüblichen Preise und können Offerten identifizieren, die möglicherweise zu gut sind, um wahr zu sein. Ein detaillierter Vergleich der in den Offerten enthaltenen Leistungen ist ebenso wichtig. Ist die Fensterreinigung inklusive Storen abgedeckt? Wie sieht es mit dem Kellerabteil oder dem Balkon aus? Unser standardisiertes Anfrageformular stellt sicher, dass alle Offerten auf derselben Grundlage basieren und somit fair vergleichbar sind. Sie sparen sich die mühsame Koordination mit verschiedenen Anbietern und erhalten stattdessen übersichtlich aufbereitete, konkurrenzfähige Offerten direkt in Ihr Postfach. So finden Sie mühelos die perfekte Balance aus Preis, Leistung und Vertrauenswürdigkeit. Neben der <Link href="/umzugsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Umzugsreinigung</Link> bieten wir auch <Link href="/wohnungsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Wohnungsreinigung</Link>, <Link href="/hausreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Hausreinigung</Link> und <Link href="/bueroreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Büroreinigung</Link> an. Für regelmässige Reinigung empfehlen wir unsere <Link href="/unterhaltsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Unterhaltsreinigung</Link>.
                </p>
                <p className="text-body">
                  Zusammenfassend lässt sich sagen, dass eine professionelle Umzugsreinigung eine kluge Investition in Ihren Seelenfrieden ist. Sie delegieren eine der anspruchsvollsten Aufgaben des Umzugsprozesses an Experten und sichern sich durch die Abnahmegarantie vollständig ab. Nutzen Sie die Macht des Vergleichs auf Online-Offerten.ch, um den idealen Reinigungspartner zu finden, der Ihnen eine makellose Wohnungsübergabe garantiert. So können Sie sich voll und ganz auf das freuen, was wirklich zählt: der Start in Ihrem neuen Zuhause. Weitere Informationen finden Sie auf unseren <Link href="/standorte" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Standorte-Seiten</Link> oder in unserem <Link href="/ratgeber" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Ratgeber</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <PricingTable
              title="Preise für Umzugsreinigung"
              subtitle="Durchschnittliche Preise in der Schweiz"
              rows={pricingTableData}
              serviceType="reinigung"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 font-semibold text-xs mb-4">
                  <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                  FAQ
                </div>
                <h2 className="heading-2">
                  Häufig gestellte Fragen zur Umzugsreinigung
                </h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                <Accordion type="single" collapsible className="w-full">
                  <div>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <h4 className="faq-question">Was genau bedeutet die &apos;Abnahmegarantie&apos;?</h4>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Die Abnahmegarantie ist Ihre Versicherung für eine erfolgreiche Wohnungsübergabe. Das bedeutet konkret: Ein Mitarbeiter der Reinigungsfirma ist bei der Übergabe anwesend. Beanstandet der Vermieter einen Punkt bezüglich der Sauberkeit, wird dieser sofort und ohne Mehrkosten nachgereinigt. Die Garantie gilt, bis der Vermieter die Reinigung im Übergabeprotokoll als einwandfrei akzeptiert.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                  <div>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        <h4 className="faq-question">Wie viel kostet eine Umzugsreinigung?</h4>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <p>Die Kosten variieren je nach Grösse der Wohnung, Verschmutzungsgrad und inkludierten Zusatzleistungen (z.B. sehr hohe Fenster). Als grobe Richtlinie können Sie mit folgenden Preisen rechnen:</p>
                          <ul className="list-disc list-inside my-2 space-y-1">
                            {costData.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                          <p>
                            Diese Preise sind Schätzungen. Für eine genaue Kostenübersicht nutzen Sie am besten unseren <Link href="/reinigung/reinigungskosten" className="text-blue-600 hover:underline font-semibold">Reinigungskosten-Rechner</Link> oder fordern Sie direkt <a href="#reinigungsart" className="text-blue-600 hover:underline font-semibold">unverbindliche Offerten</a> an.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                  <div>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        <h4 className="faq-question">Was muss ich vor der Ankunft des Reinigungsteams tun?</h4>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Für einen reibungslosen Ablauf sollte die Wohnung komplett leer und geräumt sein. Alle persönlichen Gegenstände und Möbel müssen entfernt sein, damit das Team alle Flächen, Ecken und Schränke uneingeschränkt erreichen und reinigen kann. Stellen Sie zudem sicher, dass Strom und Wasser funktionieren.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                  <div>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        <h4 className="faq-question">Wie lange dauert eine professionelle Umzugsreinigung?</h4>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>Die Dauer hängt stark von der Grösse und dem Zustand der Wohnung ab. In der Regel benötigt ein Team von 2-3 Personen für eine durchschnittlich grosse 3.5-Zimmer-Wohnung zwischen 6 und 9 Stunden. Planen Sie am besten einen ganzen Tag für die Reinigung ein.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Weitere Reinigungsdienstleistungen */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-purple-700 font-semibold text-xs mb-4">
                UNSERE SERVICES
              </div>
              <h3 className="heading-2">
                Weitere Reinigungsdienstleistungen
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {reinigungServices.filter(service => service?.path).map((service) => {
                const Icon = service.icon
                return (
                  <Link
                    key={service.path}
                    href={service.path}
                    className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div id="cta" className="relative text-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-8 md:px-12 rounded-3xl shadow-2xl overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2h2v2h18v2H22v2.5L20 20.5z'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center px-4 py-1.5 bg-white/20 rounded-full text-white font-semibold text-sm mb-6 backdrop-blur-sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Kostenlos & unverbindlich
                </div>
                <h2 className="heading-2-white mb-4">
                  Bereit für eine makellose Übergabe?
                </h2>
                <p className="text-body-white max-w-2xl mx-auto mb-8">
                  Erhalten Sie in wenigen Schritten kostenlose und unverbindliche Offerten von geprüften Reinigungsfirmen in Ihrer Region.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button onClick={handleCtaClick} size="lg" className="bg-white text-blue-700 hover:bg-blue-50 group w-full sm:w-auto px-8 py-4 text-base font-bold shadow-lg">
                    Kostenlose Offerten erhalten
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <p className="text-blue-200 text-sm mb-1">Oder berechnen Sie zuerst die ungefähren Kosten:</p>
                    <Button onClick={handleCalculatorClick} variant="link" className="text-white hover:text-blue-200">
                      Zum Reinigungskosten-Rechner
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default ReinigungPageClient
