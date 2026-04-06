'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar'
import ReinigungServiceHero from '@/components/reinigung/ReinigungServiceHero'

interface EndreinigungPageClientProps {
  faqItems: { q: string; a: string }[]
}

const H1_TITLE =
  'Endreinigung mit Abnahmegarantie: Reinigungsfirmen vergleichen und 40% sparen'

const EndreinigungPageClient = ({ faqItems }: EndreinigungPageClientProps) => {
  const router = useRouter()

  const handleCta = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung')
  }

  return (
    <>
      <div className="bg-slate-50">
        <ReinigungServiceHero
          breadcrumbCurrent="Endreinigung"
          backgroundImageUrl="https://online-offerten.ch/reinigungsfirma/umzugsreinigung_team_saubere_wohnung.png"
          badgeText="Abnahmegarantie & Offertenvergleich"
          title={H1_TITLE}
          intro="Vergleichen Sie kostenlos regionale Reinigungsfirmen für Ihre Reinigung."
          ctaLabel="Endreinigung Offerten anfordern"
          onCtaClick={handleCta}
          trustItems={['Geprüfte Reinigungsfirmen', 'Kostenlos & unverbindlich']}
        />

        <section className="py-10 md:py-16 bg-slate-50 border-t border-gray-100">
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

                <h2 className="heading-2">Bis zu 40&nbsp;% sparen – wie funktioniert das?</h2>
                <p className="text-body">
                  Viele erste Einzelangebote liegen über dem, was bei Wettbewerb möglich ist. Wer{' '}
                  <strong>mehrere Reinigungsofferten</strong> parallel einholt, erkennt marktübliche Spannen und kann
                  verhandeln oder den günstigsten passenden Anbieter wählen. Kunden berichten häufig von{' '}
                  <strong>erheblichen Ersparnissen</strong> – bis zu <strong>40&nbsp;%</strong> sind je nach Ausgangslage
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
