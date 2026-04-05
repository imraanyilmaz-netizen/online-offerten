import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt =
  'Online-Offerten.ch – Offerten vergleichen & Anbieter in der Schweiz finden'

export const size = { width: 1200, height: 630 }

export const contentType = 'image/png'

/** PNG für WhatsApp / Facebook / LinkedIn – zuverlässiger als externe WebP-URLs */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #15803d 0%, #0f766e 45%, #0d9488 100%)',
          color: 'white',
          padding: 56,
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Online-Offerten.ch
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            marginTop: 28,
            textAlign: 'center',
            maxWidth: 980,
            lineHeight: 1.35,
            opacity: 0.96,
          }}
        >
          Offerten vergleichen & passende Anbieter in der Schweiz finden
        </div>
        <div
          style={{
            fontSize: 22,
            marginTop: 36,
            opacity: 0.88,
            textAlign: 'center',
          }}
        >
          Umzug · Reinigung · Malerarbeiten · kostenlos vergleichen
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
