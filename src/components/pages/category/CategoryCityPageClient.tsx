'use client'

import type { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  Check,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription as DialogDescriptionUi,
  DialogTitle as DialogTitleUi,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  cantonMap,
  getFullCantonName,
  getLocationCategorySpotlight,
  locations,
} from '@/data/locations'
import {
  getCategoryServiceCityPath,
  getServicePathSegment,
  serviceCategories,
} from '@/data/categories'
import { quoteHrefForCategoryService } from '@/lib/quoteLinks'
import { cn } from '@/lib/utils'

/** ui/dialog.jsx is JS — narrow props for TSX consumers */
const CityServicesDialogContent = DialogContent as FC<
  PropsWithChildren<{
    className?: string
  }>
>

const DialogTitle = DialogTitleUi as FC<PropsWithChildren<{ className?: string }>>
const DialogDescription = DialogDescriptionUi as FC<
  PropsWithChildren<{ className?: string }>
>
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import PartnerCard from '@/components/PartnerSearch/PartnerCard'
import CategoryCityFaqSection from '@/components/pages/category/CategoryCityFaqSection'
import CategoryCitySpotlight from '@/components/pages/category/CategoryCitySpotlight'
import { getCityFaqsForCategory, getCityPageLocalContent } from '@/lib/cityPageFaqs'
import { getCityHeroImageSrc } from '@/lib/cityHeroImage'
import { getCantonPeerLocations } from '@/lib/cityPagePartnerStats'
import type { PlatformReviewsTableStats } from '@/lib/reviews/platformReviewStats'

export type CategoryCityPartner = {
  id: string
  company_name: string
  slug?: string | null
  address_street?: string | null
  address_city?: string | null
  address_zip?: string | null
  service_regions?: unknown
  average_rating?: number | null
  review_count?: number | null
  logo_url?: string | null
  message?: string | null
  badge_tier?: string | null
  main_categories?: string[]
}

function quoteHref(categorySlug: string, cityName: string) {
  const city = encodeURIComponent(cityName)
  if (categorySlug === 'umzugsfirma') {
    return `/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`
  }
  if (categorySlug === 'reinigungsfirma') {
    return `/kostenlose-offerte-anfordern?service=reinigung&step=2&city=${city}`
  }
  return `/kostenlose-offerte-anfordern?service=maler&step=2&city=${city}`
}

function buildQuoteHref(categorySlug: string, cityName: string, serviceId?: string) {
  if (!serviceId) return quoteHref(categorySlug, cityName)
  const base = quoteHrefForCategoryService(categorySlug, serviceId)
  const city = encodeURIComponent(cityName)
  const glue = base.includes('?') ? '&' : '?'
  return `${base}${glue}city=${city}`
}

/** Ab dieser Anzahl eindeutiger Einträge: keine Kachelliste (wirkt wie „alle Kantone“-Spam). */
const BROAD_SERVICE_REGION_THRESHOLD = 17

type PartnerRegionRow = { key: string; label: string; highlight: boolean }

/**
 * Vereinigt `service_regions` der angezeigten Partner für Transparenz.
 * Bei sehr breiter Abdeckung: Kurzfassung statt langer Code-Liste.
 */
function collectPartnerRegionsForCityPage(
  partners: CategoryCityPartner[],
  pageCanton: string
): { mode: 'broad'; count: number } | { mode: 'list'; items: PartnerRegionRow[] } {
  const set = new Set<string>()
  for (const p of partners) {
    const regs = Array.isArray(p.service_regions) ? p.service_regions : []
    for (const r of regs) {
      const s = String(r).trim()
      if (s.length < 2) continue
      const code = s.toUpperCase()
      const key = code in cantonMap && code.length <= 3 ? code : s
      set.add(key)
    }
  }
  if (set.size === 0) {
    return { mode: 'list', items: [] }
  }
  if (set.size >= BROAD_SERVICE_REGION_THRESHOLD) {
    return { mode: 'broad', count: set.size }
  }
  const keys = [...set].sort((a, b) => {
    if (a === pageCanton) return -1
    if (b === pageCanton) return 1
    return getFullCantonName(a).localeCompare(getFullCantonName(b), 'de-CH')
  })
  return {
    mode: 'list',
    items: keys.map((k) => ({
      key: k,
      label: getFullCantonName(k),
      highlight: k === pageCanton,
    })),
  }
}

const CATEGORY_INTRO: Record<string, string> = {
  umzugsfirma:
    'Vergleichen Sie geprüfte Umzugsfirmen und Zügelunternehmen mit einer Anfrage – kostenlos und unverbindlich.',
  reinigungsfirma:
    'Finden Sie Reinigungsfirmen für Haushalt, Büro oder Endreinigung – Offerten bequem vergleichen.',
  malerfirma:
    'Malerfirmen für Innen- und Aussenarbeiten vergleichen und passende Offerten erhalten.',
}

