'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'

export type PartnerCounts = {
  available: number
  unreadAvailable: number
  purchased: number
  archived: number
  missed: number
}

type PartnerCountsContextValue = {
  counts: PartnerCounts | null
  setCounts: (next: PartnerCounts) => void
}

const PartnerCountsContext = createContext<PartnerCountsContextValue>({
  counts: null,
  setCounts: () => {},
})

/**
 * Zählungen (Verfügbar / Gekauft / Archiviert / Verpasst) werden zentral im
 * Partner-Shell gehalten. PartnerPanel aktualisiert sie bei jedem Dashboard-
 * Refresh; Sidebar liest daraus und zeigt die Zahlen als Badge.
 *
 * Fallback: Landet der Nutzer direkt auf /partner/einstellungen oder
 * /partner/credit-top-up (PartnerPanel ist nicht gemountet), holen wir uns die
 * Zahlen einmal selbst über den existierenden /api/partner/dashboard Endpoint.
 */
export function PartnerCountsProvider({ children }: { children: React.ReactNode }) {
  const { user, session } = useAuth()
  const pathname = usePathname() || ''
  const [counts, setCountsState] = useState<PartnerCounts | null>(null)
  const didFallbackFetchRef = useRef(false)

  const setCounts = useCallback((next: PartnerCounts) => {
    setCountsState(next)
  }, [])

  useEffect(() => {
    if (!user?.id || !session?.access_token) return
    if (pathname === '/partner/dashboard') return
    if (didFallbackFetchRef.current) return
    didFallbackFetchRef.current = true

    let cancelled = false
    const controller = new AbortController()
    ;(async () => {
      try {
        const res = await fetch('/api/partner/dashboard', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            Accept: 'application/json',
          },
        })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        const available = Array.isArray(data.available_quotes) ? data.available_quotes : []
        const viewedIds = new Set<string>(
          Array.isArray(data.viewed_quote_ids) ? data.viewed_quote_ids : []
        )
        setCountsState({
          available: available.length,
          unreadAvailable: available.filter((q: { id: string }) => !viewedIds.has(q.id)).length,
          purchased: Array.isArray(data.purchased_quotes) ? data.purchased_quotes.length : 0,
          archived: Array.isArray(data.archived_quotes) ? data.archived_quotes.length : 0,
          missed: Array.isArray(data.missed_quotes) ? data.missed_quotes.length : 0,
        })
      } catch {
        /** AbortError oder Netzwerk — Sidebar zeigt einfach keine Badges. */
      }
    })()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [user?.id, session?.access_token, pathname])

  const value = useMemo(() => ({ counts, setCounts }), [counts, setCounts])

  return (
    <PartnerCountsContext.Provider value={value}>{children}</PartnerCountsContext.Provider>
  )
}

export function usePartnerCounts() {
  return useContext(PartnerCountsContext)
}
