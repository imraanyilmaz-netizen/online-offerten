import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhkiaodpzvhsuqfrwgih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get all cookies from the request
  const cookieHeader = request.headers.get('cookie') || ''
  
  // Parse cookies for Supabase storage adapter (Edge runtime requirement)
  const parseCookies = (cookieString: string): Record<string, string> => {
    if (!cookieString) return {}
    return cookieString.split(';').reduce((acc, cookie) => {
      const [name, ...valueParts] = cookie.trim().split('=')
      if (name) {
        try {
          acc[name] = decodeURIComponent(valueParts.join('='))
        } catch {
          acc[name] = valueParts.join('=')
        }
      }
      return acc
    }, {} as Record<string, string>)
  }
  
  const cookies = parseCookies(cookieHeader)
  
  // Extract all possible Supabase cookie keys (Supabase uses sb-{project-ref}-auth-token)
  const projectRef = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/)?.[1] || ''
  const authTokenKeys = projectRef 
    ? [`sb-${projectRef}-auth-token`, `sb-${projectRef}-auth-token-code-verifier`]
    : []
  
  // Create Supabase client for middleware (Edge runtime compatible)
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          // Try multiple possible cookie keys
          for (const authKey of authTokenKeys) {
            if (cookies[authKey]) return cookies[authKey]
          }
          // Fallback to direct key lookup
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

  // Get user from session - use getSession for Edge runtime compatibility
  // getSession reads from cookies, getUser validates JWT (both work in Edge)
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  const user = session?.user || null

  // Handle /login page: redirect authenticated users to their dashboard
  if (request.nextUrl.pathname === '/login') {
    if (user && user.user_metadata?.role) {
      const role = user.user_metadata.role
      if (role === 'admin') {
        const adminUrl = new URL('/admin-dashboard', request.url)
        return NextResponse.redirect(adminUrl)
      } else if (role === 'partner') {
        const partnerUrl = new URL('/partner/dashboard', request.url)
        return NextResponse.redirect(partnerUrl)
      }
    }
    // Not authenticated or no role - allow access to login page
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

