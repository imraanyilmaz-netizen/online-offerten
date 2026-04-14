'use client'

import React, { useState, useCallback } from 'react'
import { Star, Send, Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface PublicReviewFormProps {
  partnerId: string
  partnerName: string
}

const SERVICE_OPTIONS = [
  { value: '', label: 'Bitte wählen...' },
  { value: 'privatumzug', label: 'Privatumzug' },
  { value: 'geschaeftsumzug', label: 'Geschäftsumzug' },
  { value: 'reinigung', label: 'Reinigung' },
  { value: 'endreinigung', label: 'Endreinigung' },
  { value: 'malerarbeiten', label: 'Malerarbeiten' },
  { value: 'sonstiges', label: 'Sonstiges' },
]

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
              className="text-gray-300"
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
      <span className="font-bold text-lg text-gray-800 w-10 text-center tabular-nums">
        {display > 0 ? display.toFixed(1) : '–'}
      </span>
    </div>
  )
}

export default function PublicReviewForm({ partnerId, partnerName }: PublicReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<'form' | 'submitting' | 'success' | 'error'>('form')
  const [errorMsg, setErrorMsg] = useState('')

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
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="py-10 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Vielen Dank für Ihre Bewertung!</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Ihre Bewertung wird nach Prüfung durch unser Team veröffentlicht. Dies dauert in der
            Regel 1–2 Werktage.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg rounded-xl border border-gray-200 bg-white overflow-hidden">
      <CardHeader
        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800">
              Bewertung schreiben
            </CardTitle>
            <CardDescription className="mt-1">
              Teilen Sie Ihre Erfahrung mit {partnerName}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 gap-1">
            {isOpen ? (
              <>Schliessen <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Bewerten <ChevronDown className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="p-5 pt-0 border-t border-gray-100">
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
                <Label htmlFor="pr-name" className="font-medium text-sm">
                  Ihr Name <span className="text-red-500">*</span>
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
                <Label htmlFor="pr-email" className="font-medium text-sm">
                  E-Mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pr-email"
                  type="email"
                  required
                  placeholder="max@beispiel.ch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-[11px] text-gray-400">Wird nicht veröffentlicht.</p>
              </div>
            </div>

            {/* City + Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pr-city" className="font-medium text-sm">
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
                <Label htmlFor="pr-service" className="font-medium text-sm">
                  Dienstleistung
                </Label>
                <select
                  id="pr-service"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <p className="text-sm font-semibold text-gray-700">
                Bewertung <span className="text-red-500">*</span>
              </p>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <Label className="text-sm text-gray-600">Preiseinhaltung</Label>
                  <InteractiveStars
                    value={ratings.price}
                    onChange={(val) => setRatings((p) => ({ ...p, price: val }))}
                    size={26}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <Label className="text-sm text-gray-600">Arbeitsablauf / Qualität</Label>
                  <InteractiveStars
                    value={ratings.workflow}
                    onChange={(val) => setRatings((p) => ({ ...p, workflow: val }))}
                    size={26}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <Label className="text-sm text-gray-600">Administration / Kommunikation</Label>
                  <InteractiveStars
                    value={ratings.administration}
                    onChange={(val) => setRatings((p) => ({ ...p, administration: val }))}
                    size={26}
                  />
                </div>
              </div>
              {overallRating > 0 && (
                <div className="flex items-center justify-between rounded-lg bg-white border border-gray-200 px-4 py-2.5 mt-2">
                  <span className="font-semibold text-gray-700">Gesamtbewertung</span>
                  <div className="flex items-center gap-2">
                    <InteractiveStars value={overallRating} onChange={() => {}} size={20} />
                  </div>
                </div>
              )}
            </div>

            {/* Comment */}
            <div className="space-y-1.5">
              <Label htmlFor="pr-text" className="font-medium text-sm">
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
              <p className="text-[11px] text-gray-400 text-right">{reviewText.length}/2000</p>
            </div>

            {/* Error */}
            {state === 'error' && errorMsg && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errorMsg}</p>
              </div>
            )}

            {/* Info */}
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Mit dem Absenden bestätigen Sie, dass Sie tatsächlich eine Dienstleistung von{' '}
              {partnerName} in Anspruch genommen haben. Ihre Bewertung wird nach Prüfung durch unser
              Team veröffentlicht.
            </p>

            {/* Submit */}
            <Button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-11"
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
