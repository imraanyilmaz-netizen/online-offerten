'use client'

import Link from 'next/link'
import { Mail, Send } from 'lucide-react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { getCategoryServicePath, serviceCategories } from '@/data/categories'
import { ThemeToggleTabs } from '@/components/Layout/ThemeToggleTabs'

const toolsLinks = [
  { to: '/umzugsfirma-vergleichen', text: 'Umzugsfirma vergleichen' },
  { to: '/umzugsfirma/auslandumzug', text: 'Internationale Umzüge' },
  { to: '/kostenlose-offerte-anfordern', text: 'Kostenlose Offerten anfordern' },
  { to: '/standorte', text: 'Alle Standorte' },
]

const unternehmenLinks = [
  { to: '/ueber-uns', text: 'Über uns' },
  { to: '/kontakt', text: 'Kontakt' },
  { to: '/partner-werden', text: 'Partner werden' },
  { to: '/impressum', text: 'Impressum' },
]

const sectionTitleClass =
  'text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400'

const linkClass =
  'text-sm text-neutral-700 hover:text-emerald-700 hover:underline underline-offset-2 dark:text-neutral-300 dark:hover:text-emerald-400'

/** Nur Footer: Räumung & Entsorgung ausblenden (IDs auch unter Umzug vorhanden). */
const FOOTER_EXCLUDED_SERVICE_IDS = new Set(['raeumung_service', 'entsorgung_service'])

/**
 * Footer — zwei Varianten:
 *  - 'default'  : voller Footer mit Dienstleistungen, Tools, Rechtslinks (öffentliche Seiten)
 *  - 'minimal'  : schlanker Footer nur mit Logo, E-Mail, Social Media, Copyright, Theme-Toggle
 *                 (wird im Partner- / Admin-Panel verwendet, wo die langen Link-Blöcke stören).
 */
export default function Footer({ variant = 'default' }) {
  const currentYear = new Date().getFullYear()
  /** Footer blendet Maler aus — dann nur 2 Kategorien; `grid-cols-3` lässt eine leere Spalte (Lücke vor «Tools»). */
  const footerServiceCategories = serviceCategories.filter((cat) => cat.slug !== 'malerfirma')
  const footerMiddleGridClass =
    footerServiceCategories.length >= 3
      ? 'grid gap-10 sm:grid-cols-3 lg:col-span-6'
      : 'grid gap-10 sm:grid-cols-2 lg:col-span-6'

  if (variant === 'minimal') {
    /** Im Panel-Kontext ist "Partner werden" nicht sinnvoll — Nutzer ist bereits Partner/Admin. */
    const panelUnternehmenLinks = unternehmenLinks.filter((l) => l.to !== '/partner-werden')

    return (
      <footer
        className="flex-shrink-0 border-t border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
        style={{ contain: 'layout style' }}
      >
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-10">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col items-start gap-3">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                  <Send className="h-[17px] w-[17px]" aria-hidden />
                </span>
                <span className="text-lg font-bold italic tracking-tight text-neutral-900 md:text-xl dark:text-neutral-50">
                  Online-Offerten.ch
                </span>
              </Link>
              <a
                href="mailto:info@online-offerten.ch"
                className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-emerald-700 dark:text-neutral-400 dark:hover:text-emerald-400"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                info@online-offerten.ch
              </a>
              <h2 className={`${sectionTitleClass} mt-2`}>Social Media</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/online_offerten.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                  aria-label="Online-Offerten.ch auf Instagram"
                >
                  <FaInstagram className="h-[22px] w-[22px]" aria-hidden />
                </a>
                <a
                  href="https://www.facebook.com/onlineofferten/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                  aria-label="Online-Offerten.ch auf Facebook"
                >
                  <FaFacebook className="h-[22px] w-[22px]" aria-hidden />
                </a>
              </div>
            </div>

            <div>
              <h2 className={sectionTitleClass}>Unternehmen</h2>
              <ul className="mt-3 space-y-2">
                {panelUnternehmenLinks.map((link) => (
                  <li key={link.to}>
                    <Link href={link.to} className={linkClass}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center">
            <p>© {currentYear} Online-Offerten.ch. Alle Rechte vorbehalten.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <ThemeToggleTabs />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer
      className="flex-shrink-0 border-t border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
      style={{ contain: 'layout style' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                <Send className="h-[17px] w-[17px]" aria-hidden />
              </span>
              <span className="text-lg font-bold italic tracking-tight text-neutral-900 md:text-xl dark:text-neutral-50">
                Online-Offerten.ch
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Online-Offerten.ch ist ein Vergleichsportal für Umzug, Reinigung und Malerarbeiten in der Schweiz.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Nach einer einzigen Anfrage erhalten Sie bis zu 5 Offerten von geprüften Firmen aus Ihrer Region – kostenlos und unverbindlich.
            </p>
            <a
              href="mailto:info@online-offerten.ch"
              className="mt-4 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-emerald-700 dark:text-neutral-400 dark:hover:text-emerald-400"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              info@online-offerten.ch
            </a>
            <h2 className={`${sectionTitleClass} mt-6`}>Social Media</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a
                href="https://www.instagram.com/online_offerten.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                aria-label="Online-Offerten.ch auf Instagram"
              >
                <FaInstagram className="h-[22px] w-[22px]" aria-hidden />
              </a>
              <a
                href="https://www.facebook.com/onlineofferten/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                aria-label="Online-Offerten.ch auf Facebook"
              >
                <FaFacebook className="h-[22px] w-[22px]" aria-hidden />
              </a>
            </div>
          </div>

          <div className={footerMiddleGridClass}>
            {footerServiceCategories.map((cat) => (
              <div key={cat.slug}>
                <h2 className={sectionTitleClass}>{cat.label}</h2>
                <ul className="mt-3 space-y-2">
                  {cat.services
                    .filter((s) => !FOOTER_EXCLUDED_SERVICE_IDS.has(s.id))
                    .map((s) => (
                    <li key={`${cat.slug}-${s.id}`}>
                      <Link href={getCategoryServicePath(cat.slug, s)} className={linkClass}>
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
            <div>
              <h2 className={sectionTitleClass}>Tools &amp; Angebot</h2>
              <ul className="mt-3 space-y-2">
                {toolsLinks.map((link) => (
                  <li key={link.to}>
                    <Link href={link.to} className={linkClass}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={sectionTitleClass}>Unternehmen</h2>
              <ul className="mt-3 space-y-2">
                {unternehmenLinks.map((link) => (
                  <li key={link.to}>
                    <Link href={link.to} className={linkClass}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:flex-row sm:items-center">
          <p>© {currentYear} Online-Offerten.ch. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <ThemeToggleTabs />
            <Link href="/datenschutz" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              AGB
            </Link>
            <Link href="/ratgeber" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Ratgeber
            </Link>
            <Link href="/kunden-bewertungen" className="hover:text-emerald-700 dark:hover:text-emerald-400">
              Bewertungen
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
