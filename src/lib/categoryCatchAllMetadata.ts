import type { Metadata } from 'next'
import { resolveCategoryCatchAll } from '@/lib/categoryCatchAllResolve'

export function buildCategoryCatchAllMetadata(
  rawCategory: string,
  segments: string[],
): Metadata {
  const resolved = resolveCategoryCatchAll(rawCategory, segments)
  if (!resolved) return { title: 'Seite nicht gefunden' }

  const { title, description, canonical } = resolved
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Online-Offerten.ch',
      locale: 'de_CH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
