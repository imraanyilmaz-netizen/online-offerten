import React from 'react';

export const cantonMap = {
  'AG': 'Aargau',
  'AI': 'Appenzell Innerrhoden',
  'AR': 'Appenzell Ausserrhoden',
  'BE': 'Bern',
  'BL': 'Basel-Landschaft',
  'BS': 'Basel-Stadt',
  'FR': 'Freiburg',
  'GE': 'Genf',
  'GL': 'Glarus',
  'GR': 'Graubünden',
  'JU': 'Jura',
  'LU': 'Luzern',
  'NE': 'Neuenburg',
  'NW': 'Nidwalden',
  'OW': 'Obwalden',
  'SG': 'St. Gallen',
  'SH': 'Schaffhausen',
  'SO': 'Solothurn',
  'SZ': 'Schwyz',
  'TG': 'Thurgau',
  'TI': 'Tessin',
  'UR': 'Uri',
  'VD': 'Waadt',
  'VS': 'Wallis',
  'ZG': 'Zug',
  'ZH': 'Zürich',
};

export const cantonOptions = Object.entries({
  'AG': 'Aargau', 'AI': 'Appenzell Innerrhoden', 'AR': 'Appenzell Ausserrhoden', 'BE': 'Bern', 'BL': 'Basel-Landschaft', 'BS': 'Basel-Stadt', 'FR': 'Freiburg', 'GE': 'Genf', 'GL': 'Glarus', 'GR': 'Graubünden', 'JU': 'Jura', 'LU': 'Luzern', 'NE': 'Neuenburg', 'NW': 'Nidwalden', 'OW': 'Obwalden', 'SG': 'St. Gallen', 'SH': 'Schaffhausen', 'SO': 'Solothurn', 'SZ': 'Schwyz', 'TG': 'Thurgau', 'TI': 'Tessin', 'UR': 'Uri', 'VD': 'Waadt', 'VS': 'Wallis', 'ZG': 'Zug', 'ZH': 'Zürich'
}).map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));

