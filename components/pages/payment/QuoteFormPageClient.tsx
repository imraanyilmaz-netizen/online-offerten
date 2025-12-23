'use client'

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CustomerForm from '@/components/NewCustomerForm';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Geri eklendi - müşteri formu için
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
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

        {/* Form Section */}
        <div className="relative z-10 pb-8 pt-4 md:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
                className="pt-4 pb-3 px-6 md:px-8 text-center border-b border-gray-200"
        >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-sm">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {heroTitle}
            </h1>
                </div>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {heroDescription}
            </p>
        </motion.div>

              <CustomerForm />
            </div>
          </motion.div>
        </div>

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
