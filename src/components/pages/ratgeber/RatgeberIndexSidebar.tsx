import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Clock,
  ListChecks,
  Sparkles,
  Tag,
  LayoutGrid,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export type RatgeberSidebarPost = {
  slug?: string | null
  title?: string | null
  featured_image_url?: string | null
}

export type RatgeberIndexSidebarProps = {
  recentPosts: RatgeberSidebarPost[]
  categories: string[]
  themeTags: { tag: string; count: number }[]
  activeTag: string
  activeCategory: string
}

function filterHref(next: { tag?: string; category?: string }) {
  const params = new URLSearchParams()
  if (next.tag) params.set('tag', next.tag)
  if (next.category) params.set('category', next.category)
  const q = params.toString()
  return q ? `/ratgeber?${q}` : '/ratgeber'
}

export function RatgeberIndexSidebar({
  recentPosts,
  categories,
  themeTags,
  activeTag,
  activeCategory,
}: RatgeberIndexSidebarProps) {
  const filtered = recentPosts.filter((p) => p?.slug)

  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-emerald-50/40 p-6 shadow-[0_2px_28px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] dark:border-border dark:from-card dark:via-card dark:to-emerald-950/25 dark:ring-white/[0.06]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-900/20">
            <Sparkles className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-foreground">
              Offerten vergleichen
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
              Bis zu fünf unverbindliche Angebote von geprüften Anbietern — kostenlos und in wenigen Minuten.
            </p>
          </div>
        </div>
        <Button
          asChild
          className="mt-5 w-full rounded-xl bg-emerald-700 font-semibold text-white shadow-sm hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          <Link href="/kostenlose-offerte-anfordern" rel="noopener noreferrer">
            Jetzt Offerten einholen
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/90 dark:ring-white/[0.05]">
        <div className="flex items-center gap-2 text-slate-900 dark:text-foreground">
          <LayoutGrid className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-muted-foreground">
            Kategorien
          </h2>
        </div>
        <ul className="mt-4 space-y-1">
          <li>
            <Link
              href="/ratgeber"
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                !activeCategory && !activeTag
                  ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200'
                  : 'text-slate-700 hover:bg-slate-50 dark:text-foreground dark:hover:bg-muted/60'
              }`}
            >
              Alle Artikel
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
            </Link>
          </li>
          {categories.map((cat) => {
            const on = activeCategory === cat
            return (
              <li key={cat}>
                <Link
                  href={filterHref({ category: cat })}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    on
                      ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-foreground dark:hover:bg-muted/60'
                  }`}
                >
                  <span className="line-clamp-1">{cat}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {themeTags.length > 0 ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/90 dark:ring-white/[0.05]">
          <div className="flex items-center gap-2 text-slate-900 dark:text-foreground">
            <Tag className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-muted-foreground">
              Schlagwörter
            </h2>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {themeTags.map(({ tag, count }) => {
              const on = activeTag === tag
              return (
                <li key={tag}>
                  <Link
                    href={filterHref({ tag })}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                      on
                        ? 'border-emerald-500/60 bg-emerald-600 text-white dark:border-emerald-400/50 dark:bg-emerald-600'
                        : 'border-slate-200/90 bg-slate-50/80 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/80 dark:border-border dark:bg-muted/50 dark:text-foreground dark:hover:border-emerald-800/60'
                    }`}
                  >
                    {tag}
                    <span className="tabular-nums opacity-70">{count}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-border dark:bg-muted/20">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-muted-foreground">
          Hilfreiche Tools
        </h2>
        <div className="mt-4 space-y-2">
          <Button
            asChild
            variant="outline"
            className="h-auto w-full justify-start gap-3 rounded-xl border-slate-200/90 bg-white py-3 text-left font-medium shadow-sm hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-border dark:bg-card dark:hover:border-emerald-800/60"
          >
            <Link href="/umzugsfirma/umzugskosten">
              <Calculator className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden />
              <span>Umzugskosten-Rechner</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto w-full justify-start gap-3 rounded-xl border-slate-200/90 bg-white py-3 text-left font-medium shadow-sm hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-border dark:bg-card dark:hover:border-emerald-800/60"
          >
            <Link href="/reinigung/reinigungskosten">
              <Calculator className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden />
              <span>Reinigungskosten-Rechner</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto w-full justify-start gap-3 rounded-xl border-slate-200/90 bg-white py-3 text-left font-medium shadow-sm hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-border dark:bg-card dark:hover:border-emerald-800/60"
          >
            <Link href="/umzugsfirma/checklists">
              <ListChecks className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden />
              <span>Umzugs-Checklisten</span>
            </Link>
          </Button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/90 dark:ring-white/[0.05]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-muted-foreground">
              Zuletzt veröffentlicht
            </h2>
          </div>
          <ol className="mt-5 space-y-5">
            {filtered.map((post, index) => {
              const href = `/ratgeber/${post.slug}`
              return (
                <li key={post.slug ?? index} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[0.6875rem] font-bold text-white dark:bg-slate-800">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={href}
                      className="group flex gap-3 rounded-lg outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
                    >
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-900/[0.06] dark:bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            post.featured_image_url ||
                            'https://online-offerten.ch/image/online-offerten.webp'
                          }
                          alt=""
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          width={80}
                          height={56}
                          loading="lazy"
                          decoding="async"
                          aria-hidden
                        />
                      </div>
                      <span className="line-clamp-2 text-sm font-medium leading-snug text-slate-900 transition-colors group-hover:text-emerald-800 dark:text-foreground dark:group-hover:text-emerald-300">
                        {post.title}
                      </span>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      ) : null}
    </aside>
  )
}
