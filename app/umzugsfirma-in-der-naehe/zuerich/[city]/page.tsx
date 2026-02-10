import type { Metadata } from 'next'
import ZurichCityPageClient from '@/components/pages/locations/cities/ZurichCityPageClient'

const cities = ['winterthur', 'uster', 'dietikon', 'duebendorf', 'schlieren'] as const

export async function generateStaticParams() {
  return cities.map(city => ({ city }))
}

const cityNames: Record<string, string> = {
  winterthur: 'Winterthur',
  uster: 'Uster',
  dietikon: 'Dietikon',
  duebendorf: 'Dübendorf',
  schlieren: 'Schlieren'
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const cityName = cityNames[params.city] || params.city
  const citySlug = params.city
  
  const metaTitles: Record<string, string> = {
    'Winterthur': `Winterthur Umzugsfirma – Geprüfte Anbieter vergleichen`,
    'Uster': `Uster Umzugsfirma – Geprüfte Anbieter vergleichen`,
    'Dietikon': `Dietikon Umzugsfirma – Geprüfte Anbieter vergleichen`,
    'Dübendorf': `Dübendorf Umzugsfirma – Geprüfte Anbieter vergleichen`,
    'Schlieren': `Schlieren Umzugsfirma – Geprüfte Anbieter vergleichen`
  };

  return {
    title: metaTitles[cityName] || `${cityName} Umzugsfirma – Geprüfte Anbieter vergleichen`,
    description: `Umzugsfirma ${cityName} finden ✓ Geprüfte Zügelfirmen und Umzugsunternehmen in ${cityName} vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.`,
    alternates: {
      canonical: `https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich/${citySlug}`,
    },
    openGraph: {
      title: metaTitles[cityName] || `${cityName} Umzugsfirma – Geprüfte Anbieter vergleichen`,
      description: `Geprüfte Zügelfirmen und Umzugsunternehmen in ${cityName} vergleichen & bis zu 40% sparen. Kostenlose Offerten.`,
      url: `https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich/${citySlug}`,
      siteName: 'Online-Offerten.ch',
      images: [
        {
          url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp',
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
      title: metaTitles[cityName] || `${cityName} Umzugsfirma – Geprüfte Anbieter vergleichen`,
      description: `Geprüfte Zügelfirmen in ${cityName} vergleichen & bis zu 40% sparen.`,
      images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp'],
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

export default function ZurichCityPage({ params }: { params: { city: string } }) {
  return <ZurichCityPageClient city={params.city} />
}

