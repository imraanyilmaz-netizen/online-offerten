import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { AuthProvider } from '@/contexts/SupabaseAuthContext'
import { Toaster } from '@/components/ui/toaster'
import AppClient from '@/components/AppClient'
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Umzugsfirma & Reinigungsfirma vergleichen – Gratis Offerten aus Ihrer Region',
    template: '%s | Online-Offerten.ch'
  },
  description: 'Vergleichen Sie kostenlose Offerten von geprüften Umzugsfirmen und Reinigungsfirmen. Bis zu 40% sparen – schnell, sicher und unverbindlich.',
  authors: [{ name: 'Online-Offerten.ch' }],
  creator: 'Online-Offerten.ch',
  publisher: 'Online-Offerten.ch',
  metadataBase: new URL('https://online-offerten.ch'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://online-offerten.ch',
    siteName: 'Online-Offerten.ch',
    title: 'Umzugsfirma & Reinigungsfirma vergleichen – Gratis Offerten',
    description: 'Vergleichen Sie kostenlose Offerten von geprüften Umzugsfirmen und Reinigungsfirmen.',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Online Offerten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma & Reinigungsfirma vergleichen',
    description: 'Vergleichen Sie kostenlose Offerten von geprüften Umzugsfirmen und Reinigungsfirmen.',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#16a34a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ErrorBoundaryWrapper>
            <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
              <AppClient>
                {children}
                <SpeedInsights />
              </AppClient>
            </Suspense>
          </ErrorBoundaryWrapper>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

