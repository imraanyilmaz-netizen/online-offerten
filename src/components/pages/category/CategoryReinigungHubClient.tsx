'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import {
  ArrowRight,
  Building,
  Brush,
  Calculator,
  CheckCircle,
  ChevronRight,
  Clock3,
  Droplets,
  Factory,
  HelpCircle,
  Home,
  MapPin,
  PackageOpen,
  Recycle,
  Search,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Warehouse,
  Wind,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getCategoryServicePath, serviceCategories } from '@/data/categories'

const trustBadges = [
  'Bis zu 5 kostenlose Offerten',
  'Geprüfte Reinigungsfirmen',
  'Für Privat & Unternehmen',
  '100% unverbindlich',
]

const processSteps = [
  {
    icon: Search,
    title: 'Reinigung beschreiben',
    text: 'Geben Sie an, ob es um Endreinigung, Wohnungsreinigung, Büroreinigung oder eine andere Reinigungsart geht.',
  },
  {
    icon: Calculator,
    title: 'Offerten erhalten',
    text: 'Passende Reinigungsfirmen aus Ihrer Region melden sich mit transparenten Angeboten.',
  },
  {
    icon: CheckCircle,
    title: 'Anbieter vergleichen',
    text: 'Vergleichen Sie Preis, Leistungen, Termin und Abnahmegarantie, bevor Sie sich entscheiden.',
  },
]

const priceFactors = [
  'Grösse und Zustand der Räume',
  'Art der Reinigung und gewünschter Leistungsumfang',
  'Fenster, Storen, Küche, Bad und Spezialflächen',
  'Termin, Region und gewünschte Abnahmegarantie',
]

const cityLinks = [
  ['Zürich', '/reinigungsfirma/zuerich'],
  ['Bern', '/reinigungsfirma/bern'],
  ['Basel', '/reinigungsfirma/basel'],
  ['Luzern', '/reinigungsfirma/luzern'],
  ['St. Gallen', '/reinigungsfirma/st-gallen'],
  ['Winterthur', '/reinigungsfirma/winterthur'],
]

const faqItems = [
  {
    question: 'Wie finde ich eine gute Reinigungsfirma in der Schweiz?',
    answer:
      'Eine gute Reinigungsfirma erkennen Sie an klaren Leistungen, transparenter Offerte, Erfahrung mit Ihrer Reinigungsart und guten Rückmeldungen. Über Online-Offerten.ch können Sie mehrere geprüfte Anbieter gleichzeitig vergleichen.',
  },
  {
    question: 'Ist die Anfrage für Reinigungsofferten kostenlos?',
    answer:
      'Ja. Die Anfrage ist kostenlos und unverbindlich. Sie erhalten passende Offerten und entscheiden selbst, ob Sie eine Reinigungsfirma beauftragen möchten.',
  },
  {
    question: 'Was kostet eine Reinigungsfirma?',
    answer:
      'Die Kosten hängen von Fläche, Zustand, Reinigungsart, Zusatzleistungen und Region ab. Bei einer Endreinigung spielen auch Abnahmegarantie, Fenster und Nebenräume eine wichtige Rolle.',
  },
  {
    question: 'Kann ich eine Endreinigung mit Abnahmegarantie anfragen?',
    answer:
      'Ja. Für Umzugsreinigung und Endreinigung können Sie Anbieter vergleichen, die eine Abnahmegarantie anbieten. Das ist besonders bei Wohnungsübergaben wichtig.',
  },
]

