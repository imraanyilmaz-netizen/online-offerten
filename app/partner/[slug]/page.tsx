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

  return {
    title: `${partner.company_name} | Umzugsfirma & Reinigungsfirma`,
    description: partner.description || `Professionelle Umzugs- und Reinigungsdienstleistungen von ${partner.company_name} in ${partner.address_city}. Jetzt kostenlose Offerte anfordern.`,
    alternates: {
      canonical: `https://online-offerten.ch/partner/${partner.slug}`,
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

