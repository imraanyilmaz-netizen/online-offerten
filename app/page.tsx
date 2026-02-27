import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { createStaticClient } from '@/lib/supabase/server'
import HomeHeroForm from '@/components/HomeHeroForm'

// Lazy load HomePageClient to improve initial page load performance
// SSR enabled for SEO, but component is code-split for better mobile performance
const HomePageClient = dynamic(() => import('@/components/pages/HomePageClient'), {
  ssr: true,
  loading: () => <div className="min-h-[200px] sm:min-h-[400px]" /> // Smaller placeholder on mobile
})
import type { Metadata } from 'next'
import Link from 'next/link'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Star, ArrowRight, MapPin, CheckCircle, 
  FileText, Users, GitCompareArrows, 
  Truck, Sparkles, Paintbrush, Trash2,
  ShieldCheck, Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden | Online-Offerten.ch',
  description: 'Kostenlose Offerten für Umzug, Reinigung & Malerarbeiten vergleichen. Bis zu 5 Angebote von geprüften Firmen aus Ihrer Region erhalten. ✓ Unverbindlich ✓ 100% kostenlos.',
  alternates: {
    canonical: 'https://online-offerten.ch/',
  },
  openGraph: {
    title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden | Online-Offerten.ch',
    description: 'Kostenlose Offerten für Umzug, Reinigung & Malerarbeiten. Bis zu 5 Angebote von geprüften Firmen erhalten.',
    url: 'https://online-offerten.ch/',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
    description: 'Bis zu 5 kostenlose Angebote von geprüften Firmen erhalten',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
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

// ISR: Sayfa 1 saatte bir otomatik yenilenecek (3600 saniye)
// Bu sayfa statik olarak build edilir, ancak 1 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB), Slug-Änderungen sind stündlich sichtbar

async function getHomePageData() {
  const supabase = createStaticClient()
  
  // Fetch reviews, posts, and rating stats in parallel with optimized queries
  // Using select with specific fields to reduce data transfer
  const [reviewsResult, postsResult, countResult, ratingsResult] = await Promise.all([
    supabase
      .from('customer_reviews')
      .select(`
        id, customer_name, rating, city, review_date, 
        review_text,
        service_type, partner_name,
        partners (slug, company_name)
      `)
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform')
      .eq('show_on_homepage', true)
      .order('review_date', { ascending: false })
      .limit(6),
    supabase
      .from('posts')
      .select('id, title, slug, meta_description, featured_image_url, category, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(9),
    // Fetch all approved platform reviews count (for homepage AggregateRating)
    supabase
      .from('customer_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform'),
    // Fetch all approved platform reviews ratings for average calculation
    supabase
      .from('customer_reviews')
      .select('rating')
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform')
  ])

  // Calculate average rating and total count
  let averageRating = 0
  let reviewCount = 0
  
  reviewCount = countResult.count || 0 // Use count from database query
  
  if (ratingsResult.data && ratingsResult.data.length > 0) {
    const totalRating = ratingsResult.data.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
    averageRating = totalRating / ratingsResult.data.length
  }

  return {
    reviews: reviewsResult.data || [],
    posts: postsResult.data || [],
    ratingStats: {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      reviewCount // Real review count only - no manipulation
    }
  }
}

// Schema Data - Organization + Service + FAQPage (All schemas in Server Component)
const structuredData = {
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
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://online-offerten.ch/#organization",
      "name": "Online Offerten",
      "url": "https://online-offerten.ch",
      "logo": "https://online-offerten.ch/image/logo-icon.webp",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@online-offerten.ch",
        "areaServed": "CH",
        "availableLanguage": ["de"]
      },
      "sameAs": [
        "https://www.facebook.com/onlineofferten",
        "https://www.instagram.com/onlineofferten"
      ]
    },
    {
      "@type": "Service",
      "name": "Kostenlose Offerten für Umzug, Reinigung & Renovierung",
      "description": "Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Entsorgungsfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und Zeit und Geld sparen.",
      "alternateName": "Offerten Portal aus Ihrer Region",
      "serviceType": [
        "Umzugsdienst",
        "Reinigungsdienst",
        "Malerarbeiten",
        "Räumung & Entsorgung"
      ],
      "provider": {
        "@id": "https://online-offerten.ch/#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Switzerland",
        "identifier": "CH"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CHF",
        "availability": "https://schema.org/InStock",
        "url": "https://online-offerten.ch/kostenlose-offerte-anfordern"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Ist der Service wirklich kostenlos und unverbindlich?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, unser Service ist vollständig kostenlos und unverbindlich. Sie können alle Offerten in Ruhe vergleichen und entscheiden, ob Sie eine davon annehmen möchten oder nicht. Es entstehen keine Kosten oder Verpflichtungen, wenn Sie keine der Offerten annehmen."
          }
        },
        {
          "@type": "Question",
          "name": "Wie funktioniert das Offerten-Vergleichsportal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sie füllen ein kurzes Formular aus, in dem Sie Ihre Anforderungen beschreiben. Wir leiten Ihre Anfrage an bis zu 5 passende Partnerfirmen in Ihrer Region weiter. Diese kontaktieren Sie direkt mit individuellen Offerten. Sie vergleichen die Angebote und wählen das beste aus."
          }
        },
        {
          "@type": "Question",
          "name": "Wie lange dauert es, bis ich Offerten erhalte?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In der Regel erhalten Sie die ersten Offerten innerhalb von 24-48 Stunden. Die Partnerfirmen kontaktieren Sie direkt per E-Mail oder Telefon mit ihren individuellen Angeboten."
          }
        },
        {
          "@type": "Question",
          "name": "Sind alle Partnerfirmen geprüft und seriös?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, alle Partnerfirmen werden von uns sorgfältig geprüft und müssen hohe Qualitätsstandards erfüllen. Wir arbeiten nur mit seriösen, versicherten Unternehmen zusammen, die über die notwendigen Lizenzen und Erfahrung verfügen."
          }
        },
        {
          "@type": "Question",
          "name": "Kann ich auch Offerten für mehrere Dienstleistungen gleichzeitig anfordern?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, Sie können für verschiedene Dienstleistungen Offerten anfordern. Füllen Sie einfach für jede Dienstleistung eine separate Anfrage aus, oder kontaktieren Sie uns direkt, wenn Sie mehrere Services benötigen."
          }
        },
        {
          "@type": "Question",
          "name": "Was passiert, wenn ich keine der Offerten annehme?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kein Problem. Sie sind zu nichts verpflichtet. Wenn keine der Offerten Ihren Anforderungen entspricht, müssen Sie nichts weiter tun. Es entstehen keine Kosten oder Verpflichtungen."
          }
        },
        {
          "@type": "Question",
          "name": "Für welche Dienstleistungen kann ich Offerten anfordern?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sie können Offerten für Umzüge (Privatumzug, Geschäftsumzug, Auslandumzug, Spezialtransporte), Reinigungsdienstleistungen (Wohnungsreinigung, Büroreinigung, Umzugsreinigung, Grundreinigung) und Malerarbeiten (Innen- und Aussenanstriche) anfordern."
          }
        }
      ]
    }
  ]
}

