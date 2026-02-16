import { useTranslation } from 'react-i18next';

const useNewFormValidation = (formData) => {
  const { t } = useTranslation('newCustomerForm');

  const validate = (step = 'all') => {
    let errors = {};
    
    const validateStep1 = () => {
      const step1Errors = {};
      if (!formData.service) {
        step1Errors.service = t('errors.serviceMissing');
      } else if (formData.service === 'umzug') {
        if (!formData.umzugArt) step1Errors.umzugArt = t('errors.umzugArtMissing');
        else if (formData.umzugArt === 'spezialtransport') {
          if (!formData.special_transport_type) step1Errors.special_transport_type = t('errors.fieldRequired');
          else if (formData.special_transport_type === 'sonstiges' && (!formData.special_transport_other_details || formData.special_transport_other_details.length < 10)) {
            step1Errors.special_transport_other_details = t('errors.malerDetailsMissing');
          }
        }
      } else if (formData.service === 'reinigung') {
        if (!formData.umzugArt) step1Errors.umzugArt = t('errors.umzugArtMissing');
        else if (formData.umzugArt === 'unterhaltsreinigung' && !formData.cleaning_frequency) step1Errors.cleaning_frequency = t('errors.fieldRequired');
        // Wohnungsreinigung ve Hausreinigung için bu sorular artık zorunlu değil
        else if (formData.umzugArt === 'bodenreinigung') {
          if (!Object.values(formData.floor_types || {}).some(v => v)) step1Errors.floor_types = t('errors.floorTypesMissing');
          if (!formData.floor_area) step1Errors.floor_area = t('errors.fieldRequired');
        } else if (formData.umzugArt === 'fassadenreinigung') {
          if (!formData.fassadenreinigung_flaeche) step1Errors.fassadenreinigung_flaeche = t('errors.fieldRequired');
          if (!formData.fassadenreinigung_erreichbarkeit) step1Errors.fassadenreinigung_erreichbarkeit = t('errors.fieldRequired');
          if (!Object.values(formData.fassadenreinigung_verschmutzung || {}).some(v => v)) step1Errors.fassadenreinigung_verschmutzung = t('errors.fieldRequired');
        } else if (formData.umzugArt === 'fensterreinigung') {
            if (!formData.fensterreinigung_anzahl) step1Errors.fensterreinigung_anzahl = t('errors.fieldRequired');
            if (!formData.fensterreinigung_scope) step1Errors.fensterreinigung_scope = t('errors.fieldRequired');
            if (!formData.fensterreinigung_zugang) step1Errors.fensterreinigung_zugang = t('errors.fieldRequired');
        }
      } else if (formData.service === 'raeumung') {
        if (!formData.umzugArt) step1Errors.umzugArt = t('errors.umzugArtMissing');
        else if (formData.umzugArt === 'raeumung' && !formData.raeumung_scope) {
          step1Errors.raeumung_scope = t('errors.fieldRequired');
        }
      } else if (formData.service === 'maler') {
        if (!formData.umzugArt) step1Errors.umzugArt = t('errors.umzugArtMissing');
        if (!Object.values(formData.what_to_paint || {}).some(v => v)) step1Errors.what_to_paint = t('errors.whatToPaintMissing');
      }
      return step1Errors;
    };
    
    const validateStep2 = () => {
        const step2errors = {};
        const prefixes = ['from'];

        if (formData.service === 'umzug' && formData.umzugArt !== 'lagerung') prefixes.push('to');

        prefixes.forEach(prefix => {
            if (!formData[`${prefix}_street`]) step2errors[`${prefix}_street`] = t('errors.streetRequired');
            if (!formData[`${prefix}_zip`]) step2errors[`${prefix}_zip`] = t('errors.zipRequired');
            if (!formData[`${prefix}_city`]) step2errors[`${prefix}_city`] = t('errors.cityRequired');
            
            const isFenster = formData.service === 'reinigung' && formData.umzugArt === 'fensterreinigung';
            const skipFloor = isFenster;
            const skipObjectType = isFenster; 

            if (!skipFloor && !formData[`${prefix}_floor`]) {
              step2errors[`${prefix}_floor`] = t('errors.floorRequired');
            }
            
            if (prefix === 'from') {
              const showRoomsField =
                (formData.service === 'umzug' && ['privatumzug', 'international'].includes(formData.umzugArt)) ||
                (formData.service === 'reinigung' && !['fensterreinigung', 'fassadenreinigung', 'hofreinigung'].includes(formData.umzugArt)) ||
                (formData.service === 'raeumung' && formData.umzugArt === 'raeumung' && formData.raeumung_scope !== 'komplette_raeumung') ||
                (formData.service === 'maler' && formData.umzugArt === 'maler_privat');
              
              if (showRoomsField && !formData.from_rooms) {
                  step2errors.from_rooms = t('errors.fieldRequired');
              }
            }

            const showObjectTypeField =
              (formData.service === 'umzug' && ['privatumzug', 'international', 'geschaeftsumzug'].includes(formData.umzugArt)) ||
              (formData.service === 'reinigung' && !['fensterreinigung', 'hofreinigung'].includes(formData.umzugArt)) ||
              (formData.service === 'raeumung') ||
              (formData.service === 'maler');

            if (showObjectTypeField && !skipObjectType && !formData[`${prefix}_object_type`]) {
              step2errors[`${prefix}_object_type`] = t('errors.objectTypeRequired');
            }
        });
        
        if (formData.umzugArt === 'international' && formData.from_country === formData.to_country) {
            step2errors.to_country = t('errors.fromToCountryMustBeDifferent');
        }

        if (!formData.salutation) step2errors.salutation = t('errors.salutationRequired');
        if (!formData.firstName) step2errors.firstName = t('errors.firstNameRequired');
        if (!formData.lastName) step2errors.lastName = t('errors.lastNameRequired');
        if (!formData.email) step2errors.email = t('errors.emailRequired');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) step2errors.email = t('errors.emailInvalid');
        if (!formData.phone) step2errors.phone = t('errors.phoneRequired');
        if (!formData.move_date) step2errors.move_date = t('errors.dateRequired');
        if (!formData.quotes_wanted) step2errors.quotes_wanted = t('errors.quotesWantedRequired');
        if (!formData.datenschutz) step2errors.datenschutz = t('errors.datenschutzRequired') || 'Bitte akzeptieren Sie die Datenschutzerklärung.';
        
        return step2errors;
    };
    
    if (step === 1) {
      // Step 1: Nur Hauptservice-Auswahl
      if (!formData.service) {
        errors.service = t('errors.serviceMissing');
      }
    } else if (step === 2) {
      // Step 2: Detaillierte Service-Fragen (umzugArt, etc.)
      errors = validateStep1();
    } else if (step === 3) {
      // Step 3: Details und Kontakt
      errors = validateStep2();
    } else if (step === 'all') {
      errors = {
        ...validateStep1(),
        ...validateStep2(),
      };
    }
    
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  return validate;
};

export default useNewFormValidation;