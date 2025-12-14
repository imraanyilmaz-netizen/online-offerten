import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhkiaodpzvhsuqfrwgih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get cookie header for Supabase session detection
  const cookieHeader = request.headers.get('cookie') || ''
  
  // Extract project ref for Supabase cookie key pattern
  const projectRef = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || ''
  const authTokenKey = projectRef ? `sb-${projectRef}-auth-token` : ''
  
  // Create Supabase client for middleware (Edge runtime compatible)
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          // Supabase stores session in specific cookie format: sb-{project-ref}-auth-token
          // Try both the auth token key and the direct key lookup
          const cookieValue = request.cookies.get(authTokenKey)?.value || 
                             request.cookies.get(key)?.value || 
                             null
          return cookieValue
        },
        setItem: () => {
          // Cannot set cookies in middleware - handled by Supabase client
        },
        removeItem: () => {
          // Cannot remove cookies in middleware - handled by Supabase client
        },
      },
    },
    global: {
      headers: {
        cookie: cookieHeader,
      },
    },
  })

  // Get user from session - use getUser() for JWT validation in Edge runtime
  // getUser() validates the JWT token from cookies, more reliable than getSession()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  // Allow /login page to be accessed by anyone (client-side will handle redirects)
  if (request.nextUrl.pathname === '/login') {
    return response
  }

  // Protected route checks
  if (request.nextUrl.pathname.startsWith('/admin-dashboard')) {
    if (!user || user.user_metadata?.role !== 'admin') {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (request.nextUrl.pathname.startsWith('/partner/dashboard') ||
      request.nextUrl.pathname.startsWith('/partner/credit-top-up') ||
      request.nextUrl.pathname.startsWith('/partner/einstellungen')) {
    if (!user || user.user_metadata?.role !== 'partner') {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return response
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