export const serviceMap = {
  // General keys from older versions
  'private': 'Privatumzug',
  'business': 'Geschäftsumzug',
  'international': 'Internationaler Umzug',
  'cleaning': 'Reinigung',
  'storage': 'Einlagerung',
  'disposal': 'Räumung & Entsorgung',
  'piano': 'Klaviertransport',
  'safe': 'Tresortransport',

  // STANDART ANAHTARLAR (Partnerlerin kullandığı) ve varyasyonları
  'privatumzug': 'Privatumzug',
  'geschaeftsumzug': 'Geschäftsumzug',
  'internationaler_umzug': 'Internationaler Umzug',
  'internationalumzug': 'Internationaler Umzug', // Legacy
  'internationale': 'Internationaler Umzug', // Legacy
  'spezialtransport': 'Spezialtransport',
  'special_transport': 'Spezialtransport', // Legacy
  'kleintransport': 'Kleintransport',
  'moebellift': 'Möbellift',
  'moebellift_service': 'Möbellift',
  'umzugsreinigung_opt': 'Umzugsreinigung', // From move form
  'additional_services_cleaning': 'Umzugsreinigung', // Legacy from quote object
  'raeumung_service': 'Räumung',
  'raeumung': 'Räumung', // Legacy
  'entsorgung_service': 'Entsorgung',
  'entsorgung': 'Entsorgung', // Legacy

  // Temizlik servisleri ve varyasyonları
  'umzugsreinigung': 'Umzugsreinigung',
  'wohnungsreinigung': 'Wohnungsreinigung',
  'apartment_cleaning': 'Wohnungsreinigung', // Legacy
  'hausreinigung': 'Hausreinigung',
  'house_cleaning': 'Hausreinigung', // Legacy
  'buero_reinigung': 'Büroreinigung',
  'office_cleaning': 'Büroreinigung', // Legacy
  'unterhaltsreinigung': 'Unterhaltsreinigung',
  'maintenance_cleaning': 'Unterhaltsreinigung', // Legacy
  'grundreinigung': 'Grundreinigung',
  'deep_cleaning': 'Grundreinigung', // Legacy
  'baureinigung': 'Baureinigung',
  'construction_cleaning': 'Baureinigung', // Legacy
  'fensterreinigung': 'Fensterreinigung',
  'window_cleaning': 'Fensterreinigung', // Legacy
  'bodenreinigung': 'Bodenreinigung',
  'floor_cleaning': 'Bodenreinigung', // Legacy
  'fassadenreinigung': 'Fassadenreinigung',
  'facade_cleaning': 'Fassadenreinigung', // Legacy
  'hofreinigung': 'Hofreinigung',
  'yard_cleaning': 'Hofreinigung', // Legacy

  // Maler servisleri ve varyasyonları
  'maler_service': 'Malerarbeiten',
  'maler': 'Malerarbeiten',
  'malerarbeiten': 'Malerarbeiten',
  'malerarbeiten privat': 'Malerarbeiten',
  'malerarbeiten gewerbe': 'Malerarbeiten',


  // Garten servisleri
  'landschaftsbau': 'Garten- und Landschaftsbau',
  'gartenpflege': 'Gartenpflege',
  'terrassenverlegung': 'Terrassenverlegung',
  'pool': 'Poolbau',
  'sporteinrichtungsbau': 'Sporteinrichtungsbau',
  'gartenhausbau': 'Gartenhausbau',
  'saunabau': 'Saunabau',

  // Diğer yaygın anahtarlar
  'lagerung': 'Einlagerung',
  'verpackung': 'Verpackungsservice',
  'moebelmontage': 'Möbelmontage',

  // Büyük harfli varyasyonlar
  'Privatumzug': 'Privatumzug',
  'Geschäftsumzug': 'Geschäftsumzug',
  'Internationaler Umzug': 'Internationaler Umzug',
  'Internationale Umzüge': 'Internationaler Umzug',
  'Spezialtransporte': 'Spezialtransporte',
  'Umzugsreinigung': 'Umzugsreinigung',
  'Wohnungsreinigung': 'Wohnungsreinigung',
  'Räumung & Entsorgung': 'Räumung & Entsorgung',
  'Klaviertransport': 'Klaviertransport',
  'Tresortransport': 'Tresortransport',
  'Möbelmontage': 'Möbelmontage',
  'Einlagerung': 'Einlagerung',
  'Verpackungsservice': 'Verpackungsservice',
  'Hausreinigung': 'Hausreinigung',
  'Spezialtransport': 'Spezialtransport',
  'Räumung': 'Räumung',
  'Entsorgung': 'Entsorgung',
  'Büroreinigung': 'Büroreinigung',
  'Unterhaltsreinigung': 'Unterhaltsreinigung',
  'Baureinigung': 'Baureinigung',
  'Grundreinigung': 'Grundreinigung',
  'Fensterreinigung': 'Fensterreinigung',
  'Bodenreinigung': 'Bodenreinigung',
  'Fassadenreinigung': 'Fassadenreinigung',
  'Hofreinigung': 'Hofreinigung',
  'Garten- und Landschaftsbau': 'Garten- und Landschaftsbau',
  'Gartenpflege': 'Gartenpflege',
  'Terrassenverlegung': 'Terrassenverlegung',
  'Poolbau': 'Poolbau',
  'Sporteinrichtungsbau': 'Sporteinrichtungsbau',
  'Gartenhausbau': 'Gartenhausbau',
  'Saunabau': 'Saunabau',
  'Möbellift': 'Möbellift'
};

export const getFullCantonName = (key) => cantonMap[key] || key;

const getSingleGermanServiceName = (key) => {
    if (!key) return '';
    const lowerKey = key.toLowerCase().trim();
    
    if (serviceMap[lowerKey]) {
        return serviceMap[lowerKey];
    }
    
    // Check for partial matches like "Malerarbeiten Privat"
    if (lowerKey.startsWith('malerarbeiten')) {
        return 'Malerarbeiten';
    }
    
    return key; // Fallback to the original key if no match is found
};

export const getGermanServiceName = (key) => {
    if (!key) return '';

    const lowerKey = key.toLowerCase();
    
    // Check if the key itself is a combined service that shouldn't be split.
    // e.g. "Garten- und Landschaftsbau"
    if (serviceMap[lowerKey]) {
        return serviceMap[lowerKey];
    }

    // Now, check if it's a combination that needs splitting
    const delimiters = / und | and | \+ | & /i;
    if (delimiters.test(lowerKey)) {
      return key.split(delimiters).map(part => getSingleGermanServiceName(part.trim())).join(' & ');
    }
    
    // If not a combined service, get the single name
    return getSingleGermanServiceName(key);
};