import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Building, Mail, Phone, MapPin, Globe, Calendar, Users, FileText, Shield, Check, X, ExternalLink } from 'lucide-react';
import { getGermanServiceName, getFullCantonName } from '@/lib/dataMapping';

const DetailSection = ({ title, icon, children }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">{icon}{title}</h3>
    {children}
  </div>
);

const DetailItem = ({ label, value, children }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <div className="text-gray-800">{value || children || '-'}</div>
  </div>
);

const PartnerDetailView = ({ partner }) => {
  if (!partner) return null;
  
  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg border ${ partner.status === 'active' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200' }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{partner.company_name || partner.name}</h2>
            <Badge className={`mt-1 ${ partner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
              {partner.status}
            </Badge>
          </div>
          {partner.slug && partner.status === 'active' && (
            <Button onClick={() => window.open(`/partner/${partner.slug}`, '_blank')} variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" /> Profil ansehen
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailSection title="Kontaktinformationen" icon={<Users className="w-5 h-5 text-blue-600"/>}>
          <div className="space-y-3 text-sm">
            <DetailItem label="Ansprechperson" value={partner.contact_person} />
            <DetailItem label="E-Mail" value={partner.email} />
            <DetailItem label="Telefon" value={partner.phone} />
            <DetailItem label="Webseite">
              <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{partner.website}</a>
            </DetailItem>
          </div>
        </DetailSection>

        <DetailSection title="Leistungskennzahlen" icon={<Star className="w-5 h-5 text-yellow-500"/>}>
           <div className="space-y-3 text-sm">
             <DetailItem label="Bewertung" value={`${partner.rating || 0}/5 (${partner.review_count || 0} Bewertungen)`} />
             <DetailItem label="Gesamtkäufe" value={partner.total_purchases || 0} />
             <DetailItem label="Gesamter Umsatz" value={`CHF ${(partner.total_revenue || 0).toLocaleString()}`} />
             <DetailItem label="Letzte Aktivität" value={partner.last_activity ? new Date(partner.last_activity).toLocaleDateString('de-DE') : 'Keine'} />
           </div>
        </DetailSection>
      </div>

      <DetailSection title="Adresse" icon={<MapPin className="w-5 h-5 text-green-600"/>}>
        <p className="text-sm text-gray-700">
            {partner.address_street}<br/>
            {partner.address_zip} {partner.address_city}
        </p>
      </DetailSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailSection title="Angebotene Dienstleistungen" icon={<FileText className="w-5 h-5 text-purple-600"/>}>
            <div className="flex flex-wrap gap-2">
                {(partner.offered_services || []).map((s, i) => <Badge key={i} variant="secondary">{getGermanServiceName(s)}</Badge>)}
            </div>
          </DetailSection>
          <DetailSection title="Service Regionen" icon={<Globe className="w-5 h-5 text-orange-600"/>}>
            <div className="flex flex-wrap gap-2">
                {(partner.service_regions || []).map((r, i) => <Badge key={i} variant="outline">{getFullCantonName(r)}</Badge>)}
            </div>
          </DetailSection>
      </div>
      
       <DetailSection title="Firmendetails" icon={<Building className="w-5 h-5 text-indigo-600"/>}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <DetailItem label="Gründungsjahr" value={partner.year_founded} />
            <DetailItem label="Mitarbeiterzahl" value={partner.employee_count} />
            <DetailItem label="Handelsregisternummer" value={partner.commercial_register_number} />
            <DetailItem label="Haftpflichtversicherung">
                {partner.liability_insurance ? <Check className="text-green-600"/> : <X className="text-red-600"/>}
            </DetailItem>
             <DetailItem label="AGB zugestimmt">
                {partner.agreed_to_terms ? <Check className="text-green-600"/> : <X className="text-red-600"/>}
            </DetailItem>
          </div>
       </DetailSection>
       
       <DetailSection title="Systeminformationen" icon={<Calendar className="w-5 h-5 text-gray-600"/>}>
          <div className="grid grid-cols-2 gap-4 text-sm">
             <DetailItem label="Partner ID" value={partner.id} />
             <DetailItem label="Registrierungsdatum" value={new Date(partner.created_at).toLocaleString('de-DE')} />
             <DetailItem label="Beitrittsdatum" value={partner.join_date ? new Date(partner.join_date).toLocaleString('de-DE') : '-'} />
          </div>
       </DetailSection>
    </div>
  );
};

export default PartnerDetailView;