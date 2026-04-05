import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AargauCityPageClient from '@/components/pages/locations/cities/AargauCityPageClient'
import ZurichCityPageClient from '@/components/pages/locations/cities/ZurichCityPageClient'
import { aargauCityData } from '@/data/aargauCityData'
import { zurichCityData } from '@/data/zurichCityData'

const SITE = 'https://online-offerten.ch'

const OG_IMAGE: Record<'aargau' | 'zuerich', string> = {
  aargau: `${SITE}/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp`,
  zuerich: `${SITE}/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp`,
}

type Props = {
  params: Promise<{ region: string; city: string }>
}

function resolveLocation(region: string, city: string) {
  const r = region.toLowerCase()
  const c = city.toLowerCase()
  if (r === 'aargau' && aargauCityData[c]) {
    return { variant: 'aargau' as const, cityKey: c, cityName: aargauCityData[c].name }
  }
  if (r === 'zuerich' && zurichCityData[c]) {
    return { variant: 'zuerich' as const, cityKey: c, cityName: zurichCityData[c].name }
  }
  return null
}

/** Nur Daten-gestützte Standorte; Spezialseiten bleiben als statische Routen unter zuerich/… */
export function generateStaticParams() {
  const aargau = Object.keys(aargauCityData).map((city) => ({ region: 'aargau', city }))
  const zuerich = Object.keys(zurichCityData).map((city) => ({ region: 'zuerich', city }))
  return [...aargau, ...zuerich]
}

export const dynamicParams = false

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const resolved = resolveLocation(params.region, params.city)
  if (!resolved) {
    notFound()
  }
  const { cityName, variant } = resolved
  const path = `/umzugsfirma/${params.region.toLowerCase()}/${params.city.toLowerCase()}`
  const canonical = `${SITE}${path}`
  const title = `${cityName} Umzugsfirma – Geprüfte Anbieter vergleichen`
  const description = `Umzugsfirma ${cityName} finden ✓ Geprüfte Zügelfirmen und Umzugsunternehmen in ${cityName} vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.`
  const ogImage = OG_IMAGE[variant]

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description: `Geprüfte Zügelfirmen und Umzugsunternehmen in ${cityName} vergleichen & bis zu 40% sparen. Kostenlose Offerten.`,
      url: canonical,
      siteName: 'Online-Offerten.ch',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Umzugsfirma ${cityName}`,
        },
      ],
      locale: 'de_CH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Geprüfte Zügelfirmen in ${cityName} vergleichen & bis zu 40% sparen.`,
      images: [ogImage],
    },
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

export default async function UmzugsfirmaStandortPage(props: Props) {
  const params = await props.params;
  const resolved = resolveLocation(params.region, params.city)
  if (!resolved) {
    notFound()
  }
  if (resolved.variant === 'aargau') {
    return <AargauCityPageClient city={resolved.cityKey} />
  }
  return <ZurichCityPageClient city={resolved.cityKey} />
}
