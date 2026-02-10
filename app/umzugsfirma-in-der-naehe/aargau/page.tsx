import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Calculator, FileText, Mail, BarChart3, MapPin, Building, Star, ChevronRight } from 'lucide-react'
import ServiceGrid from '@/components/pages/locations/ServiceGrid.client'
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import { cityServiceData } from '@/data/cityLocalBusinessData'
import { locations } from '@/data/locations'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { createStaticClient } from '@/lib/supabase/server'

export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Aargau"
const cityData = cityServiceData[city] || {
  name: 'Aargau',
  displayName: 'Zügelfirma Aargau – Online-Offerten.ch',
  addressLocality: 'Aarau',
  addressRegion: 'AG',
  latitude: '47.3925',
  longitude: '8.0447',
  canonicalUrl: '/umzugsfirma-in-der-naehe/aargau'
}
const canonicalUrl = '/umzugsfirma-in-der-naehe/aargau'
const locationData = locations.find(loc => loc.name === city)
const imageUrl = '/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp'

// Service Schema - Enhanced for rich results & clarification as comparison platform
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Aargau – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen und Umzugsunternehmen im Kanton Aargau. Kostenlos bis zu 5 Offerten anfordern, Preise vergleichen und bis zu 40% sparen. Online-Offerten.ch ist Ihre Vergleichsplattform für Umzugsdienstleistungen in Aarau, Baden, Zofingen und der ganzen Region.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.avif",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz. Wir vermitteln kostenlose Offerten von geprüften Anbietern.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["German"]
    }
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Kanton Aargau",
    "containedInPlace": {
      "@type": "Country",
      "name": "Switzerland",
      "alternateName": "Schweiz"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Umzugsdienstleistungen im Aargau",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Privatumzug Aargau"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Geschäftsumzug Aargau"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Internationale Umzüge ab Aargau"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Spezialtransporte Aargau"
        }
      }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Umzugsofferten vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen im Aargau erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Unternehmen, die im Kanton Aargau umziehen möchten"
  }
}

// FAQ Schema - Aargau spezifische FAQs
const aargauFAQs = [
  {
    question: "Wie finde ich eine seriöse Umzugsfirma im Aargau?",
    answer: "Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen im Aargau. Achten Sie auf lokale Erfahrung, besonders mit Umzügen in historischen Städten wie Aarau oder Baden. Seriöse Firmen kennen die Besonderheiten der Aargauer Altstädte mit ihren Riegelhäusern und engen Gassen und können Umzüge professionell planen."
  },
  {
    question: "Was kostet ein Umzug innerhalb des Aargaus?",
    answer: "Die Kosten hängen von Wohnungsgrösse, Distanz, Stockwerk und Zugänglichkeit ab. Ein Umzug innerhalb des Aargaus kostet typischerweise zwischen 600 und 2'800 CHF für eine 3.5-Zimmer-Wohnung. Die zentrale Lage zwischen Zürich, Basel und Bern macht den Aargau zu einer kostengünstigen Region für Umzüge."
  },
  {
    question: "Gibt es Besonderheiten bei Umzügen in Aargauer Altstädte?",
    answer: "Ja, die historischen Altstädte mit ihren typischen Riegelhäusern und engen Gassen erfordern besondere Sorgfalt. Viele Gebäude haben keine Lifts, und die engen Durchfahrten erfordern kleinere Fahrzeuge. Professionelle Umzugsfirmen beantragen Halteverbotszonen rechtzeitig und verwenden geeignete Ausrüstung für Altstadtumzüge."
  },
  {
    question: "Wie lange im Voraus sollte ich eine Umzugsfirma im Aargau buchen?",
    answer: "Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders für Umzüge in die Altstädte von Aarau, Baden oder Zofingen. Kurzfristige Buchungen sind möglich, aber die Auswahl an verfügbaren Terminen ist dann begrenzter. Frühbucher profitieren oft von besseren Konditionen."
  },
  {
    question: "Kann ich auch einen Umzug von Aarau nach Baden organisieren?",
    answer: "Ja, viele Umzugsfirmen im Aargau bieten Umzüge zwischen den verschiedenen Städten im Kanton an, wie von Aarau nach Baden, Zofingen oder Brugg. Die kurzen Distanzen innerhalb des Aargaus machen solche Umzüge oft kostengünstiger. Vergleichen Sie mehrere Offerten für den besten Preis."
  },
  {
    question: "Welche Vorteile bietet ein Umzug in den Aargau?",
    answer: "Der Aargau bietet eine ideale Balance zwischen zentraler Lage und moderaten Lebenshaltungskosten. Die Nähe zu Zürich, Basel und Bern ermöglicht flexible Arbeitsstandorte, während die Wohnkosten deutlich niedriger sind. Familien schätzen die hohe Lebensqualität, gute Schulen und die Nähe zur Natur."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": aargauFAQs.map(faq => ({
    "@type": "Question",
    "name": String(faq.question),
    "acceptedAnswer": {
      "@type": "Answer",
      "text": String(faq.answer)
    }
  }))
}

