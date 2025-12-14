import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation('privateUmzugPage');
  const router = useRouter();
  const imageUrl = 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/31d61ce9d2ebb52fb5f267adfccd6051.png';

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=privatumzug');
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full bg-gray-100 py-12 md:py-16"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-0 items-center">
          <div className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900">
                {t('hero.title')}
              </h1>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-6"
            >
              <Button
                size="lg"
                onClick={handleCtaClick}
                className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                {t('hero.ctaButton')}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">{t('hero.benefit1')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">{t('hero.benefit2')}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">{t('hero.benefit3')}</span>
              </div>
            </motion.div>
          </div>
          <div className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden">
            <img
              src={imageUrl}
              alt={t('hero.imageAlt')}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;