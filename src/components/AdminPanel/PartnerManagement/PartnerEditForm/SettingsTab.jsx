import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUploader from '@/components/PartnerPanel/ImageUploader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const SettingsTab = ({ formData, handleInputChange, partner, onRefresh }) => {
  const handleImageUpload = (field, url) => {
    // ImageUploader already updates the database, but we can trigger a refresh
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="space-y-4 mt-2">
      <div className="p-4 border rounded-lg bg-gray-50">
        <Label htmlFor="status">Partner Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
          <SelectTrigger id="status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Aktiv</SelectItem>
            <SelectItem value="inactive">Inaktiv</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-2">Systeminformationen</h3>
        <div className="text-sm space-y-1">
            <p><strong>Partner ID:</strong> <code className="text-xs">{partner.id}</code></p>
            <p><strong>Beitrittsdatum:</strong> {new Date(partner.join_date || partner.created_at).toLocaleDateString('de-DE')}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bilder verwalten</CardTitle>
          <CardDescription>Laden Sie Logo und Titelbild für diesen Partner hoch.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <ImageUploader
            partnerId={partner.id}
            currentImageUrl={partner?.logo_url}
            onUpload={(url) => handleImageUpload('logo_url', url)}
            storagePath="partner-logos"
            dbField="logo_url"
            title="Firmenlogo"
            description="Wird im Dashboard und auf der Profilseite angezeigt."
          />
          <ImageUploader
            partnerId={partner.id}
            currentImageUrl={partner?.hero_image_url}
            onUpload={(url) => handleImageUpload('hero_image_url', url)}
            storagePath="partner-hero-images"
            dbField="hero_image_url"
            title="Titelbild"
            description="Grosses Bild oben auf der Profilseite."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;