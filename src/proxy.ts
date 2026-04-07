import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/src/lib/supabase/middleware'

const PARTNER_PREFIX = '/partner'
const ADMIN_PREFIX = '/admin-dashboard'
const LOGIN_PATH = '/login'

export async function proxy(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  const pathname = request.nextUrl.pathname

  // Refresh auth cookies/session for SSR and server route protection.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (pathname.startsWith(PARTNER_PREFIX)) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = LOGIN_PATH
      return NextResponse.redirect(url)
    }

    const role = user.user_metadata?.role ?? user.app_metadata?.role
    if (role !== 'partner') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = LOGIN_PATH
      return NextResponse.redirect(url)
    }

    const role = user.user_metadata?.role ?? user.app_metadata?.role
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
    '/partner/:path*',
    '/admin-dashboard/:path*',
    '/login',
  ],
}