// WebPage Schema - Clarifies page purpose
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Umzugsfirma in Aargau – Kostenlos Umzugsofferten vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen im Kanton Aargau. Kostenlos Offerten von geprüften Umzugsunternehmen in Aarau, Baden, Zofingen anfordern und Umzugskosten sparen.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": {
    "@type": "Thing",
    "name": "Umzugsfirmen im Aargau vergleichen"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description"]
  },
  "lastReviewed": new Date().toISOString().split('T')[0]
}

// Combined Schema
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Startseite",
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
          "name": "Umzugsfirma Aargau",
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
  { size: "1.5-Zimmer-Wohnung", cost: "CHF 620 - 660" },
  { size: "2.5-Zimmer-Wohnung", cost: "CHF 660 - 980" },
  { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'080 - 1'250" },
  { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'420 - 1'890" },
  { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'980 - 2'490" },
  { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'490 - 3'150" }
]

const aargauCities = [
  { name: 'Aarau', link: '/umzugsfirma-in-der-naehe/aargau/aarau', description: 'Kantonshauptstadt mit historischem Charme' },
  { name: 'Baden', link: '/umzugsfirma-in-der-naehe/aargau/baden', description: 'Thermenstadt im Limmattal' },
  { name: 'Zofingen', link: '/umzugsfirma-in-der-naehe/aargau/zofingen', description: 'Schöne Altstadt im Oberaargau' },
  { name: 'Brugg', link: '/umzugsfirma-in-der-naehe/aargau/brugg', description: 'Verkehrsknotenpunkt am Aareufer' },
  { name: 'Wettingen', link: '/umzugsfirma-in-der-naehe/aargau/wettingen', description: 'Klosterstadt im Limmattal' }
]

const savingsTips = [
  "Antizyklisch umziehen: Meiden Sie Monatsenden und Wochenenden. Ein Umzug an einem Dienstag oder Mittwoch kann die Kosten um 20-30% senken.",
  "Strategisch selbst anpacken: Packen Sie Kisten selbst und demontieren Sie einfache Möbel. Das reduziert die teuren Arbeitsstunden der Profis.",
  "Frühbucher-Rabatte nutzen: Planen Sie mindestens 2-3 Monate im Voraus. Viele Umzugsfirmen im Aargau bieten bessere Konditionen für frühe Buchungen.",
  "Minimalismus-Prinzip anwenden: Ein Umzug ist die perfekte Gelegenheit zum Entrümpeln. Jedes Kilo weniger spart bares Geld.",
  "Gratis-Zügelmaterial verwenden: Fragen Sie in Supermärkten, Apotheken oder im Freundeskreis nach stabilen Bananen- oder Kopierpapierkisten.",
  "Lokale Umzugsfirmen bevorzugen: Umzugsfirmen im Aargau kennen die Region, sparen Fahrtkosten und bieten oft bessere Preise."
]

// Fetch partners for Aargau - Only Umzug companies
async function getAargauPartners() {
  try {
    const supabase = createStaticClient()
    
    const { data: umzugPartners, error } = await supabase
      .from('partners')
      .select('id, company_name, slug, address_city, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active')
      .not('company_name', 'is', null)
      .contains('main_categories', ['umzug'])
    
    if (error) {
      console.error('Error fetching Aargau partners:', error)
      return []
    }
    
    if (!umzugPartners || umzugPartners.length === 0) {
      return []
    }
    
    // Filter for Aargau region
    const aargauPartners = umzugPartners.filter((partner: any) => {
      const partnerCity = partner.address_city?.toLowerCase() || ''
      const cityMatch = partnerCity.includes('aarau') || partnerCity.includes('baden') || partnerCity.includes('aargau') || partnerCity.includes('zofingen') || partnerCity.includes('brugg') || partnerCity.includes('wettingen') || partnerCity.includes('wohlen') || partnerCity.includes('lenzburg')
      
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => 
          typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase()
        )
        regionMatch = regions.some((r: string) => {
          if (r === 'aargau' || r === 'ag') return true
          if (r.includes('aargau')) return true
          if (r === 'kanton aargau') return true
          if (r === 'deutschschweiz' || r.includes('deutschschweiz')) return true
          return false
        })
      }
      
      return cityMatch || regionMatch
    })
    
    // Sort by rating
    aargauPartners.sort((a: any, b: any) => {
      const ratingA = a.average_rating || 0
      const ratingB = b.average_rating || 0
      if (ratingB !== ratingA) return ratingB - ratingA
      return (b.review_count || 0) - (a.review_count || 0)
    })
    
    return aargauPartners.slice(0, 12)
  } catch (error) {
    console.error('Error in getAargauPartners:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma in Aargau – Kostenlos Umzugsofferten vergleichen',
  description: 'Umzugsfirma im Aargau gesucht? ✓ Geprüfte Umzugsunternehmen in Aarau, Baden, Zofingen vergleichen ✓ Kostenlos bis zu 5 Offerten anfordern ✓ Bis zu 40% sparen bei Privat- & Geschäftsumzug im Kanton Aargau.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/aargau',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/aargau',
      'x-default': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/aargau',
    },
  },
  openGraph: {
    title: 'Umzugsfirma Aargau: Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen im Aargau. Kostenlos bis zu 5 Offerten anfordern, Umzugskosten berechnen und den besten Anbieter für Ihren Umzug im Kanton Aargau finden.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/aargau',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Aargau – Umzugsunternehmen vergleichen auf Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Aargau: Top Umzugsunternehmen vergleichen & sparen',
    description: 'Geprüfte Umzugsfirmen im Aargau vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen beim Umzug im Kanton Aargau.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp'],
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

export default async function UmzugsfirmaAargauPage() {
  const aargauPartners = await getAargauPartners()
  
  // ItemList Schema for partner listings - helps Google show rich results
  const itemListSchema = aargauPartners && aargauPartners.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen im Aargau",
    "description": "Liste von geprüften Umzugsunternehmen im Kanton Aargau auf Online-Offerten.ch",
    "numberOfItems": aargauPartners.length,
    "itemListElement": aargauPartners.map((partner: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": partner.company_name,
        "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": partner.address_city || "Aarau",
          "addressRegion": "AG",
          "addressCountry": "CH"
        },
        ...(partner.review_count > 0 && partner.average_rating > 0 && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": partner.average_rating.toString(),
            "reviewCount": partner.review_count.toString(),
            "bestRating": "5",
            "worstRating": "1"
          }
        }),
        ...(partner.message && {
          "description": partner.message.substring(0, 160)
        })
      }
    }))
  } : null

  return (
    <>
      {/* Schema.org Structured Data - Server-side rendered for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema)
        }}
      />
      {/* ItemList Schema for Partner Listings - Rich Results */}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListSchema)
          }}
        />
      )}
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
          
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb Navigation - Matches BreadcrumbList schema */}
            <nav className="mb-4 pt-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">
                    Startseite
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
                  Umzugsfirma Aargau
                </li>
              </ol>
            </nav>
            
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left Content */}
              <div className="text-gray-900 lg:col-span-3">
                <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                  <span className="text-sm font-medium text-gray-700">Kanton Aargau</span>
                </div>
                
                <h1 className="typography-h1 mb-6">
                  Umzugsfirma in Aargau – Kostenlos Umzugsofferten vergleichen
                </h1>
                
                <p className="typography-p mb-8 max-w-2xl">
                  Finden Sie die besten <strong className="text-gray-900">Umzugsdienstleister</strong> und <strong>Zügelunternehmen im Kanton Aargau</strong> für Ihren Umzug. Vergleichen Sie kostenlos mehrere <strong>geprüfte Partner nach Schweizer Standards</strong> in <strong>Aarau</strong>, <strong>Baden</strong>, <strong>Zofingen</strong> und der ganzen Region. Professionelle <strong>Transportunternehmen für Umzüge</strong> und <strong>regionale Zügelprofis</strong> bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug, Auslandumzug und Spezialtransporte. Alle Partner sind <strong>versichert gemäss OR</strong>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aargau">
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
                    <Link href="/umzugskosten">
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
                  alt="Professionelle Zügelfirma im Aargau - Umzugsunternehmen bei der Arbeit"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Selection Cards */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-b border-gray-200 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="typography-h2 mb-4 text-gray-900" style={{ textAlign: 'center' }}>
                Wählen Sie Ihre gewünschte Dienstleistung
              </h2>
              <p className="typography-p max-w-2xl mx-auto text-gray-600" style={{ textAlign: 'center' }}>
                Professionelle Umzugsservices für jeden Bedarf – von Privatumzug bis Spezialtransport
              </p>
            </div>
            <ServiceGrid city={city} />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="typography-h2 mb-4" style={{ textAlign: 'left' }}>
                So funktioniert's: Ihr Umzug im Aargau leicht gemacht
              </h2>
              <p className="typography-p max-w-2xl mx-auto" style={{ textAlign: 'left' }}>
                In nur drei einfachen Schritten erhalten Sie mehrere Offerten von geprüften <strong>Umzugsfirmen im Aargau</strong> und <strong>Zügelfirmen</strong> aus dem Aargau
              </p>
            </div>
            
            {/* Mobile: Horizontal Scroll, Desktop: Grid */}
            <div className="overflow-x-auto scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0">
              <div className="flex md:grid md:grid-cols-3 gap-6 min-w-max md:min-w-0">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[65vw] md:w-auto min-w-[220px] md:min-w-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="typography-h3 mb-3">1. Anfrage ausfüllen</h3>
                  <p className="typography-p text-sm">
                    Beschreiben Sie Ihren Umzug im Aargau in unserem Formular. Geben Sie Umzugsvolumen, Datum und gewünschte Leistungen an.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[65vw] md:w-auto min-w-[220px] md:min-w-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="typography-h3 mb-3">2. Offerten erhalten</h3>
                  <p className="typography-p text-sm">
                    Wir leiten Ihre Anfrage an geprüfte Umzugsfirmen im Aargau und Zügelfirmen aus dem Aargau weiter. Sie erhalten innerhalb von 24-48 Stunden mehrere Offerten.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[65vw] md:w-auto min-w-[220px] md:min-w-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="typography-h3 mb-3">3. Vergleichen & sparen</h3>
                  <p className="typography-p text-sm">
                    Vergleichen Sie die erhaltenen Offerten in Bezug auf Preis, Leistung und Bewertungen. Wählen Sie die passende Umzugsfirma Aargau aus und sparen Sie bis zu 40%!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
              >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aargau">
                  Jetzt Offerten einholen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Geprüfte Umzugsfirmen in Aargau - Partner Liste */}
        {aargauPartners && aargauPartners.length > 0 && (
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="typography-h2 mb-4" style={{ textAlign: 'center' }}>
                  Geprüfte Umzugsfirmen in Aargau
                </h2>
                <p className="typography-p max-w-3xl mx-auto" style={{ textAlign: 'center' }}>
                  Unsere Partner sind erfahrene Umzugsunternehmen mit langjähriger Erfahrung im Kanton Aargau. Vergleichen Sie Profile, Bewertungen und fordern Sie kostenlose Offerten an.
                </p>
              </div>
              
              <div className="space-y-4">
                {aargauPartners.map((partner: any) => {
                  const rating = partner.average_rating || 0
                  const reviewCount = partner.review_count || 0
                  const partnerSlug = partner.slug || partner.id
                  
                  return (
                    <Link 
                      key={partner.id} 
                      href={`/partner/${partnerSlug}`}
                      className="group flex items-center gap-4 md:gap-6 bg-white rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 p-4 md:p-5"
                    >
                      {/* Logo */}
                      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center p-2 group-hover:border-green-300 transition-colors">
                        {partner.logo_url ? (
                          <Image
                            src={partner.logo_url}
                            alt={`${partner.company_name} logo`}
                            width={80}
                            height={80}
                            className="object-contain w-full h-full"
                            unoptimized
                          />
                        ) : (
                          <Image
                            src="/image/logo-icon.avif"
                            alt="Default logo"
                            width={80}
                            height={80}
                            className="object-contain w-full h-full"
                          />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors truncate">
                            {partner.company_name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 flex-shrink-0">
                            <MapPin className="w-4 h-4 mr-1 text-green-600" />
                            <span className="font-medium">Umzugsfirma in {city}</span>
                          </div>
                        </div>
                        
                        {/* Über uns - 30 Zeichen */}
                        {partner.message && (
                          <p className="text-sm text-gray-600 mt-1 truncate">
                            {partner.message.length > 100
                              ? `${partner.message.substring(0, 100)}...`
                              : partner.message
                            }
                          </p>
                        )}
                        
                        {/* Bewertungen */}
                        {reviewCount > 0 && (
                          <div className="flex items-center mt-2 gap-1">
                            <div className="flex items-center text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-700 font-semibold ml-1">{rating.toFixed(1)}</span>
                            <span className="text-xs text-gray-500">({reviewCount} Bewertungen)</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex-shrink-0 hidden md:flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-50 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                          <ArrowRight className="w-5 h-5 text-green-600 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* CTA */}
              <div className="mt-10 text-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                >
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aargau">
                    Kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Section */}
        <section className="py-16 md:py-24 bg-white" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="container mx-auto max-w-7xl px-4 md:px-6" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <main className="space-y-12">
              {/* Introduction */}
              <article>
                <h2 className="typography-h2 mb-6">
                  Umzug im Kanton Aargau – Professionelle Anbieter vergleichen
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="typography-p mb-4">
                    Der <strong>Aargau</strong>, liebevoll auch "Rüebliland" genannt, ist einer der schönsten und wirtschaftsstärksten Kantone der Schweiz. Mit seiner zentralen Lage zwischen Zürich, Basel und Bern ist der Aargau ein beliebter Wohn- und Wirtschaftsstandort. Ein Umzug in dieser Region – ob nach <Link href="/umzugsfirma-in-der-naehe/aargau/aarau" className="text-green-600 hover:text-green-800 underline font-semibold">Aarau</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/baden" className="text-green-600 hover:text-green-800 underline font-semibold">Baden</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/zofingen" className="text-green-600 hover:text-green-800 underline font-semibold">Zofingen</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/brugg" className="text-green-600 hover:text-green-800 underline font-semibold">Brugg</Link> oder in eine der vielen charmanten Gemeinden – erfordert einen professionellen <strong>Umzugsdienstleister</strong> oder <strong>Zügelunternehmen</strong>, der die Besonderheiten der Region kennt.
                  </p>
                  <p className="typography-p mb-4">
                    Erfahrene <strong>Transportunternehmen für Umzüge</strong> im Aargau kennen die Verkehrswege, die Parkregelungen in den historischen Altstädten und die logistischen Herausforderungen der Region. Über unser Portal können Sie mehrere <strong>geprüfte Partner nach Schweizer Standards</strong> vergleichen und die beste Lösung für Ihr Projekt finden. Professionelle <strong>regionale Zügelprofis</strong> kümmern sich um die Organisation von Halteverbotszonen, planen die schnellste Route und stellen sicher, dass Ihr Hab und Gut sicher und unversehrt im neuen Zuhause ankommt. Alle Partner sind <strong>versichert gemäss OR</strong> und verfügen über langjährige Erfahrung.
                  </p>
                  <p className="typography-p">
                    Der Vergleich mehrerer Anbieter gibt Ihnen die Sicherheit, einen geprüften und versicherten <strong>Umzugspartner im Aargau</strong> zu finden, der Ihren Ansprüchen gerecht wird. Durch den direkten Vergleich finden Sie das beste Preis-Leistungs-Verhältnis und sparen dabei erheblich. Unser <strong>Schweizer Kundenservice</strong> steht Ihnen bei allen Fragen zur Verfügung.
                  </p>
                </div>
              </article>
            </main>
          </div>
        </section>

        {/* Benefits Section - Full Width */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <article className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-10 border border-green-200">
              <h2 className="typography-h2 mb-6">
                Umzug im Aargau – Ihre Vorteile in 3 einfachen Schritten
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="typography-h3 mb-3">Stressfrei und professionell durchführen</h3>
                  <p className="typography-p">
                    Ein geplanter Umzug im Aargau spart nicht nur Zeit, sondern auch Nerven. Unsere geprüften Partner-<strong>Zügelfirmen</strong> übernehmen den kompletten Ablauf – vom Einpacken bis zum sicheren Transport.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <MapPin className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="typography-h3 mb-3">Lokale Umzugsdienstleister für schnelle Abläufe</h3>
                  <p className="typography-p">
                    Unsere <strong>Zügelunternehmen im Kanton Aargau</strong> kennen die Region, die Verkehrswege und regionale Besonderheiten. Lokale Expertise sorgt für einen reibungslosen Ablauf. Durch die Vermittlung von Umzügen im Aargau können wir professionelle Abwicklung sicherstellen.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="typography-h3 mb-3">Kostenlose Offerten vergleichen</h3>
                  <p className="typography-p">
                    Erhalten Sie gratis bis zu fünf Offerten von qualifizierten <strong>Transportunternehmen für Umzüge</strong> aus dem Aargau. Vergleichen Sie Preise, Leistungen und Bewertungen – unverbindlich und kostenlos. Alle Anbieter sind <strong>geprüfte Partner nach Schweizer Standards</strong>.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Main Content Section - Continue */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">
              {/* Pricing Table */}
              <article>
                <h2 className="typography-h2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in Aargau?</h2>
                <p className="typography-p mb-4">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Aargau richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="typography-p mb-6">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Aargau und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
                </p>
                
                {/* Hourly Rates Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                    <h3 className="typography-h3 text-white">Umzugspreise - Kosten pro Stunde</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left typography-h4 border-b border-gray-200">Umzugswagen und Zügelmänner (ca. 25 mÂ³)</th>
                          <th className="px-6 py-4 text-right typography-h4 border-b border-gray-200">Preis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hourlyRates.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 border-b border-gray-100 typography-p">{row.service}</td>
                            <td className="px-6 py-4 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Room Size Costs Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                    <h3 className="typography-h3 text-white">Umzugskosten nach Zimmergrössen</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left typography-h4 border-b border-gray-200">Anzahl Zimmer</th>
                          <th className="px-6 py-4 text-right typography-h4 border-b border-gray-200">Umzugskosten durchschnittlich (CHF)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costTableRows.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 border-b border-gray-100 typography-p">{row.size}</td>
                            <td className="px-6 py-4 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="typography-p text-gray-600 italic">
                      Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                    </p>
                  </div>
                </div>
              </article>

              {/* Aargau Cities */}
              <article>
                <h2 className="typography-h2 mb-6">Städte & Regionen im Aargau</h2>
                <p className="typography-p mb-6" style={{ textAlign: 'center' }}>
                  Der Aargau bietet eine vielfältige Landschaft mit historischen Städten, idyllischen Dörfern und modernen Wirtschaftszentren. Unsere Partner-<strong>Umzugsdienstleister</strong> und <strong>regionale Zügelprofis</strong> sind in der ganzen Region aktiv. Alle verfügen über umfassende Erfahrung und sind <strong>geprüfte Partner nach Schweizer Standards</strong>.
                </p>
                {/* Mobile: Horizontal Scroll, Desktop: Grid */}
                <div className="overflow-x-auto scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0">
                  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 min-w-max md:min-w-0">
                    {aargauCities.map((cityItem, index) => (
                      <Link
                        key={index}
                        href={cityItem.link}
                        className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg flex-shrink-0 w-[60vw] md:w-auto min-w-[200px] md:min-w-0"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <h4 className="typography-h4 group-hover:text-green-600 transition-colors">
                            {cityItem.name}
                          </h4>
                        </div>
                        <p className="typography-p text-sm">{cityItem.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>

              {/* Umzug in Aarau Section */}
              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="typography-h2 mb-6">
                  Umzug in Aarau – Günstige Umzugsfirmen vergleichen & sparen
                </h2>
                
                <p className="typography-p mb-6">
                  Planen Sie einen Umzug in Aarau oder Umgebung? Auf <strong>online-offerten.ch</strong> können Sie schnell und unkompliziert mehrere kostenlose Offerten von geprüften <strong>Umzugsfirmen in Aarau</strong> anfordern. Vergleichen Sie Preise und Leistungen und finden Sie das passende <strong>Zügelunternehmen</strong> – egal ob für einen Privatumzug, Firmenumzug oder Seniorenumzug.
                </p>
                
                <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                  <h3 className="typography-h3 mb-4">
                    Stressfreier Umzug in Aarau – Einfach & digital organisiert
                  </h3>
                  <p className="typography-p">
                    Mit unserem modernen Vergleichsportal wird die Umzugsplanung in Aarau besonders einfach. Beschreiben Sie Ihr Umzugsprojekt in wenigen Minuten und erhalten Sie daraufhin passende Angebote von erfahrenen <strong>Umzugsunternehmen aus der Region Aarau</strong>. Transparent, zeitsparend und ohne Verpflichtung.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                  <h3 className="typography-h3 mb-4">
                    Warum sich ein Vergleich von Umzugsfirmen in Aarau lohnt
                  </h3>
                  <p className="typography-p">
                    Ein professioneller Umzug in Aarau sorgt für Sicherheit, Effizienz und einen reibungslosen Ablauf. Durch den direkten Vergleich mehrerer Offerten vermeiden Sie unnötige Mehrkosten und profitieren von fairen Preisen lokaler Anbieter. So lassen sich <strong>bis zu 40 % der Umzugskosten sparen</strong>.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                  <h3 className="typography-h3 mb-4">
                    Umzugsservice in Aarau – Flexible Leistungen nach Bedarf
                  </h3>
                  <p className="typography-p mb-4">
                    <strong>Umzugsfirmen in Aarau</strong> bieten individuelle Lösungen für jedes Umzugsprojekt:
                  </p>
                  <ul className="space-y-3 list-disc list-inside ml-4">
                    <li className="typography-p"><strong>Full-Service-Umzug:</strong> Verpacken, Transport, Möbelmontage</li>
                    <li className="typography-p"><strong>Teilumzug:</strong> Nur Transport oder Unterstützung beim Packen</li>
                    <li className="typography-p"><strong>Spezialumzüge:</strong> Klavier, Tresor, Antiquitäten oder Kunstobjekte</li>
                    <li className="typography-p"><strong>Zusatzleistungen:</strong> Umzugsreinigung, Entsorgung, Möbellagerung</li>
                    <li className="typography-p"><strong>Versicherungsschutz:</strong> Absicherung Ihres gesamten Umzugsguts</li>
                  </ul>
                  <p className="typography-p mt-4">
                    Sie entscheiden selbst, welche Leistungen Sie für Ihren <strong>Umzug in Aarau</strong> benötigen.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
                  <h3 className="typography-h3 mb-4">
                    Ihre Vorteile mit online-offerten.ch
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>100 % kostenlos & unverbindlich</strong></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700"><strong>Geprüfte Umzugsfirmen aus Aarau</strong> und Umgebung</span>
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
                  <h3 className="typography-h3 mb-4" style={{ textAlign: 'center', fontSize: '28px', color: 'rgba(255, 255, 255, 1)' }}>
                    Jetzt Umzugsofferten für Aarau erhalten
                  </h3>
                  <p className="typography-p text-green-50 mb-6 max-w-2xl mx-auto" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    Füllen Sie unser einfaches Online-Formular aus und erhalten Sie passende Offerten von zuverlässigen <strong>Umzugsfirmen in Aarau</strong>. Unser Service ist kostenlos – Kosten entstehen erst, wenn Sie sich für ein Angebot entscheiden. Ob innerhalb von Aarau, in einen anderen Kanton oder ins Ausland: Wir finden den richtigen Umzugspartner für Sie.
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                    >
                      <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aarau" className="inline-flex items-center">
                        Kostenlose Aarau-Offerten anfordern
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>

              {/* Savings Tips */}
              <article className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-blue-200">
                <h2 className="typography-h2 mb-6">Günstig umziehen im Aargau: Spartipps</h2>
                <p className="typography-p mb-6 font-medium">
                  Der Aargau ist im Vergleich zu Zürich oder Basel oft günstiger, aber Ihr Umzug muss trotzdem nicht teuer sein. Mit diesen Insider-Tipps schonen Sie Ihr Budget:
                </p>
                <ul className="space-y-4">
                  {savingsTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="typography-p flex-1">
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 bg-white rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <h4 className="typography-h4">Kostenloser Umzugskosten-Rechner</h4>
                  </div>
                  <p className="typography-p mb-4">
                    Nutzen Sie unseren <Link href="/umzugskosten" className="text-blue-600 hover:text-blue-800 underline font-semibold">Umzugskosten-Rechner</Link> für eine detaillierte Schätzung Ihrer Umzugskosten im Aargau. In nur 2 Minuten erhalten Sie eine realistische Preis-Einschätzung.
                  </p>
                  <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Link href="/umzugskosten">
                      Jetzt Kosten berechnen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </article>

              {/* Services Overview */}
              <article>
                <h2 className="typography-h2 mb-6">Leistungen der Umzugsfirmen</h2>
                <p className="typography-p mb-6">
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
                    { icon: 'MapPin', title: 'Möbellagerung', link: '/umzugsfirma-in-der-naehe/aargau', desc: 'Sichere Zwischenlagerung' }
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
                <h2 className="typography-h2 mb-6">Checkliste für die perfekte Wahl</h2>
                <p className="typography-p mb-6">
                  Lassen Sie sich nicht von der erstbesten Offerte überzeugen. Vergleichen Sie mehrere <strong>Umzugsdienstleister</strong> und <strong>Transportunternehmen für Umzüge</strong>. Eine gründliche Prüfung ist entscheidend für die beste Wahl. Achten Sie auf <strong>geprüfte Partner nach Schweizer Standards</strong> und <strong>versichert gemäss OR</strong>.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Detaillierte Offerten einholen', text: 'Eine seriöse Offerte von einer Zügelfirma ist mehr als nur eine Zahl. Sie sollte alle Posten detailliert auflisten: Stundensätze, Mitarbeiterzahl, Fahrzeuggrösse, Versicherung und alle gebuchten Zusatzleistungen.' },
                    { title: 'Versicherungsschutz prüfen', text: 'Eine ausreichende Transport- und Betriebshaftpflichtversicherung ist nicht verhandelbar. Professionelle Umzugsdienstleister sind versichert gemäss OR und bis 100\'000 CHF versichert.' },
                    { title: 'Bewertungen und Referenzen analysieren', text: 'Lesen Sie authentische Kundenbewertungen auf unserem Portal. Achten Sie auf Kommentare zu Pünktlichkeit, Sorgfalt und Teamfreundlichkeit. Unsere Partner verfügen über umfassende Erfahrung in der Vermittlung von Umzügen im Aargau.' },
                    { title: 'Regionale Kenntnisse prüfen', text: 'Ein Zügelunternehmen im Kanton Aargau sollte die Region kennen. Fragen Sie nach Erfahrungen mit Umzügen in Ihrer spezifischen Gemeinde.' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="typography-h4 mb-2" style={{ textAlign: 'left' }}>{item.title}</h4>
                          <p className="typography-p">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Why Aargau Section */}
              <article>
                <h2 className="typography-h2 mb-6">Warum regionale Zügelprofis wählen?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: MapPin, title: 'Zentrale Lage', text: <>Der Aargau liegt ideal zwischen Zürich, Basel und Bern. <strong>Umzugspartner im Aargau</strong> kennen die besten Routen und können auch Umzüge in diese Metropolen effizient abwickeln. Alle Partner sind <strong>geprüfte Partner nach Schweizer Standards</strong>.</> },
                    { icon: Building, title: 'Vielfältige Wohnlagen', text: <>Von historischen Altstädten über moderne Neubauten bis zu idyllischen Dörfern – erfahrene <strong>Umzugsdienstleister</strong> kennen die Besonderheiten jeder Wohnlage. Durch langjährige Erfahrung in der Vermittlung von Umzügen können wir professionelle Abwicklung sicherstellen.</> },
                    { icon: TrendingUp, title: 'Wirtschaftsstärke', text: <>Der Aargau ist ein wichtiger Wirtschaftsstandort. <strong>Transportunternehmen für Umzüge</strong> haben Erfahrung mit Geschäftsumzügen und können auch komplexe Firmenumzüge professionell abwickeln. Alle sind <strong>versichert gemäss OR</strong>.</> },
                    { icon: Star, title: 'Lebensqualität', text: <>Der Aargau bietet hohe Lebensqualität zu erschwinglichen Preisen. Lokale <strong>Zügelunternehmen im Kanton Aargau</strong> können Ihnen helfen, diese Vorteile optimal zu nutzen. Unser <strong>Schweizer Kundenservice</strong> steht Ihnen zur Verfügung.</> }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors">
                        <Icon className="w-10 h-10 text-green-600 mb-4" />
                        <h4 className="typography-h4 mb-3">{item.title}</h4>
                        <p className="typography-p">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </article>

              {/* CTA Section */}
              <article className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center">
                <h2 className="typography-h2 mb-4">
                  Bereit für Ihren Umzug im Aargau?
                </h2>
                <p className="typography-p text-green-50 mb-8 max-w-2xl mx-auto">
                  Starten Sie jetzt Ihre Anfrage und erhalten Sie in Kürze bis zu 5 Offerten von geprüften <strong>Umzugsfirmen im Aargau</strong> und Zügelfirmen aus dem Aargau.
                </p>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                >
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aargau">
                    Kostenlose Aargau-Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </article>
            </main>
          </div>
        </section>

        {/* FAQ Section - Aargau spezifisch */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="typography-h2 mb-4" style={{ textAlign: 'center' }}>
                Häufige Fragen zu Umzügen im Aargau
              </h2>
              <p className="typography-p max-w-2xl mx-auto" style={{ textAlign: 'center' }}>
                Antworten auf die wichtigsten Fragen rund um Umzüge im Kanton Aargau
              </p>
            </div>
            
            <div className="w-full">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-white rounded-xl border border-gray-200 px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <h4 className="faq-question">Wie finde ich eine seriöse Umzugsfirma im Aargau?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="typography-p">
                      Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen im Aargau. Achten Sie auf lokale Erfahrung, besonders mit Umzügen in historischen Städten wie Aarau oder Baden. Seriöse Firmen kennen die Besonderheiten der Aargauer Altstädte mit ihren Riegelhäusern und engen Gassen und können Umzüge professionell planen.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="bg-white rounded-xl border border-gray-200 px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <h4 className="faq-question">Was kostet ein Umzug innerhalb des Aargaus?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="typography-p">
                      Die Kosten hängen von Wohnungsgrösse, Distanz, Stockwerk und Zugänglichkeit ab. Ein Umzug innerhalb des Aargaus kostet typischerweise zwischen 600 und 2'800 CHF für eine 3.5-Zimmer-Wohnung. Die zentrale Lage zwischen Zürich, Basel und Bern macht den Aargau zu einer kostengünstigen Region für Umzüge.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="bg-white rounded-xl border border-gray-200 px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <h4 className="faq-question">Gibt es Besonderheiten bei Umzügen in Aargauer Altstädte?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="typography-p">
                      Ja, die historischen Altstädte mit ihren typischen Riegelhäusern und engen Gassen erfordern besondere Sorgfalt. Viele Gebäude haben keine Lifts, und die engen Durchfahrten erfordern kleinere Fahrzeuge. Professionelle Umzugsfirmen beantragen Halteverbotszonen rechtzeitig und verwenden geeignete Ausrüstung für Altstadtumzüge.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="bg-white rounded-xl border border-gray-200 px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <h4 className="faq-question">Wie lange im Voraus sollte ich eine Umzugsfirma im Aargau buchen?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="typography-p">
                      Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders für Umzüge in die Altstädte von Aarau, Baden oder Zofingen. Kurzfristige Buchungen sind möglich, aber die Auswahl an verfügbaren Terminen ist dann begrenzter. Frühbucher profitieren oft von besseren Konditionen.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="bg-white rounded-xl border border-gray-200 px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <h4 className="faq-question">Kann ich auch einen Umzug von Aarau nach Baden organisieren?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="typography-p">
                      Ja, viele Umzugsfirmen im Aargau bieten Umzüge zwischen den verschiedenen Städten im Kanton an, wie von Aarau nach Baden, Zofingen oder Brugg. Die kurzen Distanzen innerhalb des Aargaus machen solche Umzüge oft kostengünstiger. Vergleichen Sie mehrere Offerten für den besten Preis.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6" className="bg-white rounded-xl border border-gray-200 px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <h4 className="faq-question">Welche Vorteile bietet ein Umzug in den Aargau?</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="typography-p">
                      Der Aargau bietet eine ideale Balance zwischen zentraler Lage und moderaten Lebenshaltungskosten. Die Nähe zu Zürich, Basel und Bern ermöglicht flexible Arbeitsstandorte, während die Wohnkosten deutlich niedriger sind. Familien schätzen die hohe Lebensqualität, gute Schulen und die Nähe zur Natur.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </section>
      </div>
    </>
  )
}


