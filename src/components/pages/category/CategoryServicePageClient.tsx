'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense, useMemo } from 'react'
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
import { ArrowRight, ChevronRight, Globe2, MapPin, Paintbrush, Sparkles, Trash2, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReinigungServiceHero from '@/components/reinigung/ReinigungServiceHero'
import ServiceStepsSection from '@/components/pages/category/ServiceStepsSection'
import CategoryServiceFaqSection from '@/components/pages/category/CategoryServiceFaqSection'
import { getServiceFaqs } from '@/lib/serviceFaqs'
import { quoteHrefForCategoryService } from '@/lib/quoteLinks'
import {
  findServiceInCategory,
  getCategoryServiceCityPath,
  getCategoryServicePath,
  serviceCategories,
} from '@/data/categories'
import { locations } from '@/data/locations'
import { cn } from '@/lib/utils'
import InternationalCostCalculator from '@/components/international/InternationalCostCalculator'
import InternationalPopularDestinations from '@/components/international/InternationalPopularDestinations'

const AuslandumzugHeroGlobe = dynamic(
  () => import('@/components/international/AuslandumzugHeroGlobe'),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto aspect-square w-full max-w-[min(100%,420px)] lg:max-w-[480px] rounded-full bg-muted/50"
        aria-hidden
      />
    ),
  }
)

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

