import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

const AUTH_COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'

function redirectToLoginWithCleanup(request: NextRequest, reason?: string) {
  const loginUrl = new URL('/login', request.nextUrl.origin)
  if (reason) {
    loginUrl.searchParams.set('reason', reason)
  }

  const response = NextResponse.redirect(loginUrl, { status: 307 })

  // Delete known auth cookie and chunked variants.
  response.cookies.set(AUTH_COOKIE_NAME, '', { path: '/', expires: new Date(0) })
  for (let i = 0; i <= 10; i++) {
    response.cookies.set(`${AUTH_COOKIE_NAME}.${i}`, '', { path: '/', expires: new Date(0) })
  }

  // Delete any auth-token cookies found in request as additional safety.
  request.cookies.getAll().forEach(({ name }) => {
    if (name.includes('auth-token')) {
      response.cookies.set(name, '', { path: '/', expires: new Date(0) })
    }
  })

  return response
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip RSC requests - these are internal Next.js requests
  if (pathname.includes('_rsc') || request.nextUrl.searchParams.has('_rsc')) {
    return NextResponse.next()
  }

  // Skip /login route to prevent redirect loops
  if (pathname === '/login' || pathname.startsWith('/login/')) {
    return NextResponse.next()
  }
  
  const protectedRoutes = [
    '/admin-dashboard',
    '/partner/dashboard',
    '/partner/credit-top-up',
    '/partner/einstellungen'
  ]
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  try {
    // Always verify user on Supabase side to avoid stale/corrupted local sessions.
    const supabase = createMiddlewareClient(request)
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Middleware] getUser result:', {
        hasUser: !!user,
        userEmail: user?.email,
        userRole: user?.user_metadata?.role,
        error: error?.message,
        errorCode: error?.status
      })
    }
    
    if (error || !user) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] No valid user found, redirecting to /login:', {
          error: error?.message,
          errorStatus: error?.status
        })
      }
      return redirectToLoginWithCleanup(request, 'session_expired')
    }
    
    const userRole = user.user_metadata?.role
    
    // Role-based access control
    if (pathname.startsWith('/admin-dashboard')) {
      if (userRole !== 'admin' && userRole !== 'editor') {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Middleware] User is not admin/editor, redirecting to /login:', { userRole, userEmail: user.email })
        }
        return redirectToLoginWithCleanup(request, 'role_invalid')
      }
    } else if (
      pathname.startsWith('/partner/dashboard') ||
      pathname.startsWith('/partner/credit-top-up') ||
      pathname.startsWith('/partner/einstellungen')
    ) {
      if (userRole !== 'partner') {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Middleware] User is not partner, redirecting to /login:', { userRole, userEmail: user.email })
        }
        return redirectToLoginWithCleanup(request, 'role_invalid')
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Middleware] ✅ Access granted (from getUser):', { pathname, userRole, userEmail: user.email })
    }
  return NextResponse.next()
  } catch (error) {
    const cookieHeader = request.headers.get('cookie') || ''
    console.error('[Middleware] ❌ Exception:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      pathname,
      hasCookies: !!cookieHeader
    })
    return redirectToLoginWithCleanup(request, 'auth_error')
  }
}

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/partner/dashboard/:path*',
    '/partner/credit-top-up/:path*',
    '/partner/einstellungen/:path*',
  ],
}
