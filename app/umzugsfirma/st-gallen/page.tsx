import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, ChevronRight, FileText, Mail, BarChart3, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ServiceGrid from '@/components/pages/locations/ServiceGrid.client'
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import { locations } from '@/data/locations'
import { createStaticClient } from '@/lib/supabase/server'

export const revalidate = 3600

const city = 'St. Gallen'
const canonicalUrl = '/umzugsfirma/st-gallen'
const imageUrl = '/image/umzug-reinigung-malerarbeiten-st.gallen-offerten.webp'

const faqItems = [
  {
    question: 'Wie viel kostet ein Umzug in St. Gallen?',
    answer:
      'Die Kosten hängen von Distanz, Wohnungsgrösse, Etage und Zusatzleistungen ab. Privatumzüge innerhalb St. Gallens starten bei kleinen Wohnungen oft bei einigen hundert Franken. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen.',
  },
  {
    question: 'Welche Leistungen bieten Umzugsfirmen in St. Gallen?',
    answer:
      'Die Dienstleistungen umfassen Standardleistungen wie Transport, Be- und Entladung sowie Möbelmontage. Dazu kommen Zusatzleistungen wie Verpacken, Reinigung, Entsorgung und Lagerung. Für besondere Anforderungen bieten viele Anbieter Spezialservices wie Klaviertransport, Tresorumzug oder Aussenlifte für schwierige Etagen.',
  },
  {
    question: 'Wie weit im Voraus sollte ich eine Umzugsfirma in St. Gallen buchen?',
    answer:
      'Für Standardumzüge empfehlen wir 4 bis 6 Wochen Vorlauf. In der Hochsaison (Frühling und Sommer) ist eine frühere Buchung sinnvoll. Kurzfristige Umzüge sind je nach Verfügbarkeit ebenfalls möglich.',
  },
  {
    question: 'Sind die Offerten für Umzugsfirmen in St. Gallen kostenlos und unverbindlich?',
    answer:
      'Ja. Über Online-Offerten.ch erhalten Sie kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen. Sie entscheiden danach selbst, ob und welchen Anbieter Sie beauftragen möchten.',
  },
  {
    question: 'Bieten Umzugsfirmen in St. Gallen auch Zusatzleistungen wie Reinigung oder Entsorgung an?',
    answer:
      'Viele Umzugsunternehmen in St. Gallen bieten neben dem Transport auch Zusatzleistungen wie Umzugsreinigung, Entsorgung, Ein- und Auspackservice oder Zwischenlagerung an. Der genaue Umfang hängt vom jeweiligen Anbieter ab und ist in der Offerte aufgeführt.',
  },
  {
    question: 'Werden auch Spezialtransporte wie Klavier- oder Tresortransporte in St. Gallen angeboten?',
    answer:
      'Ja, viele spezialisierte Umzugsfirmen in der Region St. Gallen übernehmen auch anspruchsvolle Spezialtransporte. Dazu gehören unter anderem Klaviere, Tresore oder empfindliche Einzelstücke mit entsprechendem Equipment und geschultem Personal.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Umzugsfirma-Vergleich',
  name: 'Umzugsfirma St. Gallen finden: Vergleichen Sie Angebote und sparen Sie bis zu 40%',
  description:
    'Vergleichen Sie professionelle Umzugsunternehmen in St. Gallen. Erhalten Sie bis zu 5 kostenlose Offerten und sparen Sie durch den direkten Preisvergleich regionaler Anbieter.',
  url: `https://online-offerten.ch${canonicalUrl}`,
  provider: {
    '@type': 'Organization',
    name: 'Online-Offerten.ch',
    url: 'https://online-offerten.ch',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Kanton St. Gallen',
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
    { '@type': 'ListItem', position: 2, name: 'Umzugsfirma in der Nähe', item: 'https://online-offerten.ch/umzugsfirma' },
    { '@type': 'ListItem', position: 3, name: 'Umzugsfirma St. Gallen', item: `https://online-offerten.ch${canonicalUrl}` },
  ],
}

async function getStGallenReviews() {
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

    const relevantCities = ['st. gallen', 'st.gallen', 'gossau', 'rorschach', 'wil', 'rapperswil', 'ostschweiz']
    const regionReviews = reviews.filter((review: any) => {
      const reviewCity = (review.city || '').toLowerCase()
      return relevantCities.some((cityName) => reviewCity.includes(cityName))
    })

    const selected = regionReviews.length > 0 ? regionReviews : reviews
    return selected.slice(0, 3)
  } catch (error) {
    console.error('Error in getStGallenReviews:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma St. Gallen finden: Vergleichen Sie Angebote und sparen Sie bis zu 40%',
  description:
    'Beschreiben Sie Ihren Umzug online und erhalten Sie bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen aus St. Gallen. Preise, Leistungen und Bewertungen transparent vergleichen.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/st-gallen',
  },
  openGraph: {
    title: 'Umzugsfirma St. Gallen: Angebote vergleichen und bis zu 40% sparen',
    description:
      'Vergleichen Sie professionelle Umzugsunternehmen in St. Gallen. Kostenlos Offerten anfordern und das beste Preis-Leistungs-Verhältnis finden.',
    url: 'https://online-offerten.ch/umzugsfirma/st-gallen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: `https://online-offerten.ch${imageUrl}`,
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma St. Gallen – Offerten vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma St. Gallen vergleichen',
    description: 'Bis zu 5 kostenlose Offerten von Umzugsfirmen in St. Gallen erhalten und sparen.',
    images: [`https://online-offerten.ch${imageUrl}`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function UmzugsfirmaStGallenPage() {
  const stGallenReviews = await getStGallenReviews()

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
                <li><Link href="/" className="hover:text-green-600 transition-colors">Startseite</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                <li><Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">Umzugsfirma in der Nähe</Link></li>
                <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                <li className="text-gray-900 font-medium" aria-current="page">Umzugsfirma St. Gallen</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-4">
                  Kanton St. Gallen
                </div>
                <h1 className="heading-1 !mt-0 mb-4">
                  Umzugsfirma St. Gallen finden: Vergleichen Sie Angebote und sparen Sie bis zu 40%
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl">
                  Der Umzug in St. Gallen muss weder teuer noch stressig sein. Beschreiben Sie Ihren Umzug online und erhalten Sie bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen aus der Region.
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
                    <span className="font-medium">Bis zu 40% sparen</span>
                  </div>
                </div>
              </div>

              <div className="relative md:col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={imageUrl}
                    alt="Ein Umzugsteam aus St. Gallen verlädt sorgfältig Möbel in einen Transporter."
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Kostenlos & unverbindlich</p>
                  <p className="text-xs text-green-100">Direkt Offerten vergleichen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">
              <article>
                <h2 className="typography-h2 mb-6">Professionelle Umzugsunternehmen in St. Gallen vergleichen</h2>
                <p className="typography-p mb-4">
                  Beschreiben Sie Ihren Umzug in wenigen Minuten online und erhalten Sie bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen aus St. Gallen.
                </p>
                <p className="typography-p mb-4">
                  Vergleichen Sie Preise, Leistungen und Bewertungen neutral auf einer Seite. Viele Kundinnen und Kunden berichten von positiven Erfahrungen und schätzen besonders die hohe Kundenzufriedenheit sowie das Vertrauen in geprüfte Dienstleister.
                </p>
                <p className="typography-p mb-4">
                  So sparen Sie bis zu 40% bei Ihren Umzugskosten durch den direkten Vergleich regionaler Anbieter.
                </p>
                <p className="typography-p">
                  Für eine noch bessere Einschätzung lohnt es sich zusätzlich, öffentliche Bewertungen auf Plattformen wie Google oder Yelp zu prüfen.
                </p>
                <div className="mt-6">
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold">
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=St.%20Gallen">
                      Jetzt kostenlose Offerten anfordern!
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </article>

              <article>
                <h2 className="typography-h2 mb-6">Transparente Preise und individueller Service</h2>
                <p className="typography-p mb-4">
                  Ein erfolgreicher Umzug in St. Gallen beginnt mit Transparenz und individueller Betreuung. Seriöse Umzugsfirmen legen grossen Wert auf ein faires Preis-Leistungs-Verhältnis und bieten einen Service, der auf Ihre konkrete Situation abgestimmt ist.
                </p>
                <p className="typography-p mb-4">
                  Eine transparente Preisgestaltung sorgt dafür, dass Sie von Anfang an wissen, welche Leistungen im Angebot enthalten sind. Viele Unternehmen bieten eine kostenlose Besichtigung und persönliche Beratung an, damit alle Details im Voraus geklärt werden können.
                </p>
                <p className="typography-p">
                  Ob Verpackungsservice, Transport oder Umzugsreinigung: Ziel ist ein stressfreier Ablauf, bei dem Qualität und Kundenzufriedenheit im Mittelpunkt stehen.
                </p>
              </article>

              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="typography-h2 mb-6">Warum einen Umzugsfirma-Vergleich in St. Gallen nutzen?</h2>
                <p className="text-body mb-4">
                  Ein Wohnortwechsel in der Ostschweiz stellt besondere Anforderungen: Die dichte Altstadt, enge Gassen und mehrstöckige Gebäude ohne Lift erfordern erfahrene Profis mit der richtigen Ausrüstung.
                </p>
                <ul className="space-y-3 text-body">
                  <li><strong>Zeitersparnis:</strong> Mehrere Offerten mit nur einer Anfrage erhalten.</li>
                  <li><strong>Kostenersparnis:</strong> Transparenter Preisvergleich regionaler Anbieter.</li>
                  <li><strong>Qualitätssicherung:</strong> Nur geprüfte und versicherte Umzugsunternehmen.</li>
                  <li><strong>Unverbindlich:</strong> 100% kostenlos und ohne Verpflichtung zur Buchung.</li>
                  <li><strong>Regional:</strong> Lokale Zügelfirmen aus St. Gallen und Umgebung.</li>
                  <li><strong>Transparent:</strong> Klare Leistungen ohne versteckte Gebühren.</li>
                </ul>
              </article>

              <article>
                <h2 className="typography-h2 mb-6">Umzugsarten in St. Gallen</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="heading-4 mb-3">Privatumzug St. Gallen</h3>
                    <p className="text-body mb-3">
                      Für private Umzüge bieten Umzugsfirmen in St. Gallen massgeschneiderte Lösungen, die auf die Bedürfnisse von Privatpersonen zugeschnitten sind.
                    </p>
                    <ul className="space-y-2 text-body">
                      <li><strong>Wohnungsumzüge</strong> innerhalb St. Gallen und Umgebung.</li>
                      <li><strong>Hausumzüge</strong> mit kompletter Einrichtung.</li>
                      <li><strong>Seniorenumzüge</strong> mit besonderer Sorgfalt.</li>
                      <li><strong>Studentenumzüge</strong> zu günstigen Konditionen.</li>
                    </ul>
                    <p className="text-body mt-3">
                      Professionelle Umzugsfirmen stellen hochwertiges Umzugsmaterial bereit und kümmern sich um Verpackung, Transport und Montage.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="heading-4 mb-3">Firmenumzug St. Gallen</h3>
                    <p className="text-body mb-3">
                      Firmenumzüge erfordern präzise Umzugsplanung, um Ausfallzeiten zu minimieren.
                    </p>
                    <ul className="space-y-2 text-body">
                      <li><strong>Büroumzüge</strong> mit IT- und Serverumzug.</li>
                      <li><strong>Praxisumzüge</strong> für Ärzte und Anwälte.</li>
                      <li><strong>Industrieumzüge</strong> mit Spezialequipment.</li>
                      <li><strong>Lagerumzüge</strong> und Logistiklösungen.</li>
                    </ul>
                    <p className="text-body mt-3">
                      Auch komplexe Firmenumzüge werden zuverlässig und professionell abgewickelt.
                    </p>
                  </div>
                </div>
              </article>

              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="typography-h2 mb-6">Unsere Kernkompetenzen</h2>
                <p className="text-body mb-4">
                  Umzugsfirmen in St. Gallen und der Ostschweiz bieten eine breite Palette an Dienstleistungen, um Ihren Umzug effizient und sorgenfrei zu gestalten.
                </p>
                <p className="text-body mb-4">
                  Zu den Kernkompetenzen zählen die professionelle Umzugsplanung, der sichere Transport von Möbeln und persönlichen Gegenständen sowie die fachgerechte Reinigung und Räumung.
                </p>
                <p className="text-body mb-4">
                  Mit modernem Equipment und geeigneten Umzugsfahrzeugen sorgen erfahrene Teams dafür, dass Ihr Umzugsgut sicher am Zielort ankommt. Auf Wunsch übernehmen sie auch den Ab- und Aufbau Ihrer Möbel.
                </p>
                <p className="text-body">
                  Dank langjähriger Erfahrung, klarer Beratung und hoher Servicequalität sind Umzugsunternehmen in St. Gallen verlässliche Partner für Privatpersonen und Unternehmen in der gesamten Region.
                </p>
              </article>

              <article>
                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
                  <div className="md:col-span-3">
                    <h2 className="typography-h2 mb-6">Wichtige Kriterien bei der Umzugsfirma-Auswahl in St. Gallen</h2>
                    <ol className="list-decimal pl-5 space-y-3 text-body">
                      <li><strong>Erfahrung und Referenzen</strong> in der Region St. Gallen.</li>
                      <li><strong>Vollständige Versicherung</strong> und Haftpflichtschutz.</li>
                      <li><strong>Transparente Preisgestaltung</strong> ohne versteckte Kosten.</li>
                      <li><strong>Moderne Ausrüstung</strong> wie Umzugswagen, Möbellift und Verpackungsmaterial.</li>
                      <li><strong>Zusatzleistungen</strong> wie Montage, Reinigung, Entsorgung und Lagerung.</li>
                      <li><strong>Flexibilität</strong> bei Terminplanung und Sonderwünschen.</li>
                      <li><strong>Positive Kundenbewertungen</strong> und Empfehlungen.</li>
                      <li><strong>Fachgerechter Transport</strong> von Klavieren oder Antiquitäten.</li>
                      <li><strong>Halteverbotszonen-Organisation</strong> in engen Strassen.</li>
                      <li><strong>Erreichbarkeit</strong> mit persönlichem Ansprechpartner am Umzugstag.</li>
                    </ol>
                  </div>
                  <div className="md:col-span-2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                      <Image
                        src="/umzug/kanton-stgallen.webp"
                        alt="Ein Umzugsteam aus St. Gallen verladen sorgfältig Möbel in einen Transporter, während sie auf die richtige Handhabung des Umzugsguts achten."
                        width={1200}
                        height={700}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>

              <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                <h2 className="typography-h2 mb-6">In 3 einfachen Schritten zur besten Umzugsfirma in St. Gallen</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <FileText className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="heading-4 mb-2">Schritt 1: Umzug beschreiben</h3>
                    <p className="text-body">
                      Geben Sie Wohnungsgrösse, Zimmer, Etage, Termin und Zusatzleistungen im Formular an. Bei Bedarf können Sie auch Fotos hochladen.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <Mail className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="heading-4 mb-2">Schritt 2: Offerten erhalten</h3>
                    <p className="text-body">
                      Sie erhalten bis zu 5 kostenlose Angebote mit detaillierter Kostenaufstellung und Leistungsbeschreibung.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="heading-4 mb-2">Schritt 3: Vergleichen und buchen</h3>
                    <p className="text-body">
                      Vergleichen Sie Preise, Leistungen und Bewertungen neutral und wählen Sie den passenden Anbieter.
                    </p>
                  </div>
                </div>
              </article>

              <article>
                <h2 className="typography-h2 mb-6">Kundenerfahrungen mit Umzugsfirmen in St. Gallen</h2>
                {stGallenReviews.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    {stGallenReviews.map((review: any) => (
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
                    Aktuell sind noch keine öffentlichen Bewertungen für St. Gallen verfügbar.
                  </div>
                )}
              </article>

              <article className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Jetzt kostenlose Umzugsofferten für St. Gallen erhalten</h2>
                <p className="text-green-50 mb-6 max-w-2xl mx-auto">
                  Starten Sie Ihre Suche nach der idealen Umzugsfirma in St. Gallen noch heute. Anfrage in 2 Minuten erstellen und Offerten transparent vergleichen.
                </p>
                <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=St.%20Gallen">
                    Kostenlose Offerten anfordern
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
                  <h2 className="heading-2">Häufig gestellte Fragen zu Umzugsfirmen in St. Gallen</h2>
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
                    src="/fotos/umzugstag.webp"
                    alt="Umzug in St. Gallen – FAQ und Antworten"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Fragen & Antworten</p>
                  <p className="text-xs text-blue-100">Rund um Umzüge in St. Gallen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="typography-h2 mb-6">Beliebte Umzugsorte in der Region St. Gallen</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {['St. Gallen', 'Gossau', 'Rorschach', 'Wil', 'Rapperswil-Jona', 'Uzwil'].map((name) => (
                <div key={name} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <h3 className="heading-4 !mt-0">{name}</h3>
                  </div>
                </div>
              ))}
            </div>
            <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </section>
      </div>
    </>
  )
}


