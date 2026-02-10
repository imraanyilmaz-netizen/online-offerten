import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Save, Loader2, User, Building, Globe, Settings, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePartnerEditForm } from './PartnerEditForm/usePartnerEditForm';
import BasicInfoTab from './PartnerEditForm/BasicInfoTab';
import AddressTab from './PartnerEditForm/AddressTab';
import ServicesTab from './PartnerEditForm/ServicesTab';
import SettingsTab from './PartnerEditForm/SettingsTab';

const PartnerEditModal = ({ partner, isOpen, onClose, onSave, onRefresh }) => {
  const {
    formData, loading, newRegion, setNewRegion,
    handleInputChange, addRegion, removeRegion,
    handleMainCategoryChange, handleServiceChange,
    handleSave, handleClose
  } = usePartnerEditForm(partner, onSave, onClose, onRefresh);

  if (!partner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Partner bearbeiten: {partner.company_name || partner.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto pr-2">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 sticky top-0 bg-white z-10">
              <TabsTrigger value="basic"><User className="w-4 h-4 mr-1" />Grundinformationen</TabsTrigger>
              <TabsTrigger value="address"><MapPin className="w-4 h-4 mr-1" />Adresse & Firma</TabsTrigger>
              <TabsTrigger value="services"><Globe className="w-4 h-4 mr-1" />Branchen & Services</TabsTrigger>
              <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-1" />Einstellungen</TabsTrigger>
            </TabsList>

            <div className="pt-4">
              <TabsContent value="basic"><BasicInfoTab formData={formData} handleInputChange={handleInputChange} /></TabsContent>
              <TabsContent value="address"><AddressTab formData={formData} handleInputChange={handleInputChange} /></TabsContent>
              <TabsContent value="services">
                  <ServicesTab 
                    formData={formData}
                    handleMainCategoryChange={handleMainCategoryChange}
                    handleServiceChange={handleServiceChange}
                    newRegion={newRegion} setNewRegion={setNewRegion}
                    addRegion={addRegion} removeRegion={removeRegion}
                  />
              </TabsContent>
              <TabsContent value="settings">
                <SettingsTab 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  partner={partner}
                  onRefresh={onRefresh}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={handleClose} disabled={loading}>Abbrechen</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerEditModal;