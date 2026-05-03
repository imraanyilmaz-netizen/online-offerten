import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  const heroImageUrl = "https://online-offerten.ch/bilder/malerarbeiten-600-400.webp";

  return (
    <section
      className="relative w-full bg-gray-100 py-12 md:py-16"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-0 items-center">
          <div className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12">
            <div
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900">
                Maler Offerten Schweiz: Günstig und professionell streichen lassen
              </h1>
            </div>
            <p
              className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed"
            >
              Fordern Sie jetzt kostenlos und unverbindlich Offerten von qualifizierten Malerfirmen aus Ihrer Region an. Vergleichen Sie Preise und Leistungen und finden Sie den besten Deal für Ihr Projekt.
            </p>
            <div
              className="mb-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Link href="/kostenlose-offerte-anfordern?service=maler&step=2">
                  Jetzt kostenlose Offerten anfordern →
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div
              className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Bis zu 40% sparen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Nur geprüfte Firmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">100% kostenlos & unverbindlich</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden">
            <img
              src={heroImageUrl}
              alt="Professionelle Malerarbeiten"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;