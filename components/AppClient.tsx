'use client'

import React, { useEffect, Suspense, useState, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { I18nextProvider } from 'react-i18next'
import { HelmetProvider } from 'react-helmet-async'
import i18n from '@/src/i18n'
import ScrollToTop from '@/components/ScrollToTop'
import Layout from '@/components/Layout/Layout'
import ClientRouteProtection from '@/components/ClientRouteProtection'
import { logoUrl } from '@/assets/logoConstants'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// Lazy load FloatingReviewSummary
const FloatingReviewSummary = dynamic(
  () => import('@/components/HomePageSections/FloatingReviewSummary'),
  { ssr: false }
)

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
  const [reviewStats, setReviewStats] = useState({ 
    totalReviews: 142,
    realReviewCount: 0,
    averageRating: 4.8 
  })

  // Redirect .php files
  useEffect(() => {
    if (pathname?.endsWith('.php')) {
      router.replace('/404')
    }
  }, [pathname, router])

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

  // Normalize path to lowercase
  useEffect(() => {
    if (!pathname) return
    const normalizedPath = pathname.toLowerCase()
    
    if (pathname !== normalizedPath) {
      const search = searchParams?.toString()
      router.replace(normalizedPath + (search ? `?${search}` : ''))
    }
  }, [pathname, searchParams, router])

  // Remove lang/lng query params
  useEffect(() => {
    if (!searchParams) return
    const lang = searchParams.get('lang')
    const lng = searchParams.get('lng')
    
    if (lang || lng) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('lang')
      params.delete('lng')
      const newUrl = params.toString() 
        ? `${pathname || ''}?${params.toString()}`
        : pathname || ''
      if (newUrl) {
        router.replace(newUrl)
      }
    }
  }, [searchParams, pathname, router])

  // Fetch review stats (deferred)
  useEffect(() => {
    const fetchRating = async () => {
      await new Promise(resolve => setTimeout(resolve, 5000))
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data, error } = await supabase.rpc('get_recent_average_rating')
        if (!error && data) {
          const realCount = data.review_count || 0
          setReviewStats({
            totalReviews: realCount + 142,
            realReviewCount: realCount,
            averageRating: data.average_rating || 4.8
          })
        }
      } catch (error) {
        // Silently continue
      }
    }
    fetchRating()
  }, [])

  const globalSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://online-offerten.ch/#organization",
        "name": "Online Offerten",
        "url": "https://online-offerten.ch",
        "logo": logoUrl,
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@online-offerten.ch",
          "areaServed": "CH",
          "availableLanguage": ["de"]
        },
        "sameAs": [
          "https://www.facebook.com/onlineofferten",
          "https://www.instagram.com/onlineofferten"
        ],
        ...(reviewStats.realReviewCount > 0 && reviewStats.averageRating > 0 ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": reviewStats.averageRating.toString(),
            "reviewCount": reviewStats.realReviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1"
          }
        } : {})
      },
      {
        "@type": "WebSite",
        "@id": "https://online-offerten.ch/#website",
        "url": "https://online-offerten.ch/",
        "name": "Online-Offerten.ch",
        "description": "Vergleichen Sie kostenlose Offerten von geprüften Umzugsfirmen und Reinigungsfirmen. Bis zu 40% sparen – schnell, sicher und unverbindlich.",
        "publisher": {
          "@id": "https://online-offerten.ch/#organization"
        },
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
  }), [reviewStats.realReviewCount, reviewStats.averageRating])

  // Inject schema markup (client-side only)
  useEffect(() => {
    if (typeof document === 'undefined') return
    
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

  const shouldShowFloatingReview = 
    !pathname?.startsWith('/admin-dashboard') && 
    pathname !== '/partner-werden' && 
    pathname !== '/kostenlose-offerte-anfordern' &&
    pathname !== '/free-quote-request' &&
    pathname !== '/checklisten' &&
    !pathname?.startsWith('/anfrage-status')

  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <ClientRouteProtection />
        <ScrollToTop />
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Layout>
        {shouldShowFloatingReview && (
          <Suspense fallback={null}>
            <FloatingReviewSummary />
          </Suspense>
        )}
      </I18nextProvider>
    </HelmetProvider>
  )
}
