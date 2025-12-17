/**
 * Router Cache Utility
 * Fixes Next.js 13+ App Router cache issues for client-side navigation
 */

/**
 * Clear router cache for a specific path
 * Use this when you need to force a fresh fetch on navigation
 */
export function clearRouterCache(path?: string) {
  if (typeof window === 'undefined') return

  // Clear Next.js router cache
  if ('next' in window && 'router' in window.next) {
    // @ts-ignore - Internal Next.js API
    const router = window.next.router
    if (router && typeof router.refresh === 'function') {
      router.refresh()
    }
  }

  // Clear fetch cache for the path
  if (path && 'caches' in window) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.open(cacheName).then((cache) => {
          cache.delete(path)
        })
      })
    })
  }
}

/**
 * Force router refresh on next navigation
 * Call this before navigation to ensure fresh data
 */
export function forceRouterRefresh() {
  if (typeof window === 'undefined') return

  // Use Next.js router refresh
  if ('next' in window && 'router' in window.next) {
    // @ts-ignore - Internal Next.js API
    const router = window.next.router
    if (router && typeof router.refresh === 'function') {
      router.refresh()
    }
  }
}
