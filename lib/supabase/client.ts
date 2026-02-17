'use client'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhkiaodpzvhsuqfrwgih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg'

// Cookie name format: sb-<project-ref>-auth-token
const COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'

// Custom storage that syncs between localStorage and cookies
// Always returns a storage object to prevent Supabase warnings
const createCookieStorage = () => {
  // Server-side: return a no-op storage
  if (typeof window === 'undefined') {
    return {
      getItem: (): string | null => null,
      setItem: (): void => {},
      removeItem: (): void => {},
    }
  }
  
  // Client-side: return full storage implementation
  return {
    getItem: (key: string): string | null => {
      // Read from localStorage (primary storage)
      const value = localStorage.getItem(key)
      
      // If session exists in localStorage but not in cookie, sync it
      if (value && key === COOKIE_NAME) {
        // Check if cookie exists
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [name, ...rest] = cookie.trim().split('=')
          if (name && rest.length > 0) {
            acc[name] = decodeURIComponent(rest.join('='))
          }
          return acc
        }, {} as Record<string, string>)
        
        // If cookie doesn't exist or is different, sync it
        if (!cookies[key] || cookies[key] !== value) {
          const expires = new Date()
          expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
          const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''
          document.cookie = `${key}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; ${secureFlag}`
          console.log('[Supabase Storage] Cookie synced from localStorage:', { 
            key, 
            hadCookie: !!cookies[key], 
            cookieDifferent: cookies[key] !== value,
            cookieSet: true 
          })
        }
      }
      
      return value
    },
    setItem: (key: string, value: string): void => {
      console.log('[Supabase Storage] setItem called:', { key, valueLength: value?.length })
      
      // Store in localStorage (primary storage)
      localStorage.setItem(key, value)
      
      // Also sync to cookie for middleware
      if (key === COOKIE_NAME) {
        const expires = new Date()
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
        const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''
        const cookieString = `${key}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; ${secureFlag}`
        document.cookie = cookieString
        console.log('[Supabase Storage] Cookie synced:', { key, cookieSet: true, expires: expires.toUTCString() })
      }
    },
    removeItem: (key: string): void => {
      // Remove from localStorage
      localStorage.removeItem(key)
      
      // Also remove cookie
      if (key === COOKIE_NAME) {
        const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; ${secureFlag}`
      }
    },
  }
}

// Singleton pattern to prevent multiple instances
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  if (!supabaseInstance) {
    // Always provide storage (no-op on server-side) to prevent Supabase warnings
    const storage = createCookieStorage()
    
    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: storage,
        // Handle refresh token errors gracefully
        flowType: 'pkce'
      }
    })

    // Listen for auth errors and clear invalid tokens
    if (typeof window !== 'undefined') {
      supabaseInstance.auth.onAuthStateChange((event, session) => {
        // If token refresh fails, clear the session
        if (event === 'TOKEN_REFRESHED' && !session) {
          console.warn('[Supabase Client] Token refresh failed, clearing storage')
          // Clear all auth-related storage
          const keys = Object.keys(localStorage)
          keys.forEach(key => {
            if (key.includes('supabase') || key.includes('auth-token')) {
              localStorage.removeItem(key)
            }
          })
          // Clear cookies
          document.cookie.split(";").forEach(c => {
            if (c.includes('auth-token')) {
              document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
            }
          })
        }
      })
    }
  }
  return supabaseInstance
}

// Export singleton instance for backward compatibility
export const supabase = createClient()



