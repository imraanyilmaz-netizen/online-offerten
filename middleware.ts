import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhkiaodpzvhsuqfrwgih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Skip middleware for login page to avoid redirect loop
  if (request.nextUrl.pathname === '/login') {
    return response
  }
  
  // In local development, allow access if auth check fails (client-side will handle it)
  const isLocal = process.env.NODE_ENV === 'development' || 
                 request.nextUrl.hostname === 'localhost' ||
                 request.nextUrl.hostname === '127.0.0.1'
  
  // Get all cookies from the request
  const cookieHeader = request.headers.get('cookie') || ''
  
  // Create Supabase client for middleware with proper cookie handling
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          // Parse cookies from header
          const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
            const [name, ...valueParts] = cookie.trim().split('=')
            acc[name] = valueParts.join('=')
            return acc
          }, {} as Record<string, string>)
          return cookies[key] || null
        },
        setItem: () => {
          // Cannot set cookies in middleware
        },
        removeItem: () => {
          // Cannot remove cookies in middleware
        },
      },
    },
    global: {
      headers: {
        cookie: cookieHeader,
      },
    },
  })

  // Get user from session cookie
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin-dashboard')) {
    if (!user || user.user_metadata?.role !== 'admin') {
      // In local development, let client-side handle auth (allow through)
      if (isLocal) {
        return response
      }
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Partner dashboard protection
  if (request.nextUrl.pathname.startsWith('/partner/dashboard') ||
      request.nextUrl.pathname.startsWith('/partner/credit-top-up') ||
      request.nextUrl.pathname.startsWith('/partner/einstellungen')) {
    if (!user || user.user_metadata?.role !== 'partner') {
      // In local development, let client-side handle auth (allow through)
      if (isLocal) {
        return response
      }
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/partner/dashboard/:path*',
    '/partner/credit-top-up/:path*',
    '/partner/einstellungen/:path*',
  ],
}

