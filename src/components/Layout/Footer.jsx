import Link from 'next/link';
import React from 'react';
import { Mail, MapPin, Building2, Sparkles, FileText, Send } from 'lucide-react';

const Footer = React.memo(() => {
  // Removed useTranslation
  const currentYear = new Date().getFullYear();

  // Hauptstädte und wichtige Städte
  const hauptstaedte = [
    { to: '/umzugsfirma-in-der-naehe/zuerich', text: 'Zürich' },
    { to: '/umzugsfirma-in-der-naehe/bern', text: 'Bern' },
    { to: '/umzugsfirma-in-der-naehe/basel', text: 'Basel' },
    { to: '/umzugsfirma-in-der-naehe/luzern', text: 'Luzern' },
    { to: '/umzugsfirma-in-der-naehe/st-gallen', text: 'St. Gallen' },
    { to: '/umzugsfirma-in-der-naehe/genf', text: 'Genf' },
    { to: '/umzugsfirma-in-der-naehe/lausanne', text: 'Lausanne' },
    { to: '/umzugsfirma-in-der-naehe/lugano', text: 'Lugano' },
  ];

  // Weitere wichtige Städte
  const weitereStaedte = [
    { to: '/umzugsfirma-in-der-naehe/aargau', text: 'Aargau' },
    { to: '/umzugsfirma-in-der-naehe/thun', text: 'Thun' },
    { to: '/umzugsfirma-in-der-naehe/biel-bienne', text: 'Biel/Bienne' },
  ];

  // Umzug Services
  const umzugServices = [
    { to: '/umzugsfirma/privatumzug', text: 'Privatumzug' },
    { to: '/umzugsfirma/geschaeftsumzug', text: 'Geschäftsumzug' },
    { to: '/umzugsfirma/internationale-umzuege', text: 'Internationale Umzüge' },
    { to: '/umzugsfirma/spezialtransporte', text: 'Spezialtransporte' },
    { to: '/umzugsfirma/spezialtransporte/klaviertransport', text: 'Klaviertransport' },
  ];

  // Haupt Reinigungsdienstleistungen
  const hauptReinigung = [
    { to: '/reinigung/wohnungsreinigung', text: 'Wohnungsreinigung' },
    { to: '/reinigung/hausreinigung', text: 'Hausreinigung' },
    { to: '/reinigung/bueroreinigung', text: 'Büroreinigung' },
    { to: '/reinigung/umzugsreinigung', text: 'Umzugsreinigung' },
    { to: '/reinigung/unterhaltsreinigung', text: 'Unterhaltsreinigung' },
    { to: '/reinigung/grundreinigung', text: 'Grundreinigung' },
  ];

  // Weitere Reinigungsdienstleistungen
  const weitereReinigung = [
    { to: '/reinigung/baureinigung', text: 'Baureinigung' },
    { to: '/reinigung/fensterreinigung', text: 'Fensterreinigung' },
    { to: '/reinigung/bodenreinigung', text: 'Bodenreinigung' },
    { to: '/reinigung/fassadenreinigung', text: 'Fassadenreinigung' },
    { to: '/reinigung/hofreinigung', text: 'Hofreinigung' },
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
    { to: '/malerarbeitenkosten', text: 'Malerarbeiten kosten' },
    { to: '/umzugsofferten', text: 'Umzugsofferte' },
    { to: '/guenstig-umziehen', text: 'Günstig umziehen' },
    { to: '/umzugsfirma-vergleichen', text: 'Umzugsfirma vergleichen' },
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
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Send className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Online-Offerten.ch</span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-md">
              Online-Offerten.ch ist eine unabhängige Schweizer Vermittlungsplattform für Umzugs-, Reinigungs- und Malerofferten.
              <br /><br />
              Wir verbinden Privat- und Geschäftskunden mit geprüften, regionalen Partnerfirmen in der ganzen Schweiz.
              <br /><br />
              Nach dem Ausfüllen des Formulars wird Ihre Anfrage an bis zu 5 passende Anbieter in Ihrer Nähe weitergeleitet.
              <br /><br />
              Die Partnerfirmen kontaktieren Sie direkt mit individuellen Offerten. Der Vergleich ist 100 % kostenlos und unverbindlich – die Entscheidung liegt vollständig bei Ihnen.
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
              Services
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-300 uppercase tracking-wider">Umzug</h4>
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
                <h4 className="text-sm font-semibold mb-3 text-slate-300 uppercase tracking-wider">Kosten & Tools</h4>
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
              <div>
                <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Weitere</h4>
                <ul className="space-y-2.5">
                  {weitereReinigung.map(link => (
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
          </div>

          {/* Standorte & Company Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h3 className="text-base font-bold mb-6 text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              Standorte
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Hauptstädte</h4>
                <ul className="space-y-2.5">
                  {hauptstaedte.map(link => (
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
                <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Weitere Städte</h4>
                <ul className="space-y-2.5">
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
              Unternehmen
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-300 uppercase tracking-wider">Firmen finden</h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/umzugsfirma-in-der-naehe" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                      Umzugsfirma finden
                    </Link>
                  </li>
                  <li>
                    <Link href="/reinigungsfirma-in-der-naehe" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                      Reinigungsfirma finden
                    </Link>
                  </li>
                  <li>
                    <Link href="/malerfirma-in-der-naehe" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                      Malerfirma finden
                    </Link>
                  </li>
            </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-3 text-slate-300 uppercase tracking-wider">Unternehmen</h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/ueber-uns" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                      Über uns
                    </Link>
                  </li>
                  <li>
                    <Link href="/kontakt" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                      Kontakt
                    </Link>
                  </li>
                  <li>
                    <Link href="/partner-werden" className="text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
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