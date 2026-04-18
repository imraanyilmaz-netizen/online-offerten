'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { Star, Send, Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getGermanServiceName, getServiceIdsForCategory } from '@/data/categories'

interface PublicReviewFormProps {
  partnerId: string
  partnerName: string
  offeredServices?: string[]
  mainCategories?: string[]
}

type ServiceOption = { value: string; label: string }
type ServiceGroup = { label: string; options: ServiceOption[] }

const UMZUG_SERVICE_IDS = [
  'privatumzug',
  'geschaeftsumzug',
  'auslandumzug',
  'klaviertransport',
  'kleintransport',
  'raeumung_service',
  'entsorgung_service',
]
const REINIGUNG_SERVICE_IDS = [
  'wohnungsreinigung',
  'hausreinigung',
  'buero_reinigung',
  'umzugsreinigung',
  'unterhaltsreinigung',
  'grundreinigung',
  'baureinigung',
  'fensterreinigung',
  'bodenreinigung',
  'fassadenreinigung',
  'hofreinigung',
]
const MALER_SERVICE_IDS = ['maler_service']

function buildServiceGroups(
  offeredServices?: string[],
  mainCategories?: string[]
): ServiceGroup[] {
  /* Quelle wie im Sidebar-ServiceList: offered_services → sonst alle IDs der main_categories */
  const sourceIds =
    Array.isArray(offeredServices) && offeredServices.length > 0
      ? offeredServices
      : Array.isArray(mainCategories) && mainCategories.length > 0
      ? mainCategories.flatMap((cat) => getServiceIdsForCategory(cat))
      : []

  const groups: Record<'umzug' | 'reinigung' | 'maler', ServiceGroup> = {
    umzug: { label: 'Umzugsdienstleistungen', options: [] },
    reinigung: { label: 'Reinigungsdienstleistungen', options: [] },
    maler: { label: 'Malerarbeiten', options: [] },
  }
  const seenLabels: Record<'umzug' | 'reinigung' | 'maler', Set<string>> = {
    umzug: new Set(),
    reinigung: new Set(),
    maler: new Set(),
  }

  for (const raw of sourceIds) {
    const id = (raw || '').trim()
    if (!id) continue
    const label = getGermanServiceName(id)
    if (!label) continue

    let bucket: 'umzug' | 'reinigung' | 'maler' | null = null
    if (UMZUG_SERVICE_IDS.includes(id)) bucket = 'umzug'
    else if (REINIGUNG_SERVICE_IDS.includes(id)) bucket = 'reinigung'
    else if (MALER_SERVICE_IDS.includes(id)) bucket = 'maler'
    if (!bucket) continue

    if (seenLabels[bucket].has(label)) continue
    seenLabels[bucket].add(label)
    groups[bucket].options.push({ value: id, label })
  }

  return (['umzug', 'reinigung', 'maler'] as const)
    .map((k) => groups[k])
    .filter((g) => g.options.length > 0)
}

function InteractiveStars({
  value,
  onChange,
  size = 28,
}: {
  value: number
  onChange: (val: number) => void
  size?: number
}) {
  const [hover, setHover] = useState(0)

  const calculate = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const offsetX = clientX - rect.left
      const starWidth = rect.width / 5
      if (starWidth <= 0) return value
      const starIndex = Math.floor(offsetX / starWidth)
      const inStarX = offsetX - starIndex * starWidth
      const isHalf = inStarX < starWidth / 2
      return Math.max(0.5, Math.min(5, starIndex + (isHalf ? 0.5 : 1)))
    },
    [value]
  )

  const display = hover > 0 ? hover : value
  const rounded = Math.round(display * 2) / 2

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex cursor-pointer select-none"
        onMouseMove={(e) => setHover(calculate(e))}
        onMouseLeave={() => setHover(0)}
        onClick={(e) => onChange(calculate(e))}
        onTouchMove={(e) => onChange(calculate(e))}
        onTouchEnd={(e) => onChange(calculate(e))}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative p-0.5 pointer-events-none">
            <Star
              style={{ width: size, height: size }}
              className="text-muted-foreground/35"
            />
            {rounded >= star && (
              <Star
                style={{ width: size, height: size }}
                className="absolute top-0.5 left-0.5 text-yellow-400 fill-yellow-400"
              />
            )}
            {rounded === star - 0.5 && (
              <div className="absolute top-0.5 left-0.5 w-[50%] h-full overflow-hidden">
                <Star
                  style={{ width: size, height: size }}
                  className="text-yellow-400 fill-yellow-400"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <span className="w-10 text-center text-lg font-bold tabular-nums text-foreground">
        {display > 0 ? display.toFixed(1) : '–'}
      </span>
    </div>
  )
}

