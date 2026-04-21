import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { createStaticClient } from '@/src/lib/supabase/server'
import { getHomepageReviewsBundle } from '@/lib/reviews/kundenBewertungenMerge'

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
  Star,
  ArrowRight,
  CheckCircle,
  FileText,
  Users,
  GitCompareArrows,
  Truck,
  Sparkles,
  Paintbrush,
  Trash2,
  ShieldCheck,
  Award,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
  description:
    'Vergleichen Sie kostenlos regionale Umzugsfirmen, Malerfirmen und Reinigungsfirmen für Ihren Umzug, Ihre Malerarbeiten oder Ihre Reinigung.',
  alternates: {
    canonical: 'https://online-offerten.ch/',
  },
  openGraph: {
    title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
    description:
      'Vergleichen Sie kostenlos regionale Umzugsfirmen, Malerfirmen und Reinigungsfirmen für Ihren Umzug, Ihre Malerarbeiten oder Ihre Reinigung.',
    url: 'https://online-offerten.ch/',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
    description:
      'Vergleichen Sie kostenlos regionale Umzugsfirmen, Malerfirmen und Reinigungsfirmen für Ihren Umzug, Ihre Malerarbeiten oder Ihre Reinigung.',
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

  const [bundle, postsResult] = await Promise.all([
    getHomepageReviewsBundle(6),
    supabase
      .from('posts')
      .select('id, title, slug, meta_description, featured_image_url, category, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(100),
  ])

  return {
    reviews: bundle.carouselReviews,
    posts: postsResult.data || [],
    ratingStats: {
      averageRating: bundle.ratingStats.averageRating,
      reviewCount: bundle.ratingStats.reviewCount,
    },
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
          "name": "Startseite",
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
    }
  ]
}