/** Länder-Landing für `auslandumzug` (siehe `internationalPopularDestinations.js`). */
type AuslandLandingDestination = {
  name: string
  code: string
  slug: string
  flagEmoji?: string
  calculatorHeading?: string
  calculatorIntro?: string
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
    'group flex h-full min-h-[3.25rem] items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800',
    'shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950 hover:shadow-md',
    'dark:border-border dark:bg-card/90 dark:text-foreground dark:hover:bg-card',
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
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {serviceHubCityList.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={getCategoryServiceCityPath(categorySlug, service, loc.slug)}
                  className={linkClass}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{loc.name}</span>
                  {loc.canton ? (
                    <span className="ml-auto shrink-0 text-[0.6875rem] font-medium uppercase tracking-wide text-slate-500 dark:text-muted-foreground">
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
  auslandDestination,
}: {
  categorySlug: string
  serviceId: string
  pageTitle: string
  /** Kurzer H1; Schema nutzt pageTitle. */
  heroTitle: string
  pageDescription: string
  serviceLabel: string
  serviceDesc?: string
  /** Wenn gesetzt: Länder-URL z. B. /umzugsfirma/auslandumzug/deutschland */
  auslandDestination?: AuslandLandingDestination
}) {
  const ctaHref = useMemo(
    () =>
      quoteHrefForCategoryService(
        categorySlug,
        serviceId,
        serviceId === 'auslandumzug' && auslandDestination ? auslandDestination.code : undefined
      ),
    [categorySlug, serviceId, auslandDestination?.code]
  )
  const hubLabel = SERVICE_TITLE[categorySlug] || 'Leistungen'
  const heroImage = useMemo<{ src: string; alt: string } | null>(() => {
    if (categorySlug === 'umzugsfirma' && serviceId === 'privatumzug') {
      return {
        src: '/privatumzug/7946a949.webp',
        alt: `${serviceLabel} – Umzugsfirma in der Schweiz`,
      }
    }
    return null
  }, [categorySlug, serviceId, serviceLabel])
  const siblingServices = useMemo(() => {
    const cat = serviceCategories.find((c) => c.slug === categorySlug)
    if (!cat) return []
    return cat.services.filter((s) => s.id !== serviceId)
  }, [categorySlug, serviceId])

  const faqItems = useMemo(
    () => getServiceFaqs(categorySlug, serviceId, serviceLabel),
    [categorySlug, serviceId, serviceLabel]
  )

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
          <ServiceStepsSection
            categorySlug={categorySlug}
            serviceLabel={serviceLabel}
            ctaHref={ctaHref}
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
          <CategoryServiceFaqSection
            serviceLabel={serviceLabel}
            items={faqItems}
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
                {serviceId === 'auslandumzug' && auslandDestination ? (
                  <>
                    <li>
                      <Link
                        href={`/${categorySlug}/auslandumzug`}
                        className="hover:text-green-700 dark:hover:text-emerald-400"
                      >
                        {serviceLabel}
                      </Link>
                    </li>
                    <li>
                      <ChevronRight className="inline h-4 w-4 text-slate-400 dark:text-foreground/45" aria-hidden />
                    </li>
                    <li className="font-medium text-slate-900 dark:text-foreground">{auslandDestination.name}</li>
                  </>
                ) : (
                  <li className="font-medium text-slate-900 dark:text-foreground">{serviceLabel}</li>
                )}
              </ol>
            </nav>
            {serviceId === 'auslandumzug' ? (
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                <div className="min-w-0">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm dark:border-border dark:bg-card/90 dark:text-foreground">
                    <Globe2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    {auslandDestination ? (
                      <>
                        Zielland: {auslandDestination.name}
                        {auslandDestination.flagEmoji ? (
                          <span className="ml-1" aria-hidden>
                            {auslandDestination.flagEmoji}
                          </span>
                        ) : null}
                      </>
                    ) : (
                      'Umzüge ins oder aus dem Ausland'
                    )}
                  </div>
                  <h1 className="heading-1 !mt-0 max-w-3xl">{heroTitle}</h1>
                  <p className="text-body mt-4 max-w-2xl">{pageDescription}</p>
                  {serviceDesc ? (
                    <p className="mt-3 max-w-2xl text-slate-700 dark:text-foreground/90">{serviceDesc}</p>
                  ) : null}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button
                      asChild
                      variant="cta"
                      className={cn(
                        'group relative isolate h-[3.375rem] min-h-[3.375rem] min-w-[min(100%,17.5rem)] overflow-hidden px-9 text-[0.9375rem] font-semibold leading-none tracking-tight',
                        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-1px_0_0_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.05),0_12px_32px_-10px_rgba(16,185,129,0.48),0_28px_56px_-22px_rgba(6,78,59,0.2)]',
                        'ring-1 ring-emerald-950/[0.08] dark:ring-white/15',
                        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-2xl before:bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.05)_100%)] before:content-['']",
                        "after:pointer-events-none after:absolute after:inset-0 after:z-0 after:rounded-2xl after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] after:content-['']",
                        'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        'hover:-translate-y-1 hover:from-emerald-400 hover:to-emerald-600 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),inset_0_-1px_0_0_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(16,185,129,0.55),0_36px_72px_-28px_rgba(6,78,59,0.26)]',
                        'hover:ring-emerald-950/12 dark:hover:ring-white/25',
                        'active:translate-y-0 active:scale-[0.985] active:duration-150',
                        'focus-visible:ring-2 focus-visible:ring-emerald-400/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-emerald-500/70'
                      )}
                    >
                      <Link href={ctaHref} className="relative z-[1] inline-flex items-center justify-center gap-0">
                        <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]">Kostenlose Offerten anfordern</span>
                        <ArrowRight
                          className="ml-2.5 h-[1.05rem] w-[1.05rem] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                          aria-hidden
                          strokeWidth={2.25}
                        />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className={cn(
                        'h-[3.375rem] rounded-2xl border-slate-300/90 bg-white/90 px-7 text-[0.9375rem] font-semibold tracking-tight shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_4px_14px_-6px_rgba(15,23,42,0.12)] backdrop-blur-sm',
                        'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-white hover:shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_8px_24px_-8px_rgba(15,23,42,0.14)]',
                        'dark:border-border dark:bg-card/85 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-12px_rgba(0,0,0,0.35)] dark:hover:border-emerald-600/45 dark:hover:bg-card'
                      )}
                    >
                      <Link href={`/${categorySlug}`}>Zur Übersicht</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <AuslandumzugHeroGlobe />
                </div>
              </div>
            ) : (
              <div className={cn(
                heroImage ? 'grid items-center gap-10 lg:grid-cols-2 lg:gap-12' : ''
              )}>
                <div className="min-w-0">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm dark:border-border dark:bg-card/90 dark:text-foreground">
                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    Geprüfte Anbieter in der Schweiz
                  </div>
                  <h1 className="heading-1 !mt-0 max-w-3xl">{heroTitle}</h1>
                  <p className="text-body mt-4 max-w-2xl">{pageDescription}</p>
                  {serviceDesc ? (
                    <p className="mt-3 max-w-2xl text-slate-700 dark:text-foreground/90">{serviceDesc}</p>
                  ) : null}
                  <div className="mt-8 max-w-2xl rounded-[1.25rem] border border-slate-200/90 bg-white/75 p-4 shadow-[0_28px_64px_-28px_rgba(15,23,42,0.22)] backdrop-blur-xl ring-1 ring-slate-900/[0.04] dark:border-border dark:bg-card/80 dark:shadow-[0_28px_64px_-28px_rgba(0,0,0,0.45)] dark:ring-white/10 sm:p-5 md:p-6">
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
                </div>
                {heroImage ? (
                  <div className="relative mx-auto hidden w-full max-w-lg lg:mx-0 lg:block lg:max-w-none">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-100 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5 dark:border-border dark:bg-muted dark:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)] dark:ring-white/10">
                      <NextImage
                        src={heroImage.src}
                        alt={heroImage.alt}
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
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </section>
        <ServiceStepsSection
          categorySlug={categorySlug}
          serviceLabel={serviceLabel}
          ctaHref={ctaHref}
        />
        {serviceId === 'auslandumzug' ? (
          <section className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50/90 via-white to-white py-12 dark:border-border dark:from-muted/20 dark:via-background dark:to-background md:py-16">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl md:leading-snug">
                    {auslandDestination?.calculatorHeading
                      ? auslandDestination.calculatorHeading
                      : auslandDestination
                        ? `Offerte für Ihren Umzug in die ${auslandDestination.name}`
                        : 'Offerte für Ihren Auslandsumzug ab der Schweiz'}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {auslandDestination?.calculatorIntro ? (
                      auslandDestination.calculatorIntro
                    ) : auslandDestination ? (
                      <>
                        Der Rechner ist bereits auf <strong className="text-foreground">{auslandDestination.name}</strong>{' '}
                        eingestellt (Abfahrt Schweiz). Ein internationaler Umzug hängt von Zoll, Distanz und Leistung ab –
                        hier erhalten Sie eine erste Orientierung; anschliessend vergleichen Sie unverbindlich Offerten von
                        geprüften Partnern.
                      </>
                    ) : (
                      <>
                        Ein internationaler Umzug ist mehr als Transport: Zoll, Distanz und Leistungsumfang beeinflussen
                        den Preis stark. Nutzen Sie den Rechner für eine erste Orientierung – anschliessend vergleichen Sie
                        unverbindlich Offerten von geprüften Partnern.
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <Suspense
                    fallback={
                      <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-border bg-card p-8">
                        <span className="text-sm text-muted-foreground">Kostenrechner wird geladen…</span>
                      </div>
                    }
                  >
                    <InternationalCostCalculator
                      key={auslandDestination?.slug ?? 'ausland-hub'}
                      initialToCountryCode={auslandDestination?.code ?? null}
                    />
                  </Suspense>
                </div>
              </div>
              <InternationalPopularDestinations activeSlug={auslandDestination?.slug ?? null} />
            </div>
          </section>
        ) : null}
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
          {serviceId !== 'auslandumzug' ? (
            <ServiceHubLocalCitySection
              categorySlug={categorySlug}
              serviceId={serviceId}
              serviceLabel={serviceLabel}
            />
          ) : null}
          <CategoryServiceFaqSection
            serviceLabel={serviceLabel}
            items={faqItems}
          />
      </div>
    </>
  )
}
