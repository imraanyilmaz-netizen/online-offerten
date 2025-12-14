import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { usePartnerSearch } from '@/hooks/usePartnerSearch';
import SearchFilters from '@/components/PartnerSearch/SearchFilters';
import PartnerCard from '@/components/PartnerSearch/PartnerCard';
import CustomerForm from '@/components/NewCustomerForm';

const PartnerSearchPage = () => {
  const [showForm, setShowForm] = useState(false);
  
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
  } = usePartnerSearch();

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  // Form için initial data - seçili servis varsa onu ekle
  const getInitialFormData = () => {
    const initialData = {};
    if (selectedService && selectedService !== 'all') {
      initialData.mainService = selectedService;
    }
    if (selectedRegion && selectedRegion !== 'all') {
      initialData.from_city = selectedRegion;
    }
    return initialData;
  };

  const metaTitle = "Umzugsfirmen & Reinigungsfirmen Schweiz finden & vergleichen » Kostenlose Offerten";
  const metaDescription = "Finden Sie qualifizierte Umzugsfirmen und Reinigungsfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern auf Online-Offerten.ch.";
  const metaKeywords = "partner suche, umzugsfirma finden, reinigungsfirma finden, zügelfirma schweiz, umzugsunternehmen, firmenvergleich, bewertungen";
  const canonicalUrl = "https://online-offerten.ch/partner-suche";

  return (
    <>
      
      <div className="bg-white min-h-screen py-8">
        <div className="container mx-auto max-w-navbar px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Partner Suche
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Finden Sie qualifizierte Umzugsfirmen in Ihrer Region. Alle Partner sind verifiziert und bieten professionelle Dienstleistungen.
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6"
          >
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filteredCount={filteredPartners.length}
              totalCount={partners.length}
              clearFilters={clearFilters}
            />
          </motion.div>

          {/* Results */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-green-600" />
            </div>
          ) : filteredPartners.length === 0 ? (
            <div className="py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-8"
              >
                <div className="max-w-2xl mx-auto">
                  <Search size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Keine Ergebnisse gefunden
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Versuchen Sie, Ihre Filter oder Suchbegriffe anzupassen.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-left">
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                      Keine Sorge! Sagen Sie uns einfach, welche Art von Firma Sie benötigen, und wir finden die passenden Partner in Ihrer Nähe. Füllen Sie das Formular aus und erhalten Sie kostenlos Offerten von qualifizierten Unternehmen.
                    </p>
                    {!showForm && (
                      <Button 
                        onClick={() => setShowForm(true)} 
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        Jetzt kostenlose Offerten anfordern
                      </Button>
                    )}
                  </div>
                  <Button 
                    onClick={clearFilters} 
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Filter zurücksetzen
                  </Button>
                </div>
              </motion.div>

              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-4xl mx-auto mt-8"
                >
                  <CustomerForm 
                    initialDataFromProps={getInitialFormData()} 
                    formId="partner-search-form"
                  />
                </motion.div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <PartnerCard partner={partner} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PartnerSearchPage;