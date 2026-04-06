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
      // Parse cookies from header - handle both encoded and unencoded values
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const trimmed = cookie.trim()
        const equalIndex = trimmed.indexOf('=')
        if (equalIndex === -1) return acc
        
        const name = trimmed.substring(0, equalIndex).trim()
        const rawValue = trimmed.substring(equalIndex + 1).trim()
        
        if (name && rawValue) {
          try {
            // Try to decode URL-encoded value (handles %7B, %22, etc.)
            acc[name] = decodeURIComponent(rawValue)
          } catch (e) {
            // If decode fails, use raw value
            acc[name] = rawValue
          }
        }
        return acc
      }, {} as Record<string, string>)
      
      // Try to get the cookie value - check both exact match and with index suffixes
      let value = cookies[key] || null
      
      // Supabase sometimes splits large cookies into multiple parts (.0, .1, etc.)
      if (!value && key.includes('auth-token')) {
        // Check for split cookies
        let index = 0
        const parts: string[] = []
        while (true) {
          const partKey = index === 0 ? key : `${key}.${index}`
          const part = cookies[partKey]
          if (!part) break
          parts.push(part)
          index++
        }
        if (parts.length > 0) {
          value = parts.join('')
        }
      }
      
      // If we have a JSON string (Supabase session format), validate it
      if (value && key.includes('auth-token')) {
        try {
          // Try to parse as JSON to validate format
          const parsed = JSON.parse(value)
          if (parsed && typeof parsed === 'object') {
            // Validate that it has required Supabase session fields
            if (parsed.access_token && parsed.user) {
              // Check if user has 'sub' claim in access_token or id in user
              if (!parsed.user.id && !parsed.user.sub) {
                console.warn('[Middleware Storage] Session missing user.id or user.sub')
              }
              if (parsed.user.id || parsed.user.sub) {
                console.log('[Middleware Storage] Valid session found:', {
                  hasAccessToken: !!parsed.access_token,
                  hasUser: !!parsed.user,
                  userId: parsed.user.id || parsed.user.sub,
                  userEmail: parsed.user.email,
                  userRole: parsed.user.user_metadata?.role
                })
              }
            } else {
              console.warn('[Middleware Storage] Session missing required fields:', {
                hasAccessToken: !!parsed.access_token,
                hasUser: !!parsed.user
              })
            }
          }
        } catch (e) {
          // Not JSON, might be a different format or corrupted
          console.warn('[Middleware Storage] Cookie value is not valid JSON:', {
            key,
            valueLength: value.length,
            firstChars: value.substring(0, 50),
            error: e instanceof Error ? e.message : String(e)
          })
        }
      }
      
      return value
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
      // Only provide storage if we have cookies, otherwise undefined to avoid warning
      storage: cookieHeader ? cookieStorage : undefined,
    },
    global: {
      headers: {
        cookie: cookieHeader,
      },
    },
  })
}


