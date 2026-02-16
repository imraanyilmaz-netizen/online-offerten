import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Building, Loader2, MapPin, ChevronsUpDown, Globe, UserCircle, CalendarDays, Info, Search, Users, FileText } from 'lucide-react';
import { getCityFromZip } from './newFormUtils';
import useAddressAutocomplete from '@/hooks/useAddressAutocomplete';
import { countries } from '@/data/countries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
// framer-motion removed - CSS transitions for better INP


const AddressBlock = ({ type, formData, handleChange, handleSelectChange, errors, t, isMoveService }) => {
  const prefix = type;
  const titleKey = isMoveService ? (type === 'from' ? 'step2.fromAddressTitleMove' : 'step2.toAddressTitleMove') : 'step2.serviceAddressTitle';
  const icon = type === 'from' || !isMoveService ? <Home className="w-6 h-6 text-green-600 mr-2" /> : <Building className="w-6 h-6 text-green-600 mr-2" />;
  const [isFetchingCity, setIsFetchingCity] = useState(false);
  
  const isInternationalMove = formData.umzugArt === 'international';

  const { loading: addressLoading, suggestions, getSuggestions, clearSuggestions } = useAddressAutocomplete();
  const [isStreetInputFocused, setIsStreetInputFocused] = useState(false);
  const [showAllStreetSuggestions, setShowAllStreetSuggestions] = useState(false);
  const streetWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (streetWrapperRef.current && !streetWrapperRef.current.contains(event.target)) {
        setIsStreetInputFocused(false);
        setShowAllStreetSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [streetWrapperRef]);

  const handleStreetInputChange = (e) => {
    const value = e.target.value;
    handleChange({ target: { name: `${prefix}_street`, value } }); 
    if (value.trim().length >= 3) {
      getSuggestions(value, formData[`${prefix}_country`]);
    } else {
      clearSuggestions();
    }
    setShowAllStreetSuggestions(false);
  };

  const handleStreetSuggestionSelect = (suggestion) => {
    const streetWithNumber = `${suggestion.street || ''} ${suggestion.housenumber || ''}`.trim();
    
    handleChange({ target: { name: `${prefix}_street`, value: streetWithNumber } });
    handleChange({ target: { name: `${prefix}_zip`, value: suggestion.postcode } });
    handleChange({ target: { name: `${prefix}_city`, value: suggestion.city } });
    
    clearSuggestions();
    setIsStreetInputFocused(false);
    setShowAllStreetSuggestions(false);
  };
  
  const displayedStreetSuggestions = showAllStreetSuggestions ? suggestions : suggestions.slice(0, 5);

  const roomCountOptions = [
    { value: '1', label: t('step2.roomCountOptions.1') },
    { value: '1.5', label: t('step2.roomCountOptions.1_5') },
    { value: '2', label: t('step2.roomCountOptions.2') },
    { value: '2.5', label: t('step2.roomCountOptions.2_5') },
    { value: '3', label: t('step2.roomCountOptions.3') },
    { value: '3.5', label: t('step2.roomCountOptions.3_5') },
    { value: '4', label: t('step2.roomCountOptions.4') },
    { value: '4.5', label: t('step2.roomCountOptions.4_5') },
    { value: '5+', label: t('step2.roomCountOptions.5plus') },
  ];

  const getObjectTypeOptions = () => {
    const allGewerbeOptions = [
      { value: 'gewerbeimmobilie', label: t('step2.objectTypeOptions.gewerbe.gewerbeimmobilie') },
      { value: 'buerogebaeude', label: t('step2.objectTypeOptions.gewerbe.buerogebaeude') },
      { value: 'lagerhalle', label: t('step2.objectTypeOptions.gewerbe.lagerhalle') },
      { value: 'ladenlokal', label: t('step2.objectTypeOptions.gewerbe.ladenlokal') },
      { value: 'industriegebaeude', label: t('step2.objectTypeOptions.gewerbe.industriegebaeude') },
    ];

    const allPrivatOptions = [
      { value: 'wohnung', label: t('step2.objectTypeOptions.privat.wohnung') },
      { value: 'einfamilienhaus', label: t('step2.objectTypeOptions.privat.einfamilienhaus') },
      { value: 'mehrfamilienhaus', label: t('step2.objectTypeOptions.privat.mehrfamilienhaus') },
    ];
    
    const isGewerbeService =
        (formData.service === 'umzug' && formData.umzugArt === 'geschaeftsumzug') ||
        (formData.service === 'reinigung' && formData.umzugArt === 'buero') || // Büroreinigung uses full gewerbe list
        (formData.service === 'maler' && formData.umzugArt === 'maler_gewerbe');

    if (isGewerbeService) {
      return allGewerbeOptions;
    }

    const specificCleaningServices = [
      'umzugsreinigung', 'unterhaltsreinigung', 'grundreinigung', 'baureinigung', 'bodenreinigung'
    ];

    if (formData.service === 'reinigung' && specificCleaningServices.includes(formData.umzugArt)) {
        return [
            { value: 'wohnung', label: t('step2.objectTypeOptions.privat.wohnung') },
            { value: 'einfamilienhaus', label: t('step2.objectTypeOptions.privat.einfamilienhaus') }, // "Haus" is more general, using "Einfamilienhaus"
            { value: 'gewerbeimmobilie', label: t('step2.objectTypeOptions.gewerbe.gewerbeimmobilie') }
        ];
    }
    
    const isPrivateService = 
      (formData.service === 'umzug' && (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'lagerung')) ||
      (formData.service === 'reinigung' && ['wohnungsreinigung', 'hausreinigung'].includes(formData.umzugArt)) ||
      (formData.service === 'maler' && formData.umzugArt === 'maler_privat');
    
    if (isPrivateService) {
        return allPrivatOptions.filter(opt => opt.value !== 'mehrfamilienhaus');
    }
    
    // Default/fallback options
    return [...allPrivatOptions, { value: 'gewerbeimmobilie', label: t('step2.objectTypeOptions.gewerbe.gewerbeimmobilie') }];
  };
  
  const objectTypeOptions = getObjectTypeOptions();
  
  const showRoomsField =
    (formData.service === 'umzug' && ['privatumzug', 'international'].includes(formData.umzugArt)) ||
    (formData.service === 'reinigung' && !['fensterreinigung', 'fassadenreinigung', 'hofreinigung'].includes(formData.umzugArt)) ||
    (formData.service === 'raeumung' && formData.umzugArt === 'raeumung' && formData.raeumung_scope !== 'komplette_raeumung') ||
    (formData.service === 'maler' && formData.umzugArt === 'maler_privat');


  const showObjectTypeField =
      (formData.service === 'umzug' && ['privatumzug', 'international', 'geschaeftsumzug', 'lagerung'].includes(formData.umzugArt)) ||
      (formData.service === 'reinigung' && !['fensterreinigung', 'hofreinigung'].includes(formData.umzugArt)) ||
      (formData.service === 'raeumung') ||
      (formData.service === 'maler');

  const showLiftField = 
      formData.service === 'umzug' ||
      formData.service === 'reinigung' ||
      (formData.service === 'maler' && ['waende', 'zimmerdecke', 'innenanstrich', 'tueren'].some(option => formData.what_to_paint?.[option])) ||
      (formData.service === 'raeumung');

  const showFloorField = true;


  const floorOptions = [
    { value: 'parterre', label: t('step2.floorOptions.parterre') },
    { value: 'hochparterre', label: t('step2.floorOptions.hochparterre') },
    ...Array.from({ length: 10 }, (_, i) => ({ value: `${i + 1}.etage`, label: t('step2.floorOptions.etage', { count: i + 1 }) })),
    { value: 'mehr_10_etage', label: t('step2.floorOptions.mehr10Etage') },
    { value: 'etage_einfamilienhaus', label: t('step2.floorOptions.etageEinfamilienhaus') },
  ];


  const handleZipChange = async (e) => {
    const zipValue = e.target.value;
    handleChange(e); 

    if (formData[`${prefix}_country`] === 'CH' && zipValue && zipValue.length >= 4) {
      setIsFetchingCity(true);
      try {
        const cityData = await getCityFromZip(zipValue, t);
        if (cityData.city) {
          handleChange({ target: { name: `${prefix}_city`, value: cityData.city } });
        } else if (cityData.error) {
          console.warn(`Error fetching city for ZIP ${zipValue}: ${cityData.error}`);
          handleChange({ target: { name: `${prefix}_city`, value: '' } }); 
        }
      } catch (error) {
        console.error("Error in handleZipChange:", error);
        handleChange({ target: { name: `${prefix}_city`, value: '' } }); 
      } finally {
        setIsFetchingCity(false);
      }
    } else if (!zipValue) {
      handleChange({ target: { name: `${prefix}_city`, value: '' } }); 
    }
  };

  return (
    <div className="w-full space-y-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-base font-semibold text-slate-800">
          {t(titleKey)}
        </h3>
      </div>

      {isInternationalMove && (
          <div className="space-y-1">
              <Label htmlFor={`${prefix}_country`} className="font-medium text-slate-700 text-sm sm:text-base flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {t('step2.countryLabel')} <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select name={`${prefix}_country`} value={formData[`${prefix}_country`] || ''} onValueChange={(value) => handleSelectChange(`${prefix}_country`, value)}>
                  <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base">
                      <SelectValue placeholder={t('step2.countryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="text-sm sm:text-base">
                      {countries.map(country => <SelectItem key={country.code} value={country.code} className="text-sm sm:text-base">{country.name}</SelectItem>)}
                  </SelectContent>
              </Select>
              {errors && errors[`${prefix}_country`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_country`]}</p>}
          </div>
      )}
      
      <div className="space-y-1 relative" ref={streetWrapperRef}>
        <Label htmlFor={`${prefix}_street`} className="font-medium text-slate-700 text-sm sm:text-base">{t('step2.streetLabel')} <span className="text-red-500 ml-1">*</span></Label>
        <Input
          id={`${prefix}_street`}
          name={`${prefix}_street`}
          value={formData[`${prefix}_street`] || ''}
          onChange={handleStreetInputChange}
          onFocus={() => setIsStreetInputFocused(true)}
          placeholder={t('step2.streetPlaceholder')}
          className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"
          autoComplete="off"
        />
        {isStreetInputFocused && (addressLoading || suggestions.length > 0) && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-y-auto">
            {addressLoading && (
              <div className="p-3 text-sm text-gray-500 flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('step2.addressSearching')}
              </div>
            )}
            {!addressLoading && displayedStreetSuggestions.length > 0 && (
              <ul className="py-1">
                {displayedStreetSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-start"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleStreetSuggestionSelect(suggestion);
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-400 shrink-0" />
                    <div className="flex-grow">
                      <p className="font-medium text-sm sm:text-base">
                        {suggestion.street} {suggestion.housenumber && `${suggestion.housenumber}`}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {suggestion.postcode} {suggestion.city}
                        {suggestion.suburb && suggestion.suburb !== suggestion.city ? `, ${suggestion.suburb}` : ''}
                      </p>
                    </div>
                  </li>
                ))}
                {!showAllStreetSuggestions && suggestions.length > 5 && (
                  <li className="px-3 py-2 border-t border-gray-200">
                    <button
                      type="button"
                      className="text-sm text-green-600 p-0 h-auto w-full justify-start flex items-center hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowAllStreetSuggestions(true);
                      }}
                    >
                      <ChevronsUpDown className="w-4 h-4 mr-2" />
                      {t('step2.showAllSuggestions', { count: suggestions.length - 5 })}
                    </button>
                  </li>
                )}
              </ul>
            )}
            {!addressLoading && formData[`${prefix}_street`] && formData[`${prefix}_street`].length >= 3 && suggestions.length === 0 && (
              <div className="p-3 text-sm text-gray-500">
                {t('step2.noSuggestionsFound')}
              </div>
            )}
          </div>
        )}
        {errors && errors[`${prefix}_street`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_street`]}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor={`${prefix}_zip`} className="font-medium text-slate-700 text-sm sm:text-base">{t('step2.zipCityLabel')} <span className="text-red-500 ml-1">*</span></Label>
        <div className="grid grid-cols-3 gap-4 items-start">
          <div className="col-span-1 relative">
            <Input
              id={`${prefix}_zip`}
              name={`${prefix}_zip`}
              value={formData[`${prefix}_zip`] || ''}
              onChange={handleZipChange}
              placeholder={t('step2.zipPlaceholder')}
              className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"
              maxLength={10}
            />
            {isFetchingCity && <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />}
             {errors && errors[`${prefix}_zip`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_zip`]}</p>}
          </div>
          <div className="col-span-2">
            <Input
              id={`${prefix}_city`}
              name={`${prefix}_city`}
              value={formData[`${prefix}_city`] || ''}
              onChange={handleChange}
              placeholder={t('step2.cityPlaceholder')}
              className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"
              readOnly={isFetchingCity}
            />
             {errors && errors[`${prefix}_city`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_city`]}</p>}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 items-start pt-1">
        
          {showFloorField && (
            <div className="space-y-1"
            >
              <Label htmlFor={`${prefix}_floor`} className="font-medium text-slate-700 text-xs">{t('step2.floorLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <Select name={`${prefix}_floor`} value={formData[`${prefix}_floor`] || ''} onValueChange={(value) => handleSelectChange(`${prefix}_floor`, value)}>
                <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9">
                  <SelectValue placeholder={t('step2.floorLabel')} />
                </SelectTrigger>
                <SelectContent className="text-sm">
                  {floorOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm">{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors && errors[`${prefix}_floor`] && <p className="text-xs text-red-500 mt-1">{errors[`${prefix}_floor`]}</p>}
            </div>
          )}
        

        
          {showRoomsField && (
            <div className="space-y-1"
            >
              <Label htmlFor={`${prefix}_rooms`} className="font-medium text-slate-700 text-xs">{t('step2.roomsLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <Select name={`${prefix}_rooms`} value={formData[`${prefix}_rooms`] || ''} onValueChange={(value) => handleSelectChange(`${prefix}_rooms`, value)}>
                <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9">
                  <SelectValue placeholder="Zimmer" />
                </SelectTrigger>
                <SelectContent className="text-sm">
                  {roomCountOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm">{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors && errors[`${prefix}_rooms`] && <p className="text-xs text-red-500 mt-1">{errors[`${prefix}_rooms`]}</p>}
            </div>
          )}
        
        
        
          {showObjectTypeField && (
            <div className="space-y-1"
            >
              <Label htmlFor={`${prefix}_object_type`} className="font-medium text-slate-700 text-xs">{t('step2.objectTypeLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <Select name={`${prefix}_object_type`} value={formData[`${prefix}_object_type`] || ''} onValueChange={(value) => handleSelectChange(`${prefix}_object_type`, value)}>
                <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9">
                  <SelectValue placeholder={t('step2.objectTypeLabel')} />
                </SelectTrigger>
                <SelectContent className="text-sm">
                  {objectTypeOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm">{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors && errors[`${prefix}_object_type`] && <p className="text-xs text-red-500 mt-1">{errors[`${prefix}_object_type`]}</p>}
            </div>
          )}
        

        
          {showLiftField && (
            <div
              className="space-y-1"
            >
              <Label className="font-medium text-slate-700 text-xs">{t('step2.liftLabel')}</Label>
              <RadioGroup name={`${prefix}_lift`} value={String(formData[`${prefix}_lift`])} onValueChange={(value) => handleSelectChange(`${prefix}_lift`, value === 'true')} className="flex items-center space-x-2 pt-1.5">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="true" id={`${prefix}_lift_yes`} className="h-4 w-4" />
                  <Label htmlFor={`${prefix}_lift_yes`} className="font-normal text-xs">{t('step2.liftOptionYes')}</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="false" id={`${prefix}_lift_no`} className="h-4 w-4" />
                  <Label htmlFor={`${prefix}_lift_no`} className="font-normal text-xs">{t('step2.liftOptionNo')}</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        
      </div>
      
    </div>
  );
};

const SectionCard = ({ icon, titleKey, descriptionKey, children }) => {
  const { t } = useTranslation('newCustomerForm');
  return (
    <Card className="w-full bg-white shadow-md border-gray-200 rounded-lg overflow-hidden">
      <CardHeader className="bg-slate-50 p-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          {React.cloneElement(icon, { className: "w-5 h-5 text-green-600" })}
          <div>
            <CardTitle className="text-sm font-semibold text-slate-800">
              {t(titleKey)}
            </CardTitle>
            {descriptionKey && 
              <CardDescription className="text-xs text-slate-600 mt-0.5">
                {t(descriptionKey)}
              </CardDescription>
            }
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {children}
      </CardContent>
    </Card>
  );
};

const HowFoundButton = ({ id, labelKey, icon, selected, onClick }) => {
    const { t } = useTranslation('newCustomerForm');
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => onClick(id)}
        className={`flex-1 justify-start text-left h-auto py-2.5 px-3
          ${selected ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500' : 'text-gray-700 hover:bg-gray-50'}`}
      >
        {icon}
        <span className="ml-2 text-sm sm:text-base">{t(labelKey)}</span>
      </Button>
    );
};

const QuotesWantedButton = ({ count, labelKey, recommended, selected, onClick }) => {
    const { t } = useTranslation('newCustomerForm');
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => onClick(count)}
        className={`w-full h-auto py-2 px-1 flex flex-col items-center justify-center text-center transition-all duration-200
          ${selected 
            ? 'bg-green-500 border-green-600 text-white hover:bg-green-600 shadow-lg ring-2 ring-green-500 ring-offset-1 transform scale-105' 
            : recommended 
              ? 'border-green-400 text-green-700 hover:bg-green-50 hover:border-green-500' 
              : 'text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }
        `}
      >
        <span className="block text-xl font-bold">{count}</span>
        <span className="block text-[11px] sm:text-xs leading-tight">{t(labelKey)}</span>
        {recommended && <span className={`block text-[10px] sm:text-xs mt-0.5 ${selected ? 'text-green-100' : 'text-green-600'}`}>({t('step3.quotesWantedRecommended')})</span>}
      </Button>
    );
};

const Step2_DetailsAndContact = ({ formData, handleChange, handleSelectChange, handleCheckboxChange, handleRadioGroupChange, handleHowFoundChange, handleQuotesWantedChange, errors }) => {
  const { t } = useTranslation('newCustomerForm');
  const isMoveService = formData.service === 'umzug' && formData.umzugArt !== 'lagerung';

  const salutationOptions = [
    { value: 'herr', label: t('step3.salutationMr') },
    { value: 'frau', label: t('step3.salutationMs') },
  ];

  const preferredTimeOptions = [
    { value: 'morning', label: t('step3.timeOptionMorning') },
    { value: 'afternoon', label: t('step3.timeOptionAfternoon') },
    { value: 'evening', label: t('step3.timeOptionEvening') },
    { value: 'flexible_full_day', label: t('step3.timeOptionFlexibleDay') },
  ];

  const howFoundOptions = [
    { id: 'google', labelKey: 'step3.howFoundGoogle', icon: <Search size={16} className="text-gray-500" /> },
    { id: 'recommendation', labelKey: 'step3.howFoundRecommendation', icon: <Users size={16} className="text-gray-500" /> },
    { id: 'news', labelKey: 'step3.howFoundNews', icon: <FileText size={16} className="text-gray-500" /> },
    { id: 'social_media', labelKey: 'step3.howFoundSocialMedia', icon: <Users size={16} className="text-gray-500" /> },
  ];

  const quotesWantedOptions = [
    { count: '2', labelKey: 'step3.quotesWantedOptionPlural' },
    { count: '3', labelKey: 'step3.quotesWantedOptionPlural' },
    { count: '4', labelKey: 'step3.quotesWantedOptionPlural', recommended: true },
    { count: '5', labelKey: 'step3.quotesWantedOptionPlural' },
  ];

  const getDateLabelKey = () => {
    switch (formData.service) {
      case 'reinigung':
        return 'step3.cleaningDateLabel';
      case 'raeumung':
        return 'step3.disposalDateLabel';
      case 'maler':
        return 'step3.painterDateLabel';
      default:
        return 'step3.moveDateLabel';
    }
  };

  const getDateTitleKey = () => {
    switch (formData.service) {
      case 'reinigung':
        return 'step3.cleaningDateTitle';
      case 'raeumung':
        return 'step3.disposalDateTitle';
      case 'maler':
        return 'step3.painterDateTitle';
      default:
        return 'step3.moveDateTitle';
    }
  };

  const getAdditionalInfoPlaceholder = () => {
    if (formData.service === 'reinigung') {
      return t('step3.additionalInfoPlaceholderCleaning');
    }
    return t('step3.additionalInfoPlaceholder');
  };

  const showCompanyNameField = 
    (formData.service === 'umzug' && formData.umzugArt === 'geschaeftsumzug') ||
    (formData.service === 'reinigung' && ['buero', 'unterhaltsreinigung', 'grundreinigung', 'baureinigung', 'fassadenreinigung'].includes(formData.umzugArt)) ||
    (formData.service === 'maler' && formData.umzugArt === 'maler_gewerbe') ||
    (formData.from_object_type === 'gewerbeimmobilie');

  return (
    <div className="space-y-6">
      {/* Address Blocks - Side by Side (only for move service) */}
      {isMoveService ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AddressBlock type="from" formData={formData} handleChange={handleChange} handleSelectChange={handleSelectChange} errors={errors} t={t} isMoveService={isMoveService} />
          <AddressBlock type="to" formData={formData} handleChange={handleChange} handleSelectChange={handleSelectChange} errors={errors} t={t} isMoveService={isMoveService} />
        </div>
      ) : (
        <AddressBlock type="from" formData={formData} handleChange={handleChange} handleSelectChange={handleSelectChange} errors={errors} t={t} isMoveService={isMoveService} />
      )}
      
      {/* Contact Details and Date - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard icon={<UserCircle className="w-6 h-6 text-green-600" />} titleKey="step3.contactDetailsTitle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2 space-y-1">
              <Label className="font-medium text-slate-700 text-sm">{t('step3.salutationLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <RadioGroup name="salutation" value={formData.salutation || ''} onValueChange={(value) => handleRadioGroupChange('salutation', value)} className="flex items-center space-x-4 pt-1">
                {salutationOptions.map(opt => (
                  <div key={opt.value} className="flex items-center space-x-1.5">
                    <RadioGroupItem value={opt.value} id={`salutation_${opt.value}`} />
                    <Label htmlFor={`salutation_${opt.value}`} className="font-normal text-sm">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors && errors.salutation && <p className="text-xs text-red-500 mt-1">{errors.salutation}</p>}
            </div>
            
            
              {showCompanyNameField && (
                <div
                  className="space-y-1 md:col-span-2"
                >
                  <Label htmlFor="companyName" className="font-medium text-slate-700 text-sm">{t('step3.companyNameLabel')}</Label>
                  <Input id="companyName" name="companyName" value={formData.companyName || ''} onChange={handleChange} placeholder={t('step3.companyNamePlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9"/>
                </div>
              )}
            

            <div className="space-y-1">
              <Label htmlFor="firstName" className="font-medium text-slate-700 text-sm">{t('step3.firstNameLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <Input id="firstName" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder={t('step3.firstNamePlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9"/>
              {errors && errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName" className="font-medium text-slate-700 text-sm">{t('step3.lastNameLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <Input id="lastName" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder={t('step3.lastNamePlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9"/>
              {errors && errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="font-medium text-slate-700 text-sm">{t('step3.emailLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <Input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder={t('step3.emailPlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9"/>
              {errors && errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone" className="font-medium text-slate-700 text-sm">{t('step3.phoneLabel')} <span className="text-red-500 ml-1">*</span></Label>
              <Input type="tel" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder={t('step3.phonePlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9"/>
              {errors && errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>
        </SectionCard>
        
        <SectionCard icon={<CalendarDays className="w-6 h-6 text-green-600" />} titleKey={getDateTitleKey()} descriptionKey="step3.moveDateDescription">
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="move_date" className="font-medium text-slate-700 text-sm">{t(getDateLabelKey())} <span className="text-red-500 ml-1">*</span></Label>
              <Input type="date" id="move_date" name="move_date" value={formData.move_date || ''} onChange={handleChange} className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9" min={new Date().toISOString().split("T")[0]}/>
              {errors && errors.move_date && <p className="text-xs text-red-500 mt-1">{errors.move_date}</p>}
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="move_date_flexible" name="move_date_flexible" checked={formData.move_date_flexible || false} onCheckedChange={(checked) => handleCheckboxChange('move_date_flexible', checked)} className="h-4 w-4 accent-green-600"/>
                <Label htmlFor="move_date_flexible" className="font-normal text-sm text-slate-600">{t('step3.dateFlexibleLabel')}</Label>
            </div>
            <div className="space-y-1">
                <Label htmlFor="preferred_time" className="font-medium text-slate-700 text-sm">{t('step3.preferredTimeLabel')}</Label>
                <Select name="preferred_time" value={formData.preferred_time || ''} onValueChange={(value) => handleSelectChange('preferred_time', value)}>
                <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm h-9">
                    <SelectValue placeholder={t('step3.preferredTimePlaceholder')} />
                </SelectTrigger>
                <SelectContent className="text-sm">
                    {preferredTimeOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm">{option.label}</SelectItem>)}
                </SelectContent>
                </Select>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Additional Info - Full Width Below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard icon={<Info className="w-6 h-6 text-green-600" />} titleKey="step3.additionalOptionsTitle" descriptionKey="step3.additionalOptionsDescription">
          <div className="space-y-3">
            {/* Klavier-Transport und Möbel De-/Montage - vorübergehend ausgeblendet */}
            {/* { formData.service === 'umzug' && (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'international') && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox id="additional_piano" name="additional_piano" checked={formData.additional_piano || false} onCheckedChange={(checked) => handleCheckboxChange('additional_piano', checked)} className="h-4 w-4 accent-green-600"/>
                  <Label htmlFor="additional_piano" className="font-normal text-sm text-slate-700">{t('step3.additionalPianoLabel')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="furniture_assembly" name="furniture_assembly" checked={formData.furniture_assembly || false} onCheckedChange={(checked) => handleCheckboxChange('furniture_assembly', checked)} className="h-4 w-4 accent-green-600"/>
                  <Label htmlFor="furniture_assembly" className="font-normal text-sm text-slate-700">Möbel De-/Montage</Label>
                </div>
              </>
            )} */}
          </div>
          <div className="space-y-1 pt-3">
            <Label htmlFor="additional_info" className="font-medium text-slate-700 text-sm">{t('step3.additionalInfoLabel')}</Label>
            <Textarea id="additional_info" name="additional_info" value={formData.additional_info || ''} onChange={handleChange} placeholder={getAdditionalInfoPlaceholder()} className="bg-slate-50 border-slate-300 focus:bg-white min-h-[70px] text-sm"/>
          </div>
        </SectionCard>

        <SectionCard icon={<FileText className="w-6 h-6 text-green-600" />} titleKey="step3.quotesWantedTitle" descriptionKey="step3.quotesWantedDescription">
          <div className="grid grid-cols-4 gap-2">
              {quotesWantedOptions.map(opt => (
                  <QuotesWantedButton
                      key={opt.count}
                      count={opt.count}
                      labelKey={opt.labelKey}
                      recommended={opt.recommended}
                      selected={formData.quotes_wanted === opt.count}
                      onClick={handleQuotesWantedChange}
                  />
              ))}
          </div>
           {errors && errors.quotes_wanted && <p className="text-xs text-red-500 mt-1">{errors.quotes_wanted}</p>}
        </SectionCard>
      </div>

      {/* Datenschutz Checkbox */}
      <Card className="w-full bg-white shadow-md border-gray-200 rounded-lg overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="datenschutz" 
              name="datenschutz" 
              checked={formData.datenschutz || false} 
              onCheckedChange={(checked) => handleCheckboxChange('datenschutz', checked)} 
              className={`h-5 w-5 mt-0.5 ${errors && errors.datenschutz ? "border-red-500" : ""}`}
              required
            />
            <Label htmlFor="datenschutz" className="text-sm text-slate-700 leading-relaxed cursor-pointer flex-1">
              Ich akzeptiere die{' '}
              <Link href="/agb" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-green-600 hover:text-green-800 transition-colors">
                AGB
              </Link>
              {' '}und die{' '}
              <Link href="/datenschutz" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-green-600 hover:text-green-800 transition-colors">
                Datenschutzerklärung
              </Link>
              .
            </Label>
          </div>
          {errors && errors.datenschutz && (
            <p className="text-sm text-red-500 mt-2">{errors.datenschutz}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Step2_DetailsAndContact;