import type { Metadata } from 'next'
import AargauCityPageClient from '@/components/pages/locations/cities/AargauCityPageClient'

const cities = ['aarau', 'baden', 'zofingen', 'brugg', 'wettingen'] as const

export async function generateStaticParams() {
  return cities.map(city => ({ city }))
}

const cityNames: Record<string, string> = {
  aarau: 'Aarau',
  baden: 'Baden',
  zofingen: 'Zofingen',
  brugg: 'Brugg',
  wettingen: 'Wettingen'
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const cityName = cityNames[params.city] || params.city
  const citySlug = params.city
  
  // Stärkere Meta-Titles mit Portal-Intent für alle Städte
  const metaTitles: Record<string, string> = {
    'Baden': `Umzugsfirma Baden vergleichen – Kostenlose Offerten geprüfter Anbieter | Online-Offerten.ch`,
    'Aarau': `Umzugsfirma Aarau vergleichen – Kostenlose Offerten geprüfter Anbieter | Online-Offerten.ch`,
    'Zofingen': `Umzugsfirma Zofingen vergleichen – Kostenlose Offerten geprüfter Anbieter | Online-Offerten.ch`,
    'Brugg': `Umzugsfirma Brugg vergleichen – Kostenlose Offerten geprüfter Anbieter | Online-Offerten.ch`,
    'Wettingen': `Umzugsfirma Wettingen vergleichen – Kostenlose Offerten geprüfter Anbieter | Online-Offerten.ch`
  };

  return {
    title: metaTitles[cityName] || `${cityName} Umzugsfirma – Geprüfte Anbieter vergleichen | Online-Offerten.ch`,
    description: `Umzugsfirma ${cityName} finden ✓ Geprüfte Zügelfirmen und Umzugsunternehmen in ${cityName} vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.`,
    alternates: {
      canonical: `https://online-offerten.ch/umzugsfirma-aargau/${citySlug}`,
    },
    openGraph: {
      title: metaTitles[cityName] ? metaTitles[cityName].replace(' | Online-Offerten.ch', '') : `${cityName} Umzugsfirma – Geprüfte Anbieter vergleichen`,
      description: `Geprüfte Zügelfirmen und Umzugsunternehmen in ${cityName} vergleichen & bis zu 40% sparen. Kostenlose Offerten.`,
      url: `https://online-offerten.ch/umzugsfirma-aargau/${citySlug}`,
      siteName: 'Online-Offerten.ch',
      images: [
        {
          url: 'https://online-offerten.ch/image/services-professionals.png',
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
      title: metaTitles[cityName] ? metaTitles[cityName].replace(' | Online-Offerten.ch', '') : `${cityName} Umzugsfirma – Geprüfte Anbieter vergleichen`,
      description: `Geprüfte Zügelfirmen in ${cityName} vergleichen & bis zu 40% sparen.`,
      images: ['https://online-offerten.ch/image/services-professionals.png'],
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

export default function AargauCityPage({ params }: { params: { city: string } }) {
  return <AargauCityPageClient city={params.city} />
}

