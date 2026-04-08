'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import {
  adminAllowedRole,
  isAdminProtectedPath,
  isPartnerAppProtectedPath,
  partnerAllowedRole,
  postLoginHrefForRole,
  resolveAuthRole,
} from '@/src/lib/auth/role'

/**
 * İsteğe bağlı istemci tarafı yedek koruma (layout’a eklersen).
 * Asıl koruma: src/proxy.ts + Supabase çerezleri.
 */
export default function ClientRouteProtection() {
  const pathname = usePathname() ?? ''
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    const role = resolveAuthRole(user)

    if (!user) {
      const needsLogin =
        isPartnerAppProtectedPath(pathname) || isAdminProtectedPath(pathname)
      if (needsLogin) {
        router.replace('/login')
      }
      return
    }

    if (isAdminProtectedPath(pathname) && !adminAllowedRole(role)) {
      router.replace('/login')
      return
    }

    if (isPartnerAppProtectedPath(pathname) && !partnerAllowedRole(role)) {
      router.replace('/login')
      return
    }

    const authRoutes = ['/forgot-password', '/partner-werden']
    if (authRoutes.includes(pathname)) {
      router.replace(postLoginHrefForRole(role))
    }
  }, [user, loading, pathname, router])

  return null
}
