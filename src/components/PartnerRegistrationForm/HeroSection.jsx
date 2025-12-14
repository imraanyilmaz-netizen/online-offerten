import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const heroTitle = "Mehr Umsatz. Weniger Aufwand.";
  const heroSubtitle = "Als Umzugsfirma, Reinigungsfirma, Malerbetrieb oder Gartenbau-Unternehmen erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region – einfach, fair und ohne Risiko. Starten Sie noch heute und gewinnen Sie neue Aufträge!";
  const heroButton = "Jetzt kostenlos Partner werden";
  const features = [
    "Keine Grundgebühren",
    "Qualifizierte Anfragen",
    "Volle Flexibilität"
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto max-w-navbar px-4 md:px-6 py-20 md:py-32 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex justify-center mb-6"
        >
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/fa7a3b21862e4bfea7280ee726140c80.png" alt="Partner Icon" className="h-20 w-20" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
        >
          {heroTitle}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto"
        >
          {heroSubtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-300"
        >
          {features.map((feature, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {feature}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
