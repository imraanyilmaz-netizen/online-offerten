import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense, type ReactNode } from 'react'
import { categoryHubSlugs, getServiceCategoryBySlug, serviceCategories } from '@/data/categories'
import UmzugsfirmaPageClient from '@/components/pages/UmzugsfirmaPageContent'
import CategoryReinigungHubClient from '@/components/pages/category/CategoryReinigungHubClient'
import MalerfirmaInDerNaehePageClient from '@/components/pages/info/MalerfirmaInDerNaehePageClient'
import UmzugsfirmaInDerNaehePageClient from '@/components/pages/info/UmzugsfirmaInDerNaehePageClient'
import ReinigungsfirmaInDerNaehePageClient from '@/components/pages/info/ReinigungsfirmaInDerNaehePageClient'

const SITE = 'https://online-offerten.ch'
const IN_DER_NAEHE_SUFFIX = '-in-der-naehe'

/** Slugs like `umzugsfirma-in-der-naehe` → which “in der Nähe” page to render. */
type InDerNaeheVariant = 'umzugsfirma' | 'reinigung' | 'reinigungsfirma' | 'malerfirma'

function resolveInDerNaeheSegment(raw: string): InDerNaeheVariant | null {
  if (!raw.endsWith(IN_DER_NAEHE_SUFFIX)) return null
  const base = raw.slice(0, -IN_DER_NAEHE_SUFFIX.length)
  if (base === 'umzugsfirma') return 'umzugsfirma'
  if (base === 'reinigung') return 'reinigung'
  if (base === 'reinigungsfirma') return 'reinigungsfirma'
  if (base === 'malerfirma') return 'malerfirma'
  return null
}

export function generateStaticParams() {
  const hubs = categoryHubSlugs.map((slug) => ({ category: slug }))
  const inDerNaehe = serviceCategories.map((c) => ({
    category: `${c.slug}${IN_DER_NAEHE_SUFFIX}`,
  }))
  return [...hubs, ...inDerNaehe]
}

const UZ_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Umzugsfirma', item: `${SITE}/umzugsfirma` },
      ],
    },
    {
      '@type': 'Service',
      name: 'Umzugsfirma finden und vergleichen',
      serviceType: 'Umzugsservice',
      description:
        'Finden Sie die beste Umzugsfirma in der Schweiz. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen für Privatumzug, Geschäftsumzug und mehr.',
      provider: {
        '@type': 'Organization',
        name: 'Online-Offerten.ch',
        url: SITE,
        logo: `${SITE}/image/logo-icon.webp`,
      },
      areaServed: { '@type': 'Country', name: 'Switzerland' },
      offers: {
        '@type': 'Offer',
        url: `${SITE}/kostenlose-offerte-anfordern?service=umzug&step=2`,
        priceCurrency: 'CHF',
        price: '0',
        name: 'Kostenlose Umzugsfirma Offerten',
      },
    },
  ],
}

type Props = { params: Promise<{ category: string }> }

