'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BarChart3, ChevronDown, Cookie, ShieldCheck, X } from 'lucide-react'
import { getConsent, setConsent } from '@/lib/cookieConsent'

type Category = {
  id: 'necessary' | 'analytics'
  title: string
  description: string
  providers: string
  required: boolean
  icon: React.ComponentType<{ className?: string }>
}

const CATEGORIES: Category[] = [
  {
    id: 'necessary',
    title: 'Notwendig',
    description:
      'Diese Cookies sind technisch erforderlich, damit die Website und ihre Grundfunktionen (Anmeldung, Sicherheit, Formularschutz) zuverlässig arbeiten. Sie können nicht deaktiviert werden.',
    providers: 'Supabase Auth · Cookie-Einwilligung · Formular-Schutz',
    required: true,
    icon: ShieldCheck,
  },
  {
    id: 'analytics',
    title: 'Analyse, Marketing & Performance',
    description:
      'Helfen uns, die Nutzung der Website anonymisiert zu messen, die Ladezeiten zu verbessern und die Wirksamkeit unserer Kampagnen auszuwerten. Ohne Ihre Einwilligung setzen wir keine Cookies; es werden dann lediglich anonyme, cookielose Signale über Google Consent Mode v2 übertragen, die keine Rückschlüsse auf Ihre Person erlauben.',
    providers: 'Google Tag Manager · Google Analytics 4 · Google Ads · Vercel Speed Insights',
    required: false,
    icon: BarChart3,
  },
]

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [entered, setEntered] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hasConsent = getConsent() !== null
    setVisible(!hasConsent)
  }, [])

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setEntered(true), 20)
    return () => clearTimeout(t)
  }, [visible])

  const close = useCallback(() => {
    setEntered(false)
    const t = setTimeout(() => setVisible(false), 220)
    return () => clearTimeout(t)
  }, [])

  const acceptAll = useCallback(() => {
    setConsent(true)
    close()
  }, [close])

  const acceptNecessaryOnly = useCallback(() => {
    setConsent(false)
    close()
  }, [close])

  const saveSelection = useCallback(() => {
    setConsent(analytics)
    close()
  }, [analytics, close])

  const titleId = useMemo(() => 'cookie-banner-title', [])
  const descId = useMemo(() => 'cookie-banner-desc', [])

  if (!mounted || !visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3 pb-3 pt-6 sm:px-4 sm:pb-4 md:px-6 md:pb-6 pointer-events-none"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div
        className={[
          'pointer-events-auto w-full max-w-3xl rounded-2xl border border-slate-200/80 bg-white/95 text-slate-900 shadow-2xl shadow-slate-900/15 backdrop-blur-md transition-all duration-200 ease-out',
          'dark:border-border/80 dark:bg-card/95 dark:text-foreground dark:shadow-black/40',
          entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/70 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/50"
            aria-hidden
          >
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h2
              id={titleId}
              className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg dark:text-foreground"
            >
              Ihre Privatsphäre ist uns wichtig
            </h2>
            <p
              id={descId}
              className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground"
            >
              Wir setzen technisch notwendige Cookies ein, um die Website bereitzustellen. Mit Ihrer
              Einwilligung nutzen wir zusätzlich Analyse-, Marketing- und Performance-Tools, um unser
              Angebot zu verbessern. Sie können Ihre Auswahl jederzeit in der{' '}
              <Link
                href="/datenschutz"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Datenschutzerklärung
              </Link>{' '}
              anpassen.
            </p>
          </div>

          <button
            type="button"
            onClick={acceptNecessaryOnly}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-muted dark:hover:text-foreground"
            aria-label="Optionale Cookies ablehnen und Banner schliessen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Settings (expandable) */}
        {showSettings && (
          <div className="border-t border-slate-200/80 px-5 pb-2 pt-4 sm:px-6 dark:border-border">
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const checked = cat.required ? true : analytics
                return (
                  <li
                    key={cat.id}
                    className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-4 dark:border-border dark:bg-muted/40"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 ring-1 ring-slate-200/80 dark:bg-card dark:text-foreground dark:ring-border"
                        aria-hidden
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-foreground">
                            {cat.title}
                          </h3>
                          {cat.required ? (
                            <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
                              Immer aktiv
                            </span>
                          ) : (
                            <label
                              className="relative inline-flex shrink-0 cursor-pointer items-center"
                              htmlFor={`consent-${cat.id}`}
                            >
                              <input
                                id={`consent-${cat.id}`}
                                type="checkbox"
                                className="peer sr-only"
                                checked={checked}
                                onChange={(e) => setAnalytics(e.target.checked)}
                                aria-label={`${cat.title} aktivieren`}
                              />
                              <span className="h-5 w-9 rounded-full bg-slate-300 transition-colors peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:bg-muted dark:peer-focus-visible:ring-offset-card" />
                              <span className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
                            </label>
                          )}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-muted-foreground">
                          {cat.description}
                        </p>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-muted-foreground/80">
                          {cat.providers}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Action bar */}
        <div className="flex flex-col gap-2 border-t border-slate-200/80 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-border dark:bg-muted/30">
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-muted-foreground dark:hover:text-foreground"
            aria-expanded={showSettings}
            aria-controls="cookie-settings-panel"
          >
            <span>{showSettings ? 'Einstellungen ausblenden' : 'Einstellungen anpassen'}</span>
            <ChevronDown
              className={[
                'h-4 w-4 transition-transform duration-200',
                showSettings ? 'rotate-180' : 'rotate-0',
              ].join(' ')}
              aria-hidden
            />
          </button>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
            {showSettings ? (
              <Button
                type="button"
                onClick={saveSelection}
                variant="outline"
                className="border-slate-300 bg-white font-semibold text-slate-800 hover:bg-slate-50 dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted"
              >
                Auswahl speichern
              </Button>
            ) : (
              <Button
                type="button"
                onClick={acceptNecessaryOnly}
                variant="outline"
                className="border-slate-300 bg-white font-semibold text-slate-800 hover:bg-slate-50 dark:border-border dark:bg-card dark:text-foreground dark:hover:bg-muted"
              >
                Ablehnen
              </Button>
            )}
            <Button
              type="button"
              onClick={acceptAll}
              className="bg-emerald-600 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-card"
            >
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
