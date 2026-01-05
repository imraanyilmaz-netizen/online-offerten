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
  ShieldCheck, Search
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
  
  // Fetch reviews and posts in parallel
  const [reviewsResult, postsResult] = await Promise.all([
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
      .limit(9)
  ])

  return {
    reviews: reviewsResult.data || [],
    posts: postsResult.data || [],
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
  const { reviews, posts } = await getHomePageData()

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
            className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 md:py-24 overflow-hidden" 
            aria-label="Hero Section - Kostenlose Offerten für Umzug, Reinigung und Renovierung"
          >
            <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-6">
                    Unverbindlich & transparent
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Kostenlose Offerten vergleichen & den passenden Anbieter finden
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                    Finden Sie qualifizierte Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen in Ihrer Region – verglichen, geprüft & bis zu 40% günstiger. Endlich stressfrei: Vertrauenswürdige Partner finden & vergleichen
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
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
                      className="text-lg px-8 py-6"
                    >
                      <Link href="#kosten-berechnen">
                        <Calculator className="mr-2 h-5 w-5" />
                        Kosten berechnen
                      </Link>
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Die Anfrage ist kostenlos und unverbindlich.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <span>Geprüfte Anbieter aus Ihrer Region</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <span>Unverbindliche Anfrage – keine Verpflichtung</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <span>Schnelle Antworten innerhalb von 24h</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-center mb-6">
                    <NextImage 
                      src="/image/online-offerten.webp" 
                      alt="Online Offerten" 
                      width={600}
                      height={400}
                      className="w-full h-auto max-w-md rounded-lg"
                      priority
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      Ihre Vorteile auf einen Blick
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Lokale Partner in Ihrer Nähe</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Unverbindliche Anfrage</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <GitCompareArrows className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Mehrere Offerten vergleichen</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Award className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Transparente Preise & individuelle Offerten</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Optimized Content Section - SERVER RENDERED */}
          <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="p-6 md:p-8 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    <strong>Online-Offerten.ch</strong> ist Ihr kostenloser Preisvergleich für{' '}
                    <Link href="/umzugsofferten" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Umzugsofferten
                    </Link>
                    ,{' '}
                    <Link href="/reinigung" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Reinigungsofferten
                    </Link>
                    ,{' '}
                    <Link href="/malerarbeiten" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Malerarbeiten Offerten
                    </Link>
                    {' '}und{' '}
                    <Link href="/gartenarbeiten" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Gartenarbeiten Offerten
                    </Link>
                    . Vergleichen Sie mehrere Angebote und finden Sie den besten Preis. Alle Offerten sind <strong>100% kostenlos & unverbindlich</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section - SERVER RENDERED with long content */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 overflow-hidden">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  Kosten sparen mit dem richtigen Anbieter – Offerten einfach vergleichen
                </h2>
                <div className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed space-y-4">
                  <p>
                    Mit nur einer kostenlosen Anfrage erhalten Sie mehrere transparente Offerten von geprüften Partnern. Sparen Sie Zeit und Geld und finden Sie den passenden Partner für Ihr Projekt.
                  </p>
                  <p>
                    Viele Kunden haben durch den Offertenvergleich bereits erfolgreich Zeit und Geld gespart und sind mit dem Service sehr zufrieden.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                {/* Feature Card 1 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Offerten für Umzüge</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vergleichen Sie Preise für private Umzüge, Geschäftsumzüge und internationale Transporte.
                    <br />
                    Sparen Sie bis zu 40 % mit professionellen Anbietern.
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Reinigungsofferten vergleichen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Umzugsreinigung mit Abnahmegarantie sowie Wohnungs- und Büroreinigung.
                    <br />
                    Finden Sie geprüfte Profis für jeden Reinigungsbedarf.
                  </p>
                </div>

                {/* Feature Card 3 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Paintbrush className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Renovationsofferten vergleichen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Malerarbeiten, Renovationen und Modernisierungen.
                    <br />
                    Vergleichen Sie transparente Preise für alle Renovationsprojekte.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="max-w-full">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Warum Offerten vergleichen?
                    </h3>
                    <div className="mt-8 prose prose-lg max-w-none text-gray-700 space-y-6 text-base md:text-lg leading-relaxed text-left">
                      <p>
                        Wenn Sie in der Schweiz einen Umzug, eine Reinigung oder Renovierungsarbeiten planen, ist das Einholen mehrerer Offerten ein entscheidender Schritt für eine fundierte Entscheidung. Ein Vergleich verschiedener Anbieter hilft Ihnen dabei, die beste Leistung zum fairen Preis zu finden – unabhängig davon, ob es sich um einen Privatumzug, eine professionelle Reinigung oder eine Renovation handelt.
                      </p>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Mehr Transparenz bei Umzugsofferten
                        </h4>
                        <p>
                          Gerade bei Umzügen können sich Preise und Leistungen je nach Anbieter deutlich unterscheiden. Durch den Vergleich mehrerer <Link href="/umzugsofferten" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsofferten</Link> sparen Sie Geld und stellen sicher, dass alle wichtigen Leistungen – von der Verpackung bis zur Montage am Zielort – transparent aufgeführt sind.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Reinigungsofferten vergleichen lohnt sich
                        </h4>
                        <p>
                          Auch bei Reinigungsarbeiten gibt es grosse Unterschiede bei Preis, Umfang und Servicequalität. Ob Umzugsreinigung mit Abnahmegarantie, Wohnungs- oder Büroreinigung – durch den Vergleich mehrerer Reinigungsofferten finden Sie ein Angebot, das zu Ihrem Budget und Ihren Qualitätsansprüchen passt.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Renovierungsofferten für langfristige Investitionen
                        </h4>
                        <p>
                          Renovations- und <Link href="/malerfirma" className="text-green-600 hover:text-green-700 font-semibold underline">Malerarbeiten</Link> sind oft langfristige Investitionen. Ein sorgfältiger Vergleich mehrerer Renovierungsofferten hilft Ihnen, unnötige Kosten zu vermeiden und einen zuverlässigen Anbieter zu finden.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Offerten vergleichen – einfach & kostenlos
                        </h4>
                        <p>
                          Online-Offerten.ch macht das Offerten vergleichen in der Schweiz einfach und effizient. Nach Auswahl Ihres gewünschten Services erhalten Sie mehrere transparente Offerten von geprüften Anbietern aus Ihrer Region. Alle Partner werden sorgfältig geprüft und erfüllen hohe Qualitätsstandards.
                        </p>
                        <p className="mt-4">
                          Starten Sie jetzt Ihren Offertenvergleich und finden Sie den passenden Anbieter für Umzug, Reinigung oder Renovierung – kostenlos und unverbindlich.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                        <Link href="/kostenlose-offerte-anfordern">
                          Jetzt kostenlose Offerten anfordern
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
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

