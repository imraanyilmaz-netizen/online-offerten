import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import HomePageClient from '@/components/pages/HomePageClient'
import type { Metadata } from 'next'
import Link from 'next/link'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, Home, Sparkles, Paintbrush,
  GitCompareArrows, Award,
  MapPin, Calculator,
  ArrowRight,
  ShieldCheck, Search, Truck, Trash2, Sprout, Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Offerten vergleichen - Kostenlose Offerten für Umzug & Reinigung',
  description: 'Kostenlose Offerten für Umzug, Reinigung & Renovierung vergleichen. Bis zu 40% sparen mit geprüften Firmen aus Ihrer Region. Unverbindlich & transparent.',
  alternates: {
    canonical: 'https://online-offerten.ch/',
  },
  openGraph: {
    title: 'Offerten vergleichen - Kostenlose Offerten für Umzug & Reinigung',
    description: 'Bis zu 40% sparen mit geprüften Firmen aus Ihrer Region',
    url: 'https://online-offerten.ch/',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Offerten vergleichen - Kostenlose Offerten für Umzug & Reinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offerten vergleichen - Kostenlose Offerten',
    description: 'Bis zu 40% sparen mit geprüften Firmen',
    images: ['https://online-offerten.ch/image/og-image.jpg'],
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

async function getHomePageData() {
  const supabase = await createClient()
  
  // Fetch reviews, posts, and rating stats in parallel
  const [reviewsResult, postsResult, ratingStatsResult] = await Promise.all([
    supabase
      .from('customer_reviews')
      .select(`
        id, customer_name, rating, city, review_date, 
        rating_price, rating_workflow, rating_administration, 
        review_text,
        service_type, partner_name,
        partners (slug, company_name)
      `)
      .eq('approval_status', 'approved')
      .eq('show_on_homepage', true)
      .not('partner_id', 'is', null)
      .order('review_date', { ascending: false })
      .limit(9),
    supabase
      .from('posts')
      .select('id, title, slug, meta_description, featured_image_url, category, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(9),
    // Fetch all approved reviews for rating calculation
    supabase
      .from('customer_reviews')
      .select('rating')
      .eq('approval_status', 'approved')
  ])

  // Calculate average rating and total count
  let averageRating = 0
  let reviewCount = 0
  
  if (ratingStatsResult.data && ratingStatsResult.data.length > 0) {
    const totalRating = ratingStatsResult.data.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
    averageRating = totalRating / ratingStatsResult.data.length
    reviewCount = ratingStatsResult.data.length + 142 // Add 142 as requested
  } else {
    reviewCount = 142 // Default count if no reviews
  }

  return {
    reviews: reviewsResult.data || [],
    posts: postsResult.data || [],
    ratingStats: {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      reviewCount
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
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch",
      "logo": "https://online-offerten.ch/image/online-offerten.ch.jpg",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@online-offerten.ch",
        "areaServed": "CH",
        "availableLanguage": ["de"]
      },
      "sameAs": [
        "https://online-offerten.ch"
      ]
    },
    {
      "@type": "Service",
      "name": "Kostenlose Offerten für Umzug, Reinigung & Renovierung",
      "description": "Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und bis zu 40% sparen.",
      "alternateName": "Offerten Portal aus Ihrer Region",
      "serviceType": [
        "Umzugsdienst",
        "Reinigungsdienst",
        "Malerarbeiten",
        "Gartenarbeiten",
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
            "text": "Sie füllen ein kurzes Formular aus, in dem Sie Ihre Anforderungen beschreiben. Wir leiten Ihre Anfrage an bis zu 6 passende Partnerfirmen in Ihrer Region weiter. Diese kontaktieren Sie direkt mit individuellen Offerten. Sie vergleichen die Angebote und wählen das beste aus."
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
            "text": "Sie können Offerten für Umzüge (Privatumzug, Geschäftsumzug, Auslandumzug, Spezialtransporte), Reinigungsdienstleistungen (Wohnungsreinigung, Büroreinigung, Umzugsreinigung, Grundreinigung), Malerarbeiten (Innen- und Aussenanstriche) sowie Gartenpflege anfordern."
          }
        }
      ]
    }
  ]
}

