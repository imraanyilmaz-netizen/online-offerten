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
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Incremental Static Regeneration - Cache for 60 seconds, then revalidate
// This provides good performance while keeping data fresh
export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Zürich"
const cityData = cityServiceData[city] || {
  name: 'Zürich',
  displayName: 'Umzugsfirma Zürich – Online-Offerten.ch',
  addressLocality: 'Zürich',
  addressRegion: 'ZH',
  latitude: '47.3769',
  longitude: '8.5417',
  canonicalUrl: '/umzugsfirma/zuerich'
}
const canonicalUrl = '/umzugsfirma/zuerich'
const locationData = locations.find(loc => loc.name === city)
const imageUrl = '/image/umzugsservice-Schweiz/umzugsfirma-zurich.webp'

// Service Schema - Enhanced for rich results & clarification as comparison platform
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Zürich – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen und Umzugsunternehmen in Zürich. Kostenlos bis zu 5 Offerten anfordern, Preise vergleichen und bis zu 40% sparen. Online-Offerten.ch ist Ihre Vergleichsplattform für Umzugsdienstleistungen im Kanton Zürich.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.webp",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz. Wir vermitteln kostenlose Offerten von geprüften Anbietern.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["German"]
    }
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Kanton Zürich",
    "containedInPlace": {
      "@type": "Country",
      "name": "Switzerland",
      "alternateName": "Schweiz"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Umzugsdienstleistungen in Zürich",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Privatumzug Zürich"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Geschäftsumzug Zürich"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Internationale Umzüge ab Zürich"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Spezialtransporte Zürich"
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
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Zürich erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Unternehmen, die in Zürich umziehen möchten"
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

// WebPage Schema - Clarifies page purpose
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Umzugsfirma Zürich – Offerten vergleichen & bis zu 40% sparen",
  "description": "Vergleichsportal für Umzugsfirmen in Zürich. Kostenlos Offerten von geprüften Umzugsunternehmen anfordern und Umzugskosten sparen.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": {
    "@type": "Thing",
    "name": "Umzugsfirmen in Zürich vergleichen"
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
          "item": "https://online-offerten.ch/umzugsfirma"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Umzugsfirma Zürich",
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
  { name: 'Winterthur', link: '/umzugsfirma/zuerich/winterthur', description: 'Zweitgrösste Stadt im Kanton Zürich' },
  { name: 'Uster', link: '/umzugsfirma/zuerich/uster', description: 'Drittgrösste Stadt im Kanton Zürich' },
  { name: 'Dietikon', link: '/umzugsfirma/zuerich/dietikon', description: 'Wichtiger Verkehrsknotenpunkt' },
  { name: 'Dübendorf', link: '/umzugsfirma/zuerich/duebendorf', description: 'Moderne Wohnstadt mit Flughafennähe' },
  { name: 'Schlieren', link: '/umzugsfirma/zuerich/schlieren', description: 'Wachsende Stadt im Limmattal' }
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
  title: 'Umzugsfirma in Zürich – Kostenlos Umzugsofferten vergleichen',
  description: 'Umzugsfirma in Zürich gesucht? ✓ Geprüfte Umzugsunternehmen vergleichen ✓ Umzugskosten Rechner Zürich ✓ Kostenlos bis zu 5 Offerten anfordern ✓ Bis zu 40% sparen bei Privat- & Geschäftsumzug im Kanton Zürich.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/zuerich',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma/zuerich',
      'x-default': 'https://online-offerten.ch/umzugsfirma/zuerich',
    },
  },
  openGraph: {
    title: 'Umzugsfirma Zürich: Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Zürich. Kostenlos bis zu 5 Offerten anfordern, Umzugskosten berechnen und den besten Anbieter für Ihren Umzug im Kanton Zürich finden.',
    url: 'https://online-offerten.ch/umzugsfirma/zuerich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Zürich – Umzugsunternehmen vergleichen auf Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Zürich: Top Umzugsunternehmen vergleichen & sparen',
    description: 'Geprüfte Umzugsfirmen in Zürich vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen beim Umzug im Kanton Zürich.',
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

// Fetch partners for Zürich - Only Umzug (transport) companies
// OPTIMIZED: Direct filtering in Supabase query instead of fetching all partners
async function getZurichPartners() {
  try {
    const supabase = createStaticClient()
    
    // Step 1: Fetch only Umzug companies that might serve Zürich
    // First, get partners with 'umzug' in main_categories and active status
    const { data: umzugPartners, error: umzugError } = await supabase
      .from('partners')
      .select('id, company_name, slug, address_street, address_city, address_zip, main_categories, service_regions, average_rating, review_count, badge_tier, logo_url, message')
      .eq('status', 'active')
      .not('company_name', 'is', null)
      .contains('main_categories', ['umzug'])  // Only Umzug companies
    
    if (umzugError) {
      console.error('Error fetching umzug partners:', umzugError)
      return []
    }
    
    if (!umzugPartners || umzugPartners.length === 0) {
      return []
    }
    
    // Step 2: Filter in JavaScript for Zürich region (service_regions array filtering is complex in Supabase)
    // This is still more efficient than fetching ALL partners
    const zurichPartners = umzugPartners.filter((partner: any) => {
      // Check if partner is located in Zürich
      const city = partner.address_city?.toLowerCase() || ''
      const cityMatch = city.includes('zürich') || city.includes('zurich')
      
      // Check service_regions array for Zürich-related terms
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => 
          typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase()
        )
        regionMatch = regions.some((r: string) => {
          // Exact matches
          if (r === 'zürich' || r === 'zurich' || r === 'zh') return true
          // Contains matches
          if (r.includes('zürich') || r.includes('zurich')) return true
          // Canton code matches
          if (r === 'kanton zürich' || r === 'kanton zurich') return true
          // Region matches (Zürich is in Deutschschweiz)
          if (r === 'deutschschweiz' || r.includes('deutschschweiz')) return true
          return false
        })
      }
      
      // Partner must either be located in Zürich OR serve Zürich region
      return cityMatch || regionMatch
    })
    
    // Step 3: Sort by rating (highest first), then by review count
    zurichPartners.sort((a: any, b: any) => {
      const ratingA = a.average_rating || 0
      const ratingB = b.average_rating || 0
      if (ratingB !== ratingA) {
        return ratingB - ratingA
      }
      return (b.review_count || 0) - (a.review_count || 0)
    })
    
    // Step 4: Limit to max 12 partners
    return zurichPartners.slice(0, 12)
  } catch (error) {
    console.error('Error in getZurichPartners:', error)
    return []
  }
}

