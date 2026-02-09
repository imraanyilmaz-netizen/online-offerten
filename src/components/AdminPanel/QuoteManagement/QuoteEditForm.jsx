import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Save, X } from 'lucide-react';
import { getServiceCategory, isMovingService } from '@/lib/serviceCategorizer';

const FormField = ({ id, label, children }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</Label>
    <div className="mt-1">{children}</div>
  </div>
);

const Fieldset = ({ legend, children, className = "" }) => (
    <fieldset className={`border p-4 rounded-md space-y-4 ${className}`}>
        <legend className="text-md font-semibold px-2 text-gray-800">{legend}</legend>
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

// Helper function to format floor strings
const formatFloor = (str) => {
    if (!str) return '';
    str = str.trim();
    if (str.length === 0) return '';

    // Convert to lowercase for consistent checking
    let lowerStr = str.toLowerCase();

    if (lowerStr.endsWith('. etage') || lowerStr.endsWith(' etage')) {
        return str.replace(/etage/gi, 'Etage').replace(/\./g, '').trim() + '. Etage';
    }
    if (lowerStr.endsWith('.')) {
        return str.trim() + ' Etage';
    }
    if (!isNaN(parseInt(str, 10)) && !lowerStr.includes('etage')) {
        return str.trim() + '. Etage';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
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
  
  const serviceCategory = getServiceCategory(formData.servicetype);
  const showMovingFields = isMovingService(formData.servicetype);

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
    <motion.div
      initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-slate-50 border-t border-slate-200 overflow-hidden"
    >
      <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Anfrage bearbeiten</h3>
        
        <Fieldset legend="Kunden- & Anfragedaten">
          <FormField id="salutation" label="Anrede"><Input name="salutation" value={formData.salutation || ''} onChange={handleChange} /></FormField>
          <FormField id="firstname" label="Vorname"><Input name="firstname" value={formData.firstname || ''} onChange={handleChange} /></FormField>
          <FormField id="lastname" label="Nachname"><Input name="lastname" value={formData.lastname || ''} onChange={handleChange} /></FormField>
          <FormField id="email" label="E-Mail"><Input name="email" type="email" value={formData.email || ''} onChange={handleChange} /></FormField>
          <FormField id="phone" label="Telefon"><Input name="phone" value={formData.phone || ''} onChange={handleChange} /></FormField>
          <FormField id="servicetype" label="Dienstleistung"><Input name="servicetype" value={formData.servicetype || ''} onChange={handleChange} /></FormField>
          <FormField id="quoteswanted" label="Gewünschte Offerten"><Input name="quoteswanted" type="number" value={formData.quoteswanted || ''} onChange={handleChange} /></FormField>
          <FormField id="how_found" label="Wie gefunden?"><Input name="how_found" value={formData.how_found || ''} onChange={handleChange} /></FormField>
        </Fieldset>

        <Fieldset legend={showMovingFields ? "Auszugsadresse" : "Objektadresse"}>
            <FormField id="from_street" label="Strasse"><Input name="from_street" value={formData.from_street || ''} onChange={handleChange} /></FormField>
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
                <FormField id="to_street" label="Strasse"><Input name="to_street" value={formData.to_street || ''} onChange={handleChange} /></FormField>
                <FormField id="to_zip" label="PLZ"><Input name="to_zip" value={formData.to_zip || ''} onChange={handleChange} /></FormField>
                <FormField id="to_city" label="Ort"><Input name="to_city" value={formData.to_city || ''} onChange={handleChange} /></FormField>
                <FormField id="to_country" label="Land"><Input name="to_country" value={formData.to_country || ''} onChange={handleChange} /></FormField>
                <FormField id="to_floor" label="Stockwerk"><Input name="to_floor" value={formData.to_floor || ''} onChange={handleChange} /></FormField>
                <CheckboxField id="to_lift" label="Lift vorhanden" checked={formData.to_lift || false} onChange={(checked) => handleCheckboxChange('to_lift', checked)} />
                <FormField id="to_object_type" label="Objektart"><Input name="to_object_type" value={formData.to_object_type || ''} onChange={handleChange} /></FormField>
            </Fieldset>
        )}
        
        <Fieldset legend="Zeitpunkt & Zusatzleistungen">
            <FormField id="move_date" label="Wunschtermin"><Input type="date" name="move_date" value={formData.move_date ? formData.move_date.split('T')[0] : ''} onChange={handleDateChange} /></FormField>
            <FormField id="preferredtime" label="Bevorzugte Zeit"><Input name="preferredtime" value={formData.preferredtime || ''} onChange={handleChange} /></FormField>
            <CheckboxField id="move_date_flexible" label="Datum flexibel?" checked={formData.move_date_flexible || false} onChange={(checked) => handleCheckboxChange('move_date_flexible', checked)} />
            {showMovingFields && (
                <>
                    <CheckboxField id="additional_services_cleaning" label="Zusätzliche Reinigung" checked={formData.additional_services_cleaning || false} onChange={(checked) => handleCheckboxChange('additional_services_cleaning', checked)} />
                    <CheckboxField id="additional_services_piano" label="Klaviertransport" checked={formData.additional_services_piano || false} onChange={(checked) => handleCheckboxChange('additional_services_piano', checked)} />
                </>
            )}
        </Fieldset>

        {showMovingFields && (
            <Fieldset legend="Spezialtransport">
                <FormField id="special_transport_type" label="Art des Spezialtransports"><Input name="special_transport_type" value={formData.special_transport_type || ''} onChange={handleChange} /></FormField>
                <div className="md:col-span-2 lg:col-span-3">
                  <FormField id="special_transport_other_details" label="Details zum Spezialtransport"><Textarea name="special_transport_other_details" value={formData.special_transport_other_details || ''} onChange={handleChange} /></FormField>
                </div>
            </Fieldset>
        )}
        
        <div className="space-y-4">
            <Label className="text-md font-semibold px-2 text-gray-800">Zusätzliche Bemerkungen</Label>
            <Textarea name="additional_info" placeholder="Zusätzliche Informationen aus dem Formular..." value={formData.additional_info || ''} onChange={handleChange} rows={4} />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isProcessing}><X className="w-4 h-4 mr-2" /> Abbrechen</Button>
          <Button type="submit" disabled={isProcessing}>{isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Speichern</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default QuoteEditForm;