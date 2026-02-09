'use client'

import React from 'react'
// framer-motion removed - CSS for better INP
import Hero from '@/components/MalerPageParts/Hero'
import MainContent from '@/components/MalerPageParts/MainContent'
import Sidebar from '@/components/MalerPageParts/Sidebar'
import Cta from '@/components/MalerPageParts/Cta'
import Faq from '@/components/MalerPageParts/Faq'
import HowItWorks from '@/components/MalerPageParts/HowItWorks'



const MalerarbeitenPageClient = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Malerarbeiten in der Schweiz",
    "serviceType": "Maler-Vermittlung",
    "description": "Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!",
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=maler&step=2",
      "priceCurrency": "CHF",
      "price": "0",
      "name": "Kostenlose Maler Offerten"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div
        className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100"
      >
        <Hero />
        
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <MainContent />
            <Sidebar />
          </div>

          <HowItWorks />
          <Faq />
          <Cta />
        </div>
      </div>
    </>
  )
}

export default MalerarbeitenPageClient

