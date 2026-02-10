import React, { useRef, useEffect } from 'react';
// framer-motion removed – CSS transitions for better INP
import { Home, Sparkles, Recycle, Briefcase, ShieldQuestion, Pencil as Piano, VenetianMask, Weight, CheckCircle2, Globe, Truck, Building2, Paintbrush, Bath, Utensils as CookingPot, BedDouble, StepBack as Stairs, Square, Box, Layers, Grid, ChevronDown, Trash2, Archive, ArrowUpDown, ArrowRight } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi'; 
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ServiceButton = ({ id, labelKey, subLabelKey, icon, selected, onClick }) => {
  const { t } = useTranslation('newCustomerForm');
  
  // Her servis için renk ve icon ayarları
  const serviceConfig = {
    umzug: {
      iconBg: 'bg-blue-100',
      iconBgSelected: 'bg-blue-500',
      iconColor: 'text-blue-600',
      iconColorSelected: 'text-white',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50'
    },
    reinigung: {
      iconBg: 'bg-purple-100',
      iconBgSelected: 'bg-purple-500',
      iconColor: 'text-purple-600',
      iconColorSelected: 'text-white',
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-50'
    },
    maler: {
      iconBg: 'bg-amber-100',
      iconBgSelected: 'bg-amber-500',
      iconColor: 'text-amber-600',
      iconColorSelected: 'text-white',
      borderColor: 'border-amber-500',
      bgColor: 'bg-amber-50'
    },
    raeumung: {
      iconBg: 'bg-emerald-100',
      iconBgSelected: 'bg-emerald-500',
      iconColor: 'text-emerald-600',
      iconColorSelected: 'text-white',
      borderColor: 'border-emerald-500',
      bgColor: 'bg-emerald-50'
    },
  };
  
  const config = serviceConfig[id] || {
    iconBg: 'bg-gray-100',
    iconBgSelected: 'bg-gray-500',
    iconColor: 'text-gray-600',
    iconColorSelected: 'text-white',
    borderColor: 'border-gray-500',
    bgColor: 'bg-gray-50'
  };
  
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-4 p-4 sm:p-5 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
        ${selected 
          ? `${config.bgColor} ${config.borderColor} shadow-lg` 
          : 'bg-white border-gray-200 hover:border-green-400 hover:bg-green-50'
        }`}
    >
      {/* Icon Container */}
      <div className={`
        w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-colors flex-shrink-0
        ${selected ? config.iconBgSelected : config.iconBg}
      `}>
        {icon && React.cloneElement(icon, {
          className: `w-7 h-7 sm:w-8 sm:h-8 ${selected ? config.iconColorSelected : config.iconColor}`
        })}
      </div>
      
      {/* Content */}
      <div className="flex-1 text-left">
        <p className={`
          font-semibold text-base sm:text-lg transition-colors
          ${selected ? 'text-gray-900' : 'text-gray-900'}
        `}>
          {t(labelKey)}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">{t(subLabelKey)}</p>
      </div>
      
      {/* Selected Indicator */}
      {selected ? (
        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
      ) : (
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      )}
    </button>
  );
};

const UmzugArtButton = ({ id, labelKey, subLabelKey, icon, selected, onClick }) => {
  const { t } = useTranslation('newCustomerForm');
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`w-full p-2.5 sm:p-3 border-2 rounded-lg text-left transition-all duration-200 ease-in-out transform hover:-translate-y-0.5
        ${selected 
          ? 'bg-teal-50 border-teal-500 shadow-md ring-1 ring-teal-500' 
          : 'bg-white border-gray-200 hover:border-teal-400'
        }`}
    >
      <div className="flex items-center mb-0.5 sm:mb-1">
        {icon && (
          <span className={`mr-1.5 sm:mr-2 p-1 sm:p-1.5 rounded-md ${selected ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'}`}>
            {icon}
          </span>
        )}
        <span className={`font-medium text-sm md:text-base ${selected ? 'text-teal-700' : 'text-gray-700'}`}>{t(labelKey)}</span>
      </div>
      <p className={`text-xs sm:text-sm ${selected ? 'text-teal-600' : 'text-gray-500'}`}>{t(subLabelKey)}</p>
    </button>
  );
};

