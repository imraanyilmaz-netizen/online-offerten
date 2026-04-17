/**
 * Loads Google Maps JavaScript API with the Places library (client-side only).
 * Uses NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
 *
 * Billing must be enabled on the Google Cloud project (Maps JavaScript API, Places API, Geocoding as needed).
 * @see https://developers.google.com/maps/documentation/javascript/error-messages#billing-not-enabled-map-error
 */

let loadPromise = null;

/** Set when Google invokes window.gm_authFailure (invalid key, billing disabled, restrictions, …). */
let authFailureReported = false;

export function isGoogleMapsAuthFailed() {
  return authFailureReported;
}

function installAuthFailureHandler() {
  if (typeof window === 'undefined') return;
  if (window.__googleMapsAuthFailureInstalled) return;
  window.__googleMapsAuthFailureInstalled = true;

  const previous = typeof window.gm_authFailure === 'function' ? window.gm_authFailure : null;

  window.gm_authFailure = () => {
    authFailureReported = true;
    loadPromise = null;
    try {
      window.dispatchEvent(new CustomEvent('google-maps-auth-failure'));
    } catch {
      /* ignore */
    }
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[Google Maps] Authentifizierung fehlgeschlagen – Abrechnung/API im Google Cloud Projekt prüfen.',
      );
    }
    if (typeof previous === 'function') previous();
  };
}

export function loadGoogleMapsScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only load in the browser'));
  }
  if (authFailureReported) {
    return Promise.reject(new Error('Google Maps API unavailable (authentication / billing)'));
  }
  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) {
    return Promise.reject(new Error('No Google Maps API key'));
  }

  if (loadPromise) {
    return loadPromise;
  }

  installAuthFailureHandler();

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      const onReady = () => {
        if (authFailureReported) {
          loadPromise = null;
          reject(new Error('Google Maps API authentication failed'));
          return;
        }
        if (window.google?.maps?.places) {
          resolve();
        } else {
          loadPromise = null;
          reject(new Error('Google Maps script present but Places library unavailable'));
        }
      };
      if (window.google?.maps?.places && !authFailureReported) {
        onReady();
        return;
      }
      existing.addEventListener('load', onReady, { once: true });
      existing.addEventListener(
        'error',
        () => {
          loadPromise = null;
          reject(new Error('Google Maps script failed'));
        },
        { once: true },
      );
      return;
    }

    const cbName = '__googleMapsPlacesCallback';
    window[cbName] = () => {
      delete window[cbName];
      if (authFailureReported) {
        loadPromise = null;
        reject(new Error('Google Maps API authentication failed'));
        return;
      }
      resolve();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&loading=async&callback=${cbName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      delete window[cbName];
      loadPromise = null;
      reject(new Error('Failed to load Google Maps'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}