export default async function HomePage() {
  const { reviews, posts, ratingStats } = await getHomePageData()

  return (
    <>
      {/* Preload hero image for faster LCP */}
      <link
        rel="preload"
        as="image"
        href="/image/online-offerten.webp"
        fetchPriority="high"
      />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="flex flex-col">
        <main className="flex-grow">
          {/* Hero Section - SEO Optimized - SERVER RENDERED */}
          <section 
            className="relative w-full py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden" 
            aria-label="Hero Section - Kostenlose Offerten für Umzug, Reinigung und Renovierung"
          >
            {/* Background Image - Right Side - Desktop Only */}
            <div 
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] h-full bg-cover lg:bg-right bg-no-repeat"
              style={{
                backgroundImage: `url('/image/online-offerten.webp')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
              }}
            ></div>
            
            {/* Gradient Overlay - White from left to right with shadow effect - Desktop Only */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent"></div>
            
            {/* White shadow/glow effect towards the image - Desktop Only */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/8 pointer-events-none"></div>
            <div 
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] pointer-events-none"
              style={{
                boxShadow: 'inset -70px 0 70px -35px rgba(255, 255, 255, 0.5)'
              }}
            ></div>
            
            <div className="container mx-auto max-w-navbar px-4 sm:px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 lg:items-start">
                {/* Left Column - Content */}
                <div className="order-1 lg:order-1 text-center lg:text-left space-y-6 sm:space-y-8">
                  <h1 className="text-[40px] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight text-left" style={{ fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    <span className="text-gray-900">Offerten vergleichen</span> & den passenden Anbieter finden
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto md:mx-0 lg:mx-0 text-left">
                    Finden Sie qualifizierte Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen in Ihrer Region – verglichen, geprüft & bis zu 40% günstiger. Unsere Plattform ist speziell auf die Bedürfnisse des Schweizer Marktes und die dortigen Standards ausgerichtet. Endlich stressfrei: Vertrauenswürdige Partner finden & vergleichen
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Button
                      asChild
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                    >
                      <Link href="/kostenlose-offerte-anfordern">
                        <Search className="mr-2 h-5 w-5" />
                        Jetzt Offerten vergleichen
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 hover:bg-gray-50 w-full sm:w-auto"
                    >
                      <Link href="#kosten-berechnen">
                        <Calculator className="mr-2 h-5 w-5" />
                        Kosten berechnen
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits Section */}
          <section className="py-8 md:py-12 lg:py-16 bg-white">
            <div className="container mx-auto max-w-navbar px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Column - Trust Badge & Features List */}
                <div className="space-y-6 lg:-mt-8">
                  {/* Rating Card */}
                  <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-all duration-300">
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
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-2">
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
                        <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">
                          Ø {ratingStats.averageRating.toFixed(1)}/5 ({ratingStats.reviewCount} Bewertungen)
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Unsere Partnerfirmen aus den Bereichen Umzug, Reinigung, Malerarbeiten und Gartenarbeit wurden von bisherigen Kundinnen und Kunden mit durchschnittlich <span className="font-semibold text-gray-900">Ø {ratingStats.averageRating.toFixed(1)}/5 Sternen</span> bewertet.
                      </p>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <p className="text-sm sm:text-base text-gray-900 font-bold text-left">
                    Die Anfrage ist kostenlos und unverbindlich.
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">Geprüfte Anbieter aus Ihrer Region</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700 text-left">Für mehr Sicherheit werden alle Anbieter sorgfältig geprüft und durchlaufen einen Background-Check, um Risiken für unsere Kunden zu minimieren.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">Unverbindliche Anfrage – keine Verpflichtung</span>
                    </div>
                  </div>
                </div>
                
                 {/* Right Column - Mobile/Tablet Image & Benefits Card */}
                 <div className="space-y-6 lg:-mt-36 relative" style={{ zIndex: 1000 }}>
                   {/* Mobile & Tablet Image - Only visible on mobile and tablet, above benefits card */}
                   <div className="flex items-center justify-center lg:hidden">
                     <NextImage 
                       src="/image/online-offerten.webp" 
                       alt="Online Offerten" 
                       width={600}
                       height={400}
                       className="w-full h-auto max-w-full rounded-xl shadow-lg"
                       priority
                       quality={85}
                       sizes="(max-width: 1024px) 100vw, 600px"
                     />
                   </div>
                   
                   <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border-2 sm:border-4 border-green-200 h-full">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                      Ihre Vorteile auf einen Blick
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Lokale Partner in Ihrer Nähe</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Unverbindliche Anfrage</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <GitCompareArrows className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Mehrere Offerten vergleichen</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Transparente Preise & individuelle Offerten</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section - SERVER RENDERED with long content */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 overflow-hidden">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                {/* Umzugsfirma */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Truck className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Umzugsfirma</h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-gray-700 leading-relaxed text-base">
                        Ein Umzug muss nicht anstrengend sein – mit den passenden <Link href="https://online-offerten.ch/umzugsfirma" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Umzugsfirmen</Link> an Ihrer Seite wird er schnell und unkompliziert. Unsere erfahrenen Partner kümmern sich um jeden Schritt des Umzugs, von der detaillierten Planung bis zur reibungslosen Umsetzung.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        Lehnen Sie sich entspannt zurück, während qualifizierte Umzugsexperten Ihre Möbel und Haushaltsgegenstände sicher, sorgfältig und termingerecht an Ihren neuen Wohnort transportieren. Ein Umzugsunternehmen aus der eigenen Region kann dabei besonders flexibel auf Ihre individuellen Bedürfnisse eingehen.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="https://online-offerten.ch/umzugsfirma-in-der-naehe" className="inline-flex items-center">
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
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Reinigungsfirma</h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-gray-700 leading-relaxed text-base">
                        Ob nach einem Umzug, einer Renovation oder für die regelmässige Reinigung – unsere professionellen Reinigungsunternehmen garantieren höchste Sauberkeit mit umweltfreundlichen Reinigungsmitteln und höchster Qualität.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        Zu den wichtigsten Dienstleistungen zählen die <Link href="/umzugsreinigung" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Endreinigung</Link> und <Link href="/umzugsreinigung" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Umzugsreinigung</Link> für die Wohnungsübergabe sowie die professionelle <Link href="/bueroreinigung" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Büroreinigung</Link> für Geschäftskunden. Ein erfahrenes Team sorgt mit fachmännischer Arbeit für einen positiven Eindruck.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="https://online-offerten.ch/reinigungsfirma-in-der-naehe" className="inline-flex items-center">
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
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Malerarbeiten</h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-gray-700 leading-relaxed text-base">
                        Qualifizierte Malerbetriebe bieten Ihnen professionelle <Link href="https://online-offerten.ch/malerarbeiten" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Malerarbeiten</Link> für Innen- und Aussenbereiche. Sie übernehmen dabei auch das fachgerechte Streichen und Lackieren von Decken, sodass alle Flächen optimal geschützt und gestaltet werden.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        Ob Renovation von Wohnräumen oder fachgerechte Fassadengestaltung – unsere erfahrenen Maler sorgen für frische Farben und ein makelloses Ergebnis. Mit modernen Arbeitstechniken und hochwertigen Materialien verleihen sie Ihrem Zuhause ein neues, stilvolles Erscheinungsbild.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="https://online-offerten.ch/malerarbeiten" className="inline-flex items-center">
                        Maler finden
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Gartenarbeit */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Sprout className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Gartenarbeit</h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-gray-700 leading-relaxed text-base">
                        Ein gepflegter Garten steigert nicht nur den Wohnkomfort, sondern auch den Wert Ihrer Immobilie. Unsere erfahrenen Garten-Partner unterstützen Sie bei sämtlichen Gartenarbeiten – von der regelmässigen Pflege bis zur fachgerechten Umgestaltung Ihres Aussenbereichs.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        Zu den angebotenen Dienstleistungen zählen unter anderem Rasenpflege, Heckenschnitt, Baumschnitt sowie die saisonale Gartenpflege. Ob kleiner Privatgarten oder grössere Grünflächen – wir vermitteln Ihnen zuverlässige Gartenprofis, die sauber, effizient und termingerecht arbeiten.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="https://online-offerten.ch/gartenarbeit" className="inline-flex items-center">
                        Gartenarbeit finden
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Umzugsfirmen, Reinigungsfirmen, Malerarbeiten & Gartenarbeit vergleichen
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Mehrere Offerten erhalten und passende Anbieter auswählen
                </p>
                <p className="text-base text-gray-700 mb-8 leading-relaxed">
                  Mit Online-offerten.ch findest du zuverlässige Anbieter für Umzüge, Reinigungen, Malerarbeiten und Gartenarbeit. Vergleiche mehrere Offerten aus deiner Region und wähle den Dienstleister, der am besten zu deinem Projekt passt.
                </p>

                {/* Ana Hizmet Blokları */}
                <div className="space-y-12 mb-16">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      Umzugsfirma finden – einfach und unkompliziert
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Geprüfte Anbieter für Privatumzüge, Firmenumzüge und internationale Umzüge
                    </p>

                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Ein Umzug erfordert Planung und Vertrauen. Über Online-offerten.ch erhältst du Offerten von geprüften Umzugsfirmen für Privatumzüge, Firmenumzüge sowie internationale Umzüge. So kannst du Preise und Leistungen vergleichen und schnell die passende Umzugsfirma finden.
                    </p>

                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                      Transparente Offerten und seriöse Umzugsfirmen
                    </h3>
                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Alle vermittelten Umzugsfirmen erstellen klare und transparente Offerten. Durch den Vergleich mehrerer Angebote sparst du Zeit und Kosten und triffst eine fundierte Entscheidung für dein Umzugsprojekt.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      Reinigungsfirma für Endreinigung und Umzugsreinigung vergleichen
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Professionelle Reinigungsfirmen für Wohnung und Büro
                    </p>

                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Ob Endreinigung nach dem Umzug, Umzugsreinigung oder Büroreinigung – über Online-offerten.ch findest du erfahrene Reinigungsfirmen. Vergleiche Offerten, prüfe Preise und Leistungen und wähle die Reinigungsfirma, die optimal zu deinem Bedarf passt.
                    </p>

                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                      Zuverlässige Endreinigung für eine reibungslose Wohnungsabgabe
                    </h3>
                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Unsere Partnerfirmen führen Endreinigungen zuverlässig gemäss den Vorgaben für die Wohnungsübergabe durch. So kannst du deine Wohnung stressfrei abgeben und sicher sein, dass alle Anforderungen erfüllt sind.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      Malerarbeiten vergleichen und erfahrene Malerbetriebe finden
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Professionelle Malerarbeiten für Innen- und Aussenbereiche
                    </p>

                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Für Renovationen im Innen- und Aussenbereich vermitteln wir qualifizierte Anbieter für Malerarbeiten. Vergleiche Offerten für Streichen, Lackieren oder Fassadenarbeiten und finde den passenden Malerbetrieb für dein Projekt.
                    </p>

                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Hochwertige Materialien und moderne Arbeitstechniken sorgen für saubere, langlebige und optisch überzeugende Ergebnisse.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      Gartenarbeit einfach vergleichen und passende Gartenprofis finden
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Gartenarbeit und Gartenpflege aus einer Hand
                    </p>

                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Ob regelmässige Gartenarbeit oder einmalige Gartenpflege – Online-offerten.ch bringt dich mit geprüften Anbietern für sämtliche Gartenarbeiten zusammen. Vergleiche Offerten für Rasenpflege, Heckenschnitt, Baumschnitt oder saisonale Gartenarbeit.
                    </p>

                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Unsere Garten-Partner arbeiten effizient, zuverlässig und termingerecht – für gepflegte Grünflächen und einen ansprechenden Aussenbereich.
                    </p>
                  </div>
                </div>

                {/* Warum Online-offerten.ch */}
                <div className="space-y-8 mb-16">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                    Warum Online-offerten.ch die richtige Wahl ist
                  </h2>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                    Kostenlose und unverbindliche Offerten
                  </h3>
                  <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Du erhältst mehrere Offerten kostenlos und unverbindlich. So kannst du Anbieter vergleichen, ohne Zeit zu verlieren oder Verpflichtungen einzugehen.
                  </p>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                    Zeit- und Kostenersparnis durch direkten Vergleich
                  </h3>
                  <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Der Vergleich verschiedener Anbieter hilft dir, Preise und Leistungen transparent gegenüberzustellen und die beste Entscheidung für dein Projekt zu treffen.
                  </p>
                </div>

                {/* So funktioniert Online-offerten.ch */}
                <div className="space-y-8 mb-12">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                    So funktioniert Online-offerten.ch
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                        1. Anfrage ausfüllen
                      </h3>
                      <p className="text-base text-gray-700 mb-4 leading-relaxed">
                        Beschreibe dein Projekt in wenigen Schritten und sende deine Anfrage ab.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                        2. Offerten erhalten und vergleichen
                      </h3>
                      <p className="text-base text-gray-700 mb-4 leading-relaxed">
                        Erhalte mehrere Offerten von passenden Anbietern und vergleiche Preise, Leistungen und Bewertungen direkt online.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                        3. Anbieter auswählen
                      </h3>
                      <p className="text-base text-gray-700 mb-4 leading-relaxed">
                        Wähle den Dienstleister, der dein Projekt zuverlässig, effizient und kostengünstig umsetzt.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-left mt-12">
                  <p className="text-lg font-semibold text-gray-900">
                    Jetzt Offerten vergleichen und passende Dienstleister finden
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}





