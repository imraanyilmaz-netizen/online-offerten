import React from 'react';
import { motion } from 'framer-motion';
import CountryCard from './CountryCard';

const InternationalPageNavigation = ({ currentCountrySlug }) => {
  const popularDestinations = [
    { name: "Deutschland", slug: "umzug-nach-deutschland", path: "/umzugsfirma/internationale-umzuege/umzug-nach-deutschland", code: "DE" },
    { name: "Frankreich", slug: "umzug-nach-frankreich", path: "/umzugsfirma/internationale-umzuege/umzug-nach-frankreich", code: "FR" },
    { name: "Italien", slug: "umzug-nach-italien", path: "/umzugsfirma/internationale-umzuege/umzug-nach-italien", code: "IT" },
    { name: "Österreich", slug: "umzug-nach-oesterreich", path: "/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich", code: "AT" },
    { name: "Spanien", slug: "umzug-nach-spanien", path: "/umzugsfirma/internationale-umzuege/umzug-nach-spanien", code: "ES" },
    { name: "Portugal", slug: "umzug-nach-portugal", path: "/umzugsfirma/internationale-umzuege/umzug-nach-portugal", code: "PT" },
    { name: "Belgien", slug: "umzug-nach-belgien", path: "/umzugsfirma/internationale-umzuege/umzug-nach-belgien", code: "BE" },
    { name: "Dänemark", slug: "umzug-nach-daenemark", path: "/umzugsfirma/internationale-umzuege/umzug-nach-daenemark", code: "DK" },
  ];

  const countriesToShow = Array.isArray(popularDestinations) 
    ? popularDestinations.filter(loc => currentCountrySlug ? loc.slug !== currentCountrySlug : true)
    : [];

  if (countriesToShow.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-slate-200 pt-10 mt-12 md:mt-16">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center"
      >
        Beliebte Ziele für Ihren Umzug in Europa
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.05 }}
      >
        {countriesToShow.map((country) => (
           <motion.div
            key={country.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <CountryCard country={country} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InternationalPageNavigation;