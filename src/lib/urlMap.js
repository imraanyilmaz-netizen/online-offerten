/**
 * URL Mapping: German (DE) to English (EN) URL translations
 * This mapping is used for:
 * - Generating hreflang tags
 * - Language switching
 * - Route generation
 */

// DE → EN URL mapping
const urlMap = {
  // Homepage - removed (no EN route)
  // '/': '/en', // Removed - homepage is DE only
  
  // Service Pages - Moving (removed - these pages are DE only)
  // '/privatumzug': '/private-relocation', // Removed
  // '/geschaeftsumzug': '/business-relocation', // Removed
  '/internationale-umzuege': '/international-moves',
  '/spezialtransporte': '/special-transports',
  '/klaviertransport': '/piano-transport',
  
  // Service Pages - Cleaning (removed - these pages are DE only)
  // '/reinigung': '/cleaning-service', // Removed
  // '/wohnungsreinigung': '/apartment-cleaning', // Removed
  // '/hausreinigung': '/house-cleaning', // Removed
  // '/bueroreinigung': '/office-cleaning', // Removed
  // '/umzugsreinigung': '/move-out-cleaning', // Removed
  // '/unterhaltsreinigung': '/maintenance-cleaning', // Removed
  // '/grundreinigung': '/deep-cleaning', // Removed
  // '/baureinigung': '/construction-cleaning', // Removed
  // '/fensterreinigung': '/window-cleaning', // Removed
  // '/bodenreinigung': '/floor-cleaning', // Removed
  // '/fassadenreinigung': '/facade-cleaning', // Removed
  // '/hofreinigung': '/courtyard-cleaning', // Removed
  // Räumung & Entsorgung - DE only
  // '/raeumung-entsorgung': '/clearance-disposal', // Removed
  
  // Service Pages - Other
  // Malerarbeiten - DE only
  // '/malerarbeiten': '/painting-services', // Removed
  // Gartenarbeiten - DE only
  // '/gartenarbeiten': '/gardening-services', // Removed
  
  // International Moves
  '/umzug-nach-deutschland': '/move-to-germany',
  '/umzug-nach-oesterreich': '/move-to-austria',
  '/umzug-nach-frankreich': '/move-to-france',
  '/umzug-nach-italien': '/move-to-italy',
  '/umzug-nach-spanien': '/move-to-spain',
  '/umzug-nach-portugal': '/move-to-portugal',
  '/umzug-nach-belgien': '/move-to-belgium',
  '/umzug-nach-daenemark': '/move-to-denmark',
  
  // Info Pages
  '/ueber-uns': '/about-us',
  '/kontakt': '/contact',
  '/agb': '/terms',
  '/datenschutz': '/privacy-policy',
  '/services': '/services',
  '/standorte': '/locations',
  '/guenstig-umziehen': '/cheap-moving',
  '/offerten-portal': '/quotes-portal',
  '/umzugsfirma-vergleichen': '/compare-moving-companies',
  '/umzugsfirma-in-der-naehe': '/moving-company-nearby',
  '/reinigungsfirma-in-der-naehe': '/cleaning-company-nearby',
  '/malerfirma-in-der-naehe': '/painter-company-nearby',
  '/partner-suche': '/partner-search',
  '/partner-werden': '/become-partner',
  
  // Tools Pages
  '/ratgeber': '/guide',
  '/checklisten': '/checklists',
  '/umzugskosten-rechner': '/moving-cost-calculator',
  '/reinigungskosten-rechner': '/cleaning-cost-calculator',
  '/kostenlose-offerte-anfordern': '/free-quote-request',
  
  // Location Pages - Moving Companies (Combined Services removed - using Umzugsfirma pages instead)
  '/umzugsfirma-aargau': '/moving-company-aargau',
  '/umzugsfirma-basel': '/moving-company-basel',
  '/umzugsfirma-bern': '/moving-company-bern',
  '/umzugsfirma-biel-bienne': '/moving-company-biel-bienne',
  '/umzugsfirma-freiburg': '/moving-company-freiburg',
  '/umzugsfirma-genf': '/moving-company-geneva',
  '/umzugsfirma-lausanne': '/moving-company-lausanne',
  '/umzugsfirma-lugano': '/moving-company-lugano',
  '/umzugsfirma-luzern': '/moving-company-lucerne',
  '/umzugsfirma-st-gallen': '/moving-company-st-gallen',
  '/umzugsfirma-thun': '/moving-company-thun',
  '/umzugsfirma-zuerich': '/moving-company-zurich',
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
  // Homepage, privatumzug, geschaeftsumzug, reinigung, wohnungsreinigung, and raeumung-entsorgung no longer have EN versions
  const deOnlyPages = [
    '/', '/privatumzug', '/geschaeftsumzug', '/reinigung', '/wohnungsreinigung',
    '/hausreinigung', '/bueroreinigung', '/umzugsreinigung', '/unterhaltsreinigung',
    '/grundreinigung', '/baureinigung', '/fensterreinigung', '/bodenreinigung',
    '/fassadenreinigung', '/hofreinigung', '/raeumung-entsorgung', '/gartenarbeiten', '/malerarbeiten'
  ];
  if (deOnlyPages.includes(currentUrl)) {
    return null; // No alternate URL
  }
  
  if (currentUrl === '/en') {
    return '/';
  }
  
  if (isGermanUrl(currentUrl)) {
    return getEnglishUrl(currentUrl);
  }
  
  if (isEnglishUrl(currentUrl)) {
    return getGermanUrl(currentUrl);
  }
  
  return null;
};

/**
 * Get language from URL
 * @param {string} url - URL path
 * @returns {'de'|'en'} - Language code
 */
export const getLanguageFromUrl = (url) => {
  if (url === '/en' || isEnglishUrl(url)) {
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
  // If already English URL, return as is
  if (isEnglishUrl(deUrl)) {
    return deUrl;
  }
  
  // If current language is English, get English URL
  if (currentLang === 'en') {
    const enUrl = getEnglishUrl(deUrl);
    return enUrl || deUrl; // Fallback to DE if no mapping exists
  }
  
  // Otherwise return German URL
  return deUrl;
};

// Export both mappings for direct access if needed
export { urlMap, reverseUrlMap };
export default urlMap;

