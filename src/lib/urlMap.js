/**
 * URL Mapping: German (DE) to English (EN) URL translations
 * This mapping is used for:
 * - Generating hreflang tags
 * - Language switching
 * - Route generation
 */

// DE → EN URL mapping
// Only /free-quote-request is kept as it has actual content
const urlMap = {
  '/kostenlose-offerte-anfordern': '/free-quote-request',
};

// Create reverse mapping (EN → DE) for easy lookup
const reverseUrlMap = Object.fromEntries(
  Object.entries(urlMap).map(([de, en]) => [en, de])
);

/**
 * Get English URL from German URL
 * @param {string} deUrl - German URL path
 * @returns {string|null} - English URL path or null if not found
 */
export const getEnglishUrl = (deUrl) => {
  return urlMap[deUrl] || null;
};

/**
 * Get German URL from English URL
 * @param {string} enUrl - English URL path
 * @returns {string|null} - German URL path or null if not found
 */
export const getGermanUrl = (enUrl) => {
  return reverseUrlMap[enUrl] || null;
};

/**
 * Check if URL is English version
 * @param {string} url - URL path to check
 * @returns {boolean} - True if URL is English version
 */
export const isEnglishUrl = (url) => {
  return reverseUrlMap.hasOwnProperty(url);
};

/**
 * Check if URL is German version
 * @param {string} url - URL path to check
 * @returns {boolean} - True if URL is German version
 */
export const isGermanUrl = (url) => {
  return urlMap.hasOwnProperty(url);
};

/**
 * Get alternate URL (opposite language)
 * @param {string} currentUrl - Current URL path
 * @returns {string|null} - Alternate language URL or null if not found
 */
export const getAlternateUrl = (currentUrl) => {
  // Only /free-quote-request has an English version
  if (currentUrl === '/kostenlose-offerte-anfordern') {
    return '/free-quote-request';
  }
  
  if (currentUrl === '/free-quote-request') {
    return '/kostenlose-offerte-anfordern';
  }
  
  // All other pages are DE-only
  return null;
};

/**
 * Get language from URL
 * @param {string} url - URL path
 * @returns {'de'|'en'} - Language code
 */
export const getLanguageFromUrl = (url) => {
  // Only /free-quote-request is English
  if (url === '/free-quote-request') {
    return 'en';
  }
  return 'de';
};

/**
 * Get localized URL based on current language
 * @param {string} deUrl - German URL path (e.g., '/wohnungsreinigung')
 * @param {string} currentLang - Current language ('de' or 'en')
 * @returns {string} - Localized URL path
 */
export const getLocalizedUrl = (deUrl, currentLang) => {
  // Only /kostenlose-offerte-anfordern has English version
  if (deUrl === '/kostenlose-offerte-anfordern' && currentLang === 'en') {
    return '/free-quote-request';
  }
  
  if (deUrl === '/free-quote-request' && currentLang === 'de') {
    return '/kostenlose-offerte-anfordern';
  }
  
  // All other pages are DE-only
  return deUrl;
};

// Export both mappings for direct access if needed
export { urlMap, reverseUrlMap };
export default urlMap;

