import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhkiaodpzvhsuqfrwgih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg'

/**
 * Creates a Supabase client for Edge Runtime middleware
 * Uses cookies from the request headers
 * Supabase stores auth tokens in cookies with format: sb-<project-ref>-auth-token
 */
export function createMiddlewareClient(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || ''
  
  // Create a custom storage adapter that reads from cookies
  const cookieStorage = {
    getItem: (key: string): string | null => {
      // Parse cookies from header
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, ...rest] = cookie.trim().split('=')
        if (name && rest.length > 0) {
          acc[name] = decodeURIComponent(rest.join('='))
        }
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
  }
  
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: cookieStorage,
    },
    global: {
      headers: {
        cookie: cookieHeader,
      },
    },
  })
}
