import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/src/lib/supabase/middleware'
import {
  adminAllowedRole,
  isAdminProtectedPath,
  isPartnerAppProtectedPath,
  partnerAllowedRole,
  resolveAuthRole,
} from '@/src/lib/auth/role'

const LOGIN_PATH = '/login'

export async function proxy(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  const pathname = request.nextUrl.pathname

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (isPartnerAppProtectedPath(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = LOGIN_PATH
      return NextResponse.redirect(url)
    }

    const role = resolveAuthRole(user)
    if (!partnerAllowedRole(role)) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  if (isAdminProtectedPath(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = LOGIN_PATH
      return NextResponse.redirect(url)
    }

    const role = resolveAuthRole(user)
    if (!adminAllowedRole(role)) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/partner/dashboard',
    '/partner/dashboard/:path*',
    '/partner/einstellungen',
    '/partner/einstellungen/:path*',
    '/partner/credit-top-up',
    '/partner/credit-top-up/:path*',
    '/partner/payment-status',
    '/partner/payment-status/:path*',
    '/admin-dashboard',
    '/admin-dashboard/:path*',
    '/login',
  ],
}
