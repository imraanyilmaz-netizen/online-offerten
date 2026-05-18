'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import FooterBeliebteStandorte from '@/components/Layout/FooterBeliebteStandorte'
import FooterCTABanner from '@/components/Layout/FooterCTABanner'
import PartnerNavbar from '@/src/components/PartnerPanel/PartnerNavbar'
import { PartnerCountsProvider } from '@/src/components/PartnerPanel/PartnerCountsContext'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import { Loader2 } from 'lucide-react'

const FullPageLoader = () => (
  <div className="flex flex-1 items-center justify-center bg-background" style={{ willChange: 'opacity' }}>
    <Loader2 className="h-12 w-12 animate-spin text-primary" style={{ willChange: 'transform' }} />
  </div>
)

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration sonrası auth'a bağlı shell'e geçilir
    setMounted(true)
  }, [])

  const isPartner =
    user?.user_metadata?.role === 'partner' || user?.app_metadata?.role === 'partner'
  const partnerPanelPrefixes = [
    '/partner/dashboard',
    '/partner/einstellungen',
    '/partner/credit-top-up',
    '/partner/payment-status',
  ]
  const isPartnerPanelPage = partnerPanelPrefixes.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`)
  )
  /** Partner panel URL'leri SSR ve ilk client render'da aynı shell'i alır.
   *  Partner kullanıcının public sayfalardaki özel navbar'ı ise hydration sonrası açılır. */
  const showPartnerShell = isPartnerPanelPage || (mounted && isPartner)
  const formPages = [
    '/kostenlose-offerte-anfordern',
    '/forgot-password'
  ]
  const isFormPage = formPages.includes(pathname || '')
  const hideAll = pathname === '/bewertung-abgeben' || pathname?.startsWith('/anfrage-status')

  /** Partner- und Admin-Panel-Seiten — kein "Beliebte Standorte"-Block */
  const panelPrefixes = [
    ...partnerPanelPrefixes,
    '/admin-dashboard',
  ]
  const isPanelPage = panelPrefixes.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`)
  )
  
  // Seiten, auf denen der FooterCTABanner angezeigt werden soll
  const allowedCTABannerPages = [
    '/',
    '/malerarbeitenkosten',
    '/raeumung-entsorgung',
    '/guenstig-umziehen',
    '/umzugsfirma-vergleichen',
    '/umzugsfirma',
    '/reinigung',
    '/malerfirma',
    // Bewertungen
    '/kunden-bewertungen',
    // Ratgeber
    '/ratgeber',
  ]
  
  // Prefixe für dynamische Seiten (z.B. /ratgeber/slug)
  const allowedCTABannerPrefixes = [
    '/ratgeber/',
    '/umzugsfirma/',
    '/reinigung/',
    '/malerfirma/',
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

  /** Eingeloggte Partner bekommen überall ihre Dashboard-Navbar (inkl.
   *  Mobile-Drawer mit vollständiger Panel-Navigation). Alle anderen Nutzer
   *  (Gäste, Kunden, Admins) sehen die öffentliche Marketing-Navbar. */
  const mainContent = (
    <div className="min-h-screen flex flex-col bg-background" style={{ contain: 'layout style' }}>
      {showPartnerShell ? <PartnerNavbar /> : <Navbar />}
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
          {!isPanelPage && <FooterBeliebteStandorte />}
          {shouldShowCTABanner && <FooterCTABanner />}
          <Footer variant={isPanelPage ? 'minimal' : 'default'} />
        </>
      )}
    </div>
  )

  /** Die PartnerCountsProvider-Wrapperebene stellt Badge-Zählungen für den
   *  Mobile-Drawer bereit (Verfügbar/Angenommen/…). Ohne Session bleibt sie
   *  request-frei, hält die Partner-Shell aber SSR/client-stabil. */
  return showPartnerShell ? (
    <PartnerCountsProvider>{mainContent}</PartnerCountsProvider>
  ) : (
    mainContent
  )
}

export default Layout



