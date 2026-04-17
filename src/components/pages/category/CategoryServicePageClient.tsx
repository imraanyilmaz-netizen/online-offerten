'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import {
  MdApartment,
  MdApps,
  MdAutoFixHigh,
  MdAutorenew,
  MdBusinessCenter,
  MdConstruction,
  MdFormatPaint,
  MdHome,
  MdInventory2,
  MdLocalShipping,
  MdMoving,
  MdPiano,
  MdPublic,
  MdRecycling,
  MdSquareFoot,
  MdVerifiedUser,
  MdWarehouse,
  MdWindow,
  MdYard,
} from 'react-icons/md'
import { ArrowRight, ChevronRight, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReinigungServiceHero from '@/components/reinigung/ReinigungServiceHero'
import { quoteHrefForCategoryService } from '@/lib/quoteLinks'
import {
  findServiceInCategory,
  getCategoryServiceCityPath,
  getCategoryServicePath,
  serviceCategories,
} from '@/data/categories'
import { locations } from '@/data/locations'
import { cn } from '@/lib/utils'

/** Grosse Gemeinden (Reihenfolge ~ Einwohnerzahl); lokale Service-Hub-Seiten verlinken. */
const SERVICE_HUB_LOCAL_CITY_LIMIT = 36
const serviceHubCityList = locations.slice(0, SERVICE_HUB_LOCAL_CITY_LIMIT)

const SERVICE_TITLE: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigungsfirma',
  malerfirma: 'Malerfirma',
}

const REINIGUNG_HERO_BG =
  'https://online-offerten.ch/reinigungsfirma/wohnungsreinigung_hero_header.webp'

/** Passende Icons pro Leistungs-ID (`serviceCategories` reinigungsfirma) */
const REINIGUNG_SERVICE_ICONS: Record<string, IconType> = {
  wohnungsreinigung: MdApartment,
  hausreinigung: MdHome,
  buero_reinigung: MdBusinessCenter,
  umzugsreinigung: MdVerifiedUser,
  unterhaltsreinigung: MdAutorenew,
  grundreinigung: MdAutoFixHigh,
  baureinigung: MdConstruction,
  fensterreinigung: MdWindow,
  bodenreinigung: MdSquareFoot,
  fassadenreinigung: MdFormatPaint,
  hofreinigung: MdYard,
  raeumung_service: MdInventory2,
  entsorgung_service: MdRecycling,
}

function reinigungServiceIcon(serviceId: string): IconType {
  return REINIGUNG_SERVICE_ICONS[serviceId] ?? MdAutoFixHigh
}

/** Passende Icons pro Leistungs-ID (`serviceCategories` umzugsfirma) */
const UMZUG_SERVICE_ICONS: Record<string, IconType> = {
  privatumzug: MdHome,
  geschaeftsumzug: MdBusinessCenter,
  auslandumzug: MdPublic,
  klaviertransport: MdPiano,
  kleintransport: MdLocalShipping,
  lagerung_service: MdWarehouse,
  raeumung_service: MdInventory2,
  entsorgung_service: MdRecycling,
}

function umzugServiceIcon(serviceId: string): IconType {
  return UMZUG_SERVICE_ICONS[serviceId] ?? MdMoving
}

const MALER_SERVICE_ICONS: Record<string, IconType> = {
  maler_service: MdFormatPaint,
}

function malerServiceIcon(serviceId: string): IconType {
  return MALER_SERVICE_ICONS[serviceId] ?? MdFormatPaint
}

function siblingServiceIcon(categorySlug: string, serviceId: string): IconType {
  if (categorySlug === 'umzugsfirma') return umzugServiceIcon(serviceId)
  if (categorySlug === 'malerfirma') return malerServiceIcon(serviceId)
  return MdApps
}

