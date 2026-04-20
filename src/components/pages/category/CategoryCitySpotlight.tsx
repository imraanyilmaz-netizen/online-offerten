'use client'

import type { FC } from 'react'
import { Landmark, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CategoryCitySpotlightData = {
  kicker: string
  title: string
  paragraphs: string[]
  /** Short facts for a scannable grid; omit or empty for text-only */
  highlights?: { label: string; value: string }[] | null
}

type Props = {
  categorySlug: string
  data: CategoryCitySpotlightData
}

function categoryAccentGradient(categorySlug: string): string {
  if (categorySlug === 'reinigungsfirma') return 'from-sky-500 to-blue-600'
  if (categorySlug === 'malerfirma') return 'from-violet-500 to-fuchsia-600'
  return 'from-emerald-500 to-teal-600'
}

function categoryBorderTint(categorySlug: string): string {
  if (categorySlug === 'reinigungsfirma')
    return 'border-sky-200/90 dark:border-sky-800/55'
  if (categorySlug === 'malerfirma')
    return 'border-violet-200/90 dark:border-violet-800/55'
  return 'border-emerald-200/90 dark:border-emerald-800/55'
}

function categoryGlow(categorySlug: string): string {
  if (categorySlug === 'reinigungsfirma')
    return 'bg-sky-400/25 dark:bg-sky-500/30'
  if (categorySlug === 'malerfirma')
    return 'bg-violet-400/25 dark:bg-violet-500/30'
  return 'bg-emerald-400/25 dark:bg-emerald-500/30'
}

const CategoryCitySpotlight: FC<Props> = ({ categorySlug, data }) => {
  const accentGrad = categoryAccentGradient(categorySlug)
  const borderTint = categoryBorderTint(categorySlug)
  const glow = categoryGlow(categorySlug)
  const highlights = data.highlights?.filter((h) => h.label && h.value) ?? []

  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/70 bg-slate-50/50 py-14 dark:border-border dark:bg-background md:py-20"
      aria-labelledby="city-spotlight-heading"
    >
      <div
        className={cn(
          'pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full blur-3xl opacity-50 dark:opacity-[0.35]',
          glow
        )}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div
          className={cn(
            'relative overflow-hidden rounded-[1.65rem] border bg-white/85 shadow-[0_24px_56px_-28px_rgba(15,23,42,0.14)] backdrop-blur-md',
            'ring-1 ring-slate-900/[0.04]',
            'dark:border-border/90 dark:bg-card/95 dark:shadow-[0_24px_56px_-28px_rgba(0,0,0,0.55)] dark:ring-white/[0.08]',
            borderTint
          )}
        >
          <div
            className={cn(
              'absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.08]'
            )}
            aria-hidden
          />
          <div
            className={cn(
              'absolute left-8 top-0 h-1 w-32 rounded-b-full bg-gradient-to-r shadow-sm sm:left-10 md:left-12',
              accentGrad
            )}
            aria-hidden
          />
          <div className="relative grid gap-10 p-8 sm:p-10 md:grid-cols-12 md:gap-12 md:p-12 lg:p-14">
            <div className={cn(highlights.length > 0 ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-12')}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                <span
                  className={cn(
                    'inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ring-1 ring-white/25',
                    'dark:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.5)] dark:ring-white/20',
                    accentGrad
                  )}
                >
                  <Landmark className="h-6 w-6 drop-shadow-sm dark:drop-shadow-md" aria-hidden />
                </span>
                <div className="min-w-0 space-y-4">
                  <p
                    className={cn(
                      'inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em]',
                      categorySlug === 'reinigungsfirma' &&
                        'border-sky-200/90 bg-sky-50/90 text-sky-900 dark:border-sky-800/55 dark:bg-sky-950/35 dark:text-sky-200',
                      categorySlug === 'malerfirma' &&
                        'border-violet-200/90 bg-violet-50/90 text-violet-950 dark:border-violet-800/55 dark:bg-violet-950/35 dark:text-violet-200',
                      (categorySlug === 'umzugsfirma' ||
                        !['reinigungsfirma', 'malerfirma'].includes(categorySlug)) &&
                        'border-emerald-200/90 bg-emerald-50/90 text-emerald-950 dark:border-emerald-800/55 dark:bg-emerald-950/35 dark:text-emerald-200'
                    )}
                  >
                    <Sparkles className="h-3 w-3 opacity-85 dark:opacity-100" aria-hidden />
                    {data.kicker}
                  </p>
                  <h2
                    id="city-spotlight-heading"
                    className="text-balance text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-3xl"
                  >
                    {data.title}
                  </h2>
                  <div className="space-y-4">
                    {data.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className={cn(
                          'max-w-3xl text-[1.04rem] leading-[1.72] text-slate-600 dark:text-muted-foreground md:text-[1.0625rem]',
                          i === 0 && 'font-medium text-slate-800 dark:text-foreground/90'
                        )}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {highlights.length > 0 ? (
              <div className="md:col-span-12 lg:col-span-5">
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {highlights.map((h, i) => (
                    <li
                      key={`${h.label}-${i}`}
                      className={cn(
                        'rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 shadow-sm ring-1 ring-slate-900/[0.03]',
                        'dark:border-border/80 dark:bg-muted/45 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] dark:ring-white/[0.06]'
                      )}
                    >
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-muted-foreground">
                        {h.label}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold leading-snug text-slate-900 dark:text-foreground">
                        {h.value}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryCitySpotlight
