import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const trustPoints = [
    'Kostenlose Registrierung',
    'Nur qualifizierte Anfragen',
    'Sie entscheiden pro Anfrage',
    'Keine langfristige Bindung',
  ];

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-4">
              <Award className="h-4 w-4 mr-2" />
              Partner werden
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Partner werden und regelmässig neue Kundenanfragen erhalten
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              Als Umzugsfirma, Reinigungsfirma oder Malerbetrieb erhalten Sie über
              Online-Offerten.ch passende Anfragen aus Ihrer Region. Die
              Registrierung ist kostenlos und Sie entscheiden bei jeder Anfrage
              selbst, ob Sie ein Angebot abgeben möchten.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="#register">
                  Jetzt als Partner registrieren
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/ueber-uns">Mehr über Online-Offerten.ch</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/fotos/5c399fc1.webp"
                alt="Partnerfirmen erhalten qualifizierte Kundenanfragen über Online-Offerten.ch"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
              <p className="font-bold text-lg leading-none">Kostenlos starten</p>
              <p className="text-xs mt-1 text-green-100">In wenigen Minuten registriert</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
