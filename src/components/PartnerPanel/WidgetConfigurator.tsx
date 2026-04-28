'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Copy, Check, Code, ExternalLink, Monitor, Smartphone, Star, Loader2, CheckCircle2, UserCircle2, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react'

interface WidgetConfiguratorProps {
  partnerId: string
  partnerSlug: string
}

type WidgetType = 'list' | 'badge' | 'carousel'
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
      stars.push(<Star key={i} style={{ width: size, height: size }} className="text-yellow-400 fill-yellow-400" />)
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
      stars.push(<Star key={i} style={{ width: size, height: size }} className="text-gray-300" />)
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
  const labels: Record<string, string> = { privatumzug: 'Privatumzug', geschaeftsumzug: 'Geschäftsumzug', reinigung: 'Reinigung', endreinigung: 'Endreinigung', malerarbeiten: 'Malerarbeiten' }
  return labels[type] || type
}

function formatDateDE(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function ReviewCardPreview({ r, theme }: { r: ReviewData; theme: WidgetTheme }) {
  const bgCard = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
  const border = theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
  const text = theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
  const muted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`${bgCard} border ${border} rounded-xl p-4`}>
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
        <span className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
          {serviceLabel(r.service_type)}
        </span>
      )}
    </div>
  )
}

function FooterPreview({ theme }: { theme: WidgetTheme }) {
  const bgCard = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
  const border = theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
  const muted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
  return (
    <div className={`flex items-center justify-between px-5 py-3.5 border-t ${border} ${bgCard} gap-2 flex-wrap`}>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
        <span className={`text-[11px] ${muted}`}>Verifiziert durch <strong className="text-green-600 font-semibold">Online-Offerten.ch</strong></span>
      </div>
      <span className="text-xs font-semibold text-green-600">Alle Bewertungen lesen →</span>
    </div>
  )
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
        {partner.logo_url ? <img src={partner.logo_url} alt={partner.company_name || 'Partner Logo'} className={`w-9 h-9 rounded-lg object-contain p-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex-shrink-0`} /> : <div className={`w-9 h-9 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex-shrink-0`} />}
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
  const border = theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
  const text = theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
  const muted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
  const bgCard = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'

  return (
    <div className={`${bg} border ${border} rounded-2xl overflow-hidden max-w-[520px]`}>
      <div className={`flex items-center justify-between p-5 border-b ${border}`}>
        <div className="flex items-center gap-3 min-w-0">
          {partner.logo_url ? <img src={partner.logo_url} alt={partner.company_name || 'Partner Logo'} className={`w-11 h-11 rounded-[10px] object-contain p-0.5 ${bgCard} flex-shrink-0`} /> : <div className={`w-11 h-11 rounded-[10px] ${bgCard} flex-shrink-0`} />}
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
      <div className="p-3 px-5 pb-4 space-y-3">
        {reviews.length === 0
          ? <div className={`py-6 text-center text-sm ${muted}`}>Noch keine Bewertungen vorhanden.</div>
          : reviews.map((r) => <ReviewCardPreview key={r.id} r={r} theme={theme} />)
        }
      </div>
      <FooterPreview theme={theme} />
    </div>
  )
}

