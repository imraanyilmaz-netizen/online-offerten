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
  
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Tek form instance: mobile + desktop */}
        <div className="min-h-screen py-4">
          <div className="max-w-5xl mx-auto px-4">
            <div className="md:sticky md:top-4 bg-white">
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


