import { notFound } from 'next/navigation'
import {
  findServiceInCategory,
  getServiceCategoryBySlug,
  getServicePathSegment,
} from '@/data/categories'
import { findPopularDestinationBySlug } from '@/data/internationalPopularDestinations'
import { locations } from '@/data/locations'
import { getPartnersForCategoryLocation } from '@/lib/partners/forLocation'
import CategoryCityPageClient from '@/components/pages/category/CategoryCityPageClient'
import CategoryServicePageClient from '@/components/pages/category/CategoryServicePageClient'
import { buildCityFaqJsonLd, getCityFaqsForCategory } from '@/lib/cityPageFaqs'
import type { CityFaqItem } from '@/lib/cityPageFaqs'
import {
  getServiceCityLandingMetadata,
  getServiceLandingMetadata,
} from '@/lib/serviceLanding/metadata'
import { getPlatformReviewsTableStats } from '@/lib/reviews/platformReviewStats'
import {
  buildCityBreadcrumbJsonLd,
  buildServiceBreadcrumbJsonLd,
  buildServiceCityBreadcrumbJsonLd,
} from '@/lib/seoBreadcrumb'
import {
  buildCityMigrationAnalysis,
  buildStatBasedFaqItems,
  getCityMigrationData,
  type CityMigrationAnalysis,
  type CityMigrationData,
} from '@/lib/stats/migrationStats'

const SITE = 'https://online-offerten.ch'

const SERVICE_TITLE: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigungsfirma',
  malerfirma: 'Malerfirma',
}

type Props = { category: string; segments: string[] }

type UmzugStatsExtras = {
  migrationData: CityMigrationData
  migrationAnalysis: CityMigrationAnalysis
  statFaqs: CityFaqItem[]
}

/**
 * Lädt für Umzugs-Stadtseiten zusätzliche BFS-Statistik-Daten und baut
 * daraus den SEO-Analyse-Block + datengetriebene FAQ-Einträge.
 * Liefert `null`, wenn keine Daten verfügbar sind oder die Kategorie
 * nicht „umzugsfirma" ist — sodass Reinigung/Maler unverändert bleiben.
 */
async function loadUmzugStatsExtras(
  categorySlug: string,
  citySlug: string,
  cityName: string
): Promise<UmzugStatsExtras | null> {
  if (categorySlug !== 'umzugsfirma') return null
  try {
    const data = await getCityMigrationData(citySlug, cityName)
    if (!data) return null
    return {
      migrationData: data,
      migrationAnalysis: buildCityMigrationAnalysis(data, cityName, citySlug),
      statFaqs: buildStatBasedFaqItems(data, cityName),
    }
  } catch (err) {
    console.warn(
      `[categoryCatchAllServerPage] Stats-Extras fehlgeschlagen für ${citySlug}:`,
      err instanceof Error ? err.message : err
    )
    return null
  }
}

