'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CookieConsentState } from '@/lib/cookieConsent'
import { getConsent } from '@/lib/cookieConsent'

export function useCookieConsent() {
  const [consent, setConsentState] = useState<CookieConsentState | null>(null)
  const [ready, setReady] = useState(false)

  const refresh = useCallback(() => {
    setConsentState(getConsent())
  }, [])

  useEffect(() => {
    refresh()
    setReady(true)
    const onChange = () => refresh()
    window.addEventListener('cookie-consent-changed', onChange)
    return () => window.removeEventListener('cookie-consent-changed', onChange)
  }, [refresh])

  const analyticsAllowed = consent?.analytics === true

  return { consent, ready, analyticsAllowed, refresh }
}
