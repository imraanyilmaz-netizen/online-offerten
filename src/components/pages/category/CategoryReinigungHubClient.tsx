'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { CheckCircle, Sparkles, Home, Building, Brush, ChevronRight } from 'lucide-react'
import { getCategoryServicePath, serviceCategories } from '@/data/categories'

export default function CategoryReinigungHubClient() {
  const metaTitle = 'Reinigungsfirma – Kostenlose Offerten vergleichen | Schweiz'
  const metaDescription =
    'Professionelle Reinigungsdienstleistungen für Wohnung, Haus und Büro. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Region und sparen Sie bis zu 40%.'

  const services = useMemo(
    () => serviceCategories.find((c) => c.slug === 'reinigungsfirma')?.services ?? [],
    []
  )

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: metaTitle,
      serviceType: 'Reinigungsvermittlung',
      description: metaDescription,
      provider: {
        '@type': 'Organization',
        name: 'Online-Offerten.ch',
        url: 'https://online-offerten.ch',
      },
      areaServed: { '@type': 'Country', name: 'Switzerland' },
      offers: {
        '@type': 'Offer',
        url: 'https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung',
        priceCurrency: 'CHF',
        price: '0',
        name: 'Kostenlose Offerte für Reinigung',
      },
    }),
    []
  )

  const iconFor = (id: string) => {
    if (id.includes('buero')) return Building
    if (id.includes('haus') || id.includes('wohnung')) return Home
    return Brush
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-background">
        <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-background dark:via-background dark:to-sky-950/25">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                    Startseite
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/70" />
                </li>
                <li className="text-foreground font-medium" aria-current="page">
                  Reinigung
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-sky-950/50 rounded-full text-blue-700 dark:text-sky-300 font-semibold text-sm mb-4 border border-blue-200/60 dark:border-sky-800">
              <Sparkles className="h-4 w-4 mr-2" />
              Professionelle Reinigung in der Schweiz
            </div>
            <h1 className="heading-1 !mt-0">Reinigungsfirma finden & Offerten vergleichen » Bis zu 40% sparen</h1>
            <p className="text-body mb-8 max-w-3xl">{metaDescription}</p>

            <p id="reinigungsart" className="text-sm font-semibold text-foreground mb-2">
              Leistungen – Detailseiten:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-8">
              {services.map((s) => {
                const Icon = iconFor(s.id)
                return (
                  <Link
                    key={s.id}
                    href={getCategoryServicePath('reinigungsfirma', s)}
                    className="flex flex-col items-center text-center p-3 border-2 rounded-lg transition-all duration-300 bg-card border-border hover:border-blue-500 dark:hover:border-sky-500 hover:bg-blue-50 dark:hover:bg-sky-950/35 hover:shadow-md group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-sky-950/50 group-hover:bg-blue-500 dark:group-hover:bg-sky-600 transition-colors mb-2">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-sky-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{s.label}</span>
                    {s.desc ? <span className="text-xs text-muted-foreground mt-0.5">{s.desc}</span> : null}
                  </Link>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 dark:bg-sky-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 dark:hover:bg-sky-500"
              >
                Direkt zur Offertenanfrage
              </Link>
              <Link
                href="/reinigungsfirma-in-der-naehe"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted/60"
              >
                Reinigung in der Nähe
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50 dark:bg-muted/20 border-t border-border">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="heading-2">Warum Offerten vergleichen?</h2>
            <ul className="mt-6 space-y-3 text-body max-w-2xl">
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Transparente Leistungsbeschreibung – ideal für Abnahme & Übergabe</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>100% unverbindlich – Sie entscheiden, ob und mit wem Sie zusammenarbeiten</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
