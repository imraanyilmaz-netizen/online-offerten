import Link from 'next/link';
import React from 'react';
import { useTranslation, Trans } from 'react-i18next'; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { UserCircle, CalendarDays, Info, Search, Users, FileText } from 'lucide-react';


const SectionCard = ({ icon, titleKey, descriptionKey, children }) => {
  const { t } = useTranslation('newCustomerForm');
  return (
    <Card className="w-full bg-white shadow-lg border-gray-200 rounded-xl overflow-hidden">
      <CardHeader className="bg-slate-50 p-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <CardTitle className="text-lg font-semibold text-slate-800">
              {t(titleKey)}
            </CardTitle>
            {descriptionKey && 
              <CardDescription className="text-sm sm:text-base text-slate-600 mt-0.5">
                {t(descriptionKey)}
              </CardDescription>
            }
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
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


const Step3_ContactFinalize = ({ formData, handleChange, handleSelectChange, handleCheckboxChange, handleRadioGroupChange, handleHowFoundChange, handleQuotesWantedChange, errors }) => {
  const { t } = useTranslation('newCustomerForm');

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

  return (
    <div className="space-y-6">
      <SectionCard icon={<UserCircle className="w-6 h-6 text-green-600" />} titleKey="step3.contactDetailsTitle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
          <div className="space-y-1">
            <Label className="font-medium text-slate-700 text-sm sm:text-base">{t('step3.salutationLabel')} <span className="text-red-500">*</span></Label>
            <RadioGroup name="salutation" value={formData.salutation || ''} onValueChange={(value) => handleRadioGroupChange('salutation', value)} className="flex items-center space-x-4 pt-1">
              {salutationOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-1.5">
                  <RadioGroupItem value={opt.value} id={`salutation_${opt.value}`} />
                  <Label htmlFor={`salutation_${opt.value}`} className="font-normal text-sm sm:text-base">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors && errors.salutation && <p className="text-sm text-red-500 mt-1">{errors.salutation}</p>}
          </div>
          <div></div>
          <div className="space-y-1">
            <Label htmlFor="firstName" className="font-medium text-slate-700 text-sm sm:text-base">{t('step3.firstNameLabel')} <span className="text-red-500">*</span></Label>
            <Input id="firstName" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder={t('step3.firstNamePlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"/>
            {errors && errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName" className="font-medium text-slate-700 text-sm sm:text-base">{t('step3.lastNameLabel')} <span className="text-red-500">*</span></Label>
            <Input id="lastName" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder={t('step3.lastNamePlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"/>
            {errors && errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="font-medium text-slate-700 text-sm sm:text-base">{t('step3.emailLabel')} <span className="text-red-500">*</span></Label>
            <Input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder={t('step3.emailPlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"/>
            {errors && errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone" className="font-medium text-slate-700 text-sm sm:text-base">{t('step3.phoneLabel')} <span className="text-red-500">*</span></Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder={t('step3.phonePlaceholder')} className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base"/>
            {errors && errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={<CalendarDays className="w-6 h-6 text-green-600" />} titleKey={getDateTitleKey()} descriptionKey="step3.moveDateDescription">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
            <div className="space-y-1">
              <Label htmlFor="move_date" className="font-medium text-slate-700 text-sm sm:text-base">{t(getDateLabelKey())} <span className="text-red-500">*</span></Label>
              <Input type="date" id="move_date" name="move_date" value={formData.move_date || ''} onChange={handleChange} className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base" min={new Date().toISOString().split("T")[0]}/>
              {errors && errors.move_date && <p className="text-sm text-red-500 mt-1">{errors.move_date}</p>}
            </div>
            <div className="flex items-end pb-1.5">
                <div className="flex items-center space-x-2">
                    <Checkbox id="move_date_flexible" name="move_date_flexible" checked={formData.move_date_flexible || false} onCheckedChange={(checked) => handleCheckboxChange('move_date_flexible', checked)} className="h-4 w-4 accent-green-600"/>
                    <Label htmlFor="move_date_flexible" className="font-normal text-sm sm:text-base text-slate-600 -mb-0.5">{t('step3.dateFlexibleLabel')}</Label>
                </div>
            </div>
        </div>
        <div className="space-y-1 pt-2">
            <Label htmlFor="preferred_time" className="font-medium text-slate-700 text-sm sm:text-base">{t('step3.preferredTimeLabel')}</Label>
            <Select name="preferred_time" value={formData.preferred_time || ''} onValueChange={(value) => handleSelectChange('preferred_time', value)}>
            <SelectTrigger className="bg-slate-50 border-slate-300 focus:bg-white text-sm sm:text-base">
                <SelectValue placeholder={t('step3.preferredTimePlaceholder')} />
            </SelectTrigger>
            <SelectContent className="text-sm sm:text-base">
                {preferredTimeOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm sm:text-base">{option.label}</SelectItem>)}
            </SelectContent>
            </Select>
        </div>
      </SectionCard>

      <SectionCard icon={<Info className="w-6 h-6 text-green-600" />} titleKey="step3.additionalOptionsTitle" descriptionKey="step3.additionalOptionsDescription">
        <div className="space-y-3">
            {/* Umzug: Zusätzliche Leistungen */}
            {formData.service === 'umzug' && (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'geschaeftsumzug' || formData.umzugArt === 'international') && (
              <>
                <p className="text-xs text-slate-500 mb-1">Wählen Sie bitte aus, falls zutreffend.</p>
                <div className="flex items-center space-x-2">
                  <Checkbox id="furniture_assembly_s3" name="furniture_assembly" checked={formData.furniture_assembly || false} onCheckedChange={(checked) => handleCheckboxChange('furniture_assembly', checked)} className="h-4 w-4"/>
                  <Label htmlFor="furniture_assembly_s3" className="font-normal text-sm sm:text-base text-slate-700">Möbel müssen demontiert und wieder montiert werden</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="additional_services_packing_s3" name="additional_services_packing" checked={formData.additional_services_packing || false} onCheckedChange={(checked) => handleCheckboxChange('additional_services_packing', checked)} className="h-4 w-4"/>
                  <Label htmlFor="additional_services_packing_s3" className="font-normal text-sm sm:text-base text-slate-700">Umzug mit Einpackservice</Label>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="special_transport_s3" name="special_transport" checked={formData.special_transport || false} onCheckedChange={(checked) => {
                      handleCheckboxChange('special_transport', checked);
                      if (!checked) {
                        handleCheckboxChange('special_transport_piano', false);
                        handleCheckboxChange('special_transport_safe', false);
                        handleCheckboxChange('special_transport_heavy', false);
                      }
                    }} className="h-4 w-4"/>
                    <Label htmlFor="special_transport_s3" className="font-normal text-sm sm:text-base text-slate-700">Spezialtransporte (z.B. Klavier, Tresor, schwere Möbel)</Label>
                  </div>
                  {formData.special_transport && (
                    <div className="ml-6 mt-2 space-y-1.5 pl-2 border-l-2 border-green-200">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="special_transport_piano_s3" checked={formData.special_transport_piano || false} onCheckedChange={(checked) => handleCheckboxChange('special_transport_piano', checked)} className="h-3.5 w-3.5"/>
                        <Label htmlFor="special_transport_piano_s3" className="font-normal text-sm text-slate-600">Klavier / Flügel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="special_transport_safe_s3" checked={formData.special_transport_safe || false} onCheckedChange={(checked) => handleCheckboxChange('special_transport_safe', checked)} className="h-3.5 w-3.5"/>
                        <Label htmlFor="special_transport_safe_s3" className="font-normal text-sm text-slate-600">Tresor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="special_transport_heavy_s3" checked={formData.special_transport_heavy || false} onCheckedChange={(checked) => handleCheckboxChange('special_transport_heavy', checked)} className="h-3.5 w-3.5"/>
                        <Label htmlFor="special_transport_heavy_s3" className="font-normal text-sm text-slate-600">Schwere Möbel / Geräte</Label>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="additional_services_disposal_s3" name="additional_services_disposal" checked={formData.additional_services_disposal || false} onCheckedChange={(checked) => handleCheckboxChange('additional_services_disposal', checked)} className="h-4 w-4"/>
                    <Label htmlFor="additional_services_disposal_s3" className="font-normal text-sm sm:text-base text-slate-700">Entsorgung von Möbeln / Gegenständen</Label>
                  </div>
                  <p className="ml-6 text-xs text-slate-400 mt-0.5">Sperrgut, das entsorgt werden soll</p>
                </div>
              </>
            )}

            {/* Reinigung: Wohnungsfläche, Art der Reinigung, Zusatzflächen */}
            {((formData.service === 'reinigung' && ['wohnungsreinigung', 'hausreinigung', 'grundreinigung', 'buero', 'umzugsreinigung'].includes(formData.umzugArt)) ||
              (formData.service === 'umzug' && formData.umzugArt === 'privatumzug' && formData.additional_cleaning)) && (
              <div className="space-y-4 pt-3 border-t border-gray-100">
                <h4 className="font-semibold text-sm sm:text-base text-slate-800">Angaben zur Reinigung</h4>
                {/* Wohnungsfläche */}
                <div className="space-y-1">
                  <Label htmlFor="cleaning_area_size_s3" className="font-medium text-slate-700 text-sm sm:text-base">Wohnungsfläche (ca.)</Label>
                  <select
                    id="cleaning_area_size_s3"
                    name="cleaning_area_size"
                    value={formData.cleaning_area_size || ''}
                    onChange={(e) => handleSelectChange('cleaning_area_size', e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm sm:text-base focus:bg-white focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="bis_40">bis 40 m²</option>
                    <option value="40_60">40 – 60 m²</option>
                    <option value="60_80">60 – 80 m²</option>
                    <option value="80_100">80 – 100 m²</option>
                    <option value="100_120">100 – 120 m²</option>
                    <option value="120_140">120 – 140 m²</option>
                    <option value="ueber_140">über 140 m²</option>
                  </select>
                </div>

                {/* Art der Reinigung - nur für Endreinigung */}
                {(formData.umzugArt === 'umzugsreinigung' || (formData.service === 'umzug' && formData.additional_cleaning)) && (
                  <div className="space-y-1">
                    <Label htmlFor="cleaning_type_s3" className="font-medium text-slate-700 text-sm sm:text-base">Art der Reinigung</Label>
                    <select
                      id="cleaning_type_s3"
                      name="cleaning_type"
                      value={formData.cleaning_type || ''}
                      onChange={(e) => handleSelectChange('cleaning_type', e.target.value)}
                      className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm sm:text-base focus:bg-white focus:border-green-500 focus:outline-none"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="mit_abnahmegarantie">Endreinigung mit Abnahmegarantie</option>
                      <option value="ohne_abnahmegarantie">Endreinigung ohne Abnahmegarantie</option>
                      <option value="umzugsreinigung">Umzugsreinigung</option>
                    </select>
                  </div>
                )}

                {/* Zusatzflächen */}
                <div className="space-y-1.5">
                  <Label className="font-medium text-slate-700 text-sm sm:text-base">Zusatzflächen <span className="text-gray-400 font-normal">(optional)</span></Label>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cleaning_extra_balkon_s3" checked={formData.cleaning_extra_balkon || false} onCheckedChange={(checked) => handleCheckboxChange('cleaning_extra_balkon', checked)} className="h-4 w-4"/>
                      <Label htmlFor="cleaning_extra_balkon_s3" className="font-normal text-sm sm:text-base text-slate-700">Balkon</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cleaning_extra_keller_s3" checked={formData.cleaning_extra_keller || false} onCheckedChange={(checked) => handleCheckboxChange('cleaning_extra_keller', checked)} className="h-4 w-4"/>
                      <Label htmlFor="cleaning_extra_keller_s3" className="font-normal text-sm sm:text-base text-slate-700">Keller</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cleaning_extra_garage_s3" checked={formData.cleaning_extra_garage || false} onCheckedChange={(checked) => handleCheckboxChange('cleaning_extra_garage', checked)} className="h-4 w-4"/>
                      <Label htmlFor="cleaning_extra_garage_s3" className="font-normal text-sm sm:text-base text-slate-700">Garage</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="space-y-1 pt-3">
            <Label htmlFor="additional_info" className="font-medium text-slate-700 text-sm sm:text-base">{t('step3.additionalInfoLabel')}</Label>
            <Textarea id="additional_info" name="additional_info" value={formData.additional_info || ''} onChange={handleChange} placeholder={getAdditionalInfoPlaceholder()} className="bg-slate-50 border-slate-300 focus:bg-white min-h-[90px] text-sm sm:text-base"/>
        </div>
      </SectionCard>
      
      {/* FileUpload component removed as requested */}

      {/* "Wie haben Sie uns gefunden?" - vorübergehend ausgeblendet */}
      {/* <SectionCard icon={<Search className="w-6 h-6 text-green-600" />} titleKey="step3.howFoundTitleOptional" descriptionKey="step3.howFoundDescriptionOptional">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {howFoundOptions.map(opt => (
                <HowFoundButton 
                    key={opt.id}
                    id={opt.id}
                    labelKey={opt.labelKey}
                    icon={opt.icon}
                    selected={formData.how_found === opt.id}
                    onClick={handleHowFoundChange}
                />
            ))}
        </div>
      </SectionCard> */}

      <SectionCard icon={<FileText className="w-6 h-6 text-green-600" />} titleKey="step3.quotesWantedTitle" descriptionKey="step3.quotesWantedDescription">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
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
         {errors && errors.quotes_wanted && <p className="text-sm text-red-500 mt-1">{errors.quotes_wanted}</p>}
      </SectionCard>
    </div>
  );
};

export default Step3_ContactFinalize;