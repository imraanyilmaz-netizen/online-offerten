'use client'

import { useEffect, useState } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { getCookiePreferences, getGTMConsentConfig, type CookiePreferences } from '@/lib/gtm'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

interface GTMProviderProps {
  children?: React.ReactNode
}

export default function GTMProvider({ children }: GTMProviderProps) {
  const [shouldLoadGTM, setShouldLoadGTM] = useState(false)
  const [consentConfig, setConsentConfig] = useState<ReturnType<typeof getGTMConsentConfig> | null>(null)

  useEffect(() => {
    // Initialize dataLayer before GTM loads
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      
      // Check cookie preferences on client side
      const preferences = getCookiePreferences()
      const config = getGTMConsentConfig(preferences)
      setConsentConfig(config)
      
      // Push initial consent configuration
      window.dataLayer.push({
        'gtm.consent': config
      })
      
      // Only load GTM if analytics or marketing cookies are accepted
      if (preferences.analytics || preferences.marketing) {
        setShouldLoadGTM(true)
      }
    }

    // Listen for cookie consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      const prefs: CookiePreferences = event.detail
      const config = getGTMConsentConfig(prefs)
      setConsentConfig(config)
      
      if (prefs.analytics || prefs.marketing) {
        setShouldLoadGTM(true)
        // Update consent in GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'consent_update',
            'gtm.consent': config
          })
        }
      } else {
        // Still update consent even if not loading GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'consent_update',
            'gtm.consent': config
          })
        }
      }
    }

    window.addEventListener('cookie-consent-updated', handleConsentUpdate as EventListener)

    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate as EventListener)
    }
  }, [])

  if (!GTM_ID) {
    return <>{children}</>
  }

  return (
    <>
      {shouldLoadGTM && <GoogleTagManager gtmId={GTM_ID} />}
      {children}
    </>
  )
}
