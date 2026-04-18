import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getHomepageReviewsBundle } from '@/lib/reviews/kundenBewertungenMerge'
import AboutPageClient from '@/components/pages/AboutPageClient'

export const metadata: Metadata = {
  title: 'Über uns – Online-Offerten.ch | Unabhängiges Vergleichsportal für Umzug, Reinigung & Malerarbeiten',
  description: 'Online-Offerten.ch ist ein unabhängiges Schweizer Vergleichsportal. Mit einer Anfrage bis zu 5 Offerten von geprüften Umzugs-, Reinigungs- und Malerfirmen erhalten. 100% kostenlos & unverbindlich.',
  alternates: {
    canonical: 'https://online-offerten.ch/ueber-uns',
  },
  openGraph: {
    title: 'Über Online-Offerten.ch – Ihr unabhängiges Vergleichsportal',
    description: 'Unabhängiges Vergleichsportal für Umzug, Reinigung & Malerarbeiten. Bis zu 5 Offerten von geprüften Firmen vergleichen – 100% kostenlos.',
    url: 'https://online-offerten.ch/ueber-uns',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Online-Offerten.ch – Unabhängiges Vergleichsportal',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über Online-Offerten.ch – Unabhängiges Vergleichsportal',
    description: 'Unabhängiges Vergleichsportal für Umzug, Reinigung & Malerarbeiten. Bis zu 5 Offerten kostenlos vergleichen.',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
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

// ISR: Sayfa 1 saatte bir otomatik yenilenecek
export const revalidate = 3600

async function getReviews() {
  const { carouselReviews } = await getHomepageReviewsBundle(6)
  return { reviews: carouselReviews }
}

export default async function AboutPage() {
  const { reviews } = await getReviews()
  
  // Schema.org structured data for About page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Über Online-Offerten.ch – Unabhängiges Vergleichsportal",
    "description": "Online-Offerten.ch ist ein unabhängiges Schweizer Vergleichsportal für Umzugs-, Reinigungs- und Malerofferten. Mit einer Anfrage bis zu 5 Offerten von geprüften Partnerfirmen erhalten – kostenlos und unverbindlich.",
    "url": "https://online-offerten.ch/ueber-uns",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://online-offerten.ch/#organization",
      "name": "Online Offerten",
      "url": "https://online-offerten.ch",
      "logo": "https://online-offerten.ch/image/logo-icon.webp",
      "description": "Unabhängiges Schweizer Vergleichsportal für Umzugs-, Reinigungs- und Malerofferten. Mit einer Anfrage bis zu 5 kostenlose Offerten von geprüften Partnerfirmen erhalten.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@online-offerten.ch",
        "areaServed": "CH",
        "availableLanguage": ["de"]
      },
      "sameAs": [
        "https://www.facebook.com/onlineofferten",
        "https://www.instagram.com/onlineofferten"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Switzerland",
        "identifier": "CH"
      }
    }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background text-muted-foreground flex items-center justify-center">Loading...</div>}>
        <AboutPageClient initialReviews={reviews} />
      </Suspense>
    </>
  )
}



