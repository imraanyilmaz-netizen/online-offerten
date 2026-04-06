'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface DistrictsBlock {
  title: string
  text: string
  list: string[]
}

export interface SearchLink {
  label: string
  href: string
}

interface LocationSidebarProps {
  city: string
  districts?: DistrictsBlock | null
  searches?: SearchLink[] | null
}

function offerteHref(city: string): string {
  return `/kostenlose-offerte-anfordern?service=umzug&step=2&city=${encodeURIComponent(city)}`
}

export default function LocationSidebar({
  city,
  districts,
  searches,
}: LocationSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Offerte in {city}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Kostenlose, unverbindliche Offerten von geprüften Partnerfirmen in Ihrer Region.
        </p>
        <Button asChild className="w-full" size="lg">
          <Link href={offerteHref(city)}>
            Jetzt Offerten anfordern
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {districts ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">{districts.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{districts.text}</p>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            {districts.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {searches && searches.length > 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Häufig gesucht</h3>
          <ul className="space-y-2">
            {searches.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-sm text-green-700 hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  )
}
