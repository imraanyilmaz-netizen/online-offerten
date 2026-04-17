/**
 * Loads Google Maps JavaScript API with the Places library (client-side only).
 * Uses NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
 */

let loadPromise = null;

export function loadGoogleMapsScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only load in the browser'));
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

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      const onReady = () => {
        if (window.google?.maps?.places) {
          resolve();
        } else {
          loadPromise = null;
          reject(new Error('Google Maps script present but Places library unavailable'));
        }
      };
      if (window.google?.maps?.places) {
        onReady();
        return;
      }
      existing.addEventListener('load', onReady, { once: true });
      existing.addEventListener('error', () => {
        loadPromise = null;
        reject(new Error('Google Maps script failed'));
      }, { once: true });
      return;
    }

    const cbName = '__googleMapsPlacesCallback';
    window[cbName] = () => {
      delete window[cbName];
      resolve();
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&callback=${cbName}`;
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
