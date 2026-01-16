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
  ShieldCheck, Search, Truck, Trash2
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
                  <h1 className="text-[38px] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight text-left">
                    <span className="text-green-600">Offerten vergleichen</span> & den passenden Anbieter finden
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
                  {/* Trust Badge */}
                  <p className="text-sm sm:text-base text-gray-500 font-medium text-left">
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
                Unsere Dienstleistungen im Überblick
              </h2>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                {/* Umzugsfirma */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/30 group-hover:from-blue-50/30 group-hover:via-blue-50/20 group-hover:to-blue-50/50 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
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
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-50/30 group-hover:from-orange-50/30 group-hover:via-orange-50/20 group-hover:to-orange-50/50 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
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
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-purple-50/0 to-purple-50/30 group-hover:from-purple-50/30 group-hover:via-purple-50/20 group-hover:to-purple-50/50 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Paintbrush className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Maler</h4>
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

                {/* Räumung & Entsorgung */}
                <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-500/50 overflow-hidden">
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-gray-50/0 to-gray-50/30 group-hover:from-gray-50/30 group-hover:via-gray-50/20 group-hover:to-gray-50/50 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Trash2 className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">Räumung & Entsorgung</h4>
                        <div className="h-1 w-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8">
                      <p className="text-gray-700 leading-relaxed text-base">
                        Bei Umzügen oder Renovationsarbeiten entstehen häufig grosse Mengen an Abfall und Sperrgut. Auch Keller werden im Rahmen der Entrümpelung und Entsorgung professionell geleert, um Platz für den Umzug zu schaffen.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        Unsere Entsorgungs-Partner übernehmen den fachgerechten Abtransport sowie die umweltgerechte Entsorgung sämtlicher Materialien. Ob alte Möbel, Elektrogeräte oder Baustellenabfälle – wir vermitteln Ihnen den passenden Entsorgungsdienst, der zuverlässig, sauber und gesetzeskonform arbeitet.
                      </p>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                      <Link href="https://online-offerten.ch/raeumung-entsorgung" className="inline-flex items-center">
                        Entsorgungsofferten
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
        </main>
      </div>
    </>
  )
}





