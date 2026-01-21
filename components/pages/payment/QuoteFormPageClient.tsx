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
      <div className="min-h-screen bg-white">
        {/* Mobile: Full screen app-like */}
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <Send className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">
                {heroTitle}
              </h1>
            </div>
            <LanguageSwitcher className="" />
          </div>
          <div className="px-4 py-4">
            <CustomerForm />
          </div>
        </div>

        {/* Desktop: Sticky centered form */}
        <div className="hidden md:block min-h-screen py-4">
          <div className="max-w-2xl mx-auto px-4">
            <div className="sticky top-4 bg-white">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-3 mb-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {heroTitle}
                  </h1>
                </div>
                <p className="text-sm text-gray-600">
                  {heroDescription}
                </p>
              </div>

              {/* Form */}
              <CustomerForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteFormPageClient;
