import { usePathname } from 'next/navigation';
import React from 'react';
import { Helmet } from 'react-helmet-async';
// Removed useTranslation and URL mapping - DE-only

const SEO = ({ title, description, ogImageUrl, schemaMarkup, keywords, ogType = 'website', noIndex = false, canonicalUrl: propCanonicalUrl }) => {
  const pathname = usePathname();
  // Removed useSearchParams - not used in SEO component, only pathname is needed
  // Removed useTranslation - DE-only
  
  // Canonical URL'i normalize et (küçük harfe çevir ve query parametrelerini kaldır)
  const normalizePath = (path) => {
    return path.toLowerCase().split('?')[0];
  };
  
  // Sabit domain kullan (SSR ve bot taramaları için)
  const baseUrl = 'https://online-offerten.ch';
  
  // Canonical URL'i normalize et - hem prop hem de pathname için
  const normalizeUrl = (url) => {
    if (!url) return null;
    
    // URL zaten baseUrl ile başlıyorsa, sadece path'i normalize et
    if (url.startsWith(baseUrl)) {
      const path = url.substring(baseUrl.length);
      // Boş path veya sadece "/" ise, ana sayfa için "/" döndür
      if (!path || path === '/' || path.trim() === '') {
        return `${baseUrl}/`;
      }
      const normalizedPath = normalizePath(path);
      // Normalize edilmiş path boş veya "/" ise, ana sayfa döndür
      if (!normalizedPath || normalizedPath === '/') {
        return `${baseUrl}/`;
      }
      return `${baseUrl}${normalizedPath}`;
    }
    
    // URL değilse veya farklı domain ise, path'i çıkar ve normalize et
    try {
      const urlObj = new URL(url);
      const normalizedPath = normalizePath(urlObj.pathname);
      // Ana sayfa için özel durum
      if (!normalizedPath || normalizedPath === '/') {
        return `${baseUrl}/`;
      }
      return `${baseUrl}${normalizedPath}`;
    } catch {
      // URL formatında değilse, direkt normalize et ve baseUrl ekle
      const normalizedPath = normalizePath(url);
      // Ana sayfa için özel durum
      if (!normalizedPath || normalizedPath === '/') {
        return `${baseUrl}/`;
      }
      return normalizedPath.startsWith('/') 
        ? `${baseUrl}${normalizedPath}` 
        : `${baseUrl}/${normalizedPath}`;
    }
  };
  
  // Get canonical URL - use prop if provided, otherwise generate from pathname
  const getCanonicalUrl = () => {
    if (propCanonicalUrl) {
      return normalizeUrl(propCanonicalUrl);
    }
    
    const normalizedPath = normalizePath(pathname);
    // Ana sayfa için özel durum
    if (!normalizedPath || normalizedPath === '/') {
      return `${baseUrl}/`;
    }
    return `${baseUrl}${normalizedPath}`;
  };
  
  const canonicalUrl = getCanonicalUrl();
  
  // Removed alternate URLs logic - DE-only
  // Use canonical URL for OG/Twitter URLs (without query params for cleaner sharing)
  const fullUrl = canonicalUrl;
  
  // Default OG image if not provided - 3 professionals illustration (Umzug, Reinigung, Maler)
  const defaultOgImage = ogImageUrl || 'https://online-offerten.ch/image/online-offerten.webp';
  
  // DE-only - no alternate URLs
  
  // Robots meta tag based on noIndex prop
  const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow';
  const googlebotContent = noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  
  return (
    <Helmet>
      <html lang="de" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={googlebotContent} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Online-Offerten.ch" />
      <meta property="og:locale" content="de_CH" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />
      
      {/* WhatsApp - uses og:image but we ensure it's set */}
      <meta property="og:image:secure_url" content={defaultOgImage} />
      <meta property="og:image:type" content="image/png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang tags - DE-only */}
      <link rel="alternate" hreflang="de" href={canonicalUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
      
      {/* Structured Data */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;