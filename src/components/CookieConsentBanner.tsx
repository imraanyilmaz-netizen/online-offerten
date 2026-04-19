'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cookie, X } from 'lucide-react'
import { getConsent, setConsent } from '@/lib/cookieConsent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setVisible(getConsent() === null)
  }, [])

  const acceptAll = () => {
    setConsent(true)
    setVisible(false)
  }

  const acceptNecessaryOnly = () => {
    setConsent(false)
    setVisible(false)
  }

  if (!mounted || !visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="pointer-events-auto relative max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 overflow-hidden">
        <div className="p-5 md:p-6 md:flex md:gap-6 md:items-start relative">
          <div
            className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700"
            aria-hidden
          >
            <Cookie className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="cookie-banner-title" className="text-lg font-bold text-slate-900 pr-8 md:pr-0">
              Cookies &amp; Datenschutz
            </h2>
            <p id="cookie-banner-desc" className="mt-2 text-sm text-slate-600 leading-relaxed">
              Wir verwenden Cookies, um die Website funktionsfähig zu machen und – nur mit Ihrer Einwilligung –
              Statistik sowie Marketing über Google Tag Manager / Analytics zu ermöglichen. Details finden Sie in
              unserer{' '}
              <Link href="/datenschutz" className="text-green-700 font-semibold underline hover:text-green-800">
                Datenschutzerklärung
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <Button
                type="button"
                onClick={acceptAll}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold w-full sm:w-auto"
              >
                Alle akzeptieren
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={acceptNecessaryOnly}
                className="border-slate-300 w-full sm:w-auto"
              >
                Nur notwendige
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={acceptNecessaryOnly}
            className="absolute top-3 right-3 md:relative md:top-0 md:right-0 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:shrink-0"
            aria-label="Nur notwendige Cookies und Banner schliessen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
