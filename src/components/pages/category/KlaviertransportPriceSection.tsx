'use client'

import Link from 'next/link'
import { ArrowRight, Info, ListChecks, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getKlaviertransportPriceData,
  type KlaviertransportPriceData,
} from '@/lib/klaviertransportPricing'

/**
 * Stadt-/Kanton-spezifische Preistabelle für Klaviertransport-Stadtseiten.
 *
 * Die eigentliche Preis-Logik lebt in `@/lib/klaviertransportPricing` (saf TS,
 * server- und client-tauglich). Diese Komponente ist reine UI – Tabelle,
 * Hinweise und CTA. Sie kann auf jeder Stadt-Seite verwendet werden, an der
 * `serviceId === 'klaviertransport'` gilt.
 */

export type KlaviertransportPriceProps = {
  cityName: string
  citySlug: string
  canton: string
  cantonName: string
  ctaHref: string
  /** Optional vorkalkulierte Daten (z. B. wenn der Server bereits berechnet hat). */
  data?: KlaviertransportPriceData
}

export default function KlaviertransportPriceSection({
  cityName,
  citySlug,
  canton,
  cantonName,
  ctaHref,
  data,
}: KlaviertransportPriceProps) {
  const priceData =
    data ?? getKlaviertransportPriceData({ cityName, citySlug, canton, cantonName })

  return (
    <section
      className="relative border-t border-slate-200/70 bg-gradient-to-b from-white to-slate-50/90 py-14 dark:border-border dark:from-background dark:to-muted/20 md:py-20"
      aria-labelledby="klaviertransport-preise-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-slate-200/85 bg-white p-6 shadow-[0_24px_56px_-28px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/[0.04] dark:border-border dark:bg-card dark:shadow-[0_24px_56px_-28px_rgba(0,0,0,0.45)] dark:ring-white/10 sm:p-8 md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
            <div className="min-w-0 space-y-2">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200/90 bg-emerald-50/80 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                <Tag className="h-3 w-3" aria-hidden />
                Klaviertransport {cityName} Preise
              </p>
              <h2
                id="klaviertransport-preise-heading"
                className="text-balance text-2xl font-semibold tracking-tight text-slate-900 dark:text-foreground md:text-[1.875rem] md:leading-snug"
              >
                Klaviertransport {cityName} Preise – Richtwerte für {cantonName}
              </h2>
              <p className="max-w-3xl text-[1.0125rem] leading-relaxed text-slate-600 dark:text-muted-foreground md:text-[1.05rem]">
                {priceData.intro}
              </p>
            </div>
            <Button asChild variant="cta" className="group h-12 shrink-0 px-6 text-sm font-semibold tracking-tight md:self-end">
              <Link href={ctaHref}>
                Gratis Offerten einholen
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Button>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/85 dark:border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-slate-50/90 dark:bg-muted/40">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-foreground/85 sm:px-5"
                    >
                      Szenario
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-foreground/85 sm:px-5"
                    >
                      Richtpreis (CHF)
                    </th>
                    <th
                      scope="col"
                      className="hidden px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-foreground/85 md:table-cell md:px-5"
                    >
                      Hinweis
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 dark:divide-border">
                  {priceData.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="bg-white align-top dark:bg-card/80 even:bg-slate-50/50 dark:even:bg-muted/20"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-foreground sm:px-5">
                        {row.szenario}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-foreground sm:px-5">
                        {row.preis}
                      </td>
                      <td className="hidden px-4 py-3 text-slate-600 dark:text-muted-foreground md:table-cell md:px-5">
                        {row.hinweis ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-500 dark:text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-muted-foreground" aria-hidden />
            <span>
              Richtwerte aus typischen Klaviertransport-Anfragen in {cityName} ({cantonName}).
              Verbindliche Klaviertransport-Preise hängen von Instrument (Klavier/Flügel),
              Stockwerk, Treppenbreite, Liftbedarf und Distanz ab – darum lohnt sich beim
              Pianotransport Schweiz immer ein direkter Klaviertransport-Preisvergleich.
            </span>
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5 dark:border-emerald-800/60 dark:bg-emerald-950/20">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900 dark:text-emerald-200">
                <ListChecks className="h-3.5 w-3.5" aria-hidden />
                Üblich beim Klaviertransport
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-800 dark:text-foreground">
                {priceData.includes.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
                      aria-hidden
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200/85 bg-slate-50/60 p-5 dark:border-border dark:bg-muted/30">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-foreground/85">
                <Info className="h-3.5 w-3.5" aria-hidden />
                Optional / nicht inklusive
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-foreground/90">
                {priceData.excludes.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-muted-foreground"
                      aria-hidden
                    />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
