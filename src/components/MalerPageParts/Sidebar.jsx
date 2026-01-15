import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  { text: "100% Kostenlos & Unverbindlich", icon: CheckCircle },
  { text: "Geprüfte Malerfirmen", icon: ShieldCheck },
  { text: "Bis zu 40% sparen", icon: CheckCircle },
  { text: "Schnell & Einfach", icon: Users },
  { text: "Regionale Anbieter", icon: CheckCircle },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="lg:col-span-2 space-y-8"
    >
      <div className="bg-green-50 p-6 md:p-8 rounded-2xl shadow-xl border border-green-200">
        <h3 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
          <ShieldCheck size={28} className="mr-3" />
          Ihre Vorteile bei uns
        </h3>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <li key={index} className="flex items-start text-lg">
                <Icon className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-green-900">{benefit.text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Finden Sie den besten Maler
        </h3>
        <img alt="Lächelnder Maler mit Farbrolle" className="w-full h-56 object-cover rounded-lg shadow-md mb-4" src="/image/malerarbeit.webp" loading="lazy" decoding="async" />
        <p className="text-gray-600 mb-5">Starten Sie jetzt Ihren Vergleich und verschönern Sie Ihr Zuhause.</p>
        <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white group">
          <Link href="/kostenlose-offerte-anfordern?service=maler&step=2">
            Jetzt Kostenlose Offerten Anfordern
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;