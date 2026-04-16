import { Suspense } from 'react'
import KundenBewertungenPageClient from '@/components/pages/KundenBewertungenPageClient'
import { getMergedKundenBewertungenPage } from '@/lib/reviews/kundenBewertungenMerge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kundenbewertungen – Echte Erfahrungen unserer Kunden | Online-Offerten.ch',
  description: 'Lesen Sie echte, verifizierte Kundenbewertungen und Erfahrungen mit Umzugs-, Reinigungs- und Malerfirmen in der Schweiz. Transparent und unabhängig.',
  alternates: {
    canonical: 'https://online-offerten.ch/kunden-bewertungen',
  },
  openGraph: {
    title: 'Kundenbewertungen – Echte Erfahrungen unserer Kunden | Online-Offerten.ch',
    description: 'Verifizierte Kundenbewertungen für Umzugs-, Reinigungs- und Malerfirmen in der Schweiz.',
    url: 'https://online-offerten.ch/kunden-bewertungen',
    siteName: 'Online-Offerten.ch',
    type: 'website',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Kundenbewertungen - Online-Offerten.ch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kundenbewertungen – Echte Erfahrungen unserer Kunden',
    description: 'Verifizierte Kundenbewertungen für Umzugs-, Reinigungs- und Malerfirmen in der Schweiz.',
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

// ISR: Sayfa 5 dakikada bir otomatik yenilenecek
export const revalidate = 300

export default async function KundenBewertungenPage() {
  const { reviews, totalCount } = await getMergedKundenBewertungenPage(0, 10)

  // Schema.org CollectionPage - AggregateRating sadece Organization (ana sayfa) ve LocalBusiness (partner) sayfalarında
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Kundenbewertungen",
    "description": "Echte Kundenbewertungen und Erfahrungen von zufriedenen Kunden",
    "url": "https://online-offerten.ch/kunden-bewertungen",
    "publisher": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50">Loading...</div>}>
        <KundenBewertungenPageClient initialReviews={reviews} initialTotalCount={totalCount} />
      </Suspense>
    </>
  )
}



