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
            { formData.service === 'umzug' && (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'international') && (
                 <div className="flex items-center space-x-2">
                    <Checkbox id="additional_piano" name="additional_piano" checked={formData.additional_piano || false} onCheckedChange={(checked) => handleCheckboxChange('additional_piano', checked)} />
                    <Label htmlFor="additional_piano" className="font-normal text-sm sm:text-base text-slate-700">{t('step3.additionalPianoLabel')}</Label>
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