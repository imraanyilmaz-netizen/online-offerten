import Link from 'next/link';
import React from 'react';
import { Mail, MapPin, Building2, Sparkles, FileText, Send } from 'lucide-react';

const Footer = React.memo(() => {
  // Removed useTranslation
  const currentYear = new Date().getFullYear();

  // Hauptstädte und wichtige Städte
  const hauptstaedte = [
    { to: '/umzugsfirma/zuerich', text: 'Zürich' },
    { to: '/umzugsfirma/bern', text: 'Bern' },
    { to: '/umzugsfirma/basel', text: 'Basel' },
    { to: '/umzugsfirma/luzern', text: 'Luzern' },
    { to: '/umzugsfirma/st-gallen', text: 'St. Gallen' },
  ];

  // Weitere wichtige Städte
  const weitereStaedte = [
    { to: '/umzugsfirma/aargau', text: 'Aargau' },
    { to: '/umzugsfirma/genf', text: 'Genf' },
  ];

  // Umzug Services
  const umzugServices = [
    { to: '/umzugsfirma/privatumzug', text: 'Privatumzug' },
    { to: '/umzugsfirma/geschaeftsumzug', text: 'Geschäftsumzug' },
    { to: '/umzugsfirma/internationale-umzuege', text: 'Internationale Umzüge' },
    { to: '/umzugsfirma/spezialtransporte/klaviertransport', text: 'Klaviertransport' },
  ];

  // Haupt Reinigungsdienstleistungen
  const hauptReinigung = [
    { to: '/reinigung/wohnungsreinigung', text: 'Wohnungsreinigung' },
    { to: '/reinigung/hausreinigung', text: 'Hausreinigung' },
    { to: '/reinigung/bueroreinigung', text: 'Büroreinigung' },
    { to: '/reinigung/umzugsreinigung', text: 'Umzugsreinigung' },
    { to: '/reinigung/unterhaltsreinigung', text: 'Unterhaltsreinigung' },
    { to: '/reinigung/fensterreinigung', text: 'Fensterreinigung' },
  ];

  // Weitere Services
  const weitereServices = [
    { to: '/malerarbeitenkosten', text: 'Malerarbeiten' },
    { to: '/raeumung-entsorgung', text: 'Räumung & Entsorgung' },
  ];

  // Kosten & Tools
  const kostenTools = [
    { to: '/umzugsfirma/umzugskosten', text: 'Umzugskosten Rechner' },
    { to: '/reinigung/reinigungskosten', text: 'Reinigungskosten Rechner' },
    { to: '/umzugsfirma-vergleichen', text: 'Umzugsfirma vergleichen' },
    { to: '/kostenlose-offerte-anfordern', text: 'Kostenlose Offerten anfordern' },
  ];

  // Unternehmen
  const unternehmenLinks = [
    { to: '/ueber-uns', text: 'Über uns' },
    { to: '/kontakt', text: 'Kontakt' },
  ];

  return (
    <footer 
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-12 flex-shrink-0 footer-fixed-height relative overflow-hidden"
      style={{ contain: 'layout style paint' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 mb-16">
          
          {/* Logo & Beschreibung */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm flex-shrink-0">
                <Send className="w-[18px] h-[18px] text-white" />
              </span>
              <span
                className="text-[22px] md:text-2xl lg:text-[26px] leading-none font-bold italic tracking-tight text-white group-hover:text-green-400 transition-colors"
                style={{ fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif', fontSynthesis: 'none' }}
              >
                Online-Offerten.ch
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-md">
              Online-Offerten.ch ist ein Vergleichsportal fuer Umzug, Reinigung und Malerarbeiten in der Schweiz.
              <br /><br />
              Nach einer einzigen Anfrage erhalten Sie bis zu 5 Offerten von geprueften Firmen aus Ihrer Region - kostenlos und unverbindlich.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@online-offerten.ch" className="hover:text-green-400 transition-colors">
                info@online-offerten.ch
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold mb-6 text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-400" />
              Umzug
            </h3>
            <div className="space-y-6">
              <div>
                <ul className="space-y-2.5">
              {umzugServices.map(link => (
                <li key={link.to}>
                      <Link href={link.to} className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                        {link.text}
                      </Link>
                </li>
              ))}
            </ul>
              </div>
            
              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-300 uppercase tracking-wider">Weitere Services</h4>
                <ul className="space-y-2.5">
              {weitereServices.map(link => (
                <li key={link.to}>
                      <Link href={link.to} className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                        {link.text}
                      </Link>
                </li>
              ))}
            </ul>
              </div>
            
              <div>
              </div>
            </div>
          </div>

          {/* Reinigung Services */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-base font-bold mb-6 text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-400" />
              Reinigung
            </h3>
            <div className="space-y-6">
              <ul className="space-y-2.5">
                {hauptReinigung.map(link => (
                  <li key={link.to}>
                    <Link href={link.to} className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Standorte & Company Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-base font-bold mb-6 text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              Standorte
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Schweiz</h4>
                <ul className="space-y-2.5">
                  {hauptstaedte.map(link => (
                    <li key={link.to}>
                      <Link href={link.to} className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  {weitereStaedte.map(link => (
                    <li key={link.to}>
                      <Link href={link.to} className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link href="/standorte" className="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></span>
                      Alle Standorte →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Company & Legal */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-base font-bold mb-6 text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
              Kosten & Tools
            </h3>
            <div className="space-y-6">
              <div>
                <ul className="space-y-2.5">
                  {kostenTools.map(link => (
                    <li key={link.to}>
                      <Link href={link.to} className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-300 uppercase tracking-wider">Unternehmen</h4>
                <ul className="space-y-2.5">
                  {unternehmenLinks.map(link => (
                    <li key={link.to}>
                      <Link href={link.to} className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link
                      href="/partner-werden"
                      className="inline-flex items-center justify-center rounded-md border border-green-600 text-green-600 hover:bg-green-50 px-3 py-1.5 text-sm font-semibold transition-colors"
                    >
                      Partner werden
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {currentYear} Online-Offerten.ch. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="/datenschutz" className="hover:text-green-400 transition-colors">Datenschutz</Link>
              <span className="text-slate-600">•</span>
              <Link href="/agb" className="hover:text-green-400 transition-colors">AGB</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;