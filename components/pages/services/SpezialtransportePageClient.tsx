'use client'

import React from 'react'

import Hero from '@/components/SpezialtransportePageParts/Hero'
import TransportTabs from '@/components/SpezialtransportePageParts/TransportTabs'
import Cta from '@/components/SpezialtransportePageParts/Cta'

const SpezialtransportePageClient = () => {
  const metaTitle = "Spezialtransporte: Kostenlose Offerten vergleichen"
  const metaDescription = "Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!"
  const canonicalUrl = "/spezialtransporte"

  const transportTypes = [
    { title: "Klaviertransport: Professioneller Transport für Ihr Klavier" },
    { title: "Tresortransport: Sicherer und diskreter Tresor Transport" },
    { title: "Maschinen Transport: Transport für Maschinen & Geräte" }
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Spezialtransport",
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "CH"
    },
    "name": metaTitle,
    "description": metaDescription,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Spezialtransport-Dienstleistungen",
      "itemListElement": transportTypes.map(transport => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": transport.title,
          "description": metaDescription.substring(0, 250) + '...'
        }
      }))
    }
  }

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

