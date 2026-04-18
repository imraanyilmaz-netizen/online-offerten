/**
 * Edge middleware for Supabase session refresh and role-gated routes.
 * Legacy path redirects (e.g. `/privatumzug` → `/umzugsfirma/privatumzug`) live in
 * `legacy-redirects.mjs` and `next.config.js` `redirects()`, not here.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/src/lib/supabase/middleware'

const PARTNER_PROTECTED_PREFIXES = [
  '/partner/dashboard',
  '/partner/credit-top-up',
  '/partner/einstellungen',
]
const ADMIN_PREFIX = '/admin-dashboard'
const LOGIN_PATH = '/login'

export async function proxy(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  const pathname = request.nextUrl.pathname

  // Refresh auth cookies/session and verify JWT claims server-side.
  const {
    data: claimsData,
    error: claimsError,
  } = await supabase.auth.getClaims()
  const jwtClaims = claimsData?.claims

  const role =
    (jwtClaims as { user_metadata?: { role?: string }; app_metadata?: { role?: string } } | null)
      ?.user_metadata?.role ??
    (jwtClaims as { user_metadata?: { role?: string }; app_metadata?: { role?: string } } | null)
      ?.app_metadata?.role
  const isAuthenticated = !claimsError && !!jwtClaims

  const isPartnerProtectedRoute = PARTNER_PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (isPartnerProtectedRoute) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone()
      url.pathname = LOGIN_PATH
      return NextResponse.redirect(url)
    }

    if (role !== 'partner') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone()
      url.pathname = LOGIN_PATH
      return NextResponse.redirect(url)
    }

    if (role !== 'admin' && role !== 'editor') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/partner/dashboard/:path*',
    '/partner/credit-top-up/:path*',
    '/partner/einstellungen/:path*',
    '/admin-dashboard/:path*',
  ],
}
