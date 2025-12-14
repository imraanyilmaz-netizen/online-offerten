import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const supabase = createMiddlewareClient(request)

  // Get user from session cookie
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userRole = user?.user_metadata?.role

  // Redirect authenticated users away from /login
  if (pathname === '/login') {
    if (user) {
      // Check for redirect query parameter
      const redirectParam = searchParams.get('redirect')
      
      // If redirect param matches role, redirect there
      if (redirectParam === 'admin-dashboard' && userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url))
      } else if (redirectParam === 'partner-dashboard' && userRole === 'partner') {
        return NextResponse.redirect(new URL('/partner/dashboard', request.url))
      }
      
      // Default role-based redirect
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url))
      } else if (userRole === 'partner') {
        return NextResponse.redirect(new URL('/partner/dashboard', request.url))
      }
      // If user has no role, allow them to stay on login page
    }
    // If not authenticated, allow access to login page
    return NextResponse.next()
  }

  // Admin route protection
  if (pathname.startsWith('/admin-dashboard')) {
    if (!user || userRole !== 'admin') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', 'admin-dashboard')
      return NextResponse.redirect(loginUrl)
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
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', 'partner-dashboard')
      return NextResponse.redirect(loginUrl)
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
