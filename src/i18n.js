import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// URL'den sayfa namespace'ini tespit et
// Sadece mevcut çeviri dosyalarına karşılık gelen namespace'leri döndür
const getPageNamespaceFromPath = (path) => {
  // Dil prefix'ini kaldır
  const cleanPath = path.replace(/^\/en\//, '/').replace(/^\/en$/, '/');
  
  // Sadece mevcut namespace'ler:
  // - internationaleUmzugPage (auslandumzug sayfası için)
  // - locationPageNav (location sayfaları için)
  // - newCustomerForm (form sayfası için)
  
  if (cleanPath.includes('/internationale-umzuege') || cleanPath.includes('/internationaler-umzug')) {
    return 'internationaleUmzugPage';
  }
  
  // Location sayfaları için locationPageNav
  if (cleanPath.includes('/umzugsfirma-')) {
    return 'locationPageNav';
  }
  
  // Form sayfası için newCustomerForm
  if (cleanPath.includes('/kostenlose-offerte-anfordern') || cleanPath.includes('/free-quote-request')) {
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
    supportedLngs: ['de', 'en'],
    fallbackLng: 'de',
    debug: false,
    initImmediate: true, // Non-blocking initialization - render'ı engelleme
    ns: [
      // Sadece mevcut çeviri dosyalarına karşılık gelen namespace'ler
      'translation', 
      'common', 
      'navbar', 
      'newCustomerForm',
      'internationaleUmzugPage',
      'locationPageNav'
    ],
    defaultNS: 'translation',
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
    // PERFORMANCE: Sadece EN KRİTİK namespace'leri initial load'da yükle
    // Diğer namespace'ler lazy load edilecek
    const criticalNamespaces = ['translation', 'navbar']; // Sadece 2 kritik namespace
    
    // Initial load için sadece kritik namespace'leri yükle (non-blocking)
    Promise.all(
      criticalNamespaces.map(ns => i18n.loadNamespaces(ns).catch(() => {
        // Hata durumunda sessizce devam et
      }))
    );
    
    // Sayfa-specific namespace'leri lazy load et (non-blocking)
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const path = window.location.pathname;
    const cleanPath = path.replace(/^\/en\//, '/').replace(/^\/en$/, '/');
    const pageNamespace = getPageNamespaceFromPath(path);
    
        const additionalNamespaces = ['common'];
        if (pageNamespace) {
          additionalNamespaces.push(pageNamespace);
        }
    
        // Lazy load additional namespaces (non-blocking)
        additionalNamespaces.forEach(ns => {
          i18n.loadNamespaces(ns).catch(() => {
        // Hata durumunda sessizce devam et
          });
        });
      }, 0); // Next tick'te yükle - render'ı bloklamasın
    }
  });

export default i18n;