function ServiceHubLocalCitySection({
  categorySlug,
  serviceId,
  serviceLabel,
}: {
  categorySlug: string
  serviceId: string
  serviceLabel: string
}) {
  const service = findServiceInCategory(categorySlug, serviceId)
  if (!service) return null

  const linkClass = cn(
    'inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-slate-50/90 px-3.5 py-2 text-sm font-medium text-slate-800',
    'shadow-sm transition hover:border-slate-300 hover:bg-white hover:text-slate-950 dark:border-border dark:bg-muted/50 dark:text-foreground dark:hover:bg-card',
    categorySlug === 'reinigungsfirma' && 'hover:border-sky-300/80 hover:text-sky-900 dark:hover:border-sky-700/60',
    categorySlug === 'malerfirma' && 'hover:border-violet-300/80 hover:text-violet-900 dark:hover:border-violet-700/60',
    (categorySlug === 'umzugsfirma' || !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
      'hover:border-emerald-300/80 hover:text-emerald-900 dark:hover:border-emerald-700/60'
  )

  const standorteLinkClass = cn(
    'inline-flex shrink-0 items-center gap-1 text-sm font-semibold transition',
    categorySlug === 'reinigungsfirma' && 'text-sky-700 hover:text-sky-800 dark:text-sky-400',
    categorySlug === 'malerfirma' && 'text-violet-700 hover:text-violet-800 dark:text-violet-400',
    (categorySlug === 'umzugsfirma' || !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
      'text-emerald-700 hover:text-emerald-800 dark:text-emerald-400'
  )

  return (
    <section className="border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50/90 py-12 dark:border-border dark:from-background dark:to-muted/15 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={cn(
            'rounded-[1.5rem] border border-slate-200/85 bg-white/90 p-6 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/90 dark:ring-white/10 sm:p-8 md:p-9'
          )}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0 space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-foreground sm:text-2xl">
                Weitere Orte in der Schweiz
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-[0.9375rem]">
                <span className="font-medium text-slate-800 dark:text-foreground">{serviceLabel}</span> regional
                vergleichen – direkt zu den lokalen Seiten mit Offerten-Logik pro Gemeinde.
              </p>
            </div>
            <Link href="/standorte" className={standorteLinkClass}>
              Alle Standorte
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {serviceHubCityList.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={getCategoryServiceCityPath(categorySlug, service, loc.slug)}
                  className={linkClass}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                  {loc.name}
                  {loc.canton ? (
                    <span className="text-xs font-normal text-slate-500 dark:text-muted-foreground">
                      {loc.canton}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function CategoryServicePageClient({
  categorySlug,
  serviceId,
  pageTitle,
  heroTitle,
  pageDescription,
  serviceLabel,
  serviceDesc,
}: {
  categorySlug: string
  serviceId: string
  pageTitle: string
  /** Kurzer H1; Schema nutzt pageTitle. */
  heroTitle: string
  pageDescription: string
  serviceLabel: string
  serviceDesc?: string
}) {
  const ctaHref = quoteHrefForCategoryService(categorySlug, serviceId)
  const hubLabel = SERVICE_TITLE[categorySlug] || 'Leistungen'
  const siblingServices = useMemo(() => {
    const cat = serviceCategories.find((c) => c.slug === categorySlug)
    if (!cat) return []
    return cat.services.filter((s) => s.id !== serviceId)
  }, [categorySlug, serviceId])

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pageTitle,
      description: pageDescription,
      serviceType: serviceLabel,
      provider: {
        '@type': 'Organization',
        name: 'Online-Offerten.ch',
        url: 'https://online-offerten.ch',
      },
      areaServed: { '@type': 'Country', name: 'Switzerland' },
      offers: {
        '@type': 'Offer',
        url: `https://online-offerten.ch${ctaHref}`,
        priceCurrency: 'CHF',
        price: '0',
        name: `Kostenlose Offerte: ${serviceLabel}`,
      },
    }),
    [pageTitle, pageDescription, serviceLabel, ctaHref]
  )

  if (categorySlug === 'reinigungsfirma') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="bg-slate-50 dark:bg-background">
          <ReinigungServiceHero
            breadcrumbCurrent={serviceLabel}
            backgroundImageUrl={REINIGUNG_HERO_BG}
            title={heroTitle}
            intro={
              <>
                {pageDescription}
                {serviceDesc ? (
                  <span className="block mt-3 text-slate-700 dark:text-foreground/90">{serviceDesc}</span>
                ) : null}
              </>
            }
            ctaLabel="Jetzt kostenlose Offerten anfordern"
            ctaHref={ctaHref}
            trustItems={['Bis zu 40% sparen', 'Nur geprüfte Firmen', '100% kostenlos & unverbindlich']}
          />
          <section className="border-t border-slate-200/80 dark:border-border bg-gradient-to-b from-slate-50/90 via-white to-white dark:from-muted/20 dark:via-background dark:to-background py-12 md:py-16">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="mb-8 max-w-2xl md:mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground md:text-[1.75rem] md:leading-snug">
                  Weitere Reinigungsarten
                </h2>
                <p className="mt-2 text-slate-600 dark:text-muted-foreground md:text-[1.05rem] md:leading-relaxed">
                  Schnell zur passenden Leistung – alle Reinigungsfirmen-Vergleiche auf einen Blick.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {siblingServices.map((s) => {
                  const Icon = reinigungServiceIcon(s.id)
                  return (
                    <li key={s.id}>
                      <Link
                        href={getCategoryServicePath('reinigungsfirma', s)}
                        className={cn(
                          'group flex min-h-[4.25rem] items-center gap-4 rounded-2xl border border-slate-200/90 dark:border-border bg-white dark:bg-card p-4 shadow-sm',
                          'transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300/90 dark:hover:border-sky-700/60 hover:bg-sky-50/40 dark:hover:bg-sky-950/30 hover:shadow-md',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                            'bg-gradient-to-br from-sky-100 to-blue-50 text-sky-700',
                            'dark:from-sky-950/50 dark:to-blue-950/35 dark:text-sky-300',
                            'ring-1 ring-sky-200/70 dark:ring-sky-800/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-none',
                            'transition-colors group-hover:from-sky-200/90 group-hover:to-blue-100 dark:group-hover:from-sky-900/60 dark:group-hover:to-blue-950/50'
                          )}
                          aria-hidden
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="min-w-0 flex-1 text-left text-[0.9375rem] font-semibold leading-snug text-slate-900 dark:text-foreground group-hover:text-sky-950 dark:group-hover:text-sky-200">
                          {s.label}
                        </span>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-slate-300 dark:text-muted-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  )
                })}
                <li className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
                  <Link
                    href="/reinigungsfirma"
                    className={cn(
                      'group flex min-h-[4.25rem] items-center gap-4 rounded-2xl border border-sky-300/80 dark:border-sky-700/60 bg-gradient-to-br from-sky-50 via-white to-blue-50/90 dark:from-sky-950/35 dark:via-background dark:to-blue-950/25 p-4 shadow-md',
                      'ring-1 ring-sky-200/50 dark:ring-sky-800/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-lg',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                        'bg-gradient-to-br from-sky-600 to-blue-700 text-white shadow-md',
                        'ring-1 ring-sky-500/30 dark:from-sky-500 dark:to-blue-800'
                      )}
                      aria-hidden
                    >
                      <MdApps className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1 text-left text-[0.9375rem] font-semibold leading-snug text-sky-950 dark:text-foreground">
                      Alle Leistungen
                    </span>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </section>
          <ServiceHubLocalCitySection
            categorySlug="reinigungsfirma"
            serviceId={serviceId}
            serviceLabel={serviceLabel}
          />
        </div>
      </>
    )
  }

  const accent =
    categorySlug === 'umzugsfirma'
      ? 'from-emerald-50 via-white to-teal-50 dark:from-background dark:via-background dark:to-emerald-950/30'
      : 'from-violet-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-violet-950/30'

  const isMalerHub = categorySlug === 'malerfirma'
  const siblingTheme = isMalerHub
    ? {
        cardHover:
          'hover:border-violet-300/90 hover:bg-violet-50/40 hover:shadow-md focus-visible:ring-violet-500 dark:border-border dark:bg-card dark:hover:border-violet-700/60 dark:hover:bg-violet-950/30',
        iconWrap:
          'from-violet-100 to-fuchsia-50 text-violet-800 ring-violet-200/70 group-hover:from-violet-200/90 group-hover:to-fuchsia-100 dark:from-violet-950/45 dark:to-fuchsia-950/30 dark:text-violet-300 dark:ring-violet-800/50',
        labelHover: 'group-hover:text-violet-950 dark:text-foreground dark:group-hover:text-violet-300',
        chevron: 'group-hover:text-violet-600 dark:text-muted-foreground dark:group-hover:text-violet-400',
        ctaBorder:
          'border-violet-300/80 ring-violet-200/50 hover:border-violet-400 dark:border-violet-800/60 dark:ring-violet-900/30 dark:hover:border-violet-600',
        ctaBg:
          'from-violet-50 via-white to-fuchsia-50/90 dark:from-violet-950/25 dark:via-background dark:to-fuchsia-950/20',
        ctaIcon: 'from-violet-600 to-fuchsia-700 ring-violet-500/30',
        ctaLabel: 'text-violet-950 dark:text-foreground',
        ctaChevron: 'text-violet-600 dark:text-violet-400',
        ctaRing: 'focus-visible:ring-violet-500',
      }
    : {
        cardHover:
          'hover:border-emerald-300/90 hover:bg-emerald-50/40 hover:shadow-md focus-visible:ring-emerald-500 dark:border-border dark:bg-card dark:hover:border-emerald-700/60 dark:hover:bg-emerald-950/30',
        iconWrap:
          'from-emerald-100 to-teal-50 text-emerald-800 ring-emerald-200/70 group-hover:from-emerald-200/90 group-hover:to-teal-100 dark:from-emerald-950/45 dark:to-teal-950/30 dark:text-emerald-300 dark:ring-emerald-800/50',
        labelHover: 'group-hover:text-emerald-950 dark:text-foreground dark:group-hover:text-emerald-300',
        chevron: 'group-hover:text-emerald-600 dark:text-muted-foreground dark:group-hover:text-emerald-400',
        ctaBorder:
          'border-emerald-300/80 ring-emerald-200/50 hover:border-emerald-400 dark:border-emerald-800/60 dark:ring-emerald-900/30 dark:hover:border-emerald-600',
        ctaBg:
          'from-emerald-50 via-white to-teal-50/90 dark:from-emerald-950/25 dark:via-background dark:to-teal-950/20',
        ctaIcon: 'from-emerald-600 to-teal-700 ring-emerald-500/30',
        ctaLabel: 'text-emerald-950 dark:text-foreground',
        ctaChevron: 'text-emerald-600 dark:text-emerald-400',
        ctaRing: 'focus-visible:ring-emerald-500',
      }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="bg-white dark:bg-background">
        <section className={`relative py-12 md:py-16 overflow-hidden bg-gradient-to-br ${accent}`}>
          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-foreground/80">
                <li>
                  <Link href="/" className="hover:text-green-700 dark:hover:text-emerald-400">
                    Startseite
                  </Link>
                </li>
                <li>
                  <ChevronRight className="inline h-4 w-4 text-slate-400 dark:text-foreground/45" aria-hidden />
                </li>
                <li>
                  <Link href={`/${categorySlug}`} className="hover:text-green-700 dark:hover:text-emerald-400">
                    {hubLabel}
                  </Link>
                </li>
                <li>
                  <ChevronRight className="inline h-4 w-4 text-slate-400 dark:text-foreground/45" aria-hidden />
                </li>
                <li className="font-medium text-slate-900 dark:text-foreground">{serviceLabel}</li>
              </ol>
            </nav>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm dark:border-border dark:bg-card/90 dark:text-foreground">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
              Geprüfte Anbieter in der Schweiz
            </div>
            <h1 className="heading-1 !mt-0 max-w-3xl">{heroTitle}</h1>
            <p className="text-body mt-4 max-w-2xl">{pageDescription}</p>
            {serviceDesc ? (
              <p className="mt-3 max-w-2xl text-slate-700 dark:text-foreground/90">{serviceDesc}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="cta" className="group h-12 px-7 text-base font-semibold tracking-tight">
                <Link href={ctaHref}>
                  Kostenlose Offerten anfordern
                  <ArrowRight
                    className="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-2xl border-slate-300 bg-white px-6 text-base font-semibold tracking-tight shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-border dark:bg-card dark:hover:border-emerald-700/50 dark:hover:bg-muted/40"
              >
                <Link href={`/${categorySlug}`}>Zur Übersicht</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50/90 via-white to-white py-12 dark:border-border dark:from-muted/20 dark:via-background dark:to-background md:py-16">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="mb-8 max-w-2xl md:mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground md:text-[1.75rem] md:leading-snug">
                  Weitere Leistungen
                </h2>
                <p className="mt-2 text-slate-600 dark:text-muted-foreground md:text-[1.05rem] md:leading-relaxed">
                  {isMalerHub
                    ? 'Zurück zur Übersicht oder zu verwandten Leistungen – alles auf einen Blick.'
                    : 'Weitere Umzugs- und Zügelservices vergleichen – von Geschäftsumzug bis Lagerung.'}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {siblingServices.map((s) => {
                  const Icon = siblingServiceIcon(categorySlug, s.id)
                  return (
                    <li key={s.id}>
                      <Link
                        href={getCategoryServicePath(categorySlug, s)}
                        className={cn(
                          'group flex min-h-[4.25rem] items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm',
                          'transition-all duration-200 hover:-translate-y-0.5',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                          siblingTheme.cardHover
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                            'bg-gradient-to-br ring-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)]',
                            'transition-colors',
                            siblingTheme.iconWrap
                          )}
                          aria-hidden
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <span
                          className={cn(
                            'min-w-0 flex-1 text-left text-[0.9375rem] font-semibold leading-snug text-slate-900',
                            siblingTheme.labelHover
                          )}
                        >
                          {s.label}
                        </span>
                        <ChevronRight
                          className={cn(
                            'h-4 w-4 shrink-0 text-slate-300 transition-colors',
                            siblingTheme.chevron
                          )}
                          aria-hidden
                        />
                      </Link>
                    </li>
                  )
                })}
                <li className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
                  <Link
                    href={`/${categorySlug}`}
                    className={cn(
                      'group flex min-h-[4.25rem] items-center gap-4 rounded-2xl border bg-gradient-to-br p-4 shadow-md',
                      'ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      siblingTheme.ctaBorder,
                      siblingTheme.ctaBg,
                      siblingTheme.ctaRing
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md ring-1',
                        'bg-gradient-to-br',
                        siblingTheme.ctaIcon
                      )}
                      aria-hidden
                    >
                      <MdApps className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        'min-w-0 flex-1 text-left text-[0.9375rem] font-semibold leading-snug',
                        siblingTheme.ctaLabel
                      )}
                    >
                      Alle Leistungen
                    </span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5',
                        siblingTheme.ctaChevron
                      )}
                      aria-hidden
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </section>
          <ServiceHubLocalCitySection
            categorySlug={categorySlug}
            serviceId={serviceId}
            serviceLabel={serviceLabel}
          />
      </div>
    </>
  )
}
