import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import Script from 'next/script'
import './globals.css'
import { AuthProvider } from '@/contexts/SupabaseAuthContext'
import { Toaster } from '@/components/ui/toaster'
import AppClient from '@/components/AppClient'
import ErrorBoundaryWrapper from '@/components/ErrorBoundaryWrapper'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteConfig } from '@/config/site'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: `Offerten vergleichen - Kostenlose Offerten für Umzug & Reinigung | ${siteConfig.name}`,
  description: 'Kostenlose Offerten für Umzug, Reinigung & Renovierung vergleichen. Bis zu 40% sparen mit geprüften Firmen aus Ihrer Region. Unverbindlich & transparent.',
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Offerten vergleichen - Kostenlose Offerten für Umzug & Reinigung',
    description: 'Bis zu 40% sparen mit geprüften Firmen aus Ihrer Region',
    images: [
      {
        url: siteConfig.ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Offerten vergleichen - Kostenlose Offerten für Umzug & Reinigung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offerten vergleichen - Kostenlose Offerten',
    description: 'Bis zu 40% sparen mit geprüften Firmen',
    images: [siteConfig.ogImageUrl],
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
const siteDomain = siteConfig.domain
const wwwSiteDomain = `www.${siteDomain}`

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
        {/* Google Tag Manager — nur in Production */}
        {isProduction && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){
              if(w.location.hostname!=='${siteDomain}'&&w.location.hostname!=='${wwwSiteDomain}')return;
              w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PNCCCGC5');`,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) — nur in Production */}
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PNCCCGC5"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
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



