// Service Worker for Online-Offerten.ch
// Version: 1.1.0 - Performance optimizations
const CACHE_VERSION = 'v1.1.0';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;

// Assets to cache on install
// Note: Next.js App Router doesn't have /index.html, only /
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-192x192.png',
  '/favicon-512x512.png',
  '/apple-touch-icon.png',
];

// Critical images to pre-cache for LCP optimization
const CRITICAL_IMAGES = [
  // Removed problematic images that cause CORS errors
];

// Cache duration in seconds
const CACHE_DURATIONS = {
  static: 31536000, // 1 year
  images: 31536000, // 1 year
  api: 300, // 5 minutes
  html: 3600, // 1 hour
};

// Install event - cache static assets and critical images
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    Promise.all([
      // Cache static assets - handle errors gracefully
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        // Cache each asset individually to handle missing files gracefully
        return Promise.allSettled(
          STATIC_ASSETS.map(url => 
            fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                } else {
                  console.warn('[SW] Failed to cache (not found):', url);
                }
              })
              .catch(err => {
                console.warn('[SW] Failed to cache:', url, err.message);
                // Don't throw - continue with other assets
              })
          )
        );
      }),
      // Pre-cache critical images for LCP
      caches.open(IMAGE_CACHE).then((cache) => {
        console.log('[SW] Pre-caching critical images');
        return Promise.all(
          CRITICAL_IMAGES.map(url => 
            fetch(url).then(response => {
              if (response.ok) {
                return cache.put(url, response);
              }
            }).catch(err => {
              console.warn('[SW] Failed to cache image:', url, err);
            })
          )
        );
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting(); // Activate immediately
    }).catch((error) => {
      console.error('[SW] Installation error:', error);
      // Still skip waiting even if caching fails
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete old caches that don't match current version
            return (
              cacheName.startsWith('static-') ||
              cacheName.startsWith('dynamic-') ||
              cacheName.startsWith('images-') ||
              cacheName.startsWith('api-')
            ) && !cacheName.includes(CACHE_VERSION);
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      return self.clients.claim(); // Take control of all pages
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Service worker should not cache itself
  if (url.pathname === '/sw.js' || url.pathname.includes('/sw.js')) {
    return;
  }

  // Static assets (JS, CSS) - Cache First
  if (url.pathname.match(/\.(js|mjs|css)$/i) || url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Images - Cache First with long TTL (including AVIF)
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|otf)$/i)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // HTML - Network First with cache fallback
  if (request.headers.get('accept')?.includes('text/html') || url.pathname === '/' || !url.pathname.match(/\./)) {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  // API calls - Network First with short cache
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase.co')) {
    event.respondWith(networkFirst(request, API_CACHE, CACHE_DURATIONS.api));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache First Strategy - for static assets
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    try {
    const networkResponse = await fetch(request);
    
      if (networkResponse && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
    } catch (fetchError) {
      // In dev mode, silently pass through to network - don't cache errors
      // Check if we're in development (localhost or 127.0.0.1)
      const isDev = self.location.hostname === 'localhost' || 
                    self.location.hostname === '127.0.0.1' ||
                    self.location.hostname.includes('::');
      
      if (isDev) {
        // In dev mode, just rethrow to let browser handle it
        // Don't log errors in dev mode as they're expected
        throw fetchError;
      }
      
      // In production, log and handle gracefully
      console.warn('[SW] Cache First network fetch failed:', request.url);
      
      // Try to return cached version even if it's not an exact match
      const anyCached = await cache.match(request.url);
      if (anyCached) {
        return anyCached;
      }
      
      // For HTML requests, return root as fallback (Next.js App Router)
      if (request.headers.get('accept')?.includes('text/html')) {
        const fallback = await cache.match('/');
        if (fallback) return fallback;
      }
      
      throw fetchError;
    }
  } catch (error) {
    // Only log errors in production
    const isDev = self.location.hostname === 'localhost' || 
                  self.location.hostname === '127.0.0.1' ||
                  self.location.hostname.includes('::');
    
    if (!isDev) {
    console.error('[SW] Cache First error:', error);
    }
    
    // Re-throw to let browser handle it naturally
    throw error;
  }
}

// Network First Strategy - for HTML and API
async function networkFirst(request, cacheName, maxAge = CACHE_DURATIONS.html) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Silently handle fetch errors - don't log to console
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // For HTML requests, return root as fallback (Next.js App Router)
    if (request.headers.get('accept')?.includes('text/html')) {
      const fallback = await cache.match('/');
      if (fallback) return fallback;
    }

    throw error;
  }
}

// Message handler for cache updates
self.addEventListener('message', (event) => {
  // Handle message immediately to prevent channel timeout
  if (!event.data || typeof event.data !== 'object') {
    return;
  }

  // Helper function to safely send message response
  const safePostMessage = (data) => {
    try {
      // Only respond if we have an open port (our messages)
      // Chrome extensions may send messages without ports
      if (event.ports && Array.isArray(event.ports) && event.ports.length > 0) {
        const port = event.ports[0];
        if (port && typeof port.postMessage === 'function') {
          port.postMessage(data);
        }
      }
    } catch (error) {
      // Port may be closed or invalid, ignore silently
      // This prevents "message channel closed" errors from Chrome extensions
    }
  };

  // Only handle our known message types
  // Ignore Chrome extension messages and other unknown types
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    safePostMessage({ success: true });
    return;
  }
  
  if (event.data.type === 'CACHE_URLS') {
    // Use waitUntil for async operations but don't block response
    event.waitUntil(
      caches.open(STATIC_CACHE).then((cache) => {
        // Cache each URL individually to handle errors gracefully
        return Promise.allSettled(
          (event.data.urls || []).map(url =>
            fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                } else {
                  console.warn('[SW] Failed to cache URL (not found):', url);
                }
              })
              .catch((error) => {
                console.warn('[SW] Failed to cache URL:', url, error.message);
              })
          )
        );
      }).catch((error) => {
        console.warn('[SW] Cache URLs error:', error);
      })
    );
    // Send immediate response
    safePostMessage({ success: true });
    return;
  }

  // Ignore all other message types (likely from Chrome extensions)
  // Don't send response to avoid "message channel closed" errors
});

