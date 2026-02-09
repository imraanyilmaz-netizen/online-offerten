import type { Metadata } from 'next'
import { Suspense } from 'react'
import RatgeberPageClient from '@/components/pages/tools/RatgeberPageClient'

export const metadata: Metadata = {
  title: 'Ratgeber & Tipps für Umzug, Reinigung & Maler',
  description: 'Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und Malerarbeiten. Machen Sie Ihren Übergang einfacher mit unserem Ratgeber.',
  alternates: {
    canonical: 'https://online-offerten.ch/ratgeber',
  },
  openGraph: {
    title: 'Ratgeber & Tipps für Umzug, Reinigung & Maler',
    description: 'Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und Malerarbeiten. Machen Sie Ihren Übergang einfacher mit unserem Ratgeber.',
    url: 'https://online-offerten.ch/ratgeber',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Ratgeber & Tipps',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ratgeber & Tipps für Umzug, Reinigung & Maler',
    description: 'Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und Malerarbeiten.',
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

export default function RatgeberPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <RatgeberPageClient />
    </Suspense>
  )
}
