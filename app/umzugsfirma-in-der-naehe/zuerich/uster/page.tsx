import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Calculator, FileText, Mail, BarChart3, MapPin, Building, Star, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const city = "Uster"
const canonicalUrl = '/umzugsfirma-in-der-naehe/zuerich/uster'
const imageUrl = '/image/umzugsservice-Schweiz/umzugsfirma-zurich.webp'

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsvermittlung",
  "name": "Umzugsfirma Uster vergleichen",
  "description": "Geprüfte Umzugsfirmen in Uster vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen für Ihren Umzug nach oder von Uster.",
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "areaServed": {
    "@type": "City",
    "name": "Uster",
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

// FAQ Schema - Uster spezifische FAQs
const usterFAQs = [
  {
    question: "Planen Sie einen Umzug nach Uster?",
    answer: "Uster ist die drittgrösste Stadt im Kanton Zürich und ein beliebtes Ziel für Umzüge. Die Stadt am Greifensee bietet eine ideale Kombination aus urbanem Leben und natürlicher Umgebung. Wenn Sie nach Uster umziehen möchten, finden Sie hier geprüfte Umzugsfirmen, die auf Umzüge in die Region spezialisiert sind."
  },
  {
    question: "Was kostet ein Umzug nach Uster?",
    answer: "Die Umzugskosten nach Uster hängen von der Entfernung, Wohnungsgrösse und gewünschten Leistungen ab. Ein Umzug von Zürich nach Uster kostet für eine 3.5-Zimmer-Wohnung typischerweise zwischen 850 und 2'600 CHF. Die Distanz ist etwas grösser als zu anderen Limmattal-Städten, aber Uster bietet dafür attraktive Wohnpreise und hohe Lebensqualität."
  },
  {
    question: "Warum ist Uster ein attraktiver Umzugsort?",
    answer: "Uster liegt am Greifensee und bietet eine einzigartige Kombination aus Stadtleben und Natur. Die drittgrösste Stadt im Kanton Zürich hat eine moderne Infrastruktur, gute Schulen und vielfältige Freizeitmöglichkeiten. Viele Menschen ziehen nach Uster, weil sie die Nähe zum See, die günstigeren Wohnkosten als in Zürich und die gute Verkehrsanbindung schätzen."
  },
  {
    question: "Wie finde ich eine zuverlässige Umzugsfirma für Uster?",
    answer: "Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen aus der Region. Achten Sie auf lokale Erfahrung mit Umzügen nach Uster und in die Greifensee-Region. Seriöse Firmen kennen die verschiedenen Quartiere und die Verkehrswege. Über unser Portal erhalten Sie bis zu 5 kostenlose Offerten von lokalen Experten."
  },
  {
    question: "Ist ein Umzug nach Uster kompliziert?",
    answer: "Nein, ein Umzug nach Uster ist dank der guten Verkehrsanbindung relativ unkompliziert. Professionelle Umzugsfirmen kennen die Route und können Ihren Umzug effizient planen. Uster liegt verkehrsgünstig und ist gut erreichbar, was Umzüge erleichtert."
  },
  {
    question: "Welche Besonderheiten gibt es bei Umzügen nach Uster?",
    answer: "Uster liegt am Greifensee und hat verschiedene Wohngebiete, von der Altstadt bis zu modernen Siedlungen. Professionelle Umzugsfirmen kennen die verschiedenen Quartiere und können Ihnen bei der Planung helfen. Die gute Verkehrsanbindung erleichtert Umzüge nach Uster. Achten Sie darauf, dass die Umzugsfirma Erfahrung mit Umzügen in die Region hat."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": usterFAQs.map(faq => ({
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
          "name": "Umzugsfirma Uster",
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
  { size: "1.5-Zimmer-Wohnung", cost: "CHF 610 - 650" },
  { size: "2.5-Zimmer-Wohnung", cost: "CHF 650 - 960" },
  { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'060 - 1'220" },
  { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'400 - 1'870" },
  { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'940 - 2'420" },
  { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'420 - 3'070" }
]

export const metadata: Metadata = {
  title: 'Umzugsfirma Uster – Top Anbieter vergleichen & sparen',
  description: 'Planen Sie einen Umzug nach Uster? ✓ Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Umzug nach oder von Uster.',
  alternates: {
    canonical: `https://online-offerten.ch${canonicalUrl}`,
  },
  openGraph: {
    title: 'Umzugsfirma Uster » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Planen Sie einen Umzug nach Uster? Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Ihren Umzug.',
    url: `https://online-offerten.ch${canonicalUrl}`,
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Uster',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Uster » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Planen Sie einen Umzug nach Uster? Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen.',
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

export default function UmzugsfirmaUsterPage() {
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
          aria-label="Umzugsfirma Uster - Kostenlose Offerten"
        >
          <div className="container mx-auto max-w-7xl px-0 sm:px-4 md:px-6">
            <div className="bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-none sm:shadow-xl">
              <div className="flex flex-col lg:flex-row-reverse">
                {/* Right Side - Image */}
                <div className="w-full lg:w-[40%] relative">
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px]">
                    <Image 
                      src={imageUrl}
                      alt="Professionelle Umzugsfirma in Uster - Umzugsunternehmen bei der Arbeit"
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
                    <span className="text-sm font-medium text-white">Greifensee-Region, Kanton Zürich</span>
                  </div>

                  {/* Heading */}
                  <h1 
                    className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight font-bold mb-6 sm:mb-8 text-white pr-20 sm:pr-24"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif',
                      fontWeight: 700,
                    }}
                  >
                    Planen Sie einen Umzug nach Uster?
                  </h1>
                    
                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                    Uster, die drittgrösste Stadt im Kanton Zürich, liegt am Greifensee und zieht jedes Jahr viele neue Bewohner an. Planen Sie einen Umzug nach Uster? Füllen Sie das Formular aus, und wir bringen Sie mit den besten Umzugsfirmen aus Ihrer Umgebung zusammen. Vergleichen Sie mehrere Offerten kostenlos und sparen Sie bis zu 40% bei Ihrem Umzug in die Greifensee-Region.
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
                  Umzugsfirma Uster
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
                  Umzug nach Uster: Am Greifensee zu Hause
                </h2>
                <div className="text-body mb-8 leading-relaxed space-y-4">
                  <p>
                    Uster ist die drittgrösste Stadt im Kanton Zürich und liegt idyllisch am Greifensee. Die Stadt kombiniert modernes Stadtleben mit der Nähe zur Natur und zieht jedes Jahr viele neue Bewohner an. Wenn Sie nach Uster umziehen möchten, benötigen Sie eine <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsfirma</Link>, die die Besonderheiten dieser besonderen Stadt kennt.
                  </p>
                  <p>
                    Ein Umzug nach Uster bietet viele Vorteile: Sie profitieren von günstigeren Wohnkosten als in Zürich, haben aber trotzdem eine ausgezeichnete Anbindung an die Grossstadt. Der Greifensee prägt das Stadtbild und bietet vielfältige Freizeitmöglichkeiten. Viele moderne Wohngebiete bieten hohe Lebensqualität, und die Stadt investiert kontinuierlich in Infrastruktur und Schulen.
                  </p>
                  <p>
                    Ob Sie von <Link href="/umzugsfirma-in-der-naehe/zuerich" className="text-green-600 hover:text-green-700 font-semibold underline">Zürich nach Uster</Link> umziehen oder aus einer anderen Region kommen – unser Vergleichsportal hilft Ihnen, die passende Umzugsfirma zu finden. Vergleichen Sie mehrere Offerten und sparen Sie Zeit und Geld bei Ihrem Umzug in die Greifensee-Region.
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
                        <span className="text-body"><strong>Geprüfte Partner</strong> aus der Greifensee-Region</span>
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
                        Jetzt Offerten für Uster anfordern
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
                  <h2 className="heading-2 mb-6">Umzugskosten nach Uster: Was Sie wissen sollten</h2>
                  <p className="text-body mb-4">
                    Die Umzugskosten nach Uster richten sich nach verschiedenen Faktoren. Die Entfernung, Wohnungsgrösse, Stockwerk und gewünschte Leistungen beeinflussen den Preis. Uster liegt etwas weiter von Zürich entfernt als andere Städte im Kanton, was sich in den Umzugskosten widerspiegeln kann.
                  </p>
                  <p className="text-body mb-6">
                    Die folgenden Richtwerte dienen zur Orientierung und beziehen sich auf Umzüge nach oder von Uster. Die tatsächlichen Kosten können je nach individueller Situation variieren.
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
                              <th className="px-4 py-3 text-left heading-4 border-b border-gray-200 w-2/3">Umzugswagen und Zügelmänner (ca. 25 mÂ³)</th>
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

              {/* Why Uster Section */}
              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200 mb-12">
                  <h2 className="heading-2 mb-6">Warum nach Uster umziehen?</h2>
                  <p className="text-body mb-6">
                    Uster bietet eine einzigartige Kombination aus urbanem Leben und natürlicher Umgebung. Die drittgrösste Stadt im Kanton Zürich liegt am Greifensee und zieht Familien, Berufstätige und Naturliebhaber gleichermassen an. Hier sind die wichtigsten Gründe, warum viele Menschen nach Uster umziehen:
                  </p>
                  <ul className="space-y-3 text-body list-disc list-inside ml-4 mb-6">
                    <li><strong>Greifensee-Lage:</strong> Die Nähe zum See bietet vielfältige Freizeitmöglichkeiten und eine hohe Lebensqualität</li>
                    <li><strong>Günstige Wohnkosten:</strong> Im Vergleich zu Zürich sind die Mieten in Uster deutlich niedriger, bei guter Erreichbarkeit</li>
                    <li><strong>Moderne Infrastruktur:</strong> Die Stadt investiert kontinuierlich in Schulen, Einkaufsmöglichkeiten und öffentliche Einrichtungen</li>
                    <li><strong>Gute Verkehrsanbindung:</strong> Uster ist gut an das Verkehrsnetz angebunden und bietet direkte Verbindungen nach Zürich</li>
                    <li><strong>Wachsendes Angebot:</strong> Neue Wohngebiete entstehen, die moderne Wohnformen zu attraktiven Preisen bieten</li>
                  </ul>
                  <p className="text-body">
                    Wenn Sie nach Uster umziehen möchten, helfen Ihnen unsere Partnerfirmen dabei, den Umzug reibungslos zu gestalten. Sie kennen die verschiedenen Quartiere und können Ihnen bei der Planung Ihres Umzugs in die Greifensee-Region helfen.
                  </p>
                </article>

              {/* How It Works Section */}
              <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100 mb-12 overflow-x-hidden">
                  <div className="container mx-auto max-w-7xl px-4 md:px-6 w-full">
                    <div className="text-center mb-12">
                      <h2 className="heading-2 mb-4">
                        So einfach funktioniert Ihr Umzug nach Uster
                      </h2>
                      <p className="text-body max-w-2xl mx-auto">
                        Planen Sie einen Umzug nach Uster? Füllen Sie das Formular aus, und wir bringen Sie mit den besten Umzugsfirmen aus Ihrer Umgebung zusammen. Vergleichen Sie mehrere Offerten kostenlos.
                      </p>
                    </div>
                    
                    <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 scrollbar-hide">
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                          <FileText className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="heading-3 mb-4">1. Formular ausfüllen</h3>
                        <p className="text-body">
                          Beschreiben Sie Ihren geplanten Umzug nach Uster. Geben Sie Umzugsdatum, Wohnungsgrösse und gewünschte Leistungen an. Das dauert nur wenige Minuten.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                          <Mail className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="heading-3 mb-4">2. Offerten erhalten</h3>
                        <p className="text-body">
                          Wir leiten Ihre Anfrage an geprüfte Umzugsfirmen aus der Greifensee-Region weiter. Innerhalb von 24-48 Stunden erhalten Sie mehrere detaillierte Offerten per E-Mail.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                          <BarChart3 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="heading-3 mb-4">3. Vergleichen & buchen</h3>
                        <p className="text-body">
                          Vergleichen Sie die Offerten in Ruhe. Wählen Sie die Umzugsfirma, die am besten zu Ihren Bedürfnissen passt, und sparen Sie bis zu 40% bei Ihrem Umzug nach Uster.
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
                          Jetzt Offerten für Uster anfordern
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
                Häufige Fragen zu Umzügen nach Uster
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                Antworten auf die wichtigsten Fragen rund um Ihren Umzug nach oder von Uster
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {usterFAQs.map((faq, index) => (
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
                Bereit für Ihren Umzug nach Uster?
              </h4>
              <p className="text-body-white mb-8">
                Planen Sie einen Umzug nach Uster? Füllen Sie jetzt das Formular aus und lassen Sie sich von den besten Umzugsfirmen aus Ihrer Umgebung beraten. Vergleichen Sie mehrere Offerten kostenlos und unverbindlich. Sparen Sie Zeit und Geld bei Ihrem Umzug in die Greifensee-Region.
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