export default async function HomePage() {
  const { reviews, posts, ratingStats } = await getHomePageData()

  // Add AggregateRating to Organization schema (Plattform: customer_reviews + reviews)
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
                <div className="mb-4">
                  <div className="hidden sm:inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm mb-3">
                    Jetzt kostenlos vergleichen
                  </div>
                  <div className="relative">
                    <h1 className="heading-1 break-words pr-28 sm:pr-40">
                      Offerten vergleichen &amp; passende Anbieter in der Schweiz finden
                    </h1>
                    <div
                      className="absolute right-0 -top-2 sm:-top-5 w-24 h-24 sm:w-32 sm:h-32 text-white rotate-[-10deg] flex items-center justify-center shrink-0"
                    >
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full"
                        aria-hidden="true"
                      >
                        <polygon
                          points="50,2 59,12 73,8 79,21 92,23 88,37 98,50 88,63 92,77 79,79 73,92 59,88 50,98 41,88 27,92 21,79 8,77 12,63 2,50 12,37 8,23 21,21 27,8 41,12"
                          fill="#10b981"
                          stroke="rgba(255,255,255,0.85)"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="relative z-10 text-xs sm:text-base font-black leading-tight text-center tracking-wide">
                        BIS ZU
                        <br />
                        40%
                        <br />
                        SPAREN
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-base sm:text-lg mt-2">
                    Bei Online-Offerten.ch erhalten Sie kostenlos und unverbindlich bis zu 5 Offerten von geprüften Umzugs- und Reinigungsfirmen aus Ihrer Region.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-gray-200 bg-white/80 p-3 sm:p-4 mb-6">
                  <h2 className="text-base md:text-lg font-bold text-gray-800 mt-0 mb-2 text-left">
                    SERVICE WÄHLEN
                  </h2>
                {/* Service Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-0 mb-0">
                  <Link
                    href="/kostenlose-offerte-anfordern?service=umzug&step=2"
                    className="w-full flex items-center justify-between gap-3 p-4 border rounded-xl transition-all duration-300 bg-white border-gray-300 hover:border-blue-400 hover:shadow-md group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-bold text-base text-gray-900 leading-tight break-words">Umzug</p>
                      <p className="text-sm text-gray-700 leading-snug">Privat, Geschäftlich, International &amp; Spezial</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </Link>

                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                    className="w-full flex items-center justify-between gap-3 p-4 border rounded-xl transition-all duration-300 bg-white border-gray-300 hover:border-purple-400 hover:shadow-md group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-bold text-base text-gray-900 leading-tight break-words">Reinigung</p>
                      <p className="text-sm text-gray-700 leading-snug">Umzugs-, Büro-, Fensterreinigung &amp; mehr</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </Link>

                  <Link
                    href="/kostenlose-offerte-anfordern?service=maler&step=2"
                    className="w-full flex items-center justify-between gap-3 p-4 border rounded-xl transition-all duration-300 bg-white border-gray-300 hover:border-amber-400 hover:shadow-md group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Paintbrush className="w-7 h-7 text-amber-600" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-bold text-base text-gray-900 leading-tight break-words">Malerarbeiten</p>
                      <p className="text-sm text-gray-700 leading-snug">Innen-, Aussenanstrich, Fassaden &amp; mehr</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </Link>

                  <Link
                    href="/kostenlose-offerte-anfordern?service=raeumung&step=2"
                    className="w-full flex items-center justify-between gap-3 p-4 border rounded-xl transition-all duration-300 bg-white border-gray-300 hover:border-emerald-400 hover:shadow-md group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Trash2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-bold text-base text-gray-900 leading-tight break-words">Räumung &amp; Entsorgung</p>
                      <p className="text-sm text-gray-700 leading-snug">Wohnungsräumung, Entrümpelung &amp; mehr</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </Link>
                </div>
                </div>
                
                {/* Rating Card */}
                <div 
                  className="hidden bg-white rounded-xl p-5 sm:p-6 flex-col transition-all duration-300 mt-6"
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

                {/* Trust Badges + Hint */}
                <div 
                  className="bg-white rounded-xl p-5 sm:p-6 flex flex-col gap-3 transition-all duration-300 mt-4"
                  style={{
                    boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-4 w-4 text-green-700" />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-green-800">
                      Vergleichen Sie kostenlos regionale Umzugs- und Reinigungsfirmen für Ihren Umzug oder Ihre Reinigung.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">Kostenlos &amp; unverbindlich</span>
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

          {/* So einfach geht's */}
          <section className="relative z-10 border-t border-slate-200/80 bg-white py-14 dark:border-border dark:bg-background md:py-20 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mb-10 max-w-2xl md:mb-14">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                  Ablauf
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl md:leading-tight">
                  In 3 Schritten die besten Anbieter Ihrer Region finden
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-muted-foreground md:text-lg">
                  In drei klaren Schritten kommen Sie schnell zu passenden Angeboten aus Ihrer Region.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                <div className="group relative h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:shadow-lg dark:border-border dark:bg-card dark:ring-white/10 dark:hover:border-emerald-800/80 md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
                      Schritt 1
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground">Kostenlose Offerten einholen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                    Beschreiben Sie Ihr Projekt in wenigen Schritten online.
                  </p>
                  <div className="mt-6">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-emerald-600/80 font-semibold text-emerald-800 hover:bg-emerald-50 dark:border-emerald-500/60 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                    >
                      <Link href="/kostenlose-offerte-anfordern">Anfrage starten</Link>
                    </Button>
                  </div>
                </div>

                <div className="group relative h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:shadow-lg dark:border-border dark:bg-card dark:ring-white/10 dark:hover:border-emerald-800/80 md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
                      Schritt 2
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                      <GitCompareArrows className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground">Offerten vergleichen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                    Bis zu 5 kostenlose Angebote von geprüften Partnern.
                  </p>
                </div>

                <div className="group relative h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:shadow-lg dark:border-border dark:bg-card dark:ring-white/10 dark:hover:border-emerald-800/80 md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
                      Schritt 3
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground">Anbieter auswählen</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                    Vergleichen &amp; den besten Anbieter auswählen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Vorteile */}
          <section className="border-t border-slate-200/80 bg-slate-50/50 py-14 dark:border-border dark:bg-muted/25 md:py-20 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="relative order-2 lg:order-1">
                  <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-100 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.2)] ring-1 ring-slate-900/[0.04] dark:border-border dark:bg-muted dark:ring-white/10">
                    <NextImage
                      src="/fotos/offerten.webp"
                      alt="Zufriedene Kunden"
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-br-3xl bg-gradient-to-br from-emerald-400/90 to-teal-600/80"
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="order-1 space-y-8 lg:order-2">
                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                      Vorteile
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl">
                      Ihre Vorteile, wenn Sie den Umzug mit uns planen
                    </h3>
                  </div>

                  <div className="space-y-8">
                    {/* Reason 1 */}
                    <div className="flex gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/70 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900 dark:text-foreground md:text-lg">
                          Schnell angefragt, klar verglichen
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground md:text-base">
                          Ihre Anfrage in wenigen Minuten – mehrere passende Offerten und transparenter Vergleich.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/70 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900 dark:text-foreground md:text-lg">
                          Geprüfte Anbieter aus der Region
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground md:text-base">
                          Passende Firmen aus Ihrer Umgebung – ohne endlose Recherche.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/70 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900 dark:text-foreground md:text-lg">
                          Unterstützung bei grösseren Projekten
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground md:text-base">
                          Bei umfangreichen Umzügen helfen wir bei der Einordnung – damit Sie sicher entscheiden.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden border-t border-slate-200/80 py-16 dark:border-border md:py-24">
            <div
              className="pointer-events-none absolute inset-0 bg-[url('https://online-offerten.ch/image/7946a949-0354-4f72-aff6-a406d89f84db.webp')] bg-cover bg-center opacity-[0.14] dark:opacity-[0.08]"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-slate-50/95 dark:from-background/95 dark:via-background/92 dark:to-muted/30" aria-hidden />
            <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
              <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:gap-8">
                {/* Umzugsfirma */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200/90 hover:shadow-xl dark:border-border dark:bg-card/90 dark:ring-white/10 dark:hover:border-sky-700/50 md:p-10">
                  <div className="relative z-10">
                    <div className="mb-6 flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <Truck className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-foreground dark:group-hover:text-blue-400 md:text-xl">
                          Umzugsfirma
                        </h3>
                        <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                      </div>
                    </div>
                    <div className="mb-8 space-y-4">
                      <p className="text-body leading-relaxed text-slate-600 dark:text-muted-foreground">
                        Ein Umzug muss nicht anstrengend sein – mit den passenden{' '}
                        <Link href="/umzugsfirma" className="font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-foreground">
                          Umzugsfirmen
                        </Link>{' '}
                        an Ihrer Seite wird er schnell und unkompliziert.
                      </p>
                      <p className="text-body leading-relaxed text-slate-600 dark:text-muted-foreground">
                        Qualifizierte Partner übernehmen Planung und Transport – regional besonders flexibel.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="rounded-xl bg-emerald-600 font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg group/btn"
                    >
                      <Link href="/umzugsfirma" className="inline-flex items-center">
                        Umzugsfirma finden
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Reinigungsfirma */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200/90 hover:shadow-xl dark:border-border dark:bg-card/90 dark:ring-white/10 dark:hover:border-orange-700/50 md:p-10">
                  <div className="relative z-10">
                    <div className="mb-6 flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <Sparkles className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-orange-600 dark:text-foreground dark:group-hover:text-orange-400 md:text-xl">
                          Reinigungsfirma
                        </h3>
                        <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
                      </div>
                    </div>
                    <div className="mb-8 space-y-4">
                      <p className="text-body leading-relaxed text-slate-600 dark:text-muted-foreground">
                        Ob nach einem Umzug, einer Renovation oder für die regelmässige Reinigung – unsere professionellen Reinigungsunternehmen garantieren höchste Sauberkeit mit umweltfreundlichen Reinigungsmitteln und höchster Qualität.
                      </p>
                      <p className="text-body leading-relaxed text-slate-600 dark:text-muted-foreground">
                        Zu den wichtigsten Dienstleistungen zählen die{' '}
                        <Link href="/reinigungsfirma/umzugsreinigung" className="font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-foreground">
                          Endreinigung
                        </Link>{' '}
                        und{' '}
                        <Link href="/reinigungsfirma/umzugsreinigung" className="font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-foreground">
                          Umzugsreinigung
                        </Link>{' '}
                        für die Wohnungsübergabe sowie die professionelle{' '}
                        <Link href="/reinigungsfirma/buero_reinigung" className="font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-foreground">
                          Büroreinigung
                        </Link>{' '}
                        für Geschäftskunden.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="rounded-xl bg-emerald-600 font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg group/btn"
                    >
                      <Link href="/reinigungsfirma" className="inline-flex items-center">
                        Reinigungsfirma finden
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Maler */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200/90 hover:shadow-xl dark:border-border dark:bg-card/90 dark:ring-white/10 dark:hover:border-violet-600/50 md:p-10">
                  <div className="relative z-10">
                    <div className="mb-6 flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <Paintbrush className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-purple-600 dark:text-foreground dark:group-hover:text-purple-400 md:text-xl">
                          Malerarbeiten
                        </h3>
                        <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                      </div>
                    </div>
                    <div className="mb-8 space-y-4">
                      <p className="text-body leading-relaxed text-slate-600 dark:text-muted-foreground">
                        Qualifizierte Malerbetriebe bieten Ihnen professionelle{' '}
                        <Link href="/malerarbeitenkosten" className="font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-foreground">
                          Malerarbeiten
                        </Link>{' '}
                        für Innen- und Aussenbereiche.
                      </p>
                      <p className="text-body leading-relaxed text-slate-600 dark:text-muted-foreground">
                        Ob Renovation von Wohnräumen oder fachgerechte Fassadengestaltung – unsere erfahrenen Maler sorgen für frische Farben und ein makelloses Ergebnis.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="rounded-xl bg-emerald-600 font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg group/btn"
                    >
                      <Link href="/malerfirma" className="inline-flex items-center">
                        Maler finden
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Entsorgung */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-8 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:shadow-xl dark:border-border dark:bg-card/90 dark:ring-white/10 dark:hover:border-emerald-700/50 md:p-10">
                  <div className="relative z-10">
                    <div className="mb-6 flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <Trash2 className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-foreground dark:group-hover:text-emerald-400 md:text-xl">
                          Entsorgung
                        </h3>
                        <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" />
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-body leading-relaxed text-slate-600 dark:text-muted-foreground">
                        Entsorgung von altem Mobiliar, Sperrgut und Haushaltsabfällen geplant? Fordern Sie kostenlos mehrere Entsorgungsofferten an und vergleichen Sie regionale Anbieter.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="rounded-xl bg-emerald-600 font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg group/btn"
                    >
                      <Link href="/kostenlose-offerte-anfordern?service=raeumung&step=2" className="inline-flex items-center">
                        Entsorgungsofferten
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200/80 bg-slate-50/40 py-14 dark:border-border dark:bg-muted/20 md:py-20">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">
              <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                FAQ
              </p>
              <h2 className="mt-2 text-center text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl">
                Häufige Fragen zu Anfragen und Offerten
              </h2>
              <div className="mt-10 space-y-4">
                {[
                  {
                    q: 'Was kostet mich eine Anfrage?',
                    a: 'Die Anfrage ist komplett kostenlos und unverbindlich. Sie zahlen nichts für das Vergleichen von Offerten.',
                  },
                  {
                    q: 'Was passiert nach meiner Anfrage?',
                    a: 'Passende Firmen aus Ihrer Region melden sich mit individuellen Offerten. Sie vergleichen in Ruhe und entscheiden selbst, ob Sie ein Angebot annehmen.',
                  },
                  {
                    q: 'Wie viele Offerten erhalte ich?',
                    a: 'Sie können im Formular auswählen, von wie vielen Firmen Sie Offerten erhalten möchten (zwischen 2 und 5).',
                  },
                  {
                    q: 'Bin ich verpflichtet, eine Offerte anzunehmen?',
                    a: 'Nein. Der Vergleich ist unverbindlich. Sie entscheiden frei, ob und welche Offerte zu Ihnen passt.',
                  },
                  {
                    q: 'Wie schnell erhalte ich Rückmeldungen?',
                    a: 'Sie erhalten Ihre ersten Offerten in der Regel sehr schnell nach Ihrer Anfrage.',
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/90 dark:ring-white/10 md:p-6"
                  >
                    <h3 className="text-base font-semibold text-slate-900 dark:text-foreground md:text-lg">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground md:text-base">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Client Components - Interactive parts */}
          <HomePageClient initialReviews={reviews} initialPosts={posts} />

        </main>
      </div>
    </>
  )
}