export default function PublicReviewForm({
  partnerId,
  partnerName,
  offeredServices,
  mainCategories,
}: PublicReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<'form' | 'submitting' | 'success' | 'error'>('form')
  const [errorMsg, setErrorMsg] = useState('')

  const serviceGroups = useMemo(
    () => buildServiceGroups(offeredServices, mainCategories),
    [offeredServices, mainCategories]
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [ratings, setRatings] = useState({ price: 0, workflow: 0, administration: 0 })
  const [reviewText, setReviewText] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const overallRating = (() => {
    const vals = Object.values(ratings).filter((r) => r > 0)
    if (vals.length === 0) return 0
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
  })()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (Object.values(ratings).some((r) => r === 0)) {
      setErrorMsg('Bitte bewerten Sie alle drei Kategorien.')
      setState('error')
      return
    }

    setState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/reviews/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner_id: partnerId,
          customer_name: name.trim(),
          customer_email: email.trim(),
          rating: overallRating,
          rating_price: ratings.price,
          rating_workflow: ratings.workflow,
          rating_administration: ratings.administration,
          review_text: reviewText.trim() || null,
          service_type: serviceType || null,
          city: city.trim() || null,
          website: honeypot,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Ein Fehler ist aufgetreten.')
        setState('error')
        return
      }

      setState('success')
    } catch {
      setErrorMsg('Netzwerkfehler. Bitte versuchen Sie es erneut.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <Card className="border-emerald-200/80 bg-emerald-50/60 dark:border-emerald-900/50 dark:bg-emerald-950/35">
        <CardContent className="py-10 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-600 dark:text-emerald-400" />
          <h3 className="mb-2 text-xl font-bold text-foreground">Vielen Dank für Ihre Bewertung!</h3>
          <p className="mx-auto max-w-md text-muted-foreground">
            Ihre Bewertung wird nach Prüfung durch unser Team veröffentlicht. Dies dauert in der
            Regel 1–2 Werktage.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden rounded-xl border-border shadow-lg">
      <CardHeader
        className="cursor-pointer select-none p-5 transition-colors hover:bg-muted/40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-card-foreground">
              Bewertung schreiben
            </CardTitle>
            <CardDescription className="mt-1">
              Teilen Sie Ihre Erfahrung mit {partnerName}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            {isOpen ? (
              <>Schliessen <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Bewerten <ChevronDown className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="border-t border-border p-5 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6 mt-5">
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pr-name" className="text-sm font-medium text-foreground">
                  Ihr Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pr-name"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Max Muster"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pr-email" className="text-sm font-medium text-foreground">
                  E-Mail <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pr-email"
                  type="email"
                  required
                  placeholder="max@beispiel.ch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-[11px] text-muted-foreground">Wird nicht veröffentlicht.</p>
              </div>
            </div>

            {/* City + Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pr-city" className="text-sm font-medium text-foreground">
                  Stadt / Ort
                </Label>
                <Input
                  id="pr-city"
                  maxLength={100}
                  placeholder="z.B. Zürich"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pr-service" className="text-sm font-medium text-foreground">
                  Dienstleistung
                </Label>
                <select
                  id="pr-service"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Bitte wählen...</option>
                  {serviceGroups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-4 rounded-xl border border-border bg-muted/40 p-4 dark:bg-muted/25">
              <p className="text-sm font-semibold text-foreground">
                Bewertung <span className="text-destructive">*</span>
              </p>
              <div className="space-y-3">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <Label className="text-sm text-muted-foreground">Preiseinhaltung</Label>
                  <InteractiveStars
                    value={ratings.price}
                    onChange={(val) => setRatings((p) => ({ ...p, price: val }))}
                    size={26}
                  />
                </div>
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <Label className="text-sm text-muted-foreground">Arbeitsablauf / Qualität</Label>
                  <InteractiveStars
                    value={ratings.workflow}
                    onChange={(val) => setRatings((p) => ({ ...p, workflow: val }))}
                    size={26}
                  />
                </div>
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <Label className="text-sm text-muted-foreground">Administration / Kommunikation</Label>
                  <InteractiveStars
                    value={ratings.administration}
                    onChange={(val) => setRatings((p) => ({ ...p, administration: val }))}
                    size={26}
                  />
                </div>
              </div>
              {overallRating > 0 && (
                <div className="mt-2 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5">
                  <span className="font-semibold text-foreground">Gesamtbewertung</span>
                  <div className="flex items-center gap-2">
                    <InteractiveStars value={overallRating} onChange={() => {}} size={20} />
                  </div>
                </div>
              )}
            </div>

            {/* Comment */}
            <div className="space-y-1.5">
              <Label htmlFor="pr-text" className="text-sm font-medium text-foreground">
                Ihre Erfahrung (optional)
              </Label>
              <Textarea
                id="pr-text"
                maxLength={2000}
                rows={4}
                placeholder="Beschreiben Sie Ihre Erfahrung mit dieser Firma..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <p className="text-right text-[11px] text-muted-foreground">{reviewText.length}/2000</p>
            </div>

            {/* Error */}
            {state === 'error' && errorMsg && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 dark:border-destructive/40 dark:bg-destructive/15">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{errorMsg}</p>
              </div>
            )}

            {/* Info */}
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Mit dem Absenden bestätigen Sie, dass Sie tatsächlich eine Dienstleistung von{' '}
              {partnerName} in Anspruch genommen haben. Ihre Bewertung wird nach Prüfung durch unser
              Team veröffentlicht.
            </p>

            {/* Submit */}
            <Button
              type="submit"
              disabled={state === 'submitting'}
              className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Wird gesendet...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Bewertung absenden
                </>
              )}
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  )
}
