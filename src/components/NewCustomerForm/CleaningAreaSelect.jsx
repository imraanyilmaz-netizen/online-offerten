import React from 'react';
import { cn } from '@/lib/utils';
import { CLEANING_AREA_SELECT_OPTIONS, getCleaningAreaSqmLabel } from '@/components/NewCustomerForm/cleaningAreaOptions';

/**
 * Liste: „60 m²“, „70 m²“ … Geschlossenes Feld: „Wohnungsfläche: 70 m²“.
 * optional extraOptions z. B. Legacy-Werte im Admin-Formular.
 */
export default function CleaningAreaSelect({
  id,
  name = 'cleaning_area_size',
  value,
  onChange,
  error,
  className,
  selectClassName,
  textSizeClassName = 'text-sm',
  placeholder = 'Wohnungsfläche (ca.) *',
  extraOptions = [],
}) {
  return (
    <div className={cn('space-y-1', className)}>
      <div
               className={cn(
          'relative rounded-md border border-slate-300 dark:border-border bg-slate-50 dark:bg-muted/50 focus-within:border-green-500 dark:focus-within:border-primary focus-within:bg-white dark:focus-within:bg-background',
          selectClassName,
        )}
      >
        <div className={cn('pointer-events-none flex min-h-[40px] items-center px-3 py-2', textSizeClassName)}>
          <span className={cn('truncate text-foreground', !value && 'text-slate-500 dark:text-muted-foreground')}>
            {value ? `Wohnungsfläche: ${getCleaningAreaSqmLabel(value)}` : placeholder}
          </span>
        </div>
        <select
          id={id}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full min-h-[40px] w-full cursor-pointer opacity-0"
          aria-label="Wohnungsfläche"
        >
          <option value="">{placeholder}</option>
          {CLEANING_AREA_SELECT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.listLabel}
            </option>
          ))}
          {extraOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.listLabel ?? opt.label}
            </option>
          ))}
        </select>
      </div>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
