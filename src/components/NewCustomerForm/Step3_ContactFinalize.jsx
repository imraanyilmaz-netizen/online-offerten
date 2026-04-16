import Link from 'next/link';
import React from 'react';
import { useStaticT } from '@/lib/staticTranslate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { UserCircle, CalendarDays, Info, Search, Users, FileText } from 'lucide-react';
import { CLEANING_AREA_TYPES_WITH_FIELD } from '@/components/NewCustomerForm/cleaningAreaOptions';
import CleaningAreaSelect from '@/components/NewCustomerForm/CleaningAreaSelect';


const SectionCard = ({ icon, titleKey, descriptionKey, children }) => {
  const { t } = useStaticT('newCustomerForm');
  return (
    <Card className="w-full bg-white dark:bg-card shadow-lg border-gray-200 dark:border-border rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-50/70 via-emerald-50/40 to-slate-50 dark:from-emerald-950/40 dark:via-emerald-950/25 dark:to-muted/30 p-5 border-b border-emerald-100 dark:border-emerald-900/50">
        <div className="flex items-center gap-3">
          {React.cloneElement(icon, { className: 'w-6 h-6 text-green-600 dark:text-primary' })}
          <div>
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-foreground">
              {t(titleKey)}
            </CardTitle>
            {descriptionKey && 
              <CardDescription className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground mt-0.5">
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
    const { t } = useStaticT('newCustomerForm');
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => onClick(id)}
        className={`flex-1 justify-start text-left h-auto py-2.5 px-3
          ${selected ? 'bg-green-50 dark:bg-emerald-950/40 border-green-500 dark:border-emerald-500 text-green-700 dark:text-emerald-300 ring-1 ring-green-500 dark:ring-emerald-600' : 'text-gray-700 dark:text-foreground md:hover:bg-gray-50 dark:md:hover:bg-muted'}`}
      >
        {icon}
        <span className="ml-2 text-sm sm:text-base">{t(labelKey)}</span>
      </Button>
    );
};

const QuotesWantedButton = ({ count, labelKey, recommended, selected, onClick }) => {
    const { t } = useStaticT('newCustomerForm');
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => onClick(count)}
        className={`w-full h-auto py-2 px-1 flex flex-col items-center justify-center text-center transition-all duration-200
          ${selected 
            ? 'bg-green-500 dark:bg-primary border-green-600 dark:border-primary text-white md:hover:bg-green-600 dark:md:hover:bg-primary/90 shadow-lg ring-2 ring-green-500 dark:ring-primary ring-offset-1 dark:ring-offset-background transform scale-105' 
            : recommended 
              ? 'border-green-400 dark:border-emerald-600 text-green-700 dark:text-emerald-300 md:hover:bg-green-50 dark:md:hover:bg-emerald-950/30 md:hover:border-green-500 dark:md:hover:border-emerald-500' 
              : 'text-gray-700 dark:text-foreground md:hover:bg-gray-50 dark:md:hover:bg-muted md:hover:border-gray-400 dark:md:hover:border-border'
          }
        `}
      >
        <span className="block text-xl font-bold">{count}</span>
        <span className="block text-[11px] sm:text-xs leading-tight">{t(labelKey)}</span>
        {recommended && <span className={`block text-[10px] sm:text-xs mt-0.5 ${selected ? 'text-green-100 dark:text-emerald-200' : 'text-green-600 dark:text-primary'}`}>({t('step3.quotesWantedRecommended')})</span>}
      </Button>
    );
};


