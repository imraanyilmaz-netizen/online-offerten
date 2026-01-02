import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Calculator, FileText, Mail, BarChart3, MapPin, Building, Star } from 'lucide-react'
import ServiceGrid from '@/components/pages/locations/ServiceGrid.client'
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import { cityServiceData } from '@/data/cityLocalBusinessData'
import { Button } from '@/components/ui/button'
import CantonFlag from '@/components/CantonFlag'
import { locations } from '@/data/locations'

const city = "Zürich"
const cityData = cityServiceData[city] || {
  name: 'Zürich',
  displayName: 'Umzugsfirma Zürich – Online-Offerten.ch',
  addressLocality: 'Zürich',
  addressRegion: 'ZH',
  latitude: '47.3769',
  longitude: '8.5417',
  canonicalUrl: '/umzugsfirma-zuerich'
}
const canonicalUrl = '/umzugsfirma-zuerich'
const locationData = locations.find(loc => loc.name === city)
const imageUrl = '/image/umzugsservice-Schweiz/umzugsfirma-zurich.webp'

// Service Schema - Ensure all values are plain strings/numbers (no objects)
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": String(cityData?.displayName || `Umzugsfirmen in ${city}`),
  "description": "Geprüfte Umzugsfirmen und Zügelfirmen in Zürich vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen.",
  "serviceType": ["MovingCompany", "Moving and Storage", "CleaningService"],
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "areaServed": {
    "@type": "City",
    "name": String(city),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": String(cityData?.addressLocality || city),
      "addressRegion": String(cityData?.addressRegion || ""),
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": String(cityData?.latitude || "47.3769"),
      "longitude": String(cityData?.longitude || "8.5417")
    }
  },
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "offers": {
    "@type": "Offer",
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
    serviceSchema,
    faqSchema
  ]
}

// Cost table data
const costTableRows = [
  { size: "1.5 - 2 Zimmer", staff: "2 Zügelmänner, 1 LKW", cost: "850 – 1'600 CHF" },
  { size: "2.5 - 3 Zimmer", staff: "3 Zügelmänner, 1 LKW", cost: "1'400 – 2'300 CHF" },
  { size: "3.5 - 4.5 Zimmer", staff: "3-4 Zügelmänner, 1-2 LKW", cost: "1'900 – 3'200 CHF" },
  { size: "5.5+ Zimmer / Haus", staff: "4-5 Zügelmänner, 2 LKW", cost: "3'000 – 5'500+ CHF" }
]

