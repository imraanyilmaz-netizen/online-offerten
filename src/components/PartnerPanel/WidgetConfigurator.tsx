'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Copy, Check, Code, ExternalLink, Monitor, Smartphone, Star, Loader2, CheckCircle2, UserCircle2 } from 'lucide-react'

interface WidgetConfiguratorProps {
  partnerId: string
  partnerSlug: string
}

type WidgetType = 'list' | 'badge'
type WidgetTheme = 'light' | 'dark'

interface ReviewData {
  id: string
  customer_name: string
  rating: number
  rating_price: number | null
  rating_workflow: number | null
  rating_administration: number | null
  review_text: string
  review_date: string
  service_type: string
  city: string
}

interface WidgetData {
  partner: {
    company_name: string
    slug: string
    logo_url: string | null
    average_rating: number
    review_count: number
  }
  reviews: ReviewData[]
}

const BASE_URL = 'https://online-offerten.ch'

function StarRatingInline({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating)
  const hasHalf = (rating % 1) >= 0.25
  const stars = []
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <Star key={i} style={{ width: size, height: size }} className="text-yellow-400 fill-yellow-400" />
      )
    } else if (i === full && hasHalf) {
      stars.push(
        <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
          <Star style={{ width: size, height: size }} className="text-gray-300 absolute top-0 left-0" />
          <span className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <Star style={{ width: size, height: size }} className="text-yellow-400 fill-yellow-400" />
          </span>
        </span>
      )
    } else {
      stars.push(
        <Star key={i} style={{ width: size, height: size }} className="text-gray-300" />
      )
    }
  }
  return <span className="inline-flex items-center gap-px">{stars}</span>
}

function DetailBar({ label, value, theme }: { label: string; value: number; theme: WidgetTheme }) {
  const pct = Math.round((value / 5) * 100)
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{label}</span>
      <div className="flex items-center gap-1.5">
        <div className={`w-[60px] h-1 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <span className={`font-semibold w-6 text-right ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{value.toFixed(1)}</span>
      </div>
    </div>
  )
}

function serviceLabel(type: string) {
  const labels: Record<string, string> = {
    privatumzug: 'Privatumzug',
    geschaeftsumzug: 'Geschäftsumzug',
    reinigung: 'Reinigung',
    endreinigung: 'Endreinigung',
    malerarbeiten: 'Malerarbeiten',
  }
  return labels[type] || type
}

