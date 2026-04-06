'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Droplets,
  Layers,
  Truck,
  Package,
  Trash2,
  Archive,
  Star,
  MapPin,
  ChevronRight,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar'

export type EndreinigungPartner = {
  id: string
  company_name: string
  slug: string
  address_city?: string | null
  address_zip?: string | null
  average_rating?: number | null
  review_count?: number | null
  badge_tier?: string | null
  logo_url?: string | null
}

interface EndreinigungPageClientProps {
  partners: EndreinigungPartner[]
  faqItems: { q: string; a: string }[]
}

const H1_TITLE =
  'Endreinigung mit Abnahmegarantie: Reinigungsfirmen vergleichen und 60% sparen'

const heroOptions: {
  label: string
  sub: string
  href: string
  icon: React.ElementType
}[] = [
  {
    label: 'Nur Reinigung',
    sub: 'Reinigungsofferte ohne Umzug',
    href: '/kostenlose-offerte-anfordern?service=reinigung&step=2',
    icon: Droplets,
  },
  {
    label: 'Endreinigung, Umzugsreinigung oder Baureinigung',
    sub: 'Art im Formular wählen',
    href: '/kostenlose-offerte-anfordern?service=reinigung&step=2',
    icon: Layers,
  },
  {
    label: 'Umzug und Reinigung',
    sub: 'Privatumzug inkl. Endreinigung',
    href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug&endreinigung=ja',
    icon: Truck,
  },
  {
    label: 'Kombi-Anfrage',
    sub: 'Mehrere Leistungen anfragen',
    href: '/kostenlose-offerte-anfordern?service=umzug&step=2',
    icon: Package,
  },
  {
    label: 'Entsorgung',
    sub: 'Fachgerechte Entsorgung',
    href: '/kostenlose-offerte-anfordern?service=raeumung&step=3&raeumungArt=entsorgung',
    icon: Trash2,
  },
  {
    label: 'Entrümpelung und Räumung',
    sub: 'Räumung & Leerung',
    href: '/kostenlose-offerte-anfordern?service=raeumung&step=2&raeumungArt=raeumung',
    icon: Archive,
  },
]

