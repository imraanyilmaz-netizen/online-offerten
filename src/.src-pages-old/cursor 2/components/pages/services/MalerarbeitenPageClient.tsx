'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/MalerPageParts/Hero'
import MainContent from '@/components/MalerPageParts/MainContent'
import Sidebar from '@/components/MalerPageParts/Sidebar'
import Cta from '@/components/MalerPageParts/Cta'
import Faq from '@/components/MalerPageParts/Faq'
import HowItWorks from '@/components/MalerPageParts/HowItWorks'
import SEO from '@/components/SEO'

const faqItemsForSchema = [
  {
    "@type": "Question",
    "name": "Wie erhalte ich Maler Offerten?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Füllen Sie einfach unser Online-Formular aus. Ihre Anfrage wird anonym an geprüfte Malerfirmen in Ihrer Nähe weitergeleitet. Sie erhalten unverbindliche Offerten direkt von den Anbietern."
    }
  },
  {
    "@type": "Question",
    "name": "Was kostet eine Maler offerten?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Unser Service ist für Sie zu 100% kostenlos und unverbindlich. Sie zahlen nichts für die Vermittlung oder den Erhalt der Offerten."
    }
  },
  {
    "@type": "Question",
    "name": "Wie viele Offerten erhalte ich?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Sie erhalten je nach Verfügbarkeit und Region verschiedene Offerten von qualifizierten Malerbetrieben."
    }
  },
  {
    "@type": "Question",
    "name": "Was ist der Vorteil, Offerten zu vergleichen?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Durch den direkten Vergleich von Preisen und Leistungen können Sie erhebliche Kosten sparen – oft bis zu 40%. Zudem finden Sie schnell und einfach einen qualifizierten und verfügbaren Maler für Ihr Projekt."
    }
  },
  {
    "@type": "Question",
    "name": "Sind die Malerfirmen geprüft?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Ja, wir arbeiten nur mit qualifizierten und erfahrenen Malerfirmen zusammen, die über die notwendigen Versicherungen und Qualifikationen verfügen. Viele unserer Partner sind seit Jahren im Geschäft und haben positive Kundenbewertungen."
    }
  },
]

const MalerarbeitenPageClient = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://online-offerten.ch/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Malerarbeiten",
            "item": "https://online-offerten.ch/malerarbeiten"
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Malerarbeiten",
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch"
        },
        "name": "Malerarbeiten in der Schweiz",
        "description": "Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!",
        "areaServed": {
          "@type": "Country",
          "name": "Switzerland"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=maler",
          "priceCurrency": "CHF",
          "name": "Kostenlose Maler Offerten"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema
      }
    ]
  }

  return (
    <>
      <SEO
        title="Malerarbeiten Schweiz finden & vergleichen » Kostenlose Offerten | Bis zu 40% sparen"
        description="Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!"
        keywords="malerarbeiten, malerarbeiten schweiz, malerarbeiten vergleichen, malerarbeiten kostenlos, malerfirma, malerfirma schweiz, malerfirma vergleichen, maler finden, innenanstrich, aussenanstrich, fassadenanstrich, wohnung streichen, malerfirma zürich, malerfirma bern, malerfirma basel, malerfirma luzern, maler offerten, malerarbeiten preise, maler kosten schweiz, innenanstrich kosten, fassade streichen preise, wohnung streichen kosten, malerfirma finden, malerfirma in der nähe, malerarbeiten preisvergleich, malerarbeiten planen, malerarbeiten offerte"
        canonicalUrl="/malerarbeiten"
        ogImageUrl="https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/1633bb6a22ddc3924f0c0576a88ab9a8.png"
        schemaMarkup={schema}
      />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100"
      >
        <Hero />
        
        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <MainContent />
            <Sidebar />
          </div>

          <HowItWorks />
          <Faq />
          <Cta />
        </div>
      </motion.div>
    </>
  )
}

export default MalerarbeitenPageClient

