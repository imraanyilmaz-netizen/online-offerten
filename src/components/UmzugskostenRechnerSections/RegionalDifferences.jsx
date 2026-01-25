import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink } from 'lucide-react';

const RegionalDifferences = () => {
  const cities = [
    { name: "Zürich", link: "umzugsfirma-in-der-naehe/zuerich" },
    { name: "Basel", link: "umzugsfirma-in-der-naehe/basel" },
    { name: "Bern", link: "umzugsfirma-in-der-naehe/bern" },
    { name: "Luzern", link: "umzugsfirma-in-der-naehe/luzern" },
    { name: "Genf", link: "umzugsfirma-in-der-naehe/genf" },
    { name: "St. Gallen", link: "umzugsfirma-in-der-naehe/st-gallen" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city, index) => {
        if (!city.link) return null;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
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
          </motion.div>
        );
      })}
    </div>
  );
};

export default RegionalDifferences;