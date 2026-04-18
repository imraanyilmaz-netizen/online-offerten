import { notFound } from 'next/navigation'
import { resolveCategoryCatchAll } from '@/lib/categoryCatchAllResolve'
import { createCategoryCatchAllOgResponse } from '@/lib/categoryCatchAllOg'

export const categoryCatchAllOgAlt = 'Online-Offerten.ch – Seitenvorschau'

export const categoryCatchAllOgSize = { width: 1200, height: 630 }

export const categoryCatchAllOgContentType = 'image/png'

export async function categoryCatchAllOgImageOneSegment({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const resolved = resolveCategoryCatchAll(category, [slug])
  if (!resolved) notFound()
  return createCategoryCatchAllOgResponse(resolved)
}

export async function categoryCatchAllOgImageTwoSegment({
  params,
}: {
  params: Promise<{ category: string; slug: string; sub: string }>
}) {
  const { category, slug, sub } = await params
  const resolved = resolveCategoryCatchAll(category, [slug, sub])
  if (!resolved) notFound()
  return createCategoryCatchAllOgResponse(resolved)
}
