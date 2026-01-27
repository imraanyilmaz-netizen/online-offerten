import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { createStaticClient } from '@/lib/supabase/server'
import HomeHeroForm from '@/components/HomeHeroForm'

// Lazy load HomePageClient to improve initial page load performance
const HomePageClient = dynamic(() => import('@/components/pages/HomePageClient'), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" /> // Placeholder to prevent layout shift
})
import type { Metadata } from 'next'
import Link from 'next/link'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Star, ArrowRight, MapPin, CheckCircle, 
  FileText, Users, GitCompareArrows, 
  Truck, Sparkles, Paintbrush, Sprout, 
  ShieldCheck, Award
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

// ISR: Sayfa 1 saatte bir otomatik yenilenecek (3600 saniye)
// Bu sayfa statik olarak build edilir, ancak 1 saatte bir arka planda yenilenir
// SEO için daha hızlı yükleme ve daha iyi performans sağlar
export const revalidate = 3600 // 1 saat

async function getHomePageData() {
  const supabase = createStaticClient()
  
  // Fetch reviews, posts, and rating stats in parallel with optimized queries
  // Using select with specific fields to reduce data transfer
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
  let uiReviewCount = 0 // Separate count for UI display only
  
  if (ratingStatsResult.data && ratingStatsResult.data.length > 0) {
    const totalRating = ratingStatsResult.data.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
    averageRating = totalRating / ratingStatsResult.data.length
    reviewCount = ratingStatsResult.data.length // Real review count for JSON-LD
    uiReviewCount = ratingStatsResult.data.length + 142 // UI display count (with legacy adjustment)
  } else {
    reviewCount = 0 // Real count for JSON-LD
    uiReviewCount = 142 // Default UI count if no reviews
  }

  return {
    reviews: reviewsResult.data || [],
    posts: postsResult.data || [],
    ratingStats: {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      reviewCount, // Real count for JSON-LD (if needed)
      uiReviewCount // Display count for UI
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
      {/* Preload critical resources for faster LCP */}
      <link
        rel="preload"
        as="image"
        href="/fotos/3b38703d-321c-4732-86ce-557415232adb.webp"
        fetchPriority="high"
        type="image/webp"
      />
      <link
        rel="dns-prefetch"
        href="https://online-offerten.ch"
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
            className="relative w-full py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-[#effcf1] lg:bg-[#dbeadf] z-20" 
            aria-label="Hero Section - Kostenlose Offerten für Umzug, Reinigung und Renovierung"
          >
            {/* Background Image - Right Side - Desktop Only - Optimized with Next.js Image */}
            <div className="hidden lg:block absolute -right-60 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] h-full overflow-hidden">
              <NextImage
                src="/fotos/3b38703d-321c-4732-86ce-557415232adb.webp"
                alt=""
                fill
                priority
                quality={75}
                className="object-cover object-right"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
                }}
                sizes="(max-width: 1024px) 100vw, 55vw"
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
              <div className="max-w-3xl text-left">
                {/* Search Form - H1 başlık formun içinde - Mobilde arka plan resmi ile */}
                <HomeHeroForm />
                
                {/* Rating Card */}
                <div 
                  className="bg-white rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-start items-start gap-4 transition-all duration-300 mt-6"
                  style={{
                    boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
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
                        Ø {ratingStats.averageRating.toFixed(1)}/5 ({ratingStats.uiReviewCount} Bewertungen)
                      </span>
                    </div>
                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-start items-center gap-4 mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600">Kostenlos & unverbindlich</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600">Nur geprüfte Firmen</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600">Bis zu 40% sparen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* So einfach geht's Section */}
          <section className="py-12 md:py-16 lg:py-20 bg-white relative z-10">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <h2 
                  className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-8 md:mb-12 text-left"
                  style={{
                    fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontWeight: 700,
                    color: '#1c1d16',
                    textAlign: 'start',
                    letterSpacing: 'normal',
                    wordSpacing: '0px',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    textDecoration: 'none',
                    textIndent: '0px'
                  }}
                >
                So einfach geht's:
                  </h2>
                  
              {/* Steps - Scrollable on mobile */}
              <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
                <div className="flex md:grid md:grid-cols-3 gap-6 min-w-max md:min-w-0">
                  {/* Step 1 */}
                  <div className="bg-green-50 rounded-2xl p-6 md:p-8 flex-shrink-0 w-[280px] md:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold w-fit mb-6">
                      Schritt 1
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 
                      className="text-[18px] md:text-[20px] leading-[26.6px] mb-3 text-center"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Formular ausfüllen
                    </h4>
                    <p 
                      className="text-center"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '14px',
                        lineHeight: '17.5px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Beschreiben Sie Ihr Projekt in unserem intelligenten Formular. Geben Sie dabei auch das Datum der Angebotserstellung an, um die Aktualität Ihres Anliegens zu dokumentieren. Je detaillierter Ihre Angaben, desto genauer die Offerten.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-green-50 rounded-2xl p-6 md:p-8 flex-shrink-0 w-[280px] md:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold w-fit mb-6">
                      Schritt 2
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <GitCompareArrows className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 
                      className="text-[18px] md:text-[20px] leading-[26.6px] mb-3 text-center"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Offerten vergleichen
                    </h4>
                    <p 
                      className="text-center"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '14px',
                        lineHeight: '17.5px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Sie erhalten bis zu 6 kostenlose Offerten von qualifizierten Partnern – schnell und unverbindlich. Die Offerten werden direkt an den Empfänger gesendet.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-green-50 rounded-2xl p-6 md:p-8 flex-shrink-0 w-[280px] md:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold w-fit mb-6">
                      Schritt 3
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h4 
                      className="text-[18px] md:text-[20px] leading-[26.6px] mb-3 text-center"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Anbieter wählen
                    </h4>
                    <p 
                      className="text-center"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '14px',
                        lineHeight: '17.5px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Vergleichen Sie Preise und Leistungen und wählen Sie den besten Partner – einfach, sicher und transparent. Kundenbewertungen helfen Ihnen dabei, die Qualität der Dienstleister besser einzuschätzen und eine fundierte Entscheidung zu treffen.
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
                      src="/bilder/umzug-reinigung-maler-gaertner-6-offerten-vergleichen-600-400.webp"
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
                    <h2 
                      className="text-[14px] md:text-[18px] leading-[18.62px] md:leading-[23.94px] mb-3 text-center px-4 py-2 rounded-lg"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'center',
                        backgroundColor: 'rgba(230, 246, 234, 1)',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Warum Online-offerten.ch
                    </h2>
                    <h3 
                      className="text-[22px] md:text-[28px] leading-[29.26px] md:leading-[37.24px] mb-6"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 600,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
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
                        <div 
                          className="mb-2"
                          style={{
                            fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '20px',
                            lineHeight: '26.6px',
                            fontWeight: 700,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          100 % kostenlos
                        </div>
                        <p 
                          className="leading-relaxed"
                          style={{
                            fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: 400,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
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
                        <div 
                          className="mb-2"
                          style={{
                            fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '20px',
                            lineHeight: '26.6px',
                            fontWeight: 700,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          Unverbindlich & risikofrei
                        </div>
                        <p 
                          className="leading-relaxed"
                          style={{
                            fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: 400,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
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
                        <div 
                          className="mb-2"
                          style={{
                            fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '20px',
                            lineHeight: '26.6px',
                            fontWeight: 700,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          Passende Anbieter für Ihr Projekt
                        </div>
                        <p 
                          className="leading-relaxed"
                          style={{
                            fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: 400,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          Sie erhalten ausschliesslich Vorschläge von Anbietern, die fachlich und inhaltlich zu Ihrem Projekt passen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits Section */}
          <section className="py-8 md:py-12 lg:py-16 bg-white">
            <div className="container mx-auto max-w-navbar px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Column - Features List */}
                <div className="space-y-6 lg:-mt-8">
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
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/85 to-green-50/40 pointer-events-none"></div>
            <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                {/* Umzugsfirma */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Truck className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="text-[18px] md:text-[20px] leading-[26.6px] mb-2 group-hover:text-blue-600 transition-colors"
                          style={{
                            fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: 700,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          Umzugsfirma
                        </h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p 
                        className="leading-relaxed mb-4"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Ein Umzug muss nicht anstrengend sein – mit den passenden <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Umzugsfirmen</Link> an Ihrer Seite wird er schnell und unkompliziert. Unsere erfahrenen Partner kümmern sich um jeden Schritt des Umzugs, von der detaillierten Planung bis zur reibungslosen Umsetzung.
                      </p>
                      <p 
                        className="leading-relaxed"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
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
                        <h4 
                          className="text-[18px] md:text-[20px] leading-[26.6px] mb-2 group-hover:text-orange-600 transition-colors"
                          style={{
                            fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: 700,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          Reinigungsfirma
                        </h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p 
                        className="leading-relaxed mb-4"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Ob nach einem Umzug, einer Renovation oder für die regelmässige Reinigung – unsere professionellen Reinigungsunternehmen garantieren höchste Sauberkeit mit umweltfreundlichen Reinigungsmitteln und höchster Qualität.
                      </p>
                      <p 
                        className="leading-relaxed"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Zu den wichtigsten Dienstleistungen zählen die <Link href="/reinigung/umzugsreinigung" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Endreinigung</Link> und <Link href="/reinigung/umzugsreinigung" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Umzugsreinigung</Link> für die Wohnungsübergabe sowie die professionelle <Link href="/reinigung/bueroreinigung" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Büroreinigung</Link> für Geschäftskunden. Ein erfahrenes Team sorgt mit fachmännischer Arbeit für einen positiven Eindruck.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="/reinigungsfirma-in-der-naehe" className="inline-flex items-center">
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
                        <h4 
                          className="text-[18px] md:text-[20px] leading-[26.6px] mb-2 group-hover:text-purple-600 transition-colors"
                          style={{
                            fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: 700,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          Malerarbeiten
                        </h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p 
                        className="leading-relaxed mb-4"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Qualifizierte Malerbetriebe bieten Ihnen professionelle <Link href="/malerarbeitenkosten" className="text-green-600 hover:text-green-700 font-semibold underline transition-colors">Malerarbeiten</Link> für Innen- und Aussenbereiche. Sie übernehmen dabei auch das fachgerechte Streichen und Lackieren von Decken, sodass alle Flächen optimal geschützt und gestaltet werden.
                      </p>
                      <p 
                        className="leading-relaxed"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Ob Renovation von Wohnräumen oder fachgerechte Fassadengestaltung – unsere erfahrenen Maler sorgen für frische Farben und ein makelloses Ergebnis. Mit modernen Arbeitstechniken und hochwertigen Materialien verleihen sie Ihrem Zuhause ein neues, stilvolles Erscheinungsbild.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="/malerfirma-in-der-naehe" className="inline-flex items-center">
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
                        <h4 
                          className="text-[18px] md:text-[20px] leading-[26.6px] mb-2 group-hover:text-green-600 transition-colors"
                          style={{
                            fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: 700,
                            color: '#1c1d16',
                            textAlign: 'start',
                            letterSpacing: 'normal',
                            wordSpacing: '0px',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            textDecoration: 'none',
                            textIndent: '0px'
                          }}
                        >
                          Gartenarbeit
                        </h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p 
                        className="leading-relaxed mb-4"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Ein gepflegter Garten steigert nicht nur den Wohnkomfort, sondern auch den Wert Ihrer Immobilie. Unsere erfahrenen Garten-Partner unterstützen Sie bei sämtlichen Gartenarbeiten – von der regelmässigen Pflege bis zur fachgerechten Umgestaltung Ihres Aussenbereichs.
                      </p>
                      <p 
                        className="leading-relaxed"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Zu den angebotenen Dienstleistungen zählen unter anderem Rasenpflege, Heckenschnitt, Baumschnitt sowie die saisonale Gartenpflege. Ob kleiner Privatgarten oder grössere Grünflächen – wir vermitteln Ihnen zuverlässige Gartenprofis, die sauber, effizient und termingerecht arbeiten.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="/gartenarbeiten" className="inline-flex items-center">
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
                <h2 
                  className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-4"
                  style={{
                    fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontWeight: 700,
                    color: '#1c1d16',
                    textAlign: 'start',
                    letterSpacing: 'normal',
                    wordSpacing: '0px',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    textDecoration: 'none',
                    textIndent: '0px'
                  }}
                >
                  Umzugsfirmen, Reinigungsfirmen, Malerarbeiten & Gartenarbeit vergleichen
                </h2>
                <p 
                  className="mb-8"
                  style={{
                    fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: 400,
                    color: '#1c1d16',
                    textAlign: 'start',
                    letterSpacing: 'normal',
                    wordSpacing: '0px',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    textDecoration: 'none',
                    textIndent: '0px'
                  }}
                >
                  Mehrere Offerten erhalten und passende Anbieter auswählen
                </p>
                <p 
                  className="mb-8 leading-relaxed"
                  style={{
                    fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: 400,
                    color: '#1c1d16',
                    textAlign: 'start',
                    letterSpacing: 'normal',
                    wordSpacing: '0px',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    textDecoration: 'none',
                    textIndent: '0px'
                  }}
                >
                  Mit Online-offerten.ch findest du zuverlässige Anbieter für Umzüge, Reinigungen, Malerarbeiten und Gartenarbeit. Vergleiche mehrere Offerten aus deiner Region und wähle den Dienstleister, der am besten zu deinem Projekt passt.
                </p>

                {/* Ana Hizmet Blokları */}
                <div className="space-y-12 mb-16">
                  <div>
                    <h2 
                      className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-4"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Umzugsfirma finden – einfach und unkompliziert
                    </h2>
                    <p 
                      className="mb-6"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Geprüfte Anbieter für Privatumzüge, Firmenumzüge und internationale Umzüge
                    </p>

                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Ein Umzug erfordert Planung und Vertrauen. Über Online-offerten.ch erhältst du Offerten von geprüften Umzugsfirmen für Privatumzüge, Firmenumzüge sowie internationale Umzüge. So kannst du Preise und Leistungen vergleichen und schnell die passende Umzugsfirma finden.
                    </p>

                    <h3 
                      className="text-[22px] md:text-[28px] leading-[29.26px] md:leading-[37.24px] mb-4"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 600,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Transparente Offerten und seriöse Umzugsfirmen
                    </h3>
                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Alle vermittelten Umzugsfirmen erstellen klare und transparente Offerten. Durch den Vergleich mehrerer Angebote sparst du Zeit und Kosten und triffst eine fundierte Entscheidung für dein Umzugsprojekt.
                    </p>
                  </div>

                  <div>
                    <h2 
                      className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-4"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Reinigungsfirma für Endreinigung und Umzugsreinigung vergleichen
                    </h2>
                    <p 
                      className="mb-6"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Professionelle Reinigungsfirmen für Wohnung und Büro
                    </p>

                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Ob Endreinigung nach dem Umzug, Umzugsreinigung oder Büroreinigung – über Online-offerten.ch findest du erfahrene Reinigungsfirmen. Vergleiche Offerten, prüfe Preise und Leistungen und wähle die Reinigungsfirma, die optimal zu deinem Bedarf passt.
                    </p>

                    <h3 
                      className="text-[22px] md:text-[28px] leading-[29.26px] md:leading-[37.24px] mb-4"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 600,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Zuverlässige Endreinigung für eine reibungslose Wohnungsabgabe
                    </h3>
                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Unsere Partnerfirmen führen Endreinigungen zuverlässig gemäss den Vorgaben für die Wohnungsübergabe durch. So kannst du deine Wohnung stressfrei abgeben und sicher sein, dass alle Anforderungen erfüllt sind.
                    </p>
                  </div>

                  <div>
                    <h2 
                      className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-4"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Malerarbeiten vergleichen und erfahrene Malerbetriebe finden
                    </h2>
                    <p 
                      className="mb-6"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Professionelle Malerarbeiten für Innen- und Aussenbereiche
                    </p>

                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Für Renovationen im Innen- und Aussenbereich vermitteln wir qualifizierte Anbieter für Malerarbeiten. Vergleiche Offerten für Streichen, Lackieren oder Fassadenarbeiten und finde den passenden Malerbetrieb für dein Projekt.
                    </p>

                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Hochwertige Materialien und moderne Arbeitstechniken sorgen für saubere, langlebige und optisch überzeugende Ergebnisse.
                    </p>
                  </div>

                  <div>
                    <h2 
                      className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-4"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Gartenarbeit einfach vergleichen und passende Gartenprofis finden
                    </h2>
                    <p 
                      className="mb-6"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Gartenarbeit und Gartenpflege aus einer Hand
                    </p>

                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Ob regelmässige Gartenarbeit oder einmalige Gartenpflege – Online-offerten.ch bringt dich mit geprüften Anbietern für sämtliche Gartenarbeiten zusammen. Vergleiche Offerten für Rasenpflege, Heckenschnitt, Baumschnitt oder saisonale Gartenarbeit.
                    </p>

                    <p 
                      className="mb-6 leading-relaxed"
                      style={{
                        fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        color: '#1c1d16',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Unsere Garten-Partner arbeiten effizient, zuverlässig und termingerecht – für gepflegte Grünflächen und einen ansprechenden Aussenbereich.
                    </p>
                  </div>
                </div>

                {/* Warum Online-offerten.ch */}
                <div className="space-y-8 mb-16">
                  <h2 
                    className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-8"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 700,
                      color: '#1c1d16',
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    Warum Online-offerten.ch die richtige Wahl ist
                  </h2>

                  <h3 
                    className="text-[22px] md:text-[28px] leading-[29.26px] md:leading-[37.24px] mb-4"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 600,
                      color: '#1c1d16',
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    Kostenlose und unverbindliche Offerten
                  </h3>
                  <p 
                    className="mb-6 leading-relaxed"
                    style={{
                      fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      color: '#1c1d16',
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    Du erhältst mehrere Offerten kostenlos und unverbindlich. So kannst du Anbieter vergleichen, ohne Zeit zu verlieren oder Verpflichtungen einzugehen.
                  </p>

                  <h3 
                    className="text-[22px] md:text-[28px] leading-[29.26px] md:leading-[37.24px] mb-4"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 600,
                      color: '#1c1d16',
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    Zeit- und Kostenersparnis durch direkten Vergleich
                  </h3>
                  <p 
                    className="mb-6 leading-relaxed"
                    style={{
                      fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      color: '#1c1d16',
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    Der Vergleich verschiedener Anbieter hilft dir, Preise und Leistungen transparent gegenüberzustellen und die beste Entscheidung für dein Projekt zu treffen.
                  </p>
                </div>

                {/* So funktioniert Online-offerten.ch */}
                <div className="space-y-8 mb-12">
                  <h2 
                    className="text-[24px] md:text-[32px] leading-[31.92px] md:leading-[42.56px] mb-8"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 700,
                      color: '#1c1d16',
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                  >
                    So funktioniert Online-offerten.ch
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 
                        className="text-[22px] md:text-[28px] leading-[29.26px] md:leading-[37.24px] mb-3"
                        style={{
                          fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontWeight: 600,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        1. Anfrage ausfüllen
                      </h3>
                      <p 
                        className="mb-4 leading-relaxed"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Beschreibe dein Projekt in wenigen Schritten und sende deine Anfrage ab.
                      </p>
                    </div>

                    <div>
                      <h3 
                        className="text-[22px] md:text-[28px] leading-[29.26px] md:leading-[37.24px] mb-3"
                        style={{
                          fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontWeight: 600,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        2. Offerten erhalten und vergleichen
                      </h3>
                      <p 
                        className="mb-4 leading-relaxed"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
                        Erhalte mehrere Offerten von passenden Anbietern und vergleiche Preise, Leistungen und Bewertungen direkt online.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                        3. Anbieter auswählen
                      </h3>
                      <p 
                        className="mb-4 leading-relaxed"
                        style={{
                          fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontWeight: 400,
                          color: '#1c1d16',
                          textAlign: 'start',
                          letterSpacing: 'normal',
                          wordSpacing: '0px',
                          fontStyle: 'normal',
                          textTransform: 'none',
                          textDecoration: 'none',
                          textIndent: '0px'
                        }}
                      >
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





