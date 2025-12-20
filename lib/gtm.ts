'use client'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent-preferences'

export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') {
    return { necessary: true, analytics: false, marketing: false }
  }
  
  const saved = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (saved) {
    try {
      const prefs = JSON.parse(saved)
      return {
        necessary: true, // Always true
        analytics: prefs.analytics || false,
        marketing: prefs.marketing || false,
      }
    } catch {
      return { necessary: true, analytics: false, marketing: false }
    }
  }
  
  return { necessary: true, analytics: false, marketing: false }
}

export const getGTMConsentConfig = (preferences: CookiePreferences) => {
  return {
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted' as const,
    personalization_storage: preferences.marketing ? 'granted' : 'denied',
    security_storage: 'granted' as const,
  }
}

export const updateGTMConsent = (preferences: CookiePreferences) => {
  if (typeof window === 'undefined' || !window.dataLayer) return

  const consentConfig = getGTMConsentConfig(preferences)
  
  window.dataLayer.push({
    event: 'consent_update',
    'gtm.consent': consentConfig
  })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
  }
}
