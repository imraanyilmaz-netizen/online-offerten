'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Loader2, Search } from 'lucide-react'
import { usePartnerSearch } from '@/hooks/usePartnerSearch'
import SearchFilters from '@/components/PartnerSearch/SearchFilters'
import PartnerCard from '@/components/PartnerSearch/PartnerCard'
import CustomerForm from '@/components/NewCustomerForm'

const PartnerSearchPageClient = () => {
  const [showForm, setShowForm] = useState(false)
  
  const {
    partners,
    filteredPartners,
    loading,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    selectedService,
    setSelectedService,
    sortBy,
    setSortBy,
    fetchPartners,
    clearFilters
  } = usePartnerSearch()

  useEffect(() => {
    fetchPartners()
  }, [fetchPartners])

  // Form için initial data - seçili servis varsa onu ekle
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Finden Sie die perfekte Firma
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Durchsuchen Sie unsere geprüften Partnerfirmen und finden Sie den idealen Dienstleister für Ihr Projekt.
          </p>
        </motion.div>

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : filteredPartners.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Keine Partner gefunden</h2>
            <p className="text-gray-600 mb-6">
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
          </motion.div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">{filteredPartners.length}</span> Partner gefunden
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredPartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PartnerCard partner={partner} />
                </motion.div>
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
      </div>
    </div>
  )
}

export default PartnerSearchPageClient

