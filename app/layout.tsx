import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { AuthProvider } from '@/contexts/SupabaseAuthContext'
import { Toaster } from '@/components/ui/toaster'
import AppClient from '@/components/AppClient'
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper'
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Standard-Metadaten = Startseite; einzelne Routen überschreiben mit eigenem `metadata`.
export const metadata: Metadata = {
  title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
  description:
    'Vergleichen Sie kostenlos regionale Umzugsfirmen, Malerfirmen und Reinigungsfirmen für Ihren Umzug, Ihre Malerarbeiten oder Ihre Reinigung.',
  authors: [{ name: 'Online-Offerten.ch' }],
  creator: 'Online-Offerten.ch',
  publisher: 'Online-Offerten.ch',
  metadataBase: new URL('https://online-offerten.ch'),
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://online-offerten.ch',
    siteName: 'Online-Offerten.ch',
    title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
    description:
      'Vergleichen Sie kostenlos regionale Umzugsfirmen, Malerfirmen und Reinigungsfirmen für Ihren Umzug, Ihre Malerarbeiten oder Ihre Reinigung.',
    /* og:image kommt aus app/opengraph-image.tsx (PNG, Meta/WhatsApp-kompatibel) */
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offerten vergleichen & passende Anbieter in der Schweiz finden',
    description:
      'Vergleichen Sie kostenlos regionale Umzugsfirmen, Malerfirmen und Reinigungsfirmen für Ihren Umzug, Ihre Malerarbeiten oder Ihre Reinigung.',
    /* twitter:image kommt aus app/twitter-image.tsx */
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
}

export const viewport: Viewport = {
  themeColor: '#16a34a',
}

const isProduction = process.env.VERCEL_ENV === 'production'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de-CH" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* GTM: Einwilligung → components/ConsentGtmLoader.tsx */}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ErrorBoundaryWrapper>
            <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
              <AppClient>
                {children}
              </AppClient>
            </Suspense>
          </ErrorBoundaryWrapper>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}



