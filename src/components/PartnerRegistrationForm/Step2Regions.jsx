import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { X, Info } from 'lucide-react';

const regionGroups = [
  {
    name: 'Deutschschweiz',
    cantons: [
      { id: 'ZH', name: 'Zürich' }, { id: 'BE', name: 'Bern' }, { id: 'LU', name: 'Luzern' },
      { id: 'AG', name: 'Aargau' }, { id: 'SO', name: 'Solothurn' }, { id: 'BS', name: 'Basel-Stadt' },
      { id: 'BL', name: 'Basel-Landschaft' }
    ]
  },
  {
    name: 'Ostschweiz',
    cantons: [
      { id: 'SG', name: 'St. Gallen' }, { id: 'TG', name: 'Thurgau' }, { id: 'AR', name: 'Appenzell Ausserrhoden' },
      { id: 'AI', name: 'Appenzell Innerrhoden' }, { id: 'GL', name: 'Glarus' }, { id: 'SH', name: 'Schaffhausen' }
    ]
  },
  {
    name: 'Westschweiz',
    cantons: [
      { id: 'GE', name: 'Genf' }, { id: 'VD', name: 'Waadt' }, { id: 'VS', name: 'Wallis' },
      { id: 'NE', name: 'Neuenburg' }, { id: 'FR', name: 'Freiburg' }, { id: 'JU', name: 'Jura' }
    ]
  },
  {
    name: 'Zentralschweiz',
    cantons: [
      { id: 'ZG', name: 'Zug' }, { id: 'SZ', name: 'Schwyz' }, { id: 'NW', name: 'Nidwalden' },
      { id: 'OW', name: 'Obwalden' }, { id: 'UR', name: 'Uri' }
    ]
  },
  {
    name: 'Südschweiz',
    cantons: [
      { id: 'TI', name: 'Tessin' }, { id: 'GR', name: 'Graubünden' }
    ]
  }
];

const allCantons = regionGroups.flatMap(group => group.cantons);

const Step2Regions = ({ formData, onRegionChange, errors = {} }) => {

  const getCantonById = (id) => allCantons.find(c => c.id === id);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Wählen Sie Ihre Service-Regionen</h3>
      <p className="text-slate-500 mb-6">In welchen Regionen bieten Sie Ihre Dienstleistungen an?</p>
      
      {errors.selectedRegions && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.selectedRegions}</p>
        </div>
      )}
      
      <Accordion type="multiple" className="w-full">
        {regionGroups.map(group => (
          <AccordionItem value={group.name} key={group.name}>
            <AccordionTrigger className="text-base font-semibold hover:no-underline">
              {group.name}
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-slate-50 rounded-b-md">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {group.cantons.map(canton => (
                  <div key={canton.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`region-${canton.id}`}
                      checked={formData.selectedRegions.includes(canton.id)}
                      onCheckedChange={() => onRegionChange(canton.id)}
                    />
                    <Label htmlFor={`region-${canton.id}`} className="font-normal cursor-pointer">{canton.name}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8">
        <h4 className="font-semibold mb-2">Ihre Auswahl</h4>
        {formData.selectedRegions.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-slate-50">
            {formData.selectedRegions.map(cantonId => {
              const canton = getCantonById(cantonId);
              return (
                <Badge key={cantonId} variant="secondary" className="bg-green-100 text-green-800 text-sm py-1 px-3">
                  {canton ? canton.name : cantonId}
                  <button type="button" onClick={() => onRegionChange(cantonId)} className="ml-2 rounded-full hover:bg-green-200 p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Noch keine Regionen ausgewählt</p>
        )}
        <p className="text-xs text-slate-500 mt-2">Kunden finden Sie basierend auf den von Ihnen ausgewählten Regionen</p>
      </div>

      <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <h4 className="text-md font-semibold text-green-800">Warum ist das wichtig?</h4>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-green-700">
              <li>Kunden finden Sie leichter, wenn sie nach Dienstleistungen in ihrer Region suchen</li>
              <li>Sie erhalten relevantere Anfragen von Kunden in Ihrer Nähe</li>
              <li>Ihr Unternehmen wird in den Suchergebnissen für die ausgewählten Regionen angezeigt</li>
              <li>Sie können Ihre Reichweite jederzeit erweitern</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Regions;