export default async function CategoryCatchAllServerPage({
  category: raw,
  segments,
}: Props) {
  const cat = getServiceCategoryBySlug(raw)
  if (!cat) notFound()

  const segs = Array.isArray(segments) ? segments.filter(Boolean) : []
  if (segs.length === 0 || segs.length > 2) notFound()

  if (segs.length === 1) {
    const only = segs[0]
    const loc = locations.find((l) => l.slug === only)
    if (loc) {
      const [partners, platformReviewStats, statsExtras] = await Promise.all([
        getPartnersForCategoryLocation(cat.slug, {
          name: loc.name,
          slug: loc.slug,
          canton: loc.canton,
        }),
        getPlatformReviewsTableStats(),
        loadUmzugStatsExtras(cat.slug, loc.slug, loc.name),
      ])
      const st = SERVICE_TITLE[cat.slug] || 'Anbieter'
      const baseFaqItems = getCityFaqsForCategory(cat.slug, loc.name)
      const faqItems = statsExtras
        ? [...statsExtras.statFaqs, ...baseFaqItems]
        : baseFaqItems
      const faqSchema = buildCityFaqJsonLd(faqItems)

      const itemListSchema =
        partners.length > 0
          ? {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `geprüfte ${st} in ${loc.name}`,
              numberOfItems: partners.length,
              itemListElement: partners.map((partner, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'LocalBusiness',
                  name: partner.company_name,
                  url: `${SITE}/partner/${partner.slug || partner.id}`,
                  ...(partner.logo_url && { image: partner.logo_url }),
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: partner.address_city || loc.name,
                    addressRegion: loc.canton,
                    addressCountry: 'CH',
                  },
                },
              })),
            }
          : null

      const breadcrumbSchema = buildCityBreadcrumbJsonLd(cat.slug, loc.slug, loc.name)

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          {itemListSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
          ) : null}
          {faqSchema ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
          ) : null}
          <CategoryCityPageClient
            categorySlug={cat.slug}
            serviceTitle={st}
            locationSlug={loc.slug}
            locationName={loc.name}
            canton={loc.canton}
            partners={partners}
            platformReviewStats={platformReviewStats}
            faqItems={faqItems}
            migrationAnalysis={statsExtras?.migrationAnalysis ?? null}
            migrationMeta={
              statsExtras
                ? {
                    yearRange: statsExtras.migrationData.yearRange,
                    latestYear: statsExtras.migrationData.latestYear,
                    previousYear: statsExtras.migrationData.totals.previousYear,
                    fallbackUsed: statsExtras.migrationData.fallbackUsed,
                    scopeName: statsExtras.migrationData.scopeName,
                    source: statsExtras.migrationData.source,
                  }
                : null
            }
          />
        </>
      )
    }

    const svc = findServiceInCategory(cat.slug, only)
    if (!svc) notFound()

    const svcMeta = getServiceLandingMetadata(cat.slug, only)
    if (!svcMeta) notFound()

    const svcPathSeg = getServicePathSegment(svc)
    const svcBreadcrumbSchema = buildServiceBreadcrumbJsonLd(
      cat.slug,
      svcPathSeg,
      svc.label
    )

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(svcBreadcrumbSchema) }}
        />
        <CategoryServicePageClient
          categorySlug={cat.slug}
          serviceId={svc.id}
          pageTitle={svcMeta.title}
          heroTitle={`${svc.label} – Kostenlose Offerten vergleichen`}
          pageDescription={svcMeta.description}
          serviceLabel={svc.label}
          serviceDesc={svc.desc}
        />
      </>
    )
  }

  const [serviceSeg, citySeg] = segs
  const svc = findServiceInCategory(cat.slug, serviceSeg)
  if (!svc) notFound()

  if (svc.id === 'auslandumzug') {
    const dest = findPopularDestinationBySlug(citySeg)
    if (dest) {
      return (
        <CategoryServicePageClient
          categorySlug={cat.slug}
          serviceId={svc.id}
          pageTitle={dest.metaTitle}
          heroTitle={dest.heroTitle}
          pageDescription={dest.heroDescription}
          serviceLabel={svc.label}
          auslandDestination={dest}
        />
      )
    }
  }

  const loc = locations.find((l) => l.slug === citySeg)
  if (!loc) notFound()

  const svcMeta = getServiceCityLandingMetadata(cat.slug, serviceSeg, loc)
  if (!svcMeta) notFound()

  const [partners, platformReviewStats, statsExtras] = await Promise.all([
    getPartnersForCategoryLocation(cat.slug, {
      name: loc.name,
      slug: loc.slug,
      canton: loc.canton,
    }),
    getPlatformReviewsTableStats(),
    loadUmzugStatsExtras(cat.slug, loc.slug, loc.name),
  ])
  const st = SERVICE_TITLE[cat.slug] || 'Anbieter'
  const baseFaqItems = getCityFaqsForCategory(cat.slug, loc.name)
  const faqItems = statsExtras
    ? [...statsExtras.statFaqs, ...baseFaqItems]
    : baseFaqItems
  const faqSchema = buildCityFaqJsonLd(faqItems)
  const pathSeg = getServicePathSegment(svc)

  const itemListSchema =
    partners.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `geprüfte Anbieter: ${svc.label} in ${loc.name}`,
          numberOfItems: partners.length,
          itemListElement: partners.map((partner, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'LocalBusiness',
              name: partner.company_name,
              url: `${SITE}/partner/${partner.slug || partner.id}`,
              ...(partner.logo_url && { image: partner.logo_url }),
              address: {
                '@type': 'PostalAddress',
                addressLocality: partner.address_city || loc.name,
                addressRegion: loc.canton,
                addressCountry: 'CH',
              },
            },
          })),
        }
      : null

  const svcCityBreadcrumbSchema = buildServiceCityBreadcrumbJsonLd(
    cat.slug,
    pathSeg,
    svc.label,
    loc.slug,
    loc.name
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(svcCityBreadcrumbSchema) }}
      />
      {itemListSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      ) : null}
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <CategoryCityPageClient
        categorySlug={cat.slug}
        serviceTitle={st}
        locationSlug={loc.slug}
        locationName={loc.name}
        canton={loc.canton}
        partners={partners}
        serviceId={svc.id}
        servicePathSegment={pathSeg}
        serviceLabel={svc.label}
        platformReviewStats={platformReviewStats}
        faqItems={faqItems}
        migrationAnalysis={statsExtras?.migrationAnalysis ?? null}
        migrationMeta={
          statsExtras
            ? {
                yearRange: statsExtras.migrationData.yearRange,
                latestYear: statsExtras.migrationData.latestYear,
                previousYear: statsExtras.migrationData.totals.previousYear,
                fallbackUsed: statsExtras.migrationData.fallbackUsed,
                scopeName: statsExtras.migrationData.scopeName,
                source: statsExtras.migrationData.source,
              }
            : null
        }
      />
    </>
  )
}
