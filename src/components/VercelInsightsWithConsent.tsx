'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { useCookieConsent } from '@/src/hooks/useCookieConsent'

/** Vercel Speed Insights nur bei Analytics-Einwilligung */
export default function VercelInsightsWithConsent() {
  const { ready, analyticsAllowed } = useCookieConsent()
  if (!ready || !analyticsAllowed) return null
  return <SpeedInsights />
}
