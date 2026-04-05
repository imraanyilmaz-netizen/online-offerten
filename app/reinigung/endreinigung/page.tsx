import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import EndreinigungPageClient from '@/components/pages/services/EndreinigungPageClient'

export const revalidate = 86400

const CANONICAL = 'https://online-offerten.ch/reinigung/endreinigung'

const REINIGUNG_SERVICE_KEYS = [
  'wohnungsreinigung',
  'hausreinigung',
  'buero_reinigung',
  'unterhaltsreinigung',
  'baureinigung',
  'grundreinigung',
  'fensterreinigung',
  'bodenreinigung',
  'fassadenreinigung',
  'hofreinigung',
  'umzugsreinigung',
] as const

function isReinigungPartner(partner: {
  main_categories?: string[] | null
  offered_services?: string[] | null
}): boolean {
  if (partner.main_categories?.includes('reinigung')) return true
  if (partner.offered_services?.length) {
    return REINIGUNG_SERVICE_KEYS.some((s) => partner.offered_services!.includes(s))
  }
  return false
}

async function getReinigungPartners() {
  const supabase = createStaticClient()
  const { data, error } = await supabase
    .from('partners')
    .select(
      'id, company_name, slug, address_city, address_zip, average_rating, review_count, badge_tier, logo_url, main_categories, offered_services'
    )
    .eq('status', 'active')
    .order('average_rating', { ascending: false })

  if (error) {
    console.error('endreinigung getReinigungPartners:', error)
    return []
  }
  return (data || []).filter(isReinigungPartner)
}

const META_TITLE =
  'Endreinigung mit Abnahmegarantie: Reinigungsfirmen vergleichen und 60% sparen'
const META_DESCRIPTION =
  'Endreinigung und Wohnungsübergabe in der Schweiz: Kostenlose Reinigungsofferten von geprüften Reinigungsfirmen mit Abnahmegarantie vergleichen. Bis zu 60% sparen – unverbindlich.'

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/bilder/wohnungsreinigung-mit-abnahmegarantie.webp',
        width: 1200,
        height: 630,
        alt: 'Endreinigung mit Abnahmegarantie – professionelle Reinigungsfirma',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ['https://online-offerten.ch/bilder/wohnungsreinigung-mit-abnahmegarantie.webp'],
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

export default async function EndreinigungPage() {
  const partners = await getReinigungPartners()

  const faqSchema = [
    {
      q: 'Was ist eine Endreinigung mit Abnahmegarantie?',
      a: 'Bei der Abnahmegarantie bessert die Reinigungsfirma im vereinbarten Rahmen nach, falls die Wohnungsabgabe beanstandet wird. So reduzieren Sie das Risiko für teure Nacharbeiten.',
    },
    {
      q: 'Wie viele Offerten kann ich vergleichen?',
      a: 'Sie können bis zu fünf kostenlose Offerten von geprüften Reinigungsfirmen erhalten und Preis sowie Leistung transparent gegenüberstellen.',
    },
    {
      q: 'Was bedeutet "bis zu 60% sparen"?',
      a: 'Viele Kunden zahlen nach dem Vergleich mehrerer Angebote weniger als bei der ersten Einzelofferte – der genaue Betrag hängt von Objekt und Markt ab.',
    },
    {
      q: 'Sind die Partner auf dieser Seite Reinigungsfirmen?',
      a: 'Ja. Die Liste zeigt verifizierte Partner, die Reinigungsleistungen anbieten – gefiltert aus unserem Partnernetzwerk.',
    },
  ]

  const serverSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://online-offerten.ch/' },
          { '@type': 'ListItem', position: 2, name: 'Reinigung', item: 'https://online-offerten.ch/reinigung' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Endreinigung',
            item: CANONICAL,
          },
        ],
      },
      {
        '@type': 'Service',
        serviceType: 'Endreinigung mit Abnahmegarantie',
        name: META_TITLE,
        description: META_DESCRIPTION,
        provider: {
          '@type': 'Organization',
          name: 'Online-Offerten.ch',
          url: 'https://online-offerten.ch',
        },
        areaServed: { '@type': 'Country', name: 'Switzerland', identifier: 'CH' },
        offers: {
          '@type': 'Offer',
          url: 'https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung',
          priceCurrency: 'CHF',
          price: '0',
          name: 'Kostenlose Offerten Endreinigung',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqSchema.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      ...(partners.length > 0
        ? [
            {
              '@type': 'ItemList',
              name: 'Geprüfte Reinigungsfirmen Schweiz',
              numberOfItems: partners.length,
              itemListElement: partners.slice(0, 30).map((p: { company_name: string; slug: string }, i: number) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'LocalBusiness',
                  name: p.company_name,
                  url: `https://online-offerten.ch/partner/${p.slug}`,
                },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serverSchema) }} />
      <EndreinigungPageClient partners={partners} faqItems={faqSchema} />
    </>
  )
}
