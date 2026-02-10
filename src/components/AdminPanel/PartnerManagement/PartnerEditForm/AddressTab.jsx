import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const AddressTab = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="address_street">Strasse</Label>
          <Input id="address_street" value={formData.address_street} onChange={(e) => handleInputChange('address_street', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="address_zip">PLZ</Label>
          <Input id="address_zip" value={formData.address_zip} onChange={(e) => handleInputChange('address_zip', e.target.value)} />
        </div>
        <div className="md:col-span-3">
          <Label htmlFor="address_city">Ort</Label>
          <Input id="address_city" value={formData.address_city} onChange={(e) => handleInputChange('address_city', e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
        <div>
          <Label htmlFor="year_founded">Gründungsjahr</Label>
          <Input id="year_founded" type="number" value={formData.year_founded} onChange={(e) => handleInputChange('year_founded', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="employee_count">Mitarbeiterzahl</Label>
          <Input id="employee_count" value={formData.employee_count} onChange={(e) => handleInputChange('employee_count', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="commercial_register_number">Handelsregisternummer</Label>
          <Input id="commercial_register_number" value={formData.commercial_register_number} onChange={(e) => handleInputChange('commercial_register_number', e.target.value)} />
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-4 border-t">
        <Checkbox id="liability_insurance" checked={formData.liability_insurance} onCheckedChange={(checked) => handleInputChange('liability_insurance', checked)} />
        <Label htmlFor="liability_insurance">Haftpflichtversicherung vorhanden</Label>
      </div>
    </div>
  );
};

export default AddressTab;