import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Calculator, FileText, Mail, BarChart3, MapPin, Building, Star, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const city = "Dietikon"
const canonicalUrl = '/umzugsfirma-in-der-naehe/zuerich/dietikon'
const imageUrl = '/image/umzugsservice-Schweiz/umzugsfirma-zurich.webp'

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsvermittlung",
  "name": "Umzugsfirma Dietikon vergleichen",
  "description": "Geprüfte Umzugsfirmen in Dietikon vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen für Ihren Umzug nach oder von Dietikon.",
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "areaServed": {
    "@type": "City",
    "name": "Dietikon",
    "containedInPlace": {
      "@type": "State",
      "name": "Zürich"
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

// FAQ Schema - Dietikon spezifische FAQs
const dietikonFAQs = [
  {
    question: "Suchen Sie eine Umzugsfirma in Dietikon?",
    answer: "Ja, auf Online-Offerten.ch finden Sie geprüfte Umzugsfirmen, die auf Umzüge nach und von Dietikon spezialisiert sind. Dietikon liegt im Limmattal und ist ein wichtiger Verkehrsknotenpunkt. Unsere Partnerfirmen kennen die lokalen Gegebenheiten und können Ihnen bei Ihrem Umzug nach Dietikon helfen."
  },
  {
    question: "Was kostet ein Umzug nach Dietikon?",
    answer: "Die Umzugskosten nach Dietikon hängen von mehreren Faktoren ab: Entfernung, Wohnungsgrösse, Stockwerk und gewünschte Leistungen. Ein Umzug innerhalb des Limmattals oder von Zürich nach Dietikon kostet für eine 3.5-Zimmer-Wohnung typischerweise zwischen 800 und 2'500 CHF. Vergleichen Sie mehrere Offerten, um das beste Angebot zu finden."
  },
  {
    question: "Warum ist Dietikon ein beliebter Umzugsort?",
    answer: "Dietikon bietet eine ideale Lage im Limmattal mit guter Verkehrsanbindung nach Zürich. Die Stadt kombiniert moderne Infrastruktur mit ruhigen Wohngebieten. Viele Menschen ziehen nach Dietikon, weil es günstigere Mieten als Zürich bietet, aber trotzdem gut erreichbar ist. Professionelle Umzugsfirmen kennen die Besonderheiten der Stadt."
  },
  {
    question: "Wie finde ich eine zuverlässige Umzugsfirma für Dietikon?",
    answer: "Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen. Achten Sie auf lokale Erfahrung mit Umzügen im Limmattal. Seriöse Firmen kennen die Verkehrswege, Parkmöglichkeiten und die verschiedenen Wohngebiete in Dietikon. Über unser Portal erhalten Sie bis zu 5 kostenlose Offerten."
  },
  {
    question: "Kann ich von Zürich nach Dietikon umziehen?",
    answer: "Ja, viele Umzugsfirmen bieten Umzüge von Zürich nach Dietikon an. Die kurze Distanz macht solche Umzüge oft kostengünstig. Professionelle Dienstleister kennen beide Städte und können Ihren Umzug effizient planen. Vergleichen Sie mehrere Offerten, um das beste Angebot zu finden."
  },
  {
    question: "Wie lange im Voraus sollte ich eine Umzugsfirma für Dietikon buchen?",
    answer: "Wir empfehlen eine Buchung 3-4 Wochen im Voraus, besonders während der Hauptumzugszeit (Monatsende). Dietikon ist ein beliebter Umzugsort, daher ist frühzeitige Planung wichtig. Frühbucher erhalten oft bessere Konditionen und mehr Auswahl bei den Terminen."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": dietikonFAQs.map(faq => ({
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
          "name": "Umzugsfirma Zürich",
          "item": "https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Umzugsfirma Dietikon",
          "item": `https://online-offerten.ch${canonicalUrl}`
        }
      ]
    },
    serviceSchema,
    faqSchema
  ]
}

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
  { size: "1.5-Zimmer-Wohnung", cost: "CHF 600 - 640" },
  { size: "2.5-Zimmer-Wohnung", cost: "CHF 640 - 950" },
  { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'050 - 1'200" },
  { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'380 - 1'850" },
  { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'920 - 2'400" },
  { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'400 - 3'050" }
]

export const metadata: Metadata = {
  title: 'Umzugsfirma Dietikon – Top Anbieter vergleichen & sparen',
  description: 'Suchen Sie Umzugsfirma in Dietikon? ✓ Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Umzug nach oder von Dietikon.',
  alternates: {
    canonical: `https://online-offerten.ch${canonicalUrl}`,
  },
  openGraph: {
    title: 'Umzugsfirma Dietikon » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Suchen Sie Umzugsfirma in Dietikon? Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Ihren Umzug.',
    url: `https://online-offerten.ch${canonicalUrl}`,
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Dietikon',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Dietikon » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Suchen Sie Umzugsfirma in Dietikon? Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp'],
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

export default function UmzugsfirmaDietikonPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema)
        }}
      />
      
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section 
          className="relative w-full py-0 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-white z-20" 
          aria-label="Umzugsfirma Dietikon - Kostenlose Offerten"
        >
          <div className="container mx-auto max-w-7xl px-0 sm:px-4 md:px-6">
            <div className="bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-none sm:shadow-xl">
              <div className="flex flex-col lg:flex-row-reverse">
                {/* Right Side - Image */}
                <div className="w-full lg:w-[40%] relative">
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px]">
                    <Image 
                      src={imageUrl}
                      alt="Professionelle Umzugsfirma in Dietikon - Umzugsunternehmen bei der Arbeit"
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Left Side - Green Content Area */}
                <div className="w-full lg:w-[60%] bg-[#0d4d2c] relative px-4 sm:px-8 md:px-12 py-6 sm:py-10 md:py-12 lg:py-16">
                  {/* Yellow Badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-yellow-400 rounded-full px-4 py-2 shadow-lg z-10">
                    <p className="text-black text-xs sm:text-sm font-bold text-center leading-tight">
                      Kostenlos &<br />unverbindlich
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <span className="text-sm font-medium text-white">Limmattal, Kanton Zürich</span>
                  </div>

                  {/* Heading */}
                  <h1 
                    className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight font-bold mb-6 sm:mb-8 text-white pr-20 sm:pr-24"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif',
                      fontWeight: 700,
                    }}
                  >
                    Suchen Sie Umzugsfirma in Dietikon?
                  </h1>
                    
                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                    Planen Sie einen Umzug nach Dietikon oder von Dietikon weg? Unser Vergleichsportal verbindet Sie mit geprüften Umzugsfirmen aus dem Limmattal. Füllen Sie das Formular aus und erhalten Sie bis zu 5 kostenlose Offerten von lokalen Experten. Der Umzug war noch nie so einfach – vergleichen Sie Preise und sparen Sie bis zu 40%.
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                    >
                      <Link href={`/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`}>
                        Kostenlose Offerten anfordern
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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
            
            {/* Breadcrumb Navigation */}
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
                <li>
                  <Link href="/umzugsfirma-in-der-naehe/zuerich" className="hover:text-green-600 transition-colors">
                    Umzugsfirma Zürich
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  Umzugsfirma Dietikon
                </li>
              </ol>
            </nav>
          </div>
        </section>
        
        {/* Main Content Section */}
        <section className="py-16 md:py-24 bg-white overflow-x-hidden">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 w-full">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
              {/* Left Column - Content */}
              <div className="lg:col-span-8 w-full min-w-0">
                <h2 className="heading-2 mb-6">
                  Umzugsfirma in Dietikon finden: Ihr Weg zum neuen Zuhause
                </h2>
                <div className="text-body mb-8 leading-relaxed space-y-4">
                  <p>
                    Dietikon, die grösste Stadt im Limmattal, zieht jedes Jahr viele neue Bewohner an. Die strategische Lage zwischen Zürich und Baden, die günstigen Mieten und die gute Verkehrsanbindung machen Dietikon zu einem attraktiven Wohnort. Wenn Sie nach Dietikon umziehen möchten, benötigen Sie eine <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsfirma</Link>, die die Besonderheiten dieser dynamischen Stadt kennt.
                  </p>
                  <p>
                    Ein Umzug nach Dietikon bringt viele Vorteile: Sie profitieren von günstigeren Wohnkosten als in Zürich, haben aber trotzdem eine ausgezeichnete Anbindung an die Grossstadt. Die Limmat prägt das Stadtbild, und viele moderne Wohngebiete bieten hohe Lebensqualität. Professionelle Umzugsfirmen aus dem Limmattal kennen die verschiedenen Quartiere, von der Altstadt bis zu den neuen Wohnsiedlungen.
                  </p>
                  <p>
                    Ob Sie von <Link href="/umzugsfirma-in-der-naehe/zuerich" className="text-green-600 hover:text-green-700 font-semibold underline">Zürich nach Dietikon</Link> umziehen oder aus einer anderen Region kommen – unser Vergleichsportal hilft Ihnen, die passende Umzugsfirma zu finden. Vergleichen Sie mehrere Offerten und sparen Sie Zeit und Geld bei Ihrem Umzug ins Limmattal.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Sidebar */}
              <div className="lg:col-span-4 w-full min-w-0">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="heading-3 mb-4">Ihre Vorteile</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-body"><strong>100% kostenlos</strong> & unverbindlich</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-body"><strong>Geprüfte Partner</strong> aus dem Limmattal</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-body"><strong>Schnelle Antworten</strong> – oft innerhalb von 24h</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-body"><strong>Bis zu 40% sparen</strong> durch Vergleich</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Building className="w-6 h-6 text-green-600" />
                      <h4 className="heading-4">Umzugsfirmen vergleichen</h4>
                    </div>
                    <p className="text-body mb-4">
                      Holen Sie sich jetzt kostenlos und unverbindlich Offerten von geprüften Firmen.
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white w-full">
                      <Link href={`/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`}>
                        Jetzt Offerten für Dietikon anfordern
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rest of Content - Full Width */}
            <div className="w-full">

              {/* Pricing Table */}
              <article className="mb-12">
                  <h2 className="heading-2 mb-6">Umzugskosten in Dietikon: Transparente Preisübersicht</h2>
                  <p className="text-body mb-4">
                    Die Umzugskosten für einen Umzug nach oder von Dietikon richten sich nach verschiedenen Faktoren. Die Entfernung, Wohnungsgrösse, Stockwerk und gewünschte Leistungen beeinflussen den Preis. Dietikon liegt verkehrsgünstig im Limmattal, was Umzüge oft kostengünstiger macht als in zentraleren Lagen.
                  </p>
                  <p className="text-body mb-6">
                    Die folgenden Richtwerte dienen zur Orientierung und beziehen sich auf Umzüge nach oder von Dietikon. Die tatsächlichen Kosten können je nach individueller Situation variieren.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6 w-full">
                    {/* Hourly Rates Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full w-full min-w-0">
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                        <h3 className="heading-3 !text-white">Umzugspreise - Kosten pro Stunde</h3>
                      </div>
                      <div className="overflow-x-auto flex-1 w-full min-w-0">
                        <table className="w-full table-fixed min-w-0">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left heading-4 border-b border-gray-200 w-2/3">Umzugswagen und Zügelmänner (ca. 25 m³)</th>
                              <th className="px-4 py-3 text-right heading-4 border-b border-gray-200 w-1/3">Preis</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hourlyRates.map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 border-b border-gray-100 text-body">{row.service}</td>
                                <td className="px-4 py-3 border-b border-gray-100 text-right text-body font-semibold text-green-600">{row.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Room Size Costs Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full w-full min-w-0">
                      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                        <h3 className="heading-3 !text-white">Umzugskosten nach Zimmergrössen</h3>
                      </div>
                      <div className="overflow-x-auto flex-1 w-full min-w-0">
                        <table className="w-full table-fixed min-w-0">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left heading-4 border-b border-gray-200 w-2/3">Anzahl Zimmer</th>
                              <th className="px-4 py-3 text-right heading-4 border-b border-gray-200 w-1/3">Umzugskosten durchschnittlich (CHF)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {costTableRows.map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 border-b border-gray-100 text-body">{row.size}</td>
                                <td className="px-4 py-3 border-b border-gray-100 text-right text-body font-semibold text-green-600">{row.cost}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-200">
                    <p className="text-body text-gray-600 italic">
                      Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                    </p>
                  </div>
                </article>

              {/* Why Dietikon Section */}
              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200 mb-12">
                  <h2 className="heading-2 mb-6">Warum nach Dietikon umziehen?</h2>
                  <p className="text-body mb-6">
                    Dietikon bietet eine ideale Kombination aus urbanem Leben und ruhiger Wohnatmosphäre. Die Stadt im Limmattal wächst kontinuierlich und zieht Familien, Berufstätige und Senioren gleichermassen an. Hier sind die wichtigsten Gründe, warum viele Menschen nach Dietikon umziehen:
                  </p>
                  <ul className="space-y-3 text-body list-disc list-inside ml-4 mb-6">
                    <li><strong>Günstige Mieten:</strong> Im Vergleich zu Zürich sind die Wohnkosten in Dietikon deutlich niedriger, bei guter Erreichbarkeit</li>
                    <li><strong>Exzellente Verkehrsanbindung:</strong> Dietikon ist ein wichtiger Verkehrsknotenpunkt mit direkten Verbindungen nach Zürich, Baden und in die ganze Region</li>
                    <li><strong>Moderne Infrastruktur:</strong> Die Stadt investiert kontinuierlich in Schulen, Einkaufsmöglichkeiten und Freizeiteinrichtungen</li>
                    <li><strong>Limmattal-Lage:</strong> Die Nähe zur Limmat und die grünen Erholungsgebiete bieten hohe Lebensqualität</li>
                    <li><strong>Wachsendes Angebot:</strong> Neue Wohngebiete entstehen, die moderne Wohnformen bieten</li>
                  </ul>
                  <p className="text-body">
                    Wenn Sie nach Dietikon umziehen möchten, helfen Ihnen unsere Partnerfirmen dabei, den Umzug reibungslos zu gestalten. Sie kennen die verschiedenen Quartiere und können Ihnen bei der Planung Ihres Umzugs ins Limmattal helfen.
                  </p>
                </article>

              {/* How It Works Section */}
              <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100 mb-12 overflow-x-hidden">
                  <div className="container mx-auto max-w-7xl px-4 md:px-6 w-full">
                    <div className="text-center mb-12">
                      <h2 className="heading-2 mb-4">
                        So einfach funktioniert Ihr Umzug nach Dietikon
                      </h2>
                      <p className="text-body max-w-2xl mx-auto">
                        In nur drei einfachen Schritten erhalten Sie mehrere Offerten von geprüften Umzugsfirmen für Ihren Umzug nach Dietikon.
                      </p>
                    </div>
                    
                    <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 scrollbar-hide">
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                          <FileText className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="heading-3 mb-4">1. Formular ausfüllen</h3>
                        <p className="text-body">
                          Beschreiben Sie Ihren geplanten Umzug nach Dietikon. Geben Sie Umzugsdatum, Wohnungsgrösse und gewünschte Leistungen an. Das dauert nur wenige Minuten.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                          <Mail className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="heading-3 mb-4">2. Offerten erhalten</h3>
                        <p className="text-body">
                          Wir leiten Ihre Anfrage an geprüfte Umzugsfirmen aus dem Limmattal weiter. Innerhalb von 24-48 Stunden erhalten Sie mehrere detaillierte Offerten per E-Mail.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                          <BarChart3 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="heading-3 mb-4">3. Vergleichen & buchen</h3>
                        <p className="text-body">
                          Vergleichen Sie die Offerten in Ruhe. Wählen Sie die Umzugsfirma, die am besten zu Ihren Bedürfnissen passt, und sparen Sie bis zu 40% bei Ihrem Umzug nach Dietikon.
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center mt-12">
                      <Button 
                        asChild
                        size="lg" 
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                      >
                        <Link href={`/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`}>
                          Jetzt Offerten für Dietikon anfordern
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </section>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50 overflow-x-hidden">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 w-full">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">
                Häufige Fragen zu Umzügen nach Dietikon
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                Antworten auf die wichtigsten Fragen rund um Ihren Umzug nach oder von Dietikon
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {dietikonFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-2 mb-4"
                  >
                    <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:no-underline py-4">
                      <h4 className="faq-question">{faq.question}</h4>
                    </AccordionTrigger>
                    <AccordionContent className="text-body leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-24 text-white overflow-x-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/privatumzug/7946a949.webp)' }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 w-full relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h4 className="heading-4-white mb-6">
                Bereit für Ihren Umzug nach Dietikon?
              </h4>
              <p className="text-body-white mb-8">
                Füllen Sie jetzt das Formular aus und lassen Sie sich von den besten Umzugsfirmen aus dem Limmattal beraten. Vergleichen Sie mehrere Offerten kostenlos und unverbindlich. Ihr Umzug nach Dietikon war noch nie so einfach – sparen Sie Zeit und Geld durch unseren Vergleichsservice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
                >
                  <Link href={`/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`}>
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-green-50">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Unverbindlich</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Nur geprüfte Partner</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

