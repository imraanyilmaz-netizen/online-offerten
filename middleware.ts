import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const supabase = createMiddlewareClient(request)
  
  // Get user from session cookie
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userRole = user?.user_metadata?.role

  // Redirect authenticated users away from /login
  if (pathname === '/login') {
    if (user) {
      // Role-based redirect (no redirect query param needed)
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url), { status: 307 })
      } else if (userRole === 'partner') {
        return NextResponse.redirect(new URL('/partner/dashboard', request.url), { status: 307 })
      }
      // If user has no role, allow them to stay on login page
    }
    // If not authenticated, allow access to login page
    return NextResponse.next()
  }

  // Admin route protection
  if (pathname.startsWith('/admin-dashboard')) {
    if (!user || userRole !== 'admin') {
      // Redirect to login without query params
      return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
    }
    return NextResponse.next()
  }

  // Partner route protection
  if (
    pathname.startsWith('/partner/dashboard') ||
    pathname.startsWith('/partner/credit-top-up') ||
    pathname.startsWith('/partner/einstellungen')
  ) {
    if (!user || userRole !== 'partner') {
      // Redirect to login without query params
      return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
    }
    return NextResponse.next()
  }

  // Allow all other routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/admin-dashboard/:path*',
    '/partner/dashboard/:path*',
    '/partner/credit-top-up/:path*',
    '/partner/einstellungen/:path*',
  ],
}
