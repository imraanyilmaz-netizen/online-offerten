import { useState, useCallback } from 'react';

const initialFormData = {
  service: '',
  umzugArt: '',
  additional_cleaning: false,
  special_transport_type: '',
  special_transport_other_details: '',
  what_to_paint: {},
  maler_details_other: '',
  maler_current_condition: '',
  from_street: '',
  from_zip: '',
  from_city: '',
  from_floor: '',
  from_lift: null,
  from_rooms: '',
  from_country: 'CH',
  from_object_type: '',
  to_street: '',
  to_zip: '',
  to_city: '',
  to_floor: '',
  to_lift: null,
  to_rooms: '',
  to_object_type: '',
  to_country: 'CH',
  move_date: '',
  move_date_flexible: false,
  salutation: '',
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  preferred_time: '',
  additional_piano: false,
  furniture_assembly: false,
  additional_info: '',
  how_found: '',
  quotes_wanted: '4',
  datenschutz: false,
  errors: {},
  cleaning_frequency: '',
  what_to_clean: {},
  estimated_area: '',
  floor_types: {},
  floor_area: '',
  fassadenreinigung_flaeche: '',
  fassadenreinigung_erreichbarkeit: '',
  fassadenreinigung_verschmutzung: {},
  raeumung_scope: '',
  fensterreinigung_anzahl: '',
  fensterreinigung_scope: '',
  fensterreinigung_zugang: '',
  lagerung: false, // Lagerung field
};

const useNewCustomerForm = (initialData = {}) => {
  const [formData, setFormData] = useState({
    ...initialFormData,
    ...initialData
  });

  const makeChange = useCallback((update) => {
    setFormData(prev => {
        const newErrors = { ...prev.errors };
        Object.keys(update).forEach(key => {
            if (newErrors[key]) delete newErrors[key];
        });
        return { ...prev, ...update, errors: newErrors };
    });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    makeChange({ [name]: value });
  }, [makeChange]);

  const handleSelectChange = useCallback((name, value) => {
    makeChange({ [name]: value });
  }, [makeChange]);

  const handleCheckboxChange = useCallback((name, checked) => {
    const keys = name.split('.');
    if (keys.length > 1) {
        setFormData(prev => {
            const newSubState = { ...prev[keys[0]], [keys[1]]: checked };
            const newData = { ...prev, [keys[0]]: newSubState };
            const parentKey = keys[0];
            const newErrors = { ...prev.errors };
            if (Object.values(newSubState).some(v => v)) {
              delete newErrors[parentKey];
            }
            return { ...newData, errors: newErrors };
        });
    } else {
        makeChange({ [name]: checked });
    }
  }, [makeChange]);

  const handleRadioGroupChange = useCallback((name, value) => {
    handleSelectChange(name, value);
  }, [handleSelectChange]);
  
  const handleHowFoundChange = useCallback((value) => {
    handleSelectChange('how_found', value);
  }, [handleSelectChange]);
  
  const handleQuotesWantedChange = useCallback((value) => {
    handleSelectChange('quotes_wanted', value);
  }, [handleSelectChange]);

  const handleServiceSelect = useCallback((serviceId, isFromUrl = false) => {
    setFormData(prev => {
      let resetData = { umzugArt: '' };
      if (isFromUrl || prev.service !== serviceId) {
        resetData = {
          ...resetData,
          cleaning_frequency: '', what_to_clean: {}, estimated_area: '',
          floor_types: {}, floor_area: '', fassadenreinigung_flaeche: '',
          fassadenreinigung_erreichbarkeit: '', fassadenreinigung_verschmutzung: {},
          raeumung_scope: '',           fensterreinigung_anzahl: '', fensterreinigung_scope: '',
          fensterreinigung_zugang: '', what_to_paint: {}, maler_details_other: '',
          maler_current_condition: '',
          lagerung: false, // Reset lagerung state when service changes
        };
      }
      const newErrors = { ...prev.errors };
      delete newErrors.service;
      return { ...prev, service: serviceId, ...resetData, errors: newErrors };
    });
  }, []);

  const handleUmzugArtChange = useCallback((umzugArtValue) => {
    setFormData(prev => {
      let resetData = {};
      if (prev.umzugArt && prev.umzugArt !== umzugArtValue) {
        if (prev.service === 'reinigung') {
          resetData = {
              cleaning_frequency: '', what_to_clean: {}, estimated_area: '',
              floor_types: {}, floor_area: '', fassadenreinigung_flaeche: '',
              fassadenreinigung_erreichbarkeit: '', fassadenreinigung_verschmutzung: {},
              fensterreinigung_anzahl: '', fensterreinigung_scope: '', fensterreinigung_zugang: '',
          };
        } else if (prev.service === 'raeumung') {
            resetData = { raeumung_scope: '' };
        }
      }
       const newErrors = { ...prev.errors };
       delete newErrors.umzugArt;
      return { ...prev, umzugArt: umzugArtValue, ...resetData, errors: newErrors };
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);
  
  const setErrors = useCallback((errors) => {
    setFormData(prev => ({...prev, errors}));
  }, []);

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleRadioGroupChange,
    handleServiceSelect,
    handleUmzugArtChange,
    handleHowFoundChange,
    handleQuotesWantedChange,
    resetForm,
    setErrors,
  };
};

export default useNewCustomerForm;