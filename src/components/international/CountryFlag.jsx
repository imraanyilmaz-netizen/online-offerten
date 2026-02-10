import React from 'react';
import Flag from 'react-world-flags';
import { countries } from '@/data/countries';

const CountryFlag = ({ countryCode, className }) => {
  if (!countryCode) {
    return null;
  }

  const country = countries.find(c => c.code.toLowerCase() === countryCode.toLowerCase());
  
  if (!country) {
    return null;
  }

  return (
    <Flag code={country.code} className={className} />
  );
};

export default CountryFlag;