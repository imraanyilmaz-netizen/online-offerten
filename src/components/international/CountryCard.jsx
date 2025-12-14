import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Flag from 'react-world-flags';

const CountryCard = ({ country }) => {
  // Use the path from country object, otherwise use slug
  const basePath = country.path || `/${country.slug}`;
  const linkTo = basePath;
  
  return (
    <Link href={linkTo} 
      className="group relative flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-green-500 hover:-translate-y-1 overflow-hidden"
    >
      <Flag code={country.code} className="w-10 h-auto rounded-md shadow-sm" />
      <span className="font-semibold text-slate-700 group-hover:text-green-600 flex-grow ml-4">{country.name}</span>
      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-600 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
};

export default CountryCard;