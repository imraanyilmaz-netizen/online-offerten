'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  ChevronRight,
  Droplets,
  Truck,
  Trash2,
  Archive,
  type LucideIcon,
} from 'lucide-react'

export type ReinigungHeroQuickLink = {
  label: string
  sub: string
  href: string
  icon: LucideIcon
}

/** Gleiche Schnellwahl-Karten wie auf der Endreinigungs-Seite */
export function standardReinigungHeroQuickLinks(): ReinigungHeroQuickLink[] {
  return [
    {
      label: 'Nur Reinigung',
      sub: 'Reinigungsofferte ohne Umzug',
      href: '/kostenlose-offerte-anfordern?service=reinigung&step=2',
      icon: Droplets,
    },
    {
      label: 'Umzug und Reinigung',
      sub: 'Privatumzug inkl. Endreinigung',
      href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug&endreinigung=ja',
      icon: Truck,
    },
    {
      label: 'Entsorgung',
      sub: 'Fachgerechte Entsorgung',
      href: '/kostenlose-offerte-anfordern?service=raeumung&step=3&raeumungArt=entsorgung',
      icon: Trash2,
    },
    {
      label: 'Entrümpelung und Räumung',
      sub: 'Räumung & Leerung',
      href: '/kostenlose-offerte-anfordern?service=raeumung&step=2&raeumungArt=raeumung',
      icon: Archive,
    },
  ]
}

export type ReinigungServiceHeroProps = {
  breadcrumbCurrent: string
  backgroundImageUrl: string
  badgeText?: string
  title: ReactNode
  intro: ReactNode
  ctaLabel: string
  /** Wenn gesetzt: primärer CTA als Link (z. B. Büroreinigung ohne useRouter) */
  ctaHref?: string
  /** Wenn kein ctaHref: Klick-Handler (z. B. router.push) */
  onCtaClick?: () => void
  quickLinks?: ReinigungHeroQuickLink[]
  trustItems: string[]
}

export default function ReinigungServiceHero({
  breadcrumbCurrent,
  backgroundImageUrl,
  badgeText,
  title,
  intro,
  ctaLabel,
  ctaHref,
  onCtaClick,
  quickLinks = standardReinigungHeroQuickLinks(),
  trustItems,
}: ReinigungServiceHeroProps) {
  const ctaClassName =
    'bg-green-700 hover:bg-green-800 text-white font-bold w-full sm:w-auto px-8 py-6 text-base'

  return (
    <section className="relative w-full py-8 md:py-14 overflow-hidden">
      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-green-700">
                Startseite
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            <li>
              <Link href="/reinigung" className="hover:text-green-700">
                Reinigung
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            <li className="text-gray-900 font-medium" aria-current="page">
              {breadcrumbCurrent}
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          {badgeText ? (
            <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 mr-2" aria-hidden />
              {badgeText}
            </div>
          ) : null}

          <h1 className="heading-1 !mt-0 text-balance break-words">{title}</h1>

          <div className="text-base sm:text-lg text-gray-600 mt-4 mb-8 leading-relaxed [&_strong]:text-gray-800">
            {intro}
          </div>

          {quickLinks.length > 0 ? (
            <>
              <p className="text-sm font-semibold text-gray-800 mb-3">Passende Anfrage wählen:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {quickLinks.map((opt) => (
                  <Link
                    key={opt.href + opt.label}
                    href={opt.href}
                    className="flex items-start gap-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-green-500 hover:bg-green-50/80 transition-all shadow-sm"
                  >
                    <div className="p-2 rounded-lg bg-green-100 text-green-700 shrink-0">
                      <opt.icon className="w-5 h-5" aria-hidden />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">{opt.label}</span>
                      <span className="text-sm text-gray-600">{opt.sub}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          {ctaHref ? (
            <Button asChild size="lg" className={ctaClassName}>
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden />
              </Link>
            </Button>
          ) : (
            <Button size="lg" onClick={onCtaClick} className={ctaClassName}>
              {ctaLabel}
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden />
            </Button>
          )}

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-700">
            {trustItems.map((text) => (
              <span key={text} className="inline-flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 shrink-0" aria-hidden />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
