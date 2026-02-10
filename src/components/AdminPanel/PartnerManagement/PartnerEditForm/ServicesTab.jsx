import React from 'react';
// framer-motion removed - CSS for better INP
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Truck, Sparkles, Paintbrush, Sprout, ArrowUpDown } from 'lucide-react';
import { cantonOptions, getFullCantonName } from '@/lib/dataMapping.js';

const mainCategories = [
  { id: 'umzug', label: 'Umzug', icon: Truck, services: [
    { id: 'privatumzug', label: 'Privatumzug', desc: 'Wohnung, Haus, WG-Zimmer' },
    { id: 'geschaeftsumzug', label: 'Geschäftsumzug', desc: 'Büro, Ladenlokal, Werkstatt' },
    { id: 'auslandumzug', label: 'Auslandumzug', desc: 'Umzüge ins oder aus dem Ausland' },
    { id: 'spezialtransport', label: 'Spezialtransport', desc: 'Klavier, Tresor, Kunst & mehr' },
    { id: 'kleintransport', label: 'Kleintransport', desc: 'Einzelne Möbel, kleine Lasten' },
    { id: 'moebellift_service', label: 'Möbellift mieten', desc: 'Bis 400 kg, max. 27m Länge', icon: ArrowUpDown },
    { id: 'umzugsreinigung_opt', label: 'Endreinigung', desc: 'mit Abnahmegarantie' },
    { id: 'raeumung_service', label: 'Räumung' },
    { id: 'entsorgung_service', label: 'Entsorgung' },
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
    { id: 'raeumung_service', label: 'Räumung' },
    { id: 'entsorgung_service', label: 'Entsorgung' },
  ]},
  { id: 'maler', label: 'Maler', icon: Paintbrush, services: [
    { id: 'maler_service', label: 'Malerarbeiten' },
  ]},
];

const ServicesTab = ({ formData, handleMainCategoryChange, handleServiceChange, newRegion, setNewRegion, addRegion, removeRegion }) => {

  return (
    <div className="space-y-6 mt-2">
      <div>
        <Label className="font-semibold text-base mb-4 block">Branchen</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {mainCategories.map(category => {
            const isSelected = formData.mainCategories.includes(category.id);
            return (
                <div
                key={category.id}
                onClick={() => handleMainCategoryChange(category.id)}
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'bg-green-50 border-green-500 shadow-sm' : 'bg-white hover:bg-slate-50 hover:border-slate-300 border-slate-200'}`}
                >
                <category.icon className={`w-6 h-6 mr-4 transition-colors ${isSelected ? 'text-green-600' : 'text-slate-500'}`} />
                <span className={`font-semibold transition-colors ${isSelected ? 'text-green-700' : 'text-slate-700'} flex-grow`}>{category.label}</span>
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'bg-green-600 border-white text-white' : 'bg-white border-slate-300'}`}>
                    {isSelected && <div className="text-xs">✓</div>}
                </div>
                </div>
            );
            })}
        </div>
      </div>
      
      
        {formData.mainCategories.length > 0 && (
          <div
            className="border-t pt-6"
          >
            <Label className="font-semibold text-base mb-4 block">Detaillierte Leistungen</Label>
            <div className="space-y-6">
              {mainCategories.filter(c => formData.mainCategories.includes(c.id)).map(category => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="bg-slate-100 p-4 border-b">
                    <h5 className="font-semibold text-slate-800 flex items-center">
                      <category.icon className="w-5 h-5 mr-3 text-green-600"/>
                      {category.label}
                    </h5>
                  </div>
                  <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.services.map(service => (
                      <div
                        key={service.id + category.id}
                        className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50 transition-colors"
                        onClick={() => handleServiceChange(service.id)}
                      >
                        <Checkbox
                          id={service.id + category.id}
                          checked={formData.selectedServices.includes(service.id)}
                          onCheckedChange={() => handleServiceChange(service.id)}
                          className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={service.id + category.id} className="font-medium cursor-pointer flex items-center">
                             {service.icon && <service.icon className="w-4 h-4 mr-2 text-slate-600" />}
                            {service.label}
                          </Label>
                          {service.desc && <p className="text-sm text-slate-500">{service.desc}</p>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      

      <div className="border-t pt-6">
        <Label className="font-semibold text-base">Einsatzregionen</Label>
        <div className="flex gap-2 my-2">
          <Select value={newRegion} onValueChange={setNewRegion}>
            <SelectTrigger><SelectValue placeholder="Region auswählen" /></SelectTrigger>
            <SelectContent>
              {cantonOptions
                .filter(r => !formData.service_regions.includes(r.value))
                .map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button type="button" onClick={addRegion} disabled={!newRegion}><Plus className="w-4 h-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] bg-slate-50">
          {formData.service_regions.map((r, i) => 
            <Badge key={i} variant="outline" className="bg-white">
              {getFullCantonName(r)}
              <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => removeRegion(r)}/>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;