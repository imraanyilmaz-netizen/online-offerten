import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/src/contexts/SupabaseAuthContext'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/src/components/Layout/Footer'
import Navbar from '@/src/components/Layout/Navbar'
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

/** WebSite + SearchAction — server-rendered so crawlers see JSON-LD without running JS */
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://online-offerten.ch/#website',
      url: 'https://online-offerten.ch/',
      name: 'Online-Offerten.ch',
      description:
        'Vergleichen Sie kostenlose Offerten von geprüften Umzugsfirmen und Reinigungsfirmen. Zeit und Geld sparen – schnell, sicher und unverbindlich.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://online-offerten.ch/partner-suche?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* GTM: Einwilligung → components/ConsentGtmLoader.tsx */}
      </head>
      <body className={inter.className}>
        <AuthProvider>
              <Navbar />
                {children}
                <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}