function inDerNaeheMetadata(pathSegment: string, variant: InDerNaeheVariant): Metadata {
  const url = `${SITE}/${pathSegment}`
  const robots = {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  }

  if (variant === 'umzugsfirma') {
    return {
      title: 'Umzugsfirma in der Nähe finden – Geprüfte Partner',
      description:
        'Umzugsfirma in der Nähe finden ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen in Ihrer Region. Privatumzug, Geschäftsumzug – schnell, sicher und transparent. Jetzt kostenlos Offerten anfordern!',
      alternates: { canonical: url },
      openGraph: {
        title: 'Umzugsfirma in der Nähe finden » Geprüfte Partner vergleichen',
        description:
          'Umzugsfirma in der Nähe finden ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen in Ihrer Region. Privatumzug, Geschäftsumzug – schnell, sicher und transparent.',
        url,
        siteName: 'Online-Offerten.ch',
        locale: 'de_CH',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Umzugsfirma in der Nähe finden » Geprüfte Partner vergleichen',
        description:
          'Umzugsfirma in der Nähe finden ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen in Ihrer Region.',
      },
      robots,
    }
  }

  if (variant === 'reinigung') {
    return {
      title: 'Reinigungsfirma in der Nähe finden – Kostenlose Offerten',
      description:
        'Reinigungsfirma in der Nähe finden: Umzugsreinigung, Endreinigung mit Abnahmegarantie, Wohnungsreinigung und Büro. Bis zu 5 kostenlose Reinigungsofferten von geprüften Anbietern – unverbindlich, in der ganzen Schweiz.',
      alternates: { canonical: url },
      openGraph: {
        title: 'Reinigungsfirma in der Nähe finden » Offerten vergleichen',
        description:
          'Reinigungsfirma in der Nähe: Umzugsreinigung, Endreinigung, Wohnungs- und Büroreinigung. Bis zu 5 kostenlose Offerten von geprüften Anbietern.',
        url,
        siteName: 'Online-Offerten.ch',
        locale: 'de_CH',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Reinigungsfirma in der Nähe finden » Offerten vergleichen',
        description:
          'Reinigungsfirma in der Nähe: Umzugsreinigung, Endreinigung, Wohnungs- und Büroreinigung – kostenlos Offerten vergleichen.',
      },
      robots,
    }
  }

  if (variant === 'reinigungsfirma') {
    return {
      title:
        'Reinigungsfirma in der Nähe | Umzugsreinigung, Endreinigung & Reinigungsofferten vergleichen',
      description:
        'Reinigungsfirma in der Nähe finden: Umzugsreinigung, Endreinigung mit Abnahmegarantie, Wohnungsreinigung und Büro. Bis zu 5 kostenlose Reinigungsofferten von geprüften Anbietern – unverbindlich, in der ganzen Schweiz.',
      alternates: { canonical: url },
      openGraph: {
        title:
          'Reinigungsfirma in der Nähe | Umzugsreinigung, Endreinigung & Reinigungsofferten vergleichen',
        description:
          'Umzugsreinigung und Endreinigung vergleichen: bis zu 5 kostenlose Reinigungsofferten von geprüften Reinigungsfirmen in Ihrer Region.',
        url,
        siteName: 'Online-Offerten.ch',
        locale: 'de_CH',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title:
          'Reinigungsfirma in der Nähe | Umzugsreinigung, Endreinigung & Reinigungsofferten vergleichen',
        description:
          'Reinigungsfirma finden: Umzugsreinigung, Wohnungsreinigung, Büro – kostenlose Reinigungsofferten vergleichen.',
      },
      robots,
    }
  }

  return {
    title: 'Malerfirma in der Nähe finden – Bis zu 40% sparen',
    description:
      'Malerfirma in der Nähe finden. Bis zu 5 kostenlose Offerten von geprüften Malerfirmen in Ihrer Region. Innenanstrich, Aussenanstrich, Fassadenanstrich – professionell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
    alternates: { canonical: url },
    openGraph: {
      title: 'Malerfirma in der Nähe finden » Bis zu 40% sparen',
      description:
        'Malerfirma in der Nähe finden. Bis zu 5 kostenlose Offerten von geprüften Malerfirmen in Ihrer Region. Innenanstrich, Aussenanstrich – professionell, sicher und bis zu 40% günstiger.',
      url,
      siteName: 'Online-Offerten.ch',
      locale: 'de_CH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Malerfirma in der Nähe finden » Bis zu 40% sparen',
      description:
        'Malerfirma in der Nähe finden. Bis zu 5 kostenlose Offerten von geprüften Malerfirmen in Ihrer Region.',
    },
    robots,
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category: raw } = await props.params
  const inDerNaehe = resolveInDerNaeheSegment(raw)
  if (inDerNaehe) return inDerNaeheMetadata(raw, inDerNaehe)

  const cat = getServiceCategoryBySlug(raw)
  if (!cat) return { title: 'Seite nicht gefunden' }

  if (cat.slug === 'umzugsfirma') {
    return {
      title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
      description:
        'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
      alternates: { canonical: `${SITE}/umzugsfirma` },
      openGraph: {
        title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
        description:
          'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
        url: `${SITE}/umzugsfirma`,
        siteName: 'Online-Offerten.ch',
        locale: 'de_CH',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
        description:
          'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
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
  }

  if (cat.slug === 'reinigungsfirma') {
    return {
      title: 'Reinigungsfirma Schweiz – Kostenlose Offerten vergleichen & sparen',
      description:
        'Reinigung für Privatpersonen & Unternehmen: Kostenlos bis zu 5 Offerten von geprüften Reinigungsfirmen in der Schweiz vergleichen. Umzugsreinigung, Wohnungsreinigung & Büroreinigung. Abnahmegarantie. 100% kostenlos',
      alternates: { canonical: `${SITE}/reinigungsfirma` },
      openGraph: {
        title: 'Reinigungsfirma Schweiz – Kostenlose Offerten vergleichen & sparen',
        description:
          'Reinigung für Privatpersonen & Unternehmen: Kostenlos bis zu 5 Offerten von geprüften Reinigungsfirmen in der Schweiz vergleichen.',
        url: `${SITE}/reinigungsfirma`,
        siteName: 'Online-Offerten.ch',
        locale: 'de_CH',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Reinigungsfirma Schweiz – Kostenlose Offerten vergleichen & sparen',
        description:
          'Reinigung für Privatpersonen & Unternehmen: Kostenlos Offerten von geprüften Reinigungsfirmen vergleichen.',
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
  }

  return {
    title: 'Malerfirma in der Nähe finden – Bis zu 40% sparen',
    description:
      'Malerfirma in der Nähe finden. Bis zu 5 kostenlose Offerten von geprüften Malerfirmen in Ihrer Region. Innenanstrich, Aussenanstrich, Fassadenanstrich – professionell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
    alternates: { canonical: `${SITE}/malerfirma` },
    openGraph: {
      title: 'Malerfirma in der Nähe finden » Bis zu 40% sparen',
      description:
        'Malerfirma in der Nähe finden. Bis zu 5 kostenlose Offerten von geprüften Malerfirmen in Ihrer Region. Innenanstrich, Aussenanstrich – professionell, sicher und bis zu 40% günstiger.',
      url: `${SITE}/malerfirma`,
      siteName: 'Online-Offerten.ch',
      locale: 'de_CH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Malerfirma in der Nähe finden » Bis zu 40% sparen',
      description:
        'Malerfirma in der Nähe finden. Bis zu 5 kostenlose Offerten von geprüften Malerfirmen in Ihrer Region.',
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
}

function InDerNaeheSuspense({
  borderClass,
  children,
}: {
  borderClass: string
  children: ReactNode
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${borderClass}`}
          />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default async function CategoryHubPage(props: Props) {
  const { category: raw } = await props.params
  const inDerNaehe = resolveInDerNaeheSegment(raw)
  if (inDerNaehe === 'umzugsfirma') {
    return (
      <InDerNaeheSuspense borderClass="border-green-600">
        <UmzugsfirmaInDerNaehePageClient />
      </InDerNaeheSuspense>
    )
  }
  if (inDerNaehe === 'reinigung' || inDerNaehe === 'reinigungsfirma') {
    return (
      <InDerNaeheSuspense borderClass="border-blue-600">
        <ReinigungsfirmaInDerNaehePageClient />
      </InDerNaeheSuspense>
    )
  }
  if (inDerNaehe === 'malerfirma') {
    return (
      <InDerNaeheSuspense borderClass="border-purple-600">
        <MalerfirmaInDerNaehePageClient />
      </InDerNaeheSuspense>
    )
  }

  const cat = getServiceCategoryBySlug(raw)
  if (!cat) notFound()

  if (cat.slug === 'umzugsfirma') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(UZ_JSON_LD) }}
        />
        <UmzugsfirmaPageClient />
      </>
    )
  }

  if (cat.slug === 'reinigungsfirma') {
    return <CategoryReinigungHubClient />
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600" />
        </div>
      }
    >
      <MalerfirmaInDerNaehePageClient />
    </Suspense>
  )
}
