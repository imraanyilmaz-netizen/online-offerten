import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck } from 'lucide-react';

const Cta = () => {
  return (
    <section
      className="bg-gradient-to-r from-green-600 to-green-800"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6 py-16 md:py-20 text-center text-white">
        <Truck className="w-16 h-16 text-white/50 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Bereit für Ihren Spezialtransport?
        </h2>
        <p className="text-lg md:text-xl text-green-200 max-w-3xl mx-auto mb-8">
          Egal wie anspruchsvoll Ihr Transportgut ist, wir finden den richtigen Partner für Sie. Fordern Sie jetzt Ihre kostenlosen und unverbindlichen Offerten an.
        </p>
        <Button
          asChild
          size="xl"
          className="bg-white text-green-700 hover:bg-green-50 group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport">
            Jetzt Offerten anfordern
            <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Cta;