const GeneralCleaningDetails = ({ formData, handleCheckboxChange, handleRadioGroupChange, errors }) => {
    const { t } = useTranslation('newCustomerForm');
    const whatToCleanOptions = [
        { id: 'bathroom', labelKey: 'step1.whatToClean.bathroom', icon: <Bath className="w-5 h-5 text-gray-600" /> },
        { id: 'kitchen', labelKey: 'step1.whatToClean.kitchen', icon: <CookingPot className="w-5 h-5 text-gray-600" /> },
        { id: 'living_sleeping', labelKey: 'step1.whatToClean.living_sleeping', icon: <BedDouble className="w-5 h-5 text-gray-600" /> },
        { id: 'hallway_stairs', labelKey: 'step1.whatToClean.hallway_stairs', icon: <Stairs className="w-5 h-5 text-gray-600" /> },
    ];
    const areaOptions = ['bis_50', '50_100', '100_150', 'ueber_150'];

    return (
        <div className="space-y-4">
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.whatToClean.title')} <span className="text-red-500">*</span></h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {whatToCleanOptions.map(option => (
                        <div key={option.id} className={`p-3 border-2 rounded-lg transition-all duration-200 ease-in-out ${formData.what_to_clean?.[option.id] ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <div className="flex items-center">
                                <Checkbox
                                    id={`what_to_clean_${option.id}`}
                                    name={`what_to_clean.${option.id}`}
                                    checked={formData.what_to_clean?.[option.id] || false}
                                    onCheckedChange={(checked) => handleCheckboxChange(`what_to_clean.${option.id}`, checked)}
                                    className="h-5 w-5 mr-3"
                                />
                                <Label htmlFor={`what_to_clean_${option.id}`} className="flex-grow cursor-pointer font-normal text-sm sm:text-base text-gray-800 flex items-center gap-2">
                                    {option.icon} {t(option.labelKey)}
                                </Label>
                            </div>
                        </div>
                    ))}
                </div>
                {errors && errors.what_to_clean && <p className="text-sm text-red-500 mt-1.5">{errors.what_to_clean}</p>}
            </div>
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.estimatedArea.title')} <span className="text-red-500">*</span></h5>
                <RadioGroup
                    name="estimated_area"
                    value={formData.estimated_area || ''}
                    onValueChange={(value) => handleRadioGroupChange('estimated_area', value)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                    {areaOptions.map(option => (
                        <Label 
                            key={option}
                            htmlFor={`area_${option}`}
                            className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3
                                ${formData.estimated_area === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`
                            }
                        >
                            <RadioGroupItem value={option} id={`area_${option}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm sm:text-base text-gray-800">{t(`step1.estimatedArea.${option}`)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors && errors.estimated_area && <p className="text-sm text-red-500 mt-2">{errors.estimated_area}</p>}
            </div>
        </div>
    );
};

const FloorCleaningDetails = ({ formData, handleCheckboxChange, handleRadioGroupChange, errors }) => {
    const { t } = useTranslation('newCustomerForm');
    const floorTypeOptions = [
        { id: 'carpet', labelKey: 'step1.floorTypes.carpet', icon: <Square className="w-5 h-5 text-gray-600" /> },
        { id: 'parquet_laminate', labelKey: 'step1.floorTypes.parquet_laminate', icon: <Layers className="w-5 h-5 text-gray-600" /> },
        { id: 'tiles', labelKey: 'step1.floorTypes.tiles', icon: <Grid className="w-5 h-5 text-gray-600" /> },
        { id: 'vinyl', labelKey: 'step1.floorTypes.vinyl', icon: <Box className="w-5 h-5 text-gray-600" /> },
    ];
    const areaOptions = ['bis_50', '50_100', '100_150', 'ueber_150'];

    return (
        <div className="space-y-4">
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.floorTypes.title')} <span className="text-red-500">*</span></h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {floorTypeOptions.map(option => (
                        <div key={option.id} className={`p-3 border-2 rounded-lg transition-all duration-200 ease-in-out ${formData.floor_types?.[option.id] ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <div className="flex items-center">
                                <Checkbox
                                    id={`floor_type_${option.id}`}
                                    name={`floor_types.${option.id}`}
                                    checked={formData.floor_types?.[option.id] || false}
                                    onCheckedChange={(checked) => handleCheckboxChange(`floor_types.${option.id}`, checked)}
                                    className="h-5 w-5 mr-3"
                                />
                                <Label htmlFor={`floor_type_${option.id}`} className="flex-grow cursor-pointer font-normal text-sm sm:text-base text-gray-800 flex items-center gap-2">
                                    {option.icon} {t(option.labelKey)}
                                </Label>
                            </div>
                        </div>
                    ))}
                </div>
                {errors && errors.floor_types && <p className="text-sm text-red-500 mt-1.5">{errors.floor_types}</p>}
            </div>
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.estimatedArea.title')} <span className="text-red-500">*</span></h5>
                <RadioGroup
                    name="floor_area"
                    value={formData.floor_area || ''}
                    onValueChange={(value) => handleRadioGroupChange('floor_area', value)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                    {areaOptions.map(option => (
                        <Label 
                            key={option}
                            htmlFor={`floor_area_${option}`}
                            className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3
                                ${formData.floor_area === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`
                            }
                        >
                            <RadioGroupItem value={option} id={`floor_area_${option}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm sm:text-base text-gray-800">{t(`step1.estimatedArea.${option}`)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors && errors.floor_area && <p className="text-sm text-red-500 mt-2">{errors.floor_area}</p>}
            </div>
        </div>
    );
};

const FassadenreinigungDetails = ({ formData, handleRadioGroupChange, handleCheckboxChange, errors }) => {
    const { t } = useTranslation('newCustomerForm');
    const flaecheOptions = ['bis_50', '50_100', '100_200', '200_500', 'ueber_500'];
    const erreichbarkeitOptions = ['einfach', 'mittel', 'schwierig'];
    const verschmutzungOptions = [
        { id: 'staub_leichter_schmutz', labelKey: 'step1.fassadenreinigung.verschmutzung.staub_leichter_schmutz' },
        { id: 'algen_gruenbelag', labelKey: 'step1.fassadenreinigung.verschmutzung.algen_gruenbelag' },
        { id: 'graffitis_farbrueckstaende', labelKey: 'step1.fassadenreinigung.verschmutzung.graffitis_farbrueckstaende' },
        { id: 'vogelkot_hartnaeckiger_schmutz', labelKey: 'step1.fassadenreinigung.verschmutzung.vogelkot_hartnaeckiger_schmutz' },
    ];

    return (
        <div className="space-y-4">
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.fassadenreinigung.flaeche.title')} <span className="text-red-500">*</span></h5>
                <RadioGroup
                    name="fassadenreinigung_flaeche"
                    value={formData.fassadenreinigung_flaeche || ''}
                    onValueChange={(value) => handleRadioGroupChange('fassadenreinigung_flaeche', value)}
                    className="grid grid-cols-2 gap-2"
                >
                    {flaecheOptions.map(option => (
                        <Label key={option} htmlFor={`flaeche_${option}`} className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3 ${formData.fassadenreinigung_flaeche === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <RadioGroupItem value={option} id={`flaeche_${option}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm text-gray-800">{t(`step1.fassadenreinigung.flaeche.${option}`)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors.fassadenreinigung_flaeche && <p className="text-sm text-red-500 mt-2">{errors.fassadenreinigung_flaeche}</p>}
            </div>
             <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.fassadenreinigung.erreichbarkeit.title')} <span className="text-red-500">*</span></h5>
                <RadioGroup
                    name="fassadenreinigung_erreichbarkeit"
                    value={formData.fassadenreinigung_erreichbarkeit || ''}
                    onValueChange={(value) => handleRadioGroupChange('fassadenreinigung_erreichbarkeit', value)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                >
                    {erreichbarkeitOptions.map(option => (
                        <Label key={option} htmlFor={`erreichbarkeit_${option}`} className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3 ${formData.fassadenreinigung_erreichbarkeit === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <RadioGroupItem value={option} id={`erreichbarkeit_${option}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm text-gray-800">{t(`step1.fassadenreinigung.erreichbarkeit.${option}`)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors.fassadenreinigung_erreichbarkeit && <p className="text-sm text-red-500 mt-2">{errors.fassadenreinigung_erreichbarkeit}</p>}
            </div>
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.fassadenreinigung.verschmutzung.title')} <span className="text-red-500">*</span></h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {verschmutzungOptions.map(option => (
                        <div key={option.id} className={`p-3 border-2 rounded-lg transition-all duration-200 ease-in-out ${formData.fassadenreinigung_verschmutzung?.[option.id] ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <div className="flex items-center">
                                <Checkbox
                                    id={`verschmutzung_${option.id}`}
                                    name={`fassadenreinigung_verschmutzung.${option.id}`}
                                    checked={formData.fassadenreinigung_verschmutzung?.[option.id] || false}
                                    onCheckedChange={(checked) => handleCheckboxChange(`fassadenreinigung_verschmutzung.${option.id}`, checked)}
                                    className="h-5 w-5 mr-3"
                                />
                                <Label htmlFor={`verschmutzung_${option.id}`} className="flex-grow cursor-pointer font-normal text-sm text-gray-800">{t(option.labelKey)}</Label>
                            </div>
                        </div>
                    ))}
                </div>
                {errors.fassadenreinigung_verschmutzung && <p className="text-sm text-red-500 mt-1.5">{errors.fassadenreinigung_verschmutzung}</p>}
            </div>
        </div>
    );
};

const FensterreinigungDetails = ({ formData, handleRadioGroupChange, errors }) => {
    const { t } = useTranslation('newCustomerForm');
    const anzahlOptions = ['1_5', '6_10', '11_20', '21_30', '30_plus'];
    const scopeOptions = ['nur_innenseiten', 'nur_aussenseiten', 'innen_aussen'];
    const zugangOptions = ['einfach', 'aussen_leiter', 'hoehenarbeit', 'spezialgeraet'];

    return (
        <div className="space-y-4">
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.fensterreinigung.anzahl.title')} <span className="text-red-500">*</span></h5>
                <RadioGroup name="fensterreinigung_anzahl" value={formData.fensterreinigung_anzahl || ''} onValueChange={(value) => handleRadioGroupChange('fensterreinigung_anzahl', value)} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {anzahlOptions.map(option => (
                        <Label key={option} htmlFor={`anzahl_${option}`} className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3 ${formData.fensterreinigung_anzahl === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <RadioGroupItem value={option} id={`anzahl_${option}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm text-gray-800">{t(`step1.fensterreinigung.anzahl.${option}`)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors.fensterreinigung_anzahl && <p className="text-sm text-red-500 mt-2">{errors.fensterreinigung_anzahl}</p>}
            </div>
            <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.fensterreinigung.scope.title')} <span className="text-red-500">*</span></h5>
                <RadioGroup name="fensterreinigung_scope" value={formData.fensterreinigung_scope || ''} onValueChange={(value) => handleRadioGroupChange('fensterreinigung_scope', value)} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {scopeOptions.map(option => (
                        <Label key={option} htmlFor={`scope_${option}`} className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3 ${formData.fensterreinigung_scope === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <RadioGroupItem value={option} id={`scope_${option}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm text-gray-800">{t(`step1.fensterreinigung.scope.${option}`)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors.fensterreinigung_scope && <p className="text-sm text-red-500 mt-2">{errors.fensterreinigung_scope}</p>}
            </div>
             <div>
                <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.fensterreinigung.zugang.title')} <span className="text-red-500">*</span></h5>
                <RadioGroup name="fensterreinigung_zugang" value={formData.fensterreinigung_zugang || ''} onValueChange={(value) => handleRadioGroupChange('fensterreinigung_zugang', value)} className="grid grid-cols-2 gap-2">
                    {zugangOptions.map(option => (
                        <Label key={option} htmlFor={`zugang_${option}`} className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3 ${formData.fensterreinigung_zugang === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                            <RadioGroupItem value={option} id={`zugang_${option}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm text-gray-800">{t(`step1.fensterreinigung.zugang.${option}`)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors.fensterreinigung_zugang && <p className="text-sm text-red-500 mt-2">{errors.fensterreinigung_zugang}</p>}
            </div>
        </div>
    );
};


const CleaningSubQuestions = ({ formData, handleRadioGroupChange, handleCheckboxChange, errors, subQuestionsRef }) => {
    const { t } = useTranslation('newCustomerForm');
    const cleaningFrequencyOptions = ['einmalig', 'woechentlich', 'zweiwoechig', 'monatlich'];
    const showGeneralCleaningDetails = false; // Bu sorular artık gösterilmeyecek
    const showFloorCleaningDetails = formData.umzugArt === 'bodenreinigung';
    const showFrequencyDetails = formData.umzugArt === 'unterhaltsreinigung';
    const showFassadenreinigungDetails = formData.umzugArt === 'fassadenreinigung';
    const showFensterreinigungDetails = formData.umzugArt === 'fensterreinigung';

    const showContainer = showGeneralCleaningDetails || showFloorCleaningDetails || showFrequencyDetails || showFassadenreinigungDetails || showFensterreinigungDetails;
    if (!showContainer) return null;

    return (
        <div
            ref={subQuestionsRef}
            className="p-4 sm:p-5 border-2 border-green-200 rounded-lg bg-green-50/70 shadow-md"
        >
            <div className="flex items-center mb-3">
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3" />
                <h4 className="text-base sm:text-lg font-semibold text-green-800">
                    {t('step1.additionalDetailsTitle')}
                </h4>
            </div>

            
                {showFrequencyDetails && (
                    <div
                        key="frequency"
                    >
                        <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t('step1.cleaningFrequency.title')} <span className="text-red-500">*</span></h5>
                        <RadioGroup
                            name="cleaning_frequency"
                            value={formData.cleaning_frequency || ''}
                            onValueChange={(value) => handleRadioGroupChange('cleaning_frequency', value)}
                            className="grid grid-cols-2 gap-2"
                        >
                            {cleaningFrequencyOptions.map(option => (
                                <Label 
                                    key={option}
                                    htmlFor={`freq_${option}`}
                                    className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3
                                        ${formData.cleaning_frequency === option ? 'bg-green-100 border-green-400 shadow-sm' : 'bg-white border-gray-200 hover:border-green-300'}`
                                    }
                                >
                                    <RadioGroupItem value={option} id={`freq_${option}`} className="h-5 w-5 shrink-0" />
                                    <span className="font-normal text-sm sm:text-base text-gray-800">{t(`step1.cleaningFrequency.${option}`)}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                        {errors && errors.cleaning_frequency && <p className="text-sm text-red-500 mt-2">{errors.cleaning_frequency}</p>}
                    </div>
                )}

                {showGeneralCleaningDetails && (
                    <div
                        key="general"
                    >
                        <GeneralCleaningDetails 
                            formData={formData}
                            handleCheckboxChange={handleCheckboxChange}
                            handleRadioGroupChange={handleRadioGroupChange}
                            errors={errors}
                        />
                    </div>
                )}
                
                {showFloorCleaningDetails && (
                    <div
                        key="floor"
                    >
                        <FloorCleaningDetails 
                            formData={formData}
                            handleCheckboxChange={handleCheckboxChange}
                            handleRadioGroupChange={handleRadioGroupChange}
                            errors={errors}
                        />
                    </div>
                )}

                {showFassadenreinigungDetails && (
                    <div
                        key="fassade"
                    >
                        <FassadenreinigungDetails 
                            formData={formData}
                            handleCheckboxChange={handleCheckboxChange}
                            handleRadioGroupChange={handleRadioGroupChange}
                            errors={errors}
                        />
                    </div>
                )}


                {showFensterreinigungDetails && (
                    <div
                        key="fenster"
                    >
                        <FensterreinigungDetails 
                            formData={formData}
                            handleRadioGroupChange={handleRadioGroupChange}
                            errors={errors}
                        />
                    </div>
                )}
            
        </div>
    );
};


const CleaningInfoBox = ({ formData, handleUmzugArtChange, errors }) => {
  const { t } = useTranslation('newCustomerForm');
  
  const cleaningGroups = {
    residential: ['wohnungsreinigung', 'hausreinigung', 'buero'],
    special: ['umzugsreinigung', 'unterhaltsreinigung', 'grundreinigung', 'baureinigung', 'fensterreinigung', 'bodenreinigung'],
    exterior: ['fassadenreinigung', 'hofreinigung']
  };

  return (
    <div
      className="mt-4 sm:mt-6 p-4 sm:p-5 border-2 border-green-400 rounded-lg bg-green-50 shadow-md"
    >
      <div className="flex items-center mb-2 sm:mb-3">
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3" />
        <h4 className="text-base sm:text-lg font-semibold text-green-700">
          {t('step1.cleaningTypeSelectionTitle')} <span className="text-red-500">*</span>
        </h4>
      </div>
      <RadioGroup 
        name="umzugArt" 
        value={formData.umzugArt || ''} 
        onValueChange={(value) => handleUmzugArtChange(value)} 
        className="space-y-4"
      >
        {Object.entries(cleaningGroups).map(([groupKey, options]) => (
          <div key={groupKey}>
            <h5 className="font-semibold text-gray-700 mb-2 text-sm">{t(`step1.cleaningGroups.${groupKey}`)}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {options.map(option => (
                <Label 
                  key={option}
                  htmlFor={`cleaning_${option}`}
                  className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3
                    ${formData.umzugArt === option ? 'bg-teal-50 border-teal-500 shadow-sm' : 'bg-white border-gray-200 hover:border-teal-300'}`
                  }
                >
                  <RadioGroupItem value={option} id={`cleaning_${option}`} className="h-5 w-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-normal text-sm sm:text-base text-gray-800">{t(`step1.cleaningOptions.${option}`)}</span>
                    {option === 'umzugsreinigung' && (
                        <span className="text-xs text-gray-500">{t(`step1.cleaningOptions.umzugsreinigung_sublabel`)}</span>
                    )}
                  </div>
                </Label>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup>
      {errors && errors.umzugArt && <p className="text-sm text-red-500 mt-2">{errors.umzugArt}</p>}
    </div>
  );
};


const WhatToPaintSection = ({ formData, handleCheckboxChange, handleChange, errors }) => {
    const { t } = useTranslation('newCustomerForm');
    const malerType = formData.umzugArt === 'maler_privat' ? 'privat' : 'gewerbe';

    const paintOptions = {
        privat: ['waende', 'zimmerdecke', 'tueren', 'fensterlaeden', 'heizkoerper', 'fussleisten', 'anderes'],
        gewerbe: ['innenanstrich', 'aussenanstrich', 'fassade', 'tueren', 'fensterlaeden', 'zimmerdecke', 'waende', 'anderes']
    };

    const currentOptions = paintOptions[malerType] || [];

    return (
        <div
            className="space-y-3 sm:space-y-4 pt-4 sm:pt-4 border-t border-gray-100"
        >
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{t('step1.whatToPaintTitle')} <span className="text-red-500">*</span></h3>
            <p className="text-sm sm:text-base text-gray-600 mb-2.5 sm:mb-3">{t('step1.whatToPaintSubtitle')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {currentOptions.map(option => (
                    <div key={option}>
                        <div className={`p-3 border-2 rounded-lg transition-all duration-200 ease-in-out ${formData.what_to_paint?.[option] ? 'bg-teal-50 border-teal-500 shadow-sm' : 'bg-white border-gray-200 hover:border-teal-400'}`}>
                            <div className="flex items-center">
                                <Checkbox
                                    id={`what_to_paint_${option}`}
                                    name={`what_to_paint.${option}`}
                                    checked={formData.what_to_paint?.[option] || false}
                                    onCheckedChange={(checked) => handleCheckboxChange(`what_to_paint.${option}`, checked)}
                                    className="h-5 w-5 mr-3"
                                />
                                <Label htmlFor={`what_to_paint_${option}`} className="flex-grow cursor-pointer font-normal text-sm sm:text-base text-gray-800">
                                    {t(`step1.whatToPaint.${malerType}.${option}`)}
                                </Label>
                            </div>
                        </div>
                        
                        {option === 'anderes' && formData.what_to_paint?.anderes && (
                            <div
                            >
                                <Input
                                    type="text"
                                    name="maler_details_other"
                                    value={formData.maler_details_other || ''}
                                    onChange={handleChange}
                                    placeholder={t('step1.whatToPaint.otherPlaceholder')}
                                    className="bg-slate-50 border-slate-300 focus:bg-white text-sm"
                                />
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
            {errors && errors.what_to_paint && <p className="text-sm text-red-500 mt-1.5 sm:mt-2">{errors.what_to_paint}</p>}
        </div>
    );
};

const MalerOptionalDetails = ({ formData, handleRadioGroupChange, errors }) => {
    const { t } = useTranslation('newCustomerForm');
    const conditionOptions = [
        { value: 'neubau', labelKey: 'step1.malerCurrentConditionOptions.neubau' },
        { value: 'vorgestrichen', labelKey: 'step1.malerCurrentConditionOptions.vorgestrichen' },
        { value: 'renovierungsbeduerftig', labelKey: 'step1.malerCurrentConditionOptions.renovierungsbeduerftig' }
    ];

    return (
        <div
            className="space-y-4 pt-4 border-t border-gray-100"
        >
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{t('step1.malerOptionalDetailsTitle')}</h3>
            <p className="text-sm text-gray-600 -mt-2 mb-3">{t('step1.malerOptionalDetailsSubtitle')}</p>

            <div>
                <Label className="font-medium text-sm text-gray-700 mb-2 block">{t('step1.malerCurrentConditionLabel')}</Label>
                <RadioGroup 
                    name="maler_current_condition" 
                    value={formData.maler_current_condition || ''} 
                    onValueChange={(value) => handleRadioGroupChange('maler_current_condition', value)} 
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
                >
                    {conditionOptions.map(opt => (
                        <Label 
                            key={opt.value}
                            htmlFor={`condition_${opt.value}`}
                            className={`p-3 border-2 rounded-lg transition-all cursor-pointer flex items-center gap-3
                                ${formData.maler_current_condition === opt.value ? 'bg-teal-50 border-teal-500 shadow-sm' : 'bg-white border-gray-200 hover:border-teal-300'}`
                            }
                        >
                            <RadioGroupItem value={opt.value} id={`condition_${opt.value}`} className="h-5 w-5 shrink-0" />
                            <span className="font-normal text-sm sm:text-base text-gray-800">{t(opt.labelKey)}</span>
                        </Label>
                    ))}
                </RadioGroup>
                {errors && errors.maler_current_condition && <p className="text-sm text-red-500 mt-1">{errors.maler_current_condition}</p>}
            </div>
        </div>
    );
};



const Step1_Service = ({ formData, handleServiceSelect, handleUmzugArtChange, handleRadioGroupChange, handleChange, handleCheckboxChange, handleSelectChange, errors, umzugArtSectionRef }) => {
  const { t } = useTranslation('newCustomerForm');
  const subQuestionsRef = useRef(null);

  useEffect(() => {
    if (subQuestionsRef.current) {
      setTimeout(() => {
        subQuestionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [formData.umzugArt]);

  const mainServices = [
    { id: 'umzug', labelKey: 'step1.mainServiceMove', subLabelKey: 'step1.mainServiceMoveSublabel', icon: <Truck /> },
    { id: 'reinigung', labelKey: 'step1.mainServiceCleaning', subLabelKey: 'step1.mainServiceCleaningSublabel', icon: <Sparkles /> },
    { id: 'maler', labelKey: 'step1.mainServicePainter', subLabelKey: 'step1.mainServicePainterSublabel', icon: <Paintbrush /> },
    { id: 'raeumung', labelKey: 'step1.mainServiceDisposal', subLabelKey: 'step1.mainServiceDisposalSublabel', icon: <Recycle /> },
  ];

  const umzugSubTypes = [
    { id: 'privatumzug', labelKey: 'step1.privateMoveLabel', subLabelKey: 'step1.privateMoveDescription', icon: <Home size={16} /> },
    { id: 'geschaeftsumzug', labelKey: 'step1.businessMoveLabel', subLabelKey: 'step1.businessMoveDescription', icon: <Briefcase size={16} /> },
    { id: 'international', labelKey: 'step1.internationalMoveLabel', subLabelKey: 'step1.internationalMoveDescription', icon: <Globe size={16} /> },
    { id: 'spezialtransport', labelKey: 'step1.specialTransportLabel', subLabelKey: 'step1.specialTransportDescription', icon: <Truck size={16} /> },
    { id: 'kleintransport', labelKey: 'step1.kleintransportLabel', subLabelKey: 'step1.kleintransportDescription', icon: <Truck size={16} /> },
    { id: 'moebellift', labelKey: 'step1.moebelliftLabel', subLabelKey: 'step1.moebelliftDescription', icon: <ArrowUpDown /> } // Added Möbellift
  ];

  const malerSubTypes = [
    { id: 'maler_privat', labelKey: 'step1.painterTypePrivateLabel', subLabelKey: 'step1.painterTypePrivateDescription', icon: <Home size={16} /> },
    { id: 'maler_gewerbe', labelKey: 'step1.painterTypeCommercialLabel', subLabelKey: 'step1.painterTypeCommercialDescription', icon: <Briefcase size={16} /> },
  ];

  const specialTransportOptions = [
    { value: 'klaviertransport', labelKey: 'step1.specialTransportTypePiano', icon: <PiPianoKeysFill size={16} className="mr-2 text-gray-600" /> },
    { value: 'tresortransport', labelKey: 'step1.specialTransportTypeSafe', icon: <ShieldQuestion size={16} className="mr-2 text-gray-600" /> },
    { value: 'maschinen_geraete', labelKey: 'step1.specialTransportTypeMachine', icon: <Weight size={16} className="mr-2 text-gray-600" /> },
    { value: 'sonstiges', labelKey: 'step1.specialTransportTypeOther', icon: <VenetianMask size={16} className="mr-2 text-gray-600" /> },
  ];

  const entsorgungSubTypes = [
    { id: 'raeumung', labelKey: 'step1.entsorgungTypeRaeumungLabel', subLabelKey: 'step1.entsorgungTypeRaeumungDescription', icon: <Archive size={16} /> },
    { id: 'entsorgung', labelKey: 'step1.entsorgungTypeEntsorgungLabel', subLabelKey: 'step1.entsorgungTypeEntsorgungDescription', icon: <Trash2 size={16} /> }
  ];

  const raeumungScopeOptions = [
    'komplette_raeumung', 'einzelne_raeume', 'keller_dachboden'
  ];
  
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1.5 sm:mb-2">{t('step1.mainServiceQuestion')} <span className="text-red-500">*</span></h2>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{t('step1.mainServiceDescription')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {mainServices.map((service) => (
            <ServiceButton 
              key={service.id}
              {...service}
              selected={formData.service === service.id}
              onClick={handleServiceSelect}
            />
          ))}
        </div>
        {errors && errors.service && <p className="text-sm text-red-500 mt-1.5 sm:mt-2">{errors.service}</p>}
      </div>
    </div>
  );
};

export default Step1_Service;