const EndreinigungPageClient = ({ partners, faqItems }: EndreinigungPageClientProps) => {
  const router = useRouter()

  const handleCta = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung')
  }

  return (
    <>
      <div className="bg-slate-50">
        <section className="relative w-full py-8 md:py-14 overflow-hidden">
          <div
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/umzugsreinigung_team_saubere_wohnung.png')`,
              maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-green-700">
                    Startseite
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                <li>
                  <Link href="/reinigung" className="hover:text-green-700">
                    Reinigung
                  </Link>
                </li>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                <li className="text-gray-900 font-medium" aria-current="page">
                  Endreinigung
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Abnahmegarantie &amp; Offertenvergleich
              </div>
              <h1 className="heading-1 !mt-0 text-balance">{H1_TITLE}</h1>
              <p className="text-base sm:text-lg text-gray-600 mt-4 mb-8 leading-relaxed">
                Professionelle <strong>Reinigungsfirmen</strong> für Ihre <strong>Wohnungsabgabe</strong>: Mehrere{' '}
                <strong>kostenlose Reinigungsofferten</strong> vergleichen und oft deutlich günstiger abschliessen – bis
                zu <strong>60&nbsp;%</strong> gegenüber der ersten Einzelofferte, abhängig von Objekt und Angebot.
              </p>

              <p className="text-sm font-semibold text-gray-800 mb-3">Passende Anfrage wählen:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {heroOptions.map((opt) => (
                  <Link
                    key={opt.href + opt.label}
                    href={opt.href}
                    className="flex items-start gap-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-green-500 hover:bg-green-50/80 transition-all shadow-sm"
                  >
                    <div className="p-2 rounded-lg bg-green-100 text-green-700 shrink-0">
                      <opt.icon className="w-5 h-5" aria-hidden />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">{opt.label}</span>
                      <span className="text-sm text-gray-600">{opt.sub}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <Button
                size="lg"
                onClick={handleCta}
                className="bg-green-700 hover:bg-green-800 text-white font-bold w-full sm:w-auto px-8 py-6 text-base"
              >
                Endreinigung Offerten anfordern
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-700">
                <span className="inline-flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Geprüfte Reinigungsfirmen
                </span>
                <span className="inline-flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Kostenlos &amp; unverbindlich
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-white border-t border-gray-100">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="heading-2 text-center mb-10">Geprüfte Reinigungsfirmen – unsere Partner</h2>
            <p className="text-body text-center max-w-3xl mx-auto mb-10">
              Auf dieser Seite listen wir <strong>ausschliesslich Partner</strong>, die{' '}
              <strong>Reinigungsdienstleistungen</strong> anbieten – damit Sie bei der Suche nach einer{' '}
              <strong>Putzfirma</strong> oder <strong>Reinigungsfirma</strong> direkt passende Anbieter sehen. Klicken
              Sie auf ein Profil für Bewertungen und Details, oder fordern Sie über das Formular neue Offerten an.
            </p>

            {partners.length === 0 ? (
              <p className="text-center text-body text-gray-600">
                Partner werden geladen. Alternativ:{' '}
                <Link href="/partner-suche" className="text-green-700 font-semibold underline">
                  zur Partnerübersicht
                </Link>{' '}
                oder{' '}
                <button type="button" onClick={handleCta} className="text-green-700 font-semibold underline">
                  Offerte anfordern
                </button>
                .
              </p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {partners.map((p) => {
                  const slug = p.slug || p.id
                  const rating = p.average_rating || 0
                  const reviews = p.review_count || 0
                  return (
                    <li key={p.id}>
                      <Link
                        href={`/partner/${slug}`}
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-md transition-all h-full"
                      >
                        <div className="relative w-16 h-16 shrink-0 rounded-lg bg-white border border-gray-200 overflow-hidden flex items-center justify-center p-2">
                          {p.logo_url ? (
                            <Image
                              src={p.logo_url}
                              alt={`Logo ${p.company_name} – Reinigungsfirma Schweiz`}
                              width={64}
                              height={64}
                              className="object-contain w-full h-full"
                              unoptimized
                            />
                          ) : (
                            <Image
                              src="/image/logo-icon.webp"
                              alt=""
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold text-gray-900 block truncate">{p.company_name}</span>
                          {p.address_city && (
                            <span className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              {p.address_city}
                              {p.address_zip ? ` ${p.address_zip}` : ''}
                            </span>
                          )}
                          {rating > 0 && (
                            <span className="text-sm text-amber-700 flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                              {rating.toFixed(1)}
                              {reviews > 0 ? ` (${reviews} Bewertungen)` : ''}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 shrink-0" aria-hidden />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}

            <p className="text-center mt-8 text-sm text-gray-500">
              Alle Anbieter durchlaufen unsere Prüfung. Sie möchten nicht wählen?{' '}
              <button type="button" onClick={handleCta} className="text-green-700 font-semibold underline">
                Kostenlose Offerten
              </button>{' '}
              – wir vermitteln passende Reinigungsfirmen.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-16 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              <article className="lg:col-span-2 space-y-8">
                <h2 className="heading-2">Endreinigung in der Schweiz: Warum ein Vergleich sich auszahlt</h2>
                <p className="text-body">
                  Die <strong>Endreinigung</strong> – oft synonym mit <strong>Umzugsreinigung</strong> oder{' '}
                  <strong>Wohnungsendreinigung</strong> – ist bei der <strong>Wohnungsübergabe</strong> der entscheidende
                  Punkt für eine reibungslose <strong>Wohnungsabgabe</strong>. Suchanfragen wie{' '}
                  <em>Endreinigung mit Abnahmegarantie</em>, <em>Reinigungsofferte</em> oder{' '}
                  <em>Reinigungsfirma in der Nähe</em> zeigen: Mieter und Eigentümer wollen klare Leistungen und faire{' '}
                  <strong>Reinigungskosten</strong>. Genau hier setzt Online-Offerten.ch an: Sie beschreiben Ihr Objekt
                  einmal und erhalten vergleichbare Angebote von <strong>geprüften Reinigungsunternehmen</strong>.
                </p>

                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src="/reinigungsfirma/bbbd13c1-cc55-4a7c-88fb-781a368f7553.webp"
                    alt="Professionelle Endreinigung – saubere Wohnung zur Übergabe"
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>

                <h2 className="heading-2">Abnahmegarantie: Was Sie wissen sollten</h2>
                <p className="text-body">
                  Eine <strong>Abnahmegarantie</strong> bedeutet, dass die Reinigungsfirma bei berechtigten Beanstandungen
                  nachbessert – sofern der Leistungsumfang dies vorsieht. Das schützt vor unerwarteten Kosten nach der
                  Besichtigung durch Vermieter oder Verwaltung. Achten Sie in den <strong>Offerten</strong> auf Küche,
                  Nasszellen, Fenster, Böden und Nebenräume; nur so ist der Vergleich von{' '}
                  <strong>Endreinigung Preisen</strong> sinnvoll.
                </p>

                <h2 className="heading-2">Bis zu 60&nbsp;% sparen – wie funktioniert das?</h2>
                <p className="text-body">
                  Viele erste Einzelangebote liegen über dem, was bei Wettbewerb möglich ist. Wer{' '}
                  <strong>mehrere Reinigungsofferten</strong> parallel einholt, erkennt marktübliche Spannen und kann
                  verhandeln oder den günstigsten passenden Anbieter wählen. Kunden berichten häufig von{' '}
                  <strong>erheblichen Ersparnissen</strong> – bis zu <strong>60&nbsp;%</strong> sind je nach Ausgangslage
                  möglich, keine Garantie für jeden Einzelfall.
                </p>

                <h2 className="heading-2">Endreinigung, Baureinigung oder Umzugsreinigung?</h2>
                <p className="text-body">
                  <Link href="/reinigung/baureinigung" className="text-green-700 font-semibold hover:underline">
                    Baureinigung
                  </Link>{' '}
                  ist nach Bau oder Umbau relevant, die klassische{' '}
                  <Link href="/reinigung/umzugsreinigung" className="text-green-700 font-semibold hover:underline">
                    Umzugsreinigung
                  </Link>{' '}
                  vor Übergabe der Mietwohnung. Für beide gilt: Je präziser Ihre Angaben im Formular, desto besser die{' '}
                  <strong>Offerten</strong>. Über{' '}
                  <Link href="/reinigung" className="text-green-700 font-semibold hover:underline">
                    unsere Reinigungsübersicht
                  </Link>{' '}
                  erreichen Sie alle Spezialseiten.
                </p>

                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                    alt="Reinigungsmittel und Equipment für Endreinigung und Wohnungsabgabe"
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>

                <h2 className="heading-2">Regionale Reinigungsfirmen</h2>
                <p className="text-body">
                  Ob <Link href="/reinigungsfirma/zuerich" className="text-green-700 font-semibold hover:underline">Zürich</Link>,{' '}
                  <Link href="/reinigungsfirma/bern" className="text-green-700 font-semibold hover:underline">Bern</Link> oder{' '}
                  <Link href="/reinigungsfirma/basel" className="text-green-700 font-semibold hover:underline">Basel</Link>: Über{' '}
                  <Link href="/reinigungsfirma" className="text-green-700 font-semibold hover:underline">
                    Reinigungsfirma in Ihrer Stadt
                  </Link>{' '}
                  finden Sie lokale Informationen. Die Vermittlung läuft über dieselbe Plattform – mit Fokus auf{' '}
                  <strong>schweizerische Reinigungsfirmen</strong>.
                </p>

                <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Jetzt Endreinigung vergleichen</h3>
                  <p className="text-body mb-4">
                    Kostenlos, unverbindlich und ohne Kleingedrucktes: Offerten von Reinigungsfirmen mit Abnahmegarantie
                    einholen.
                  </p>
                  <Button size="lg" onClick={handleCta} className="bg-green-700 hover:bg-green-800 text-white">
                    Kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <h2 className="heading-2">Häufige Fragen zur Endreinigung</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-200">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-700">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-body pb-4">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div>
                  <h3 className="heading-3 mb-4">Weitere Themen</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Link
                      href="/reinigung/umzugsreinigung"
                      className="p-4 rounded-lg border border-gray-200 bg-white hover:border-green-400 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">Umzugsreinigung</span>
                      <p className="text-sm text-gray-600 mt-1">Abnahmegarantie &amp; Ablauf</p>
                    </Link>
                    <Link
                      href="/reinigung/wohnungsreinigung"
                      className="p-4 rounded-lg border border-gray-200 bg-white hover:border-green-400 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">Wohnungsreinigung</span>
                      <p className="text-sm text-gray-600 mt-1">Privathaushalt</p>
                    </Link>
                    <Link
                      href="/reinigung/reinigungskosten"
                      className="p-4 rounded-lg border border-gray-200 bg-white hover:border-green-400 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">Reinigungskosten</span>
                      <p className="text-sm text-gray-600 mt-1">Preise einordnen</p>
                    </Link>
                    <Link
                      href="/partner-suche"
                      className="p-4 rounded-lg border border-gray-200 bg-white hover:border-green-400 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">Alle Partner</span>
                      <p className="text-sm text-gray-600 mt-1">Filtern &amp; vergleichen</p>
                    </Link>
                  </div>
                </div>
              </article>

              <aside className="lg:col-span-1 space-y-6">
                <CleaningRatgeberSidebar />
                <div className="sticky top-24 bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-6 border border-green-100">
                  <h3 className="heading-3 mb-3">Offerten für Endreinigung</h3>
                  <p className="text-body mb-4">
                    In wenigen Minuten Anfrage stellen – passende Reinigungsfirmen melden sich bei Ihnen.
                  </p>
                  <Button onClick={handleCta} className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold">
                    Jetzt anfordern
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default EndreinigungPageClient