function heroIntroForPage(
  categorySlug: string,
  isServiceCityPage: boolean,
  serviceLabel?: string
): string {
  if (isServiceCityPage && serviceLabel) {
    if (categorySlug === 'reinigungsfirma') {
      return `Zuverlässige Anbieter für ${serviceLabel} finden und Offerten aus der Region vergleichen – kostenlos und unverbindlich.`
    }
    if (categorySlug === 'malerfirma') {
      return `Offerten für ${serviceLabel} einholen und regionale Malerfirmen transparent vergleichen – unverbindlich und kostenlos.`
    }
    return `Geprüfte Betriebe für ${serviceLabel} vergleichen – eine Anfrage, mehrere Offerten und klare Konditionen vor Ort.`
  }
  return CATEGORY_INTRO[categorySlug] ?? CATEGORY_INTRO.umzugsfirma
}

function categoryAccentGradient(categorySlug: string): string {
  if (categorySlug === 'reinigungsfirma') return 'from-sky-500 to-blue-600'
  if (categorySlug === 'malerfirma') return 'from-violet-500 to-fuchsia-600'
  return 'from-emerald-500 to-teal-600'
}

/** Icon tiles & bullet markers: soft surface per Branche */
function categorySoftSurface(categorySlug: string): string {
  if (categorySlug === 'reinigungsfirma')
    return 'bg-sky-50 text-sky-700 dark:bg-sky-950/45 dark:text-sky-300'
  if (categorySlug === 'malerfirma')
    return 'bg-violet-50 text-violet-700 dark:bg-violet-950/45 dark:text-violet-300'
  return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-300'
}

function partnerNetworkAsideCopy(
  categorySlug: string,
  locationName: string,
  serviceTitle: string
): { kicker: string; title: string; body: string } {
  const city = locationName
  if (categorySlug === 'reinigungsfirma') {
    return {
      kicker: 'Reinigung in Ihrer Region',
      title: `Die besten Unternehmen für Sie in ${city}`,
      body: `Geprüfte Anbieter für Haushalt, Büro und Endreinigung – mit klaren Einsatzgebieten in und um ${city}. Eine Anfrage, mehrere Offerten, unverbindlich.`,
    }
  }
  if (categorySlug === 'malerfirma') {
    return {
      kicker: 'Malerarbeiten vor Ort',
      title: `Die besten Unternehmen für Sie in ${city}`,
      body: `Qualifizierte Malerfirmen für Innen-, Aussen- und Renovationsarbeiten – ausgewählt und transparent, damit Sie in ${city} schnell vergleichen können.`,
    }
  }
  return {
    kicker: 'Umzug & Transport',
    title: `Die besten Unternehmen für Sie in ${city}`,
    body: `Aktive ${serviceTitle} mit nachvollziehbaren Regionen – damit Sie in ${city} und Umgebung stressfrei Offerten einholen und bis zu 40 % sparen können.`,
  }
}

