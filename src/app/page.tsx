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
          {/* Hero — premium SaaS-style */}
          <section
            className="relative isolate z-20 w-full overflow-hidden bg-slate-50 pt-10 pb-14 dark:bg-background sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
            aria-label="Offerten vergleichen & passende Anbieter in der Schweiz finden"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-32 top-0 h-[min(100%,420px)] w-[420px] rounded-full bg-emerald-400/25 blur-3xl" />
              <div className="absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full bg-teal-400/20 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,rgba(16,185,129,0.11),transparent_50%)]" />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="max-w-xl lg:max-w-none">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-emerald-200/90 bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-emerald-900 shadow-sm backdrop-blur-sm dark:border-emerald-800/70 dark:bg-emerald-950/40 dark:text-emerald-200">
                      Schweizweit
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200/90 bg-white/80 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-sm backdrop-blur-sm dark:border-border dark:bg-card/80 dark:text-foreground">
                      Kostenlos vergleichen
                    </span>
                    <span className="inline-flex items-center rounded-full border border-amber-200/80 bg-amber-50/90 px-3 py-1 text-[0.6875rem] font-semibold text-amber-950 shadow-sm dark:border-amber-800/60 dark:bg-amber-950/35 dark:text-amber-100">
                      Bis zu 40% sparen
                    </span>
                  </div>

                  <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-4xl md:text-[2.6rem] md:leading-[1.1] lg:text-[2.75rem]">
                    Offerten vergleichen &amp; passende Anbieter in der Schweiz finden
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-lg">
                    Bei Online-Offerten.ch erhalten Sie kostenlos und unverbindlich bis zu 5 Offerten von geprüften
                    Umzugs- und Reinigungsfirmen aus Ihrer Region.
                  </p>

                  {ratingStats.reviewCount > 0 && ratingStats.averageRating > 0 ? (
                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600 dark:text-muted-foreground">
                      <span className="flex items-center gap-0.5 text-amber-400" aria-hidden>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-foreground">
                        Ø {ratingStats.averageRating.toFixed(1)} / 5
                      </span>
                      <span className="text-slate-300 dark:text-muted-foreground/40">·</span>
                      <Link
                        href="/kunden-bewertungen"
                        className="font-medium text-emerald-700 underline-offset-4 hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        {ratingStats.reviewCount} Bewertungen
                      </Link>
                    </div>
                  ) : null}

                  <div className="mt-8 rounded-[1.25rem] border border-slate-200/90 bg-white/75 p-4 shadow-[0_28px_64px_-28px_rgba(15,23,42,0.22)] backdrop-blur-xl ring-1 ring-slate-900/[0.04] dark:border-border dark:bg-card/80 dark:shadow-[0_28px_64px_-28px_rgba(0,0,0,0.45)] dark:ring-white/10 sm:p-5 md:p-6">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-muted-foreground">
                      Service wählen
                    </p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Link
                        href="/kostenlose-offerte-anfordern?service=umzug&step=2"
                        className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300/80 hover:shadow-md dark:border-border dark:bg-card/90 dark:hover:border-sky-600/50"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-blue-50 text-sky-700 ring-1 ring-sky-200/60 dark:from-sky-950/50 dark:to-blue-950/40 dark:text-sky-300 dark:ring-sky-800/50">
                          <Truck className="h-7 w-7" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="font-semibold text-slate-900 dark:text-foreground">Umzug</p>
                          <p className="text-sm text-slate-600 dark:text-muted-foreground">Privat, Geschäft, international</p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-600 dark:text-muted-foreground/50 dark:group-hover:text-sky-400" />
                      </Link>

                      <Link
                        href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                        className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300/80 hover:shadow-md dark:border-border dark:bg-card/90 dark:hover:border-violet-500/50"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-800 ring-1 ring-violet-200/60 dark:from-violet-950/50 dark:to-fuchsia-950/40 dark:text-violet-300 dark:ring-violet-800/50">
                          <Sparkles className="h-7 w-7" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="font-semibold text-slate-900 dark:text-foreground">Reinigung</p>
                          <p className="text-sm text-slate-600 dark:text-muted-foreground">End-, Büro-, Fenster &amp; mehr</p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-600 dark:text-muted-foreground/50 dark:group-hover:text-violet-400" />
                      </Link>

                      <Link
                        href="/kostenlose-offerte-anfordern?service=maler&step=2"
                        className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300/80 hover:shadow-md dark:border-border dark:bg-card/90 dark:hover:border-amber-600/50"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 text-amber-900 ring-1 ring-amber-200/60 dark:from-amber-950/45 dark:to-orange-950/35 dark:text-amber-200 dark:ring-amber-800/50">
                          <Paintbrush className="h-7 w-7" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="font-semibold text-slate-900 dark:text-foreground">Malerarbeiten</p>
                          <p className="text-sm text-slate-600 dark:text-muted-foreground">Innen, aussen, Fassaden</p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-700 dark:text-muted-foreground/50 dark:group-hover:text-amber-400" />
                      </Link>

                      <Link
                        href="/kostenlose-offerte-anfordern?service=raeumung&step=2"
                        className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/80 hover:shadow-md dark:border-border dark:bg-card/90 dark:hover:border-emerald-600/50"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-900 ring-1 ring-emerald-200/60 dark:from-emerald-950/50 dark:to-teal-950/40 dark:text-emerald-300 dark:ring-emerald-800/50">
                          <Trash2 className="h-7 w-7" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="font-semibold text-slate-900 dark:text-foreground">Räumung &amp; Entsorgung</p>
                          <p className="text-sm text-slate-600 dark:text-muted-foreground">Entrümpelung &amp; Sperrgut</p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:text-muted-foreground/50 dark:group-hover:text-emerald-400" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200/85 bg-white/70 p-4 shadow-sm backdrop-blur-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/70 dark:ring-white/10 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium leading-snug text-slate-700 dark:text-foreground">
                          Vergleichen Sie kostenlos regionale Umzugs- und Reinigungsfirmen für Ihren Umzug oder Ihre
                          Reinigung.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200/80 pt-4 text-sm text-slate-600 dark:border-border dark:text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        Keine versteckten Kosten
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Award className="h-4 w-4 text-emerald-600" />
                        Zeit &amp; Geld sparen
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto hidden w-full max-w-lg lg:mx-0 lg:block lg:max-w-none">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-100 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 dark:border-border dark:bg-muted dark:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)] dark:ring-white/10">
                    <NextImage
                      src="/fotos/umzug-reinigung-maler-offerten.webp"
                      alt="Umzug, Reinigung und Renovierung in der Schweiz"
                      fill
                      priority
                      quality={80}
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 0vw, 50vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 hidden max-w-[200px] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-md dark:border-border dark:bg-card/95 dark:shadow-2xl xl:block">
                    <p className="text-sm font-semibold text-slate-900 dark:text-foreground">Umzug · Reinigung · Maler · Entsorgung</p>
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
                    Projekt in wenigen Minuten beschreiben – digital und unverbindlich.
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
                    Bis zu fünf Angebote von geprüften Partnern – Leistung und Preis gegenüberstellen.
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
                    In Ruhe entscheiden – Sie bleiben jederzeit frei in der Wahl.
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
                      Planen Sie entspannter – mit klaren Offerten
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
              <div className="mb-12 text-center md:mb-16">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                  Leistungen
                </p>
                <h2 className="mx-auto mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl">
                  Alles, was Sie für Umzug, Reinigung &amp; mehr brauchen
                </h2>
              </div>
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







