import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import ServiceSelector from './ServiceSelector';

const Sidebar = () => {
  const { t } = useTranslation('privateUmzugPage');

  return (
    <motion.aside 
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="lg:col-span-1 space-y-8 self-start sticky top-28"
    >
      <ServiceSelector />

      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users size={24} className="mr-2 text-blue-500" />
          Professionelles Team
        </h3>
        <img  
          alt="Ein professionelles Umzugsteam, das Möbel transportiert" 
          className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/021faa27c88d2aec378906ffc232e35c.png" />
        <p className="text-sm text-gray-600 mt-2">Unsere Teams sind erfahren und zuverlässig.</p>
      </div>

      <div className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200 transform hover:scale-105 transition-transform duration-300">
        <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
          <Users size={24} className="mr-2" />
          {t('sidebar.testimonialTitle')}
        </h3>
        <blockquote className="text-green-600 italic text-base">
          "{t('sidebar.testimonialText')}"
        </blockquote>
        <p className="text-right text-sm text-green-700 font-medium mt-3">- {t('sidebar.testimonialAuthor')}</p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;