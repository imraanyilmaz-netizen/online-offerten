import type { MetadataRoute } from 'next'

/**
 * Einzige Quelle für /robots.txt.
 * Abgestimmt mit app/sitemap.ts: keine URLs in der Sitemap, die hier disallow sind.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin-dashboard',
          '/partner/dashboard',
          '/partner/einstellungen',
          '/partner/credit-top-up',
          '/partner/payment-status',
          '/payment/success',
          '/payment/cancel',
          '/login',
          '/forgot-password',
          '/update-password',
          '/email-confirmed',
          '/post',
          '/bewertung/',
          '/anfrage-status',
        ],
      },
    ],
    sitemap: 'https://online-offerten.ch/sitemap.xml',
    host: 'https://online-offerten.ch',
  }
}
