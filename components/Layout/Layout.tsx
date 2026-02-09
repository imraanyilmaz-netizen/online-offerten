'use client'

import React, { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import FooterCTABanner from '@/components/Layout/FooterCTABanner'
import { Loader2 } from 'lucide-react'

const FullPageLoader = () => (
  <div className="flex flex-1 items-center justify-center bg-background" style={{ willChange: 'opacity' }}>
    <Loader2 className="h-12 w-12 animate-spin text-primary" style={{ willChange: 'transform' }} />
  </div>
)

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const formPages = [
    '/kostenlose-offerte-anfordern',
    '/forgot-password'
  ]
  const isFormPage = formPages.includes(pathname || '')
  const hideAll = pathname === '/bewertung-abgeben' || pathname?.startsWith('/anfrage-status')
  
  // Seiten, auf denen der FooterCTABanner angezeigt werden soll
  const allowedCTABannerPages = [
    // Hauptseite
    '/',
    // Umzug Services
    '/umzugsfirma/privatumzug',
    '/umzugsfirma/geschaeftsumzug',
    '/umzugsfirma/internationale-umzuege',
    '/umzugsfirma/spezialtransporte',
    '/umzugsfirma/spezialtransporte/klaviertransport',
    // Weitere Services
    '/malerarbeitenkosten',
    '/raeumung-entsorgung',
    // Kosten & Tools
    '/umzugsfirma/umzugskosten',
    '/reinigung/reinigungskosten',
    '/guenstig-umziehen',
    '/umzugsfirma-vergleichen',
    // Reinigungsdienstleistungen
    '/reinigung/wohnungsreinigung',
    '/reinigung/hausreinigung',
    '/reinigung/bueroreinigung',
    '/reinigung/umzugsreinigung',
    '/reinigung/unterhaltsreinigung',
    '/reinigung/grundreinigung',
    '/reinigung/baureinigung',
    '/reinigung/fensterreinigung',
    '/reinigung/bodenreinigung',
    '/reinigung/fassadenreinigung',
    '/reinigung/hofreinigung',
    // Stadtseiten - Umzugsfirma
    '/umzugsfirma-in-der-naehe/zuerich',
    '/umzugsfirma-in-der-naehe/bern',
    '/umzugsfirma-in-der-naehe/basel',
    '/umzugsfirma-in-der-naehe/luzern',
    '/umzugsfirma-in-der-naehe/st-gallen',
    '/umzugsfirma-in-der-naehe/genf',
    '/umzugsfirma-in-der-naehe/lausanne',
    '/umzugsfirma-in-der-naehe/lugano',
    '/umzugsfirma-in-der-naehe/aargau',
    '/umzugsfirma-in-der-naehe/thun',
    '/umzugsfirma-in-der-naehe/biel-bienne',
    // Info-Seiten
    '/umzugsfirma',
    '/reinigung',
    '/malerfirma-in-der-naehe',
    // Bewertungen
    '/kunden-bewertungen',
    // Ratgeber
    '/ratgeber',
  ]
  
  // Prefixe für dynamische Seiten (z.B. /ratgeber/slug)
  const allowedCTABannerPrefixes = [
    '/ratgeber/',
    '/umzugsfirma-in-der-naehe',
  ]
  
  const shouldShowCTABanner = !isFormPage && (
    allowedCTABannerPages.includes(pathname || '') ||
    allowedCTABannerPrefixes.some(prefix => pathname?.startsWith(prefix))
  )

  if (hideAll) {
    return (
      <main className="flex-grow">
        <Suspense fallback={<FullPageLoader />}>
          {children}
        </Suspense>
      </main>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ contain: 'layout style' }}>
      <Navbar />
      <main 
        className="flex-grow flex flex-col"
        style={{ 
          minHeight: 'calc(100vh - 200px)', 
          flex: '1 0 auto'
        }}
      >
        <Suspense fallback={<FullPageLoader />}>
          {children}
        </Suspense>
      </main>
      {!isFormPage && (
        <>
          {shouldShowCTABanner && <FooterCTABanner />}
          <Footer />
        </>
      )}
    </div>
  )
}

export default Layout

