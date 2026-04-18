'use client'

import React, { useEffect, useState } from 'react';
import CustomerForm from '@/components/NewCustomerForm';
import { useStaticT } from '@/lib/staticTranslate';

const QuoteFormPageClient = () => {
  const { ready } = useStaticT('newCustomerForm');
  const [mounted, setMounted] = useState(false);
  
  // Client-side mount kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading state - hydration mismatch'i önlemek için
  if (!mounted || !ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-background dark:via-background dark:to-emerald-950/20 relative overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 dark:border-primary"></div>
      </div>
    );
  }
  
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Tek form instance: mobile + desktop */}
        <div className="min-h-screen py-4">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-transparent">
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


