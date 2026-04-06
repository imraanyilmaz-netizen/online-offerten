'use client'

import React from 'react'

import Hero from '@/components/SpezialtransportePageParts/Hero'
import TransportTabs from '@/components/SpezialtransportePageParts/TransportTabs'
import Cta from '@/components/SpezialtransportePageParts/Cta'

const SpezialtransportePageClient = () => {
  const metaTitle = "Spezialtransporte: Kostenlose Offerten vergleichen"
  const metaDescription = "Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!"
  const canonicalUrl = "/umzugsfirma/spezialtransporte"

  const transportTypes = [
    { title: "Klaviertransport: Professioneller Transport für Ihr Klavier" },
    { title: "Tresortransport: Sicherer und diskreter Tresor Transport" },
    { title: "Maschinen Transport: Transport für Maschinen & Geräte" }
  ]

  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 via-slate-100 to-gray-50">
        <Hero />
        <TransportTabs />
        <Cta />
      </div>
    </>
  )
}

export default SpezialtransportePageClient



