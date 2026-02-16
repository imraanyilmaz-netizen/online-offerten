import { getGermanServiceName } from './dataMapping';

const serviceKeyMap = {
  'privatumzug': 'privatumzug',
  'geschäftsumzug': 'geschaeftsumzug',
  'internationaler umzug': 'auslandumzug',
  'internationalumzug': 'auslandumzug',
  'spezialtransport': 'spezialtransport',
  'spezialtransporte': 'spezialtransport',
  'kleintransport': 'kleintransport',
  'umzugsreinigung': 'umzugsreinigung',
  'wohnungsreinigung': 'wohnungsreinigung',
  'räumung & entsorgung': 'raeumung_service', // Combined
  'räumung': 'raeumung_service',
  'entsorgung': 'entsorgung_service',
  'klaviertransport': 'klaviertransport',
  'tresortransport': 'tresortransport',
  'möbelmontage': 'moebelmontage',
  'einlagerung': 'lagerung',
  'verpackungsservice': 'verpackung',
  'hausreinigung': 'hausreinigung',
  'büroreinigung': 'buero_reinigung',
  'unterhaltsreinigung': 'unterhaltsreinigung',
  'baureinigung': 'baureinigung',
  'grundreinigung': 'grundreinigung',
  'fensterreinigung': 'fensterreinigung',
  'bodenreinigung': 'bodenreinigung',
  'fassadenreinigung': 'fassadenreinigung',
  'hofreinigung': 'hofreinigung',
  'malerarbeiten': 'maler_service',
  'malerarbeiten privat': 'maler_service',
  'malerarbeiten gewerbe': 'maler_service',
  'lagerung': 'lagerung_service',
  'lagerung_service': 'lagerung_service',
  // Add partner-side keys if they differ
  'geschaeftsumzug': 'geschaeftsumzug',
  'internationaler_umzug': 'auslandumzug',
  'auslandumzug': 'auslandumzug',
  'raeumung_service': 'raeumung_service',
  'entsorgung_service': 'entsorgung_service',
  'lagerung': 'lagerung',
  'verpackung': 'verpackung',
  'moebelmontage': 'moebelmontage',
  'buero_reinigung': 'buero_reinigung',
  'maler_service': 'maler_service',
  'landschaftsbau': 'landschaftsbau',
  'pool': 'pool',
};


const findServiceKey = (serviceName) => {
    if (!serviceName) return null;
    const lowerCaseServiceName = serviceName.toLowerCase().trim();
    
    if (serviceKeyMap[lowerCaseServiceName]) {
        return serviceKeyMap[lowerCaseServiceName];
    }
    
    // Reverse lookup for cases like 'privatumzug' -> 'Privatumzug'
    const keyFromValue = Object.keys(serviceKeyMap).find(key => serviceKeyMap[key] === lowerCaseServiceName);
    if (keyFromValue) {
        return lowerCaseServiceName;
    }

    // Fallback for simple cases that are not in the map
    return lowerCaseServiceName.replace(/[\s&/]/g, '_').replace(/_{2,}/g, '_');
};


const parseCombinedServiceType = (serviceTypeString) => {
    if (!serviceTypeString || typeof serviceTypeString !== 'string') {
        return [];
    }

    // List of delimiters to split the string
    const delimiters = [
        ' und ',
        ' and ',
        ' & ',
        ' + ',
        ',',
    ];

    // Create a regex from delimiters to split the string
    // e.g., / und | and | & | \+ |,/i
    const regex = new RegExp(delimiters.join('|'), 'i');
    
    const services = serviceTypeString.split(regex)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    
    // If splitting doesn't produce multiple services, return the original as a single-item array
    if (services.length <= 1) {
        return [serviceTypeString.trim()];
    }

    return services;
};


export const findMatchingPartners = (allPartners, criteria) => {
  if (!criteria || !allPartners) return [];

  const { mainService, additionalServices = [], targetRegions = [] } = criteria;
  
  // Parse the mainService string which might contain multiple services
  const parsedMainServices = parseCombinedServiceType(mainService);

  const mainServiceKeys = parsedMainServices.map(findServiceKey).filter(Boolean);
  const additionalServiceKeys = additionalServices.map(findServiceKey).filter(Boolean);
  
  // Combine all required services and remove duplicates
  const requiredServiceKeys = [...new Set([...mainServiceKeys, ...additionalServiceKeys])];
  
  if (requiredServiceKeys.length === 0) {
      console.warn("No valid service keys found for criteria:", criteria);
      return [];
  }

  return allPartners.filter(partner => {
    if (partner.status !== 'active') return false;

    const partnerServices = new Set(partner.offered_services || []);
    const partnerRegions = new Set(partner.service_regions || []);

    // Check if partner offers ALL required services
    const hasAllServices = requiredServiceKeys.every(key => partnerServices.has(key));
    
    if (!hasAllServices) {
      return false;
    }

    // If regions are specified, check if partner serves AT LEAST ONE of the target regions
    if (targetRegions.length > 0) {
      const hasRegion = targetRegions.some(region => partnerRegions.has(region));
      if (!hasRegion) {
        return false;
      }
    }

    // If no regions are specified, the partner matches as long as they offer the services.
    // This is useful for manual matching where region might not be the primary filter.
    return true;
  });
};