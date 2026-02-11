import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink } from 'lucide-react';

const RegionalDifferences = () => {
  const cities = [
    { name: "Zürich", link: "umzugsfirma/zuerich" },
    { name: "Basel", link: "umzugsfirma/basel" },
    { name: "Bern", link: "umzugsfirma/bern" },
    { name: "Luzern", link: "umzugsfirma/luzern" },
    { name: "Genf", link: "umzugsfirma/genf" },
    { name: "St. Gallen", link: "umzugsfirma/st-gallen" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city, index) => {
        if (!city.link) return null;

        return (
          <div
            key={index}
          >
            <Button 
              asChild
              variant="outline" 
              className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-gray-100 group"
            >
              <Link href={`/${city.link}`}>
                <MapPin size={18} className="mr-3 text-gray-500 flex-shrink-0" />
                <span className="flex-grow font-medium">{city.name}</span>
                <Badge variant="secondary" className="ml-auto group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                  Infos
                  <ExternalLink size={14} className="ml-1.5 opacity-70" />
                </Badge>
              </Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default RegionalDifferences;