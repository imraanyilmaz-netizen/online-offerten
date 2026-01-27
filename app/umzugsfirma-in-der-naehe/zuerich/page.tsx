import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Calculator, FileText, Mail, BarChart3, MapPin, Building, Star, ChevronRight } from 'lucide-react'
import ZurichSidebar from '@/components/locations/ZurichSidebar'
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import { cityServiceData } from '@/data/cityLocalBusinessData'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { locations } from '@/data/locations'

const city = "Zürich"
const cityData = cityServiceData[city] || {
  name: 'Zürich',
  displayName: 'Umzugsfirma Zürich – Online-Offerten.ch',
  addressLocality: 'Zürich',
  addressRegion: 'ZH',
  latitude: '47.3769',
  longitude: '8.5417',
  canonicalUrl: '/umzugsfirma-in-der-naehe/zuerich'
}
const canonicalUrl = '/umzugsfirma-in-der-naehe/zuerich'
const locationData = locations.find(loc => loc.name === city)
const imageUrl = '/image/umzugsservice-Schweiz/umzugsfirma-zurich.webp'

// Service Schema - Correct structure for location pages
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsvermittlung",
  "name": String(`Umzugsfirma ${city} vergleichen`),
  "description": "Geprüfte Umzugsfirmen und Zügelfirmen in Zürich vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen.",
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "areaServed": {
    "@type": "City",
    "name": String(city),
    "containedInPlace": {
      "@type": "Country",
      "name": "Switzerland"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Umzugsofferten"
  }
}

// FAQ Schema - Zürich spezifische FAQs
const zurichFAQs = [
  {
    question: "Wie finde ich eine zuverlässige Umzugsfirma in Zürich?",
    answer: "Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen. Achten Sie auf lokale Erfahrung, besonders mit Umzügen in der Zürcher Innenstadt und den verschiedenen Quartieren. Seriöse Firmen kennen die Parkregelungen, können Halteverbotszonen organisieren und haben Erfahrung mit den typischen Herausforderungen Zürcher Umzüge."
  },
  {
    question: "Was kostet ein Umzug innerhalb von Zürich?",
    answer: "Die Kosten variieren je nach Wohnungsgrösse, Distanz, Stockwerk und Zugänglichkeit. Ein Umzug innerhalb Zürichs kostet typischerweise zwischen 850 und 3'200 CHF für eine 3.5-Zimmer-Wohnung. Umzüge in höhere Stockwerke ohne Lift oder in die Altstadt können teurer sein. Vergleichen Sie mehrere Offerten, um das beste Angebot zu finden."
  },
  {
    question: "Gibt es Besonderheiten bei Umzügen in die Zürcher Altstadt?",
    answer: "Ja, die engen Gassen, begrenzten Parkmöglichkeiten und die vielen Altstadtgebäude ohne Lift erfordern sorgfältige Planung. Professionelle Umzugsfirmen beantragen Halteverbotszonen rechtzeitig und verwenden geeignete Fahrzeuge für die Altstadt. Viele Gebäude haben steile Treppen, was den Transport in höhere Stockwerke beeinflusst."
  },
  {
    question: "Wie lange im Voraus sollte ich eine Umzugsfirma in Zürich buchen?",
    answer: "Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders für Umzüge in die Innenstadt oder während der Hauptumzugszeit (Monatsende). Kurzfristige Buchungen sind möglich, aber die Auswahl an verfügbaren Terminen ist dann begrenzter. Frühbucher erhalten oft bessere Konditionen."
  },
  {
    question: "Kann ich auch einen Umzug von Zürich nach Winterthur organisieren?",
    answer: "Ja, viele Umzugsfirmen in Zürich bieten auch Umzüge in andere Städte im Kanton an, wie Winterthur, Uster oder Dietikon. Die kurze Distanz macht solche Umzüge oft kostengünstiger als erwartet. Vergleichen Sie mehrere Offerten, um das beste Angebot für Ihren Umzug innerhalb des Kantons zu finden."
  },
  {
    question: "Welche Versicherung benötige ich für einen Umzug in Zürich?",
    answer: "Professionelle Umzugsfirmen in Zürich sind versichert gemäss OR und verfügen über Transport- und Betriebshaftpflichtversicherung. Zusätzlich können Sie eine Umzugsversicherung für wertvolle Gegenstände abschliessen. Fragen Sie nach dem Versicherungsschutz und prüfen Sie, ob Ihre Hausratversicherung den Umzug abdeckt."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": zurichFAQs.map(faq => ({
    "@type": "Question",
    "name": String(faq.question),
    "acceptedAnswer": {
      "@type": "Answer",
      "text": String(faq.answer)
    }
  }))
}

