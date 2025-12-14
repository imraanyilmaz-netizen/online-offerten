import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLocalizedUrl } from '@/lib/urlMap';

const LocationServiceLinks = ({ city, className = '' }) => {
  const { t, i18n } = useTranslation('footer');
  
  const topCities = [
    { path: '/umzugsfirma-zuerich', name: 'Zürich' },
    { path: '/umzugsfirma-bern', name: 'Bern' },
    { path: '/umzugsfirma-basel', name: 'Basel' },
    { path: '/umzugsfirma-luzern', name: 'Luzern' },
    { path: '/umzugsfirma-st-gallen', name: 'St. Gallen' },
    { path: '/umzugsfirma-winterthur', name: 'Winterthur' },
  ].filter(loc => loc.name !== city);

  const services = [
    // Umzug Services
    { path: '/privatumzug', textKey: 'links.umzug.privatumzug' },
    { path: '/geschaeftsumzug', textKey: 'links.umzug.geschaeftsumzug' },
    { path: '/internationale-umzuege', textKey: 'links.umzug.internationaleUmzuege' },
    { path: '/spezialtransporte', textKey: 'links.umzug.spezialtransporte' },
    { path: '/klaviertransport', textKey: 'links.umzug.klaviertransport' },
    // Reinigung Services
    { path: '/wohnungsreinigung', textKey: 'links.reinigung.wohnungsreinigung' },
    { path: '/hausreinigung', textKey: 'links.reinigung.hausreinigung' },
    { path: '/bueroreinigung', textKey: 'links.reinigung.bueroreinigung' },
    { path: '/umzugsreinigung', textKey: 'links.reinigung.umzugsreinigung' },
    { path: '/unterhaltsreinigung', textKey: 'links.reinigung.unterhaltsreinigung' },
    { path: '/grundreinigung', textKey: 'links.reinigung.grundreinigung' },
    { path: '/baureinigung', textKey: 'links.reinigung.baureinigung' },
    { path: '/fensterreinigung', textKey: 'links.reinigung.fensterreinigung' },
    { path: '/bodenreinigung', textKey: 'links.reinigung.bodenreinigung' },
    { path: '/fassadenreinigung', textKey: 'links.reinigung.fassadenreinigung' },
    { path: '/hofreinigung', textKey: 'links.reinigung.hofreinigung' },
    // Weitere Services
    { path: '/malerarbeiten', textKey: 'links.weitereServices.malerarbeiten' },
    { path: '/gartenarbeiten', textKey: 'links.weitereServices.gartenarbeiten' },
  ];

  return null;
};

export default LocationServiceLinks;

