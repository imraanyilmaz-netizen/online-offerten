import Link from 'next/link';
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PackagePlus, ClipboardList, Users, ShieldCheck, Truck, Home, MapPin, ArrowRight, Wrench, HeartHandshake } from 'lucide-react';

const Article = () => {
  const { t } = useTranslation('privateUmzugPage');

  return (
    <>
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <PackagePlus size={32} className="mr-3 text-green-500" />
          {t('article.section1.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section1.p1')}</p>
        <p className="text-gray-700 leading-relaxed">{t('article.section1.p2')}</p>
        <p className="text-gray-700 leading-relaxed mt-4">{t('article.section1.p3')}</p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <ClipboardList size={28} className="mr-3 text-blue-500" />
          {t('article.section2.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section2.p1')}</p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-lg text-gray-700 mb-2">{t('article.section2.sub1_title')}</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{t('article.section2.sub1_p1')}</p>
          <h3 className="font-bold text-lg text-gray-700 mt-4 mb-2">{t('article.section2.sub2_title')}</h3>
          <p className="text-gray-700 leading-relaxed">
            {t('article.section2.sub2_p1')}
          </p>
          <Button asChild className="mt-4 bg-green-600 hover:bg-green-700 text-white group">
            <Link href="/umzugsfirma/checklists">
              {t('article.section2.sub2_button')}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users size={28} className="mr-3 text-purple-500" />
          {t('article.section3.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section3.p1')}</p>
        <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
            <li>{t('article.section3.point1')}</li>
            <li>{t('article.section3.point2')}</li>
            <li>{t('article.section3.point3')}</li>
            <li>{t('article.section3.point4')}</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          <Trans 
            i18nKey="article.section3.p2_linked" 
            ns="privateUmzugPage"
            components={{
              0: <Link href="/kostenlose-offerte-anfordern" className="text-green-600 hover:underline font-semibold" />
            }}
          />
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {t('article.section4.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section4.p1')}</p>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section4.p2')}</p>
        <p className="text-gray-700 leading-relaxed">
            <Trans 
                i18nKey="article.section4.p3_linked" 
                ns="privateUmzugPage"
                components={{
                0: <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:underline font-semibold" />
                }}
            />
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <ShieldCheck size={28} className="mr-3 text-red-500" />
          {t('article.section5.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section5.p1')}</p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-lg text-gray-700 mb-2">{t('article.section5.sub1_title')}</h3>
          <p className="text-gray-700 leading-relaxed">{t('article.section5.sub1_p1')}</p>
          <h3 className="font-bold text-lg text-gray-700 mt-4 mb-2">{t('article.section5.sub2_title')}</h3>
          <p className="text-gray-700 leading-relaxed">{t('article.section5.sub2_p1')}</p>
        </div>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Wrench size={28} className="mr-3 text-indigo-500" />
          {t('article.section6.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section6.p1')}</p>
        <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
            <li>{t('article.section6.point1')}</li>
            <li>{t('article.section6.point2')}</li>
            <li>{t('article.section6.point3')}</li>
        </ul>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <HeartHandshake size={28} className="mr-3 text-pink-500" />
          {t('article.section7.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section7.p1')}</p>
        <p className="text-gray-700 leading-relaxed">{t('article.section7.p2')}</p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin size={28} className="mr-3 text-cyan-500" />
          {t('article.section8.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('article.section8.p1')}</p>
        <p className="text-gray-700 leading-relaxed">
          <Trans 
            i18nKey="article.section8.p2_linked" 
            ns="privateUmzugPage"
            components={{
              0: <Link href="/umzugsfirma-in-der-naehe/zuerich" className="text-green-600 hover:underline font-semibold" />,
              1: <Link href="/umzugsfirma-in-der-naehe/bern" className="text-green-600 hover:underline font-semibold" />,
              2: <Link href="/umzugsfirma-in-der-naehe/basel" className="text-green-600 hover:underline font-semibold" />,
              3: <Link href="/umzugsfirma-in-der-naehe/luzern" className="text-green-600 hover:underline font-semibold" />,
              4: <Link href="/standorte" className="text-green-600 hover:underline font-semibold" />
            }}
          />
        </p>
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <Home size={28} className="mr-3 text-teal-500" />
          {t('conclusion.title')}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <Trans 
            i18nKey="conclusion.p1_linked" 
            ns="privateUmzugPage"
            components={{
              0: <Link href="/kostenlose-offerte-anfordern" className="text-green-600 hover:underline font-semibold" />
            }}
          />
        </p>
      </section>
    </>
  );
};

export default Article;