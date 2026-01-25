import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Sparkles, Paintbrush, Sprout, ArrowUpDown } from 'lucide-react';

const mainCategories = [
  { id: 'umzug', label: 'Umzug', icon: Truck, services: [
    { id: 'privatumzug', label: 'Privatumzug', desc: 'Wohnung, Haus, WG-Zimmer' },
    { id: 'geschaeftsumzug', label: 'Geschäftsumzug', desc: 'Büro, Ladenlokal, Werkstatt' },
    { id: 'auslandumzug', label: 'Auslandumzug', desc: 'Umzüge ins oder aus dem Ausland' },
    { id: 'spezialtransport', label: 'Spezialtransport', desc: 'Klavier, Tresor, Kunst & mehr' },
    { id: 'kleintransport', label: 'Kleintransport', desc: 'Einzelne Möbel, kleine Lasten' },
    { id: 'moebellift_service', label: 'Möbellift mieten', desc: 'Bis 400 kg, max. 27m Länge', icon: ArrowUpDown },
    { id: 'umzugsreinigung_opt', label: 'Umzugsreinigung' },
    { id: 'raeumung_service', label: 'Räumung' },
    { id: 'entsorgung_service', label: 'Entsorgung' },
  ]},
  { id: 'reinigung', label: 'Reinigung', icon: Sparkles, services: [
    { id: 'wohnungsreinigung', label: 'Wohnungsreinigung' },
    { id: 'hausreinigung', label: 'Hausreinigung' },
    { id: 'buero_reinigung', label: 'Büroreinigung' },
    { id: 'umzugsreinigung', label: 'Umzugsreinigung' },
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
  { id: 'maler', label: 'Malerarbeiten', icon: Paintbrush, services: [
    { id: 'maler_service', label: 'Malerarbeiten' },
  ]},
   { id: 'garten', label: 'Gartenpflege', icon: Sprout, services: [
    { id: 'landschaftsbau', label: 'Landschaftsbau' },
    { id: 'gartenpflege', label: 'Gartenpflege' },
    { id: 'terrassenverlegung', label: 'Terrassenverlegung' },
    { id: 'pool', label: 'Pool' },
    { id: 'sporteinrichtungsbau', label: 'Sporteinrichtungsbau' },
    { id: 'gartenhausbau', label: 'Gartenhausbau' },
    { id: 'saunabau', label: 'Saunabau' },
  ]},
];

const Step1Services = ({ formData, onMainCategoryChange, onServiceChange, errors = {} }) => {
  return (
    <div className="space-y-6">
    <div>
        <h3 className="text-2xl font-bold mb-3 text-slate-900">Wählen Sie Ihre Leistungen</h3>
        <p className="text-slate-600 text-base">Bitte wählen Sie zunächst eine oder mehrere Hauptkategorien aus, dann die detaillierten Dienstleistungen.</p>
      </div>
      
      {errors.mainCategories && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
          <p className="text-sm font-medium text-red-700">{errors.mainCategories}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mainCategories.map(category => {
          const isSelected = formData.mainCategories.includes(category.id);
          return (
            <motion.div
              key={category.id}
              onClick={() => onMainCategoryChange(category.id)}
              className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500 shadow-md shadow-green-100' 
                  : 'bg-white hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm border-slate-200'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-green-100' : 'bg-slate-100'} transition-colors`}>
                <category.icon className={`w-6 h-6 transition-colors ${isSelected ? 'text-green-600' : 'text-slate-600'}`} />
              </div>
              <span className={`font-semibold text-base ml-4 transition-colors ${isSelected ? 'text-green-800' : 'text-slate-800'} flex-grow`}>
                {category.label}
              </span>
              <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                isSelected 
                  ? 'bg-green-600 border-white text-white' 
                  : 'bg-white border-slate-300'
              }`}>
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-sm font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {formData.mainCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-8 pt-8 border-t border-slate-200"
          >
            <div className="mb-6">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Detaillierte Leistungen</h4>
              <p className="text-slate-600 text-sm">Wählen Sie die spezifischen Dienstleistungen aus, die Sie anbieten</p>
            </div>
            <div className="space-y-5">
              {mainCategories.filter(c => formData.mainCategories.includes(c.id)).map(category => (
                <Card key={category.id} className="overflow-hidden border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 border-b border-green-100">
                    <h5 className="font-bold text-slate-900 flex items-center text-lg">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <category.icon className="w-5 h-5 text-green-600"/>
                      </div>
                      {category.label}
                    </h5>
                  </div>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.services.map(service => {
                        const isServiceSelected = formData.selectedServices.includes(service.id);
                        return (
                      <div
                            key={service.id + category.id}
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              isServiceSelected
                                ? 'bg-green-50 border-green-300 shadow-sm'
                                : 'hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                            }`}
                        onClick={() => onServiceChange(service.id)}
                      >
                        <Checkbox
                              id={service.id + category.id}
                              checked={isServiceSelected}
                          onCheckedChange={() => onServiceChange(service.id)}
                              className="mt-0.5"
                        />
                            <div className="grid gap-1 flex-1">
                              <Label 
                                htmlFor={service.id + category.id} 
                                className={`font-semibold cursor-pointer flex items-center ${
                                  isServiceSelected ? 'text-green-800' : 'text-slate-800'
                                }`}
                              >
                                {service.icon && <service.icon className={`w-4 h-4 mr-2 ${isServiceSelected ? 'text-green-600' : 'text-slate-500'}`} />}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {errors.selectedServices && formData.mainCategories.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
          <p className="text-sm font-medium text-red-700">{errors.selectedServices}</p>
        </div>
      )}
    </div>
  );
};

export default Step1Services;