import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ShieldCheck, TrendingUp, ChevronRight, MapPin, Users } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const imageUrl = "/image/b87025c3-7292-44e6-8a2c-7c1105b554bc.webp";

  return (
    <section
      className="relative w-full bg-white pt-[5px] pb-12 md:pb-16 overflow-hidden"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 pt-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li>
              <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">
                Umzugsfirma
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="text-gray-900 font-medium" aria-current="page">
              Spezialtransporte
            </li>
          </ol>
        </nav>
        
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 text-gray-900 leading-tight">
                <span className="block">Spezialtransporte in der Schweiz</span>
                <span className="block text-green-600 mt-2">Klavier, Tresor & Maschinen Transport</span>
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                Vergleichen Sie mehrere geprüfte Umzugsfirmen für Klavier Transport, Tresor Transport und Maschinen & Geräte Transport. Erhalten Sie kostenlose Offerten von zertifizierten Transportunternehmen, die auf den sicheren Transport von wertvollen Gütern spezialisiert sind. Sicher, versichert und professionell.
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
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-700">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>Versicherte Firmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>Nur geprüfte Firmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span>Bis zu 40% sparen</span>
              </div>
            </div>
        </div>
          <div className="relative md:col-span-2">
            <div className="bg-white rounded-2xl p-0 shadow-2xl border-4 border-green-200 overflow-hidden">
          <img
            src={imageUrl}
                alt="Spezialtransporte"
                className="w-full h-full object-cover"
          />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;