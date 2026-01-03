import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import PartnerProfilePageClient from '@/components/pages/PartnerProfilePageClient'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

async function getPartnerData(slug: string) {
  const supabase = await createClient()
  
  const { data: partnerData, error: partnerError } = await supabase
    .from('partners')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (partnerError || !partnerData) {
    return null
  }

  return partnerData
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const partner = await getPartnerData(params.slug)
  
  if (!partner) {
    return {
      title: 'Partner nicht gefunden',
    }
  }

  const title = `${partner.company_name} | Bewertungen und Informationen`
  
  // Generate description
  let description = partner.description
  if (!description) {
    const city = partner.address_city ? ` in ${partner.address_city}` : ''
    description = `Bewertungen, Kontakt & Informationen zu ${partner.company_name}${city}. Jetzt kostenlose Offerte anfordern.`
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://online-offerten.ch/partner/${partner.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://online-offerten.ch/partner/${partner.slug}`,
      siteName: 'Online-Offerten.ch',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function PartnerProfilePage({ params }: { params: { slug: string } }) {
  const partner = await getPartnerData(params.slug)

  if (!partner) {
    notFound()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PartnerProfilePageClient initialPartner={partner} />
    </Suspense>
  )
}

