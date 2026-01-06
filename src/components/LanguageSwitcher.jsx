'use client'

import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe as GlobeIcon } from 'lucide-react';
import { useLanguageSwitcher } from '@/lib/languageUtils';

const LanguageSwitcher = ({ className }) => {
  const pathname = usePathname();
  const switchLanguage = useLanguageSwitcher();
  const [currentLang, setCurrentLang] = useState('de'); // Default to 'de'

  useEffect(() => {
    // Detect language from URL - only /free-quote-request is English
    if (pathname === '/free-quote-request') {
      setCurrentLang('en');
    } else {
      setCurrentLang('de');
    }
  }, [pathname]);

  const changeLanguage = (lng) => {
    // Use URL-based language switching instead of i18n.changeLanguage
    switchLanguage(pathname, lng);
    setCurrentLang(lng);
  };

  return (
    <div className={className} style={{ zIndex: 9999, pointerEvents: 'auto' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" aria-label="Sprache ändern" style={{ pointerEvents: 'auto', zIndex: 10000 }}>
            <GlobeIcon size={16} className="mr-1" /> {(currentLang || 'de').toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeLanguage('de')} disabled={currentLang === 'de'}>
            Deutsch
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('en')} disabled={currentLang === 'en'}>
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;