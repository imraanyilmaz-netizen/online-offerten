import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  
  console.log('[Middleware] Request:', { pathname, hasRedirect: searchParams.has('redirect') })
  
  // FIRST: Clean up redirect query parameter on /login - do this BEFORE any auth checks
  if (pathname === '/login' && searchParams.has('redirect')) {
    const cleanUrl = new URL('/login', request.url)
    // Keep other params like 'register' if they exist
    if (searchParams.has('register')) {
      cleanUrl.searchParams.set('register', searchParams.get('register') || 'true')
    }
    console.log('[Middleware] Cleaning redirect param, redirecting to:', cleanUrl.toString())
    return NextResponse.redirect(cleanUrl, { status: 307 })
  }
  
  const cookieHeader = request.headers.get('cookie') || ''
  const hasAuthCookie = cookieHeader.includes('sb-uhkiaodpzvhsuqfrwgih-auth-token')
  
  console.log('[Middleware] Cookie header:', { 
    hasCookies: !!cookieHeader, 
    cookieLength: cookieHeader.length,
    hasAuthCookie
  })

  // If no auth cookie, skip auth check and allow access to public routes
  if (!hasAuthCookie) {
    // Allow /login without auth check
    if (pathname === '/login') {
      return NextResponse.next()
    }
    // For protected routes, redirect to login
    if (pathname.startsWith('/admin-dashboard') || 
        pathname.startsWith('/partner/dashboard') ||
        pathname.startsWith('/partner/credit-top-up') ||
        pathname.startsWith('/partner/einstellungen')) {
      return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
    }
    // Allow all other routes
    return NextResponse.next()
  }

  const supabase = createMiddlewareClient(request)

  // Try getSession() first - this handles JSON session format from cookies
  // getSession() can parse the JSON session stored in cookies
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  
  let user = null
  let userError: any = null
  
  // Check for "missing sub claim" error specifically
  const hasMissingSubClaim = sessionError?.message?.includes('missing sub claim') || 
                             sessionError?.message?.includes('invalid claim')
  
  if (hasMissingSubClaim) {
    console.log('[Middleware] Missing sub claim detected in session error - token is invalid/corrupted')
    userError = sessionError
  } else if (sessionData?.session?.user) {
    // Successfully got user from session
    user = sessionData.session.user
    console.log('[Middleware] Got user from session:', { 
      email: user.email, 
      role: user.user_metadata?.role,
      userId: user.id 
    })
  } else {
    // If getSession failed (no session or invalid), try getUser() as fallback
    // This might work if the token is stored differently
    const userResult = await supabase.auth.getUser()
    user = userResult.data?.user || null
    userError = userResult.error
    
    // Check if getUser also has missing sub claim error
    if (userResult.error?.message?.includes('missing sub claim') || 
        userResult.error?.message?.includes('invalid claim')) {
      console.log('[Middleware] Missing sub claim detected in getUser error - token is invalid/corrupted')
    } else {
      console.log('[Middleware] Session failed, tried getUser:', { 
        hasUser: !!user, 
        sessionError: sessionError?.message,
        userError: userError?.message 
      })
    }
  }

  // Use the first available error message
  const errorMessage = userError?.message || sessionError?.message

  console.log('[Middleware] User check:', { 
    hasUser: !!user, 
    userEmail: user?.email,
    userRole: user?.user_metadata?.role,
    error: errorMessage
  })

  // If token is invalid (missing sub claim, expired, etc.), clear the cookie and return early
  const hasInvalidTokenError = errorMessage && (
    errorMessage.includes('invalid claim') || 
    errorMessage.includes('missing sub claim') ||
    errorMessage.includes('JWT') ||
    errorMessage.includes('expired') ||
    errorMessage.includes('Invalid') ||
    errorMessage.includes('token')
  )
  
  // Always clear invalid tokens, even if we somehow got a user (shouldn't happen but be safe)
  if (hasInvalidTokenError && (!user || hasMissingSubClaim)) {
    console.log('[Middleware] Invalid/corrupted token detected (missing sub claim), clearing cookies and localStorage')
    
    // Create response - always allow /login, redirect others
    const response = pathname === '/login' 
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url), { status: 307 })
    
    // Clear all Supabase auth cookies using delete method
    const authCookieNames = [
      'sb-uhkiaodpzvhsuqfrwgih-auth-token',
      'sb-uhkiaodpzvhsuqfrwgih-auth-token.0',
      'sb-uhkiaodpzvhsuqfrwgih-auth-token.1',
      'sb-uhkiaodpzvhsuqfrwgih-auth-token.2',
    ]
    
    authCookieNames.forEach(cookieName => {
      // Delete cookie
      response.cookies.delete(cookieName)
      // Also set expired cookie as backup
      response.cookies.set(cookieName, '', {
        path: '/',
        expires: new Date(0),
        sameSite: 'lax',
        httpOnly: false,
        maxAge: 0,
      })
    })
    
    // Also set a header to tell client-side to clear localStorage
    response.headers.set('x-clear-auth-storage', 'true')
    
    // Return early - don't continue with auth checks
    return response
  }

  const userRole = user?.user_metadata?.role

  // Redirect authenticated users away from /login
  if (pathname === '/login') {
    if (user) {
      // Role-based redirect (no redirect query param needed)
      if (userRole === 'admin') {
        console.log('[Middleware] Authenticated admin on /login, redirecting to /admin-dashboard')
        return NextResponse.redirect(new URL('/admin-dashboard', request.url), { status: 307 })
      } else if (userRole === 'partner') {
        console.log('[Middleware] Authenticated partner on /login, redirecting to /partner/dashboard')
        return NextResponse.redirect(new URL('/partner/dashboard', request.url), { status: 307 })
      }
      console.log('[Middleware] User authenticated but no role, allowing /login')
      // If user has no role, allow them to stay on login page
    }
    console.log('[Middleware] No user on /login, allowing access')
    // If not authenticated, allow access to login page
    return NextResponse.next()
  }

  // Admin route protection
  if (pathname.startsWith('/admin-dashboard')) {
    if (!user || userRole !== 'admin') {
      console.log('[Middleware] Admin route protection failed:', { hasUser: !!user, userRole, redirectingTo: '/login' })
      // Redirect to login without query params
      return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
    }
    console.log('[Middleware] Admin route access granted')
    return NextResponse.next()
  }

  // Partner route protection
  if (
    pathname.startsWith('/partner/dashboard') ||
    pathname.startsWith('/partner/credit-top-up') ||
    pathname.startsWith('/partner/einstellungen')
  ) {
    if (!user || userRole !== 'partner') {
      console.log('[Middleware] Partner route protection failed:', { hasUser: !!user, userRole, redirectingTo: '/login' })
      // Redirect to login without query params
      return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
    }
    console.log('[Middleware] Partner route access granted')
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
