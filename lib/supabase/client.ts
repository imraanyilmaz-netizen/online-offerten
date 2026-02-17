'use client'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uhkiaodpzvhsuqfrwgih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoa2lhb2RwenZoc3VxZnJ3Z2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzY4NDAsImV4cCI6MjA2NTE1Mjg0MH0.PI2YNNYtcUgQYooV-6z2P6qK-1tIQF8DL7oILhfHmDg'

// Cookie name format: sb-<project-ref>-auth-token
const COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'

// Max cookie chunk size (leave room for name + attributes ~200 bytes)
const MAX_COOKIE_CHUNK = 3500

// Helper: clear all split cookie chunks + base cookie
function clearAllCookieChunks() {
  const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''
  const expireStr = 'Thu, 01 Jan 1970 00:00:00 GMT'
  // Clear base cookie
  document.cookie = `${COOKIE_NAME}=; path=/; expires=${expireStr}; SameSite=Lax; ${secureFlag}`
  // Clear up to 10 chunks (more than enough)
  for (let i = 0; i < 10; i++) {
    document.cookie = `${COOKIE_NAME}.${i}=; path=/; expires=${expireStr}; SameSite=Lax; ${secureFlag}`
  }
}

// Helper: set cookie with automatic splitting for large values
function setCookieWithSplit(value: string) {
  const encoded = encodeURIComponent(value)
  const expires = new Date()
  expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''
  const expStr = expires.toUTCString()

  // Always clear old chunks first to prevent stale data
  clearAllCookieChunks()

  if (encoded.length <= MAX_COOKIE_CHUNK) {
    // Fits in a single cookie — use base name (middleware checks this first)
    document.cookie = `${COOKIE_NAME}=${encoded}; path=/; expires=${expStr}; SameSite=Lax; ${secureFlag}`
  } else {
    // Split into numbered chunks: .0, .1, .2, ...
    let offset = 0
    let index = 0
    while (offset < encoded.length) {
      const chunk = encoded.substring(offset, offset + MAX_COOKIE_CHUNK)
      document.cookie = `${COOKIE_NAME}.${index}=${chunk}; path=/; expires=${expStr}; SameSite=Lax; ${secureFlag}`
      offset += MAX_COOKIE_CHUNK
      index++
    }
    console.log('[Supabase Storage] Cookie split into', index, 'chunks (total encoded:', encoded.length, 'bytes)')
  }
}

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
        setCookieWithSplit(value)
      }
      
      return value
    },
    setItem: (key: string, value: string): void => {
      // Store in localStorage (primary storage)
      localStorage.setItem(key, value)
      
      // Also sync to cookie for middleware (with automatic splitting)
      if (key === COOKIE_NAME) {
        setCookieWithSplit(value)
      }
    },
    removeItem: (key: string): void => {
      // Remove from localStorage
      localStorage.removeItem(key)
      
      // Also remove all cookie chunks
      if (key === COOKIE_NAME) {
        clearAllCookieChunks()
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



