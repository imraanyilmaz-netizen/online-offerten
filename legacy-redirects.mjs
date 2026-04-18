/**
 * Permanent legacy URL redirects (Next.js `redirects()`).
 * Paths are site-relative (no hostname); they apply on online-offerten.ch and preview hosts.
 *
 * For auth/session routing, see `src/proxy.ts` (middleware) — that file is not for SEO URL moves.
 */

import { locations } from './src/data/locations.js'

/** Must stay aligned with hub `slug` values in `src/data/categories.js` (`categoryHubSlugs`). */
const CATEGORY_HUB_SLUGS = ['umzugsfirma', 'reinigungsfirma', 'malerfirma']

/**
 * Legacy single-segment URLs: `/{hub}-{locationSlug}` (e.g. `/umzugsfirma-st-gallen`)
 * → current city hub: `/{hub}/{locationSlug}`.
 */
const legacyHyphenHubCityRedirects = CATEGORY_HUB_SLUGS.flatMap((hub) =>
  locations.map((loc) => ({
    source: `/${hub}-${loc.slug}`,
    destination: `/${hub}/${loc.slug}`,
    permanent: true,
  })),
)

/** @satisfies {import('next').Redirect[]} */
export const legacyRedirects = [
  // Example 1: old top-level service URL → category under /umzugsfirma
  {
    source: '/privatumzug',
    destination: '/umzugsfirma/privatumzug',
    permanent: true,
  },
  {
    source: '/malerarbeiten',
    destination: '/malerfirma/maler_service',
    permanent: true,
  },
  {
    source: '/reinigung/hausreinigung',
    destination: '/reinigungsfirma/hausreinigung',
    permanent: true,
  },
  {
    source: '/reinigung/hausreinigung/:path*',
    destination: '/reinigungsfirma/hausreinigung/:path*',
    permanent: true,
  },
  {
    source: '/reinigung/grundreinigung',
    destination: '/reinigungsfirma/grundreinigung',
    permanent: true,
  },
  {
    source: '/reinigung/grundreinigung/:path*',
    destination: '/reinigungsfirma/grundreinigung/:path*',
    permanent: true,
  },
  {
    source: '/reinigung/fensterreinigung',
    destination: '/reinigungsfirma/fensterreinigung',
    permanent: true,
  },
  {
    source: '/reinigung/fensterreinigung/:path*',
    destination: '/reinigungsfirma/fensterreinigung/:path*',
    permanent: true,
  },
  {
    source: '/umzugsfirma/internationale-umzuege',
    destination: '/umzugsfirma/auslandumzug',
    permanent: true,
  },
  {
    source: '/umzugsfirma/internationale-umzuege/:path*',
    destination: '/umzugsfirma/auslandumzug',
    permanent: true,
  },
  {
    source: '/umzugsfirma/spezialtransport',
    destination: '/umzugsfirma/klaviertransport',
    permanent: true,
  },
  {
    source: '/umzugsfirma/spezialtransport/:path*',
    destination: '/umzugsfirma/klaviertransport/:path*',
    permanent: true,
  },
  {
    source: '/umzugsfirma/spezialtransporte/klaviertransport',
    destination: '/umzugsfirma/klaviertransport',
    permanent: true,
  },
  {
    source: '/umzugsfirma/spezialtransporte/klaviertransport/:path*',
    destination: '/umzugsfirma/klaviertransport/:path*',
    permanent: true,
  },
  ...legacyHyphenHubCityRedirects,
]
