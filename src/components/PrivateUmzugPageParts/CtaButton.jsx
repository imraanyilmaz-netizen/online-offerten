import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CtaButton = () => {
  const { t } = useTranslation('privateUmzugPage');

  return (
    <div className="mt-10 text-center">
      <Button 
        asChild
        size="xl" 
        className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Link href="/kostenlose-offerte-anfordern?service=privatumzug">
          {t('ctaButton')}
          <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </Button>
    </div>
  );
};

export default CtaButton;