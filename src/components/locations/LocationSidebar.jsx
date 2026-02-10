import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS for better INP
import { MapPin, Search, ArrowRight, Home, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LocationSidebar = ({ city, districts, searches }) => {

  const getIconColor = (city) => {
    switch (city) {
      case 'Zürich':
        return 'text-blue-600';
      case 'Basel':
        return 'text-indigo-600';
      case 'Luzern':
        return 'text-sky-600';
      default:
        return 'text-gray-600';
    }
  };

  const getBadgeColor = (city) => {
    switch (city) {
      case 'Zürich':
        return 'bg-blue-100 text-blue-800';
      case 'Basel':
        return 'bg-indigo-100 text-indigo-800';
      case 'Luzern':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getArrowColor = (city) => {
    switch (city) {
      case 'Zürich':
        return 'text-blue-500';
      case 'Basel':
        return 'text-indigo-500';
      case 'Luzern':
        return 'text-sky-500';
      default:
        return 'text-gray-500';
    }
  };

  const iconColor = getIconColor(city);
  const badgeColor = getBadgeColor(city);
  const arrowColor = getArrowColor(city);
  
  const helperItems = [
    {
      icon: Home,
      title: "Umzug",
      description: "Privat- oder Geschäftsumzug",
      link: `/kostenlose-offerte-anfordern?service=umzug&city=${city}`,
      buttonText: "Offerte anfordern"
    },
    {
      icon: Sparkles,
      title: "Reinigung",
      description: "Mit Abnahmegarantie",
      link: `/kostenlose-offerte-anfordern?service=reinigung&city=${city}`,
      buttonText: "Offerte anfordern"
    },
    {
      icon: Trash2,
      title: "Entsorgung",
      description: "Räumung von Wohnungen & Kellern",
      link: `/kostenlose-offerte-anfordern?service=raeumung&city=${city}`,
      buttonText: "Offerte anfordern"
    }
  ];

  return (
    <aside
      className="lg:col-span-2 space-y-8 sticky top-28 w-full min-w-0 overflow-x-hidden"
    >
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 w-full min-w-0 overflow-x-hidden">
        <h3 className={`text-xl font-bold text-gray-800 mb-5 break-words`}>
          Kostenlose Offerte Anfordern
        </h3>
        <div className="space-y-4 w-full">
          {helperItems.map((item, index) => (
            <div key={index} className="bg-gray-50/70 p-4 rounded-lg flex items-center gap-4 w-full min-w-0 overflow-x-hidden">
              <item.icon className={`w-8 h-8 flex-shrink-0 ${iconColor}`} />
              <div className="flex-grow min-w-0">
                <p className="font-semibold text-gray-800 break-words">{item.title}</p>
                <p className="text-sm text-gray-600 break-words">{item.description}</p>
              </div>
              <Button asChild size="sm" variant="outline" className="flex-shrink-0 bg-white">
                <Link href={item.link} className="whitespace-nowrap">{item.buttonText}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {districts && Array.isArray(districts.list) && (
        <div className="bg-white p-6 rounded-xl shadow-xl w-full min-w-0 overflow-x-hidden">
          <h3 className={`text-xl font-semibold text-gray-800 mb-4 flex items-center break-words`}>
            <MapPin size={24} className={`mr-2 flex-shrink-0 ${iconColor}`} />
            <span className="break-words">{districts.title}</span>
          </h3>
          <p className="text-sm text-gray-600 mb-4 break-words w-full">{districts.text}</p>
          <div className="flex flex-wrap gap-2 w-full">
            {districts.list.map((district, i) => (
              <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColor} break-words`}>{district}</span>
            ))}
          </div>
        </div>
      )}
      
      {searches && Array.isArray(searches.list) && (
        <div className="bg-white p-6 rounded-xl shadow-xl w-full min-w-0 overflow-x-hidden">
          <h3 className={`text-xl font-semibold text-gray-800 mb-4 flex items-center break-words`}>
            <Search size={24} className={`mr-2 flex-shrink-0 ${iconColor}`} />
            <span className="break-words">{searches.title}</span>
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 w-full">
            {searches.list.map((search, i) => (
               <li key={i} className="flex items-start w-full min-w-0">
                   <ArrowRight size={14} className={`mr-2 mt-0.5 flex-shrink-0 ${arrowColor}`} />
                   <span className="break-words">{search}</span>
                </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default LocationSidebar;