import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Globe, Truck, Box, Wind, ArrowRight } from 'lucide-react';

const umzugTypes = [
  {
    id: 'privatumzug',
    title: 'Privatumzug',
    description: 'Wohnung, Haus, WG-Zimmer',
    icon: Home,
    link: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug'
  },
  {
    id: 'geschaeftsumzug',
    title: 'Geschäftsumzug',
    description: 'Büro, Ladenlokal, Werkstatt',
    icon: Building2,
    link: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug'
  },
  {
    id: 'international',
    title: 'Internationaler Umzug',
    description: 'Umzüge ins oder aus dem Ausland',
    icon: Globe,
    link: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international'
  },
  {
    id: 'spezialtransport',
    title: 'Spezialtransport',
    description: 'Klavier, Tresor, Kunst & mehr',
    icon: Truck,
    link: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport'
  },
  {
    id: 'kleintransport',
    title: 'Kleintransport',
    description: 'Einzelne Möbel, kleine Lasten',
    icon: Box,
    link: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=kleintransport'
  },
  {
    id: 'moebellift',
    title: 'Möbellift',
    description: 'Bis 400 kg, max. 27m Länge',
    icon: Wind,
    link: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=moebellift'
  }
];

const UmzugTypeItem = ({ type, isActive = false }) => {
  const Icon = type.icon;
  
  return (
    <Link href={type.link}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer mb-3 ${
          isActive
            ? 'bg-green-50 border-green-500 shadow-md'
            : 'bg-white border-gray-200 hover:border-green-400 hover:shadow-sm'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-md ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className={`font-semibold text-base mb-1 ${isActive ? 'text-green-800' : 'text-gray-800'}`}>
              {type.title}
            </h4>
            <p className={`text-sm ${isActive ? 'text-green-700' : 'text-gray-600'}`}>
              {type.description}
            </p>
          </div>
          <ArrowRight className={`w-4 h-4 mt-1 transition-opacity ${isActive ? 'opacity-100 text-green-600' : 'opacity-0 group-hover:opacity-100 text-gray-400'}`} />
        </div>
      </motion.div>
    </Link>
  );
};

const UmzugTypesSidebar = ({ activeType = null }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Umzugstypen
      </h3>
      <nav className="space-y-2">
        {umzugTypes.map((type) => (
          <UmzugTypeItem
            key={type.id}
            type={type}
            isActive={activeType === type.id}
          />
        ))}
      </nav>
    </div>
  );
};

export default UmzugTypesSidebar;

