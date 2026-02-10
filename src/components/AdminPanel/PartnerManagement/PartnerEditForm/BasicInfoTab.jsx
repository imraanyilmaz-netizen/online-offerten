import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const BasicInfoTab = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company_name">Firmenname *</Label>
          <Input id="company_name" value={formData.company_name} onChange={(e) => handleInputChange('company_name', e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="contact_person">Ansprechperson</Label>
          <Input id="contact_person" value={formData.contact_person} onChange={(e) => handleInputChange('contact_person', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">E-Mail (nicht änderbar)</Label>
          <Input id="email" type="email" value={formData.email} disabled />
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="website">Webseite</Label>
          <Input id="website" value={formData.website} onChange={(e) => handleInputChange('website', e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Firmenbeschreibung</Label>
        <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} rows={4} />
      </div>
    </div>
  );
};

export default BasicInfoTab;