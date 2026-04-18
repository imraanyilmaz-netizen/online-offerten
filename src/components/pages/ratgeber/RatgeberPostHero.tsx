import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users } from 'lucide-react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

function formatArticleDate(value?: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('de-CH', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export type RatgeberPostHeroProps = {
  title: string
  category?: string | null
  publishedAt?: string | null
  createdAt?: string | null
  metaDescription?: string | null
  featuredImageUrl?: string | null
}

export function RatgeberPostHero({
  title,
  category,
  publishedAt,
  createdAt,
  metaDescription,
  featuredImageUrl,
}: RatgeberPostHeroProps) {
  const dateLabel = formatArticleDate(publishedAt ?? createdAt)
  const excerptRaw = metaDescription?.trim()
  const excerpt =
    excerptRaw && excerptRaw.length > 0
      ? excerptRaw
      : 'Praxisnahe Tipps und Orientierung für Ihre Planung — kompakt aufbereitet.'
  const hasImage = Boolean(featuredImageUrl?.trim())

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-slate-950">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[360px] w-[360px] rounded-full bg-emerald-500/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-[320px] w-[320px] rounded-full bg-teal-400/15 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_35%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14">
        <nav aria-label="Brotkrumen" className="mb-10 text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Start
              </Link>
            </li>
            <li className="text-slate-600" aria-hidden>
              /
            </li>
            <li>
              <Link href="/ratgeber" className="transition-colors hover:text-white">
                Ratgeber
              </Link>
            </li>
            <li className="text-slate-600" aria-hidden>
              /
            </li>
            <li className="max-w-[min(100%,18rem)] truncate font-medium text-slate-200" title={title}>
              {title}
            </li>
          </ol>
        </nav>

        <div
          className={`grid gap-10 lg:items-center ${hasImage ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]' : ''}`}
        >
          <div className="min-w-0">
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-emerald-300/90">
              Ratgeber
            </p>
            {category ? (
              <Badge
                variant="outline"
                className="mb-4 border-emerald-400/35 bg-emerald-500/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-emerald-100"
              >
                {category}
              </Badge>
            ) : null}
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.08]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 line-clamp-4 md:text-lg">{excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-white/12 to-white/5 text-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                  aria-hidden
                >
                  <Users className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Autor</p>
                  <p className="text-sm font-medium text-slate-100 sm:text-base">Online Offerten Team</p>
                </div>
              </div>
              {dateLabel ? (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                  <time dateTime={publishedAt ?? createdAt ?? undefined}>{dateLabel}</time>
                </div>
              ) : null}
            </div>
          </div>

          {hasImage ? (
            <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
                <div className="absolute inset-0 [&>picture]:block [&>picture]:h-full [&>picture]:w-full">
                  <ImageWithFallback
                    src={featuredImageUrl ?? undefined}
                    alt={title}
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          ) : null}
        </div>

        {!hasImage ? (
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" aria-hidden />
        ) : null}
      </div>

      {!hasImage ? (
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="-mb-px flex justify-center">
            <div className="h-24 w-full max-w-2xl rounded-t-3xl bg-gradient-to-b from-white/[0.04] to-transparent" aria-hidden />
          </div>
        </div>
      ) : null}
    </header>
  )
}
