'use client'

import React, { useEffect, Suspense, useState, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { I18nextProvider } from 'react-i18next'
import { HelmetProvider } from 'react-helmet-async'
import i18n from '@/src/i18n'
import ScrollToTop from '@/components/ScrollToTop'
import Layout from '@/components/Layout/Layout'
// logoUrl import kaldÄ±rÄ±ldÄ± - Organization schema'sÄ± sadece ana sayfada
// Removed framer-motion imports - no longer using AnimatePresence/motion.div wrapper
import dynamic from 'next/dynamic'

// Lazy load Google Analytics
const TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"
let ReactGA: any = null
let gaInitialized = false

const initializeGA = async () => {
  if (TRACKING_ID && TRACKING_ID !== "G-XXXXXXXXXX" && !gaInitialized) {
    try {
      const gaModule = await import('react-ga4')
      ReactGA = gaModule.default
      ReactGA.initialize(TRACKING_ID)
      gaInitialized = true
    } catch (error) {
      console.warn('Failed to load Google Analytics:', error)
    }
  }
}

export default function AppClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  // Router cache refresh - REMOVED to prevent blank page issues
  // Next.js App Router handles cache automatically
  // router.refresh() was causing blank pages on client-side navigation


  // Global error handler for 404 and fetch errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Suppress 404 errors for invalid routes (common from bots/scanners)
      if (event.message?.includes('404') || event.message?.includes('Not Found')) {
        // Silently ignore - Next.js will show 404 page
        return
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress 404 fetch errors
      if (event.reason?.message?.includes('404') || event.reason?.status === 404) {
        // Silently ignore - Next.js will show 404 page
        return
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  // Google Analytics
  useEffect(() => {
    initializeGA().then(() => {
      if (ReactGA && TRACKING_ID && TRACKING_ID !== "G-XXXXXXXXXX") {
        ReactGA.send({ 
          hitType: "pageview", 
          page: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
        })
      }
    })
  }, [pathname, searchParams])

  // Canonical URL redirect
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'www.online-offerten.ch') {
      const canonicalUrl = `https://online-offerten.ch${window.location.pathname}${window.location.search}`
      window.location.replace(canonicalUrl)
    }
  }, [pathname])

  // Set document language (client-side only)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'de'
    }
  }, [pathname])

  // Normalize path to lowercase - debounced to prevent navigation loops
  useEffect(() => {
    if (!pathname || isNavigating) return
    
    // Skip normalization for likely 404 pages (short random strings like /sfdsdf)
    // Only normalize known valid routes
    const validShortRoutes = ['/login', '/kontakt', '/agb', '/datenschutz', '/ueber-uns', '/standorte']
    const isLikely404 = pathname.length > 1 && 
      pathname.length < 30 && 
      !pathname.includes('-') && 
      pathname !== '/' &&
      !validShortRoutes.includes(pathname) && // Not a known valid short route
      !pathname.match(/^\/(privatumzug|geschaeftsumzug|reinigung|partner|ratgeber|umzugsfirma)/) // Not a known route prefix
    
    if (isLikely404) {
      return
    }
    
    const normalizedPath = pathname.toLowerCase()
    
    if (pathname !== normalizedPath) {
      setIsNavigating(true)
      const search = searchParams?.toString()
      router.replace(normalizedPath + (search ? `?${search}` : ''))
      // Reset isNavigating after navigation completes
      setTimeout(() => setIsNavigating(false), 100)
    }
  }, [pathname, searchParams, router, isNavigating])

  // Remove lang/lng query params - debounced to prevent navigation loops
  useEffect(() => {
    if (!searchParams || isNavigating) return
    
    // Skip for likely 404 pages (short random strings)
    const validShortRoutes = ['/login', '/kontakt', '/agb', '/datenschutz', '/ueber-uns', '/standorte']
    const isLikely404 = pathname && pathname.length > 1 && 
      pathname.length < 30 && 
      !pathname.includes('-') && 
      pathname !== '/' &&
      !validShortRoutes.includes(pathname) && // Not a known valid short route
      !pathname.match(/^\/(privatumzug|geschaeftsumzug|reinigung|partner|ratgeber|umzugsfirma)/) // Not a known route prefix
    
    if (isLikely404) {
      return
    }
    
    const lang = searchParams.get('lang')
    const lng = searchParams.get('lng')
    
    if (lang || lng) {
      setIsNavigating(true)
      const params = new URLSearchParams(searchParams.toString())
      params.delete('lang')
      params.delete('lng')
      const newUrl = params.toString() 
        ? `${pathname || ''}?${params.toString()}`
        : pathname || ''
      if (newUrl) {
        router.replace(newUrl)
        // Reset isNavigating after navigation completes
        setTimeout(() => setIsNavigating(false), 100)
      } else {
        setIsNavigating(false)
      }
    }
  }, [searchParams, pathname, router, isNavigating])

  // reviewStats ve fetchRating kaldÄ±rÄ±ldÄ± - AggregateRating sadece ana sayfada (app/page.tsx)

  const globalSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      // Organization schema'sÄ± sadece ana sayfada (app/page.tsx) olmalÄ±
      // AppClient'ta Organization schema'sÄ± olmamalÄ± - duplicate schema hatasÄ± Ã¶nlenir
      {
        "@type": "WebSite",
        "@id": "https://online-offerten.ch/#website",
        "url": "https://online-offerten.ch/",
        "name": "Online-Offerten.ch",
        "description": "Vergleichen Sie kostenlose Offerten von geprÃ¼ften Umzugsfirmen und Reinigungsfirmen. Zeit und Geld sparen â€“ schnell, sicher und unverbindlich.",
        // publisher referansÄ± kaldÄ±rÄ±ldÄ± - Organization schema'sÄ± sadece ana sayfada
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://online-offerten.ch/partner-suche?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }), []) // Organization schema'sÄ± sadece ana sayfada - duplicate Ã¶nlenir

  // Inject schema markup (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(globalSchema)
    script.id = 'global-schema'
    
    // Remove existing schema if any
    const existing = document.getElementById('global-schema')
    if (existing) existing.remove()
    
    document.head.appendChild(script)
    
    return () => {
      const scriptToRemove = document.getElementById('global-schema')
      if (scriptToRemove) scriptToRemove.remove()
    }
  }, [globalSchema])

  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          }>
            {/* Removed AnimatePresence and motion.div wrapper to prevent blank page issues */}
            {/* Next.js App Router handles page transitions automatically */}
            {children}
          </Suspense>
        </Layout>
      </I18nextProvider>
    </HelmetProvider>
  )
}
