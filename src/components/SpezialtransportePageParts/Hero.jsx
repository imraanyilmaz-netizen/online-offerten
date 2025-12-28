import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  const imageUrl = "https://horizons-cdn.hostinger.com/debf3bb6-240b-49e1-ac20-d04a2d77b10a/8ab4aa15ebb385ce78049a8b9b8c691e.jpg";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full bg-gray-100 py-12 md:py-16"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6 md:gap-0 items-center">
          <article className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12 rounded-l-2xl md:rounded-l-2xl" itemProp="description">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                Klaviertransport, Tresortransport & Maschinen Transport Schweiz
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold mb-2">
                Professionelle Spezialtransporte vergleichen & bis zu 40% sparen
              </p>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed font-medium"
            >
              Vergleichen Sie mehrere geprüfte Spezialtransport-Firmen für Klavier Transport, Tresor Transport und Maschinen & Geräte Transport. Erhalten Sie kostenlose Offerten von zertifizierten Transportunternehmen, die auf den sicheren Transport von wertvollen Gütern spezialisiert sind. Sicher, versichert und professionell.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport">
                  Mehrere Firmen vergleichen & Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Bis zu 40% Ersparnis möglich</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Mehrere Spezialtransport-Firmen vergleichen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Kostenlos & unverbindlich</span>
              </div>
            </motion.div>
          </article>
          <aside className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden md:pl-4" aria-label="Spezialtransport Dienstleistung Illustration">
            <figure className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              {/* Gradient Overlay for better text readability and modern look */}
              <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-transparent z-10 pointer-events-none"></div>
              
              {/* Subtle border/shadow effect */}
              <div className="absolute inset-0 rounded-2xl ring-4 ring-green-500/10 pointer-events-none z-20"></div>
              
            <img
              src={imageUrl}
                alt="Professionelle Spezialtransporte für Klaviertransport, Tresortransport und Maschinen & Geräte Transport in der Schweiz"
                className="w-full h-full object-cover rounded-2xl"
              loading="eager"
              fetchPriority="high"
                width="600"
                height="400"
                itemProp="image"
              />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full pointer-events-none z-30"></div>
              
              <figcaption className="sr-only">Spezialtransporte für Klavier, Tresor und Maschinen Transport - Mehrere Firmen vergleichen</figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;