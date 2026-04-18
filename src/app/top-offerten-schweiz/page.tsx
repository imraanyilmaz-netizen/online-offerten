import type { Metadata } from 'next'
import { Suspense } from 'react'
import TopOffertenPageClient from '@/components/pages/info/TopOffertenPageClient'

export const metadata: Metadata = {
  title: 'Top Offerten in der Schweiz – Umzugs- und Reinigungsofferten kostenlos vergleichen | Online-Offerten.ch',
  description:
    'Top Offerten in Zürich, Bern, Basel & der ganzen Schweiz: online anfragen, vergleichen & sparen. Umzug, Reinigung & Maler – mehrere Offerten von geprüften Anbietern. Kostenlos auf Online-Offerten.ch.',
  keywords: [
    'Top Offerten Schweiz',
    'Top Offerten Zürich',
    'Offerten online vergleichen',
    'Umzug Offerten anfragen',
    'Reinigung Offerten',
    'Online-Offerten.ch',
  ],
  alternates: {
    canonical: 'https://online-offerten.ch/top-offerten-schweiz',
  },
  openGraph: {
    title: 'Top Offerten in der Schweiz – Umzugs- und Reinigungsofferten kostenlos vergleichen',
    description:
      'Top Offerten in Zürich, Bern & Schweiz: online anfragen und vergleichen. Umzug, Reinigung & Maler – geprüfte Partner. Kostenlos auf Online-Offerten.ch.',
    url: 'https://online-offerten.ch/top-offerten-schweiz',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Top Offerten Schweiz – Umzugs- und Reinigungsofferten vergleichen – Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Offerten in der Schweiz – Umzugs- und Reinigungsofferten kostenlos vergleichen',
    description:
      'Top Offerten Schweiz: online anfragen & vergleichen. Umzug, Reinigung, Maler – mehrere Angebote, eine Plattform.',
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

export default function TopOffertenSchweizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-green-600 dark:border-emerald-500" />
        </div>
      }
    >
      <TopOffertenPageClient />
    </Suspense>
  )
}
