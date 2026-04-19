import { ImageResponse } from 'next/og'
import type { ResolvedCategoryCatchAll } from '@/lib/categoryCatchAllResolve'

const OG_SIZE = { width: 1200, height: 630 }

const OG_FONT_FAMILY =
  'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'

/** Decorative SVG: soft curves + corner brackets (Satori-safe, no filters). */
function OgBackdropSvg() {
  return (
    <svg
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <path
        d="M56 56 L56 112 M56 56 L112 56"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M1144 56 L1088 56 M1144 56 L1144 112"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M56 574 L56 518 M56 574 L112 574"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M1144 574 L1088 574 M1144 574 L1144 518"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Same visual language as `Navbar.tsx`: green → emerald tile + Lucide-style Send icon (SVG only, no raster). */
function OgHeaderBrandMark() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 22,
        background: 'linear-gradient(145deg, #22c55e 0%, #059669 100%)',
        border: '1px solid rgba(255,255,255,0.22)',
      }}
    >
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 2 11 13"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 2 15 22 11 13 2 9 22 2Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function createCategoryCatchAllOgResponse(
  resolved: ResolvedCategoryCatchAll,
): ImageResponse {
  const titleFontSize =
    resolved.title.length > 72 ? 40 : resolved.title.length > 48 ? 46 : 52

  const description =
    resolved.description.length > 190
      ? `${resolved.description.slice(0, 187)}…`
      : resolved.description

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#022c22',
          overflow: 'hidden',
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -140,
            right: -60,
            width: 560,
            height: 560,
            borderRadius: 280,
            background: 'rgba(16, 185, 129, 0.28)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: -100,
            width: 520,
            height: 520,
            borderRadius: 260,
            background: 'rgba(45, 212, 191, 0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            width: 720,
            height: 720,
            marginLeft: -360,
            marginTop: -360,
            borderRadius: 360,
            background: 'rgba(5, 150, 105, 0.2)',
          }}
        />

        <OgBackdropSvg />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 52,
          }}
        >
          <div
            style={{
              width: 1010,
              maxWidth: '100%',
              borderRadius: 26,
              border: '1px solid rgba(255,255,255,0.16)',
              background:
                'linear-gradient(152deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 48%, rgba(0,0,0,0.08) 100%)',
              padding: '44px 52px 48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <OgHeaderBrandMark />

            <div
              style={{
                marginTop: 22,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.52)',
              }}
            >
              Vergleichsportal · Schweiz
            </div>

            <div
              style={{
                marginTop: 20,
                fontSize: titleFontSize,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                textAlign: 'center',
                lineHeight: 1.12,
                maxWidth: 920,
                color: '#fafafa',
              }}
            >
              {resolved.title}
            </div>

            <div
              style={{
                marginTop: 22,
                width: 96,
                height: 4,
                borderRadius: 2,
                background:
                  'linear-gradient(90deg, rgba(52,211,153,0.95) 0%, rgba(45,212,191,0.5) 55%, rgba(255,255,255,0.15) 100%)',
              }}
            />

            <div
              style={{
                marginTop: 26,
                fontSize: 25,
                fontWeight: 400,
                textAlign: 'center',
                maxWidth: 900,
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              {description}
            </div>

            <div
              style={{
                marginTop: 36,
                display: 'flex',
                alignItems: 'center',
                fontSize: 19,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.72)',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.95)' }}>Online-Offerten.ch</span>
              <span style={{ marginLeft: 14, marginRight: 14, opacity: 0.35 }}>|</span>
              <span style={{ fontWeight: 400, opacity: 0.85 }}>
                Umzug · Reinigung · Malerarbeiten
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    },
  )
}
