import React, { useState } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Save, X } from 'lucide-react';
import { isMovingService, isCleaningService } from '@/lib/serviceCategorizer';
import { CLEANING_AREA_LEGACY_SELECT_OPTIONS } from '@/components/NewCustomerForm/cleaningAreaOptions';
import CleaningAreaSelect from '@/components/NewCustomerForm/CleaningAreaSelect';
import { normalizeFloorLabel } from '@/lib/utils';
import AddressInput from '@/components/PartnerRegistrationForm/AddressInput';

const FormField = ({ id, label, children }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-foreground">{label}</Label>
    <div className="mt-1">{children}</div>
  </div>
);

const Fieldset = ({ legend, children, className = "" }) => (
    <fieldset className={`border border-border rounded-md bg-card/60 dark:bg-muted/25 p-4 space-y-4 ${className}`}>
        <legend className="text-md font-semibold px-2 text-foreground">{legend}</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {children}
        </div>
    </fieldset>
);

const CheckboxField = ({ id, label, checked, onChange }) => (
    <div className="flex items-center pt-6 space-x-2">
        <Checkbox id={id} name={id} checked={checked} onCheckedChange={onChange} />
        <Label htmlFor={id}>{label}</Label>
    </div>
);

// Helper function to format strings for consistency
const formatString = (str) => {
  if (!str) return '';
  str = str.trim();
  if (str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatFloor = (str) => {
    if (!str) return '';
    const t = str.trim();
    if (!t) return '';
    const normalized = normalizeFloorLabel(t);
    if (normalized !== t) return normalized;
    return t.charAt(0).toUpperCase() + t.slice(1);
};


const QuoteEditForm = ({ quote, onSave, onCancel, isProcessing }) => {
  const [formData, setFormData] = useState(() => {
    // Initial formatting for existing quote data
    const initialData = { ...quote };
    if (initialData.from_object_type) initialData.from_object_type = formatString(initialData.from_object_type);
    if (initialData.to_object_type) initialData.to_object_type = formatString(initialData.to_object_type);
    if (initialData.from_floor) initialData.from_floor = formatFloor(initialData.from_floor);
    if (initialData.to_floor) initialData.to_floor = formatFloor(initialData.to_floor);
    return initialData;
  });
  
  const showMovingFields = isMovingService(formData.servicetype);
  /** Entspricht Kundenformular (Fläche, Art); Zusatzflächen-Boolean werden im Wizard nicht abgefragt → keine eigenen Felder hier */
  const showReinigungFields =
    isCleaningService(formData.servicetype) ||
    !!formData.additional_cleaning ||
    !!formData.additional_services_cleaning ||
    !!formData.cleaning_area_sqm ||
    !!(formData.cleaning_type_guarantee && String(formData.cleaning_type_guarantee).trim());

  /** Nur bei echtem Spezialtransport (Formular-Schritt) oder wenn DB-Felder schon befüllt sind */
  const servicetypeLower = (formData.servicetype || '').toLowerCase();
  const umzugartLower = String(formData.umzugart || '').toLowerCase();
  const showSpezialtransportFields =
    showMovingFields &&
    (servicetypeLower.includes('spezialtransport') ||
      servicetypeLower.includes('klaviertransport') ||
      servicetypeLower.includes('tresortransport') ||
      umzugartLower.includes('klaviertransport') ||
      umzugartLower.includes('spezial') ||
      !!formData.special_transport ||
      !!(formData.special_transport_type && String(formData.special_transport_type).trim()) ||
      !!(formData.special_transport_other_details && String(formData.special_transport_other_details).trim()));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (name === 'quoteswanted') {
        processedValue = value === '' ? null : parseInt(value, 10);
        if (isNaN(processedValue)) {
            processedValue = null;
        }
    } else if (name === 'from_object_type' || name === 'to_object_type') {
        processedValue = formatString(value);
    } else if (name === 'from_floor' || name === 'to_floor') {
        processedValue = formatFloor(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : processedValue }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' ? null : value }));
  }

  const handleSave = (e) => {
    e.preventDefault();
    onSave(quote.id, formData);
  };

  return (
    <div
      className="bg-slate-50 dark:bg-muted/30 border-t border-slate-200 dark:border-border overflow-hidden"
    >
      <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b pb-2">Anfrage bearbeiten</h3>
        
        <Fieldset legend="Kundenkontakt">
          <FormField id="salutation" label="Anrede"><Input name="salutation" value={formData.salutation || ''} onChange={handleChange} /></FormField>
          <FormField id="firstname" label="Vorname"><Input name="firstname" value={formData.firstname || ''} onChange={handleChange} /></FormField>
          <FormField id="lastname" label="Nachname"><Input name="lastname" value={formData.lastname || ''} onChange={handleChange} /></FormField>
          <FormField id="firmenname" label="Firma (optional)"><Input name="firmenname" value={formData.firmenname || ''} onChange={handleChange} /></FormField>
          <FormField id="email" label="E-Mail"><Input name="email" type="email" value={formData.email || ''} onChange={handleChange} /></FormField>
          <FormField id="phone" label="Telefon"><Input name="phone" value={formData.phone || ''} onChange={handleChange} /></FormField>
        </Fieldset>

        <Fieldset legend="Anfrage & Leistung">
          <div className="md:col-span-2 lg:col-span-4">
            <div className={`grid grid-cols-1 gap-4 ${showMovingFields ? 'md:grid-cols-2' : ''}`}>
              <FormField id="servicetype" label="Dienstleistung">
                <Input name="servicetype" value={formData.servicetype || ''} onChange={handleChange} className="text-sm" />
              </FormField>
              {showMovingFields && (
                <FormField id="umzugart" label="Umzugsart">
                  <Input name="umzugart" value={formData.umzugart || ''} onChange={handleChange} className="text-sm" />
                </FormField>
              )}
            </div>
          </div>
          <FormField id="quoteswanted" label="Gewünschte Offerten (Anzahl)"><Input name="quoteswanted" type="number" value={formData.quoteswanted ?? ''} onChange={handleChange} min={0} /></FormField>
          <FormField id="how_found" label="Wie gefunden?"><Input name="how_found" value={formData.how_found || ''} onChange={handleChange} /></FormField>
        </Fieldset>

        <Fieldset legend={showMovingFields ? "Auszugsadresse" : "Objektadresse"}>
            <FormField id="from_street" label="Strasse">
              <AddressInput
                inputId="from_street"
                value={formData.from_street || ''}
                onChange={(e) => handleChange({ target: { name: 'from_street', value: e.target.value } })}
                onSelect={(addr) => {
                  setFormData((prev) => ({
                    ...prev,
                    from_street: addr.street,
                    from_zip: addr.postcode,
                    from_city: addr.city,
                  }));
                }}
                countryCode={formData.from_country || 'CH'}
              />
            </FormField>
            <FormField id="from_zip" label="PLZ"><Input name="from_zip" value={formData.from_zip || ''} onChange={handleChange} /></FormField>
            <FormField id="from_city" label="Ort"><Input name="from_city" value={formData.from_city || ''} onChange={handleChange} /></FormField>
            <FormField id="from_country" label="Land"><Input name="from_country" value={formData.from_country || ''} onChange={handleChange} /></FormField>
            {showMovingFields && (
                <>
                    <FormField id="from_floor" label="Stockwerk"><Input name="from_floor" value={formData.from_floor || ''} onChange={handleChange} /></FormField>
                    <FormField id="from_rooms" label="Anzahl Zimmer"><Input name="from_rooms" value={formData.from_rooms || ''} onChange={handleChange} /></FormField>
                    <CheckboxField id="from_lift" label="Lift vorhanden" checked={formData.from_lift || false} onChange={(checked) => handleCheckboxChange('from_lift', checked)} />
                    <FormField id="from_object_type" label="Objektart"><Input name="from_object_type" value={formData.from_object_type || ''} onChange={handleChange} /></FormField>
                </>
            )}
        </Fieldset>
        
        {showMovingFields && (
            <Fieldset legend="Einzugsadresse">
                <FormField id="to_street" label="Strasse">
                  <AddressInput
                    inputId="to_street"
                    value={formData.to_street || ''}
                    onChange={(e) => handleChange({ target: { name: 'to_street', value: e.target.value } })}
                    onSelect={(addr) => {
                      setFormData((prev) => ({
                        ...prev,
                        to_street: addr.street,
                        to_zip: addr.postcode,
                        to_city: addr.city,
                      }));
                    }}
                    countryCode={formData.to_country || 'CH'}
                  />
                </FormField>
                <FormField id="to_zip" label="PLZ"><Input name="to_zip" value={formData.to_zip || ''} onChange={handleChange} /></FormField>
                <FormField id="to_city" label="Ort"><Input name="to_city" value={formData.to_city || ''} onChange={handleChange} /></FormField>
                <FormField id="to_country" label="Land"><Input name="to_country" value={formData.to_country || ''} onChange={handleChange} /></FormField>
                <FormField id="to_floor" label="Stockwerk"><Input name="to_floor" value={formData.to_floor || ''} onChange={handleChange} /></FormField>
                <CheckboxField id="to_lift" label="Lift vorhanden" checked={formData.to_lift || false} onChange={(checked) => handleCheckboxChange('to_lift', checked)} />
                <FormField id="to_object_type" label="Objektart"><Input name="to_object_type" value={formData.to_object_type || ''} onChange={handleChange} /></FormField>
            </Fieldset>
        )}
        
        <Fieldset legend="Termin & Erreichbarkeit">
            <FormField id="move_date" label="Wunschtermin"><Input type="date" name="move_date" value={formData.move_date ? formData.move_date.split('T')[0] : ''} onChange={handleDateChange} /></FormField>
            <FormField id="preferredtime" label="Telefonische Erreichbarkeit"><Input name="preferredtime" value={formData.preferredtime || ''} onChange={handleChange} placeholder="z. B. Vormittags, ab 17 Uhr …" /></FormField>
            <CheckboxField id="move_date_flexible" label="Datum flexibel?" checked={formData.move_date_flexible || false} onChange={(checked) => handleCheckboxChange('move_date_flexible', checked)} />
            {showMovingFields && (
              <CheckboxField id="additional_cleaning" label="Endreinigung zum Umzug gewünscht" checked={formData.additional_cleaning || false} onChange={(checked) => handleCheckboxChange('additional_cleaning', checked)} />
            )}
        </Fieldset>

        <Fieldset legend="Zusatzleistungen & Besonderheiten">
            <CheckboxField
              id="additional_services_piano"
              label="Klavier / Flügel vorhanden"
              checked={formData.additional_services_piano || false}
              onChange={(checked) => handleCheckboxChange('additional_services_piano', checked)}
            />
            <CheckboxField
              id="additional_services_furniture_assembly"
              label="Möbel De-/Montage"
              checked={formData.additional_services_furniture_assembly || false}
              onChange={(checked) => handleCheckboxChange('additional_services_furniture_assembly', checked)}
            />
            <CheckboxField
              id="additional_services_lamp_demontage"
              label="Lampen Demontage"
              checked={formData.additional_services_lamp_demontage || false}
              onChange={(checked) => handleCheckboxChange('additional_services_lamp_demontage', checked)}
            />
            <CheckboxField
              id="besichtigung_erwuenscht"
              label="Besichtigung erwünscht"
              checked={formData.besichtigung_erwuenscht || false}
              onChange={(checked) => handleCheckboxChange('besichtigung_erwuenscht', checked)}
            />
        </Fieldset>

        {showReinigungFields && (
        <Fieldset legend="Reinigung – Zusatzinfos">
            <FormField id="cleaning_area_sqm" label="Wohnungsfläche">
              <CleaningAreaSelect
                id="cleaning_area_sqm"
                name="cleaning_area_sqm"
                value={formData.cleaning_area_sqm}
                onChange={(v) => handleChange({ target: { name: 'cleaning_area_sqm', value: v } })}
                placeholder="—"
                extraOptions={CLEANING_AREA_LEGACY_SELECT_OPTIONS}
                selectClassName="border-input bg-background"
              />
            </FormField>
            <FormField id="cleaning_type_guarantee" label="Art der Reinigung">
              <select name="cleaning_type_guarantee" value={formData.cleaning_type_guarantee || ''} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">—</option>
                <option value="mit_abnahmegarantie">mit Abnahmegarantie</option>
                <option value="ohne_abnahmegarantie">ohne Abnahmegarantie</option>
                <option value="umzugsreinigung">Umzugsreinigung</option>
              </select>
            </FormField>
        </Fieldset>
        )}

        {showSpezialtransportFields && (
            <Fieldset legend="Spezialtransport">
                <FormField id="special_transport_type" label="Art des Spezialtransports"><Input name="special_transport_type" value={formData.special_transport_type || ''} onChange={handleChange} /></FormField>
                <div className="md:col-span-2 lg:col-span-3">
                  <FormField id="special_transport_other_details" label="Details zum Spezialtransport"><Textarea name="special_transport_other_details" value={formData.special_transport_other_details || ''} onChange={handleChange} /></FormField>
                </div>
            </Fieldset>
        )}
        
        <div className="space-y-4">
            <Label className="text-md font-semibold px-2 text-foreground">Zusätzliche Bemerkungen</Label>
            <Textarea name="additional_info" placeholder="Zusätzliche Informationen aus dem Formular..." value={formData.additional_info || ''} onChange={handleChange} rows={4} />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isProcessing}><X className="w-4 h-4 mr-2" /> Abbrechen</Button>
          <Button type="submit" disabled={isProcessing}>{isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Speichern</Button>
        </div>
      </form>
    </div>
  );
};

export default QuoteEditForm;