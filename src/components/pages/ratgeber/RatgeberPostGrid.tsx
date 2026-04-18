'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

const INITIAL = 10
const STEP = 6
const ratgeberBasePath = '/ratgeber'

export type RatgeberGridPost = {
  id: string | number
  slug?: string | null
  title?: string | null
  category?: string | null
  meta_description?: string | null
  featured_image_url?: string | null
  created_at?: string | null
  published_at?: string | null
  read_more_text?: string | null
}

function formatPostDate(value?: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('de-CH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function getReadMoreText(post: RatgeberGridPost) {
  if (post.read_more_text && post.read_more_text.trim() !== '') {
    return post.read_more_text
  }
  return 'Weiterlesen'
}

export default function RatgeberPostGrid({ posts }: { posts: RatgeberGridPost[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL)

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300/90 bg-white/60 px-6 py-16 text-center dark:border-border dark:bg-card/40">
        <p className="text-lg font-medium text-slate-800 dark:text-foreground">Keine Artikel gefunden</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-muted-foreground">
          Passen Sie die Filter in der Seitenleiste an oder alle Artikel anzeigen.
        </p>
        <Button asChild className="mt-6 rounded-xl" variant="outline">
          <Link href="/ratgeber">Alle Artikel</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-8">
        {posts.slice(0, visibleCount).map((post) => {
          if (!post?.slug) return null
          const postHref = `${ratgeberBasePath}/${post.slug}`
          const dateSrc = post.published_at ?? post.created_at

          return (
            <article key={post.id}>
              <Link
                href={postHref}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/95 shadow-[0_2px_24px_-8px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/[0.035] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-[0_22px_48px_-18px_rgba(15,23,42,0.18)] dark:border-border dark:bg-card/95 dark:ring-white/[0.06] dark:hover:border-emerald-800/55"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-muted">
                  <div className="absolute inset-0 [&>picture]:block [&>picture]:h-full [&>picture]:w-full">
                    <ImageWithFallback
                      src={post.featured_image_url ?? undefined}
                      alt={post.title ?? 'Ratgeber-Artikel'}
                      className="h-full w-full object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent mix-blend-multiply dark:from-black/55"
                    aria-hidden
                  />
                  {post.category ? (
                    <div className="absolute left-4 top-4">
                      <Badge
                        variant="outline"
                        className="border-white/40 bg-white/90 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-slate-900 shadow-sm backdrop-blur-sm dark:border-white/20 dark:bg-slate-950/70 dark:text-emerald-100"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-emerald-800 dark:text-foreground dark:group-hover:text-emerald-300">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-muted-foreground">
                    {post.meta_description || 'Lesen Sie mehr in diesem Artikel.'}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-border">
                    <div className="flex items-center text-xs font-medium tabular-nums text-slate-500 dark:text-muted-foreground">
                      <Calendar className="mr-1.5 h-3.5 w-3.5 text-slate-400" aria-hidden />
                      {formatPostDate(dateSrc) || '—'}
                    </div>
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                      {getReadMoreText(post)}
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      {posts.length > visibleCount ? (
        <div className="mt-12 flex justify-center sm:mt-14">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="group rounded-full border-slate-200/90 bg-white px-8 font-semibold text-slate-800 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/80 hover:text-emerald-900 dark:border-border dark:bg-card dark:text-foreground dark:hover:border-emerald-800/60 dark:hover:bg-emerald-950/30"
            onClick={() => setVisibleCount((prev) => prev + STEP)}
          >
            Weitere Artikel laden
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Button>
        </div>
      ) : null}
    </>
  )
}
