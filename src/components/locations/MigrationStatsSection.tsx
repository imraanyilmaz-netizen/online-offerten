'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type TooltipItem,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { useTheme } from 'next-themes'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  ExternalLink,
  Info,
  Loader2,
  Scale,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
)

type ApiPayload = {
  scope: 'gemeinde' | 'kanton'
  scopeName: string
  fallbackUsed: boolean
  yearRange: [number, number]
  metrics: {
    years: number[]
    zuzuege: number[]
    wegzuege: number[]
    saldo: number[]
    intrakantonalZu: number[]
    intrakantonalWeg: number[]
  }
  source: {
    publisher: string
    publisherShort: string
    cubeId: string
    cubeTitle: string
    catalogUrl: string
    opendataSwiss: string
    license: string
    displayName: string
  }
}

type Props = {
  /** Slug aus dem URL (entspricht `locations[].slug`). */
  citySlug: string
  /** Anzeige-Name (z. B. "Zug", "Zürich"). */
  cityName: string
  /** Wieviele Jahre rückwärts maximal anzeigen. */
  windowYears?: number
}

export default function MigrationStatsSection({
  citySlug,
  cityName,
  windowYears = 10,
}: Props) {
  const { resolvedTheme } = useTheme()
  const [data, setData] = useState<ApiPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setData(null)
    ;(async () => {
      try {
        const res = await fetch(`/api/stats/migration/${encodeURIComponent(citySlug)}`, {
          cache: 'no-store',
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Laden fehlgeschlagen')
        if (!cancelled) setData(json as ApiPayload)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Fehler')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [citySlug])

  const tickColor = resolvedTheme === 'dark' ? '#a1a1aa' : '#52525b'
  const gridColor = resolvedTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)'
  const legendColor = resolvedTheme === 'dark' ? '#e4e4e7' : '#3f3f46'

  const recentSlice = useMemo(() => {
    if (!data) return null
    const m = data.metrics
    const total = m.years.length
    const start = Math.max(0, total - windowYears)
    return {
      years: m.years.slice(start),
      zuzuege: m.zuzuege.slice(start),
      wegzuege: m.wegzuege.slice(start),
      saldo: m.saldo.slice(start),
      intrakantonalZu: m.intrakantonalZu.slice(start),
      intrakantonalWeg: m.intrakantonalWeg.slice(start),
    }
  }, [data, windowYears])

  const balanceChart = useMemo(() => {
    if (!recentSlice) return null
    return {
      data: {
        labels: recentSlice.years,
        datasets: [
          {
            label: 'Zuzüge',
            data: recentSlice.zuzuege,
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderColor: 'rgba(5, 150, 105, 0.9)',
            borderWidth: 1,
            borderRadius: 6,
            maxBarThickness: 28,
          },
          {
            label: 'Wegzüge',
            data: recentSlice.wegzuege.map((v) => -v),
            backgroundColor: 'rgba(244, 63, 94, 0.6)',
            borderColor: 'rgba(225, 29, 72, 0.85)',
            borderWidth: 1,
            borderRadius: 6,
            maxBarThickness: 28,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: legendColor, font: { size: 12, weight: 600 } },
          },
          tooltip: {
            callbacks: {
              label: (ctx: TooltipItem<'bar'>) =>
                ` ${ctx.dataset.label}: ${Math.abs(Number(ctx.parsed.y) || 0).toLocaleString('de-CH')}`,
            },
          },
        },
        scales: {
          x: {
            stacked: false,
            grid: { display: false },
            ticks: { color: tickColor, font: { size: 12 } },
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              callback: (v) => Math.abs(Number(v)).toLocaleString('de-CH'),
            },
          },
        },
      } satisfies ChartOptions<'bar'>,
    }
  }, [recentSlice, tickColor, gridColor, legendColor])

  const trendChart = useMemo(() => {
    if (!recentSlice) return null
    return {
      data: {
        labels: recentSlice.years,
        datasets: [
          {
            label: 'Wanderungssaldo',
            data: recentSlice.saldo,
            borderColor: 'rgba(99, 102, 241, 0.95)',
            backgroundColor: 'rgba(99, 102, 241, 0.18)',
            tension: 0.32,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(99, 102, 241, 0.95)',
          },
          {
            label: 'Innerkantonal (Zuzug)',
            data: recentSlice.intrakantonalZu,
            borderColor: 'rgba(20, 184, 166, 0.85)',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 3,
            borderDash: [5, 4],
          },
          {
            label: 'Innerkantonal (Wegzug)',
            data: recentSlice.intrakantonalWeg,
            borderColor: 'rgba(217, 70, 239, 0.85)',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 3,
            borderDash: [5, 4],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: legendColor, font: { size: 12, weight: 600 } },
          },
          tooltip: {
            callbacks: {
              label: (ctx: TooltipItem<'line'>) =>
                ` ${ctx.dataset.label}: ${(Number(ctx.parsed.y) || 0).toLocaleString('de-CH')}`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: tickColor, font: { size: 12 } } },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: tickColor,
              callback: (v) => Number(v).toLocaleString('de-CH'),
            },
          },
        },
      } satisfies ChartOptions<'line'>,
    }
  }, [recentSlice, tickColor, gridColor, legendColor])

  const insights = useMemo(() => buildInsights(data, cityName), [data, cityName])

  if (loading) {
    return (
      <section
        className="mx-auto max-w-7xl px-4 pb-10 pt-2 md:px-6"
        aria-busy="true"
        aria-label="Statistik wird geladen"
      >
        <Card className="border-border/80 bg-card/90 shadow-sm">
          <CardContent className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            <span>Umzugsstatistik wird geladen…</span>
          </CardContent>
        </Card>
      </section>
    )
  }

  if (error || !data || !recentSlice || !balanceChart || !trendChart) {
    return null // Sayfada bo\u015f yer kald\u0131rmamak i\u00e7in sessizce gizlenir.
  }

  const yearsRangeLabel = `${recentSlice.years[0]}–${recentSlice.years[recentSlice.years.length - 1]}`
  const fallbackHint = data.fallbackUsed
    ? ` Da für ${cityName} keine separate Gemeinde-Auswertung verfügbar war, zeigen wir die Daten des übergeordneten Kantons (${data.scopeName}).`
    : ''

  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-12 pt-4 md:px-6"
      aria-labelledby={`migration-stats-${citySlug}`}
    >
      <Card
        className={cn(
          'overflow-hidden border border-slate-200/90 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.12)]',
          'dark:border-border dark:bg-card/85 dark:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.45)]'
        )}
      >
        <CardHeader className="space-y-2 border-b border-border/70 bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/40 pb-6 dark:from-emerald-950/35 dark:via-card dark:to-teal-950/25">
          <div className="flex flex-wrap items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <BarChart3 className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <CardTitle
                id={`migration-stats-${citySlug}`}
                className="text-xl font-bold tracking-tight text-foreground md:text-2xl"
              >
                Umzugs- &amp; Wanderungsstatistik {data.scope === 'gemeinde' ? `für ${cityName}` : `– Kanton ${data.scopeName}`}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Offizielle Zuzüge, Wegzüge und innerkantonale Bewegungen ({yearsRangeLabel}) auf
                Basis der demografischen Bilanz des Bundesamts für Statistik (BFS).
                {fallbackHint}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-10 p-6 md:p-8">
          {/* KPI-Karten */}
          <div className="grid gap-3 sm:grid-cols-3">
            <KpiCard
              icon={<ArrowDownRight className="h-4 w-4" />}
              tone="emerald"
              label="Zuzüge (letztes Jahr)"
              value={recentSlice.zuzuege[recentSlice.zuzuege.length - 1] ?? 0}
            />
            <KpiCard
              icon={<ArrowUpRight className="h-4 w-4" />}
              tone="rose"
              label="Wegzüge (letztes Jahr)"
              value={recentSlice.wegzuege[recentSlice.wegzuege.length - 1] ?? 0}
            />
            <KpiCard
              icon={<Scale className="h-4 w-4" />}
              tone={
                (recentSlice.saldo[recentSlice.saldo.length - 1] ?? 0) >= 0
                  ? 'emerald'
                  : 'rose'
              }
              label="Wanderungssaldo (letztes Jahr)"
              value={recentSlice.saldo[recentSlice.saldo.length - 1] ?? 0}
              showSign
            />
          </div>

          {/* Bar-Chart: Zuzüge vs. Wegzüge */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Gegenüberstellung: Zuzüge vs. Wegzüge ({yearsRangeLabel})
            </h3>
            <div className="h-[300px] w-full md:h-[340px]">
              <Bar data={balanceChart.data} options={balanceChart.options} />
            </div>
            <p className="text-xs text-muted-foreground">
              Wegzüge sind nach unten dargestellt, um die Bilanz pro Jahr auf einen Blick zu zeigen.
            </p>
          </div>

          {/* Line-Chart: Trend */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Trend: Wanderungssaldo &amp; innerkantonale Bewegungen
            </h3>
            <div className="h-[300px] w-full md:h-[340px]">
              <Line data={trendChart.data} options={trendChart.options} />
            </div>
          </div>

          {/* SEO-Analysetext */}
          {insights ? (
            <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/60 px-4 py-4 text-sm leading-relaxed text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                <Info className="h-3.5 w-3.5" aria-hidden />
                Was zeigen die Daten?
              </div>
              <p>{insights}</p>
            </div>
          ) : null}

          {/* Quelle */}
          <footer className="space-y-3 border-t border-border/70 pt-6 text-xs leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Datenquelle:</strong> {data.source.publisher} —
              „{data.source.cubeTitle}". {data.source.displayName}. Lizenz:{' '}
              {data.source.license}.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a
                href={data.source.catalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
              >
                BFS Migration &amp; Integration
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
              <a
                href={data.source.opendataSwiss}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
              >
                opendata.swiss — Wanderungsdaten
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </footer>
        </CardContent>
      </Card>
    </section>
  )
}

/** Generates a German interpretive sentence for the current dataset. */
function buildInsights(data: ApiPayload | null, cityName: string): string | null {
  if (!data) return null
  const m = data.metrics
  if (m.years.length < 3) return null

  const last = m.years.length - 1
  const lastYear = m.years[last]
  const z = m.zuzuege[last]
  const w = m.wegzuege[last]
  const s = m.saldo[last]
  const ratioInner = w + z > 0 ? m.intrakantonalZu[last] / (z || 1) : 0

  const trendStart = Math.max(0, last - 4) // 5-Jahre-Vergleich
  const z0 = m.zuzuege[trendStart] || 1
  const z1 = m.zuzuege[last] || 0
  const trendPct = ((z1 - z0) / z0) * 100

  const trendText =
    Math.abs(trendPct) < 3
      ? 'auf vergleichbarem Niveau'
      : trendPct > 0
        ? `um rund ${Math.round(trendPct)}% gestiegen`
        : `um rund ${Math.round(Math.abs(trendPct))}% gesunken`

  const saldoText =
    s > 0
      ? `einem positiven Wanderungssaldo von +${s.toLocaleString('de-CH')} Personen`
      : s < 0
        ? `einem negativen Wanderungssaldo von ${s.toLocaleString('de-CH')} Personen`
        : 'einem ausgeglichenen Wanderungssaldo'

  const innerText =
    ratioInner >= 0.4
      ? `Auffällig ist, dass viele Zuzüge aus dem gleichen Kanton stammen — die innerkantonale Mobilität ist überdurchschnittlich.`
      : ratioInner >= 0.2
        ? 'Innerkantonale Wechsel machen einen relevanten Anteil der Zuzüge aus.'
        : 'Die meisten Zuzüge kommen aus anderen Kantonen oder dem Ausland — die innerkantonale Quote ist eher tief.'

  const scopeLabel =
    data.scope === 'gemeinde' ? cityName : `der Kanton ${data.scopeName}`

  return `${scopeLabel} verzeichnete ${lastYear} ${z.toLocaleString('de-CH')} Zuzüge gegenüber ${w.toLocaleString('de-CH')} Wegzügen — und damit ${saldoText}. Im Vergleich zu vor fünf Jahren liegen die Zuzüge ${trendText}. ${innerText} Diese Dynamik erklärt, weshalb in dieser Region regelmässig Umzugsfirmen gefragt sind — sowohl für Zügel innerhalb der Gemeinde als auch für regionale Wechsel.`
}

function KpiCard({
  icon,
  tone,
  label,
  value,
  showSign,
}: {
  icon: React.ReactNode
  tone: 'emerald' | 'rose'
  label: string
  value: number
  showSign?: boolean
}) {
  const formatted = (showSign && value > 0 ? '+' : '') + value.toLocaleString('de-CH')
  return (
    <div
      className={cn(
        'rounded-xl border px-4 py-3.5',
        tone === 'emerald'
          ? 'border-emerald-200/70 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/30'
          : 'border-rose-200/70 bg-rose-50/60 dark:border-rose-900/60 dark:bg-rose-950/25'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 text-xs font-semibold uppercase tracking-wider',
          tone === 'emerald'
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-rose-700 dark:text-rose-300'
        )}
      >
        {icon}
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums text-foreground">{formatted}</div>
    </div>
  )
}
