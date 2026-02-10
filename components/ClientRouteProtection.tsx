'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/SupabaseAuthContext'

/**
 * Client-side route protection component
 * Handles role-based redirects for admin and partner routes
 * This replaces middleware role checks - middleware only checks if user is authenticated
 */
export default function ClientRouteProtection() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    // Wait for auth to load
    if (loading) return

    // No user - redirect protected routes to login
    if (!user) {
      const protectedRoutes = [
        '/admin-dashboard',
        '/partner/dashboard',
        '/partner/credit-top-up',
        '/partner/einstellungen'
      ]

      const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route))

      if (isProtectedRoute) {
        console.log('[ClientRouteProtection] No user, redirecting protected route to login')
        router.replace('/login')
      }
      return
    }

    const userRole = user?.user_metadata?.role

    // Admin route protection (client-side)
    if (pathname?.startsWith('/admin-dashboard')) {
      if (userRole !== 'admin') {
        console.log('[ClientRouteProtection] Non-admin user on admin route, redirecting to login')
        router.replace('/login')
        return
      }
    }

    // Partner route protection (client-side)
    if (
      pathname?.startsWith('/partner/dashboard') ||
      pathname?.startsWith('/partner/credit-top-up') ||
      pathname?.startsWith('/partner/einstellungen')
    ) {
      if (userRole !== 'partner') {
        console.log('[ClientRouteProtection] Non-partner user on partner route, redirecting to login')
        router.replace('/login')
        return
      }
    }

    // Redirect authenticated users away from /login (client-side)
    if (pathname === '/login' && user) {
      if (userRole === 'admin') {
        console.log('[ClientRouteProtection] Authenticated admin on /login, redirecting to /admin-dashboard')
        router.replace('/admin-dashboard')
      } else if (userRole === 'partner') {
        console.log('[ClientRouteProtection] Authenticated partner on /login, redirecting to /partner/dashboard')
        router.replace('/partner/dashboard')
      } else {
        // User authenticated but no valid role - redirect to home
        console.log('[ClientRouteProtection] User authenticated but no valid role, redirecting to home')
        router.replace('/')
      }
    }

    // Redirect authenticated users away from auth pages
    const authRoutes = ['/forgot-password', '/partner-werden']
    if (authRoutes.includes(pathname || '') && user) {
      if (userRole === 'admin') {
        router.replace('/admin-dashboard')
      } else if (userRole === 'partner') {
        router.replace('/partner/dashboard')
      } else {
        router.replace('/')
      }
    }
  }, [user, loading, pathname, router])

  return null // Bu component sadece redirect iÃ§in, UI render etmiyor
}

