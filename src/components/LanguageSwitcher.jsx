'use client'

import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation(['navbar']);
  const pathname = usePathname();
  const switchLanguage = useLanguageSwitcher();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'de'); // Default to 'de'

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (lng) => {
    // Use URL-based language switching instead of i18n.changeLanguage
    switchLanguage(pathname, lng);
  };

  return (
    <div className={className} style={{ zIndex: 9999, pointerEvents: 'auto' }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" aria-label={t('languageSwitcher.label', 'Sprache ändern')} style={{ pointerEvents: 'auto', zIndex: 10000 }}>
            <GlobeIcon size={16} className="mr-1" /> {(currentLang || 'de').toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeLanguage('de')} disabled={currentLang === 'de'}>
            {t('languageSwitcher.de', 'Deutsch')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('en')} disabled={currentLang === 'en'}>
            {t('languageSwitcher.en', 'English')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;