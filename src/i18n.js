import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// URL'den sayfa namespace'ini tespit et
// Sadece müşteri formu için çeviri kullanılıyor
const getPageNamespaceFromPath = (path) => {
  // Form sayfası için newCustomerForm
  if (path.includes('/kostenlose-offerte-anfordern')) {
    return 'newCustomerForm';
  }
  
  return null;
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'de',
    supportedLngs: ['de'],
    fallbackLng: 'de',
    debug: false,
    initImmediate: true, // Non-blocking initialization - render'ı engelleme
    ns: [
      // Sadece müşteri formu için çeviri kullanılıyor
      'newCustomerForm'
    ],
    defaultNS: 'newCustomerForm',
    // Sadece dil kodunu kullan (de, en)
    load: 'languageOnly',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // OPTIMIZATION: Sadece kullanılan namespace'leri yükle (lazy loading)
      // i18next otomatik olarak sadece kullanılan namespace'leri yükler
      requestOptions: {
        cache: 'default', // Browser cache kullan
      },
      // Reload için retry mekanizması
      reloadInterval: false,
    },
    detection: {
      // Path detection removed - we handle URL-based language detection in App.jsx
      // Query string removed - we use URL structure instead of ?lang=en
      order: ['cookie', 'localStorage', 'sessionStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    // Sadece müşteri formu sayfasında çeviri yükle
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const path = window.location.pathname;
        const pageNamespace = getPageNamespaceFromPath(path);
        
        // Sadece müşteri formu sayfasında namespace yükle
        if (pageNamespace) {
          i18n.loadNamespaces(pageNamespace).catch(() => {
            // Hata durumunda sessizce devam et
          });
        }
      }, 0); // Next tick'te yükle - render'ı bloklamasın
    }
  });

export default i18n;