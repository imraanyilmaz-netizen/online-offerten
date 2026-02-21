import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Building, Loader2, MapPin, ChevronsUpDown, Globe } from 'lucide-react';
import { getCityFromZip } from './newFormUtils';
import useAddressAutocomplete from '@/hooks/useAddressAutocomplete';
import { countries } from '@/data/countries';

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

  const detailedRoomOptions = [
    { value: '1_zimmer_wohnung', label: t('step2.roomsOption.1_zimmer_wohnung') },
    { value: '1.5_zimmer_wohnung', label: t('step2.roomsOption.1_5_zimmer_wohnung') },
    { value: '2_zimmer_wohnung', label: t('step2.roomsOption.2_zimmer_wohnung') },
    { value: '2.5_zimmer_wohnung', label: t('step2.roomsOption.2_5_zimmer_wohnung') },
    { value: '3_zimmer_wohnung', label: t('step2.roomsOption.3_zimmer_wohnung') },
    { value: '3.5_zimmer_wohnung', label: t('step2.roomsOption.3_5_zimmer_wohnung') },
    { value: '4_zimmer_wohnung', label: t('step2.roomsOption.4_zimmer_wohnung') },
    { value: '4.5_zimmer_wohnung', label: t('step2.roomsOption.4_5_zimmer_wohnung') },
    { value: '5_zimmer_wohnung', label: t('step2.roomsOption.5_zimmer_wohnung') },
    { value: '5.5_zimmer_wohnung', label: t('step2.roomsOption.5_5_zimmer_wohnung') },
    { value: '6_zimmer_wohnung', label: t('step2.roomsOption.6_zimmer_wohnung') },
    { value: '6.5_zimmer_wohnung', label: t('step2.roomsOption.6_5_zimmer_wohnung') },
    { value: '7_zimmer_wohnung', label: t('step2.roomsOption.7_zimmer_wohnung') },
    { value: '7.5_zimmer_wohnung', label: t('step2.roomsOption.7_5_zimmer_wohnung') },
    { value: '8_zimmer_wohnung', label: t('step2.roomsOption.8_zimmer_wohnung') },
    { value: '1_zimmer_einfamilienhaus', label: t('step2.roomsOption.1_zimmer_einfamilienhaus') },
    { value: '1.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.1_5_zimmer_einfamilienhaus') },
    { value: '2_zimmer_einfamilienhaus', label: t('step2.roomsOption.2_zimmer_einfamilienhaus') },
    { value: '2.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.2_5_zimmer_einfamilienhaus') },
    { value: '3_zimmer_einfamilienhaus', label: t('step2.roomsOption.3_zimmer_einfamilienhaus') },
    { value: '3.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.3_5_zimmer_einfamilienhaus') },
    { value: '4_zimmer_einfamilienhaus', label: t('step2.roomsOption.4_zimmer_einfamilienhaus') },
    { value: '4.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.4_5_zimmer_einfamilienhaus') },
    { value: '5_zimmer_einfamilienhaus', label: t('step2.roomsOption.5_zimmer_einfamilienhaus') },
    { value: '5.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.5_5_zimmer_einfamilienhaus') },
    { value: '6_zimmer_einfamilienhaus', label: t('step2.roomsOption.6_zimmer_einfamilienhaus') },
    { value: '6.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.6_5_zimmer_einfamilienhaus') },
    { value: '7_zimmer_einfamilienhaus', label: t('step2.roomsOption.7_zimmer_einfamilienhaus') },
    { value: '7.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.7_5_zimmer_einfamilienhaus') },
    { value: '8_zimmer_einfamilienhaus', label: t('step2.roomsOption.8_zimmer_einfamilienhaus') },
    { value: '8.5_zimmer_einfamilienhaus', label: t('step2.roomsOption.8_5_zimmer_einfamilienhaus') },
  ];
  
  const showRoomsField = 
    prefix === 'from' && (
      formData.service === 'reinigung' || 
      (formData.service === 'raeumung' && formData.umzugArt === 'raeumung_komplett') || 
      (formData.service === 'umzug' && (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'international'))
    );

  const currentRoomOptions = showRoomsField ? detailedRoomOptions : [];


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
    <div className="w-full space-y-5 p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="text-lg font-semibold text-slate-800">
          {t(titleKey)}
        </h3>
      </div>

      {isInternationalMove && (
          <div>
              <Select name={`${prefix}_country`} value={formData[`${prefix}_country`] || ''} onValueChange={(value) => handleSelectChange(`${prefix}_country`, value)}>
                  <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base">
                      <SelectValue placeholder={`${t('step2.countryLabel')} *`} />
                  </SelectTrigger>
                  <SelectContent className="text-sm sm:text-base">
                      {countries.map(country => <SelectItem key={country.code} value={country.code} className="text-sm sm:text-base">{country.name}</SelectItem>)}
                  </SelectContent>
              </Select>
              {errors && errors[`${prefix}_country`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_country`]}</p>}
          </div>
      )}
      
      <div className={!isMoveService ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "space-y-5"}>
        {/* Sol taraf: Adres alanları */}
        <div className="space-y-5">
          <div className="space-y-1 relative" ref={streetWrapperRef}>
            <Input
              id={`${prefix}_street_manual`}
              name={`${prefix}_street`}
              value={formData[`${prefix}_street`] || ''}
              onChange={handleStreetInputChange}
              onFocus={() => setIsStreetInputFocused(true)}
              placeholder={`${t('step2.streetLabel')} *`}
              className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"
              autoComplete={`section-${prefix} address-line1`}
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

          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="col-span-1 relative">
              <Input
                id={`${prefix}_zip_manual`}
                name={`${prefix}_zip`}
                value={formData[`${prefix}_zip`] || ''}
                onChange={handleZipChange}
                placeholder={`${t('step2.zipPlaceholder')} *`}
                className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"
                maxLength={10}
                autoComplete={`section-${prefix} postal-code`}
              />
              {isFetchingCity && <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />}
              {errors && errors[`${prefix}_zip`] && !errors[`${prefix}_street`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_zip`]}</p>}
            </div>
            <div className="col-span-2">
              <Input
                id={`${prefix}_city_manual`}
                name={`${prefix}_city`}
                value={formData[`${prefix}_city`] || ''}
                onChange={handleChange}
                placeholder={t('step2.cityPlaceholder')}
                className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"
                readOnly={isFetchingCity}
                autoComplete={`section-${prefix} address-level2`}
              />
              {errors && errors[`${prefix}_city`] && !errors[`${prefix}_street`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_city`]}</p>}
            </div>
          </div>
        </div>

        {/* Sağ taraf: Detay alanları */}
        <div className={isMoveService ? "grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 items-end" : "grid grid-cols-2 gap-3 items-start"}>
          <div>
            <Select name={`${prefix}_floor`} value={formData[`${prefix}_floor`] || ''} onValueChange={(value) => handleSelectChange(`${prefix}_floor`, value)}>
              <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base">
                <SelectValue placeholder={`${t('step2.floorLabel')} *`} />
              </SelectTrigger>
              <SelectContent className="text-sm sm:text-base">
                {floorOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm sm:text-base">{option.label}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors && errors[`${prefix}_floor`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_floor`]}</p>}
          </div>

          {showRoomsField && (
            <div>
              <Select name={`${prefix}_rooms`} value={formData[`${prefix}_rooms`] || ''} onValueChange={(value) => handleSelectChange(`${prefix}_rooms`, value)}>
                <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base">
                  <SelectValue placeholder={`${t('step2.roomsLabel')} *`} />
                </SelectTrigger>
                <SelectContent className="text-sm sm:text-base">
                  {currentRoomOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm sm:text-base">{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors && errors[`${prefix}_rooms`] && <p className="text-sm text-red-500 mt-1">{errors[`${prefix}_rooms`]}</p>}
            </div>
          )}

          <div>
            <Select name={`${prefix}_lift`} value={formData[`${prefix}_lift`] === true ? 'true' : formData[`${prefix}_lift`] === false ? 'false' : ''} onValueChange={(value) => handleSelectChange(`${prefix}_lift`, value === 'true')}>
              <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base">
                <SelectValue placeholder={t('step2.liftLabel')} />
              </SelectTrigger>
              <SelectContent className="text-sm sm:text-base">
                <SelectItem value="true">{t('step2.liftOptionYes')}</SelectItem>
                <SelectItem value="false">{t('step2.liftOptionNo')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
    </div>
  );
};

const Step2_AddressDate = ({ formData, handleChange, handleSelectChange, errors }) => {
  const { t } = useTranslation('newCustomerForm');
  const isMoveService = formData.service === 'umzug';

  return (
    <div className="space-y-8">
      <AddressBlock type="from" formData={formData} handleChange={handleChange} handleSelectChange={handleSelectChange} errors={errors} t={t} isMoveService={isMoveService} />
      {isMoveService && <AddressBlock type="to" formData={formData} handleChange={handleChange} handleSelectChange={handleSelectChange} errors={errors} t={t} isMoveService={isMoveService} />}
    </div>
  );
};

export default Step2_AddressDate;