import { NextResponse, type NextRequest } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const AUTH_COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhkiaodpzvhsuqfrwgih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg'

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

function parseCookies(cookieHeader: string) {
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const trimmed = cookie.trim()
    const equalIndex = trimmed.indexOf('=')
    if (equalIndex === -1) return acc

    const name = trimmed.substring(0, equalIndex).trim()
    const rawValue = trimmed.substring(equalIndex + 1).trim()
    if (!name || !rawValue) return acc

    try {
      acc[name] = decodeURIComponent(rawValue)
    } catch {
      acc[name] = rawValue
    }
    return acc
  }, {} as Record<string, string>)
}

function getSessionFromCookies(cookieHeader: string) {
  const cookies = parseCookies(cookieHeader)
  let sessionValue = cookies[AUTH_COOKIE_NAME] || null

  // Rebuild chunked cookie format.
  // Supports both styles:
  // 1) base + .1 + .2 ...
  // 2) .0 + .1 + .2 ...
  if (!sessionValue) {
    const parts: string[] = []
    if (cookies[`${AUTH_COOKIE_NAME}.0`]) {
      let index = 0
      while (cookies[`${AUTH_COOKIE_NAME}.${index}`]) {
        parts.push(cookies[`${AUTH_COOKIE_NAME}.${index}`])
        index++
      }
    } else if (cookies[AUTH_COOKIE_NAME]) {
      parts.push(cookies[AUTH_COOKIE_NAME])
      let index = 1
      while (cookies[`${AUTH_COOKIE_NAME}.${index}`]) {
        parts.push(cookies[`${AUTH_COOKIE_NAME}.${index}`])
        index++
      }
    }

    if (parts.length > 0) {
      sessionValue = parts.join('')
    }
  }

  if (!sessionValue && cookies[AUTH_COOKIE_NAME]) {
    const parts: string[] = [cookies[AUTH_COOKIE_NAME]]
    let index = 1
    while (cookies[`${AUTH_COOKIE_NAME}.${index}`]) {
      parts.push(cookies[`${AUTH_COOKIE_NAME}.${index}`])
      index++
    }
    if (parts.length > 0) {
      sessionValue = parts.join('')
    }
  }

  if (!sessionValue) return null

  try {
    return JSON.parse(sessionValue) as {
      access_token?: string
      user?: { user_metadata?: { role?: string } }
    }
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

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
    const cookieHeader = request.headers.get('cookie') || ''
    const parsedSession = getSessionFromCookies(cookieHeader)
    const accessToken = parsedSession?.access_token

    if (!accessToken) {
      return redirectToLoginWithCleanup(request, 'session_expired')
    }

    // Verify token directly on Supabase with explicit access token.
    const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      }
    })

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    
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
