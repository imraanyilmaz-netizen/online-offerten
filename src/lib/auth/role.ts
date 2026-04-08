import type { User } from '@supabase/supabase-js'

/** Supabase: rol genelde user_metadata'da; bazen app_metadata'da. */
export function resolveAuthRole(user: User | null | undefined): string | undefined {
  if (!user) return undefined
  const r = user.user_metadata?.role ?? user.app_metadata?.role
  return typeof r === 'string' && r.length > 0 ? r : undefined
}

/** Giriş sonrası hedef (middleware ile aynı kurallar). */
export function postLoginHrefForRole(role: string | undefined): string {
  if (role === 'admin' || role === 'editor') return '/admin-dashboard'
  if (role === 'partner') return '/partner/dashboard'
  return '/'
}

/** Öffentliche Profilseiten `/partner/[slug]` bleiben offen — nur App-Bereiche schützen. */
const PARTNER_APP_PATHS = [
  '/partner/dashboard',
  '/partner/einstellungen',
  '/partner/credit-top-up',
  '/partner/payment-status',
] as const

export function isPartnerAppProtectedPath(pathname: string): boolean {
  return PARTNER_APP_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function isAdminProtectedPath(pathname: string): boolean {
  return pathname === '/admin-dashboard' || pathname.startsWith('/admin-dashboard/')
}

export function partnerAllowedRole(role: string | undefined): boolean {
  return role === 'partner'
}

export function adminAllowedRole(role: string | undefined): boolean {
  return role === 'admin' || role === 'editor'
}
