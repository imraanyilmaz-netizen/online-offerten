import { getAlternateUrl, getLanguageFromUrl } from './urlMap';
import { useRouter } from 'next/navigation';

/**
 * Switch language by changing URL (Next.js version)
 * @param {string} currentPath - Current URL pathname
 * @param {'de'|'en'} targetLang - Target language
 * @param {Function} router - Next.js router.push function
 */
export const switchLanguage = (currentPath, targetLang, router) => {
  const currentLang = getLanguageFromUrl(currentPath);
  
  // If already in target language, do nothing
  if (currentLang === targetLang) {
    return;
  }
  
  // Get alternate URL from mapping
  const alternatePath = getAlternateUrl(currentPath);
  
  if (alternatePath) {
    // Navigate to alternate language URL using Next.js router
    router.push(alternatePath);
  } else {
    // For dynamic routes without mapping (e.g., /partner/:slug, /ratgeber/:slug)
    // Keep the same URL but change language via i18n
    // This is handled by AppClient.tsx
    console.warn(`No alternate URL found for: ${currentPath}`);
  }
};

/**
 * React hook for language switching (Next.js version)
 * @returns {Function} - switchLanguage function bound to router
 */
export const useLanguageSwitcher = () => {
  const router = useRouter();
  
  return (currentPath, targetLang) => {
    switchLanguage(currentPath, targetLang, router);
  };
};

export default switchLanguage;

