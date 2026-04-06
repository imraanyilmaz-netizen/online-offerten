export const COOKIE_CONSENT_STORAGE_KEY = 'oo-cookie-consent-v1'

export type CookieConsentState = {
  version: 1
  /** Technisch notwendige Cookies (Session, Sicherheit) – immer aktiv */
  necessary: true
  /** Statistik / Marketing (GTM, GA, ggf. Vercel Speed Insights) */
  analytics: boolean
  updatedAt: string
}

export function parseConsent(raw: string | null): CookieConsentState | null {
  if (!raw) return null
  try {
    const v = JSON.parse(raw) as CookieConsentState
    if (v?.version !== 1 || v.necessary !== true || typeof v.analytics !== 'boolean') return null
    return v
  } catch {
    return null
  }
}

export function getConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null
  return parseConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY))
}

export function setConsent(analytics: boolean): CookieConsentState {
  const state: CookieConsentState = {
    version: 1,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: state }))
  }
  return state
}

export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics === true
}
