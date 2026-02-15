import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

// Helper function to parse user from cookie session
function parseUserFromCookie(cookieHeader: string) {
  try {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const trimmed = cookie.trim()
      const equalIndex = trimmed.indexOf('=')
      if (equalIndex === -1) return acc
      
      const name = trimmed.substring(0, equalIndex).trim()
      const rawValue = trimmed.substring(equalIndex + 1).trim()
      
      if (name && rawValue) {
        try {
          acc[name] = decodeURIComponent(rawValue)
        } catch (e) {
          acc[name] = rawValue
        }
      }
      return acc
    }, {} as Record<string, string>)
    
    const COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'
    let sessionValue = cookies[COOKIE_NAME] || null
    
    // Check for split cookies
    if (!sessionValue && cookies[`${COOKIE_NAME}.0`]) {
      let index = 0
      const parts: string[] = []
      while (cookies[`${COOKIE_NAME}.${index}`]) {
        parts.push(cookies[`${COOKIE_NAME}.${index}`])
        index++
      }
      if (parts.length > 0) {
        sessionValue = parts.join('')
  }
    }
    
    if (sessionValue) {
      try {
        const session = JSON.parse(sessionValue)
        if (session?.user) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] Parsed session from cookie:', {
          hasUser: !!session.user,
          userId: session.user.id,
          userEmail: session.user.email,
          userRole: session.user.user_metadata?.role,
          isMinimal: !session.user.user_metadata?.company_name // Minimal session doesn't have company_name
        })
      }
          return session.user
        }
      } catch (parseError) {
        console.error('[Middleware] Failed to parse session from cookie:', {
          error: parseError instanceof Error ? parseError.message : String(parseError),
          sessionValueLength: sessionValue.length,
          sessionValuePreview: sessionValue.substring(0, 100)
        })
      }
    }
  } catch (error) {
    // Parse failed, return null
  }
  return null
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

  // Debug: Log cookie info (only in development)
  const cookieHeader = request.headers.get('cookie') || ''
  const hasAuthCookie = cookieHeader.includes('sb-uhkiaodpzvhsuqfrwgih-auth-token')
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] Request:', {
      pathname,
      hasCookies: !!cookieHeader,
      cookieLength: cookieHeader.length,
      hasAuthCookie
    })
  }
  
  try {
    // First, try to parse user directly from cookie (faster and more reliable)
    const userFromCookie = parseUserFromCookie(cookieHeader)
    
    if (userFromCookie && userFromCookie.id) {
      const userRole = userFromCookie.user_metadata?.role
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] User from cookie:', {
          userId: userFromCookie.id,
          userEmail: userFromCookie.email,
          userRole
        })
      }
      
      // Role-based access control
      if (pathname.startsWith('/admin-dashboard')) {
        if (userRole !== 'admin' && userRole !== 'editor') {
          if (process.env.NODE_ENV === 'development') {
            console.log('[Middleware] User is not admin/editor, redirecting to /login:', { userRole, userEmail: userFromCookie.email })
          }
          const loginUrl = new URL('/login', request.nextUrl.origin)
          return NextResponse.redirect(loginUrl, { status: 307 })
        }
      } else if (
    pathname.startsWith('/partner/dashboard') ||
    pathname.startsWith('/partner/credit-top-up') ||
    pathname.startsWith('/partner/einstellungen')
  ) {
        if (userRole !== 'partner') {
          if (process.env.NODE_ENV === 'development') {
            console.log('[Middleware] User is not partner, redirecting to /login:', { userRole, userEmail: userFromCookie.email })
          }
          const loginUrl = new URL('/login', request.nextUrl.origin)
          return NextResponse.redirect(loginUrl, { status: 307 })
    }
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Middleware] ✅ Access granted (from cookie):', { pathname, userRole, userEmail: userFromCookie.email })
      }
    return NextResponse.next()
    }

    // Fallback: Try getUser() if cookie parse failed
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
        console.log('[Middleware] No user found, redirecting to /login:', { 
          error: error?.message,
          errorStatus: error?.status,
          hasCookies: !!cookieHeader,
          hasAuthCookie
        })
      }
      const loginUrl = new URL('/login', request.nextUrl.origin)
      return NextResponse.redirect(loginUrl, { status: 307 })
    }
    
    const userRole = user.user_metadata?.role
    
    // Role-based access control
    if (pathname.startsWith('/admin-dashboard')) {
      if (userRole !== 'admin' && userRole !== 'editor') {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Middleware] User is not admin/editor, redirecting to /login:', { userRole, userEmail: user.email })
        }
        const loginUrl = new URL('/login', request.nextUrl.origin)
        return NextResponse.redirect(loginUrl, { status: 307 })
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
        const loginUrl = new URL('/login', request.nextUrl.origin)
        return NextResponse.redirect(loginUrl, { status: 307 })
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Middleware] ✅ Access granted (from getUser):', { pathname, userRole, userEmail: user.email })
    }
  return NextResponse.next()
  } catch (error) {
    console.error('[Middleware] ❌ Exception:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      pathname,
      hasCookies: !!cookieHeader
    })
    const loginUrl = new URL('/login', request.nextUrl.origin)
    return NextResponse.redirect(loginUrl, { status: 307 })
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
