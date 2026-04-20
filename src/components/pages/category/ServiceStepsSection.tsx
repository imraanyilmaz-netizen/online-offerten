'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ClipboardList,
  HeartHandshake,
  Paintbrush,
  Send,
  Sparkles,
  Truck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * "In 3 Schritten …" – Ablauf-Sektion für Service- und Standort-Seiten.
 *
 * Texte passen sich dynamisch an:
 *  - categorySlug  → Branche/Plural (Umzugsfirmen / Reinigungsfirmen / Malerfirmen)
 *  - serviceLabel  → konkrete Leistung (z. B. "Privatumzug") – optional
 *  - locationName  → Ort (z. B. "Zürich") – optional
 *
 * So wirkt jede Sektion „für diese Seite geschrieben“.
 */
export default function ServiceStepsSection({
  categorySlug,
  serviceLabel,
  locationName,
  ctaHref,
  maxWidthClass = 'max-w-7xl',
}: {
  categorySlug: string
  serviceLabel?: string
  locationName?: string
  ctaHref: string
  /** Container-Breite an das Hero der jeweiligen Seite anpassen.
   *  Service-Seiten: "max-w-7xl" (Default). Standort-Seiten: "max-w-navbar". */
  maxWidthClass?: string
}) {
  const theme =
    categorySlug === 'reinigungsfirma'
      ? {
          kicker: 'text-sky-700 dark:text-sky-400',
          badge: 'bg-sky-600',
          iconBg:
            'bg-sky-50 text-sky-700 ring-sky-200/60 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-800/50',
          hoverBorder: 'hover:border-sky-200/90 dark:hover:border-sky-800/80',
        }
      : categorySlug === 'malerfirma'
        ? {
            kicker: 'text-violet-700 dark:text-violet-400',
            badge: 'bg-violet-600',
            iconBg:
              'bg-violet-50 text-violet-700 ring-violet-200/60 dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-800/50',
            hoverBorder: 'hover:border-violet-200/90 dark:hover:border-violet-800/80',
          }
        : {
            kicker: 'text-emerald-700 dark:text-emerald-400',
            badge: 'bg-emerald-600',
            iconBg:
              'bg-emerald-50 text-emerald-700 ring-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50',
            hoverBorder: 'hover:border-emerald-200/90 dark:hover:border-emerald-800/80',
          }

  const hubPlural =
    categorySlug === 'reinigungsfirma'
      ? 'Reinigungsfirmen'
      : categorySlug === 'malerfirma'
        ? 'Malerfirmen'
        : 'Umzugsfirmen'
  const hubSingular =
    categorySlug === 'reinigungsfirma'
      ? 'Reinigungsfirma'
      : categorySlug === 'malerfirma'
        ? 'Malerfirma'
        : 'Umzugsfirma'

  const serviceExamples =
    categorySlug === 'reinigungsfirma'
      ? 'z. B. Wohnungs-, Büro- oder Umzugsreinigung'
      : categorySlug === 'malerfirma'
        ? 'z. B. Innen-, Aussen- oder Fassadenarbeiten'
        : 'z. B. Privatumzug, Geschäftsumzug oder Klaviertransport'

  const ortSuffix = locationName ? ` in ${locationName}` : ''

  const step1Title = serviceLabel
    ? `Service auswählen (Beispiel: ${serviceLabel})`
    : `Service auswählen${ortSuffix}`

  const step1Body = (() => {
    if (serviceLabel) {
      if (categorySlug === 'reinigungsfirma') {
        return `Objekt, Flächen (m²), gewünschter Termin${ortSuffix} und Zusatzwünsche wie Fensterreinigung oder Abnahmegarantie angeben.`
      }
      if (categorySlug === 'malerfirma') {
        return `Objekt, Flächen, Wunschdatum${ortSuffix} und Leistungen wie Vorarbeiten, Farbwahl oder Fassade angeben.`
      }
      return `Start- und Zieladresse, Zimmerzahl, Wunschdatum${ortSuffix} und Zusatzleistungen wie Einpackservice oder Endreinigung angeben.`
    }
    return `Wählen Sie eine passende Leistung (${serviceExamples}) und beschreiben Sie Ihr Projekt${ortSuffix} in wenigen Minuten.`
  })()

  const step2Body = `Wir leiten Ihre Anfrage an geprüfte ${hubPlural}${ortSuffix ? ` mit Einsatzgebiet${ortSuffix}` : ' in Ihrer Region'} weiter. Passende Anbieter melden sich mit unverbindlichen Offerten – zum bequemen Vergleich.`

  const step3Body = `Preis, Leistung, Versicherung und Bewertungen vergleichen – anschliessend unverbindlich die passende ${hubSingular}${ortSuffix} beauftragen.`

  const heading = locationName
    ? `In 3 Schritten die besten ${hubPlural} in ${locationName} finden`
    : `In 3 Schritten die besten ${hubPlural} Ihrer Region finden`

  const subheading = locationName
    ? `In drei klaren Schritten kommen Sie schnell zu passenden Offerten${serviceLabel ? ` für ${serviceLabel}` : ''} in ${locationName}.`
    : 'In drei klaren Schritten kommen Sie schnell zu passenden Offerten aus Ihrer Region.'

  const step2Icon: LucideIcon =
    categorySlug === 'reinigungsfirma'
      ? Sparkles
      : categorySlug === 'malerfirma'
        ? Paintbrush
        : categorySlug === 'umzugsfirma'
          ? Truck
          : Send

  const steps: ReadonlyArray<{ num: number; Icon: LucideIcon; title: string; body: string }> = [
    { num: 1, Icon: ClipboardList, title: step1Title, body: step1Body },
    { num: 2, Icon: step2Icon, title: 'Bis zu 5 Offerten erhalten', body: step2Body },
    { num: 3, Icon: HeartHandshake, title: 'Vergleichen & beauftragen', body: step3Body },
  ]

  return (
    <section className="relative z-10 border-t border-slate-200/80 bg-white py-14 dark:border-border dark:bg-background md:py-20">
      <div className={cn('container mx-auto px-4 md:px-6', maxWidthClass)}>
        <div className="mb-10 max-w-3xl md:mb-12">
          <p className={cn('text-[0.6875rem] font-semibold uppercase tracking-[0.2em]', theme.kicker)}>
            Ablauf
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl md:leading-tight">
            {heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-muted-foreground md:text-lg">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {steps.map(({ num, Icon, title, body }) => (
            <div
              key={num}
              className={cn(
                'group relative h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-border dark:bg-card dark:ring-white/10 md:p-7',
                theme.hoverBorder
              )}
            >
              <div className="mb-5 flex items-center justify-between">
                <span
                  className={cn(
                    'rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-white',
                    theme.badge
                  )}
                >
                  Schritt {num}
                </span>
                <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl ring-1', theme.iconBg)}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">{body}</p>
              {num === 1 ? (
                <div className="mt-6">
                  <Button asChild variant="cta" className="group h-11 px-5 text-sm font-semibold tracking-tight">
                    <Link href={ctaHref}>
                      Jetzt Offerten vergleichen
                      <ArrowRight
                        className="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