export default function CategoryReinigungHubClient() {
  const metaTitle = 'Reinigungsfirma Schweiz – Kostenlose Offerten vergleichen'
  const metaDescription =
    'Finden Sie geprüfte Reinigungsfirmen in der Schweiz für Umzugsreinigung, Endreinigung, Wohnungsreinigung und Büroreinigung. Vergleichen Sie kostenlos bis zu 5 Offerten und sparen Sie Zeit und Kosten.'

  const services = useMemo(
    () => serviceCategories.find((c) => c.slug === 'reinigungsfirma')?.services ?? [],
    []
  )

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: metaTitle,
          serviceType: 'Reinigungsservice',
          description: metaDescription,
          provider: {
            '@type': 'Organization',
            name: 'Online-Offerten.ch',
            url: 'https://online-offerten.ch',
          },
          areaServed: { '@type': 'Country', name: 'Switzerland' },
          offers: {
            '@type': 'Offer',
            url: 'https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung&step=2',
            priceCurrency: 'CHF',
            price: '0',
            name: 'Kostenlose Reinigungsofferten',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
        {
          '@type': 'HowTo',
          name: 'Reinigungsfirma vergleichen',
          description: 'So erhalten Sie passende Reinigungsofferten in der Schweiz.',
          step: processSteps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.title,
            text: step.text,
          })),
        },
      ],
    }),
    [metaDescription, metaTitle]
  )

  const iconFor = (id: string) => {
    if (id.includes('buero')) return Building
    if (id.includes('haus') || id.includes('wohnung')) return Home
    if (id.includes('fenster')) return Wind
    if (id.includes('boden')) return Sparkles
    if (id.includes('fassaden')) return Building
    if (id.includes('hof')) return Warehouse
    if (id.includes('bau')) return Factory
    if (id.includes('unterhalt') || id.includes('grund') || id.includes('umzugs')) return SprayCan
    if (id.includes('raeumung')) return PackageOpen
    if (id.includes('entsorgung')) return Recycle
    if (id.includes('reinigung')) return Droplets
    return Brush
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-background">
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 py-10 dark:from-background dark:via-background dark:to-emerald-950/25 md:py-16">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                    Startseite
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/70" />
                </li>
                <li className="text-foreground font-medium" aria-current="page">
                  Reinigungsfirma
                </li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center rounded-full border border-emerald-200/80 bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Professionelle Reinigung in der Schweiz
                </div>
                <h1 className="heading-1 !mt-0">
                  Reinigungsfirma finden und kostenlose Offerten vergleichen
                </h1>
                <p className="mb-6 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-muted-foreground sm:text-lg">
                  {metaDescription} Ideal für Wohnungsübergabe, Büro, Haus, Fenster, Unterhalt und
                  Spezialreinigung.
                </p>

                <div className="mb-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    Kostenlose Offerten anfordern
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="#reinigungsarten"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted/60"
                  >
                    Reinigungsarten ansehen
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {trustBadges.map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/80 p-3 text-sm font-semibold text-slate-700 shadow-sm dark:border-border dark:bg-card/80 dark:text-muted-foreground"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/5 dark:border-border dark:bg-card">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 p-6 text-white">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-100">
                    Reinigungsofferten vergleichen
                  </p>
                  <h2 className="text-2xl font-bold">In wenigen Minuten zur passenden Reinigungsfirma</h2>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-50">
                    Beschreiben Sie Ihr Objekt einmal und erhalten Sie Angebote von passenden
                    Reinigungsunternehmen in Ihrer Region.
                  </p>
                </div>
                <div className="mt-5 space-y-4">
                  {processSteps.map((step) => {
                    const Icon = step.icon
                    return (
                      <div key={step.title} className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{step.title}</p>
                          <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reinigungsarten" className="border-t border-border bg-white py-12 dark:bg-background md:py-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8 max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Reinigungsarten
              </p>
              <h2 className="heading-2">Welche Reinigungsfirma passt zu Ihrem Auftrag?</h2>
              <p className="mt-3 text-body">
                Je genauer die Leistung beschrieben ist, desto besser lassen sich Preise und Umfang
                vergleichen. Wählen Sie die passende Reinigungsart und erhalten Sie spezialisierte
                Anbieter für Ihren Bedarf.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
              {services.map((s) => {
                const Icon = iconFor(s.id)
                return (
                  <Link
                    key={s.id}
                    href={getCategoryServicePath('reinigungsfirma', s)}
                    className="group flex min-h-32 flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md dark:hover:border-emerald-500 dark:hover:bg-emerald-950/35"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 transition-colors group-hover:bg-emerald-600 dark:bg-emerald-950/50 dark:group-hover:bg-emerald-600">
                      <Icon className="h-5 w-5 text-emerald-700 transition-colors group-hover:text-white dark:text-emerald-400" />
                    </div>
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="mt-1 text-sm text-muted-foreground">
                      {s.desc ?? 'Regionale Anbieter vergleichen'}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-slate-50 py-12 dark:bg-muted/20 md:py-16">
          <div className="container mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-2">
            <div className="space-y-5">
              <h2 className="heading-2">Reinigungsfirma vergleichen statt einzeln anfragen</h2>
              <p className="text-body">
                Eine professionelle Reinigungsfirma spart Zeit und sorgt dafür, dass Wohnung, Haus
                oder Büro sauber und termingerecht übergeben werden. Besonders bei einer
                Umzugsreinigung mit Abnahmegarantie ist es wichtig, dass Leistungsumfang,
                Nachreinigung und Termin klar geregelt sind.
              </p>
              <p className="text-body">
                Mit einem Offertenvergleich sehen Sie schneller, welche Anbieter verfügbar sind,
                welche Leistungen enthalten sind und wo Preisunterschiede entstehen. So vermeiden
                Sie unklare Pauschalen und finden eine Reinigungsfirma, die zum Objekt und Budget
                passt.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  Jetzt Reinigungsofferten vergleichen
                </Link>
                <Link
                  href="/reinigungsfirma-in-der-naehe"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-5 py-3 font-semibold text-foreground transition-colors hover:bg-muted/60 dark:bg-card"
                >
                  Anbieter in der Nähe finden
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Warum lohnt sich der Vergleich?</h3>
                  <p className="text-sm text-muted-foreground">Mehr Klarheit vor der Beauftragung</p>
                </div>
              </div>
              <ul className="space-y-3 text-body">
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Transparente Leistungsbeschreibung für Abnahme und Übergabe</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Direkter Vergleich von Preis, Termin, Umfang und Zusatzleistungen</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Sie entscheiden selbst, ob und mit wem Sie zusammenarbeiten</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-white py-12 dark:bg-background md:py-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                  <Clock3 className="h-4 w-4" />
                  Ablauf
                </p>
                <h2 className="heading-2">So funktioniert die Anfrage</h2>
                <p className="mt-3 text-body">
                  Eine gute Offerte beginnt mit den richtigen Angaben. Beschreiben Sie Objekt,
                  Reinigungsart, Termin und gewünschte Zusatzleistungen einmal und vergleichen Sie
                  danach passende Angebote.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {processSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="rounded-2xl border border-border bg-card p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">0{index + 1}</span>
                      </div>
                      <h3 className="font-bold text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-slate-50 py-12 dark:bg-muted/20 md:py-16">
          <div className="container mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="heading-2">Was beeinflusst die Reinigungskosten?</h2>
              <p className="mt-3 text-body">
                Pauschale Preise wirken einfach, sind aber oft schwer vergleichbar. Eine faire
                Reinigungsofferte berücksichtigt den Zustand, die Fläche und die gewünschten
                Zusatzarbeiten.
              </p>
              <ul className="mt-6 space-y-3">
                {priceFactors.map((factor) => (
                  <li key={factor} className="flex gap-2 text-body">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="heading-2">Reinigungsfirma in Ihrer Stadt</h2>
              <p className="mt-3 text-body">
                Vergleichen Sie lokale Anbieter in wichtigen Schweizer Städten und erhalten Sie
                Reinigungsofferten von Firmen, die Ihre Region kennen.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {cityLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition-colors hover:border-emerald-500 hover:bg-emerald-50 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/35"
                  >
                    <span>{label}</span>
                    <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-white py-12 dark:bg-background md:py-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="mb-8">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-300">
                <HelpCircle className="h-3.5 w-3.5" />
                Häufige Fragen
              </div>
              <h2 className="heading-2">FAQ zur Reinigungsfirma</h2>
              <p className="mt-2 text-body">
                Antworten zu Offerten, Kosten, Abnahmegarantie und Auswahl einer passenden
                Reinigungsfirma.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="w-full divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/50 px-1 dark:divide-border dark:border-border dark:bg-muted/25"
            >
              {faqItems.map((item, index) => (
                <AccordionItem value={`faq-${index}`} key={item.question} className="border-0 px-3 md:px-4">
                  <AccordionTrigger className="py-4 text-left text-base font-semibold text-slate-900 hover:no-underline dark:text-foreground md:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-0 text-slate-700 dark:text-muted-foreground">
                    <p className="leading-relaxed">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  )
}
