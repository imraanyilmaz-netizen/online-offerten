'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Download, Share2, X, Loader2 } from 'lucide-react'

interface SocialShareCardProps {
  partnerSlug: string
  partnerId: string
}

interface PartnerShareData {
  company_name: string
  slug: string
  logo_url: string | null
  average_rating: number
  review_count: number
  hero_image_url?: string | null
  gallery_images?: string[]
}

const PROFILE_URL_BASE = 'https://online-offerten.ch/partner/'

function drawStars(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rating: number,
  size: number
) {
  const gap = size * 1.15
  for (let i = 0; i < 5; i++) {
    const cx = x + i * gap + size / 2
    const cy = y + size / 2
    const fill = i < Math.floor(rating)
    const half = !fill && i === Math.floor(rating) && rating % 1 >= 0.25

    drawStar(ctx, cx, cy, size * 0.48, fill ? '#FBBF24' : half ? '#FBBF24' : '#D1D5DB', fill || half)
    if (half) {
      ctx.save()
      ctx.beginPath()
      ctx.rect(cx - size / 2, cy - size / 2, size / 2, size)
      ctx.clip()
      drawStar(ctx, cx, cy, size * 0.48, '#FBBF24', true)
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.rect(cx, cy - size / 2, size / 2, size)
      ctx.clip()
      drawStar(ctx, cx, cy, size * 0.48, '#D1D5DB', false)
      ctx.restore()
    }
  }
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
  filled: boolean
) {
  const spikes = 5
  const outerR = r
  const innerR = r * 0.45
  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i++) {
    const rad = (Math.PI / 2) * -1 + (Math.PI / spikes) * i
    const radius = i % 2 === 0 ? outerR : innerR
    const sx = cx + Math.cos(rad) * radius
    const sy = cy + Math.sin(rad) * radius
    if (i === 0) ctx.moveTo(sx, sy)
    else ctx.lineTo(sx, sy)
  }
  ctx.closePath()
  if (filled) {
    ctx.fillStyle = color
    ctx.fill()
  } else {
    ctx.fillStyle = color
    ctx.fill()
  }
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function drawCircleImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  r: number
) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2)
  ctx.restore()
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function generateShareImage(partner: PartnerShareData): Promise<string> {
  const W = 1080
  const H = 1080
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, '#f0fdf4')
  grad.addColorStop(0.5, '#ffffff')
  grad.addColorStop(1, '#ecfdf5')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // Subtle pattern dots
  ctx.fillStyle = 'rgba(16, 185, 129, 0.04)'
  for (let i = 0; i < W; i += 40) {
    for (let j = 0; j < H; j += 40) {
      ctx.beginPath()
      ctx.arc(i, j, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Top green bar
  const barGrad = ctx.createLinearGradient(0, 0, W, 0)
  barGrad.addColorStop(0, '#059669')
  barGrad.addColorStop(1, '#10b981')
  ctx.fillStyle = barGrad
  drawRoundedRect(ctx, 40, 40, W - 80, 8, 4)
  ctx.fill()

  // Logo
  let logoY = 120
  if (partner.logo_url) {
    try {
      const logoImg = await loadImage(partner.logo_url)
      const logoSize = 120
      const lx = W / 2 - logoSize / 2
      ctx.save()
      drawRoundedRect(ctx, lx - 4, logoY - 4, logoSize + 8, logoSize + 8, 24)
      ctx.fillStyle = '#fff'
      ctx.shadowColor = 'rgba(0,0,0,0.1)'
      ctx.shadowBlur = 20
      ctx.fill()
      ctx.restore()

      ctx.save()
      drawRoundedRect(ctx, lx, logoY, logoSize, logoSize, 20)
      ctx.clip()
      ctx.drawImage(logoImg, lx, logoY, logoSize, logoSize)
      ctx.restore()
      logoY += logoSize + 30
    } catch {
      logoY += 20
    }
  } else {
    logoY += 20
  }

  // Company name
  ctx.fillStyle = '#111827'
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'center'
  const nameText = partner.company_name
  if (ctx.measureText(nameText).width > W - 120) {
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }
  ctx.fillText(nameText, W / 2, logoY + 10, W - 120)

  // Rating section
  const ratingY = logoY + 60

  // Big rating number
  ctx.fillStyle = '#111827'
  ctx.font = 'bold 140px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(partner.average_rating.toFixed(1), W / 2, ratingY + 130)

  // "von 5" text
  ctx.fillStyle = '#6b7280'
  ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.fillText('von 5', W / 2, ratingY + 165)

  // Stars
  const starSize = 48
  const starsWidth = starSize * 1.15 * 5
  drawStars(ctx, W / 2 - starsWidth / 2, ratingY + 190, partner.average_rating, starSize)

  // Review count
  ctx.fillStyle = '#6b7280'
  ctx.font = '26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(`${partner.review_count} verifizierte Bewertungen`, W / 2, ratingY + 290)

  // Gallery images (if any)
  const galleryImages = partner.gallery_images || []
  if (galleryImages.length > 0) {
    const imgCount = Math.min(galleryImages.length, 3)
    const imgSize = 160
    const imgGap = 20
    const totalWidth = imgCount * imgSize + (imgCount - 1) * imgGap
    const startX = W / 2 - totalWidth / 2
    const imgY = ratingY + 330

    for (let i = 0; i < imgCount; i++) {
      try {
        const img = await loadImage(galleryImages[i])
        const ix = startX + i * (imgSize + imgGap)

        ctx.save()
        ctx.shadowColor = 'rgba(0,0,0,0.08)'
        ctx.shadowBlur = 12
        drawRoundedRect(ctx, ix, imgY, imgSize, imgSize, 16)
        ctx.fillStyle = '#fff'
        ctx.fill()
        ctx.restore()

        ctx.save()
        drawRoundedRect(ctx, ix, imgY, imgSize, imgSize, 16)
        ctx.clip()
        const aspect = img.width / img.height
        let dw = imgSize, dh = imgSize
        if (aspect > 1) { dw = imgSize * aspect; } else { dh = imgSize / aspect; }
        ctx.drawImage(img, ix - (dw - imgSize) / 2, imgY - (dh - imgSize) / 2, dw, dh)
        ctx.restore()
      } catch { /* skip */ }
    }
  }

  // Bottom branding bar
  const brandY = H - 100
  ctx.fillStyle = '#059669'
  drawRoundedRect(ctx, 40, brandY, W - 80, 60, 12)
  ctx.fill()

  // Verified badge + text
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('✓ Verifiziert durch Online-Offerten.ch', W / 2, brandY + 38)

  return canvas.toDataURL('image/png')
}

function SocialIcon({ type }: { type: 'instagram' | 'facebook' | 'whatsapp' }) {
  if (type === 'instagram') {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="25%" stopColor="#F77737" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="75%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)" />
      </svg>
    )
  }
  if (type === 'facebook') {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
      </svg>
    )
  }
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function SocialShareCard({ partnerSlug, partnerId }: SocialShareCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [partnerData, setPartnerData] = useState<PartnerShareData | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const profileUrl = PROFILE_URL_BASE + partnerSlug

  useEffect(() => {
    fetch(`/api/widget/reviews/${partnerId}?limit=1&type=badge`)
      .then((r) => r.json())
      .then((data) => {
        if (data.partner) setPartnerData(data.partner)
      })
      .catch(() => {})
  }, [partnerId])

  // Fetch gallery images separately
  useEffect(() => {
    if (!partnerData) return
    import('@/src/lib/supabase/client').then(({ createClient }) => {
      const supabase = createClient()
      supabase
        .from('partners')
        .select('gallery_images, hero_image_url')
        .eq('id', partnerId)
        .single()
        .then(({ data }: { data: { gallery_images: unknown; hero_image_url: string | null } | null }) => {
          if (data) {
            setPartnerData((prev) =>
              prev
                ? {
                    ...prev,
                    hero_image_url: data.hero_image_url,
                    gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images as string[] : [],
                  }
                : prev
            )
          }
        })
    })
  }, [partnerId, partnerData?.company_name])

  const handleGenerate = useCallback(async () => {
    if (!partnerData) return
    setGenerating(true)
    try {
      const url = await generateShareImage(partnerData)
      setImageUrl(url)
    } catch (e) {
      console.error('Image generation failed:', e)
    } finally {
      setGenerating(false)
    }
  }, [partnerData])

  const handleOpenModal = useCallback(() => {
    setShowModal(true)
    if (!imageUrl && partnerData) {
      handleGenerate()
    }
  }, [imageUrl, partnerData, handleGenerate])

  const handleDownload = useCallback(() => {
    if (!imageUrl) return
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = `${partnerSlug}-bewertungen.png`
    a.click()
  }, [imageUrl, partnerSlug])

  const handleFacebookShare = useCallback(() => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
      '_blank',
      'width=600,height=400'
    )
  }, [profileUrl])

  const handleWhatsAppShare = useCallback(() => {
    const text = partnerData
      ? `⭐ ${partnerData.average_rating.toFixed(1)}/5 – ${partnerData.review_count} verifizierte Bewertungen für ${partnerData.company_name} auf Online-Offerten.ch!\n\n${profileUrl}`
      : profileUrl
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }, [profileUrl, partnerData])

  const steps = [
    {
      num: '1',
      icon: 'instagram' as const,
      label: 'Instagram',
      desc: 'Bild herunterladen & als Post teilen',
      action: () => {
        handleOpenModal()
      },
    },
    {
      num: '2',
      icon: 'facebook' as const,
      label: 'Facebook',
      desc: 'Direkt auf Facebook teilen',
      action: handleFacebookShare,
    },
    {
      num: '3',
      icon: 'whatsapp' as const,
      label: 'WhatsApp',
      desc: 'Per WhatsApp an Kunden senden',
      action: handleWhatsAppShare,
    },
  ]

  return (
    <>
      <Card className="border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-[15px]">
                Teilen Sie Ihre Bewertungen in Social Media!
              </h3>
              <p className="text-xs text-green-600">
                Zeigen Sie Ihren Kunden, dass Sie top bewertet sind.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {steps.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={s.action}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-green-100 hover:border-green-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex-shrink-0">
                  <SocialIcon type={s.icon} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-gray-800 group-hover:text-green-700 transition-colors">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-gray-500 leading-tight">{s.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instagram Share Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2">
                <SocialIcon type="instagram" />
                <h3 className="font-bold text-gray-800">Instagram Post erstellen</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {generating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-green-600 mb-3" />
                  <p className="text-sm text-gray-500">Bild wird erstellt...</p>
                </div>
              ) : imageUrl ? (
                <>
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      ref={imageRef}
                      src={imageUrl}
                      alt="Share preview"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white h-11"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Bild herunterladen
                    </Button>

                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-semibold text-gray-700">So geht&apos;s:</p>
                      <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
                        <li>Laden Sie das Bild herunter</li>
                        <li>Öffnen Sie Instagram und erstellen Sie einen neuen Post</li>
                        <li>Wählen Sie das heruntergeladene Bild</li>
                        <li>
                          Fügen Sie als Caption hinzu:{' '}
                          <span className="text-green-700 font-medium">
                            &quot;⭐ {partnerData?.average_rating.toFixed(1)}/5 Sterne –
                            verifizierte Kundenbewertungen! {profileUrl}&quot;
                          </span>
                        </li>
                      </ol>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        const caption = `⭐ ${partnerData?.average_rating.toFixed(1)}/5 Sterne – ${partnerData?.review_count} verifizierte Kundenbewertungen auf Online-Offerten.ch!\n\n${profileUrl}`
                        navigator.clipboard.writeText(caption).catch(() => {})
                      }}
                      className="w-full"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Caption kopieren
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-sm text-gray-500">
                  Bild konnte nicht erstellt werden.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
