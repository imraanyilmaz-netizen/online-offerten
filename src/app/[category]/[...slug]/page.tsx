import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  findServiceInCategory,
  generateCategoryCatchAllStaticParams,
  getServiceCategoryBySlug,
  getServicePathSegment,
} from '@/data/categories'
import { locations } from '@/data/locations'
import { getPartnersForCategoryLocation } from '@/lib/partners/forLocation'
import CategoryCityPageClient from '@/components/pages/category/CategoryCityPageClient'
import CategoryServicePageClient from '@/components/pages/category/CategoryServicePageClient'
import { buildCityFaqJsonLd, getCityFaqsForCategory } from '@/lib/cityPageFaqs'
import {
  getServiceCityLandingMetadata,
  getServiceLandingMetadata,
} from '@/lib/serviceLanding/metadata'
import { getPlatformReviewsTableStats } from '@/lib/reviews/platformReviewStats'

const SITE = 'https://online-offerten.ch'

const SERVICE_TITLE: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigungsfirma',
  malerfirma: 'Malerfirma',
}

type Props = { params: Promise<{ category: string; slug: string[] }> }

export function generateStaticParams() {
  return generateCategoryCatchAllStaticParams(locations)
}

export const revalidate = 3600

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category: raw, slug: segments } = await props.params
  const cat = getServiceCategoryBySlug(raw)
  if (!cat) return { title: 'Seite nicht gefunden' }

  const segs = Array.isArray(segments) ? segments.filter(Boolean) : []
  if (segs.length === 0 || segs.length > 2) return { title: 'Seite nicht gefunden' }

  if (segs.length === 1) {
    const only = segs[0]
    const loc = locations.find((l) => l.slug === only)
    if (loc) {
      const st = SERVICE_TITLE[cat.slug] || 'Anbieter'
      const title = `${st} ${loc.name} – Offerten vergleichen`
      const description = `${st} in ${loc.name} (Kanton ${loc.canton}): Geprüfte Anbieter vergleichen, kostenlose Offerten anfordern und bis zu 40% sparen.`
      const canonical = `${SITE}/${cat.slug}/${loc.slug}`
      return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
          title,
          description,
          url: canonical,
          siteName: 'Online-Offerten.ch',
          locale: 'de_CH',
          type: 'website',
        },
        twitter: { card: 'summary_large_image', title, description },
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
      }
    }

    const svcMeta = getServiceLandingMetadata(cat.slug, only)
    if (!svcMeta) return { title: 'Seite nicht gefunden' }

    const { title, description, canonical } = svcMeta
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Online-Offerten.ch',
        locale: 'de_CH',
        type: 'website',
      },
      twitter: { card: 'summary_large_image', title, description },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  }

  const [serviceSeg, citySeg] = segs
  const loc = locations.find((l) => l.slug === citySeg)
  if (!loc) return { title: 'Seite nicht gefunden' }
  const svcMeta = getServiceCityLandingMetadata(cat.slug, serviceSeg, loc)
  if (!svcMeta) return { title: 'Seite nicht gefunden' }

  const { title, description, canonical } = svcMeta
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Online-Offerten.ch',
      locale: 'de_CH',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function CategoryCatchAllPage(props: Props) {
  const { category: raw, slug: segments } = await props.params
  const cat = getServiceCategoryBySlug(raw)
  if (!cat) notFound()

  const segs = Array.isArray(segments) ? segments.filter(Boolean) : []
  if (segs.length === 0 || segs.length > 2) notFound()

  if (segs.length === 1) {
    const only = segs[0]
    const loc = locations.find((l) => l.slug === only)
    if (loc) {
      const [partners, platformReviewStats] = await Promise.all([
        getPartnersForCategoryLocation(cat.slug, {
          name: loc.name,
          slug: loc.slug,
          canton: loc.canton,
        }),
        getPlatformReviewsTableStats(),
      ])
      const st = SERVICE_TITLE[cat.slug] || 'Anbieter'
      const faqItems = getCityFaqsForCategory(cat.slug, loc.name)
      const faqSchema = buildCityFaqJsonLd(faqItems)

      const itemListSchema =
        partners.length > 0
          ? {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `Geprüfte ${st} in ${loc.name}`,
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

      return (
        <>
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
          />
        </>
      )
    }

    const svc = findServiceInCategory(cat.slug, only)
    if (!svc) notFound()

    const svcMeta = getServiceLandingMetadata(cat.slug, only)
    if (!svcMeta) notFound()

    return (
      <CategoryServicePageClient
        categorySlug={cat.slug}
        serviceId={svc.id}
        pageTitle={svcMeta.title}
        heroTitle={`${svc.label} – Kostenlose Offerten vergleichen`}
        pageDescription={svcMeta.description}
        serviceLabel={svc.label}
        serviceDesc={svc.desc}
      />
    )
  }

  const [serviceSeg, citySeg] = segs
  const loc = locations.find((l) => l.slug === citySeg)
  const svc = findServiceInCategory(cat.slug, serviceSeg)
  if (!loc || !svc) notFound()

  const svcMeta = getServiceCityLandingMetadata(cat.slug, serviceSeg, loc)
  if (!svcMeta) notFound()

  const [partners, platformReviewStats] = await Promise.all([
    getPartnersForCategoryLocation(cat.slug, {
      name: loc.name,
      slug: loc.slug,
      canton: loc.canton,
    }),
    getPlatformReviewsTableStats(),
  ])
  const st = SERVICE_TITLE[cat.slug] || 'Anbieter'
  const faqItems = getCityFaqsForCategory(cat.slug, loc.name)
  const faqSchema = buildCityFaqJsonLd(faqItems)
  const pathSeg = getServicePathSegment(svc)

  const itemListSchema =
    partners.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Geprüfte Anbieter: ${svc.label} in ${loc.name}`,
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

  return (
    <>
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
      />
    </>
  )
}
