'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button'
import { Loader2, Search, Shield, Star, ArrowRight } from 'lucide-react'
import SearchFilters from '@/components/PartnerSearch/SearchFilters'
import PartnerCard from '@/components/PartnerSearch/PartnerCard'
import CustomerForm from '@/components/NewCustomerForm'
import { supabase } from '@/lib/supabaseClient'
import { cantonMap } from '@/lib/dataMapping'

// Reverse mapping: Canton name -> Canton code
const cantonNameToCode = Object.fromEntries(
  Object.entries(cantonMap).map(([code, name]: [string, any]) => [name, code])
)

interface PartnerSearchPageClientProps {
  initialPartners?: any[]
}

const PartnerSearchPageClient = ({ initialPartners = [] }: PartnerSearchPageClientProps) => {
  const [showForm, setShowForm] = useState(false)
  const [partners, setPartners] = useState<any[]>(initialPartners)
  const [loading, setLoading] = useState(false) // false weil initialPartners vorhanden
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [sortBy, setSortBy] = useState('rating_desc')

  // Client-side refresh (optional, für Echtzeit-Aktualisierung)
  const fetchPartners = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('id, company_name, slug, address_street, address_city, address_zip, main_categories, offered_services, service_regions, average_rating, review_count, badge_tier, logo_url, hero_image_url, message')
        .eq('status', 'active')

      if (error) throw error
      if (data) setPartners(data)
    } catch (error) {
      console.error('Error refreshing partners:', error)
    }
  }, [])

  const filteredPartners = useMemo(() => {
    let filtered = [...partners]

    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase()
      filtered = filtered.filter(partner =>
        partner.company_name?.toLowerCase().includes(lowercasedFilter) ||
        partner.address_city?.toLowerCase().includes(lowercasedFilter) ||
        partner.address_zip?.includes(lowercasedFilter)
      )
    }

    if (selectedRegion) {
      filtered = filtered.filter(partner => {
        const normalizedSelected = selectedRegion.trim()
        const normalizedSelectedLower = normalizedSelected.toLowerCase()
        const cantonCode = cantonNameToCode[normalizedSelected]

        if (partner.service_regions && Array.isArray(partner.service_regions)) {
          const normalizedRegions = partner.service_regions.map((r: any) =>
            typeof r === 'string' ? r.trim() : String(r).trim()
          )

          if (normalizedRegions.some((r: string) =>
            r.toLowerCase() === normalizedSelectedLower || r === normalizedSelected
          )) return true

          if (cantonCode && normalizedRegions.some((r: string) =>
            r.toUpperCase() === cantonCode || r.toLowerCase() === cantonCode.toLowerCase()
          )) return true
        }

        if (partner.address_city) {
          const normalizedCity = partner.address_city.trim().toLowerCase()
          if (normalizedCity === normalizedSelectedLower) return true
          if (normalizedCity.includes(normalizedSelectedLower) ||
            normalizedSelectedLower.includes(normalizedCity)) return true
        }

        return false
      })
    }

    if (selectedService) {
      const serviceCategoryMap: Record<string, string> = {
        'Umzugsfirma': 'umzug',
        'Reinigungfirma': 'reinigung',
        'Malerfirma': 'maler'
      }
      const categoryValue = serviceCategoryMap[selectedService] || selectedService

      filtered = filtered.filter(partner => {
        if (partner.main_categories && partner.main_categories.includes(categoryValue)) return true
        if (partner.offered_services && partner.offered_services.length > 0) {
          const categoryServiceMap: Record<string, string[]> = {
            'umzug': ['privatumzug', 'geschaeftsumzug', 'auslandumzug', 'spezialtransport', 'kleintransport', 'lagerung_service', 'raeumung_service', 'entsorgung_service'],
            'reinigung': ['wohnungsreinigung', 'hausreinigung', 'buero_reinigung', 'unterhaltsreinigung', 'baureinigung', 'grundreinigung', 'fensterreinigung', 'bodenreinigung', 'fassadenreinigung', 'hofreinigung', 'umzugsreinigung'],
            'maler': ['maler_service']
          }
          const categoryServices = categoryServiceMap[categoryValue] || []
          return categoryServices.some(service => partner.offered_services.includes(service))
        }
        return false
      })
    }

    switch (sortBy) {
      case 'rating_desc':
        filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
        break
      case 'reviews_desc':
        filtered.sort((a, b) => (b.review_count || 0) - (a.review_count || 0))
        break
      case 'name_asc':
        filtered.sort((a, b) => a.company_name.localeCompare(b.company_name))
        break
      case 'name_desc':
        filtered.sort((a, b) => b.company_name.localeCompare(a.company_name))
        break
    }

    return filtered
  }, [partners, searchTerm, selectedRegion, selectedService, sortBy])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedRegion('')
    setSelectedService('')
    setSortBy('rating_desc')
  }, [])

  // Form için initial data
  const getInitialFormData = () => {
    const initialData: any = {}
    if (selectedService && selectedService !== 'all') {
      initialData.mainService = selectedService
    }
    if (selectedRegion && selectedRegion !== 'all') {
      initialData.from_city = selectedRegion
    }
    return initialData
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto max-w-navbar px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section */}
        <div
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="heading-1 text-center">
            Umzugsfirma, Reinigungsfirma & Malerfirma in der Schweiz finden und vergleichen!
          </h1>
          <p className="text-body max-w-3xl mx-auto text-center">
            Finden Sie geprüfte Umzugsfirmen, Reinigungsfirmen und Malerfirmen in Ihrer Nähe. Bewertungen lesen, Preise vergleichen und kostenlos Offerten anfordern.
          </p>
        </div>

        {/* Search & Filter */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
          filteredCount={filteredPartners.length}
          totalCount={partners.length}
        />

        {/* Partner Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : filteredPartners.length === 0 ? (
          <div
            className="text-center py-20"
          >
            <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="heading-2 text-center">Keine Partner gefunden</h2>
            <p className="text-body text-center">
              Versuchen Sie es mit anderen Suchkriterien oder{' '}
              <button
                onClick={() => setShowForm(true)}
                className="text-green-600 hover:text-green-700 font-medium underline"
              >
                senden Sie eine allgemeine Anfrage
              </button>
            </p>
            <Button onClick={clearFilters} variant="outline">
              Filter zurücksetzen
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">{filteredPartners.length}</span> Partner gefunden
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredPartners.map((partner: any, index: number) => (
                <div
                  key={partner.id}
                >
                  <PartnerCard partner={partner} />
                </div>
              ))}
            </div>
          </>
        )}

        {showForm && (
          <CustomerForm
            initialDataFromProps={getInitialFormData()}
            formId="partner-search-form"
          />
        )}

        {/* SEO Content Section */}
        <section className="mt-16 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <h2 className="heading-2">
              Geprüfte Umzugsfirmen und Reinigungsfirmen in der Schweiz
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-body">
                  Auf Online-Offerten.ch finden Sie eine Auswahl an qualifizierten und geprüften Dienstleistern
                  für Umzüge und Reinigungen in der gesamten Schweiz. Jeder Partner durchläuft einen
                  Verifizierungsprozess, bevor er auf unserer Plattform gelistet wird.
                </p>
                <p className="text-body">
                  Vergleichen Sie Kundenbewertungen, angebotene Services und die Erfahrung unserer Partner,
                  um den idealen Dienstleister für Ihr Projekt zu finden – ob Privatumzug, Geschäftsumzug,
                  Endreinigung oder Spezialreinigung.
                </p>
              </div>
              <div>
                <h3 className="heading-3">Ihre Vorteile auf einen Blick:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Alle Partner sind geprüft und verifiziert</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Echte Kundenbewertungen für transparente Auswahl</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Kostenlose und unverbindliche Offerten anfordern</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    href="/kostenlose-offerte-anfordern"
                    className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Jetzt Offerten vergleichen
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PartnerSearchPageClient


