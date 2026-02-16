import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import i18n from '@/i18n';

export const getCityFromZip = async (zip, t) => {
  if (!zip || zip.length < 4) {
    return { city: null, error: t('errors.zipInvalid') || 'Invalid ZIP code' };
  }
  try {
    const { data, error: functionError } = await supabase.functions.invoke('fetch-city-by-zip', {
      body: { zipCode: zip },
    });

    if (functionError) {
      console.error('Supabase function error (fetch-city-by-zip):', functionError);
      const errorMessage = functionError.message && functionError.message.includes("City not found")
        ? t('errors.cityNotFoundForZip')
        : (functionError.message || t('errors.cityFetchApiError'));

      toast({
        title: t('errors.cityFetchApiError'),
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
      return { city: null, error: errorMessage };
    }

    if (data && data.city) {
      return { city: data.city, error: null };
    } else if (data && data.error) {
      toast({
        title: t('errors.cityFetchApiError'),
        description: data.error,
        variant: 'destructive',
        duration: 5000,
      });
      return { city: null, error: data.error };
    } else {
      const notFoundMsg = t('errors.cityNotFoundForZip') || 'City not found for this ZIP';
      toast({
        title: t('errors.cityFetchApiError'),
        description: notFoundMsg,
        variant: 'destructive',
        duration: 5000,
      });
      return { city: null, error: notFoundMsg };
    }
  } catch (e) {
    console.error('Error invoking Supabase function (fetch-city-by-zip):', e);
    const catchErrorMsg = e.message || t('errors.cityFetchApiError') || 'API error fetching city';
    toast({
      title: t('errors.cityFetchApiError'),
      description: catchErrorMsg,
      variant: 'destructive',
      duration: 5000,
    });
    return { city: null, error: catchErrorMsg };
  }
};


export const submitNewQuoteToSupabase = async (formData, t, i18nInstance = null) => {
  // Admin Panel'e Almanca olarak gönderilmeli, bu yüzden Almanca çevirileri kullan
  // i18nInstance verilirse onu kullan, yoksa global i18n'i kullan
  const i18nToUse = i18nInstance || i18n;
  
  // Almanca çevirileri almak için getFixedT kullan
  // Bu, mevcut dil ne olursa olsun Almanca çevirileri döndürür
  const tGerman = i18nToUse.getFixedT('de', 'newCustomerForm');
  
  // Admin Panel'e gönderilecek tüm çeviriler için Almanca kullan
  const tAdmin = tGerman;
  let finalServiceType = formData.service;
  let serviceSpecificDetails = [];

  if (formData.service === 'umzug') {
    switch (formData.umzugArt) {
      case 'privatumzug':
        finalServiceType = 'Privatumzug';
        if (formData.additional_cleaning) {
          finalServiceType += ' und Endreinigung';
        }
        break;
      case 'geschaeftsumzug':
        finalServiceType = 'Geschäftsumzug';
        if (formData.additional_cleaning) {
          finalServiceType += ' und Endreinigung';
        }
        break;
      case 'international':
        finalServiceType = 'Auslandumzug';
        break;
      case 'spezialtransport':
        finalServiceType = 'Spezialtransport';
        break;
      case 'kleintransport':
        finalServiceType = 'Kleintransport';
        break;
      case 'lagerung': // Lagerung service
        finalServiceType = 'Lagerung';
        serviceSpecificDetails.push(tAdmin('step1.lagerungDescription')); // Add description to details
        break;
      default:
        finalServiceType = 'Umzug';
    }
  } else if (formData.service === 'reinigung') {
    if (formData.umzugArt === 'umzugsreinigung') {
        finalServiceType = 'Endreinigung';
        serviceSpecificDetails.push(tAdmin('step1.cleaningOptions.umzugsreinigung_sublabel'));
    } else {
        let cleaningTypeLabel = tAdmin(`step1.cleaningOptions.${formData.umzugArt}`) || 'Reinigung';
        finalServiceType = cleaningTypeLabel;
    }
    
    if (formData.umzugArt === 'unterhaltsreinigung' && formData.cleaning_frequency) {
        const frequencyLabel = tAdmin(`step1.cleaningFrequency.${formData.cleaning_frequency}`);
        serviceSpecificDetails.push(`${tAdmin('step1.cleaningFrequency.title')}: ${frequencyLabel}`);
    // Wohnungsreinigung ve Hausreinigung için bu detaylar artık eklenmeyecek
    } else if (formData.umzugArt === 'bodenreinigung') {
        const floorTypeKeys = Object.keys(formData.floor_types || {}).filter(key => formData.floor_types[key]);
        if (floorTypeKeys.length > 0) {
            const floorTypeLabels = floorTypeKeys.map(key => tAdmin(`step1.floorTypes.${key}`)).join(', ');
            serviceSpecificDetails.push(`${tAdmin('step1.floorTypes.title')}: ${floorTypeLabels}`);
        }
        if (formData.floor_area) {
            const areaLabel = tAdmin(`step1.estimatedArea.${formData.floor_area}`);
            serviceSpecificDetails.push(`${tAdmin('step1.estimatedArea.title')}: ${areaLabel}`);
        }
    } else if (formData.umzugArt === 'fassadenreinigung') {
      if (formData.fassadenreinigung_flaeche) serviceSpecificDetails.push(`${tAdmin('step1.fassadenreinigung.flaeche.title')}: ${tAdmin(`step1.fassadenreinigung.flaeche.${formData.fassadenreinigung_flaeche}`)}`);
      if (formData.fassadenreinigung_erreichbarkeit) serviceSpecificDetails.push(`${tAdmin('step1.fassadenreinigung.erreichbarkeit.title')}: ${tAdmin(`step1.fassadenreinigung.erreichbarkeit.${formData.fassadenreinigung_erreichbarkeit}`)}`);
      const verschmutzungKeys = Object.keys(formData.fassadenreinigung_verschmutzung || {}).filter(key => formData.fassadenreinigung_verschmutzung[key]);
      if (verschmutzungKeys.length > 0) {
        const labels = verschmutzungKeys.map(k => tAdmin(`step1.fassadenreinigung.verschmutzung.${k}`)).join(', ');
        serviceSpecificDetails.push(`${tAdmin('step1.fassadenreinigung.verschmutzung.title')}: ${labels}`);
      }
    } else if (formData.umzugArt === 'fensterreinigung') {
      if(formData.fensterreinigung_anzahl) serviceSpecificDetails.push(`${tAdmin('step1.fensterreinigung.anzahl.title')}: ${tAdmin(`step1.fensterreinigung.anzahl.${formData.fensterreinigung_anzahl}`)}`);
      if(formData.fensterreinigung_scope) serviceSpecificDetails.push(`${tAdmin('step1.fensterreinigung.scope.title')}: ${tAdmin(`step1.fensterreinigung.scope.${formData.fensterreinigung_scope}`)}`);
      if(formData.fensterreinigung_zugang) serviceSpecificDetails.push(`${tAdmin('step1.fensterreinigung.zugang.title')}: ${tAdmin(`step1.fensterreinigung.zugang.${formData.fensterreinigung_zugang}`)}`);
    }

  } else if (formData.service === 'raeumung') {
      switch (formData.umzugArt) {
        case 'raeumung':
          finalServiceType = 'Räumung';
          if (formData.raeumung_scope) {
            const scopeLabel = tAdmin(`step1.raeumungScope.${formData.raeumung_scope}`);
            serviceSpecificDetails.push(`${tAdmin('step1.raeumungScope.title')}: ${scopeLabel}`);
          }
          break;
        case 'entsorgung':
          finalServiceType = 'Entsorgung';
          break;
        default:
          finalServiceType = 'Räumung / Entsorgung';
      }
  } else if (formData.service === 'maler') {
    switch (formData.umzugArt) {
      case 'maler_privat':
        finalServiceType = 'Malerarbeiten Privat';
        break;
      case 'maler_gewerbe':
        finalServiceType = 'Malerarbeiten Gewerbe';
        break;
      default:
        finalServiceType = 'Maler';
    }
    
    const malerType = formData.umzugArt === 'maler_privat' ? 'privat' : 'gewerbe';
    const whatToPaintKeys = Object.keys(formData.what_to_paint || {}).filter(key => formData.what_to_paint[key] && key !== 'anderes');
    let whatToPaintLabels = whatToPaintKeys.map(key => tAdmin(`step1.whatToPaint.${malerType}.${key}`)).join(', ');
    
    if(formData.what_to_paint?.anderes) {
        const otherLabel = tAdmin(`step1.whatToPaint.${malerType}.anderes`);
        let otherText = otherLabel;
        if(formData.maler_details_other) {
            otherText += `: ${formData.maler_details_other}`;
        }
        whatToPaintLabels = whatToPaintLabels ? `${whatToPaintLabels}, ${otherText}` : otherText;
    }
    
    if(whatToPaintLabels) serviceSpecificDetails.push(`${tAdmin('step1.whatToPaintTitle')}: ${whatToPaintLabels}`);

    if(formData.maler_current_condition) {
        const conditionLabel = tAdmin(`step1.malerCurrentConditionOptions.${formData.maler_current_condition}`);
        serviceSpecificDetails.push(`${tAdmin('step1.malerCurrentConditionLabel')}: ${conditionLabel}`);
    }
  }

  // Möbel De-/Montage bilgisini ekle (sadece Privatumzug und Auslandumzug için)
  if (formData.service === 'umzug' && (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'international') && formData.furniture_assembly) {
    serviceSpecificDetails.push('Möbel De-/Montage: Ja');
  }

  const serviceDetailsString = serviceSpecificDetails.join('\n');

  const umzugArtLabel = formData.umzugArt ? {
    'privatumzug': tAdmin('step1.privateMoveLabel'),
    'geschaeftsumzug': tAdmin('step1.businessMoveLabel'),
    'international': tAdmin('step1.internationalMoveLabel'),
    'spezialtransport': tAdmin('step1.specialTransportLabel'),
    'kleintransport': tAdmin('step1.kleintransportLabel'),
    'lagerung': tAdmin('step1.lagerungLabel'), // Lagerung service
    'raeumung': tAdmin('step1.entsorgungTypeRaeumungLabel'),
    'entsorgung': tAdmin('step1.entsorgungTypeEntsorgungLabel'),
    'maler_privat': tAdmin('step1.painterTypePrivateLabel'),
    'maler_gewerbe': tAdmin('step1.painterTypeCommercialLabel'),
    ...Object.fromEntries(Object.keys(tAdmin('step1.cleaningOptions', { returnObjects: true })).map(key => [key, tAdmin(`step1.cleaningOptions.${key}`)]))
  }[formData.umzugArt] || formData.umzugArt : null;

  const specialTransportTypeLabel = formData.special_transport_type ? {
    'klaviertransport': tAdmin('step1.specialTransportTypePiano'),
    'tresortransport': tAdmin('step1.specialTransportTypeSafe'),
    'maschinen_geraete': tAdmin('step1.specialTransportTypeMachine'),
    'sonstiges': tAdmin('step1.specialTransportTypeOther'),
  }[formData.special_transport_type] || formData.special_transport_type : null;
  
  // Helper function to get properly formatted labels
  const getFloorLabel = (value) => {
    if (!value) return null;
    
    // Handle floor options with proper formatting
    if (value === 'parterre') return tAdmin('step2.floorOptions.parterre');
    if (value === 'hochparterre') return tAdmin('step2.floorOptions.hochparterre');
    if (value === 'mehr_10_etage') return tAdmin('step2.floorOptions.mehr10Etage');
    if (value === 'etage_einfamilienhaus') return tAdmin('step2.floorOptions.etageEinfamilienhaus');
    
    // Handle numbered floors (e.g., "1.etage" -> "1. Etage")
    const etageMatch = value.match(/^(\d+)\.etage$/);
    if (etageMatch) {
      const count = parseInt(etageMatch[1], 10);
      return tAdmin('step2.floorOptions.etage', { count });
    }
    
    // Fallback: format value professionally
    // If it contains "etage" or numbers, format it properly
    if (value.toLowerCase().includes('etage')) {
      const numMatch = value.match(/(\d+)/);
      if (numMatch) {
        return `${numMatch[1]}. Etage`;
      }
      // Replace underscores and capitalize
      return value
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // General fallback: capitalize first letter, replace underscores
    return value
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getRoomLabel = (value) => {
    if (!value) return null;
    
    // First try roomsOption (for detailed room options like "3_zimmer_wohnung", "3_zimmer_einfamilienhaus")
    // Handle dots in value by using the value as-is (i18next handles dots in keys)
    const roomsOptionKey = `step2.roomsOption.${value}`;
    let label = tAdmin(roomsOptionKey, { defaultValue: roomsOptionKey });
    // Check if translation was found (if it returns the key itself, translation not found)
    if (label && label !== roomsOptionKey) return label;
    
    // Then try roomCountOptions (for simple options like "1", "2", "3.5")
    const roomKey = value.replace(/\./g, '_'); // Replace dots with underscores
    const roomCountKey = `step2.roomCountOptions.${roomKey}`;
    label = tAdmin(roomCountKey);
    if (label !== roomCountKey) return label;
    
    // Handle special cases like "3_zimmer_einfamilienhaus" if translation not found
    if (value.includes('zimmer_einfamilienhaus')) {
      // Extract number and format as "X Zimmer (Einfamilienhaus)"
      const match = value.match(/(\d+(?:\.\d+)?)_zimmer_einfamilienhaus/);
      if (match) {
        return `${match[1]} Zimmer (Einfamilienhaus)`;
      }
    }
    
    // Handle "zimmer_wohnung" cases
    if (value.includes('zimmer_wohnung')) {
      const match = value.match(/(\d+(?:\.\d+)?)_zimmer_wohnung/);
      if (match) {
        return `${match[1]} Zimmer (Wohnung)`;
      }
    }
    
    // Fallback: format value properly (capitalize first letter, replace underscores with spaces)
    const formatted = value
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return formatted;
  };

  const getObjectTypeLabel = (value) => {
    if (!value) return null;
    
    // Object types are nested: step2.objectTypeOptions.privat.xxx or step2.objectTypeOptions.gewerbe.xxx
    // Try privat first (most common)
    let label = tAdmin(`step2.objectTypeOptions.privat.${value}`);
    if (label !== `step2.objectTypeOptions.privat.${value}`) {
      return label;
    }
    
    // Try gewerbe
    label = tAdmin(`step2.objectTypeOptions.gewerbe.${value}`);
    if (label !== `step2.objectTypeOptions.gewerbe.${value}`) {
      return label;
    }
    
    // Fallback: format value professionally (capitalize first letter, replace underscores with spaces)
    const formatted = value
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return formatted;
  };

  const salutationLabel = formData.salutation ? {
    'herr': tAdmin('step3.salutationMr'),
    'frau': tAdmin('step3.salutationMs'),
  }[formData.salutation] || formData.salutation : null;

  const preferredTimeLabel = formData.preferred_time ? {
    'morning': tAdmin('step3.timeOptionMorning'),
    'afternoon': tAdmin('step3.timeOptionAfternoon'),
    'evening': tAdmin('step3.timeOptionEvening'),
    'flexible_full_day': tAdmin('step3.timeOptionFlexibleDay'),
  }[formData.preferred_time] || formData.preferred_time : null;

  const howFoundLabel = formData.how_found ? {
    'google': tAdmin('step3.howFoundGoogle'),
    'recommendation': tAdmin('step3.howFoundRecommendation'),
    'news': tAdmin('step3.howFoundNews'),
    'social_media': tAdmin('step3.howFoundSocialMedia'),
  }[formData.how_found] || formData.how_found : null;

  const quotesWantedValue = formData.quotes_wanted ? parseInt(formData.quotes_wanted, 10) : null;

  const quoteData = {
    servicetype: finalServiceType,
    umzugart: umzugArtLabel,
    special_transport_type: specialTransportTypeLabel,
    special_transport_other_details: formData.special_transport_other_details || null,
    additional_info: formData.additional_info || null,
    services_detail1: serviceDetailsString || null,
    from_street: formData.from_street || null,
    from_zip: formData.from_zip || null,
    from_city: formData.from_city || null,
    from_country: formData.from_country || 'CH',
    from_floor: getFloorLabel(formData.from_floor),
    from_rooms: getRoomLabel(formData.from_rooms),
    from_object_type: getObjectTypeLabel(formData.from_object_type),
    from_lift: typeof formData.from_lift === 'boolean' ? formData.from_lift : null,
    to_street: formData.to_street || null,
    to_zip: formData.to_zip || null,
    to_city: formData.to_city || null,
    to_country: formData.to_country || 'CH',
    to_floor: getFloorLabel(formData.to_floor),
    to_object_type: getObjectTypeLabel(formData.to_object_type),
    to_lift: typeof formData.to_lift === 'boolean' ? formData.to_lift : null,
    calculated_distance: formData.calculated_distance,
    salutation: salutationLabel,
    firstname: formData.firstName,
    lastname: formData.lastName,
    firmenname: formData.companyName || null,
    email: formData.email,
    phone: formData.phone,
    move_date: formData.move_date || null,
    move_date_flexible: formData.move_date_flexible,
    preferredtime: preferredTimeLabel,
    additional_cleaning: formData.additional_cleaning,
    additional_services_piano: formData.additional_piano,
    how_found: howFoundLabel,
    quoteswanted: quotesWantedValue,
    status: 'pending', 
  };
  
  // Ensure all undefined fields are null
  Object.keys(quoteData).forEach(key => {
    if (quoteData[key] === undefined) {
      quoteData[key] = null;
    }
  });

  const quoteId = uuidv4();

  const { data: insertData, error: insertError } = await supabase.from('quotes').insert([{ ...quoteData, id: quoteId }]).select();

  if (insertError) {
    console.error('Error inserting quote to Supabase:', insertError);
    return { data: null, error: insertError };
  }

  const newQuote = insertData?.[0];
  if (!newQuote) {
    return { data: null, error: new Error("Failed to retrieve new quote data after insertion.") };
  }

  // Call send-email Edge Function after successful quote insertion
  try {
    console.log('📧 Calling send-email function for quote:', quoteId);
    const { data: emailData, error: emailError } = await supabase.functions.invoke('send-email', {
      body: { quoteId: quoteId }
    });

    if (emailError) {
      console.error('❌ Error calling send-email function:', emailError);
      // Don't fail the form submission if email fails, just log it
      // The quote was successfully saved, so we return success
      console.warn('⚠️ Email sending failed, but quote was saved successfully');
    } else {
      console.log('✅ Email sent successfully:', emailData);
    }
  } catch (emailException) {
    console.error('💥 Exception calling send-email function:', emailException);
    // Don't fail the form submission if email fails
    console.warn('⚠️ Email sending exception, but quote was saved successfully');
  }

  return { data: newQuote, error: null };
};