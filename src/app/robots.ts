import type { MetadataRoute } from 'next'

/**
 * Einzige Quelle für /robots.txt.
 * Abgestimmt mit app/sitemap.ts: keine URLs in der Sitemap, die hier disallow sind.
 */
const sharedDisallow = [
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
]

const explicitlyAllowedBots = [
  // Google
  'Googlebot',
  // Google AI (Gemini / Bard / Vertex AI training)
  'Google-Extended',
  // Bing / Microsoft Copilot
  'Bingbot',
  'msnbot',
  // OpenAI (GPT training)
  'GPTBot',
  // ChatGPT browsing
  'ChatGPT-User',
  // Anthropic (Claude)
  'anthropic-ai',
  'ClaudeBot',
  'Claude-Web',
  // Perplexity
  'PerplexityBot',
  // Amazon
  'Amazonbot',
  // Cohere
  'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: sharedDisallow,
      },
      ...explicitlyAllowedBots.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: sharedDisallow,
      })),
    ],
    sitemap: 'https://online-offerten.ch/sitemap.xml',
    host: 'https://online-offerten.ch',
  }
}
