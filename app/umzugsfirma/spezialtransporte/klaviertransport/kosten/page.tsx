import type { Metadata } from 'next'
import KlaviertransportKostenPageClient from '@/components/pages/services/KlaviertransportKostenPageClient'

export const metadata: Metadata = {
  title: 'Klaviertransport Kosten in der Schweiz – Preise, Faktoren & Spartipps',
  description: 'Was kostet ein Klaviertransport in der Schweiz? Erfahren Sie, welche Preisfaktoren entscheidend sind, mit welchen Richtwerten Sie rechnen können und wie Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport/kosten',
  },
  openGraph: {
    title: 'Klaviertransport Kosten in der Schweiz – Preise, Faktoren & Spartipps',
    description: 'Was kostet ein Klaviertransport in der Schweiz? Erfahren Sie, welche Preisfaktoren entscheidend sind und wie Sie bis zu 40% sparen.',
    url: 'https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport/kosten',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/bilder/klaviertransport.avif',
        width: 1200,
        height: 630,
        alt: 'Klaviertransport Kosten',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klaviertransport Kosten in der Schweiz – Preise, Faktoren & Spartipps',
    description: 'Was kostet ein Klaviertransport in der Schweiz? Erfahren Sie, welche Preisfaktoren entscheidend sind und wie Sie bis zu 40% sparen.',
    images: ['https://online-offerten.ch/bilder/klaviertransport.avif'],
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

export default function KlaviertransportKostenPage() {
  const canonicalUrl = "/umzugsfirma/spezialtransporte/klaviertransport/kosten"
  const metaTitle = "Klaviertransport Kosten in der Schweiz – Preise, Faktoren & Spartipps"
  const metaDescription = "Was kostet ein Klaviertransport in der Schweiz? Erfahren Sie, welche Preisfaktoren entscheidend sind, mit welchen Richtwerten Sie rechnen können und wie Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen."

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
            "name": "Umzugsfirma",
            "item": "https://online-offerten.ch/umzugsfirma"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Spezialtransporte",
            "item": "https://online-offerten.ch/umzugsfirma/spezialtransporte"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Klaviertransport",
            "item": "https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Kosten",
            "item": "https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport/kosten"
          }
        ]
      },
      {
        "@type": "Service",
        "name": metaTitle,
        "serviceType": "Klaviertransport-Kostenberatung",
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/online-offerten.ch.jpg"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Switzerland",
          "identifier": "CH"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&special_transport_type=klaviertransport",
          "priceCurrency": "CHF",
          "price": "0",
          "name": "Kostenlose Klaviertransport-Offerten"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Was kostet ein Klaviertransport in der Schweiz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die Kosten für einen Klaviertransport variieren je nach Situation. Ein Klaviertransport im Erdgeschoss beginnt ab etwa 350 CHF, während ein Transport in höhere Stockwerke ohne Lift ab 420 CHF kostet. Ein Flügeltransport beginnt ab etwa 700 CHF. Der effektive Preis hängt von Faktoren wie Art des Instruments, Distanz, Stockwerken, Zugänglichkeit und Zusatzleistungen ab."
            }
          },
          {
            "@type": "Question",
            "name": "Wovon hängen die Klaviertransport Kosten ab?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Die wichtigsten Kostenfaktoren sind: Art und Gewicht des Instruments (Pianino vs. Flügel), Transportdistanz, Etagen und Treppen, Zugänglichkeit (enge Türen, schmale Gänge) sowie Zusatzleistungen wie Zwischenlagerung, Demontage/Montage oder Entsorgung."
            }
          },
          {
            "@type": "Question",
            "name": "Wie kann ich bei einem Klaviertransport sparen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sie können bis zu 40% sparen, indem Sie mehrere Offerten vergleichen, lokale Firmen bevorzugen, flexible Termine wählen und Zusatzleistungen nur bei Bedarf buchen. Der Vergleich mehrerer spezialisierter Anbieter ist der effektivste Weg zu sparen."
            }
          },
          {
            "@type": "Question",
            "name": "Sind Klaviertransporte versichert?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, alle geprüften Partnerfirmen verfügen über eine Transportversicherung, die Schäden am Instrument während des gesamten Transports abdeckt. Die genauen Versicherungsbedingungen sind transparent in der jeweiligen Offerte aufgeführt."
            }
          },
          {
            "@type": "Question",
            "name": "Lohnt sich ein professioneller Klaviertransport oder sollte ich es selbst machen?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ein professioneller Klaviertransport ist keine Luxusleistung, sondern eine sichere und oft langfristig günstigere Lösung. Eigenleistung birgt Risiken wie Beschädigung des Instruments, Schäden an Gebäuden, Verletzungsgefahr und fehlende Versicherung. Die Kosten für Reparaturen können teurer sein als ein professioneller Transport."
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <KlaviertransportKostenPageClient />
    </>
  )
}



