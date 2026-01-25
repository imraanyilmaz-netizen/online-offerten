import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building2, Globe, Truck, Box, Wind, ArrowRight, LucideIcon, Sparkles, Calculator, ListChecks } from 'lucide-react';

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
    <Button asChild variant="outline" className={`w-full justify-start gap-3 text-left h-auto py-2 ${isActive ? 'border-green-500 bg-green-50' : ''}`}>
      <Link href={type.link}>
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-green-600' : 'text-green-600'}`} />
        <span className="flex-grow">
          <span className={`block font-semibold ${isActive ? 'text-green-800' : 'text-gray-800'}`}>{type.title}</span>
          <span className={`block text-xs mt-0.5 ${isActive ? 'text-green-700' : 'text-gray-600'}`}>{type.description}</span>
        </span>
      </Link>
    </Button>
  );
};

interface UmzugTypesSidebarProps {
  activeType?: string | null;
  hiddenTypes?: string[];
}

const UmzugTypesSidebar: React.FC<UmzugTypesSidebarProps> = ({ activeType = null, hiddenTypes = [] }) => {
  const filteredTypes = umzugTypes.filter(type => !hiddenTypes.includes(type.id));
  
  return (
    <div className="space-y-8">
      {/* Umzugstypen Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Umzugstypen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredTypes.map((type) => (
            <UmzugTypeItem
              key={type.id}
              type={type}
              isActive={activeType === type.id}
            />
          ))}
        </CardContent>
      </Card>

      {/* Helpful Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hilfreiche Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild variant="outline" className="w-full justify-start gap-3 text-left h-auto py-2">
            <Link href="/umzugsfirma/umzugskosten">
              <Calculator className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="flex-grow">Umzugskosten-Rechner</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start gap-3 text-left h-auto py-2">
            <Link href="/umzugsfirma/checklists">
              <ListChecks className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="flex-grow">Checklisten</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UmzugTypesSidebar;


