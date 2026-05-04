import { ExternalLink, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  /** z. B. „Brugg" */
  cityName: string
  /** Voller Kantonsname, z. B. „Aargau" */
  cantonName: string
  /** Kanton-Kürzel, z. B. „AG" — wird in der Maps-Query verwendet, falls Stadtnamen mehrdeutig sind. */
  cantonCode?: string
  /** Singular der Kategorie für SEO-Title (z. B. „Umzugsfirma", „Reinigungsfirma"). */
  categoryLabel: string
  /** Optionaler Service-Spezifizierer (Service-City-Seiten), z. B. „Lagerung". */
  serviceLabel?: string
}

/**
 * Lokales Service-Gebiet als eingebettete Karte.
 *
 * Performance:
 *  - `loading="lazy"` (Native Lazy Loading, keine zusätzlichen JS-Bibliotheken).
 *  - Sichtbarer Low-Res-Platzhalter (CSS-Gradient + Map-Pin), dahinter wird das
 *    Iframe gestapelt; sobald der Browser nahe an den Viewport-Rand kommt, lädt
 *    er die Karte und überdeckt den Platzhalter.
 *  - SSR-fähig (kein "use client") — `title`, `loading` & `src` sind ab dem
 *    ersten HTML-Frame vorhanden, sodass Crawler den Kartenkontext sofort lesen.
 *
 * SEO:
 *  - `title="<Kategorie> <Stadt> Service-Gebiet Karte"` ist im DOM lesbar.
 *  - Eigene Überschrift „Einsatzgebiet <Stadt> & Umgebung".
 *  - „In Google Maps öffnen" als Out-Bound-Link mit `rel="noopener"`.
 */
export default function CityServiceAreaMap({
  cityName,
  cantonName,
  cantonCode,
  categoryLabel,
  serviceLabel,
}: Props) {
  const queryParts = [cityName]
  if (cantonCode) queryParts.push(cantonCode)
  queryParts.push(cantonName, 'Schweiz')
  const query = queryParts.join(' ')

  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=12&ie=UTF8&iwloc=&output=embed`
  const externalHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`

  // SEO-Title für das Iframe (von Crawlern und Screen-Readern lesbar).
  const titleSubject = serviceLabel ? `${serviceLabel} ${categoryLabel}` : categoryLabel
  const iframeTitle = `${titleSubject} ${cityName} Service-Gebiet Karte`

  return (
    <section
      className="border-t border-slate-200/70 bg-gradient-to-b from-slate-50/40 via-white to-white py-12 dark:border-border dark:from-muted/15 dark:via-background dark:to-background md:py-16"
      aria-labelledby="city-service-area-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div
          className={cn(
            'rounded-3xl border border-slate-200/85 bg-white p-6 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03]',
            'dark:border-border dark:bg-card dark:ring-white/10',
            'sm:p-8 md:p-10'
          )}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0 space-y-2">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200/85 bg-emerald-50/85 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200">
                <MapPin className="h-3 w-3" aria-hidden />
                Lokales Einsatzgebiet
              </span>
              <h2
                id="city-service-area-heading"
                className="text-balance text-2xl font-semibold tracking-tight text-slate-900 dark:text-foreground sm:text-3xl"
              >
                {`Einsatzgebiet ${cityName} & Umgebung`}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-[0.9375rem]">
                Hier sehen Sie {cityName} und Umgebung im Kanton {cantonName} – das typische
                Einsatzgebiet unserer gelisteten {categoryLabel}-Partner. Anbieter aus
                Nachbargemeinden bedienen {cityName} ohne längere Anfahrt.
              </p>
            </div>
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1 self-start rounded-lg border border-slate-200/85 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-border dark:bg-muted/40 dark:text-muted-foreground dark:hover:text-foreground sm:self-auto"
              aria-label={`${cityName} in Google Maps öffnen`}
            >
              In Google Maps öffnen
              <ExternalLink
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>

          <div
            className={cn(
              'relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/85',
              'bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-50 ring-1 ring-slate-900/[0.04]',
              'dark:border-border dark:from-emerald-950/30 dark:via-muted/40 dark:to-sky-950/25 dark:ring-white/10',
              'sm:aspect-[16/9]'
            )}
          >
            {/* Low-Res Platzhalter — sichtbar bis das Iframe (loading="lazy") startet. */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_42%,rgba(16,185,129,0.18),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(16,185,129,0.22),transparent_58%)]"
              aria-hidden
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/85 shadow-md ring-1 ring-emerald-200 dark:bg-card dark:ring-emerald-800/50">
                <MapPin className="h-5 w-5 text-emerald-700 dark:text-emerald-300" aria-hidden />
              </div>
              <p className="rounded-full bg-white/85 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-slate-600 shadow-sm dark:bg-card/85 dark:text-muted-foreground">
                Karte für {cityName}
              </p>
            </div>

            <iframe
              src={embedSrc}
              title={iframeTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="relative z-10 h-full w-full border-0"
            />
          </div>

          <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500 dark:text-muted-foreground">
            Datenquelle: Google Maps · Kartenausschnitt {cityName}, Kanton {cantonName}
          </p>
        </div>
      </div>
    </section>
  )
}
