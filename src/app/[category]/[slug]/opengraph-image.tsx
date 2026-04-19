import { notFound } from 'next/navigation'
import { createCategoryCatchAllOgResponse } from '@/lib/categoryCatchAllOg'
import { resolveCategoryCatchAll } from '@/lib/categoryCatchAllResolve'

export const runtime = 'edge'

export const alt = 'Online-Offerten.ch – Seitenvorschau'

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const resolved = resolveCategoryCatchAll(category, [slug])
  if (!resolved) notFound()
  return createCategoryCatchAllOgResponse(resolved)
}