const Step3_ContactFinalize = ({ formData, handleChange, handleSelectChange, handleCheckboxChange, handleRadioGroupChange, handleHowFoundChange, handleQuotesWantedChange, errors }) => {
  const { t } = useStaticT('newCustomerForm');

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
    { id: 'google', labelKey: 'step3.howFoundGoogle', icon: <Search size={16} className="text-gray-500 dark:text-muted-foreground" /> },
    { id: 'recommendation', labelKey: 'step3.howFoundRecommendation', icon: <Users size={16} className="text-gray-500 dark:text-muted-foreground" /> },
    { id: 'news', labelKey: 'step3.howFoundNews', icon: <FileText size={16} className="text-gray-500 dark:text-muted-foreground" /> },
    { id: 'social_media', labelKey: 'step3.howFoundSocialMedia', icon: <Users size={16} className="text-gray-500 dark:text-muted-foreground" /> },
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
    if (formData.service === 'umzug') {
      return t('step3.additionalInfoPlaceholderMove');
    }
    return t('step3.additionalInfoPlaceholder');
  };

  return (
    <div className="space-y-6">
      <SectionCard icon={<UserCircle />} titleKey="step3.contactDetailsTitle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
          <div className="space-y-1">
            <Label className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t('step3.salutationLabel')} <span className="text-red-500">*</span></Label>
            <RadioGroup name="salutation" value={formData.salutation || ''} onValueChange={(value) => handleRadioGroupChange('salutation', value)} className="flex items-center space-x-4 pt-1">
              {salutationOptions.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`salutation_${opt.value}`} className="h-6 w-6" />
                  <Label htmlFor={`salutation_${opt.value}`} className="font-medium text-base text-slate-800 dark:text-foreground cursor-pointer">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors && errors.salutation && <p className="text-sm text-red-500 mt-1">{errors.salutation}</p>}
          </div>
          <div></div>
          <div className="space-y-1">
            <Label htmlFor="firstName" className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t('step3.firstNameLabel')} <span className="text-red-500">*</span></Label>
            <Input id="firstName" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder={t('step3.firstNamePlaceholder')} className="bg-slate-50 dark:bg-muted/50 border-slate-300 dark:border-border focus:bg-white dark:focus:bg-background text-sm sm:text-base"/>
            {errors && errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName" className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t('step3.lastNameLabel')} <span className="text-red-500">*</span></Label>
            <Input id="lastName" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder={t('step3.lastNamePlaceholder')} className="bg-slate-50 dark:bg-muted/50 border-slate-300 dark:border-border focus:bg-white dark:focus:bg-background text-sm sm:text-base"/>
            {errors && errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t('step3.emailLabel')} <span className="text-red-500">*</span></Label>
            <Input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder={t('step3.emailPlaceholder')} className="bg-slate-50 dark:bg-muted/50 border-slate-300 dark:border-border focus:bg-white dark:focus:bg-background text-sm sm:text-base"/>
            {errors && errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone" className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t('step3.phoneLabel')} <span className="text-red-500">*</span></Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} placeholder={t('step3.phonePlaceholder')} className="bg-slate-50 dark:bg-muted/50 border-slate-300 dark:border-border focus:bg-white dark:focus:bg-background text-sm sm:text-base"/>
            {errors && errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={<CalendarDays />} titleKey={getDateTitleKey()} descriptionKey="step3.moveDateDescription">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="move_date" className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t(getDateLabelKey())} <span className="text-red-500">*</span></Label>
            <Input type="date" id="move_date" name="move_date" value={formData.move_date || ''} onChange={handleChange} className="bg-slate-50 dark:bg-muted/50 border-slate-300 dark:border-border focus:bg-white dark:focus:bg-background text-sm sm:text-base" min={new Date().toISOString().split("T")[0]} lang="de-CH" placeholder="TT.MM.JJJJ" title="TT.MM.JJJJ"/>
            {errors && errors.move_date && <p className="text-sm text-red-500 mt-1">{errors.move_date}</p>}
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-slate-900 dark:text-foreground text-sm leading-snug">{t('step3.dateFlexibleQuestion')}</p>
            <RadioGroup
              name="move_date_flexible"
              value={formData.move_date_flexible ? 'yes' : 'no'}
              onValueChange={(v) => handleCheckboxChange('move_date_flexible', v === 'yes')}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="move_date_flexible_yes_s3" className="h-4 w-4" />
                <Label htmlFor="move_date_flexible_yes_s3" className="text-sm font-normal text-slate-700 dark:text-muted-foreground cursor-pointer leading-snug">{t('step3.dateFlexibleOptionYes')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="move_date_flexible_no_s3" className="h-4 w-4" />
                <Label htmlFor="move_date_flexible_no_s3" className="text-sm font-normal text-slate-700 dark:text-muted-foreground cursor-pointer leading-snug">{t('step3.dateFlexibleOptionNo')}</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-1">
            <Label htmlFor="preferred_time" className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t('step3.preferredTimeLabel')}</Label>
            <Select name="preferred_time" value={formData.preferred_time || ''} onValueChange={(value) => handleSelectChange('preferred_time', value)}>
              <SelectTrigger id="preferred_time" className="bg-slate-50 dark:bg-muted/50 border-slate-300 dark:border-border focus:bg-white dark:focus:bg-background text-sm sm:text-base w-full">
                <SelectValue placeholder={t('step3.preferredTimePlaceholder')} />
              </SelectTrigger>
              <SelectContent className="text-sm sm:text-base">
                {preferredTimeOptions.map(option => <SelectItem key={option.value} value={option.value} className="text-sm sm:text-base">{option.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={<Info />} titleKey="step3.additionalOptionsTitle">
        <div className="space-y-3">
            {formData.service === 'umzug' && formData.umzugArt === 'privatumzug' && !formData.additional_cleaning && (
              <CleaningAreaSelect
                id="cleaning_area_size_s3_standalone"
                value={formData.cleaning_area_size}
                onChange={(v) => handleSelectChange('cleaning_area_size', v)}
                error={errors?.cleaning_area_size}
                textSizeClassName="text-sm sm:text-base"
              />
            )}

            {((formData.service === 'reinigung' && CLEANING_AREA_TYPES_WITH_FIELD.includes(formData.umzugArt)) ||
              (formData.service === 'umzug' && formData.umzugArt === 'privatumzug' && formData.additional_cleaning)) && (
              <div className="space-y-4 pt-3 border-t border-gray-100 dark:border-border">
                <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-foreground">Angaben zur Reinigung</h4>
                <div>
                  <CleaningAreaSelect
                    id="cleaning_area_size_s3"
                    value={formData.cleaning_area_size}
                    onChange={(v) => handleSelectChange('cleaning_area_size', v)}
                    error={errors?.cleaning_area_size}
                    textSizeClassName="text-sm sm:text-base"
                  />
                </div>

                {(formData.umzugArt === 'umzugsreinigung' || (formData.service === 'umzug' && formData.additional_cleaning)) && (
                  <div>
                    <select
                      id="cleaning_type_s3"
                      name="cleaning_type"
                      value={formData.cleaning_type || ''}
                      onChange={(e) => handleSelectChange('cleaning_type', e.target.value)}
                      className="w-full rounded-md border border-slate-300 dark:border-border bg-slate-50 dark:bg-muted/50 px-3 py-2 text-sm sm:text-base focus:bg-white dark:focus:bg-background focus:border-green-500 dark:focus:border-primary focus:outline-none"
                    >
                      <option value="">Art der Reinigung *</option>
                      <option value="mit_abnahmegarantie">Endreinigung mit Abnahmegarantie</option>
                      <option value="ohne_abnahmegarantie">Endreinigung ohne Abnahmegarantie</option>
                    </select>
                    {errors && errors.cleaning_type && (
                      <p className="text-xs text-red-500 mt-1">{errors.cleaning_type}</p>
                    )}
                  </div>
                )}
              </div>
            )}
        </div>
        <div className={`space-y-1 ${(
          (formData.service === 'umzug' && formData.umzugArt === 'privatumzug' && !formData.additional_cleaning) ||
          (formData.service === 'reinigung' && CLEANING_AREA_TYPES_WITH_FIELD.includes(formData.umzugArt)) ||
          (formData.service === 'umzug' && formData.umzugArt === 'privatumzug' && formData.additional_cleaning)
        ) ? 'pt-3' : ''}`}>
            <Label htmlFor="additional_info" className="font-medium text-slate-700 dark:text-foreground text-sm sm:text-base">{t('step3.additionalInfoLabel')}</Label>
            <Textarea id="additional_info" name="additional_info" value={formData.additional_info || ''} onChange={handleChange} placeholder={getAdditionalInfoPlaceholder()} className="bg-slate-50 dark:bg-muted/50 border-slate-300 dark:border-border focus:bg-white dark:focus:bg-background min-h-[90px] text-sm sm:text-base"/>
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

      <SectionCard icon={<FileText />} titleKey="step3.quotesWantedTitle" descriptionKey="step3.quotesWantedDescription">
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
