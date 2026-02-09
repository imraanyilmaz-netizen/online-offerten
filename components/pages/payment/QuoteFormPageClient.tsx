'use client'

import React, { useEffect, useState } from 'react';
import CustomerForm from '@/components/NewCustomerForm';
import { useTranslation } from 'react-i18next';

const QuoteFormPageClient = () => {
  const { t, ready } = useTranslation('newCustomerForm');
  const [mounted, setMounted] = useState(false);
  
  // Client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

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
        {/* Header - Mobile & Desktop */}
        <div className="text-center border-b border-gray-200 pb-3 mb-4 px-4 pt-4 md:pt-0">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
            {heroTitle}
          </h1>
          <p className="text-sm text-gray-600">
            {heroDescription}
          </p>
        </div>

        {/* Mobile */}
        <div className="md:hidden bg-white">
          <div className="px-4 pb-4">
            <CustomerForm />
          </div>
        </div>

        {/* Desktop: Sticky centered form */}
        <div className="hidden md:block min-h-screen py-4">
          <div className="max-w-5xl mx-auto px-4">
            <div className="sticky top-4 bg-white">
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
