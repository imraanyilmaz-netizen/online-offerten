import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const usePartnerEditForm = (partner, onSave, onClose, onRefresh) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const initializeForm = (p) => ({
    company_name: p?.company_name || p?.name || '',
    contact_person: p?.contact_person || '',
    email: p?.email || '',
    phone: p?.phone || '',
    address_street: p?.address_street || '',
    address_zip: p?.address_zip || '',
    address_city: p?.address_city || '',
    website: p?.website || '',
    year_founded: p?.year_founded || '',
    employee_count: p?.employee_count || '',
    commercial_register_number: p?.commercial_register_number || '',
    liability_insurance: p?.liability_insurance || false,
    message: p?.message || '',
    status: p?.status || 'active',
    mainCategories: p?.main_categories || [],
    selectedServices: p?.offered_services || [],
    service_regions: p?.service_regions || [],
  });
  
  const [formData, setFormData] = useState(initializeForm(partner));
  const [newRegion, setNewRegion] = useState('');

  useEffect(() => {
    if (partner) {
      setFormData(initializeForm(partner));
    }
  }, [partner]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMainCategoryChange = (categoryId) => {
    setFormData(prev => {
      const newCategories = prev.mainCategories.includes(categoryId)
        ? prev.mainCategories.filter(c => c !== categoryId)
        : [...prev.mainCategories, categoryId];
      return { ...prev, mainCategories: newCategories };
    });
  };

  const handleServiceChange = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(s => s !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const addRegion = () => {
    if (newRegion && !formData.service_regions.includes(newRegion)) {
      handleInputChange('service_regions', [...formData.service_regions, newRegion]);
      setNewRegion('');
    }
  };

  const removeRegion = (regionToRemove) => {
    handleInputChange('service_regions', formData.service_regions.filter(r => r !== regionToRemove));
  };

  const handleSave = async () => {
    if (!formData.company_name) {
      toast({ title: "Fehler", description: "Der Firmenname ist obligatorisch.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { email, mainCategories, selectedServices, ...baseData } = formData;
      
      const yearFounded = baseData.year_founded === '' || baseData.year_founded === undefined ? null : parseInt(baseData.year_founded, 10);

      const updateData = {
          ...baseData,
          name: baseData.company_name, // Sync name with company_name
          offered_services: selectedServices,
          main_categories: mainCategories,
          year_founded: isNaN(yearFounded) ? null : yearFounded,
          updated_at: new Date().toISOString()
      };
      
      await onSave(partner.id, updateData);
      toast({ title: "Erfolg", description: "Partnerinformationen wurden aktualisiert." });
      onRefresh();
      onClose();
    } catch (error) {
      toast({ title: "Fehler", description: `Fehler beim Aktualisieren des Partners: ${error.message}`, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
      onClose();
  }

  return {
    formData, loading, newRegion, setNewRegion,
    handleInputChange, addRegion, removeRegion,
    handleMainCategoryChange, handleServiceChange,
    handleSave, handleClose
  };
};