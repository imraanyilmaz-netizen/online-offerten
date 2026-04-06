import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, ChevronRight, FileText, Mail, BarChart3, MapPin, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ServiceGrid from '@/components/pages/locations/ServiceGrid.client'
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import { locations } from '@/data/locations'
import { createStaticClient } from '@/src/lib/supabase/server'

export const revalidate = 3600

const city = 'Thurgau'
const canonicalUrl = '/umzugsfirma/thurgau'
const imageUrl = '/umzug/kanton-thurgau.webp'

const faqItems = [
  {
    question: 'Wie schnell erhalte ich Offerten von Umzugsfirmen im Thurgau?',
    answer:
      'In der Regel erhalten Sie die ersten Rückmeldungen innerhalb von 24 bis 48 Stunden. Bei gut beschriebenen Anfragen geht es oft schneller.',
  },
  {
    question: 'Was kostet ein Umzug im Kanton Thurgau?',
    answer:
      'Die Kosten hängen von Umzugsvolumen, Distanz, Stockwerk, Zugänglichkeit und gewünschten Zusatzleistungen ab. Für verlässliche Preise empfehlen wir den Vergleich mehrerer Offerten von regionalen Umzugsfirmen im Thurgau.',
  },
  {
    question: 'Wie weit im Voraus sollte ich eine Umzugsfirma buchen?',
    answer:
      'Ideal sind 4 bis 8 Wochen Vorlauf. In der Hochsaison und an Monatsenden ist die Nachfrage höher, daher lohnt sich eine frühere Anfrage für bessere Terminwahl und Preise.',
  },
  {
    question: 'Sind die Offerten wirklich kostenlos und unverbindlich?',
    answer:
      'Ja. Über Online-Offerten.ch erhalten Sie kostenlose und unverbindliche Offerten. Sie entscheiden danach selbst, ob und welchen Anbieter Sie beauftragen.',
  },
  {
    question: 'Bin ich verpflichtet, eines der Angebote anzunehmen?',
    answer:
      'Nein. Sie sind zu keiner Annahme verpflichtet. Der Vergleich ist kostenlos und unverbindlich.',
  },
  {
    question: 'Welche Versicherungen bieten Umzugsfirmen im Thurgau?',
    answer:
      'Seriöse Umzugsunternehmen verfügen über eine Betriebshaftpflicht und Transportschutz. Für besonders wertvolle Gegenstände können Zusatzversicherungen sinnvoll sein.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Umzugsfirma-Vergleich',
  name: 'Umzugsfirma Thurgau – Offerten vergleichen',
  description:
    'Vergleichen Sie geprüfte Umzugsfirmen im Kanton Thurgau. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen.',
  url: `https://online-offerten.ch${canonicalUrl}`,
  provider: {
    '@type': 'Organization',
    name: 'Online-Offerten.ch',
    url: 'https://online-offerten.ch',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Kanton Thurgau',
    containedInPlace: {
      '@type': 'Country',
      name: 'Switzerland',
      alternateName: 'Schweiz',
    },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://online-offerten.ch/' },
    { '@type': 'ListItem', position: 2, name: 'Umzugsfirma', item: 'https://online-offerten.ch/umzugsfirma' },
    { '@type': 'ListItem', position: 3, name: 'Thurgau', item: `https://online-offerten.ch${canonicalUrl}` },
  ],
}

async function getThurgauReviews() {
  try {
    const supabase = createStaticClient()
    const { data: reviews, error } = await supabase
      .from('customer_reviews')
      .select('id, customer_name, rating, city, review_text, review_date, service_type')
      .eq('approval_status', 'approved')
      .ilike('service_type', '%umzug%')
      .order('review_date', { ascending: false })
      .limit(20)

    if (error || !reviews || reviews.length === 0) return []

    const relevantCities = ['thurgau', 'frauenfeld', 'kreuzlingen', 'weinfelden', 'arbon', 'romanshorn', 'amriswil']
    const regionReviews = reviews.filter((review: any) => {
      const reviewCity = (review.city || '').toLowerCase()
      return relevantCities.some((cityName) => reviewCity.includes(cityName))
    })

    const selected = regionReviews.length > 0 ? regionReviews : reviews
    return selected.slice(0, 3)
  } catch (error) {
    console.error('Error in getThurgauReviews:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma Thurgau: Bis zu 40% sparen beim Umzugspreisvergleich',
  description:
    'Umzugsfirma im Kanton Thurgau gesucht? Vergleichen Sie kostenlos bis zu 5 Offerten von geprüften regionalen Anbietern in Frauenfeld, Kreuzlingen und Weinfelden und sparen Sie bis zu 40%.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/thurgau',
  },
  openGraph: {
    title: 'Umzugsfirma Thurgau: Offerten vergleichen und sparen',
    description:
      'Finden Sie geprüfte Umzugsunternehmen in Frauenfeld, Kreuzlingen, Weinfelden und im ganzen Thurgau. Kostenlos Offerten vergleichen.',
    url: 'https://online-offerten.ch/umzugsfirma/thurgau',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: `https://online-offerten.ch${imageUrl}`,
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Thurgau – Offerten vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Thurgau: Top Anbieter vergleichen',
    description: 'Kostenlos und unverbindlich Offerten vergleichen und beim Umzug im Kanton Thurgau sparen.',
    images: [`https://online-offerten.ch${imageUrl}`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function UmzugsfirmaThurgauPage() {
  const thurgauReviews = await getThurgauReviews()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-white overflow-x-hidden">
        <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '60px 60px',
              }}
            />
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-green-600 transition-colors" aria-label="Startseite"><Home className="w-4 h-4" /></Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                <li><Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">Umzugsfirma</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                <li className="text-gray-900 font-medium" aria-current="page">Thurgau</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-4">
                  Kanton Thurgau
                </div>
                <h1 className="heading-1 !mt-0 mb-4">
                  Umzugsfirma Thurgau: Bis zu 40% sparen beim Umzugspreisvergleich
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl">
                  Finden Sie passende Umzugsfirmen für Privat- und Firmenumzüge im Kanton Thurgau. Vergleichen Sie Leistungen transparent und wählen Sie den Anbieter, der zu Ihrem Umzug passt.
                </p>

                <div className="bg-white/95 rounded-xl p-3 sm:p-4 mb-6 border border-gray-200 shadow-sm">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                    Welche Dienstleistung benötigen Sie?
                  </h2>
                  <ServiceGrid city={city} compact />
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">100% kostenlos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Geprüfte Firmen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Zeit und Geld sparen</span>
                  </div>
                </div>
              </div>

              <div className="relative md:col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={imageUrl}
                    alt="Professioneller Umzugsservice im Kanton Thurgau"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Bis zu 40% sparen</p>
                  <p className="text-xs text-green-100">Kostenlos & unverbindlich</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">
              <article>
                <h2 className="typography-h2 mb-6">Professioneller Umzugsservice-Vergleich für den Kanton Thurgau</h2>
                <p className="typography-p mb-4">
                  Finden Sie in 3 Schritten die besten Umzugsunternehmen Ihrer Region. Online-Offerten.ch ist eine neutrale Vergleichsplattform mit Fokus auf qualifizierte Anbieter im Kanton Thurgau.
                </p>
                <p className="typography-p">
                  Erhalten Sie kostenlos und unverbindlich bis zu 5 regionale Angebote. So vergleichen Sie Preise, Leistungen und Verfügbarkeit transparent und sparen bis zu 40%.
                </p>
              </article>

              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="typography-h2 mb-6">Warum professionelle Umzugsfirmen im Thurgau unverzichtbar sind</h2>
                <ul className="space-y-3 text-body">
                  <li><strong>Stressfreier Umzug:</strong> Erfahrene Teams übernehmen Planung und Ausführung.</li>
                  <li><strong>Zeitersparnis:</strong> Effiziente Abwicklung durch eingespielte Prozesse.</li>
                  <li><strong>Schutz Ihrer Möbel:</strong> Fachgerechte Verpackung und sicherer Transport.</li>
                  <li><strong>Alles aus einer Hand:</strong> Reinigung, Entsorgung, Montage und Einlagerung.</li>
                  <li><strong>Lokale Kenntnisse:</strong> Erfahrung in Frauenfeld, Kreuzlingen, Weinfelden und Umgebung.</li>
                  <li><strong>Versicherungsschutz:</strong> Seriöse Partner mit klaren Versicherungsleistungen.</li>
                </ul>
              </article>

              <article>
                <h2 className="typography-h2 mb-6">Umzugsservices im Kanton Thurgau</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="heading-4 mb-3">Privatumzüge</h3>
                    <ul className="space-y-2 text-body">
                      <li>Wohnungsumzüge in Frauenfeld, Kreuzlingen, Weinfelden, Arbon u.v.m.</li>
                      <li>Hausumzüge inkl. Seniorenumzüge</li>
                      <li>Internationale Umzüge mit Unterstützung bei Verzollung</li>
                    </ul>
                    <Link href="/umzugsfirma/privatumzug" className="inline-flex items-center text-green-600 font-semibold mt-4 hover:underline">
                      Mehr zu Privatumzügen <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="heading-4 mb-3">Firmenumzüge</h3>
                    <ul className="space-y-2 text-body">
                      <li>Büroumzüge mit minimaler Betriebsunterbrechung</li>
                      <li>IT-Umzüge für sensible Infrastruktur</li>
                      <li>Industrie- und Maschinenumzüge</li>
                    </ul>
                    <Link href="/umzugsfirma/geschaeftsumzug" className="inline-flex items-center text-green-600 font-semibold mt-4 hover:underline">
                      Mehr zu Firmenumzügen <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="heading-4 mb-3">Zusatzservices</h3>
                    <ul className="space-y-2 text-body">
                      <li>Umzugsreinigung und Endreinigung mit Abgabegarantie</li>
                      <li>Möbeldemontage und Montage</li>
                      <li>Räumung, Entsorgung, Einlagerung und Zwischenlagerung</li>
                    </ul>
                    <Link href="/reinigung/umzugsreinigung" className="inline-flex items-center text-green-600 font-semibold mt-4 hover:underline">
                      Mehr zu Zusatzservices <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>

              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="typography-h2 mb-6">In 3 Schritten zur besten Umzugsfirma im Thurgau</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <FileText className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="heading-4 mb-2">1. Umzug beschreiben</h3>
                    <p className="text-body">Geben Sie Inventar, besondere Anforderungen, Termine sowie Zusatzservices wie Einpack- oder Auspackservice an.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <Mail className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="heading-4 mb-2">2. Offerten erhalten</h3>
                    <p className="text-body">Bis zu 5 regionale Umzugsunternehmen senden kostenlose und unverbindliche Offerten mit transparenten Preisen.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="heading-4 mb-2">3. Vergleichen & wählen</h3>
                    <p className="text-body">Vergleichen Sie Umzugsangebote in Ruhe und beauftragen Sie den Partner, der am besten zu Ihren Bedürfnissen passt.</p>
                  </div>
                </div>
              </article>

              <article>
                <h2 className="typography-h2 mb-6">Beliebte Umzugsdestinationen im Thurgau</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Frauenfeld', 'Kreuzlingen', 'Arbon', 'Romanshorn', 'Weinfelden', 'Amriswil', 'Münchwilen', 'Diessenhofen', 'Fischingen'].map((name) => (
                    <div key={name} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h3 className="heading-4 !mt-0">{name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article>
                <h2 className="typography-h2 mb-6">Kundenerfahrungen mit Umzugsfirmen im Thurgau</h2>
                {thurgauReviews.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    {thurgauReviews.map((review: any) => (
                      <blockquote key={review.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-gray-700">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.round(review.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                          ))}
                          <span className="text-sm text-gray-500 ml-2">{(review.rating || 0).toFixed(1)}</span>
                        </div>
                        <p className="italic">&ldquo;{review.review_text}&rdquo;</p>
                        <footer className="mt-3 text-sm text-gray-500">
                          {review.customer_name || 'Kunde'}{review.city ? `, ${review.city}` : ''}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-gray-700">
                    Aktuell sind noch keine öffentlichen Bewertungen für den Kanton Thurgau verfügbar.
                  </div>
                )}
              </article>

              <article className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Jetzt Umzugsfirmen im Thurgau vergleichen</h2>
                <p className="text-green-50 mb-6 max-w-2xl mx-auto">
                  Starten Sie heute Ihren kostenlosen Vergleich! Ob Privatumzug oder Firmenumzug – finden Sie in Arbon, Romanshorn oder einer anderen Gemeinde im Kanton Thurgau den passenden Anbieter.
                </p>
                <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Thurgau">
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </article>
            </main>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
              <div className="md:col-span-3">
                <div className="mb-8">
                  <h2 className="heading-2">Häufig gestellte Fragen (FAQ)</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                        <h4 className="faq-question">{faq.question}</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="relative md:col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/umzug/umzug-thurgau.webp"
                    alt="Umzug im Kanton Thurgau – FAQ und Antworten"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Fragen & Antworten</p>
                  <p className="text-xs text-blue-100">Rund um Umzüge im Thurgau</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </section>
      </div>
    </>
  )
}


