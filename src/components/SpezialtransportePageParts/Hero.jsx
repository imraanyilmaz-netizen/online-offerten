import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const imageUrl = "/image/b87025c3-7292-44e6-8a2c-7c1105b554bc.webp";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full bg-gray-100 pt-[5px] pb-12 md:pb-16 overflow-hidden"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Background Image - Right Side (Desktop only) */}
      <div 
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          maskImage: 'linear-gradient(to left, transparent 0%, black 10%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 10%, black 100%)'
        }}
      ></div>
      
      {/* Gradient Overlay (Desktop only) */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/90 to-transparent"></div>
      
      <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10">
        <div className="flex justify-start">
          <article className="w-full md:w-1/2 bg-gray-100 px-[1px] py-8 md:py-12 rounded-l-2xl md:rounded-l-2xl relative z-10">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 text-gray-900 leading-tight">
                <span className="block">Spezialtransporte in der Schweiz</span>
                <span className="block text-green-600 mt-2">Klavier, Tresor & Maschinen Transport</span>
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-4">
                Vergleichen Sie mehrere geprüfte Spezialtransport-Firmen für Klavier Transport, Tresor Transport und Maschinen & Geräte Transport. Erhalten Sie kostenlose Offerten von zertifizierten Transportunternehmen, die auf den sicheren Transport von wertvollen Gütern spezialisiert sind. Sicher, versichert und professionell.
              </p>
            </div>
            <div className="mb-6">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport">
                  Kostenlose Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-col gap-4 md:gap-6 max-w-md">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">100% kostenlos</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Geprüfte Partner</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Bis zu 40% sparen</span>
              </div>
            </div>
          </article>
        </div>
        
        {/* Image for Mobile/Tablet (below text) */}
        <div className="block lg:hidden mt-6">
          <img
            src={imageUrl}
            alt="Professionelle Spezialtransporte für Klaviertransport, Tresortransport und Maschinen & Geräte Transport in der Schweiz"
            className="w-full h-auto object-cover rounded-2xl shadow-lg"
            loading="eager"
            width="600"
            height="400"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;