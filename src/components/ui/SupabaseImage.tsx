'use client'

import Image, { type ImageProps } from 'next/image'
import { transformSupabaseUrl, type SupabaseTransformOptions } from '@/src/lib/supabaseImage'

/**
 * next/image üzerine ince bir sarmalayıcı.
 *
 * - Supabase Storage URL'i ise: Supabase Image Transformations devreye girer
 *   (WebP/AVIF + resize), `unoptimized` ile Vercel kotası harcanmaz.
 * - Supabase URL'i değilse (örn. /public veya external): normal next/image
 *   davranışı korunur, Vercel optimize eder.
 */
type SupabaseImageProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined
  transform?: SupabaseTransformOptions
  fallbackSrc?: string
}

export default function SupabaseImage({
  src,
  transform,
  fallbackSrc,
  alt,
  ...rest
}: SupabaseImageProps) {
  const finalSrc = (() => {
    if (!src) return fallbackSrc
    const transformed = transformSupabaseUrl(src, transform)
    return transformed || fallbackSrc
  })()

  if (!finalSrc) return null

  // Yalnızca Supabase URL'leri için Vercel'i bypass et.
  const isSupabase = typeof finalSrc === 'string' && finalSrc.includes('.supabase.co/')

  return (
    <Image
      src={finalSrc}
      alt={alt}
      unoptimized={isSupabase}
      {...rest}
    />
  )
}
