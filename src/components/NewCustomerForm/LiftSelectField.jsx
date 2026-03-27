import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

/**
 * Liste: „Ja“ / „Nein“. Geschlossenes Feld: „Lift vorhanden: Ja“ (step2.liftHeading).
 */
export default function LiftSelectField({
  prefix,
  formData,
  handleSelectChange,
  t,
  triggerClassName,
  contentClassName = 'text-sm',
}) {
  const lift = formData[`${prefix}_lift`];
  const strVal = lift === true ? 'true' : lift === false ? 'false' : '';

  return (
    <Select
      name={`${prefix}_lift`}
      value={strVal}
      onValueChange={(value) => handleSelectChange(`${prefix}_lift`, value === 'true')}
    >
      <SelectTrigger className={cn(triggerClassName)}>
        {typeof lift === 'boolean' ? (
          <span className="line-clamp-1 flex-1 truncate text-left">
            {t('step2.liftHeading')}: {lift ? t('step2.liftOptionYes') : t('step2.liftOptionNo')}
          </span>
        ) : (
          <SelectValue placeholder={t('step2.liftLabel')} />
        )}
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        <SelectItem value="true">{t('step2.liftOptionYes')}</SelectItem>
        <SelectItem value="false">{t('step2.liftOptionNo')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
