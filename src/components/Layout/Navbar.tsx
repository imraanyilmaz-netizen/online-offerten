import Link from 'next/link'
import { Send } from 'lucide-react'
import NavbarClient from '@/src/components/Layout/NavbarClient'

export default function Navbar() {
  return (
    <NavbarClient>
      <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm flex-shrink-0">
          <Send className="w-[18px] h-[18px] text-white" aria-hidden />
        </span>
        <span
          className="text-[22px] md:text-2xl lg:text-[26px] leading-none font-bold italic tracking-tight text-black"
          style={{
            fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif',
            fontSynthesis: 'none',
            fontOpticalSizing: 'none',
            fontFeatureSettings: '"liga" 1, "calt" 1',
          }}
        >
          Online-Offerten.ch
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element -- static public asset */}
        <img
          src="/image/schweiz.svg"
          alt="Schweizer Flagge"
          className="h-[16px] w-[22px] object-contain"
          loading="lazy"
        />
      </Link>
    </NavbarClient>
  )
}
