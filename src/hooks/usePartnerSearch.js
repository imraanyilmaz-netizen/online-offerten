import { useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { cantonMap } from '@/lib/dataMapping';

// Reverse mapping: Canton name -> Canton code
const cantonNameToCode = Object.fromEntries(
  Object.entries(cantonMap).map(([code, name]) => [name, code])
);

export const usePartnerSearch = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [sortBy, setSortBy] = useState('rating_desc');

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('id, company_name, slug, address_street, address_city, address_zip, main_categories, offered_services, service_regions, average_rating, review_count, badge_tier, logo_url, hero_image_url, message')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching partners:', error);
        throw error;
      }
      setPartners(data || []);
    } catch (error) {
      console.error('Error in fetchPartners:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredPartners = useMemo(() => {
    let filtered = [...partners];

    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(partner =>
        partner.company_name.toLowerCase().includes(lowercasedFilter) ||
        partner.address_city.toLowerCase().includes(lowercasedFilter) ||
        partner.address_zip.includes(lowercasedFilter)
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(partner => {
        const normalizedSelected = selectedRegion.trim();
        const normalizedSelectedLower = normalizedSelected.toLowerCase();
        
        // Get canton code if region name is provided
        const cantonCode = cantonNameToCode[normalizedSelected];
        
        // Check service_regions array (case-insensitive)
        if (partner.service_regions && Array.isArray(partner.service_regions)) {
          const normalizedRegions = partner.service_regions.map(r => 
            typeof r === 'string' ? r.trim() : String(r).trim()
          );
          
          // Direct match in service_regions (by name)
          if (normalizedRegions.some(r => 
            r.toLowerCase() === normalizedSelectedLower ||
            r === normalizedSelected
          )) {
            return true;
          }
          
          // Match by canton code (if region name was provided)
          if (cantonCode && normalizedRegions.some(r => 
            r.toUpperCase() === cantonCode ||
            r.toLowerCase() === cantonCode.toLowerCase()
          )) {
            return true;
          }
        }
        
        // Fallback: Check address_city (case-insensitive)
        if (partner.address_city) {
          const normalizedCity = partner.address_city.trim().toLowerCase();
          
          // Direct city match
          if (normalizedCity === normalizedSelectedLower) {
            return true;
          }
          
          // Check if city name contains region name or vice versa
          // (e.g., "Zürich" city matches "Zürich" region)
          if (normalizedCity.includes(normalizedSelectedLower) || 
              normalizedSelectedLower.includes(normalizedCity)) {
            return true;
          }
        }
        
        return false;
      });
    }

    if (selectedService) {
      // Map service filter names to main_categories values
      const serviceCategoryMap = {
        'Umzugsfirma': 'umzug',
        'Reinigungfirma': 'reinigung',
        'Malerfirma': 'maler'
      };
      
      const categoryValue = serviceCategoryMap[selectedService] || selectedService;
      
      filtered = filtered.filter(partner => {
        // First check main_categories (primary filter)
        if (partner.main_categories && partner.main_categories.includes(categoryValue)) {
          return true;
        }
        
        // Fallback: check if any offered_services belong to this category
        if (partner.offered_services && partner.offered_services.length > 0) {
          const categoryServiceMap = {
            'umzug': ['privatumzug', 'geschaeftsumzug', 'auslandumzug', 'spezialtransport', 'kleintransport', 'moebellift_service', 'raeumung_service', 'entsorgung_service'],
            'reinigung': ['wohnungsreinigung', 'hausreinigung', 'buero_reinigung', 'unterhaltsreinigung', 'baureinigung', 'grundreinigung', 'fensterreinigung', 'bodenreinigung', 'fassadenreinigung', 'hofreinigung', 'umzugsreinigung'],
            'maler': ['maler_service']
          };
          
          const categoryServices = categoryServiceMap[categoryValue] || [];
          return categoryServices.some(service => partner.offered_services.includes(service));
        }
        
        return false;
      });
    }

    switch (sortBy) {
      case 'rating_desc':
        filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      case 'reviews_desc':
        filtered.sort((a, b) => (b.review_count || 0) - (a.review_count || 0));
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.company_name.localeCompare(b.company_name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.company_name.localeCompare(a.company_name));
        break;
      default:
        break;
    }

    return filtered;
  }, [partners, searchTerm, selectedRegion, selectedService, sortBy]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedService('');
    setSortBy('rating_desc');
  }, []);

  return {
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
  };
};