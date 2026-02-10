import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Calculator, FileText, Mail, BarChart3, MapPin, Building, Star, ChevronRight, Paintbrush, Palette, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MalerfirmaZurichPageClient from '@/components/pages/locations/MalerfirmaZurichPageClient'

const city = "Zürich"
const canonicalUrl = '/malerfirma-in-der-naehe/zuerich'

// FAQ Schema - Zürich spezifische FAQs
const zurichFAQs = [
  {
    question: "Wie finde ich eine zuverlässige Malerfirma in Zürich?",
    answer: "Vergleichen Sie mehrere Offerten von geprüften Malerfirmen. Achten Sie auf lokale Erfahrung, besonders mit Malerarbeiten in den verschiedenen Stadtkreisen von Zürich. Seriöse Firmen kennen die Bauvorschriften, Denkmalschutzbestimmungen und haben Erfahrung mit den typischen Herausforderungen Zürcher Gebäude – von Altbauwohnungen bis zu modernen Neubauten."
  },
  {
    question: "Was kostet ein Innenanstrich in Zürich?",
    answer: "Die Kosten variieren je nach Wohnungsgrösse, Anzahl der Räume, Stockwerk und Zugänglichkeit. Ein Innenanstrich für eine 3.5-Zimmer-Wohnung (95 mÂ²) in Zürich kostet typischerweise zwischen 1.400 und 3.300 CHF. Eine 4.5-Zimmer-Wohnung (120 mÂ²) kostet zwischen 1.800 und 4.200 CHF. Vergleichen Sie mehrere Offerten, um das beste Angebot zu finden."
  },
  {
    question: "Gibt es Besonderheiten bei Malerarbeiten in der Zürcher Altstadt?",
    answer: "Ja, die engen Gassen, denkmalgeschützten Gebäude und die vielen Altbauwohnungen erfordern sorgfältige Planung. Professionelle Malerfirmen kennen die Denkmalschutzbestimmungen, können die notwendigen Genehmigungen einholen und haben Erfahrung mit den typischen Herausforderungen historischer Gebäude. Viele Altbauwohnungen haben spezielle Anforderungen an Farben und Materialien."
  },
  {
    question: "Wie lange im Voraus sollte ich eine Malerfirma in Zürich buchen?",
    answer: "Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders für grössere Projekte wie Fassadenanstrich oder komplette Wohnungsrenovationen. Kurzfristige Buchungen sind möglich, aber die Auswahl an verfügbaren Terminen ist dann begrenzter. Frühbucher erhalten oft bessere Konditionen."
  },
  {
    question: "Kann ich auch Malerarbeiten in anderen Zürcher Stadtkreisen organisieren?",
    answer: "Ja, viele Malerfirmen in Zürich bieten ihre Dienstleistungen in allen Stadtkreisen an, von Zürich 1 (Altstadt) bis zu den äusseren Stadtkreisen. Die kurze Distanz macht solche Projekte oft kostengünstiger als erwartet. Vergleichen Sie mehrere Offerten, um das beste Angebot für Ihre Malerarbeiten in Zürich zu finden."
  },
  {
    question: "Welche Versicherung benötige ich für Malerarbeiten in Zürich?",
    answer: "Professionelle Malerfirmen in Zürich sind versichert gemäss OR und verfügen über Betriebshaftpflichtversicherung. Zusätzlich können Sie eine spezielle Versicherung für wertvolle Gegenstände oder Kunstwerke abschliessen. Fragen Sie nach dem Versicherungsschutz und prüfen Sie, ob Ihre Hausratversicherung die Malerarbeiten abdeckt."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": zurichFAQs.map(faq => ({
    "@type": "Question",
    "name": String(faq.question),
    "acceptedAnswer": {
      "@type": "Answer",
      "text": String(faq.answer)
    }
  }))
}

// Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Maler-Vermittlung",
  "name": `Malerfirma ${city} vergleichen`,
  "description": `Geprüfte Malerbetriebe und Malerfirmen in ${city} vergleichen. Kostenlose Offerten von professionellen Malerunternehmen für Innenanstrich, Aussenanstrich und Fassadenanstrich.`,
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "areaServed": {
    "@type": "City",
    "name": String(city),
    "containedInPlace": {
      "@type": "Country",
      "name": "Switzerland"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=maler&step=2&city=${city}`,
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Malerfirma Offerten"
  }
}

// Combined Schema
const combinedSchema = {
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
          "name": "Malerfirma in der Nähe",
          "item": "https://online-offerten.ch/malerfirma-in-der-naehe"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `Malerfirma ${city}`,
          "item": `https://online-offerten.ch${canonicalUrl}`
        }
      ]
    },
    serviceSchema,
    faqSchema
  ]
}

export const metadata: Metadata = {
  title: 'Malerfirma Zürich – Top Anbieter vergleichen & sparen',
  description: 'Malerfirma Zürich finden ✓ Geprüfte Malerbetriebe vergleichen & bis zu 40% sparen. Kostenlose Offerten für Innenanstrich, Aussenanstrich & Fassadenanstrich.',
  alternates: {
    canonical: `https://online-offerten.ch${canonicalUrl}`,
    languages: {
      'de-CH': `https://online-offerten.ch${canonicalUrl}`,
      'x-default': `https://online-offerten.ch${canonicalUrl}`,
    },
  },
  openGraph: {
    title: 'Malerfirma Zürich » Top Malerbetriebe vergleichen & sparen',
    description: 'Malerfirma Zürich finden ✓ Geprüfte Malerbetriebe vergleichen & bis zu 40% sparen. Kostenlose Offerten für Innenanstrich, Aussenanstrich & Fassadenanstrich.',
    url: `https://online-offerten.ch${canonicalUrl}`,
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/malerarbeiten.webp',
        width: 1200,
        height: 630,
        alt: 'Malerfirma Zürich',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malerfirma Zürich » Top Malerbetriebe vergleichen & sparen',
    description: 'Malerfirma Zürich finden ✓ Geprüfte Malerbetriebe vergleichen & bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/malerarbeiten.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function MalerfirmaZurichPage() {
  return (
    <>
      {/* Schema.org Structured Data - Server-side rendered for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema)
        }}
      />
      
      <div className="bg-white overflow-x-hidden">
        {/* Breadcrumb Navigation */}
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
            <nav className="mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-purple-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li>
                  <Link href="/malerfirma-in-der-naehe" className="hover:text-purple-600 transition-colors">
                    Malerfirma in der Nähe
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  Malerfirma Zürich
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <MalerfirmaZurichPageClient />
      </div>
    </>
  )
}



