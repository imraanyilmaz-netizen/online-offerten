'use client'

import React from 'react';
import Link from 'next/link';
// Removed useTranslation
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const PaymentCancelPageClient = () => {
  // Removed useTranslation

  return (
    <>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Zahlung abgebrochen</h1>
          <p className="text-gray-600 mb-8">Der Zahlungsvorgang wurde nicht abgeschlossen. Sie können es erneut versuchen.</p>
          <Button asChild size="lg">
            <Link href="/partner/credit-top-up">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Zurück zur Guthabenaufladung
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default PaymentCancelPageClient;