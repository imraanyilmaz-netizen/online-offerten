import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const AveragePriceBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-green-500 to-teal-600 p-6 md:p-8 rounded-xl shadow-2xl text-white my-8 md:my-12"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Tag size={40} className="mr-4 opacity-80" />
          <div>
            <p className="text-lg font-medium">3.5-Zimmer-Wohnung</p>
            <p className="text-3xl md:text-4xl font-bold">ca. CHF 1'500</p>
            <p className="text-sm text-green-100 mt-1">(Basis: CHF 1'200 + durchschnittliche Distanz)</p>
          </div>
        </div>
        <p className="text-sm md:text-base text-green-100 max-w-xs text-center md:text-left">Durchschnittspreis für einen Standardumzug innerhalb derselben Stadt.</p>
      </div>
    </motion.div>
  );
};

export default AveragePriceBox;