function formatDateDE(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function BadgePreview({ data, theme }: { data: WidgetData; theme: WidgetTheme }) {
  const { partner } = data
  const bg = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const border = theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
  const text = theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
  const muted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`${bg} border ${border} rounded-xl p-4 w-[260px] transition-shadow hover:shadow-lg`}>
      <div className="flex items-center gap-2.5 mb-3">
        {partner.logo_url ? (
          <img src={partner.logo_url} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
        ) : (
          <div className={`w-9 h-9 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex-shrink-0`} />
        )}
        <div className={`font-semibold text-sm ${text} truncate`}>{partner.company_name}</div>
      </div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-[22px] font-bold ${text}`}>{partner.average_rating.toFixed(1)}</span>
        <StarRatingInline rating={partner.average_rating} size={18} />
      </div>
      <div className={`text-xs ${muted} mb-3`}>{partner.review_count} Bewertungen</div>
      <div className={`flex items-center gap-1.5 pt-2.5 border-t ${border}`}>
        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
        <span className={`text-[11px] ${muted}`}>Verifiziert durch <strong className="text-green-600 font-semibold">Online-Offerten.ch</strong></span>
      </div>
    </div>
  )
}

function ListPreview({ data, theme }: { data: WidgetData; theme: WidgetTheme }) {
  const { partner, reviews } = data
  const bg = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const bgCard = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
  const border = theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
  const text = theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
  const muted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`${bg} border ${border} rounded-2xl overflow-hidden max-w-[520px]`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-5 border-b ${border}`}>
        <div className="flex items-center gap-3 min-w-0">
          {partner.logo_url ? (
            <img src={partner.logo_url} alt="" className="w-11 h-11 rounded-[10px] object-cover flex-shrink-0" />
          ) : (
            <div className={`w-11 h-11 rounded-[10px] ${bgCard} flex-shrink-0`} />
          )}
          <div className="min-w-0">
            <div className={`font-bold text-[15px] ${text} truncate`}>{partner.company_name}</div>
            <div className={`text-xs ${muted} mt-0.5`}>{partner.review_count} Bewertungen</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0 pl-3">
          <div className={`text-[28px] font-extrabold ${text} leading-none`}>{partner.average_rating.toFixed(1)}</div>
          <StarRatingInline rating={partner.average_rating} size={14} />
          <div className={`text-[11px] ${muted}`}>von 5</div>
        </div>
      </div>

      {/* Reviews */}
      <div className="p-3 px-5 pb-4 space-y-3">
        {reviews.length === 0 ? (
          <div className={`py-6 text-center text-sm ${muted}`}>Noch keine Bewertungen vorhanden.</div>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className={`${bgCard} border ${border} rounded-xl p-4`}>
              <div className="flex items-start justify-between mb-2.5 gap-2 flex-wrap">
                <div className="flex items-center gap-2.5 min-w-0">
                  <UserCircle2 className={`w-8 h-8 ${muted} flex-shrink-0`} />
                  <div>
                    <div className={`text-[13px] font-semibold ${text}`}>
                      {r.customer_name || 'Anonym'}
                      {r.city && <span className={`font-normal ${muted}`}>, {r.city}</span>}
                    </div>
                    <div className={`text-[11px] ${muted}`}>{formatDateDE(r.review_date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <StarRatingInline rating={r.rating} size={14} />
                  <span className={`text-[13px] font-bold ${text}`}>{r.rating.toFixed(1)}</span>
                </div>
              </div>
              {r.review_text && <p className={`text-[13px] ${text} leading-relaxed mb-2.5`}>{r.review_text}</p>}
              {(r.rating_price != null || r.rating_workflow != null || r.rating_administration != null) && (
                <div className={`flex flex-col gap-1 pt-2 border-t ${border} mb-2`}>
                  {r.rating_price != null && <DetailBar label="Preiseinhaltung" value={r.rating_price} theme={theme} />}
                  {r.rating_workflow != null && <DetailBar label="Arbeitsablauf" value={r.rating_workflow} theme={theme} />}
                  {r.rating_administration != null && <DetailBar label="Administration" value={r.rating_administration} theme={theme} />}
                </div>
              )}
              {r.service_type && (
                <span className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                  theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                }`}>
                  {serviceLabel(r.service_type)}
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between px-5 py-3.5 border-t ${border} ${bgCard} gap-2 flex-wrap`}>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className={`text-[11px] ${muted}`}>Verifiziert durch <strong className="text-green-600 font-semibold">Online-Offerten.ch</strong></span>
        </div>
        <span className="text-xs font-semibold text-green-600">Alle Bewertungen lesen →</span>
      </div>
    </div>
  )
}

export default function WidgetConfigurator({ partnerId, partnerSlug }: WidgetConfiguratorProps) {
  const [widgetType, setWidgetType] = useState<WidgetType>('list')
  const [theme, setTheme] = useState<WidgetTheme>('light')
  const [limit, setLimit] = useState(5)
  const [copied, setCopied] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<WidgetData | null>(null)
  const [previewLoading, setPreviewLoading] = useState(true)

  const fetchPreviewData = useCallback(async () => {
    setPreviewLoading(true)
    try {
      const res = await fetch(`/api/widget/reviews/${partnerId}?limit=${limit}&type=${widgetType}`)
      if (res.ok) {
        const data = await res.json()
        setPreviewData(data)
      }
    } catch {
      // Silently fail
    } finally {
      setPreviewLoading(false)
    }
  }, [partnerId, limit, widgetType])

  useEffect(() => {
    fetchPreviewData()
  }, [fetchPreviewData])

  const embedCode = widgetType === 'badge'
    ? `<div id="online-offerten-badge"\n     data-oo-partner-id="${partnerSlug}"\n     data-type="badge"\n     data-theme="${theme}">\n</div>\n<script src="${BASE_URL}/widget/reviews.js" async><\/script>`
    : `<div id="online-offerten-reviews"\n     data-oo-partner-id="${partnerSlug}"\n     data-type="list"\n     data-limit="${limit}"\n     data-theme="${theme}">\n</div>\n<script src="${BASE_URL}/widget/reviews.js" async><\/script>`

  const wordpressCode = widgetType === 'badge'
    ? `[online_offerten_reviews partner_id="${partnerSlug}" type="badge" theme="${theme}"]`
    : `[online_offerten_reviews partner_id="${partnerSlug}" type="list" limit="${limit}" theme="${theme}"]`

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Bewertungs-Widget
          </CardTitle>
          <CardDescription>
            Zeigen Sie Ihre verifizierten Online-Offerten Bewertungen auf Ihrer eigenen Webseite.
            Wählen Sie einen Widget-Typ und kopieren Sie den Code.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Widget Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Widget-Typ</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setWidgetType('list')}
                className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  widgetType === 'list'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <Monitor className={`h-8 w-8 ${widgetType === 'list' ? 'text-green-600' : 'text-gray-400'}`} />
                <div className="text-center">
                  <div className={`font-semibold text-sm ${widgetType === 'list' ? 'text-green-700' : 'text-gray-700'}`}>
                    Bewertungsliste
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Vollständige Bewertungen mit Details
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setWidgetType('badge')}
                className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  widgetType === 'badge'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <Smartphone className={`h-8 w-8 ${widgetType === 'badge' ? 'text-green-600' : 'text-gray-400'}`} />
                <div className="text-center">
                  <div className={`font-semibold text-sm ${widgetType === 'badge' ? 'text-green-700' : 'text-gray-700'}`}>
                    Kompaktes Badge
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Kleine Bewertungs-Box für Sidebar
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Farbschema</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  theme === 'light'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white border border-gray-300" />
                Hell
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  theme === 'dark'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-gray-800 border border-gray-600" />
                Dunkel
              </button>
            </div>
          </div>

          {/* Limit (only for list) */}
          {widgetType === 'list' && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Anzahl Bewertungen</Label>
              <div className="flex gap-2">
                {[3, 5, 10].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setLimit(n)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      limit === n
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vorschau</CardTitle>
          <CardDescription>So sieht das Widget auf Ihrer Webseite aus.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {previewLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                <span className="ml-2 text-sm text-gray-500">Vorschau wird geladen...</span>
              </div>
            ) : previewData ? (
              widgetType === 'badge'
                ? <BadgePreview data={previewData} theme={theme} />
                : <ListPreview data={previewData} theme={theme} />
            ) : (
              <div className="text-center py-8 text-sm text-gray-500">
                Vorschau konnte nicht geladen werden.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* HTML Embed Code */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Code className="h-4 w-4" />
            HTML Embed-Code
          </CardTitle>
          <CardDescription>
            Fügen Sie diesen Code in Ihre Webseite ein, dort wo das Widget erscheinen soll.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto leading-relaxed">
              {embedCode}
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white"
              onClick={() => handleCopy(embedCode, 'html')}
            >
              {copied === 'html' ? (
                <><Check className="h-3.5 w-3.5 mr-1.5 text-green-600" /> Kopiert!</>
              ) : (
                <><Copy className="h-3.5 w-3.5 mr-1.5" /> Kopieren</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* WordPress Code */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.009 12c0-1.717.49-3.32 1.333-4.683L8.63 18.73A8.99 8.99 0 013.009 12zm8.991 9a8.95 8.95 0 01-2.722-.423l2.89-8.396 2.96 8.112a.86.86 0 00.065.152A8.95 8.95 0 0112 21zm1.237-13.158c.58-.03 1.102-.089 1.102-.089.519-.06.458-.823-.06-.794 0 0-1.56.122-2.567.122-.948 0-2.538-.122-2.538-.122-.519-.03-.579.764-.06.794 0 0 .492.06 1.012.089l1.504 4.122-2.113 6.338-3.516-10.46c.58-.03 1.102-.089 1.102-.089.519-.06.458-.823-.06-.794 0 0-1.56.122-2.567.122-.18 0-.393-.005-.618-.013A8.978 8.978 0 0112 3.009c2.345 0 4.484.9 6.086 2.372-.039-.003-.076-.009-.116-.009-1.57 0-1.931 1.183-1.931 1.967 0 .645.34 1.192.703 1.838.274.47.593 1.074.593 1.945 0 .604-.232 1.304-.538 2.28l-.706 2.357-2.563-7.617zm4.717 11.004l2.357-6.812c.441-1.1.587-1.979.587-2.762 0-.284-.019-.547-.052-.796A8.96 8.96 0 0120.991 12a8.98 8.98 0 01-3.046 6.746z"/></svg>
            WordPress Shortcode
          </CardTitle>
          <CardDescription>
            Falls Sie WordPress verwenden: Installieren Sie unser Plugin und nutzen Sie diesen Shortcode.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-xs overflow-x-auto leading-relaxed">
              {wordpressCode}
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-white"
              onClick={() => handleCopy(wordpressCode, 'wp')}
            >
              {copied === 'wp' ? (
                <><Check className="h-3.5 w-3.5 mr-1.5 text-green-600" /> Kopiert!</>
              ) : (
                <><Copy className="h-3.5 w-3.5 mr-1.5" /> Kopieren</>
              )}
            </Button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">WordPress-Anleitung:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs text-blue-700">
              <li>Laden Sie unser WordPress-Plugin herunter oder fügen Sie den HTML-Code direkt in ein &quot;Benutzerdefiniertes HTML&quot;-Widget ein.</li>
              <li>Alternativ können Sie den HTML Embed-Code (oben) direkt in einen HTML-Block oder das Theme einfügen.</li>
              <li>Das Widget lädt automatisch Ihre neuesten Bewertungen von Online-Offerten.ch.</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Direct Link */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Direkter Link
          </CardTitle>
          <CardDescription>
            Teilen Sie diesen Link, damit Kunden direkt Ihr Bewertungsprofil sehen können.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 truncate">
              {BASE_URL}/partner/{partnerSlug}
            </div>
            <Button
              variant="outline"
              onClick={() => handleCopy(`${BASE_URL}/partner/${partnerSlug}`, 'link')}
            >
              {copied === 'link' ? (
                <><Check className="h-4 w-4 mr-1.5 text-green-600" /> Kopiert!</>
              ) : (
                <><Copy className="h-4 w-4 mr-1.5" /> Kopieren</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
