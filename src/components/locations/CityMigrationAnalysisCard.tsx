'use client'

import { ArrowDownRight, ArrowUpRight, Info, Lightbulb, ScanLine, Scale, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CityMigrationAnalysis } from '@/lib/stats/migrationStats'

type Props = {
  analysis: CityMigrationAnalysis
  cityName: string
  /** Aktuellster Jahresstand (z. B. 2024). */
  latestYear: number
  /** Vorjahr (z. B. 2023) — wird im Header für den Vergleichshinweis genutzt. */
  previousYear: number | null
  fallbackUsed: boolean
  scopeName: string
  source: {
    publisher: string
    cubeTitle: string
    cubeId: string
    catalogUrl: string
    license: string
  }
}

/**
 * Server-prerendered SEO-Block: dynamische Analyse-Texte + KPI-Highlights.
 * Wird zwischen Hero/Spotlight und MigrationStatsSection eingefügt und
 * macht die zentralen Statistiken sofort suchmaschinenlesbar.
 */
export default function CityMigrationAnalysisCard({
  analysis,
  cityName,
  latestYear,
  previousYear,
  fallbackUsed,
  scopeName,
  source,
}: Props) {
  // Bewusst neutrales Label: nur der aktuellste Datenstand wird angezeigt.
  // Der Vorjahresvergleich folgt im Fliesstext — sonst entsteht der Eindruck,
  // die Headline-Zahl waere bereits eine Delta-/Aenderungsgroesse.
  const periodLabel = `BFS · Datenstand ${latestYear}`
  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-2 pt-10 md:px-6 md:pt-14 lg:px-8"
      aria-labelledby={`migration-analysis-${cityName}`}
    >
      <div
        className={cn(
          'rounded-3xl border border-emerald-200/70 bg-gradient-to-b from-emerald-50/50 via-white to-white px-6 py-8 shadow-[0_24px_56px_-32px_rgba(16,185,129,0.25)] sm:px-8 md:px-10 md:py-10',
          'dark:border-emerald-900/50 dark:from-emerald-950/20 dark:via-card dark:to-card dark:shadow-[0_24px_56px_-32px_rgba(0,0,0,0.6)]'
        )}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div className="lg:flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/85 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-800 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/45 dark:text-emerald-300">
              <ScanLine className="h-3 w-3" aria-hidden />
              {periodLabel}
            </span>
            <h2
              id={`migration-analysis-${cityName}`}
              className="mt-4 text-balance text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground sm:text-[1.7rem] md:text-[1.85rem] md:leading-[1.18]"
            >
              {analysis.headline}
            </h2>
            <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-slate-700 dark:text-foreground/90 md:text-[1.0875rem]">
              {analysis.intro}
            </p>
            <div className="mt-5 space-y-4 text-[0.9875rem] leading-[1.7] text-slate-600 dark:text-muted-foreground md:text-[1.0125rem] md:leading-[1.72]">
              {analysis.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {analysis.localTip ? (
              <aside
                className={cn(
                  'mt-6 rounded-2xl border border-amber-200/70 bg-amber-50/70 px-4 py-4 sm:px-5',
                  'dark:border-amber-900/45 dark:bg-amber-950/20'
                )}
                aria-label={analysis.localTip.headline}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/45 dark:text-amber-300">
                    <Lightbulb className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-800 dark:text-amber-300">
                      {analysis.localTip.headline}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-[1.65] text-amber-950 dark:text-amber-100/90">
                      {analysis.localTip.text}
                    </p>
                  </div>
                </div>
              </aside>
            ) : null}

            {fallbackUsed ? (
              <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-amber-50/80 px-3 py-2 text-xs leading-relaxed text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>
                  Datenbasis: Kanton {scopeName}. Für {cityName} wird derzeit keine separate
                  Gemeinde-Auswertung publiziert.
                </span>
              </p>
            ) : null}
            <p className="mt-4 text-xs text-slate-500 dark:text-muted-foreground/85">
              Quelle:{' '}
              <a
                href={source.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
              >
                {source.publisher}
              </a>{' '}
              — „{source.cubeTitle}" ({source.cubeId}). Lizenz: {source.license}.
            </p>
          </div>

          <aside className="lg:w-[18.5rem] lg:shrink-0" aria-label="Kennzahlen">
            <ul className="grid grid-cols-2 gap-3">
              {analysis.highlights.map((h, idx) => (
                <li
                  key={idx}
                  className={cn(
                    'rounded-2xl border px-4 py-3.5 shadow-sm',
                    h.tone === 'pos' &&
                      'border-emerald-200/80 bg-white dark:border-emerald-900/55 dark:bg-emerald-950/25',
                    h.tone === 'neg' &&
                      'border-rose-200/80 bg-white dark:border-rose-900/55 dark:bg-rose-950/20',
                    h.tone === 'neu' &&
                      'border-slate-200/80 bg-white dark:border-border dark:bg-card/85'
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]',
                      h.tone === 'pos' && 'text-emerald-700 dark:text-emerald-300',
                      h.tone === 'neg' && 'text-rose-700 dark:text-rose-300',
                      h.tone === 'neu' && 'text-slate-600 dark:text-muted-foreground'
                    )}
                  >
                    {h.tone === 'pos' ? (
                      <ArrowDownRight className="h-3 w-3" aria-hidden />
                    ) : h.tone === 'neg' ? (
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    ) : h.label.toLowerCase().includes('saldo') ? (
                      <Scale className="h-3 w-3" aria-hidden />
                    ) : (
                      <TrendingUp className="h-3 w-3" aria-hidden />
                    )}
                    {h.label}
                  </div>
                  <div className="mt-1.5 text-2xl font-bold tabular-nums text-slate-950 dark:text-foreground">
                    {h.value}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
