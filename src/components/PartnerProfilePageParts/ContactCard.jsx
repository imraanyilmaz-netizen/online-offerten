import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, ExternalLink, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const ContactCard = ({ partner }) => {
  const { t } = useTranslation('partnerProfilePage');

  return (
    <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
      <CardHeader className="bg-gray-50 rounded-t-xl p-4 border-b border-gray-100">
        <CardTitle className="text-lg font-bold text-gray-800">{t('kontaktSectionTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {partner.phone && (
          <div className="flex items-center text-gray-700 group">
            <Phone size={18} className="mr-4 text-green-600 flex-shrink-0" />
            <a href={`tel:${partner.phone}`} className="hover:text-green-700 transition-colors text-sm font-medium">{partner.phone}</a>
          </div>
        )}
        {partner.email && (
          <div className="flex items-center text-gray-700 group">
            <Mail size={18} className="mr-4 text-green-600 flex-shrink-0" />
            <a href={`mailto:${partner.email}`} className="hover:text-green-700 transition-colors text-sm font-medium">{partner.email}</a>
          </div>
        )}
        {(partner.address_street || partner.address_city) && (
          <div className="flex items-start text-gray-700 group">
            <MapPin size={18} className="mr-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm font-medium">
              {partner.address_street && <div>{partner.address_street}</div>}
              {(partner.address_zip || partner.address_city) && (
                <div>{partner.address_zip} {partner.address_city}</div>
              )}
            </div>
          </div>
        )}
        {partner.website && (
          <Button variant="outline" asChild className="w-full text-green-600 border-green-500 hover:bg-green-50 hover:text-green-700">
            <a href={partner.website.startsWith('http') ? partner.website : `https://${partner.website}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              {t('websiteLabel')}
            </a>
          </Button>
        )}
        {!partner.phone && !partner.email && !partner.website && (
            <p className="text-sm text-gray-500 italic">{t('common:notAvailable')}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;