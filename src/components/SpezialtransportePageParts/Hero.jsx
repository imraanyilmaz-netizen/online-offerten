import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Calculator } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const imageUrl = "/image/b87025c3-7292-44e6-8a2c-7c1105b554bc.webp";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="text-gray-900 lg:col-span-3">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-green-50 rounded-full border border-green-200">
              <span className="text-sm font-medium text-gray-700">Spezialtransporte</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              <span className="block">Spezialtransporte in der Schweiz</span>
              <span className="block text-green-600 mt-2">Klavier, Tresor & Maschinen Transport</span>
            </h1>
            
            <p className="text-base text-gray-700 mb-8 leading-relaxed max-w-2xl">
              Vergleichen Sie mehrere geprüfte Spezialtransport-Firmen für Klavier Transport, Tresor Transport und Maschinen & Geräte Transport. Erhalten Sie kostenlose Offerten von zertifizierten Transportunternehmen, die auf den sicheren Transport von wertvollen Gütern spezialisiert sind. Sicher, versichert und professionell.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                asChild
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
              >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport">
                  Kostenlose Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg" 
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 px-8 py-6 text-lg rounded-lg shadow-sm hover:shadow-md"
              >
                <Link href="/umzugskosten-rechner">
                  <Calculator className="w-5 h-5 mr-2" />
                  Kosten berechnen
                </Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">100% kostenlos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="font-medium">Geprüfte Partner</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium">Bis zu 40% sparen</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 lg:col-span-2">
            <Image
              src={imageUrl}
              alt="Professionelle Spezialtransporte für Klaviertransport, Tresortransport und Maschinen & Geräte Transport in der Schweiz"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;