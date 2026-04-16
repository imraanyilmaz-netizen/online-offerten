'use client'

import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

export type LocationNavItem = {
  name: string
  slug: string
  canton?: string
}

interface LocationPageNavigationProps {
  allLocations: LocationNavItem[]
  currentCity: string
  /** URL-Segment der Branche, z. B. umzugsfirma, reinigung, malerfirma */
  categoryPath?: string
  /** Abschnittstitel */
  title?: string
  /** Kanton z. B. ZH — Städte im gleichen Kanton zuerst */
  prioritizeCanton?: string
  /** Maximale Anzahl Links (vermeidet riesige Listen; Footer & /standorte ergänzen) */
  maxItems?: number
  /** Link zur vollständigen Standorte-Übersicht */
  showAllStandorteLink?: boolean
}

function pickLocations(
  all: LocationNavItem[],
  currentCity: string,
  canton: string | undefined,
  max: number
): LocationNavItem[] {
  const others = all.filter((loc) => loc.name !== currentCity)
  if (max <= 0 || max === Number.POSITIVE_INFINITY) return others

  if (!canton) {
    return others.slice(0, max)
  }

  const same = others.filter((l) => l.canton === canton)
  const rest = others.filter((l) => l.canton !== canton)
  return [...same, ...rest].slice(0, max)
}

export default function LocationPageNavigation({
  allLocations,
  currentCity,
  categoryPath = 'umzugsfirma',
  title = 'Weitere Standorte in der Schweiz',
  prioritizeCanton,
  maxItems = 12,
  showAllStandorteLink = true,
}: LocationPageNavigationProps) {
  const capped =
    maxItems > 0 && Number.isFinite(maxItems)
      ? pickLocations(allLocations, currentCity, prioritizeCanton, maxItems)
      : pickLocations(allLocations, currentCity, prioritizeCanton, Number.POSITIVE_INFINITY)

  if (capped.length === 0) return null

  return (
    <nav className="mt-10 border-t border-gray-200 pt-10 dark:border-border" aria-label="Weitere Standorte">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="heading-3 flex items-center gap-2">
            <MapPin className="h-6 w-6 shrink-0 text-green-600 dark:text-emerald-400" aria-hidden />
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-muted-foreground">
            {prioritizeCanton
              ? `Zuerst Orte im Kanton ${prioritizeCanton}, ergänzt um weitere grosse Städte. Alle Gemeinden finden Sie auf der Standorte-Übersicht.`
              : 'Auswahl weiterer Städte. Alle Gemeinden finden Sie auf der Standorte-Übersicht.'}
          </p>
        </div>
        {showAllStandorteLink ? (
          <Link
            href="/standorte"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Alle Standorte
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
      <ul className="flex flex-wrap gap-2">
        {capped.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/${categoryPath}/${loc.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm transition hover:border-green-500 hover:text-green-700 dark:border-border dark:bg-card dark:text-foreground dark:hover:border-emerald-600 dark:hover:text-emerald-400"
            >
              {loc.name}
              {loc.canton ? (
                <span className="text-xs font-normal text-gray-500 dark:text-muted-foreground">{loc.canton}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
