import React from 'react';
import HeroSection from '@/components/PartnerRegistrationForm/HeroSection';
import HowItWorksSection from '@/components/PartnerRegistrationForm/HowItWorksSection';
import BenefitsSection from '@/components/PartnerRegistrationForm/BenefitsSection';
import RegistrationForm from '@/components/PartnerRegistrationForm/RegistrationForm';

const PartnerRegistrationPage = () => {
  const canonicalPath = '/partner-werden';

  const metaTitle = "Umzugsfirma, Reinigungsfirma, Malerbetrieb & Gartenbau Partner werden | Kostenlose Registrierung";
  const metaDescription = "Werden Sie Partner für Umzug, Reinigung, Malerarbeiten & Gartenbau. Erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region. Kostenlos registrieren & mehr Aufträge gewinnen.";
  const metaKeywords = "umzugsfirma partner werden, reinigungsfirma partner werden, malerbetrieb partner werden, gartenbau partner werden, umzugsfirma registrieren, reinigungsfirma registrieren, malerfirma partner, gartenbau partner, kundenanfragen erhalten, umzugsfirma schweiz, reinigungsfirma schweiz, malerbetrieb schweiz, gartenbau schweiz, umzugsfirma anfragen, reinigungsfirma anfragen, malerfirma anfragen, gartenbau anfragen, umzugsfirma aufträge, reinigungsfirma aufträge, malerfirma aufträge, gartenbau aufträge";

  return (
    <>
      
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <RegistrationForm />
    </>
  );
};

export default PartnerRegistrationPage;