export default function CategoryCityPageClient({
  categorySlug,
  serviceTitle,
  locationSlug,
  locationName,
  canton,
  partners,
  serviceId,
  servicePathSegment,
  serviceLabel,
  platformReviewStats = { count: 0, averageRating: null },
}: {
  categorySlug: string
  serviceTitle: string
  locationSlug: string
  locationName: string
  canton: string
  partners: CategoryCityPartner[]
  /** gesetzt bei Route `/{category}/{service}/{city}` */
  serviceId?: string
  servicePathSegment?: string
  serviceLabel?: string
  /** Aggregat aus `reviews`-Tabelle (Plattform), nicht Partner-Profilfelder */
  platformReviewStats?: PlatformReviewsTableStats
}) {
  const isServiceCityPage = Boolean(servicePathSegment && serviceLabel && serviceId)
  const intro = heroIntroForPage(categorySlug, isServiceCityPage, serviceLabel)
  const heroSrc = getCityHeroImageSrc(categorySlug, locationSlug)
  const heroAlt = isServiceCityPage
    ? `${serviceLabel} in ${locationName} (Kanton ${canton}) – ${serviceTitle}`
    : `${serviceTitle} in ${locationName} (Kanton ${canton}) – Offerten vergleichen`
  const localContent = getCityPageLocalContent(categorySlug, locationName, canton)
  const faqItems = getCityFaqsForCategory(categorySlug, locationName)
  const partnerRegions = collectPartnerRegionsForCityPage(partners, canton)
  const navTitle =
    categorySlug === 'umzugsfirma'
      ? 'Weitere Umzugsstandorte in der Schweiz'
      : categorySlug === 'reinigungsfirma'
        ? 'Weitere Reinigungs-Standorte in der Schweiz'
        : 'Weitere Maler-Standorte in der Schweiz'

  const primaryQuoteHref = buildQuoteHref(categorySlug, locationName, serviceId)

  const categoryDef = serviceCategories.find((c) => c.slug === categorySlug)
  const categoryServices = categoryDef?.services ?? []

  const listedPartnerCount = partners.length
  const cantonNameFull = getFullCantonName(canton)
  const cantonPeers = getCantonPeerLocations(locations, canton, locationSlug, 10)
  const hasPlatformReviews =
    platformReviewStats.count > 0 && platformReviewStats.averageRating != null
  const ratingDisplay = hasPlatformReviews
    ? new Intl.NumberFormat('de-CH', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(platformReviewStats.averageRating!)
    : null
  const platformReviewCount = hasPlatformReviews ? platformReviewStats.count : 0

  const servicesDialogTriggerLabel = isServiceCityPage
    ? `Andere Leistung in ${locationName}`
    : `Leistungen in ${locationName} (${serviceTitle})`

  const accentGrad = categoryAccentGradient(categorySlug)
  const partnerAside = partnerNetworkAsideCopy(categorySlug, locationName, serviceTitle)
  const locationSpotlight = getLocationCategorySpotlight(locationSlug, categorySlug)

  return (
    <div className="bg-gradient-to-b from-neutral-50 via-white to-slate-50/90 dark:from-background dark:via-background dark:to-muted/25">
      <section
        className="relative isolate min-h-[min(92svh,720px)] overflow-hidden border-b border-slate-200/80 bg-slate-100 dark:border-border dark:bg-muted lg:min-h-[560px]"
        aria-label="Einleitung"
      >
        <div className="absolute inset-0">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            className="object-cover object-[65%_center] sm:object-[72%_center] lg:object-[78%_center]"
            sizes="(max-width: 1024px) 100vw, 100vw"
            quality={80}
          />
        </div>
        {/* Left: readable panel — gradient to transparent toward the photo */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white from-0% via-white/97 via-[22%] via-white/80 via-[40%] to-transparent to-[72%] sm:via-white/92 sm:via-[26%] sm:via-white/65 sm:via-[44%] sm:to-[68%] lg:via-white/95 lg:via-[30%] lg:via-white/45 lg:via-[48%] lg:to-[62%] dark:from-background dark:via-background/96 dark:via-[22%] dark:via-background/78 dark:via-[40%] dark:to-transparent dark:to-[72%] dark:sm:via-background/90 dark:sm:via-[26%] dark:sm:via-background/55 dark:sm:via-[44%] dark:sm:to-[68%] dark:lg:via-background/92 dark:lg:via-[30%] dark:lg:via-background/40 dark:lg:via-[48%] dark:lg:to-[62%]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/30 dark:from-slate-950/45 dark:to-background/35 lg:hidden"
          aria-hidden
        />
        {/* Trust-style badge on photo */}
        <div className="pointer-events-none absolute right-3 top-20 z-20 max-w-[12rem] select-none sm:right-5 sm:top-24 sm:max-w-[13.25rem] md:right-8 md:top-28 lg:right-10 lg:top-[7.5rem] xl:right-14">
          <div
            className={cn(
              'rounded-2xl border bg-white/93 px-3.5 py-3 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.28)] backdrop-blur-md',
              'ring-1 ring-slate-900/[0.07] dark:bg-card/92 dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] dark:ring-white/10',
              categorySlug === 'reinigungsfirma' && 'border-sky-200/85 dark:border-sky-800/60',
              categorySlug === 'malerfirma' && 'border-violet-200/85 dark:border-violet-800/60',
              (categorySlug === 'umzugsfirma' ||
                !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                'border-emerald-200/85 dark:border-emerald-800/60'
            )}
          >
            <div className="flex items-center gap-0.5 text-amber-400" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-2 text-[0.8125rem] font-bold leading-snug tracking-tight text-slate-900 dark:text-foreground">
              {serviceTitle} {locationName}
            </p>
            <p
              className={cn(
                'mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]',
                categorySlug === 'reinigungsfirma' && 'text-sky-700 dark:text-sky-400',
                categorySlug === 'malerfirma' && 'text-violet-700 dark:text-violet-400',
                (categorySlug === 'umzugsfirma' ||
                  !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) && 'text-emerald-700 dark:text-emerald-400'
              )}
            >
              Bis zu 40% sparen
            </p>
            <p className="mt-1 text-[0.625rem] font-medium leading-snug text-slate-600 dark:text-foreground/80">
              Geprüfte Anbieter · Kostenlos vergleichen
            </p>
          </div>
        </div>
        <div className="relative z-10 mx-auto flex min-h-[min(92svh,720px)] max-w-navbar flex-col justify-end px-4 pb-12 pt-24 sm:px-6 md:pb-16 md:pt-28 lg:min-h-[560px] lg:justify-center lg:px-8 lg:py-20">
          <div
            className={cn(
              'max-w-xl space-y-6 lg:max-w-[min(42rem,52%)]',
              'rounded-3xl border border-white/70 bg-white/45 p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.14)] backdrop-blur-xl',
              'ring-1 ring-slate-900/[0.06] dark:border-border/80 dark:bg-card/78 dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] dark:ring-white/10 sm:p-8 md:p-10'
            )}
          >
            <div
              className={cn(
                'h-1 w-12 shrink-0 rounded-full bg-gradient-to-r shadow-sm',
                accentGrad
              )}
              aria-hidden
            />
            <nav className="text-xs font-medium tracking-wide text-slate-600 dark:text-foreground/80" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link href="/" className="text-slate-700 transition hover:text-emerald-700 dark:text-foreground/85 dark:hover:text-emerald-400">
                    Startseite
                  </Link>
                </li>
                <li aria-hidden className="text-slate-400 dark:text-foreground/45">
                  /
                </li>
                <li>
                  <Link href={`/${categorySlug}`} className="text-slate-700 transition hover:text-emerald-700 dark:text-foreground/85 dark:hover:text-emerald-400">
                    {serviceTitle}
                  </Link>
                </li>
                {isServiceCityPage ? (
                  <>
                    <li aria-hidden className="text-slate-400 dark:text-foreground/45">
                      /
                    </li>
                    <li>
                      <Link
                        href={`/${categorySlug}/${servicePathSegment}`}
                        className="text-slate-700 transition hover:text-emerald-700 dark:text-foreground/85 dark:hover:text-emerald-400"
                      >
                        {serviceLabel}
                      </Link>
                    </li>
                  </>
                ) : null}
                <li aria-hidden className="text-slate-400 dark:text-foreground/45">
                  /
                </li>
                <li className="font-semibold tracking-normal text-slate-900 dark:text-foreground">{locationName}</li>
              </ol>
            </nav>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700 dark:text-foreground/90">
                {locationName}
                <span className="text-slate-500 dark:text-foreground/55"> · </span>
                <span className="text-slate-800 dark:text-foreground/95">Kanton {canton}</span>
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 dark:text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
                {isServiceCityPage ? `${serviceLabel} ${locationName}` : `${serviceTitle} ${locationName}`}
              </h1>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-700 dark:text-foreground/92 sm:text-lg sm:leading-relaxed">
              {intro}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200/90 backdrop-blur-sm dark:bg-card/90 dark:text-foreground dark:ring-border">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                {locationName}
                <span className="font-normal text-slate-500 dark:text-muted-foreground">·</span>
                <span className="font-medium text-slate-700 dark:text-foreground">
                  {locationName.localeCompare(cantonNameFull, 'de-CH', { sensitivity: 'base' }) === 0
                    ? `Kanton ${canton}`
                    : cantonNameFull}
                </span>
              </span>
              {listedPartnerCount > 0 ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200/90 backdrop-blur-sm dark:bg-card/90 dark:text-foreground dark:ring-border">
                  <Users className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden />
                  {listedPartnerCount} Partner gelistet
                </span>
              ) : null}
              {ratingDisplay ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200/90 backdrop-blur-sm dark:bg-card/90 dark:text-foreground dark:ring-border">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" aria-hidden />
                  Ø {ratingDisplay}
                  {platformReviewCount > 0 ? (
                    <span className="font-normal text-slate-500 dark:text-muted-foreground">
                      ({platformReviewCount}{' '}
                      {platformReviewCount === 1
                        ? 'Plattformbewertung'
                        : 'Plattformbewertungen'}
                      )
                    </span>
                  ) : null}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                asChild
                variant="cta"
                className="group h-12 px-7 text-base font-semibold tracking-tight"
              >
                <Link href={primaryQuoteHref}>
                  Kostenlose Offerten anfordern
                  <ArrowRight
                    className="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-2xl border-slate-200/90 bg-white/85 px-6 text-base font-semibold tracking-tight shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/60 hover:bg-white hover:shadow-md dark:border-border dark:bg-card/90 dark:hover:border-emerald-700/50 dark:hover:bg-card"
                  >
                    {servicesDialogTriggerLabel}
                  </Button>
                </DialogTrigger>
                <CityServicesDialogContent className="max-h-[min(90vh,640px)] w-[calc(100vw-2rem)] max-w-lg gap-0 overflow-hidden border-slate-200 bg-background p-0 dark:border-border sm:w-full">
                  <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-border dark:bg-muted/40 sm:px-6">
                    <DialogTitle className="text-left text-lg font-bold tracking-tight text-slate-900 dark:text-foreground sm:text-xl">
                      Leistungen in {locationName}
                    </DialogTitle>
                    <DialogDescription className="mt-1.5 text-left text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                      Wählen Sie eine Leistung – die Seite wechselt, Sie bleiben in{' '}
                      <span className="font-medium text-slate-800 dark:text-foreground">{locationName}</span> (Kanton{' '}
                      {canton}).
                    </DialogDescription>
                  </div>
                  <div className="max-h-[min(55vh,420px)] overflow-y-auto px-3 py-3 sm:px-4">
                    <ul className="space-y-1.5">
                      {categoryServices.map((s) => {
                        const seg = getServicePathSegment(s)
                        const href = getCategoryServiceCityPath(categorySlug, s, locationSlug)
                        const isCurrent =
                          isServiceCityPage && servicePathSegment != null && seg === servicePathSegment
                        return (
                          <li key={s.id}>
                            {isCurrent ? (
                              <div
                                className={cn(
                                  'flex w-full items-center gap-3 rounded-xl border border-green-500 bg-green-50/80 px-3 py-2.5 text-left',
                                  'ring-1 ring-green-500/25 dark:border-emerald-600 dark:bg-emerald-950/35 dark:ring-emerald-600/30'
                                )}
                              >
                                <span className="flex min-w-0 flex-1 flex-col">
                                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-foreground">
                                    {s.label}
                                    <span className="inline-flex items-center gap-0.5 rounded-full bg-green-200/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-green-900 dark:bg-emerald-900/50 dark:text-emerald-100">
                                      <Check className="h-3 w-3" aria-hidden />
                                      Aktuell
                                    </span>
                                  </span>
                                  {s.desc ? (
                                    <span className="mt-0.5 text-xs text-slate-600 dark:text-muted-foreground">{s.desc}</span>
                                  ) : null}
                                </span>
                              </div>
                            ) : (
                              <DialogClose asChild>
                                <Link
                                  href={href}
                                  className={cn(
                                    'flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left transition',
                                    'hover:border-green-400 hover:bg-green-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
                                    'dark:border-border dark:bg-card dark:hover:border-emerald-700 dark:hover:bg-emerald-950/25 dark:focus-visible:ring-emerald-500'
                                  )}
                                >
                                  <span className="flex min-w-0 flex-1 flex-col">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-foreground">
                                      {s.label}
                                    </span>
                                    {s.desc ? (
                                      <span className="mt-0.5 text-xs text-slate-600 dark:text-muted-foreground">{s.desc}</span>
                                    ) : null}
                                  </span>
                                  <ChevronRight
                                    className="h-4 w-4 shrink-0 text-slate-400 dark:text-muted-foreground"
                                    aria-hidden
                                  />
                                </Link>
                              </DialogClose>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3 dark:border-border dark:bg-muted/30 sm:px-5">
                    {isServiceCityPage && servicePathSegment ? (
                      <DialogClose asChild>
                        <Link
                          href={`/${categorySlug}/${servicePathSegment}`}
                          className="text-center text-sm font-medium text-slate-700 underline-offset-2 hover:text-green-800 hover:underline dark:text-muted-foreground dark:hover:text-emerald-400"
                        >
                          Nur {serviceLabel}: Übersicht Schweiz (ohne Ort)
                        </Link>
                      </DialogClose>
                    ) : null}
                    <DialogClose asChild>
                      <Link
                        href={`/${categorySlug}`}
                        className="text-center text-sm font-medium text-slate-700 underline-offset-2 hover:text-green-800 hover:underline dark:text-muted-foreground dark:hover:text-emerald-400"
                      >
                        Branchen-Übersicht: alle Leistungen ({serviceTitle})
                      </Link>
                    </DialogClose>
                  </div>
                </CityServicesDialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {locationSpotlight ? (
        <CategoryCitySpotlight categorySlug={categorySlug} data={locationSpotlight} />
      ) : null}

      <section className="relative overflow-hidden border-t border-slate-200/70 bg-gradient-to-b from-slate-50/40 via-white to-slate-50/50 dark:border-border dark:from-muted/20 dark:via-background dark:to-muted/15">
        <div
          className={cn(
            'pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full blur-3xl opacity-[0.35]',
            categorySlug === 'reinigungsfirma' && 'bg-sky-200/80',
            categorySlug === 'malerfirma' && 'bg-violet-200/80',
            (categorySlug === 'umzugsfirma' ||
              !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
              'bg-emerald-200/80'
          )}
          aria-hidden
        />
        <div
          className={cn(
            'pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full blur-3xl opacity-[0.22]',
            categorySlug === 'reinigungsfirma' && 'bg-blue-100/90',
            categorySlug === 'malerfirma' && 'bg-fuchsia-100/80',
            (categorySlug === 'umzugsfirma' ||
              !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
              'bg-teal-100/80'
          )}
          aria-hidden
        />
        <div className="relative mx-auto max-w-navbar px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <div
            className={cn(
              'relative overflow-hidden rounded-[1.75rem] border border-slate-200/85',
              'bg-white/75 shadow-[0_32px_64px_-28px_rgba(15,23,42,0.14),inset_0_1px_0_0_rgba(255,255,255,0.9)]',
              'backdrop-blur-xl ring-1 ring-slate-900/[0.04]',
              'dark:border-border dark:bg-card/80 dark:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.4)] dark:ring-white/10',
              'p-8 sm:p-10 md:p-12 lg:p-14'
            )}
          >
            <div
              className={cn(
                'absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-border/80'
              )}
              aria-hidden
            />
            <div
              className={cn(
                'absolute left-8 top-0 h-1 w-28 rounded-b-full bg-gradient-to-r shadow-sm sm:left-10 md:left-12',
                accentGrad
              )}
              aria-hidden
            />
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              <div
                className={cn(
                  'space-y-8',
                  localContent.bullets.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'
                )}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <span
                    className={cn(
                      'inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.05]',
                      categorySoftSurface(categorySlug)
                    )}
                  >
                    <BookOpen className="h-6 w-6" aria-hidden />
                  </span>
                  <div className="min-w-0 space-y-4 sm:pt-0.5">
                    <p
                      className={cn(
                        'inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]',
                        categorySlug === 'reinigungsfirma' &&
                          'border-sky-200/90 bg-sky-50/80 text-sky-800 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-200',
                        categorySlug === 'malerfirma' &&
                          'border-violet-200/90 bg-violet-50/80 text-violet-900 dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-200',
                        (categorySlug === 'umzugsfirma' ||
                          !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                          'border-emerald-200/90 bg-emerald-50/80 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200'
                      )}
                    >
                      <MapPin className="h-3 w-3 opacity-80" aria-hidden />
                      Vor Ort in {locationName}
                    </p>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-3xl sm:leading-[1.15] md:text-[2rem] md:leading-tight lg:text-[2.125rem]">
                      {localContent.headline}
                    </h2>
                    {listedPartnerCount > 0 ? (
                      <p className="max-w-2xl text-[1.02rem] font-medium leading-relaxed text-slate-800 dark:text-foreground/90 md:text-[1.05rem]">
                        Auf dieser Seite
                        {isServiceCityPage && serviceLabel ? (
                          <>
                            {' '}
                            für{' '}
                            <span className="text-slate-950 dark:text-foreground">{serviceLabel}</span>
                          </>
                        ) : null}
                        :{' '}
                        <span className="text-slate-950 dark:text-foreground">
                          {listedPartnerCount}{' '}
                          {listedPartnerCount === 1
                            ? 'geprüfter Anbieter'
                            : 'geprüfte Anbieter'}
                        </span>
                        {ratingDisplay ? (
                          <>
                            {' '}
                            – plattformweit nach Kundenfeedback rund{' '}
                            <span className="text-slate-950 dark:text-foreground">
                              Ø {ratingDisplay}
                            </span>{' '}
                            Sterne
                            {platformReviewCount > 0 ? (
                              <span className="font-normal text-slate-600 dark:text-muted-foreground">
                                {' '}
                                ({platformReviewCount}{' '}
                                {platformReviewCount === 1
                                  ? 'Plattformbewertung'
                                  : 'Plattformbewertungen'}
                                )
                              </span>
                            ) : null}
                          </>
                        ) : null}
                        .
                      </p>
                    ) : null}
                  </div>
                </div>
                <div
                  className={cn(
                    'space-y-5 border-l-2 border-slate-200/90 pl-5 sm:pl-6 md:space-y-6 dark:border-l-border',
                    categorySlug === 'reinigungsfirma' && 'border-l-sky-200/90 dark:border-l-sky-800/70',
                    categorySlug === 'malerfirma' && 'border-l-violet-200/90 dark:border-l-violet-800/70',
                    (categorySlug === 'umzugsfirma' ||
                      !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                      'border-l-emerald-200/90 dark:border-l-emerald-800/70'
                  )}
                >
                  {localContent.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className={cn(
                        'text-[1.0625rem] leading-[1.72] text-slate-600 dark:text-muted-foreground md:text-[1.0875rem] md:leading-[1.75]',
                        i === 0 && 'font-medium text-slate-700 dark:text-foreground/90'
                      )}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              {localContent.bullets.length > 0 ? (
                <div className="lg:col-span-5">
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-2xl border border-slate-200/80',
                      'bg-gradient-to-b from-slate-50/95 via-white to-white dark:from-muted/40 dark:via-background dark:to-background',
                      'p-6 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/[0.03] dark:border-border dark:ring-white/10 sm:p-7'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full blur-2xl',
                        categorySlug === 'reinigungsfirma' && 'bg-sky-100/70',
                        categorySlug === 'malerfirma' && 'bg-violet-100/70',
                        (categorySlug === 'umzugsfirma' ||
                          !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                          'bg-emerald-100/70'
                      )}
                      aria-hidden
                    />
                    <div className="relative">
                      <div className="mb-5 flex items-center gap-3">
                        <span
                          className={cn(
                            'h-px flex-1 bg-gradient-to-r from-transparent to-slate-200/90 dark:to-border'
                          )}
                          aria-hidden
                        />
                        <p
                          className={cn(
                            'shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.2em]',
                            categorySlug === 'reinigungsfirma' && 'text-sky-800 dark:text-sky-300',
                            categorySlug === 'malerfirma' && 'text-violet-900 dark:text-violet-300',
                            (categorySlug === 'umzugsfirma' ||
                              !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                              'text-emerald-900 dark:text-emerald-300'
                          )}
                        >
                          Auf einen Blick
                        </p>
                        <span
                          className={cn(
                            'h-px flex-1 bg-gradient-to-l from-transparent to-slate-200/90 dark:to-border'
                          )}
                          aria-hidden
                        />
                      </div>
                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {localContent.bullets.map((b, i) => (
                          <li
                            key={i}
                            className={cn(
                              'group flex gap-3.5 rounded-2xl border border-slate-200/75 bg-white/90 p-4',
                              'shadow-[0_2px_8px_-4px_rgba(15,23,42,0.06)] transition-all duration-200',
                              'hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-[0_12px_28px_-12px_rgba(15,23,42,0.14)]',
                              'dark:border-border dark:bg-card/90 dark:hover:border-muted-foreground/30'
                            )}
                          >
                            <span
                              className={cn(
                                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                                'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)] ring-1 ring-black/[0.04]',
                                categorySoftSurface(categorySlug)
                              )}
                            >
                              <CheckCircle2
                                className="h-[1.125rem] w-[1.125rem] transition-transform group-hover:scale-105"
                                aria-hidden
                              />
                            </span>
                            <span className="pt-0.5 text-[0.9375rem] font-medium leading-snug text-slate-800 dark:text-foreground">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {cantonPeers.length > 0 ? (
        <section className="border-t border-slate-200/70 bg-gradient-to-b from-white to-slate-50/90 py-12 dark:border-border dark:from-background dark:to-muted/20 md:py-14">
          <div className="mx-auto max-w-navbar px-4 md:px-6 lg:px-8">
            <div
              className={cn(
                'rounded-[1.5rem] border border-slate-200/85 bg-white/90 p-6 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/90 dark:ring-white/10 sm:p-8 md:p-9'
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="min-w-0 space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-foreground sm:text-2xl">
                    Weitere Orte im Kanton {cantonNameFull}
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-[0.9375rem]">
                    {isServiceCityPage && serviceLabel ? (
                      <>
                        Dieselbe Leistung (
                        <span className="font-medium text-slate-800 dark:text-foreground">{serviceLabel}</span>) in
                        Nachbargemeinden – vergleichen Sie Anbieter und Offerten, ohne den
                        Überblick zu verlieren.
                      </>
                    ) : (
                      <>
                        Vergleichbare {serviceTitle}-Seiten in Ihrer Region: ein Klick, dieselbe
                        Übersicht und Offerten-Logik wie in {locationName}.
                      </>
                    )}
                  </p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cantonPeers.map((peer) => {
                  const href =
                    isServiceCityPage && servicePathSegment
                      ? `/${categorySlug}/${servicePathSegment}/${peer.slug}`
                      : `/${categorySlug}/${peer.slug}`
                  return (
                    <li key={peer.slug}>
                      <Link
                        href={href}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-slate-50/90 px-3.5 py-2 text-sm font-medium text-slate-800',
                          'shadow-sm transition hover:border-slate-300 hover:bg-white hover:text-slate-950 dark:border-border dark:bg-muted/50 dark:text-foreground dark:hover:bg-card dark:hover:text-foreground',
                          categorySlug === 'reinigungsfirma' &&
                            'hover:border-sky-300/80 hover:text-sky-900',
                          categorySlug === 'malerfirma' &&
                            'hover:border-violet-300/80 hover:text-violet-900',
                          (categorySlug === 'umzugsfirma' ||
                            !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                            'hover:border-emerald-300/80 hover:text-emerald-900'
                        )}
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                        {peer.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {partners.length > 0 ? (
        <section className="border-t border-slate-200/60 bg-gradient-to-b from-slate-50/80 to-white py-16 dark:border-border dark:from-muted/25 dark:to-background md:py-20">
          <div className="mx-auto max-w-navbar px-4 md:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_4px_32px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] dark:border-border dark:bg-card dark:ring-white/10">
              <div className="flex flex-col">
                <div className="relative min-h-[min(42svh,380px)] w-full sm:min-h-[340px] lg:min-h-[360px]">
                  <Image
                    src={heroSrc}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    loading="lazy"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-900/75 to-slate-900/35',
                      categorySlug === 'reinigungsfirma' && 'from-sky-950/90 via-slate-900/70',
                      categorySlug === 'malerfirma' && 'from-violet-950/88 via-slate-900/72'
                    )}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" aria-hidden />
                  <div className="relative z-10 flex h-full min-h-[min(42svh,380px)] flex-col justify-end p-8 sm:min-h-[340px] md:p-10 lg:min-h-[360px]">
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/95 ring-1 ring-white/25 backdrop-blur-sm">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                      Geprüftes Netzwerk
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      {partnerAside.kicker}
                    </p>
                    <h2 className="mt-3 max-w-3xl text-balance text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl md:leading-tight">
                      {partnerAside.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm font-normal leading-relaxed !text-white md:text-base md:leading-relaxed">
                      {partnerAside.body}
                    </p>
                    <p className="mt-6 text-xs font-medium text-white/55">
                      Kanton {canton} · {partners.length}{' '}
                      {partners.length === 1 ? 'Partner' : 'Partner'} auf dieser Seite
                    </p>
                  </div>
                </div>
                <div className="flex flex-col bg-gradient-to-b from-white to-slate-50/90 p-6 dark:from-background dark:to-muted/20 sm:p-8 lg:p-8 xl:p-10">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-foreground">Partner in der Region</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-muted-foreground">
                      Direkt vergleichbar – dieselben Kriterien für alle Anbieter.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {partners.map((p) => (
                      <PartnerCard key={p.id} partner={p} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-slate-200/60 bg-white py-16 dark:border-border dark:bg-background md:py-20">
          <div className="mx-auto max-w-navbar px-4 md:px-6 lg:px-8">
            <div className="mx-auto max-w-xl rounded-3xl border border-amber-200/80 bg-gradient-to-b from-amber-50/90 to-white px-8 py-10 text-center shadow-[0_20px_40px_-20px_rgba(180,83,9,0.2)] ring-1 ring-amber-900/5 dark:border-amber-900/40 dark:from-amber-950/30 dark:to-background dark:ring-amber-900/20">
              <p className="text-lg font-medium text-slate-900 dark:text-foreground">
                Aktuell keine passenden Partner in unserem Netzwerk für {locationName}.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed dark:text-muted-foreground">
                Stellen Sie eine kostenlose Anfrage – wir vermitteln passende Firmen in Ihrer Region.
              </p>
              <Button
                asChild
                variant="cta"
                className="group mt-8 h-12 px-8 text-base font-semibold tracking-tight"
              >
                <Link href={primaryQuoteHref}>
                  Kostenlose Offerten anfordern
                  <ArrowRight
                    className="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {partnerRegions.mode === 'broad' ? (
        <section className="border-t border-slate-200/60 bg-slate-50/90 py-14 dark:border-border dark:bg-muted/20 md:py-16">
          <div className="mx-auto max-w-navbar px-4 md:px-6 lg:px-8">
            <div
              className={cn(
                'rounded-3xl border border-slate-200/85 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] md:p-10',
                'ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card dark:ring-white/10'
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <span
                  className={cn(
                    'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/[0.04]',
                    categorySoftSurface(categorySlug)
                  )}
                >
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-3">
                  <h2 className="heading-3 text-balance text-slate-900 dark:text-foreground">Einsatzgebiete</h2>
                  <p className="max-w-3xl text-slate-600 dark:text-muted-foreground md:text-[1.05rem] md:leading-relaxed">
                    In den Profilen der hier gezeigten Partner tauchen zusammen{' '}
                    <span className="font-medium text-slate-800 dark:text-foreground">{partnerRegions.count} Kantone</span>{' '}
                    auf. Das spricht typischerweise für{' '}
                    <span className="font-medium text-slate-800 dark:text-foreground">grosse oder schweizweite</span>{' '}
                    Einsatzgebiete – nicht für eine genaue Ortsliste zu {locationName}. Wo ein
                    Anbieter konkret aktiv ist, entnehmen Sie das jeweilige Profil und die Offerte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : partnerRegions.items.length > 0 ? (
        <section className="border-t border-slate-200/60 bg-slate-50/90 py-14 dark:border-border dark:bg-muted/20 md:py-16">
          <div className="mx-auto max-w-navbar px-4 md:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card dark:ring-white/10 md:p-10">
              <h2 className="heading-3 text-slate-900 dark:text-foreground">Kantone &amp; Einsatzgebiete</h2>
              <p className="mt-2 max-w-3xl text-slate-600 dark:text-muted-foreground md:text-base md:leading-relaxed">
                Unsere Partner pflegen ihre Einsatzgebiete selbst. Für die Anbieter auf dieser Seite
                ergeben sich daraus folgende Kantone –{' '}
                <span className="font-medium text-slate-800 dark:text-foreground">{locationName}</span> liegt im Kanton{' '}
                <span className="font-medium text-slate-800 dark:text-foreground">{getFullCantonName(canton)}</span>
                :
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {partnerRegions.items.map(({ key, label, highlight }) => (
                  <li
                    key={key}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-center text-sm font-medium transition-colors sm:justify-start sm:text-left',
                      highlight
                        ? cn(
                            'border-slate-300 bg-slate-50 shadow-sm ring-2 ring-offset-2 dark:border-muted-foreground/30 dark:bg-muted/50 dark:ring-offset-background',
                            categorySlug === 'reinigungsfirma' && 'ring-sky-500/40 dark:ring-sky-500/50',
                            categorySlug === 'malerfirma' && 'ring-violet-500/40 dark:ring-violet-500/50',
                            (categorySlug === 'umzugsfirma' ||
                              !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                              'ring-emerald-500/40 dark:ring-emerald-500/50'
                          )
                        : 'border-slate-200/80 bg-slate-50/70 text-slate-800 hover:border-slate-300/90 dark:border-border dark:bg-muted/40 dark:text-foreground dark:hover:border-muted-foreground/40'
                    )}
                  >
                    <MapPin
                      className={cn(
                        'hidden h-3.5 w-3.5 shrink-0 sm:inline',
                        highlight ? 'text-slate-700 dark:text-foreground' : 'text-slate-400 dark:text-muted-foreground'
                      )}
                      aria-hidden
                    />
                    <span>{label}</span>
                    {highlight ? (
                      <span className="sr-only"> (Kanton dieser Seite)</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <CategoryCityFaqSection locationName={locationName} items={faqItems} />

      <div className="mx-auto max-w-navbar px-4 pb-16 pt-4 md:px-6 lg:px-8">
        <LocationPageNavigation
          allLocations={locations}
          currentCity={locationName}
          categoryPath={categorySlug}
          title={navTitle}
          prioritizeCanton={canton}
          maxItems={12}
          showAllStandorteLink
        />
      </div>
    </div>
  )
}