// Combined Schema
const combinedSchema = {
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
          "item": "https://online-offerten.ch/umzugsfirma-in-der-naehe"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `Umzugsfirma ${city}`,
          "item": `https://online-offerten.ch${canonicalUrl}`
        }
      ]
    },
    serviceSchema,
    faqSchema
  ]
}

// Cost table data
// Cost table data - Hourly rates
const hourlyRates = [
  { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 110.-" },
  { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 170.-" },
  { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 210.-" },
  { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 270.-" },
  { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 325.-" },
  { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 395.-" }
]

// Cost table data - By room size
const costTableRows = [
  { size: "1.5-Zimmer-Wohnung", cost: "CHF 620 - 660" },
  { size: "2.5-Zimmer-Wohnung", cost: "CHF 660 - 980" },
  { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'080 - 1'250" },
  { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'420 - 1'890" },
  { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'980 - 2'490" },
  { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'490 - 3'150" }
]

const zurichCities = [
  { name: 'Winterthur', link: '/umzugsfirma-in-der-naehe/zuerich/winterthur', description: 'Zweitgrösste Stadt im Kanton Zürich' },
  { name: 'Uster', link: '/umzugsfirma-in-der-naehe/zuerich/uster', description: 'Drittgrösste Stadt im Kanton Zürich' },
  { name: 'Dietikon', link: '/umzugsfirma-in-der-naehe/zuerich/dietikon', description: 'Wichtiger Verkehrsknotenpunkt' },
  { name: 'Dübendorf', link: '/umzugsfirma-in-der-naehe/zuerich/duebendorf', description: 'Moderne Wohnstadt mit Flughafennähe' },
  { name: 'Schlieren', link: '/umzugsfirma-in-der-naehe/zuerich/schlieren', description: 'Wachsende Stadt im Limmattal' }
]

const savingsTips = [
  "Antizyklisch umziehen: Meiden Sie Monatsenden und Wochenenden. Ein Umzug an einem Dienstag oder Mittwoch kann die Kosten um 20-30% senken.",
  "Strategisch selbst anpacken: Packen Sie Kisten selbst und demontieren Sie einfache Möbel. Das reduziert die teuren Arbeitsstunden der Profis.",
  "Frühbucher-Rabatte nutzen: Planen Sie mindestens 2-3 Monate im Voraus. Viele Umzugsfirmen in Zürich bieten bessere Konditionen für frühe Buchungen.",
  "Minimalismus-Prinzip anwenden: Ein Umzug ist die perfekte Gelegenheit zum Entrümpeln. Jedes Kilo weniger spart bares Geld.",
  "Gratis-Zügelmaterial verwenden: Fragen Sie in Supermärkten, Apotheken oder im Freundeskreis nach stabilen Bananen- oder Kopierpapierkisten.",
  "Lokale Umzugsfirmen bevorzugen: Umzugsfirmen in Zürich kennen die Region, sparen Fahrtkosten und bieten oft bessere Preise."
]

export const metadata: Metadata = {
  title: 'Umzugsfirma Zürich – Top Anbieter vergleichen & sparen',
  description: 'Umzugsfirma Zürich finden ✓ Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich',
      'x-default': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich',
    },
  },
  openGraph: {
    title: 'Umzugsfirma Zürich » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Umzugsfirma Zürich finden ✓ Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Zürich',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Zürich » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Umzugsfirma Zürich finden ✓ Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/services-professionals.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function UmzugsfirmaZurichPage() {
  return (
    <>
      {/* Schema.org Structured Data - Server-side rendered for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema)
        }}
      />
      
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section - Ana Sayfa Stili */}
        <section 
          className="relative w-full py-0 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-white z-20" 
          aria-label="Umzugsfirma Zürich - Kostenlose Offerten"
        >
          <div className="container mx-auto max-w-7xl px-0 sm:px-4 md:px-6">
            <div className="bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-none sm:shadow-xl">
              <div className="flex flex-col lg:flex-row-reverse">
                {/* Right Side - Image (40% on desktop) */}
                <div className="w-full lg:w-[40%] relative">
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px]">
                    <Image 
                      src={imageUrl}
                      alt="Professionelle Zügelfirma in Zürich - Umzugsunternehmen bei der Arbeit"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Left Side - Green Content Area (60% on desktop) */}
                <div className="w-full lg:w-[60%] bg-[#0d4d2c] relative px-4 sm:px-8 md:px-12 py-6 sm:py-10 md:py-12 lg:py-16">
                  {/* Yellow Badge - Top Right */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-yellow-400 rounded-full px-4 py-2 shadow-lg z-10">
                    <p className="text-black text-xs sm:text-sm font-bold text-center leading-tight">
                      Kostenlos &<br />unverbindlich
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <span className="text-sm font-medium text-white">Kanton Zürich</span>
                  </div>

                  {/* Heading */}
                  <h1 
                    className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight font-bold mb-6 sm:mb-8 text-white pr-20 sm:pr-24"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 700,
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    Umzugsfirma Zürich – Kostenlos vergleichen & bis zu 40% sparen
                  </h1>
                    
                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                    Unsere Umzugsfirmen Zürich bietet Ihnen einen umfassenden Full Service Umzug, der keine Wünsche offenlässt. Wir übernehmen alles rund um Ihren Umzug – von Transport, Montage, Reinigung bis hin zu Einlagerungen – damit Sie sich um nichts kümmern müssen.
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                    >
                      <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Zürich">
                        Kostenlose Offerten anfordern
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      size="lg" 
                      className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg rounded-lg shadow-sm hover:shadow-md"
                    >
                      <Link href="/umzugsfirma/umzugskosten">
                        <Calculator className="w-5 h-5 mr-2" />
                        Kosten berechnen
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">100% kostenlos</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <ShieldCheck className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">Geprüfte Partner</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <TrendingUp className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">Bis zu 40% sparen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Breadcrumb Navigation - Hero Altında */}
            <nav className="mt-4 sm:mt-6 pt-4 px-4 sm:px-0" aria-label="Breadcrumb">
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
                  <Link href="/umzugsfirma-in-der-naehe" className="hover:text-green-600 transition-colors">
                    Umzugsfirma in der Nähe
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  Umzugsfirma Zürich
                </li>
              </ol>
            </nav>
          </div>
        </section>
        
        {/* Two Column Layout: Content Left, Services Right */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Content */}
              <div className="lg:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Professionelle Umzugsdienstleister im Kanton Zürich
                </h2>
                <div className="text-gray-700 mb-8 leading-relaxed space-y-4">
                  <p>
                    Zürich, die grösste Stadt der Schweiz, ist ein Anziehungspunkt für Menschen aus aller Welt. Ein Umzug in dieser dynamischen Metropole birgt jedoch besondere Herausforderungen. Dichter Verkehr, komplexe Parkregelungen und die Vielfalt der Wohnlagen – von Altstadtwohnungen bis zu modernen Neubauten am Stadtrand – machen die Wahl der richtigen Umzugsfirma zur wichtigsten Entscheidung Ihres Umzugsprojekts.
                  </p>
                  <p>
                    Ein professionelles Umzugsunternehmen ist nicht nur ein Transportdienstleister; es ist Ihr Projektmanager, Logistikpartner und Problemlöser in einem. Ein Umzug in dieser Region – ob nach Winterthur, Uster, Dietikon, Dübendorf oder in eine der vielen charmanten Gemeinden – erfordert einen erfahrenen Dienstleister, der die Besonderheiten der Region kennt.
                  </p>
                  <p>
                    Erfahrene Transportunternehmen im Kanton Zürich kennen die Verkehrswege, die Parkregelungen in den historischen Altstädten und die logistischen Herausforderungen der Region. Über unser Portal können Sie mehrere Anbieter vergleichen und die beste Lösung für Ihr Projekt finden. Professionelle Dienstleister kümmern sich um die Organisation von Halteverbotszonen, planen die schnellste Route und stellen sicher, dass Ihr Hab und Gut sicher und unversehrt im neuen Zuhause ankommt.
                  </p>
                  <p className="text-lg">
                    Finden Sie die besten Umzugsdienstleister im Kanton Zürich für Ihren Umzug. Vergleichen Sie kostenlos mehrere Anbieter in Zürich, Winterthur, Uster und der ganzen Region. Achten Sie dabei auch auf die Bewertung der Anbieter durch Kunden. Professionelle Transportunternehmen bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug, Auslandumzug und Spezialtransporte.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Services - Zürich Özel */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <ZurichSidebar />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                So funktioniert's: Ihr Umzug in Zürich leicht gemacht
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                In nur drei einfachen Schritten erhalten Sie mehrere Offerten von geprüften Umzugsunternehmen.
              </p>
            </div>
            
            <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 scrollbar-hide">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Anfrage ausfüllen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Beschreiben Sie Ihren Umzug in Zürich in unserem Formular. Geben Sie Umzugsvolumen, Datum und gewünschte Leistungen an.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Offerten erhalten</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wir leiten Ihre Anfrage an geprüfte Umzugsunternehmen weiter. Sie erhalten innerhalb von 24-48 Stunden mehrere Offerten.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Vergleichen & sparen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vergleichen Sie die erhaltenen Offerten in Bezug auf Preis, Leistung und Bewertungen. Wählen Sie den passenden Anbieter aus und sparen Sie bis zu 40%!
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
              >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Zürich">
                  Jetzt Offerten einholen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">
              {/* Pricing Table */}
              <article>
                <h2 className="typography-h2 mb-6">Was kostet ein Umzug in Zürich?</h2>
                <p className="typography-p mb-4">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Zürich richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="typography-p mb-6">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Zürich und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Hourly Rates Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="typography-h3 !text-white">Umzugspreise - Kosten pro Stunde</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left typography-h4 border-b border-gray-200 w-2/3">Umzugswagen und Zügelmänner (ca. 25 m³)</th>
                            <th className="px-4 py-3 text-right typography-h4 border-b border-gray-200 w-1/3">Preis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hourlyRates.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 typography-p">{row.service}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Room Size Costs Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="typography-h3 !text-white">Umzugskosten nach Zimmergrössen</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left typography-h4 border-b border-gray-200 w-2/3">Anzahl Zimmer</th>
                            <th className="px-4 py-3 text-right typography-h4 border-b border-gray-200 w-1/3">Umzugskosten durchschnittlich (CHF)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {costTableRows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 typography-p">{row.size}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-200">
                  <p className="typography-p text-gray-600 italic">
                    Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                  </p>
                </div>
              </article>

              {/* Zürich Cities */}
              <article>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Städte & Regionen im Kanton Zürich</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Der Kanton Zürich bietet eine vielfältige Landschaft mit historischen Städten, idyllischen Dörfern und modernen Wirtschaftszentren. Unsere Partner sind in der ganzen Region aktiv und verfügen über umfassende Erfahrung.
                </p>
                <div className="grid lg:grid-cols-1 gap-6">
                  {/* Cities List - Full Width */}
                  <div className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 scrollbar-hide">
                  {zurichCities.map((cityItem, index) => (
                    <Link
                      key={index}
                      href={cityItem.link}
                      className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-start md:snap-none"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {cityItem.name}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">{cityItem.description}</p>
                    </Link>
                  ))}
                  </div>
                </div>
              </article>

              {/* Umzug in Zürich Section */}
              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Planen Sie einen Umzug in Zürich oder Umgebung? Auf online-offerten.ch können Sie schnell und unkompliziert mehrere kostenlose Offerten anfordern. Vergleichen Sie Preise und Leistungen – egal ob für einen Privatumzug, Firmenumzug oder Seniorenumzug.
                </p>
                
                <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Flexible Leistungen nach Bedarf
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Umzugsunternehmen bieten individuelle Lösungen für jedes Umzugsprojekt:
                  </p>
                  <ul className="space-y-3 text-gray-700 list-disc list-inside ml-4">
                    <li><strong>Full-Service-Umzug:</strong> Verpacken, Transport, Möbelmontage</li>
                    <li><strong>Teilumzug:</strong> Nur Transport oder Unterstützung beim Packen</li>
                    <li><strong>Spezialumzüge:</strong> Klavier, Tresor, Antiquitäten oder Kunstobjekte</li>
                    <li><strong>Zusatzleistungen:</strong> Umzugsreinigung, Entsorgung, Möbellagerung</li>
                    <li><strong>Versicherungsschutz:</strong> Absicherung Ihres gesamten Umzugsguts</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Ein professioneller Umzug sorgt für Sicherheit, Effizienz und einen reibungslosen Ablauf. Durch den direkten Vergleich mehrerer Offerten vermeiden Sie unnötige Mehrkosten und profitieren von fairen Preisen lokaler Anbieter. So lassen sich bis zu 40% der Umzugskosten sparen.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ihre Vorteile mit online-offerten.ch
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>100 % kostenlos & unverbindlich</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Geprüfte Umzugsunternehmen</strong> aus der Region</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Schnelle Rückmeldungen</strong> – oft innerhalb von 24 Stunden</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Klare & transparente Preise</strong></span>
                    </div>
                    <div className="flex items-start gap-3 md:col-span-2">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Lokale Profis mit Ortskenntnis</strong></span>
                    </div>
                  </div>
                </div>

              </article>

              {/* Savings Tips */}
              <article className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-blue-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Günstig umziehen im Kanton Zürich: Spartipps</h2>
                <p className="text-gray-700 mb-6 font-medium">
                  Zürich ist teuer, aber Ihr Umzug muss trotzdem nicht teuer sein. Mit diesen Insider-Tipps schonen Sie Ihr Budget:
                </p>
                <ul className="space-y-4">
                  {savingsTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 bg-white rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <h4 className="font-bold text-lg text-gray-900">Kostenloser Umzugskosten-Rechner</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Nutzen Sie unseren <Link href="/umzugsfirma/umzugskosten" className="text-blue-600 hover:text-blue-800 underline font-semibold">Umzugskosten-Rechner</Link> für eine detaillierte Schätzung Ihrer Umzugskosten im Kanton Zürich. In nur 2 Minuten erhalten Sie eine realistische Preis-Einschätzung.
                  </p>
                  <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Link href="/umzugsfirma/umzugskosten">
                      Jetzt Kosten berechnen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </article>

              {/* Services Overview */}
              <article>
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column - Image */}
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                      <Image
                        src="/image/umzugsservice-Schweiz/umzugsfirma-zuerich-leistungen.webp"
                        alt="Umzugsfirma Zürich Leistungen - Umzugsdienstleistungen"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                  {/* Right Column - Text and Services */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Leistungen der Umzugsfirmen</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Moderne Umzugsdienstleister bieten viel mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen:
                    </p>
                    <div className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 scrollbar-hide">
                      {[
                        { icon: 'Home', title: 'Privatumzug', link: '/umzugsfirma/privatumzug', desc: 'Wohnungswechsel individuell' },
                        { icon: 'Building', title: 'Geschäftsumzug', link: '/umzugsfirma/geschaeftsumzug', desc: 'Büro- und Firmenumzug' },
                        { icon: 'Globe', title: 'Internationale Umzüge', link: '/umzugsfirma/internationale-umzuege', desc: 'Umzug ins Ausland' },
                        { icon: 'Package', title: 'Spezialtransporte', link: '/umzugsfirma/spezialtransporte', desc: 'Klavier, Tresor, Maschinen' },
                        { icon: 'Sparkles', title: 'Reinigung', link: '/reinigung', desc: 'Umzugsreinigung & mehr' },
                        { icon: 'Sparkles', title: 'Umzugsreinigung', link: '/reinigung/umzugsreinigung', desc: 'Mit Abnahmegarantie' },
                        { icon: 'MapPin', title: 'Möbellagerung', link: '/umzugsfirma-in-der-naehe/zuerich', desc: 'Sichere Zwischenlagerung' }
                      ].map((service, index) => (
                        <Link
                          key={index}
                          href={service.link}
                          className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg flex-shrink-0 w-[75vw] md:w-auto snap-start md:snap-none"
                        >
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{service.title}</h4>
                          <p className="text-sm text-gray-600">{service.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              {/* Checklist */}
              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkliste für die perfekte Wahl</h2>
                <p className="text-gray-700 mb-6">
                  Lassen Sie sich nicht von der erstbesten Offerte überzeugen. Vergleichen Sie mehrere Anbieter. Eine gründliche Prüfung ist entscheidend für die beste Wahl.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Detaillierte Offerten einholen', text: 'Eine seriöse Offerte von einer Zügelfirma ist mehr als nur eine Zahl. Sie sollte alle Posten detailliert auflisten: Stundensätze, Mitarbeiterzahl, Fahrzeuggrösse, Versicherung und alle gebuchten Zusatzleistungen.' },
                    { title: 'Versicherungsschutz prüfen', text: 'Eine ausreichende Transport- und Betriebshaftpflichtversicherung ist nicht verhandelbar. Professionelle Umzugsdienstleister sind bis 100\'000 CHF versichert.' },
                    { title: 'Bewertungen und Referenzen analysieren', text: 'Lesen Sie authentische Kundenbewertungen auf unserem Portal. Achten Sie auf Kommentare zu Pünktlichkeit, Sorgfalt und Teamfreundlichkeit. Ein Beispiel: „Herr Isufi und sein Team haben unseren Umzug äusserst professionell und freundlich durchgeführt – wir fühlten uns bestens betreut." Unsere Partner verfügen über umfassende Erfahrung in der Vermittlung von Umzügen im Kanton Zürich.' },
                    { title: 'Regionale Kenntnisse prüfen', text: 'Ein Zügelunternehmen im Kanton Zürich sollte die Region kennen. Fragen Sie nach Erfahrungen mit Umzügen in Ihrer spezifischen Gemeinde.' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>


            </main>
          </div>
        </section>

        {/* FAQ Section - Zürich spezifisch */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Häufige Fragen zu Umzügen in Zürich
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Antworten auf die wichtigsten Fragen rund um Umzüge im Kanton Zürich
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {zurichFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-2 mb-4"
                  >
                    <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:no-underline py-4">
                      <h4 className="faq-question">{faq.question}</h4>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </section>
      </div>
    </>
  )
}

