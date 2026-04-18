'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { locations } from '@/data/locations'

const TOP_CITIES = locations.slice(0, 10)

/** Decorative Swiss landscape; swap for a branded `/public` asset when available. */
const STANDORTE_IMAGE =
  'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'

const standortLinkClass =
  'inline-flex items-center rounded-lg border border-neutral-200/90 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50/80 hover:text-emerald-900 dark:border-border dark:bg-card dark:text-foreground dark:hover:border-emerald-600/50 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300'

export default function FooterBeliebteStandorte() {
  return (
    <section
      className="flex-shrink-0 border-t border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
      aria-labelledby="footer-beliebte-standorte-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <div
          className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-8px_rgba(15,23,42,0.08)] dark:border-border dark:bg-card lg:min-h-[420px] lg:flex-row"
          style={{ contain: 'layout style' }}
        >
          {/* Left: image + overlay copy */}
          <div className="relative min-h-[220px] w-full shrink-0 lg:min-h-0 lg:w-[42%] lg:max-w-xl">
            <img
              src={STANDORTE_IMAGE}
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-emerald-950/25"
              aria-hidden
            />
            <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-end p-6 sm:p-8 lg:min-h-[420px]">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-emerald-200 ring-1 ring-white/25 backdrop-blur-sm">
                <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <h2
                id="footer-beliebte-standorte-heading"
                className="text-xl font-bold uppercase tracking-[0.12em] text-white sm:text-2xl"
              >
                Beliebte Standorte
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                Vergleichen Sie Anbieter in grossen Schweizer Städten — pro Ort für Umzug,
                Reinigung und Malerarbeiten.
              </p>
            </div>
          </div>

          {/* Right: city list */}
          <div className="flex flex-1 flex-col border-t border-neutral-100 bg-neutral-50/40 dark:border-border dark:bg-muted/30 lg:border-l lg:border-t-0">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5">
              <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 lg:hidden">
                Städte wählen
              </p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {TOP_CITIES.map((loc) => (
                  <li
                    key={loc.slug}
                    className="rounded-xl border border-neutral-100 bg-white p-3.5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-emerald-200/80 hover:shadow-md dark:border-border dark:bg-background sm:p-4"
                  >
                    <p className="text-sm font-semibold text-neutral-900 dark:text-foreground">
                      {loc.name}
                      <span className="ml-1 font-normal text-neutral-500 dark:text-muted-foreground">· {loc.canton}</span>
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <Link href={`/umzugsfirma/${loc.slug}`} className={standortLinkClass}>
                        Umzug
                      </Link>
                      <Link href={`/reinigungsfirma/${loc.slug}`} className={standortLinkClass}>
                        Reinigung
                      </Link>
                      <Link href={`/malerfirma/${loc.slug}`} className={standortLinkClass}>
                        Maler
                      </Link>
                    </div>
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
