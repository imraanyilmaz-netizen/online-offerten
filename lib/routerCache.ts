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
  const windowWithNext = window as typeof window & { next?: { router?: { refresh?: () => void } } }
  if (windowWithNext.next && windowWithNext.next.router && typeof windowWithNext.next.router.refresh === 'function') {
    windowWithNext.next.router.refresh()
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
  const windowWithNext = window as typeof window & { next?: { router?: { refresh?: () => void } } }
  if (windowWithNext.next && windowWithNext.next.router && typeof windowWithNext.next.router.refresh === 'function') {
    windowWithNext.next.router.refresh()
  }
}
