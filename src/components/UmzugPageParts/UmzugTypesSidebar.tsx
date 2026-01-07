import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Globe, Truck, Box, Wind, ArrowRight, LucideIcon } from 'lucide-react';

interface UmzugType {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const umzugTypes: UmzugType[] = [
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
    title: 'Möbellift mieten',
    description: 'Bis 400 kg, max. 27m Länge',
    icon: Wind,
    link: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=moebellift'
  }
];

interface UmzugTypeItemProps {
  type: UmzugType;
  isActive?: boolean;
}

const UmzugTypeItem: React.FC<UmzugTypeItemProps> = ({ type, isActive = false }) => {
  const Icon = type.icon;
  
  return (
    <Link href={type.link} className="group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`p-5 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
          isActive
            ? 'bg-green-50 border-green-500 shadow-md'
            : 'bg-white border-gray-200 hover:border-green-400 hover:shadow-sm'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-md flex-shrink-0 ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold text-lg mb-1.5 ${isActive ? 'text-green-800' : 'text-gray-800'}`}>
              {type.title}
            </h4>
            <p className={`text-sm leading-relaxed ${isActive ? 'text-green-700' : 'text-gray-600'}`}>
              {type.description}
            </p>
          </div>
          <ArrowRight className={`w-5 h-5 mt-1 flex-shrink-0 transition-opacity ${isActive ? 'opacity-100 text-green-600' : 'opacity-0 group-hover:opacity-100 text-gray-400'}`} />
        </div>
      </motion.div>
    </Link>
  );
};

interface UmzugTypesSidebarProps {
  activeType?: string | null;
}

const UmzugTypesSidebar: React.FC<UmzugTypesSidebarProps> = ({ activeType = null }) => {
  return (
    <div className="bg-white p-7 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Umzugstypen
      </h3>
      <nav className="space-y-3">
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


