'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CountryFlag from '@/components/international/CountryFlag'
import {
  INTERNATIONAL_POPULAR_DESTINATIONS,
  getAuslandCountryPagePath,
} from '@/data/internationalPopularDestinations'
import { cn } from '@/lib/utils'

export { INTERNATIONAL_POPULAR_DESTINATIONS, getAuslandCountryPagePath }

const CATEGORY = 'umzugsfirma'

/**
 * @param {{ activeSlug?: string | null }} props
 */
export default function InternationalPopularDestinations({ activeSlug = null }) {
  return (
    <div id="beliebte-ziele-europa" className="mt-10 border-t border-border pt-10 md:mt-12">
      <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Beliebte Ziele für Ihren Umzug in Europa
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
        Land wählen – das Zielland wird im Kostenrechner darüber vorausgewählt (Abfahrt Schweiz).
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {INTERNATIONAL_POPULAR_DESTINATIONS.map((country) => {
          const href = getAuslandCountryPagePath(CATEGORY, country.slug)
          const isActive = activeSlug === country.slug
          return (
            <Link
              key={country.code}
              href={href}
              prefetch={false}
              className={cn(
                'group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all duration-300',
                'border-border/80 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_12px_40px_-16px_rgba(16,185,129,0.35)]',
                'dark:hover:border-emerald-500/40 dark:hover:shadow-[0_16px_48px_-20px_rgba(16,185,129,0.22)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background',
                isActive &&
                  'border-emerald-500/60 bg-gradient-to-br from-emerald-50/90 to-teal-50/50 shadow-md ring-1 ring-emerald-500/25 dark:from-emerald-950/40 dark:to-teal-950/20 dark:ring-emerald-400/30'
              )}
            >
              <span
                className={cn(
                  'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                  'bg-[linear-gradient(135deg,rgba(16,185,129,0.07)_0%,transparent_50%)]'
                )}
                aria-hidden
              />
              <CountryFlag countryCode={country.code} className="relative z-[1] h-auto w-11 rounded-lg shadow-md ring-1 ring-black/5 dark:ring-white/10" />
              <span
                className={cn(
                  'relative z-[1] flex-1 text-base font-semibold text-foreground transition-colors',
                  'group-hover:text-emerald-700 dark:group-hover:text-emerald-400',
                  isActive && 'text-emerald-800 dark:text-emerald-300'
                )}
              >
                {country.name}
              </span>
              <ArrowRight
                className={cn(
                  'relative z-[1] h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
                  isActive && 'text-emerald-600 dark:text-emerald-400'
                )}
                aria-hidden
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
