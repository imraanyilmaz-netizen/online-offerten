import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { X, Truck, Sparkles, Paintbrush, Archive } from 'lucide-react';

const mainCategories = [
  { id: 'umzug', label: 'Umzug', icon: Truck, services: [
    { id: 'privatumzug', label: 'Privatumzug' },
    { id: 'geschaeftsumzug', label: 'Geschäftsumzug' },
    { id: 'auslandumzug', label: 'Auslandsumzug' },
    { id: 'spezialtransport', label: 'Spezialtransport', desc: 'Klavier, Tresor, Kunst & mehr' },
    { id: 'kleintransport', label: 'Kleintransport', desc: 'Einzelne Möbel, kleine Lasten' },
    { id: 'lagerung_service', label: 'Lagerung', icon: Archive },
    { id: 'umzugsreinigung_opt', label: 'Endreinigung', desc: 'mit Abnahmegarantie' },
    { id: 'raeumung_service', label: 'Räumungsdienst' },
    { id: 'entsorgung_service', label: 'Entsorgungsservice' },
  ]},
  { id: 'reinigung', label: 'Reinigung', icon: Sparkles, services: [
    { id: 'wohnungsreinigung', label: 'Wohnungsreinigung' },
    { id: 'hausreinigung', label: 'Hausreinigung' },
    { id: 'buero_reinigung', label: 'Büroreinigung' },
    { id: 'umzugsreinigung', label: 'Endreinigung', desc: 'mit Abnahmegarantie' },
    { id: 'unterhaltsreinigung', label: 'Unterhaltsreinigung' },
    { id: 'grundreinigung', label: 'Grundreinigung' },
    { id: 'baureinigung', label: 'Baureinigung' },
    { id: 'fensterreinigung', label: 'Fensterreinigung' },
    { id: 'bodenreinigung', label: 'Bodenreinigung' },
    { id: 'fassadenreinigung', label: 'Fassadenreinigung' },
    { id: 'hofreinigung', label: 'Hofreinigung' },
  ]},
  { id: 'maler', label: 'Malerarbeiten', icon: Paintbrush, services: [
    { id: 'maler_service', label: 'Malerarbeiten' },
  ]},
];

const Step1Services = ({ formData, onMainCategoryChange, onServiceChange, errors = {} }) => {
  const getServiceLabel = (serviceId) => {
    for (const category of mainCategories) {
      const service = category.services.find(s => s.id === serviceId);
      if (service) return service.label;
    }
    return serviceId;
  };

  // Servis değiştiğinde kategoriyi otomatik aktif/pasif yap
  const handleServiceChange = (serviceId) => {
    // Hangi kategoride bu servis var?
    const category = mainCategories.find(c => 
      c.services.some(s => s.id === serviceId)
    );
    
    if (category) {
      const isCurrentlySelected = formData.selectedServices.includes(serviceId);
      
      // Servis seçilecek (şu an seçili değil)
      if (!isCurrentlySelected) {
        // Kategoriyi de otomatik seç
        if (!formData.mainCategories.includes(category.id)) {
          onMainCategoryChange(category.id);
        }
      } else {
        // Servis kaldırılacak (şu an seçili)
        // Eğer kategoride başka seçili servis yoksa kategoriyi de kaldır
        const hasOtherSelectedServices = category.services.some(s => 
          s.id !== serviceId && formData.selectedServices.includes(s.id)
        );
        
        if (!hasOtherSelectedServices && formData.mainCategories.includes(category.id)) {
          onMainCategoryChange(category.id);
        }
      }
    }
    
    // Servis değişikliğini uygula
    onServiceChange(serviceId);
  };

  return (
    <div className="space-y-6">
    <div>
        <h3 className="text-2xl font-bold mb-3 text-slate-900">Wählen Sie Ihre Leistungen</h3>
        <p className="text-slate-600 text-base">Bitte wählen Sie die Hauptkategorien und detaillierten Dienstleistungen aus, die Sie anbieten.</p>
      </div>
      
      {errors.mainCategories && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
          <p className="text-sm font-medium text-red-700">{errors.mainCategories}</p>
        </div>
      )}
      
      <Accordion type="multiple" className="w-full">
        {mainCategories.map(category => {
          // Kategori aktif mi? İçinde seçili servis varsa aktif
          const categoryServices = category.services.filter(s => 
            formData.selectedServices.includes(s.id)
          );
          const isCategoryActive = categoryServices.length > 0;
          
          return (
            <AccordionItem value={category.id} key={category.id}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isCategoryActive ? 'bg-green-100' : 'bg-slate-100'}`}>
                    <category.icon className={`w-5 h-5 ${isCategoryActive ? 'text-green-600' : 'text-slate-600'}`} />
                  </div>
                  <span className={isCategoryActive ? 'text-green-800 font-bold' : ''}>{category.label}</span>
                  {categoryServices.length > 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 ml-2">
                      {categoryServices.length} ausgewählt
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-slate-50 rounded-b-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {category.services.map(service => {
                        const isServiceSelected = formData.selectedServices.includes(service.id);
                        return (
                      <div
                        key={service.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                              isServiceSelected
                                ? 'bg-green-50 border-green-300 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                            }`}
                        onClick={() => handleServiceChange(service.id)}
                      >
                        <Checkbox
                          id={service.id}
                              checked={isServiceSelected}
                          onCheckedChange={() => handleServiceChange(service.id)}
                              className="mt-0.5"
                        />
                            <div className="grid gap-1 flex-1">
                              <Label 
                            htmlFor={service.id} 
                                className={`font-semibold cursor-pointer flex items-center ${
                                  isServiceSelected ? 'text-green-800' : 'text-slate-800'
                                }`}
                              >
                            {service.icon && (
                              <service.icon className={`w-4 h-4 mr-2 ${isServiceSelected ? 'text-green-600' : 'text-slate-500'}`} />
                            )}
                            {service.label}
                          </Label>
                              {service.desc && (
                                <p className={`text-xs ${isServiceSelected ? 'text-green-700' : 'text-slate-500'}`}>
                                  {service.desc}
                                </p>
                              )}
                        </div>
                      </div>
                        );
                      })}
                    </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {formData.selectedServices.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Ausgewählte Leistungen</h4>
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-slate-50">
            {formData.selectedServices.map(serviceId => (
              <Badge 
                key={serviceId} 
                variant="secondary" 
                className="bg-green-100 text-green-800 text-sm py-1 px-3"
              >
                {getServiceLabel(serviceId)}
                <button 
                  type="button" 
                  onClick={() => handleServiceChange(serviceId)} 
                  className="ml-2 rounded-full hover:bg-green-200 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
              ))}
            </div>
        </div>
        )}
      
      {errors.selectedServices && formData.mainCategories.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
          <p className="text-sm font-medium text-red-700">{errors.selectedServices}</p>
        </div>
      )}
    </div>
  );
};

export default Step1Services;