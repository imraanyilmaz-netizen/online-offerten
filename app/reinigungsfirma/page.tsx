import type { Metadata } from 'next'
import { Suspense } from 'react'
import ReinigungsfirmaInDerNaehePageClient from '@/components/pages/info/ReinigungsfirmaInDerNaehePageClient'

export const metadata: Metadata = {
  title:
    'Reinigungsfirma Schweiz | Umzugsreinigung, Endreinigung & Reinigungsofferten vergleichen',
  description:
    'Reinigungsfirma in der Nähe finden: Umzugsreinigung, Endreinigung mit Abnahmegarantie, Wohnungsreinigung und Büro. Bis zu 5 kostenlose Reinigungsofferten von geprüften Anbietern – unverbindlich, in der ganzen Schweiz.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungsfirma',
  },
  openGraph: {
    title:
      'Reinigungsfirma Schweiz | Umzugsreinigung, Endreinigung & Reinigungsofferten vergleichen',
    description:
      'Umzugsreinigung und Endreinigung vergleichen: bis zu 5 kostenlose Reinigungsofferten von geprüften Reinigungsfirmen in Ihrer Region.',
    url: 'https://online-offerten.ch/reinigungsfirma',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma-finden.png',
        width: 1200,
        height: 630,
        alt: 'Reinigungsfirma in der Nähe finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Reinigungsfirma Schweiz | Umzugsreinigung, Endreinigung & Reinigungsofferten vergleichen',
    description:
      'Reinigungsfirma finden: Umzugsreinigung, Wohnungsreinigung, Büro – kostenlose Reinigungsofferten vergleichen.',
    images: ['https://online-offerten.ch/image/reinigungsfirma-finden.png'],
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

export default function ReinigungsfirmaInDerNaehePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>}>
      <ReinigungsfirmaInDerNaehePageClient />
    </Suspense>
  )
}


