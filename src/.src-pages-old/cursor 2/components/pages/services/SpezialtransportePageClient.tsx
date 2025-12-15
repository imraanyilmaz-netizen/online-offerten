'use client'

import React from 'react'
import SEO from '@/components/SEO'
import { motion } from 'framer-motion'
import Hero from '@/components/SpezialtransportePageParts/Hero'
import TransportTabs from '@/components/SpezialtransportePageParts/TransportTabs'
import Cta from '@/components/SpezialtransportePageParts/Cta'

const SpezialtransportePageClient = () => {
  const metaTitle = "Klaviertransport, Tresortransport & Maschinen Transport Schweiz » Spezialtransporte vergleichen & bis zu 40% sparen"
  const metaDescription = "Klaviertransport, Tresortransport und Maschinen & Geräte Transport: Vergleichen Sie kostenlos mehrere geprüfte Spezialtransport-Firmen. Klavier Transport, Tresor Transport, Maschinentransport – sicher, versichert und professionell. Jetzt Offerten anfordern!"
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
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schema}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-gray-50 via-slate-100 to-gray-50"
      >
        <Hero />
        <TransportTabs />
        <Cta />
      </motion.div>
    </>
  )
}

export default SpezialtransportePageClient

