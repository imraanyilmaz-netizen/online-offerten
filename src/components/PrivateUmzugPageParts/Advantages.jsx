import React from 'react';
import { useTranslation } from 'react-i18next';
// framer-motion removed - CSS for better INP
import { CheckCircle, Star } from 'lucide-react';

const AdvantageItem = ({ textKey, delay }) => {
  const { t } = useTranslation('privateUmzugPage');
  return (
    <li
      className="flex items-start py-2"
    >
      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
      <span className="text-gray-700">{t(textKey)}</span>
    </li>
  );
};

const Advantages = () => {
  const { t } = useTranslation('privateUmzugPage');

  return (
    <section className="pt-6 border-t border-gray-200">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 flex items-center">
        <Star size={28} className="mr-3 text-yellow-500" />
        {t('advantagesTitle')}
      </h3>
      <ul className="space-y-3">
        <AdvantageItem textKey="advantage1" delay={1} />
        <AdvantageItem textKey="advantage2" delay={2} />
        <AdvantageItem textKey="advantage3" delay={3} />
        <AdvantageItem textKey="advantage4" delay={4} />
        <AdvantageItem textKey="advantage5" delay={5} />
      </ul>
    </section>
  );
};

export default Advantages;