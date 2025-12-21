import Link from 'next/link';
import React from 'react';
// Removed useTranslation
import { logoUrl } from '@/assets/logoConstants.js';
// Removed getLocalizedUrl

const Footer = React.memo(() => {
  // Removed useTranslation
  const currentYear = new Date().getFullYear();

  // Hauptstädte und wichtige Städte
  const hauptstaedte = [
    { to: '/umzugsfirma-zuerich', text: 'Zürich' },
    { to: '/umzugsfirma-bern', text: 'Bern' },
    { to: '/umzugsfirma-basel', text: 'Basel' },
    { to: '/umzugsfirma-luzern', text: 'Luzern' },
    { to: '/umzugsfirma-st-gallen', text: 'St. Gallen' },
    { to: '/umzugsfirma-genf', text: 'Genf' },
    { to: '/umzugsfirma-lausanne', text: 'Lausanne' },
    { to: '/umzugsfirma-lugano', text: 'Lugano' },
  ];

  // Weitere wichtige Städte
  const weitereStaedte = [
    { to: '/umzugsfirma-winterthur', text: 'Winterthur' },
    { to: '/umzugsfirma-aargau', text: 'Aargau' },
    { to: '/umzugsfirma-thun', text: 'Thun' },
    { to: '/umzugsfirma-biel-bienne', text: 'Biel/Bienne' },
  ];

  // Umzug Services
  const umzugServices = [
    { to: '/privatumzug', text: 'Privatumzug' },
    { to: '/geschaeftsumzug', text: 'Geschäftsumzug' },
    { to: '/internationale-umzuege', text: 'Internationale Umzüge' },
    { to: '/spezialtransporte', text: 'Spezialtransporte' },
    { to: '/klaviertransport', text: 'Klaviertransport' },
  ];

  // Haupt Reinigungsdienstleistungen
  const hauptReinigung = [
    { to: '/wohnungsreinigung', text: 'Wohnungsreinigung' },
    { to: '/hausreinigung', text: 'Hausreinigung' },
    { to: '/bueroreinigung', text: 'Büroreinigung' },
    { to: '/umzugsreinigung', text: 'Umzugsreinigung' },
    { to: '/unterhaltsreinigung', text: 'Unterhaltsreinigung' },
    { to: '/grundreinigung', text: 'Grundreinigung' },
  ];

  // Weitere Reinigungsdienstleistungen
  const weitereReinigung = [
    { to: '/baureinigung', text: 'Baureinigung' },
    { to: '/fensterreinigung', text: 'Fensterreinigung' },
    { to: '/bodenreinigung', text: 'Bodenreinigung' },
    { to: '/fassadenreinigung', text: 'Fassadenreinigung' },
    { to: '/hofreinigung', text: 'Hofreinigung' },
  ];

  // Weitere Services
  const weitereServices = [
    { to: '/malerarbeiten', text: 'Malerarbeiten' },
    { to: '/gartenarbeiten', text: 'Gartenarbeiten' },
    { to: '/raeumung-entsorgung', text: 'Räumung & Entsorgung' },
  ];

  // Kosten & Tools
  const kostenTools = [
    { to: '/umzugskosten-rechner', text: 'Umzugskosten Rechner' },
    { to: '/reinigungskosten-rechner', text: 'Reinigungskosten Rechner' },
    { to: '/guenstig-umziehen', text: 'Günstig umziehen' },
    { to: '/umzugsfirma-vergleichen', text: 'Umzugsfirma vergleichen' },
  ];

  return (
    <footer 
      className="bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 text-white pt-16 pb-8 flex-shrink-0 footer-fixed-height"
      style={{ contain: 'layout style paint' }}
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mb-12" style={{ minHeight: '350px' }}>
          
          {/* Logo & Beschreibung */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img 
                src={logoUrl} 
                alt="Online-Offerten.ch Logo" 
                loading="eager"
                className="h-10 w-10" 
                width="40" 
                height="40"
                style={{ display: 'block', flexShrink: 0 }}
              />
              <span className="text-xl font-bold text-white">Online-Offerten.ch</span>
            </Link>
            <p className="text-sm text-gray-400 pr-4 mb-6">Online-Offerten.ch – Ihr zuverlässiges Portal für Umzugsofferten, Reinigungsofferten, Malerofferten und Gärtnerofferten in der ganzen Schweiz. Vergleichen Sie online geprüfte Firmen und sparen Sie bis zu 40%. Finden Sie schnell und einfach den passenden Partner für Ihren Umzug oder Ihr Projekt – unverbindlich und transparent.</p>
          </div>

          {/* Umzug, Weitere Services & Kosten & Tools - 2. Kolon */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Umzug</h3>
            <ul className="space-y-2 text-gray-400 text-sm mb-6">
              {umzugServices.map(link => (
                <li key={link.to}>
                  <Link href={link.to} className="hover:text-green-400 transition-colors">{link.text}</Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Weitere Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm mb-6">
              {weitereServices.map(link => (
                <li key={link.to}>
                  <Link href={link.to} className="hover:text-green-400 transition-colors">{link.text}</Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Kosten & Tools</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {kostenTools.map(link => (
                <li key={link.to}>
                  <Link href={link.to} className="hover:text-green-400 transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reinigung Services */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Reinigung</h3>
            <div className="space-y-3">
              <ul className="space-y-2 text-gray-400 text-sm">
                {hauptReinigung.map(link => (
                  <li key={link.to}>
                    <Link href={link.to} className="hover:text-green-400 transition-colors">{link.text}</Link>
                  </li>
                ))}
              </ul>
              <div>
                <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">WEITERE</h4>
                <ul className="space-y-1.5 text-gray-400 text-sm">
                  {weitereReinigung.map(link => (
                    <li key={link.to}>
                      <Link href={link.to} className="hover:text-green-400 transition-colors">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Standorte - 4. Kolon (mobil ve tablette 5. kolon ile yan yana) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Standorte</h3>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">HAUPTSTÄDTE</h4>
                <ul className="space-y-1.5 text-gray-400 text-sm">
                  {hauptstaedte.map(link => (
                    <li key={link.to}>
                      <Link href={link.to} className="hover:text-green-400 transition-colors">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">WEITERE STÄDTE</h4>
                <ul className="space-y-1.5 text-gray-400 text-sm">
                  {weitereStaedte.map(link => (
                    <li key={link.to}>
                      <Link href={link.to} className="hover:text-green-400 transition-colors">{link.text}</Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link href="/standorte" className="hover:text-green-400 transition-colors font-semibold text-green-400">
                      Alle Standorte →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Firmen finden & Unternehmen - 5. Kolon */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Firmen finden</h3>
            <ul className="space-y-2 text-gray-400 text-sm mb-6">
              <li><Link href="/umzugsfirma-in-der-naehe" className="hover:text-green-400 transition-colors">Umzugsfirma finden</Link></li>
              <li><Link href="/reinigungsfirma-in-der-naehe" className="hover:text-green-400 transition-colors">Reinigungsfirma finden</Link></li>
              <li><Link href="/malerfirma-in-der-naehe" className="hover:text-green-400 transition-colors">Malerfirma finden</Link></li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Unternehmen</h3>
            <ul className="space-y-2 text-gray-400 text-sm mb-6">
              <li><Link href="/ueber-uns" className="hover:text-green-400 transition-colors">Über uns</Link></li>
              <li><Link href="/kontakt" className="hover:text-green-400 transition-colors">Kontakt</Link></li>
              <li><Link href="/partner-suche" className="hover:text-green-400 transition-colors">Partner-Suche</Link></li>
              <li><Link href="/partner-werden" className="hover:text-green-400 transition-colors">Partner werden</Link></li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-4 block text-gray-200">Rechtliches</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/datenschutz" className="hover:text-green-400 transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-green-400 transition-colors">AGB</Link></li>
              <li className="pt-3 text-gray-300">
                <a href="mailto:info@online-offerten.ch" className="hover:text-green-400 transition-colors">
                  info@online-offerten.ch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700/50 mt-8 pt-8 text-center text-green-200 text-sm">
          <p>© {currentYear} Online-Offerten.ch. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;