const zurichCities = [
  { name: 'Winterthur', link: '/umzugsfirma-zuerich/winterthur', description: 'Zweitgrösste Stadt im Kanton Zürich' },
  { name: 'Uster', link: '/umzugsfirma-zuerich/uster', description: 'Drittgrösste Stadt im Kanton Zürich' },
  { name: 'Dietikon', link: '/umzugsfirma-zuerich/dietikon', description: 'Wichtiger Verkehrsknotenpunkt' },
  { name: 'Dübendorf', link: '/umzugsfirma-zuerich/duebendorf', description: 'Moderne Wohnstadt mit Flughafennähe' },
  { name: 'Schlieren', link: '/umzugsfirma-zuerich/schlieren', description: 'Wachsende Stadt im Limmattal' }
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
    canonical: 'https://online-offerten.ch/umzugsfirma-zuerich',
  },
  openGraph: {
    title: 'Umzugsfirma Zürich » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Umzugsfirma Zürich finden ✓ Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
    url: 'https://online-offerten.ch/umzugsfirma-zuerich',
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
        {/* Modern Hero Section */}
        <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left Content */}
              <div className="text-gray-900 lg:col-span-3">
                <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                  <CantonFlag canton={(locationData as any)?.canton} className="w-8 h-8 object-contain" />
                  <span className="text-sm font-medium text-gray-700">Kanton Zürich</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                  <span className="block">Umzugsfirma Zürich</span>
                  <span className="block text-green-600 mt-2">Geprüfte Anbieter vergleichen</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl">
                  Finden Sie die besten <strong className="text-gray-900">Umzugsdienstleister</strong> und <strong>Zügelunternehmen im Kanton Zürich</strong> für Ihren Umzug. Vergleichen Sie kostenlos mehrere <strong>geprüfte Partner nach Schweizer Standards</strong> in <strong>Zürich</strong>, <strong>Winterthur</strong>, <strong>Uster</strong> und der ganzen Region. Professionelle <strong>Transportunternehmen für Umzüge</strong> und <strong>regionale Zügelprofis</strong> bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug, Auslandumzug und Spezialtransporte. Alle Partner sind <strong>versichert gemäss OR</strong>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
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
                    className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 px-8 py-6 text-lg rounded-lg shadow-sm hover:shadow-md"
                  >
                    <Link href="/umzugskosten-rechner">
                      <Calculator className="w-5 h-5 mr-2" />
                      Kosten berechnen
                    </Link>
                  </Button>
                </div>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">100% kostenlos</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Geprüfte Partner</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Bis zu 40% sparen</span>
                  </div>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 lg:col-span-2">
                <Image
                  src={imageUrl}
                  alt="Professionelle Zügelfirma in Zürich - Umzugsunternehmen bei der Arbeit"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Selection Cards */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-gray-200">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Wählen Sie Ihre gewünschte Dienstleistung
            </h2>
            <ServiceGrid city={city} />
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                So funktioniert's: Ihr Umzug in Zürich leicht gemacht
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                In nur drei einfachen Schritten erhalten Sie mehrere Offerten von geprüften <strong>Umzugsfirmen in Zürich</strong> und <strong>Zügelfirmen</strong> aus Zürich
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Anfrage ausfüllen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Beschreiben Sie Ihren Umzug in Zürich in unserem Formular. Geben Sie Umzugsvolumen, Datum und gewünschte Leistungen an.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Offerten erhalten</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wir leiten Ihre Anfrage an geprüfte Umzugsfirmen in Zürich und Zügelfirmen aus Zürich weiter. Sie erhalten innerhalb von 24-48 Stunden mehrere Offerten.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Vergleichen & sparen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Vergleichen Sie die erhaltenen Offerten in Bezug auf Preis, Leistung und Bewertungen. Wählen Sie die passende Umzugsfirma Zürich aus und sparen Sie bis zu 40%!
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
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <main className="space-y-12">
              {/* Introduction */}
              <article>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Umzug im Kanton Zürich – Professionelle Anbieter vergleichen
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Zürich</strong>, die grösste Stadt der Schweiz, ist ein Anziehungspunkt für Menschen aus aller Welt. Ein Umzug in dieser dynamischen Metropole birgt jedoch besondere Herausforderungen. Dichter Verkehr, komplexe Parkregelungen und die Vielfalt der Wohnlagen – von Altstadtwohnungen bis zu modernen Neubauten am Stadtrand – machen die Wahl der richtigen Umzugsfirma zur wichtigsten Entscheidung Ihres Umzugsprojekts. Ein professionelles Umzugsunternehmen ist nicht nur ein Transportdienstleister; es ist Ihr Projektmanager, Logistikpartner und Problemlöser in einem. Ein Umzug in dieser Region – ob nach <Link href="/umzugsfirma-zuerich/winterthur" className="text-green-600 hover:text-green-800 underline font-semibold">Winterthur</Link>, <Link href="/umzugsfirma-zuerich/uster" className="text-green-600 hover:text-green-800 underline font-semibold">Uster</Link>, <Link href="/umzugsfirma-zuerich/dietikon" className="text-green-600 hover:text-green-800 underline font-semibold">Dietikon</Link>, <Link href="/umzugsfirma-zuerich/duebendorf" className="text-green-600 hover:text-green-800 underline font-semibold">Dübendorf</Link> oder in eine der vielen charmanten Gemeinden – erfordert einen professionellen <strong>Umzugsdienstleister</strong> oder <strong>Zügelunternehmen</strong>, der die Besonderheiten der Region kennt.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Erfahrene <strong>Transportunternehmen für Umzüge</strong> im Kanton Zürich kennen die Verkehrswege, die Parkregelungen in den historischen Altstädten und die logistischen Herausforderungen der Region. Über unser Portal können Sie mehrere <strong>geprüfte Partner nach Schweizer Standards</strong> vergleichen und die beste Lösung für Ihr Projekt finden. Professionelle <strong>regionale Zügelprofis</strong> kümmern sich um die Organisation von Halteverbotszonen, planen die schnellste Route und stellen sicher, dass Ihr Hab und Gut sicher und unversehrt im neuen Zuhause ankommt. Alle Partner sind <strong>versichert gemäss OR</strong> und verfügen über langjährige Erfahrung.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Der Vergleich mehrerer Anbieter gibt Ihnen die Sicherheit, einen geprüften und versicherten <strong>Umzugspartner im Kanton Zürich</strong> zu finden, der Ihren Ansprüchen gerecht wird. Durch den direkten Vergleich finden Sie das beste Preis-Leistungs-Verhältnis und sparen dabei erheblich. Unser <strong>Schweizer Kundenservice</strong> steht Ihnen bei allen Fragen zur Verfügung.
                  </p>
                </div>
              </article>
            </main>
          </div>
        </section>

        {/* Main Content Section - Continue */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <main className="space-y-12">
              {/* Pricing Table */}
              <article>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Umzugskosten im Kanton Zürich</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Die Umzugskosten im Kanton Zürich gehören zu den höchsten der Schweiz, lassen sich aber mit der richtigen Planung optimieren. Durch den Vergleich mehrerer <strong>geprüfter Partner nach Schweizer Standards</strong> finden Sie das beste Angebot und sparen bis zu 40%. Alle Anbieter sind <strong>versichert gemäss OR</strong> und verfügen über umfassende Erfahrung. Die Kosten hängen von vielen Variablen ab. Unsere Preistabelle gibt Ihnen eine realistische Einschätzung für einen Umzug innerhalb des Kantons Zürich. Für eine detaillierte Kostenberechnung nutzen Sie unseren <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten-Rechner</Link>, der Ihnen in nur 2 Minuten eine verlässliche Preis-Schätzung liefert.
                </p>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Detaillierte Kostenschätzung für Ihren Zürich-Umzug</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">Wohnungsgrösse</th>
                          <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">Personal & LKW</th>
                          <th className="px-6 py-4 text-right font-semibold text-gray-900 border-b border-gray-200">Geschätzte Kosten (CHF)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costTableRows.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 border-b border-gray-100 text-gray-700">{row.size}</td>
                            <td className="px-6 py-4 border-b border-gray-100 text-gray-700">{row.staff}</td>
                            <td className="px-6 py-4 border-b border-gray-100 text-right font-semibold text-green-600">{row.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-600 italic">
                      Hinweis: Diese Preise sind Schätzungen für Umzüge innerhalb des Kantons Zürich. Faktoren wie Stockwerk, Liftverfügbarkeit, Distanz und Zusatzleistungen beeinflussen den Endpreis. Für eine exakte Kalkulation nutzen Sie unseren <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten-Rechner</Link>.
                    </p>
                  </div>
                </div>
              </article>

              {/* Zürich Cities */}
              <article>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Städte & Regionen im Kanton Zürich</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Der Kanton Zürich bietet eine vielfältige Landschaft mit historischen Städten, idyllischen Dörfern und modernen Wirtschaftszentren. Unsere Partner-<strong>Umzugsdienstleister</strong> und <strong>regionale Zügelprofis</strong> sind in der ganzen Region aktiv. Alle verfügen über umfassende Erfahrung und sind <strong>geprüfte Partner nach Schweizer Standards</strong>. Erfahren Sie mehr über <Link href="/umzugsfirma-zuerich/winterthur" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsfirma in Winterthur</Link>, <Link href="/umzugsfirma-zuerich/uster" className="text-green-600 hover:text-green-800 underline font-semibold">Zügelfirmen in Uster finden</Link>, <Link href="/umzugsfirma-zuerich/dietikon" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsunternehmen Dietikon</Link>, <Link href="/umzugsfirma-zuerich/duebendorf" className="text-green-600 hover:text-green-800 underline font-semibold">Professionelle Umzugshilfe in Dübendorf</Link> und <Link href="/umzugsfirma-zuerich/schlieren" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsservice Schlieren</Link>:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {zurichCities.map((cityItem, index) => (
                    <Link
                      key={index}
                      href={cityItem.link}
                      className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg"
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
              </article>

              {/* Umzug in Winterthur Section */}
              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Umzug in Winterthur – Günstige Umzugsfirmen vergleichen & sparen
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Planen Sie einen Umzug in Winterthur oder Umgebung? Auf <strong>online-offerten.ch</strong> können Sie schnell und unkompliziert mehrere kostenlose Offerten von geprüften <strong>Umzugsfirmen in Winterthur</strong> anfordern. Vergleichen Sie Preise und Leistungen und finden Sie das passende <strong>Zügelunternehmen</strong> – egal ob für einen Privatumzug, Firmenumzug oder Seniorenumzug.
                </p>
                
                <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Stressfreier Umzug in Winterthur – Einfach & digital organisiert
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Mit unserem modernen Vergleichsportal wird die Umzugsplanung in Winterthur besonders einfach. Beschreiben Sie Ihr Umzugsprojekt in wenigen Minuten und erhalten Sie daraufhin passende Angebote von erfahrenen <strong>Umzugsunternehmen aus der Region Winterthur</strong>. Transparent, zeitsparend und ohne Verpflichtung.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Warum sich ein Vergleich von Umzugsfirmen in Winterthur lohnt
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ein professioneller Umzug in Winterthur sorgt für Sicherheit, Effizienz und einen reibungslosen Ablauf. Durch den direkten Vergleich mehrerer Offerten vermeiden Sie unnötige Mehrkosten und profitieren von fairen Preisen lokaler Anbieter. So lassen sich <strong>bis zu 40 % der Umzugskosten sparen</strong>.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Umzugsservice in Winterthur – Flexible Leistungen nach Bedarf
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Umzugsfirmen in Winterthur</strong> bieten individuelle Lösungen für jedes Umzugsprojekt:
                  </p>
                  <ul className="space-y-3 text-gray-700 list-disc list-inside ml-4">
                    <li><strong>Full-Service-Umzug:</strong> Verpacken, Transport, Möbelmontage</li>
                    <li><strong>Teilumzug:</strong> Nur Transport oder Unterstützung beim Packen</li>
                    <li><strong>Spezialumzüge:</strong> Klavier, Tresor, Antiquitäten oder Kunstobjekte</li>
                    <li><strong>Zusatzleistungen:</strong> Umzugsreinigung, Entsorgung, Möbellagerung</li>
                    <li><strong>Versicherungsschutz:</strong> Absicherung Ihres gesamten Umzugsguts</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Sie entscheiden selbst, welche Leistungen Sie für Ihren <strong>Umzug in Winterthur</strong> benötigen.
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
                      <span className="text-gray-700"><strong>Geprüfte Umzugsfirmen aus Winterthur</strong> und Umgebung</span>
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

                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Jetzt Umzugsofferten für Winterthur erhalten
                  </h3>
                  <p className="text-lg text-green-50 mb-6 max-w-2xl mx-auto">
                    Füllen Sie unser einfaches Online-Formular aus und erhalten Sie passende Offerten von zuverlässigen <strong>Umzugsfirmen in Winterthur</strong>. Unser Service ist kostenlos – Kosten entstehen erst, wenn Sie sich für ein Angebot entscheiden. Ob innerhalb von Winterthur, in einen anderen Kanton oder ins Ausland: Wir finden den richtigen Umzugspartner für Sie.
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                    >
                      <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Winterthur" className="inline-flex items-center">
                        Kostenlose Winterthur-Offerten anfordern
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
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
                    Nutzen Sie unseren <Link href="/umzugskosten-rechner" className="text-blue-600 hover:text-blue-800 underline font-semibold">Umzugskosten-Rechner</Link> für eine detaillierte Schätzung Ihrer Umzugskosten im Kanton Zürich. In nur 2 Minuten erhalten Sie eine realistische Preis-Einschätzung.
                  </p>
                  <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Link href="/umzugskosten-rechner">
                      Jetzt Kosten berechnen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </article>

              {/* Services Overview */}
              <article>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Leistungen der Umzugsfirmen</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Moderne <strong>Umzugsdienstleister</strong> und <strong>Zügelunternehmen</strong> bieten viel mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen. Alle Partner verfügen über umfassende Erfahrung und sind <strong>versichert gemäss OR</strong>:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: 'Home', title: 'Privatumzug', link: '/privatumzug', desc: 'Wohnungswechsel individuell' },
                    { icon: 'Building', title: 'Geschäftsumzug', link: '/geschaeftsumzug', desc: 'Büro- und Firmenumzug' },
                    { icon: 'Globe', title: 'Internationale Umzüge', link: '/internationale-umzuege', desc: 'Umzug ins Ausland' },
                    { icon: 'Package', title: 'Spezialtransporte', link: '/spezialtransporte', desc: 'Klavier, Tresor, Maschinen' },
                    { icon: 'Sparkles', title: 'Reinigung', link: '/reinigung', desc: 'Umzugsreinigung & mehr' },
                    { icon: 'Sparkles', title: 'Umzugsreinigung', link: '/umzugsreinigung', desc: 'Mit Abnahmegarantie' },
                    { icon: 'MapPin', title: 'Möbellagerung', link: '/umzugsfirma-zuerich', desc: 'Sichere Zwischenlagerung' }
                  ].map((service, index) => (
                    <Link
                      key={index}
                      href={service.link}
                      className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg"
                    >
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.desc}</p>
                    </Link>
                  ))}
                </div>
              </article>

              {/* Checklist */}
              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkliste für die perfekte Wahl</h2>
                <p className="text-gray-700 mb-6">
                  Lassen Sie sich nicht von der erstbesten Offerte überzeugen. Vergleichen Sie mehrere <strong>Umzugsdienstleister</strong> und <strong>Transportunternehmen für Umzüge</strong>. Eine gründliche Prüfung ist entscheidend für die beste Wahl. Achten Sie auf <strong>geprüfte Partner nach Schweizer Standards</strong> und <strong>versichert gemäss OR</strong>.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Detaillierte Offerten einholen', text: 'Eine seriöse Offerte von einer Zügelfirma ist mehr als nur eine Zahl. Sie sollte alle Posten detailliert auflisten: Stundensätze, Mitarbeiterzahl, Fahrzeuggrösse, Versicherung und alle gebuchten Zusatzleistungen.' },
                    { title: 'Versicherungsschutz prüfen', text: 'Eine ausreichende Transport- und Betriebshaftpflichtversicherung ist nicht verhandelbar. Professionelle Umzugsdienstleister sind versichert gemäss OR und bis 100\'000 CHF versichert.' },
                    { title: 'Bewertungen und Referenzen analysieren', text: 'Lesen Sie authentische Kundenbewertungen auf unserem Portal. Achten Sie auf Kommentare zu Pünktlichkeit, Sorgfalt und Teamfreundlichkeit. Unsere Partner verfügen über umfassende Erfahrung in der Vermittlung von Umzügen im Kanton Zürich.' },
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

              {/* Why Zürich Section */}
              <article>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Warum regionale Zügelprofis wählen?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: MapPin, title: 'Wirtschaftsstandort', text: <>Zürich ist das wichtigste Wirtschaftszentrum der Schweiz. <strong>Umzugspartner im Kanton Zürich</strong> kennen die besten Routen und können auch komplexe Geschäftsumzüge effizient abwickeln. Alle Partner sind <strong>geprüfte Partner nach Schweizer Standards</strong>.</> },
                    { icon: Building, title: 'Vielfältige Wohnlagen', text: <>Von historischen Altstadtwohnungen über moderne Neubauten bis zu idyllischen Vororten – erfahrene <strong>Umzugsdienstleister</strong> kennen die Besonderheiten jeder Wohnlage. Durch langjährige Erfahrung in der Vermittlung von Umzügen können wir professionelle Abwicklung sicherstellen.</> },
                    { icon: TrendingUp, title: 'Internationale Verbindungen', text: <>Zürich ist ein wichtiger internationaler Standort. <strong>Transportunternehmen für Umzüge</strong> haben Erfahrung mit Geschäftsumzügen und können auch komplexe Firmenumzüge professionell abwickeln. Alle sind <strong>versichert gemäss OR</strong>.</> },
                    { icon: Star, title: 'Lebensqualität', text: <>Zürich bietet hohe Lebensqualität und eine vielfältige Kultur. Lokale <strong>Zügelunternehmen im Kanton Zürich</strong> können Ihnen helfen, diese Vorteile optimal zu nutzen. Unser <strong>Schweizer Kundenservice</strong> steht Ihnen zur Verfügung.</> }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors">
                        <Icon className="w-10 h-10 text-green-600 mb-4" />
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </article>

              {/* CTA Section */}
              <article className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bereit für Ihren Umzug im Kanton Zürich?
                </h2>
                <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
                  Starten Sie jetzt Ihre Anfrage und erhalten Sie in Kürze bis zu 5 Offerten von geprüften <strong>Umzugsfirmen im Kanton Zürich</strong> und Zügelfirmen aus dem Kanton Zürich.
                </p>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                >
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Zürich">
                    Kostenlose Zürich-Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </article>
            </main>
          </div>
        </section>


        {/* Benefits Section - Full Width */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <article className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-10 border border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Umzug in Zürich – Ihre Vorteile in 3 einfachen Schritten
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Stressfrei und professionell durchführen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ein geplanter Umzug in Zürich spart nicht nur Zeit, sondern auch Nerven. Unsere geprüften Partner-<strong>Zügelfirmen</strong> übernehmen den kompletten Ablauf – vom Einpacken bis zum sicheren Transport.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Lokale Umzugsdienstleister für schnelle Abläufe</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Unsere <strong>Zügelunternehmen in Zürich</strong> kennen die Region, die Verkehrswege und regionale Besonderheiten. Lokale Expertise sorgt für einen reibungslosen Ablauf. Durch die Vermittlung von Umzügen in Zürich können wir professionelle Abwicklung sicherstellen.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Kostenlose Offerten vergleichen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Erhalten Sie gratis bis zu fünf Offerten von qualifizierten <strong>Transportunternehmen für Umzüge</strong> aus Zürich. Vergleichen Sie Preise, Leistungen und Bewertungen – unverbindlich und kostenlos. Alle Anbieter sind <strong>geprüfte Partner nach Schweizer Standards</strong>.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* FAQ Section - Zürich spezifisch */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Häufige Fragen zu Umzügen in Zürich
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Antworten auf die wichtigsten Fragen rund um Umzüge im Kanton Zürich
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Wie finde ich eine zuverlässige Umzugsfirma in Zürich?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen. Achten Sie auf lokale Erfahrung, besonders mit Umzügen in der Zürcher Innenstadt und den verschiedenen Quartieren. Seriöse Firmen kennen die Parkregelungen, können Halteverbotszonen organisieren und haben Erfahrung mit den typischen Herausforderungen Zürcher Umzüge.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Was kostet ein Umzug innerhalb von Zürich?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die Kosten variieren je nach Wohnungsgrösse, Distanz, Stockwerk und Zugänglichkeit. Ein Umzug innerhalb Zürichs kostet typischerweise zwischen 850 und 3'200 CHF für eine 3.5-Zimmer-Wohnung. Umzüge in höhere Stockwerke ohne Lift oder in die Altstadt können teurer sein. Vergleichen Sie mehrere Offerten, um das beste Angebot zu finden.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Gibt es Besonderheiten bei Umzügen in die Zürcher Altstadt?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ja, die engen Gassen, begrenzten Parkmöglichkeiten und die vielen Altstadtgebäude ohne Lift erfordern sorgfältige Planung. Professionelle Umzugsfirmen beantragen Halteverbotszonen rechtzeitig und verwenden geeignete Fahrzeuge für die Altstadt. Viele Gebäude haben steile Treppen, was den Transport in höhere Stockwerke beeinflusst.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Wie lange im Voraus sollte ich eine Umzugsfirma in Zürich buchen?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders für Umzüge in die Innenstadt oder während der Hauptumzugszeit (Monatsende). Kurzfristige Buchungen sind möglich, aber die Auswahl an verfügbaren Terminen ist dann begrenzter. Frühbucher erhalten oft bessere Konditionen.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Kann ich auch einen Umzug von Zürich nach Winterthur organisieren?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ja, viele Umzugsfirmen in Zürich bieten auch Umzüge in andere Städte im Kanton an, wie Winterthur, Uster oder Dietikon. Die kurze Distanz macht solche Umzüge oft kostengünstiger als erwartet. Vergleichen Sie mehrere Offerten, um das beste Angebot für Ihren Umzug innerhalb des Kantons zu finden.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Welche Versicherung benötige ich für einen Umzug in Zürich?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Professionelle Umzugsfirmen in Zürich sind versichert gemäss OR und verfügen über Transport- und Betriebshaftpflichtversicherung. Zusätzlich können Sie eine Umzugsversicherung für wertvolle Gegenstände abschliessen. Fragen Sie nach dem Versicherungsschutz und prüfen Sie, ob Ihre Hausratversicherung den Umzug abdeckt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </section>
      </div>
    </>
  )
}
