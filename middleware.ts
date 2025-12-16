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
      const session = JSON.parse(sessionValue)
      if (session?.user) {
        return session.user
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
  
  // Debug: Log cookie info
  const cookieHeader = request.headers.get('cookie') || ''
  const hasAuthCookie = cookieHeader.includes('sb-uhkiaodpzvhsuqfrwgih-auth-token')
  
  console.log('[Middleware] Request:', {
    pathname,
    hasCookies: !!cookieHeader,
    cookieLength: cookieHeader.length,
    hasAuthCookie
  })
  
  try {
    // First, try to parse user directly from cookie (faster and more reliable)
    const userFromCookie = parseUserFromCookie(cookieHeader)
    
    if (userFromCookie && userFromCookie.id) {
      const userRole = userFromCookie.user_metadata?.role
      
      console.log('[Middleware] User from cookie:', {
        userId: userFromCookie.id,
        userEmail: userFromCookie.email,
        userRole
      })
      
      // Role-based access control
      if (pathname.startsWith('/admin-dashboard')) {
        if (userRole !== 'admin') {
          console.log('[Middleware] User is not admin, redirecting to /login:', { userRole, userEmail: userFromCookie.email })
          return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
        }
      } else if (
        pathname.startsWith('/partner/dashboard') ||
        pathname.startsWith('/partner/credit-top-up') ||
        pathname.startsWith('/partner/einstellungen')
      ) {
        if (userRole !== 'partner') {
          console.log('[Middleware] User is not partner, redirecting to /login:', { userRole, userEmail: userFromCookie.email })
          return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
        }
      }
      
      console.log('[Middleware] ✅ Access granted (from cookie):', { pathname, userRole, userEmail: userFromCookie.email })
      return NextResponse.next()
    }
    
    // Fallback: Try getUser() if cookie parse failed
    const supabase = createMiddlewareClient(request)
    const { data: { user }, error } = await supabase.auth.getUser()
    
    console.log('[Middleware] getUser result:', {
      hasUser: !!user,
      userEmail: user?.email,
      userRole: user?.user_metadata?.role,
      error: error?.message,
      errorCode: error?.status
    })
    
    if (error || !user) {
      console.log('[Middleware] No user found, redirecting to /login:', { 
        error: error?.message,
        errorStatus: error?.status,
        hasCookies: !!cookieHeader,
        hasAuthCookie
      })
      return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
    }
    
    const userRole = user.user_metadata?.role
    
    // Role-based access control
    if (pathname.startsWith('/admin-dashboard')) {
      if (userRole !== 'admin') {
        console.log('[Middleware] User is not admin, redirecting to /login:', { userRole, userEmail: user.email })
        return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
      }
    } else if (
      pathname.startsWith('/partner/dashboard') ||
      pathname.startsWith('/partner/credit-top-up') ||
      pathname.startsWith('/partner/einstellungen')
    ) {
      if (userRole !== 'partner') {
        console.log('[Middleware] User is not partner, redirecting to /login:', { userRole, userEmail: user.email })
        return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
      }
    }
    
    console.log('[Middleware] ✅ Access granted (from getUser):', { pathname, userRole, userEmail: user.email })
    return NextResponse.next()
  } catch (error) {
    console.error('[Middleware] ❌ Exception:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      pathname,
      hasCookies: !!cookieHeader
    })
    return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
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
