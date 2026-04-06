'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'

export type LocationNavItem = {
  name: string
  slug: string
  canton?: string
  showInNav?: boolean
  showOnHome?: boolean
  image?: string
}

interface LocationPageNavigationProps {
  allLocations: LocationNavItem[]
  currentCity: string
}

export default function LocationPageNavigation({
  allLocations,
  currentCity,
}: LocationPageNavigationProps) {
  const others = allLocations.filter((loc) => loc.name !== currentCity)
  if (others.length === 0) return null

  return (
    <nav className="mt-12 pt-10 border-t border-gray-200" aria-label="Weitere Standorte">
      <h2 className="heading-3 mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-green-600 shrink-0" aria-hidden />
        Weitere Umzugsstandorte in der Schweiz
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {others.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/${loc.slug}`}
              className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:border-green-500 hover:text-green-700"
            >
              {loc.name}
              {loc.canton ? (
                <span className="block text-xs font-normal text-gray-500">{loc.canton}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
