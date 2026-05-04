'use client'

import Link from 'next/link'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Scale, ScanLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CityMigrationAnalysis } from '@/lib/stats/migrationStats'

type Props = {
  /** Analyse-Resultate (gleiche Quelle wie der Detail-Block weiter unten). */
  analysis: CityMigrationAnalysis
  cityName: string
  yearRange: [number, number]
  fallbackUsed: boolean
  scopeName: string
  /** Anker-ID des ausführlichen Analyse-Blocks für „Mehr erfahren". */
  detailAnchor?: string
}

/**
 * Kompakte KPI-Leiste direkt unter dem Hero — der Nutzer sieht
 * Zuzüge / Wegzüge / Wanderungssaldo / innerkantonalen Anteil
 * sofort, ohne weiter scrollen zu müssen.
 */
export default function CityMigrationKpiStrip({
  analysis,
  cityName,
  yearRange,
  fallbackUsed,
  scopeName,
  detailAnchor = 'migration-analyse',
}: Props) {
  const lastYearLabel = yearRange[1]
  return (
    <section
      className="mx-auto -mt-4 max-w-7xl px-4 pb-2 pt-6 md:px-6 md:pt-8 lg:px-8"
      aria-label={`Schnellüberblick Umzugsstatistik ${cityName}`}
    >
      <div
        className={cn(
          'rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.18)] backdrop-blur',
          'sm:p-5',
          'dark:border-border dark:bg-card/95 dark:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.55)]'
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
            <ScanLine className="h-3 w-3" aria-hidden />
            Umzugs-Schnellüberblick · {lastYearLabel}
            {fallbackUsed ? (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.625rem] font-medium normal-case tracking-normal text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                Datenbasis Kanton {scopeName}
              </span>
            ) : null}
          </div>
          <Link
            href={`#${detailAnchor}`}
            className="group inline-flex items-center gap-1 self-start text-xs font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 sm:self-auto"
          >
            Detailanalyse ansehen
            <ArrowRight
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {analysis.highlights.map((h, idx) => (
            <li
              key={idx}
              className={cn(
                'rounded-xl border px-3.5 py-2.5',
                h.tone === 'pos' &&
                  'border-emerald-200/80 bg-emerald-50/55 dark:border-emerald-900/55 dark:bg-emerald-950/25',
                h.tone === 'neg' &&
                  'border-rose-200/80 bg-rose-50/55 dark:border-rose-900/55 dark:bg-rose-950/22',
                h.tone === 'neu' &&
                  'border-slate-200/80 bg-slate-50/65 dark:border-border dark:bg-muted/40'
              )}
            >
              <div
                className={cn(
                  'flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em]',
                  h.tone === 'pos' && 'text-emerald-700 dark:text-emerald-300',
                  h.tone === 'neg' && 'text-rose-700 dark:text-rose-300',
                  h.tone === 'neu' && 'text-slate-600 dark:text-muted-foreground'
                )}
              >
                {h.tone === 'pos' ? (
                  <ArrowDownRight className="h-3 w-3" aria-hidden />
                ) : h.tone === 'neg' ? (
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                ) : (
                  <Scale className="h-3 w-3" aria-hidden />
                )}
                {h.label}
              </div>
              <div className="mt-1 text-xl font-bold tabular-nums leading-tight text-slate-950 dark:text-foreground sm:text-[1.375rem]">
                {h.value}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