function CarouselPreview({ data, theme }: { data: WidgetData; theme: WidgetTheme }) {
  const { partner, reviews } = data
  const bg = theme === 'dark' ? 'bg-gray-800' : 'bg-white'
  const bgCard = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
  const border = theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
  const text = theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
  const muted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
  const [current, setCurrent] = useState(0)

  return (
    <div className={`${bg} border ${border} rounded-2xl overflow-hidden max-w-[520px]`}>
      <div className={`flex items-center justify-between p-4 border-b ${border}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          {partner.logo_url ? <img src={partner.logo_url} alt={partner.company_name || 'Partner Logo'} className={`w-9 h-9 rounded-lg object-contain p-0.5 ${bgCard} flex-shrink-0`} /> : <div className={`w-9 h-9 rounded-lg ${bgCard} flex-shrink-0`} />}
          <div className="min-w-0">
            <div className={`font-bold text-sm ${text} truncate`}>{partner.company_name}</div>
            <div className={`text-[11px] ${muted}`}><StarRatingInline rating={partner.average_rating} size={12} /> {partner.review_count} Bewertungen</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xl font-extrabold ${text}`}>{partner.average_rating.toFixed(1)}</span>
          <StarRatingInline rating={partner.average_rating} size={16} />
        </div>
      </div>
      {reviews.length === 0 ? (
        <div className={`py-8 text-center text-sm ${muted}`}>Noch keine Bewertungen.</div>
      ) : (
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${current * 100}%)` }}>
              {reviews.map((r) => (
                <div key={r.id} className="flex-shrink-0 w-full p-4">
                  <div className={`${bgCard} border ${border} rounded-xl p-4`}>
                    <div className="flex items-center gap-1 mb-2">
                      <StarRatingInline rating={r.rating} size={15} />
                      <span className={`text-[13px] font-bold ${text} ml-1`}>{r.rating.toFixed(1)}</span>
                    </div>
                    {r.review_text ? (
                      <p className={`text-[13px] ${text} leading-relaxed mb-3 line-clamp-3`}>{r.review_text}</p>
                    ) : (
                      <p className={`text-[13px] ${muted} italic mb-3`}>{serviceLabel(r.service_type || '')}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <UserCircle2 className={`w-7 h-7 ${muted} flex-shrink-0`} />
                      <div>
                        <div className={`text-xs font-semibold ${text}`}>{r.customer_name || 'Anonym'}</div>
                        <div className={`text-[10px] ${muted}`}>{r.city ? `${r.city} · ` : ''}{formatDateDE(r.review_date)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {reviews.length > 1 && (
            <>
              <button onClick={() => setCurrent(current <= 0 ? reviews.length - 1 : current - 1)} className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${bg} border ${border} shadow flex items-center justify-center hover:bg-opacity-80`}>
                <ChevronLeft className={`w-4 h-4 ${text}`} />
              </button>
              <button onClick={() => setCurrent(current >= reviews.length - 1 ? 0 : current + 1)} className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${bg} border ${border} shadow flex items-center justify-center hover:bg-opacity-80`}>
                <ChevronRight className={`w-4 h-4 ${text}`} />
              </button>
            </>
          )}
        </div>
      )}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-3">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-green-600 scale-125' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
          ))}
        </div>
      )}
      <FooterPreview theme={theme} />
    </div>
  )
}

export default function WidgetConfigurator({ partnerId, partnerSlug }: WidgetConfiguratorProps) {
  const [widgetType, setWidgetType] = useState<WidgetType>('list')
  const [theme, setTheme] = useState<WidgetTheme>('light')
  const [limit, setLimit] = useState(5)
  const [position, setPosition] = useState<'right' | 'left'>('right')
  const [autoplay, setAutoplay] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<WidgetData | null>(null)
  const [previewLoading, setPreviewLoading] = useState(true)

  const fetchPreviewData = useCallback(async () => {
    setPreviewLoading(true)
    try {
      const fetchType = widgetType === 'carousel' ? 'list' : widgetType
      const res = await fetch(`/api/widget/reviews/${partnerId}?limit=${limit}&type=${fetchType}`)
      if (res.ok) setPreviewData(await res.json())
    } catch { /* */ } finally { setPreviewLoading(false) }
  }, [partnerId, limit, widgetType])

  useEffect(() => { fetchPreviewData() }, [fetchPreviewData])

  function buildEmbedCode() {
    const attrs = [`data-oo-partner-id="${partnerSlug}"`, `data-type="${widgetType}"`, `data-theme="${theme}"`]
    if (widgetType === 'list' || widgetType === 'carousel') attrs.push(`data-limit="${limit}"`)
    if (widgetType === 'carousel') attrs.push(`data-autoplay="${autoplay}"`)
    attrs.push(`data-position="${position}"`)
    return `<div id="online-offerten-widget"\n     ${attrs.join('\n     ')}>\n</div>\n<script src="${BASE_URL}/widget/reviews.js" async><\/script>`
  }

  const embedCode = buildEmbedCode()

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
    }
    setCopied(id); setTimeout(() => setCopied(null), 2000)
  }

  const widgetTypes = [
    { id: 'list' as const, icon: Monitor, label: 'Bewertungsliste', desc: 'Vollständige Bewertungen mit Details' },
    { id: 'carousel' as const, icon: LayoutList, label: 'Karussell', desc: 'Horizontale Bewertungs-Slider' },
    { id: 'badge' as const, icon: Smartphone, label: 'Kompaktes Badge', desc: 'Kleine Box für Sidebar' },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5" />Bewertungs-Widget</CardTitle>
          <CardDescription>Wählen Sie ein zusätzliches Widget für eine bestimmte Seite. Das Floating Badge wird immer automatisch mitgeliefert.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Widget-Typ</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {widgetTypes.map((wt) => (
                <button key={wt.id} type="button" onClick={() => setWidgetType(wt.id)}
                  className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${widgetType === wt.id ? 'border-green-500 bg-green-50 dark:border-emerald-600 dark:bg-emerald-950/35 shadow-sm' : 'border-border hover:border-muted-foreground/30 bg-card'}`}>
                  <wt.icon className={`h-8 w-8 ${widgetType === wt.id ? 'text-green-600 dark:text-emerald-400' : 'text-muted-foreground'}`} />
                  <div className="text-center">
                    <div className={`font-semibold text-sm ${widgetType === wt.id ? 'text-green-700 dark:text-emerald-200' : 'text-foreground'}`}>{wt.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{wt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Farbschema</Label>
            <div className="flex gap-3">
              {(['light', 'dark'] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTheme(t)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${theme === t ? 'border-green-500 bg-green-50 text-green-700 dark:border-emerald-600 dark:bg-emerald-950/35 dark:text-emerald-200' : 'border-border text-muted-foreground hover:border-muted-foreground/40'}`}>
                  <div className={`w-5 h-5 rounded-full ${t === 'light' ? 'bg-white border border-gray-300' : 'bg-gray-800 border border-gray-600'}`} />
                  {t === 'light' ? 'Hell' : 'Dunkel'}
                </button>
              ))}
            </div>
          </div>

          {(widgetType === 'list' || widgetType === 'carousel') && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Anzahl Bewertungen</Label>
              <div className="flex gap-2">
                {[3, 5, 10].map((n) => (
                  <button key={n} type="button" onClick={() => setLimit(n)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${limit === n ? 'border-green-500 bg-green-50 text-green-700 dark:border-emerald-600 dark:bg-emerald-950/35 dark:text-emerald-200' : 'border-border text-muted-foreground hover:border-muted-foreground/40'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Floating Badge Position</Label>
            <div className="flex gap-3">
              {(['right', 'left'] as const).map((p) => (
                <button key={p} type="button" onClick={() => setPosition(p)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${position === p ? 'border-green-500 bg-green-50 text-green-700 dark:border-emerald-600 dark:bg-emerald-950/35 dark:text-emerald-200' : 'border-border text-muted-foreground hover:border-muted-foreground/40'}`}>
                  {p === 'right' ? 'Rechts unten' : 'Links unten'}
                </button>
              ))}
            </div>
          </div>

          {widgetType === 'carousel' && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Autoplay</Label>
              <div className="flex gap-3">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => setAutoplay(v)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${autoplay === v ? 'border-green-500 bg-green-50 text-green-700 dark:border-emerald-600 dark:bg-emerald-950/35 dark:text-emerald-200' : 'border-border text-muted-foreground hover:border-muted-foreground/40'}`}>
                    {v ? 'Aktiviert' : 'Deaktiviert'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vorschau</CardTitle>
          <CardDescription>So sieht das Widget auf Ihrer Webseite aus. Das Floating Badge erscheint immer zusätzlich.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            {previewLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                <span className="ml-2 text-sm text-muted-foreground">Vorschau wird geladen...</span>
              </div>
            ) : previewData ? (
              <div className="space-y-6">
                {widgetType === 'badge' ? <BadgePreview data={previewData} theme={theme} />
                  : widgetType === 'carousel' ? <CarouselPreview data={previewData} theme={theme} />
                  : <ListPreview data={previewData} theme={theme} />
                }
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground">Vorschau konnte nicht geladen werden.</div>
            )}
          </div>
          {previewData && (
            <div className="flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 dark:bg-emerald-950/35 dark:border-emerald-800 p-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 dark:bg-emerald-600 flex items-center justify-center shadow">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-800 dark:text-emerald-200">+ Floating Badge</p>
                <p className="text-[11px] text-green-600 dark:text-emerald-300/90">Erscheint automatisch unten {position === 'right' ? 'rechts' : 'links'} auf jeder Seite</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Code className="h-4 w-4" />HTML Embed-Code</CardTitle>
          <CardDescription>Fügen Sie diesen Code in Ihre Webseite ein, dort wo das Widget erscheinen soll.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto leading-relaxed">{embedCode}</pre>
            <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-card border-border" onClick={() => handleCopy(embedCode, 'html')}>
              {copied === 'html' ? <><Check className="h-3.5 w-3.5 mr-1.5 text-green-600" /> Kopiert!</> : <><Copy className="h-3.5 w-3.5 mr-1.5" /> Kopieren</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><ExternalLink className="h-4 w-4" />Direkter Link</CardTitle>
          <CardDescription>Teilen Sie diesen Link, damit Kunden direkt Ihr Bewertungsprofil sehen können.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground truncate">{BASE_URL}/partner/{partnerSlug}</div>
            <Button variant="outline" onClick={() => handleCopy(`${BASE_URL}/partner/${partnerSlug}`, 'link')}>
              {copied === 'link' ? <><Check className="h-4 w-4 mr-1.5 text-green-600" /> Kopiert!</> : <><Copy className="h-4 w-4 mr-1.5" /> Kopieren</>}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
