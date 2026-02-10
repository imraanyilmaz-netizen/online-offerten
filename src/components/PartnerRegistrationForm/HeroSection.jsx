import React from 'react';
// framer-motion removed - CSS for better INP

const HeroSection = () => {
  const heroTitle = "Mehr Umsatz. Weniger Aufwand.";
  const heroSubtitle = "Als Umzugsfirma, Reinigungsfirma oder Malerbetrieb erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region – einfach, fair und ohne Risiko. Starten Sie noch heute und gewinnen Sie neue Aufträge!";
  const heroButton = "Jetzt kostenlos Partner werden";
  const features = [
    "Keine Grundgebühren",
    "Qualifizierte Anfragen",
    "Volle Flexibilität"
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto max-w-navbar px-4 md:px-6 py-20 md:py-32 text-center">
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
        >
          {heroTitle}
        </h1>
        <p
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto"
        >
          {heroSubtitle}
        </p>
        <div
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-300"
        >
          {features.map((feature, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
