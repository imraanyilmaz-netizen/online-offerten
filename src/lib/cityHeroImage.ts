/**
 * Hero images for category + city slug. Uses paths already shipped under /fotos and /image.
 * Add entries to UMZUG_CITY_IMAGE (etc.) when you add city-specific assets, e.g. /fotos/cities/carouge.webp
 */

/** Reihenfolge bewusst anders als früher: frischere Standard-Motive zuerst. */
const UMZUG_FALLBACK_POOL = [
  '/fotos/umzugstag.webp',
  '/fotos/offerten.webp',
  '/fotos/umzug-reinigung-maler-offerten.webp',
  '/image/4e73e4b7-ab5b-4e20-9412-394b5b526cf0.webp',
  '/fotos/182259.webp',
  '/image/c6bed9bf-0e88-4eaf-b57f-0938374cdb53.webp',
  '/fotos/5c399fc1.webp',
] as const

/**
 * Privatumzug (umzugsfirma/privatumzug/{city}): dedizierter Pool,
 * der deterministisch gleichmässig über alle Stadt-Seiten verteilt wird.
 *
 * Nur hoch aufgelöste Assets, damit das Hero-Bild nicht „weich"/pixelig
 * wirkt, wenn Next/Image es auf > 1280 px skaliert. Kleine Motive
 * (~40–90 KB) wurden bewusst entfernt.
 */
const PRIVATUMZUG_CITY_POOL = [
  '/image/umzugsservice-Schweiz/umzugsofferten-zuerich-1.png',
  '/image/umzugsservice-Schweiz/umzugsofferten-zuerich-2.png',
  '/image/umzugsservice-Schweiz/umzugsofferten-zuerich-4.png',
  '/image/umzugsservice-Schweiz/umzugshilfe-finden-vergleichen.png',
  '/image/umzugsservice-Schweiz/umzugsfirma-zurich-standort.webp',
  '/image/umzugsservice-Schweiz/umzug-reinigung-maler-gaertner-6-offerten-vergleichen.webp',
  '/image/4e73e4b7-ab5b-4e20-9412-394b5b526cf0.webp',
  '/image/15ea36f2-ae78-403b-9348-4ec683047a94.webp',
  '/image/c6bed9bf-0e88-4eaf-b57f-0938374cdb53.webp',
  '/privatumzug/7946a949.webp',
  '/privatumzug/privatumzug-kunden.avif',
] as const

/** Umzug: known slugs → concrete assets (override hash for important SEO cities). */
const UMZUG_CITY_IMAGE: Record<string, string> = {
  zuerich: '/image/umzugsservice-Schweiz/umzugsofferten-zuerich-1.png',
  carouge: '/fotos/offerten.webp',
  genf: '/fotos/offerten.webp',
  bern: '/fotos/umzugstag.webp',
  basel: '/fotos/umzug-reinigung-maler-offerten.webp',
  lausanne: '/fotos/182259.webp',
}

const REINIGUNG_POOL = [
  '/fotos/offerten.webp',
  '/fotos/umzug-reinigung-maler-offerten.webp',
  '/image/4e73e4b7-ab5b-4e20-9412-394b5b526cf0.webp',
] as const

const MALER_POOL = [
  '/image/malerarbeit.webp',
  '/fotos/offerten.webp',
  '/fotos/umzug-reinigung-maler-offerten.webp',
] as const

function slugChecksum(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) {
    h = (h + slug.charCodeAt(i) * (i + 1)) % 1009
  }
  return h
}

export function getCityHeroImageSrc(
  categorySlug: string,
  locationSlug: string,
  serviceId?: string
): string {
  const slug = locationSlug.toLowerCase()

  if (categorySlug === 'umzugsfirma') {
    if (serviceId === 'privatumzug') {
      const idx = slugChecksum(`hero|privatumzug|${slug}`) % PRIVATUMZUG_CITY_POOL.length
      return PRIVATUMZUG_CITY_POOL[idx]
    }
    const explicit = UMZUG_CITY_IMAGE[slug]
    if (explicit) return explicit
    const idx = slugChecksum(`hero|${slug}|v2`) % UMZUG_FALLBACK_POOL.length
    return UMZUG_FALLBACK_POOL[idx]
  }

  if (categorySlug === 'reinigungsfirma') {
    const idx = slugChecksum(`hero|r:${slug}`) % REINIGUNG_POOL.length
    return REINIGUNG_POOL[idx]
  }

  if (categorySlug === 'malerfirma') {
    const idx = slugChecksum(`hero|m:${slug}`) % MALER_POOL.length
    return MALER_POOL[idx]
  }

  return '/fotos/umzugstag.webp'
}