export default async function HomePage() {
  const { reviews, posts, ratingStats } = await getHomePageData()

  // Add AggregateRating to Organization schema (only platform reviews)
  const structuredDataWithRating = {
    ...structuredData,
    "@graph": structuredData["@graph"].map((item: any) => {
      if (item["@type"] === "Organization") {
        return {
          ...item,
          ...(ratingStats.reviewCount > 0 && ratingStats.averageRating > 0 ? {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": ratingStats.averageRating.toFixed(1),
              "reviewCount": ratingStats.reviewCount.toString(),
              "bestRating": "5",
              "worstRating": "1"
            }
          } : {})
        }
      }
      return item
    })
  }

  return (
    <>
      <link
        rel="dns-prefetch"
        href="https://online-offerten.ch"
      />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataWithRating) }}
      />

      <div className="flex flex-col">
        <main className="flex-grow">
          {/* Hero Section - SEO Optimized - SERVER RENDERED */}
          <section 
            className="relative w-full py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-gray-100 z-20" 
            aria-label="Offerten vergleichen & passende Anbieter in der Schweiz finden"
          >
            {/* Background Image - Right Side - Desktop Only - Optimized with Next.js Image */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] h-full overflow-hidden">
              <NextImage
                src="/fotos/umzug-reinigung-maler-offerten.webp"
                alt="Umzug, Reinigung und Renovierung Services in der Schweiz"
                fill
                priority
                quality={75}
                className="object-cover object-right"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
                }}
                sizes="(max-width: 1024px) 0vw, 55vw"
              />
            </div>
            
            {/* Gradient Overlay - White from left to right with shadow effect - Desktop Only */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" style={{ width: '60%' }}></div>
            
            {/* White shadow/glow effect towards the image - Desktop Only */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/8 pointer-events-none"></div>
            <div 
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] pointer-events-none"
              style={{
                boxShadow: 'inset -70px 0 70px -35px rgba(255, 255, 255, 0.5)'
              }}
            ></div>
            
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
              <div className="max-w-2xl text-left">
                {/* Search Form - H1 başlık formun içinde - Mobilde arka plan resmi ile */}
                <HomeHeroForm />
                
                {/* Service Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-3 mt-6 mb-6">
                  {/* Umzug Button */}
                  <Link 
                    href="/kostenlose-offerte-anfordern?step=2&service=umzug"
                    className="w-full flex items-center gap-3 sm:flex-col sm:items-center sm:text-center p-4 sm:p-4 border-2 rounded-xl transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg group"
                  >
                    <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                      <Truck className="w-5 h-5 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-base sm:text-base text-gray-900">Umzug</p>
                      <p className="text-xs sm:text-xs text-gray-600 mt-1 leading-snug">Privat, Geschäftlich, International & Spezial</p>
                    </div>
                  </Link>
                  
                  {/* Reinigung Button */}
                  <Link 
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                    className="w-full flex items-center gap-3 sm:flex-col sm:items-center sm:text-center p-4 sm:p-4 border-2 rounded-xl transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-lg group"
                  >
                    <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                      <Sparkles className="w-5 h-5 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-base sm:text-base text-gray-900">Reinigung</p>
                      <p className="text-xs sm:text-xs text-gray-600 mt-1 leading-snug">Umzugs-, Büro-, Fensterreinigung & mehr</p>
                    </div>
                  </Link>
                  
                  {/* Räumung & Entsorgung Button */}
                  <Link 
                    href="/kostenlose-offerte-anfordern?service=raeumung&step=2"
                    className="w-full flex items-center gap-3 sm:flex-col sm:items-center sm:text-center p-4 sm:p-4 border-2 rounded-xl transition-all duration-300 bg-white border-gray-200 hover:border-red-500 hover:bg-red-50 hover:shadow-lg group"
                  >
                    <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-100 group-hover:bg-red-500 transition-colors">
                      <Trash2 className="w-5 h-5 sm:w-5 sm:h-5 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-base sm:text-base text-gray-900">Entsorgung</p>
                      <p className="text-xs sm:text-xs text-gray-600 mt-1 leading-snug">Wohnung, Haus, Keller & Estrich</p>
                    </div>
                  </Link>
                  
                  {/* Klaviertransport Button */}
                  <Link 
                    href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport"
                    className="w-full flex items-center gap-3 sm:flex-col sm:items-center sm:text-center p-4 sm:p-4 border-2 rounded-xl transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-lg group"
                  >
                    <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                      <svg className="w-5 h-5 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8"/><path d="M2 14h20"/><path d="M6 14v4"/><path d="M10 14v4"/><path d="M14 14v4"/><path d="M18 14v4"/></svg>
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-base sm:text-base text-gray-900">Klaviertransport</p>
                      <p className="text-xs sm:text-xs text-gray-600 mt-1 leading-snug">Klavier, Flügel & Piano sicher transportieren</p>
                    </div>
                  </Link>
                </div>
                
                {/* Rating Card */}
                <div 
                  className="bg-white rounded-xl p-5 sm:p-6 flex flex-col transition-all duration-300 mt-6"
                  style={{
                    boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex flex-row items-start gap-4">
                  <div className="flex-shrink-0 relative">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                      {/* Main 3D Star */}
                      <div className="absolute inset-0">
                        <Star className="w-14 h-14 sm:w-16 sm:h-16 text-yellow-400 fill-yellow-400 absolute inset-0" 
                          style={{ 
                            filter: 'drop-shadow(0 4px 8px rgba(234, 179, 8, 0.4)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                            transform: 'perspective(100px) rotateY(-5deg) rotateX(5deg)'
                          }} 
                        />
                        {/* Inner smaller star for 3D effect */}
                        <Star className="w-9 h-9 sm:w-10 sm:h-10 text-yellow-500 fill-yellow-500 absolute top-1 right-1" 
                          style={{ 
                            filter: 'drop-shadow(0 2px 4px rgba(234, 179, 8, 0.3))',
                            transform: 'perspective(100px) rotateY(-3deg) rotateX(3deg)'
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 pt-1 w-full md:w-auto">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1" style={{ left: '4px', position: 'relative' }}>Basierend auf echten Kundenbewertungen</p>
                    <div className="flex items-center gap-2 mb-2 relative" style={{ left: '4px', top: '-5px' }}>
                      <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
                        {[...Array(Math.floor(ratingStats.averageRating))].map((_, i) => (
                          <Star key={`full-${i}`} size={16} className="md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                        {ratingStats.averageRating % 1 !== 0 && (
                          <div className="relative flex-shrink-0">
                            <Star size={16} className="md:w-5 md:h-5 text-gray-300" />
                            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                              <Star size={16} className="md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                            </div>
                          </div>
                        )}
                        {[...Array(5 - Math.floor(ratingStats.averageRating) - (ratingStats.averageRating % 1 !== 0 ? 1 : 0))].map((_, i) => (
                          <Star key={`empty-${i}`} size={16} className="md:w-5 md:h-5 text-gray-300" />
                        ))}
                      </div>
                      <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight whitespace-nowrap">
                        Ø {ratingStats.averageRating.toFixed(1)}/5 ({ratingStats.reviewCount}{' '}
                        <Link 
                          href="/kunden-bewertungen"
                          className="underline"
                        >
                          Bewertungen
                        </Link>
                        )
                      </span>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Trust Badges + Hint - Separate Card */}
                <div 
                  className="bg-white rounded-xl p-5 sm:p-6 flex flex-col gap-3 transition-all duration-300 mt-4"
                  style={{
                    boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg flex-shrink-0">💡</span>
                    <p className="text-sm sm:text-base font-medium text-green-800">
                      Statt 5 Firmen einzeln zu kontaktieren, genügt eine einzige Anfrage.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">Kostenlos & unverbindlich</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">Nur geprüfte Firmen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">Zeit und Geld sparen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* So einfach geht's Section */}
          <section className="py-12 md:py-16 lg:py-20 bg-white relative z-10">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <h2 className="heading-2 mb-8 md:mb-12 text-left">
                So einfach geht's:
                  </h2>
                  
              {/* Steps - Scrollable on mobile */}
              <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
                <div className="flex md:grid md:grid-cols-3 gap-6 min-w-max md:min-w-0">
                  {/* Step 1 */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 flex-shrink-0 w-[280px] md:w-auto shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold w-fit mb-6">
                      Schritt 1
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="heading-4 mb-3 text-center">
                      Anfrage ausfüllen
                    </h3>
                    <p className="text-body text-center text-sm">
                      Beschreiben Sie Ihr Projekt in wenigen Schritten online.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 flex-shrink-0 w-[280px] md:w-auto shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold w-fit mb-6">
                      Schritt 2
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <GitCompareArrows className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="heading-4 mb-3 text-center">
                      Offerten erhalten
                    </h3>
                    <p className="text-body text-center text-sm">
                      Bis zu 5 kostenlose Angebote von geprüften Partnern.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 flex-shrink-0 w-[280px] md:w-auto shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold w-fit mb-6">
                      Schritt 3
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="heading-4 mb-3 text-center">
                      Anbieter wählen
                    </h3>
                    <p className="text-body text-center text-sm">
                      Vergleichen & den besten Anbieter auswählen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Warum Aroundhome? Section */}
          <section className="py-12 md:py-16 lg:py-20 bg-white">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Side - Image */}
                <div className="relative order-2 lg:order-1">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <NextImage
                      src="/bilder/83ae5b64-b499-4641-969f-9cc07997a27.webp"
                      alt="Zufriedene Kunden"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Yellow L-shaped accent */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-yellow-400 opacity-90 rounded-br-3xl"></div>
                  </div>
                </div>

                {/* Right Side - Text Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h2 className="heading-2 mb-3 text-center px-4 py-2 rounded-lg bg-green-50">
                      Warum Online-offerten.ch
                    </h2>
                    <h3 className="heading-3 mb-6">
                      Ihre Vorteile mit unserer Vermittlung
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Reason 1 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="heading-4 mb-2">
                          100 % kostenlos
                        </h3>
                        <p className="text-body leading-relaxed">
                          Unser Service ist für Sie völlig kostenfrei. Die Finanzierung erfolgt über die teilnehmenden Fachanbieter.
                        </p>
                      </div>
                    </div>

                    {/* Reason 2 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="heading-4 mb-2">
                          Unverbindlich & risikofrei
                        </h3>
                        <p className="text-body leading-relaxed">
                          Das Einholen und Vergleichen von Angeboten ist für Sie jederzeit unverbindlich – ohne Verpflichtungen.
                        </p>
                      </div>
                    </div>

                    {/* Reason 3 */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="heading-4 mb-2">
                          Passende Anbieter für Ihr Projekt
                        </h3>
                        <p className="text-body leading-relaxed">
                          Sie erhalten ausschliesslich Vorschläge von Anbietern, die fachlich und inhaltlich zu Ihrem Projekt passen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section - SERVER RENDERED with long content */}
          <section 
            className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 overflow-hidden relative"
            style={{
              backgroundImage: 'url(https://online-offerten.ch/image/7946a949-0354-4f72-aff6-a406d89f84db.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/85 to-green-50/40 pointer-events-none z-10"></div>
            <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-20">
              <div className="text-left sm:text-center mb-12 md:mb-16">
                <h2 className="heading-2 mb-4">
                  Online-Anfragen stellen, Offerten vergleichen und passende, günstige Anbieter finden
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                {/* Umzugsfirma */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Truck className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-4 mb-2 group-hover:text-blue-600 transition-colors">
                          Umzugsfirma
                        </h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-body leading-relaxed mb-4">
                        Ein Umzug muss nicht anstrengend sein – mit den passenden <Link href="/umzugsfirma" className="text-gray-900 hover:opacity-80 font-semibold underline transition-opacity">Umzugsfirmen</Link> an Ihrer Seite wird er schnell und unkompliziert. Unsere erfahrenen Partner kümmern sich um jeden Schritt des Umzugs, von der detaillierten Planung bis zur reibungslosen Umsetzung.
                      </p>
                      <p className="text-body leading-relaxed">
                        Lehnen Sie sich entspannt zurück, während qualifizierte Umzugsexperten Ihre Möbel und Haushaltsgegenstände sicher, sorgfältig und termingerecht an Ihren neuen Wohnort transportieren. Ein Umzugsunternehmen aus der eigenen Region kann dabei besonders flexibel auf Ihre individuellen Bedürfnisse eingehen.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="/umzugsfirma-in-der-naehe" className="inline-flex items-center">
                        Umzugsfirma finden
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Reinigungsfirma */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-4 mb-2 group-hover:text-orange-600 transition-colors">
                          Reinigungsfirma
                        </h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-body leading-relaxed mb-4">
                        Ob nach einem Umzug, einer Renovation oder für die regelmässige Reinigung – unsere professionellen Reinigungsunternehmen garantieren höchste Sauberkeit mit umweltfreundlichen Reinigungsmitteln und höchster Qualität.
                      </p>
                      <p className="text-body leading-relaxed">
                        Zu den wichtigsten Dienstleistungen zählen die <Link href="/reinigung/umzugsreinigung" className="text-gray-900 hover:opacity-80 font-semibold underline transition-opacity">Endreinigung</Link> und <Link href="/reinigung/umzugsreinigung" className="text-gray-900 hover:opacity-80 font-semibold underline transition-opacity">Umzugsreinigung</Link> für die Wohnungsübergabe sowie die professionelle <Link href="/reinigung/bueroreinigung" className="text-gray-900 hover:opacity-80 font-semibold underline transition-opacity">Büroreinigung</Link> für Geschäftskunden. Ein erfahrenes Team sorgt mit fachmännischer Arbeit für einen positiven Eindruck.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="/reinigungsfirma" className="inline-flex items-center">
                        Reinigungsfirma finden
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Maler */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Paintbrush className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-4 mb-2 group-hover:text-purple-600 transition-colors">
                          Malerarbeiten
                        </h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-body leading-relaxed mb-4">
                        Qualifizierte Malerbetriebe bieten Ihnen professionelle <Link href="/malerarbeitenkosten" className="text-gray-900 hover:opacity-80 font-semibold underline transition-opacity">Malerarbeiten</Link> für Innen- und Aussenbereiche. Sie übernehmen dabei auch das fachgerechte Streichen und Lackieren von Decken, sodass alle Flächen optimal geschützt und gestaltet werden.
                      </p>
                      <p className="text-body leading-relaxed">
                        Ob Renovation von Wohnräumen oder fachgerechte Fassadengestaltung – unsere erfahrenen Maler sorgen für frische Farben und ein makelloses Ergebnis. Mit modernen Arbeitstechniken und hochwertigen Materialien verleihen sie Ihrem Zuhause ein neues, stilvolles Erscheinungsbild.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="/malerfirma" className="inline-flex items-center">
                        Maler finden
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Client Components - Interactive parts */}
      <HomePageClient initialReviews={reviews} initialPosts={posts} />

          {/* SEO Content Section */}
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <h2 className="heading-2 mb-4">
                  Umzugsfirmen, Reinigungsfirmen und Malerarbeiten vergleichen
                </h2>
                <p className="text-body mb-8">
                  Mehrere Offerten erhalten und passende Anbieter auswählen
                </p>
                <p className="text-body mb-8 leading-relaxed">
                  Mit Online-offerten.ch findest du zuverlässige Anbieter für Umzüge, Reinigungen und Malerarbeiten. Vergleiche mehrere Offerten aus deiner Region und wähle den Dienstleister, der am besten zu deinem Projekt passt.
                </p>

                {/* Ana Hizmet Blokları */}
                <div className="space-y-12 mb-16">
                  <div>
                    <h2 className="heading-2 mb-4">
                      Umzugsfirma finden – einfach und unkompliziert
                    </h2>
                    <p className="text-body mb-6">
                      Geprüfte Anbieter für Privatumzüge, Firmenumzüge und internationale Umzüge
                    </p>

                    <p className="text-body mb-6 leading-relaxed">
                      Ein Umzug erfordert Planung und Vertrauen. Über Online-offerten.ch erhältst du Offerten von geprüften Umzugsfirmen für Privatumzüge, Firmenumzüge sowie internationale Umzüge. So kannst du Preise und Leistungen vergleichen und schnell die passende Umzugsfirma finden.
                    </p>

                    <h3 className="heading-3 mb-4">
                      Transparente Offerten und seriöse Umzugsfirmen
                    </h3>
                    <p className="text-body mb-6 leading-relaxed">
                      Alle vermittelten Umzugsfirmen erstellen klare und transparente Offerten. Durch den Vergleich mehrerer Angebote sparst du Zeit und Kosten und triffst eine fundierte Entscheidung für dein Umzugsprojekt.
                    </p>
                  </div>

                  <div>
                    <h2 className="heading-2 mb-4">
                      Reinigungsfirma für Endreinigung und Umzugsreinigung vergleichen
                    </h2>
                    <p className="text-body mb-6">
                      Professionelle Reinigungsfirmen für Wohnung und Büro
                    </p>

                    <p className="text-body mb-6 leading-relaxed">
                      Ob Endreinigung nach dem Umzug, Umzugsreinigung oder Büroreinigung – über Online-offerten.ch findest du erfahrene Reinigungsfirmen. Vergleiche Offerten, prüfe Preise und Leistungen und wähle die Reinigungsfirma, die optimal zu deinem Bedarf passt.
                    </p>

                    <h3 className="heading-3 mb-4">
                      Zuverlässige Endreinigung für eine reibungslose Wohnungsabgabe
                    </h3>
                    <p className="text-body mb-6 leading-relaxed">
                      Unsere Partnerfirmen führen Endreinigungen zuverlässig gemäss den Vorgaben für die Wohnungsübergabe durch. So kannst du deine Wohnung stressfrei abgeben und sicher sein, dass alle Anforderungen erfüllt sind.
                    </p>
                  </div>

                  <div>
                    <h2 className="heading-2 mb-4">
                      Malerarbeiten vergleichen und erfahrene Malerbetriebe finden
                    </h2>
                    <p className="text-body mb-6">
                      Professionelle Malerarbeiten für Innen- und Aussenbereiche
                    </p>

                    <p className="text-body mb-6 leading-relaxed">
                      Für Renovationen im Innen- und Aussenbereich vermitteln wir qualifizierte Anbieter für Malerarbeiten. Vergleiche Offerten für Streichen, Lackieren oder Fassadenarbeiten und finde den passenden Malerbetrieb für dein Projekt.
                    </p>

                    <p className="text-body mb-6 leading-relaxed">
                      Hochwertige Materialien und moderne Arbeitstechniken sorgen für saubere, langlebige und optisch überzeugende Ergebnisse.
                    </p>
                  </div>

                </div>

                {/* Warum Online-offerten.ch */}
                <div className="space-y-8 mb-16">
                  <h2 className="heading-2 mb-8">
                    Warum Online-offerten.ch die richtige Wahl ist
                  </h2>

                  <h3 className="heading-3 mb-4">
                    Kostenlose und unverbindliche Offerten
                  </h3>
                  <p className="text-body mb-6 leading-relaxed">
                    Du erhältst mehrere Offerten kostenlos und unverbindlich. So kannst du Anbieter vergleichen, ohne Zeit zu verlieren oder Verpflichtungen einzugehen.
                  </p>

                  <h3 className="heading-3 mb-4">
                    Zeit- und Kostenersparnis durch direkten Vergleich
                  </h3>
                  <p className="text-body mb-6 leading-relaxed">
                    Der Vergleich verschiedener Anbieter hilft dir, Preise und Leistungen transparent gegenüberzustellen und die beste Entscheidung für dein Projekt zu treffen.
                  </p>
                </div>

                {/* So funktioniert Online-offerten.ch */}
                <div className="space-y-8 mb-12">
                  <h2 className="heading-2 mb-8">
                    So funktioniert Online-offerten.ch
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="heading-3 mb-3">
                        1. Anfrage ausfüllen
                      </h3>
                      <p className="text-body mb-4 leading-relaxed">
                        Beschreibe dein Projekt in wenigen Schritten und sende deine Anfrage ab.
                      </p>
                    </div>

                    <div>
                      <h3 className="heading-3 mb-3">
                        2. Offerten erhalten und vergleichen
                      </h3>
                      <p className="text-body mb-4 leading-relaxed">
                        Erhalte mehrere Offerten von passenden Anbietern und vergleiche Preise, Leistungen und Bewertungen direkt online.
                      </p>
                    </div>

                    <div>
                      <h3 className="heading-3 mb-3">
                        3. Anbieter auswählen
                      </h3>
                      <p className="text-body mb-4 leading-relaxed">
                        Wähle den Dienstleister, der dein Projekt zuverlässig, effizient und kostengünstig umsetzt.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-left mt-12">
                  <Link href="/kostenlose-offerte-anfordern" className="text-lg font-semibold text-green-600 hover:text-green-700 underline transition-colors">
                    Jetzt kostenlose Offerten anfordern und passende Dienstleister finden →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}







