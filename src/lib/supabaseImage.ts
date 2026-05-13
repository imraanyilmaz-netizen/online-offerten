// Supabase Image Transformations helpers.
//
// Mevcut public URL'leri parse edip render endpoint'i ile yeniden boyutlandırılmış
// (WebP/AVIF) versiyonlarını üretir. Sonuç URL'ler Supabase CDN'inden gelir, Vercel
// image-optimization kotasını harcamaz.

import { createClient } from '@/src/lib/supabase/client'

export type SupabaseImageBucket =
  | 'partner-logos'
  | 'partner-hero-images'
  | 'partner-gallery-images'
  | 'posts-images'

export interface SupabaseTransformOptions {
  width?: number
  height?: number
  quality?: number
  resize?: 'cover' | 'contain' | 'fill'
}

export interface SupabaseImageRef {
  bucket: SupabaseImageBucket
  path: string
}

const SUPPORTED_BUCKETS: readonly SupabaseImageBucket[] = [
  'partner-logos',
  'partner-hero-images',
  'partner-gallery-images',
  'posts-images',
]

const STORAGE_PATH_REGEX = /\/storage\/v1\/(?:object|render\/image)\/public\/([^/]+)\/(.+)$/

function isSupportedBucket(value: string): value is SupabaseImageBucket {
  return (SUPPORTED_BUCKETS as readonly string[]).includes(value)
}

export function isSupabaseStorageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false
  try {
    const u = new URL(url)
    if (!u.hostname.endsWith('.supabase.co')) return false
    return STORAGE_PATH_REGEX.test(u.pathname)
  } catch {
    return false
  }
}

export function parseSupabaseUrl(url: string | null | undefined): SupabaseImageRef | null {
  if (!url || typeof url !== 'string') return null
  try {
    const u = new URL(url)
    if (!u.hostname.endsWith('.supabase.co')) return null
    const match = u.pathname.match(STORAGE_PATH_REGEX)
    if (!match) return null
    const bucket = match[1]
    if (!isSupportedBucket(bucket)) return null
    return { bucket, path: decodeURIComponent(match[2]) }
  } catch {
    return null
  }
}

export function buildSupabaseImageUrl(
  bucket: SupabaseImageBucket,
  path: string,
  opts: SupabaseTransformOptions = {}
): string {
  const supabase = createClient()
  const hasTransform = Boolean(opts.width || opts.height)
  const { data } = supabase.storage.from(bucket).getPublicUrl(path, {
    transform: hasTransform
      ? {
          width: opts.width,
          height: opts.height,
          quality: opts.quality ?? 75,
          resize: opts.resize ?? 'cover',
        }
      : undefined,
  })
  return data.publicUrl
}

/**
 * Mevcut bir Supabase URL'ini alır, transform parametreleriyle yeniden üretir.
 * Supabase URL'i değilse orijinali olduğu gibi döner (statik /public asset'leri için).
 */
export function transformSupabaseUrl(
  url: string | null | undefined,
  opts: SupabaseTransformOptions = {}
): string {
  if (!url) return ''
  const ref = parseSupabaseUrl(url)
  if (!ref) return url
  return buildSupabaseImageUrl(ref.bucket, ref.path, opts)
}

/**
 * srcSet üretir: aynı resmi farklı genişliklerde transform eder.
 * <img srcSet={...} sizes={...} /> ile kullanılabilir.
 */
export function buildSupabaseSrcSet(
  url: string | null | undefined,
  widths: number[],
  opts: Omit<SupabaseTransformOptions, 'width'> = {}
): string | undefined {
  if (!url) return undefined
  const ref = parseSupabaseUrl(url)
  if (!ref) return undefined
  return widths
    .map((w) => `${buildSupabaseImageUrl(ref.bucket, ref.path, { ...opts, width: w })} ${w}w`)
    .join(', ')
}

/**
 * Bucket başına standart preset'ler. Tutarlı boyutlar için.
 */
export const SUPABASE_IMAGE_PRESETS = {
  logoSmall: { width: 64, quality: 80 },
  logoMedium: { width: 128, quality: 80 },
  logoLarge: { width: 256, quality: 80 },
  thumbnail: { width: 400, height: 400, quality: 75, resize: 'cover' as const },
  card: { width: 800, quality: 75 },
  hero: { width: 1600, quality: 80 },
  lightbox: { width: 2000, quality: 85 },
} as const
