import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Paintbrush, ArrowRight } from 'lucide-react';

const Cta = () => {
  return (
    <div
      className="mt-20 text-center bg-white p-8 md:p-12 rounded-2xl shadow-2xl"
    >
      <Paintbrush className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Bereit für einen neuen Anstrich?
      </h2>
      <Button
        asChild
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white group px-10 py-7 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Link href="/kostenlose-offerte-anfordern?service=maler&step=2">
          Jetzt Kostenlose Offerten Anfordern
          <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </Button>
    </div>
  );
};

export default Cta;