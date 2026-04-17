import React from 'react';
// framer-motion removed - CSS for better INP
import { Check } from 'lucide-react';
import { getGermanServiceName } from '@/data/categories';
// Removed useTranslation

const ServiceList = ({ services, mainCategories, className }) => {
  // Removed useTranslation

  if (!services || services.length === 0) {
    return null;
  }

  const categoryOrder = ['umzug', 'reinigung', 'maler'];

  const groupedServices = {
    umzug: { label: 'Umzugsdienstleistungen', services: [] },
    reinigung: { label: 'Reinigungsdienstleistungen', services: [] },
    maler: { label: 'Malerarbeiten', services: [] },
  };

  const umzugServices = ['privatumzug', 'geschaeftsumzug', 'auslandumzug', 'klaviertransport', 'kleintransport', 'raeumung_service', 'entsorgung_service'];
  const reinigungServices = ['wohnungsreinigung', 'hausreinigung', 'buero_reinigung', 'umzugsreinigung', 'unterhaltsreinigung', 'grundreinigung', 'baureinigung', 'fensterreinigung', 'bodenreinigung', 'fassadenreinigung', 'hofreinigung'];
  const malerServices = ['maler_service'];
  
  services.forEach(serviceKey => {
    const serviceName = getGermanServiceName(serviceKey);
    if (!serviceName) return;

    if (umzugServices.includes(serviceKey)) {
        if (!groupedServices.umzug.services.some(s => getGermanServiceName(s) === serviceName)) {
           groupedServices.umzug.services.push(serviceKey);
        }
    } else if (reinigungServices.includes(serviceKey)) {
        if (!groupedServices.reinigung.services.some(s => getGermanServiceName(s) === serviceName)) {
            groupedServices.reinigung.services.push(serviceKey);
        }
    } else if (malerServices.includes(serviceKey)) {
         if (!groupedServices.maler.services.some(s => getGermanServiceName(s) === serviceName)) {
            groupedServices.maler.services.push(serviceKey);
        }
    }
  });


  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-6">
        {categoryOrder.map(categoryKey => {
            const category = groupedServices[categoryKey];
            if (category && category.services.length > 0) {
                return (
                    <div key={categoryKey}>
                        <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-2">{category.label}</h3>
                        <ul className="space-y-2">
                        {category.services.map((service, index) => (
                            <li
                            key={`${service}-${index}`}
                            className="flex items-center text-muted-foreground"
                            >
                            <Check className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                            <span>{getGermanServiceName(service)}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                );
            }
            return null;
        })}
      </div>
    </div>
  );
};

export default ServiceList;