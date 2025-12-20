import React from 'react';
// Removed useTranslation
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Globe, Calendar, Shield, FileText } from 'lucide-react';
import StarRating from './StarRating';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ServiceList from './ServiceList';
import RegionList from './RegionList';

const Sidebar = ({ partner, averageRating, reviewCount, onGetOffer }) => {
  // Removed useTranslation

  const renderInfoItem = (Icon, label, value) => {
    if (!value) return null;
    return (
      <li className="flex items-start text-sm text-gray-700">
        <Icon className="w-5 h-5 mr-3 mt-0.5 text-green-600 flex-shrink-0" />
        <span className="break-words">
            {label === 'Haftpflichtversicherung vorhanden' ? label : `${label} ${value}`}
        </span>
      </li>
    );
  };
  
  const renderLinkItem = (Icon, textKey, value, href) => {
    if (!value) return null;
    return (
      <li className="flex items-start text-sm">
        <Icon className="w-5 h-5 mr-3 mt-0.5 text-green-600 flex-shrink-0" />
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline break-all">
          {value}
        </a>
      </li>
    );
  };
  
  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
        <CardHeader className="p-6 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-gray-800">Kontakt & Informationen</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-4">
            {partner.address_street && partner.address_zip && partner.address_city && renderInfoItem(MapPin, '', `${partner.address_street}, ${partner.address_zip} ${partner.address_city}`)}
            {renderLinkItem(Phone, '', partner.phone, `tel:${partner.phone}`)}
            {renderLinkItem(Globe, '', partner.website, partner.website?.startsWith('http') ? partner.website : `https://${partner.website}`)}
            {renderInfoItem(Calendar, 'Gegründet im Jahr', partner.year_founded)}
            {renderInfoItem(FileText, 'Handelsregisternummer', partner.commercial_register_number)}
            {partner.liability_insurance && renderInfoItem(Shield, 'Haftpflichtversicherung vorhanden', true)}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
        <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Interessiert an einer offerten?</h3>
            <p className="text-sm text-gray-600 mb-4">Holen Sie sich jetzt eine Offerte von {partner.company_name}.</p>
            <Button onClick={onGetOffer} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg">
              Kostenlose Offerte einholen
            </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
         <CardContent className="p-0">
            <Accordion type="multiple" collapsible className="w-full" defaultValue={['services', 'regions']}>
              <AccordionItem value="services">
                <AccordionTrigger className="px-6 py-4 text-base font-semibold">Angebotene Dienstleistungen</AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ServiceList services={partner.offered_services} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="regions">
                <AccordionTrigger className="px-6 py-4 text-base font-semibold">Tätigkeitsregionen</AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <RegionList regions={partner.service_regions} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
         </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;