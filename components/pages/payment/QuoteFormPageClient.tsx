'use client'

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CustomerForm from '@/components/NewCustomerForm';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Geri eklendi - müşteri formu için
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Clock, Users, TrendingUp, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // i18n geri eklendi - SEO için
import { getLanguageFromUrl } from '@/lib/urlMap'; // Canonical URL için

const QuoteFormPageClient = () => {
  const { t, i18n, ready } = useTranslation('newCustomerForm'); // i18n geri eklendi
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // URL'den dil algılama ve i18n dilini güncelle
  useEffect(() => {
    if (!mounted) return;
    const detectedLang = getLanguageFromUrl(pathname || '/');
    if (detectedLang && i18n.language !== detectedLang) {
      // Render sırasında state güncellemesini önle
      const timeoutId = setTimeout(() => {
        i18n.changeLanguage(detectedLang);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, i18n.language, i18n, mounted]);

  useEffect(() => {
    if (!mounted) return;
    // document.documentElement.lang'ı güncelle
    document.documentElement.lang = i18n.language;
  }, [i18n.language, mounted]);
  
  // Canonical URL'i dil bazlı belirle
  const currentLang = mounted ? getLanguageFromUrl(pathname || '/') : 'de';
  const canonicalUrl = currentLang === 'en' 
    ? 'https://online-offerten.ch/free-quote-request'
    : 'https://online-offerten.ch/kostenlose-offerte-anfordern';

  // Loading state - hydration mismatch'i önlemek için
  if (!mounted || !ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  // i18n ile dinamik hero ve diğer metinler - sadece ready ve mounted olduğunda
  const heroTitle = t('quoteFormPage.heroTitle');
  const heroDescription = t('quoteFormPage.heroDescription');

  const benefits = [
    { icon: CheckCircle2, text: t('quoteFormPage.benefits.free') },
    { icon: Shield, text: t('quoteFormPage.benefits.verified') },
    { icon: Clock, text: t('quoteFormPage.benefits.fast') },
    { icon: TrendingUp, text: t('quoteFormPage.benefits.save') },
  ];

  const trustSection = {
    title: t('quoteFormPage.trustSection.title'),
    description: t('quoteFormPage.trustSection.description')
  };

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute top-4 right-4" style={{ zIndex: 9999 }}>
          <LanguageSwitcher className="" />
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 pt-12 pb-8 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-6"
            >
              <Send className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {heroDescription}
            </p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <benefit.icon className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-xs md:text-sm text-gray-700 text-center font-medium leading-tight">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Form Section */}
        <div className="relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-navbar mx-auto px-4"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <CustomerForm />
            </div>
          </motion.div>
        </div>

        {/* Additional Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative z-10 pb-12 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 md:p-8 border border-green-100 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                <Users className="w-12 h-12 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {trustSection.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {trustSection.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default QuoteFormPageClient;
