'use client'

import React, { useState, useEffect } from 'react'
import { X, Settings, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent-preferences'
const COOKIE_CONSENT_TIMESTAMP_KEY = 'cookie-consent-timestamp'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem(COOKIE_CONSENT_KEY)
    const savedTimestamp = localStorage.getItem(COOKIE_CONSENT_TIMESTAMP_KEY)
    
    // Show banner if no preferences saved or if older than 1 year
    if (!savedPreferences) {
      setShowBanner(true)
    } else {
      const preferences = JSON.parse(savedPreferences)
      setPreferences({
        necessary: true,
        analytics: preferences.analytics || false,
        marketing: preferences.marketing || false,
      })
      
      // Re-request consent after 1 year
      if (savedTimestamp) {
        const timestamp = parseInt(savedTimestamp)
        const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000
        if (timestamp < oneYearAgo) {
          setShowBanner(true)
        }
      }
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
    localStorage.setItem(COOKIE_CONSENT_TIMESTAMP_KEY, Date.now().toString())
    setShowBanner(false)
    setPreferences(prefs)
    
    // Trigger GTM initialization based on preferences
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: prefs }))
    }
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    savePreferences(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    savePreferences(onlyNecessary)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
    setShowPreferences(false)
  }

  const handleTogglePreference = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return // Cannot disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner - Right Bottom Corner */}
      <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 shadow-2xl rounded-lg p-4 md:p-6 max-w-md w-[calc(100%-2rem)] md:w-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 flex-1">
              Cookie-Einstellungen
            </h3>
            <button
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
            Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Website zu analysieren. 
            Sie können selbst entscheiden, ob Sie die Cookies zulassen möchten.
          </p>
          <p className="text-xs text-gray-500">
            <a href="/datenschutz" className="underline hover:text-gray-700">
              Weitere Informationen
            </a>
          </p>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAcceptAll}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              Alle akzeptieren
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPreferences(true)}
                className="flex-1 text-sm"
              >
                <Settings className="w-4 h-4 mr-1" />
                Einstellungen
              </Button>
              <Button
                variant="outline"
                onClick={handleRejectAll}
                className="flex-1 text-sm"
              >
                Ablehnen
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie-Einstellungen</DialogTitle>
            <DialogDescription>
              Wählen Sie, welche Cookies Sie zulassen möchten. Notwendige Cookies können nicht deaktiviert werden.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">Notwendige Cookies</h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Immer aktiv</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich. 
                    Sie können nicht deaktiviert werden.
                  </p>
                </div>
                <div className="ml-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Analyse-Cookies</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, 
                    indem sie Informationen anonym sammeln und melden.
                  </p>
                  <p className="text-xs text-gray-500">
                    Verwendet für: Google Analytics, Google Tag Manager
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleTogglePreference('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.analytics ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing-Cookies</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Diese Cookies werden verwendet, um Besuchern auf anderen Websites relevante 
                    Werbung und Marketingkampagnen bereitzustellen.
                  </p>
                  <p className="text-xs text-gray-500">
                    Verwendet für: Remarketing, Conversion-Tracking
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleTogglePreference('marketing')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.marketing ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowPreferences(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleSavePreferences} className="bg-green-600 hover:bg-green-700">
              Einstellungen speichern
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
