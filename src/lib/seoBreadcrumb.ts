/**
 * BreadcrumbList-Schema (Schema.org) für Kategorie-/Service-/Stadt-Seiten.
 *
 * Zweck:
 *  - Google zeigt Breadcrumbs in den Search Results → höhere CTR
 *  - Verbessert die Informationsarchitektur-Signale
 *
 * Wird als eigenständiges JSON-LD-Snippet gerendert (kein DOM-Rewrite).
 */

const SITE = 'https://online-offerten.ch'

const CATEGORY_LABEL: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigungsfirma',
  malerfirma: 'Malerfirma',
}

type CrumbItem = { name: string; url: string }

function toJsonLd(items: CrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

/** Home → Category → City */
export function buildCityBreadcrumbJsonLd(
  categorySlug: string,
  locationSlug: string,
  locationName: string
) {
  const catLabel = CATEGORY_LABEL[categorySlug] || 'Anbieter'
  return toJsonLd([
    { name: 'Home', url: `${SITE}/` },
    { name: catLabel, url: `${SITE}/${categorySlug}` },
    { name: locationName, url: `${SITE}/${categorySlug}/${locationSlug}` },
  ])
}

/** Home → Category → Service */
export function buildServiceBreadcrumbJsonLd(
  categorySlug: string,
  servicePathSegment: string,
  serviceLabel: string
) {
  const catLabel = CATEGORY_LABEL[categorySlug] || 'Anbieter'
  return toJsonLd([
    { name: 'Home', url: `${SITE}/` },
    { name: catLabel, url: `${SITE}/${categorySlug}` },
    { name: serviceLabel, url: `${SITE}/${categorySlug}/${servicePathSegment}` },
  ])
}

/** Home → Category → Service → City */
export function buildServiceCityBreadcrumbJsonLd(
  categorySlug: string,
  servicePathSegment: string,
  serviceLabel: string,
  locationSlug: string,
  locationName: string
) {
  const catLabel = CATEGORY_LABEL[categorySlug] || 'Anbieter'
  return toJsonLd([
    { name: 'Home', url: `${SITE}/` },
    { name: catLabel, url: `${SITE}/${categorySlug}` },
    { name: serviceLabel, url: `${SITE}/${categorySlug}/${servicePathSegment}` },
    {
      name: locationName,
      url: `${SITE}/${categorySlug}/${servicePathSegment}/${locationSlug}`,
    },
  ])
}
