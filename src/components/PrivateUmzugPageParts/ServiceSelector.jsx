import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Home, Building, Globe, Sparkles, Trash2, Brush as PaintBrush, Box, ArrowRight } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';

const services = [
  { nameKey: 'privatumzug', icon: Home, path: '/umzugsfirma/privatumzug', active: true },
  { nameKey: 'geschaeftsumzug', icon: Building, path: '/umzugsfirma/geschaeftsumzug' },
  { nameKey: 'internationale', icon: Globe, path: '/umzugsfirma/internationale-umzuege' },
  { nameKey: 'spezialtransporte', icon: Box, path: '/umzugsfirma/spezialtransporte' },
  { nameKey: 'klaviertransport', icon: PiPianoKeysFill, path: '/umzugsfirma/spezialtransporte/klaviertransport' },
  { nameKey: 'reinigung', icon: Sparkles, path: '/reinigung' },
  { nameKey: 'raeumung', icon: Trash2, path: '/raeumung-entsorgung' },
  { nameKey: 'malerarbeiten', icon: PaintBrush, path: '/malerarbeitenkosten' },
];

const ServiceItem = ({ nameKey, icon: Icon, path, active }) => {
  const { t } = useTranslation('privateUmzugPage');
  return (
    <Link href={path}>
      <div
        className={`flex items-center p-3 my-1.5 rounded-lg transition-colors duration-200 ${
          active
            ? 'bg-green-100 text-green-800 font-bold border-l-4 border-green-500'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5 mr-4" />
        <span className="flex-1">{t(`services.${nameKey}`)}</span>
        <ArrowRight className={`w-4 h-4 transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </Link>
  );
};

const ServiceSelector = () => {
  const { t } = useTranslation('privateUmzugPage');
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('sidebar.quickQuoteTitle')}</h3>
      <nav>
        {services.map((service) => (
          <ServiceItem key={service.nameKey} {...service} />
        ))}
      </nav>
       <Button asChild className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white group">
        <Link href="/kostenlose-offerte-anfordern">
          {t('ctaButton')}
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
};

// Add services to translation file
/*
"services": {
  "privatumzug": "Privatumzug",
  "geschaeftsumzug": "Geschäftsumzug",
  "internationale": "Internationale Umzüge",
  "spezialtransporte": "Spezialtransporte",
  "klaviertransport": "Klaviertransport",
  "reinigung": "Reinigung",
  "raeumung": "Räumung & Entsorgung",
  "malerarbeiten": "Malerarbeiten"
}
*/

export default ServiceSelector;