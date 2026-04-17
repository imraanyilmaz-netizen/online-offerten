import React from 'react';
// framer-motion removed - CSS for better INP
import CountryCard from './CountryCard';

const InternationalPageNavigation = ({ currentCountrySlug }) => {
  const popularDestinations = [
    { name: "Deutschland", slug: "umzug-nach-deutschland", path: "/umzug-nach-deutschland", code: "DE" },
    { name: "Frankreich", slug: "umzug-nach-frankreich", path: "/umzug-nach-frankreich", code: "FR" },
    { name: "Italien", slug: "umzug-nach-italien", path: "/umzug-nach-italien", code: "IT" },
    { name: "Österreich", slug: "umzug-nach-oesterreich", path: "/umzug-nach-oesterreich", code: "AT" },
    { name: "Spanien", slug: "umzug-nach-spanien", path: "/umzug-nach-spanien", code: "ES" },
    { name: "Portugal", slug: "umzug-nach-portugal", path: "/umzug-nach-portugal", code: "PT" },
    { name: "Belgien", slug: "umzug-nach-belgien", path: "/umzug-nach-belgien", code: "BE" },
    { name: "Dänemark", slug: "umzug-nach-daenemark", path: "/umzug-nach-daenemark", code: "DK" },
  ];

  const countriesToShow = Array.isArray(popularDestinations) 
    ? popularDestinations.filter(loc => currentCountrySlug ? loc.slug !== currentCountrySlug : true)
    : [];

  if (countriesToShow.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-border pt-10 mt-12 md:mt-16">
      <h2
        className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
      >
        Beliebte Ziele für Ihren Umzug in Europa
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countriesToShow.map((country) => (
          <div key={country.slug}>
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternationalPageNavigation;