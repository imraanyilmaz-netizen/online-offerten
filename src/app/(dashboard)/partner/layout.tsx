'use client'

import { usePathname } from 'next/navigation'
import PartnerShell from '@/src/components/PartnerPanel/PartnerShell'

/**
 * Partner-Bereich Layout.
 *
 * Nur die Partner-eigenen Seiten (Dashboard, Einstellungen, Credit-Top-Up,
 * Payment-Status) bekommen die Sidebar. Die öffentliche Profilseite
 * `/partner/[slug]` bleibt unverändert, weil Kunden dort kein Dashboard-
 * Menü sehen dürfen.
 */
const APP_ROUTES = [
  '/partner/dashboard',
  '/partner/einstellungen',
  '/partner/credit-top-up',
  '/partner/payment-status',
]

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ''
  const isAppRoute = APP_ROUTES.some((p) => pathname === p || pathname.startsWith(`${p}/`))

  if (!isAppRoute) return <>{children}</>

  return <PartnerShell>{children}</PartnerShell>
}