export default async function UmzugsfirmaZurichPage() {
  // Fetch partners server-side for SEO
  const zurichPartners = await getZurichPartners()
  
  // ItemList Schema for partner listings - helps Google show rich results
  const itemListSchema = zurichPartners && zurichPartners.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Zürich",
    "description": "Liste von geprüften Umzugsunternehmen im Kanton Zürich auf Online-Offerten.ch",
    "numberOfItems": zurichPartners.length,
    "itemListElement": zurichPartners.map((partner: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": partner.company_name,
        "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": partner.address_city || "Zürich",
          "postalCode": partner.address_zip || "",
          "addressRegion": "ZH",
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
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Left Side - Green Content Area (60% on desktop) */}
                <div className="w-full lg:w-[60%] bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 relative px-4 sm:px-8 md:px-12 py-6 sm:py-10 md:py-12 lg:py-16">
                  {/* Yellow Badge - Top Right */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-yellow-400 rounded-full px-4 py-2 shadow-lg z-10">
                    <p className="text-black text-xs sm:text-sm font-bold text-center leading-tight">
                      Kostenlos &<br />unverbindlich
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <span className="text-sm font-medium text-white">Umziehen leicht gemacht!</span>
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
                    Umzugsfirma in Zürich – Kostenlos Umzugsofferten vergleichen
                  </h1>
                    
                  {/* Description */}
                  <p className="hero-description text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                    Finden Sie über Online-Offerten.ch die passende Umzugsfirma in Zürich. Vergleichen Sie kostenlos bis zu 5 Offerten von geprüften Umzugsunternehmen im Kanton Zürich – ob Privatumzug, Geschäftsumzug oder Spezialtransport. Transparente Preise, echte Kundenbewertungen und lokale Expertise für Ihren Umzug.
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
                      <span className="font-medium">Zeit und Geld sparen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Breadcrumb Navigation - Matches BreadcrumbList schema */}
            <nav className="mt-4 sm:mt-6 pt-4 px-4 sm:px-0" aria-label="Breadcrumb">
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
                  <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">
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
        <section className="pt-4 pb-16 md:pt-6 md:pb-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Content */}
              <div className="lg:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Umzugsfirma Zürich finden: Geprüfte Umzugsunternehmen im Kanton Zürich vergleichen
                </h2>
                <div className="text-gray-700 mb-8 leading-relaxed space-y-4">
                  <p>
                    Sie suchen eine <strong>Umzugsfirma in Zürich</strong>? Die grösste Stadt der Schweiz stellt besondere Anforderungen an einen Umzug: Dichter Verkehr, komplexe Parkregelungen und die Vielfalt der Wohnlagen – von Altstadtwohnungen im Niederdorf bis zu modernen Neubauten in Zürich-West oder Oerlikon – machen die Wahl des richtigen <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsunternehmens</Link> zur wichtigsten Entscheidung Ihres Umzugsprojekts.
                  </p>
                  <p>
                    <strong>Online-Offerten.ch</strong> ist Ihre unabhängige Vergleichsplattform für <strong>Umzugsfirmen im Kanton Zürich</strong>. Wir sind selbst kein Umzugsunternehmen, sondern vermitteln Ihnen kostenlos und unverbindlich bis zu 5 Offerten von geprüften, lokalen Umzugsprofis. So finden Sie garantiert den passenden Anbieter für Ihren <strong>Umzug in Zürich</strong>, Winterthur, Uster, Dietikon oder Dübendorf.
                  </p>
                  <p>
                    Unsere geprüften Partner kennen die Verkehrswege, die Halteverbotszonen-Regelungen der Stadt Zürich und die logistischen Herausforderungen der Region. Sie kümmern sich um die Organisation, planen die schnellste Route und stellen sicher, dass Ihr Hab und Gut sicher im neuen Zuhause ankommt – ob <strong>Privatumzug</strong>, <strong>Geschäftsumzug</strong> oder <strong>Spezialtransport</strong>.
                  </p>
                  <p className="text-lg font-medium">
                    Vergleichen Sie jetzt kostenlos mehrere Offerten von Umzugsfirmen in Zürich, lesen Sie echte Kundenbewertungen und sparen Sie bis zu 40% bei Ihren <strong>Umzugskosten in Zürich</strong>.
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

        {/* Partner Firms Section - SEO Optimized - Global Listing - Partner-suche Style */}
        {zurichPartners && zurichPartners.length > 0 && (
          <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Geprüfte Umzugsfirmen in Zürich
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Unsere Partner sind erfahrene Umzugsunternehmen mit langjähriger Erfahrung im Kanton Zürich. Sie kennen die Besonderheiten der Region und bieten professionelle Dienstleistungen für Ihren Umzug.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {zurichPartners.map((partner: any) => {
                  const rating = partner.average_rating || 0
                  const reviewCount = partner.review_count || 0
                  const partnerSlug = partner.slug || partner.id
                  
                  // Get default image for Umzug
                  const getDefaultImage = () => {
                    return '/bilder/6bb8eb00-0fb6-4ebd-ba5c-f5c1726ee18a.webp'
                  }
                  
                  const heroImage = partner.hero_image_url || getDefaultImage()
                  
                  // Get badge class
                  const getBadgeClass = (tier: string) => {
                    switch (tier) {
                      case 'gold': return 'bg-yellow-400 text-yellow-900 border-yellow-500'
                      case 'silver': return 'bg-gray-300 text-gray-800 border-gray-400'
                      case 'bronze': return 'bg-yellow-600 text-white border-yellow-700'
                      default: return 'hidden'
                    }
                  }
                  
                  return (
                    <div 
                      key={partner.id} 
                      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden flex flex-col"
                    >
                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Logo - Above company name - Modern design */}
                        <div className="flex justify-center mb-4">
                          <div className="relative w-24 h-24 rounded-2xl border border-gray-200 shadow-sm bg-gray-50 overflow-hidden flex items-center justify-center p-3 group-hover:border-green-300 transition-colors">
                            {partner.logo_url ? (
                              <Image
                                src={partner.logo_url}
                                alt={`${partner.company_name} logo`}
                                fill
                                className="object-contain p-2"
                                sizes="96px"
                                unoptimized
                              />
                            ) : (
                              <Image
                                src="/image/logo-icon.webp"
                                alt="Default logo"
                                fill
                                className="object-contain p-2"
                                sizes="96px"
                              />
                            )}
                          </div>
                        </div>

                        {/* Badge */}
                        {partner.badge_tier && (
                          <div className="flex justify-center mb-3">
                            <div className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${getBadgeClass(partner.badge_tier)}`}>
                              {partner.badge_tier} Partner
                            </div>
                          </div>
                        )}

                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 text-center min-h-[3rem] flex items-center justify-center">
                          <Link href={`/partner/${partnerSlug}`} className="hover:text-green-600 transition-colors">
                            {partner.company_name}
                          </Link>
                        </h3>
                        
                        <div className="flex items-center justify-center text-sm text-gray-600 mb-4 text-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-green-600 flex-shrink-0" />
                          <span className="font-medium">Umzugsfirma in {city}</span>
                        </div>

                        {/* Reviews - Real reviews from database - Only show if reviews exist */}
                        {reviewCount > 0 && (
                          <div className="flex items-center justify-center text-sm mb-5">
                            <div className="flex items-center text-yellow-500 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-gray-700 font-semibold mr-1">{rating.toFixed(1)}</span>
                            <span className="text-gray-500 text-xs">({reviewCount})</span>
                          </div>
                        )}

                        {/* Company Description (Message) - Show only 40 characters, rest on profile */}
                        {partner.message && (
                          <div className="mb-5">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {partner.message.length > 40 
                                ? `${partner.message.substring(0, 40)}...` 
                                : partner.message}
                            </p>
                            {partner.message.length > 40 && (
                              <Link 
                                href={`/partner/${partnerSlug}`}
                                className="text-green-600 hover:text-green-700 text-xs font-medium mt-1 inline-block"
                              >
                                Mehr erfahren â†’
                              </Link>
                            )}
                          </div>
                        )}

                        {/* CTA Button - Modern style */}
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <Link 
                            href={`/partner/${partnerSlug}`}
                            className="w-full text-center inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow-md hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-[1.02]"
                          >
                            Profil ansehen
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA Section - Form Button */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Jetzt Umzugsfirmen vergleichen und Auftrag starten!
                </h3>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Vergleichen Sie schnell und einfach verschiedene Umzugsofferten und finden Sie die passende Umzugsfirma für Ihren Umzug.
                </p>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Zürich">
                    Kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Umzugsfirma Zürich beauftragen: So funktioniert's
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
                
                {/* Umzugskosten Rechner Zürich Section */}
                <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
                  <h3 className="typography-h3 mb-4">Umzugskosten Rechner Zürich: Kostenlos berechnen</h3>
                  <p className="typography-p mb-4">
                    Nutzen Sie unseren <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten Rechner für Zürich</Link> um schnell und kostenlos eine realistische Schätzung Ihrer Umzugskosten zu erhalten. In nur 2 Minuten wissen Sie, was Ihr Umzug in Zürich kostet. Der Rechner berücksichtigt alle wichtigen Faktoren wie Wohnungsgrösse, Distanz, Stockwerk, Liftverfügbarkeit und gewünschte Zusatzleistungen.
                  </p>
                  <p className="typography-p mb-4">
                    Unser Umzugskosten Rechner für Zürich basiert auf Durchschnittswerten der Region und liefert Ihnen eine erste Orientierung. Anschliessend können Sie mehrere Offerten von geprüften Umzugsfirmen in Zürich vergleichen und bis zu 40% sparen.
                  </p>
                  <Button 
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    <Link href="/umzugsfirma/umzugskosten">
                      <Calculator className="w-5 h-5 mr-2" />
                      Jetzt Umzugskosten für Zürich berechnen
                    </Link>
                  </Button>
                </div>
                
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Umzugsfirma in Ihrer Stadt: Alle Regionen im Kanton Zürich</h2>
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
                  Planen Sie einen Umzug in Zürich oder Umgebung? Auf online-offerten.ch können Sie schnell und unkompliziert mehrere kostenlose <Link href="/umzugsofferten" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsofferten</Link> anfordern. Vergleichen Sie Preise und Leistungen – egal ob für einen Privatumzug, Firmenumzug oder Seniorenumzug.
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
                    Nutzen Sie unseren <Link href="/umzugsfirma/umzugskosten" className="text-blue-600 hover:text-blue-800 underline font-semibold">Umzugskosten Rechner für Zürich</Link> für eine detaillierte Schätzung Ihrer Umzugskosten im Kanton Zürich. In nur 2 Minuten erhalten Sie eine realistische Preis-Einschätzung.
                  </p>
                </div>
              </article>

              {/* Services Overview */}
              <article>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left Column - Image */}
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
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
                        { icon: 'MapPin', title: 'Möbellagerung', link: '/umzugsfirma/zuerich', desc: 'Sichere Zwischenlagerung' }
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
                Häufige Fragen zu Umzugsfirmen und Umzugskosten in Zürich
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



