import Link from 'next/link';
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Award } from 'lucide-react';
import { getLocalizedUrl } from '@/lib/urlMap';

const Article = () => {
  const { t, i18n } = useTranslation('reinigungPage');

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="bg-white p-8 md:p-12 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 flex items-center">
        <BookOpen className="w-8 h-8 mr-4 text-blue-500" />
        {t('article.title')}
      </h2>
      <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-4">
        <p>{t('article.p1')}</p>
        <p>{t('article.p2')}</p>
        
        <div className="!mt-8 !mb-6 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
           <h3 className="text-2xl font-semibold text-slate-800 mb-3 flex items-center">
              <Award className="w-7 h-7 mr-3 text-blue-500"/>
              {t('article.subTitle1')}
           </h3>
           <p>{t('article.p3')}</p>
           <img 
             src="https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/3ed326ca4d6c724a080e41089283afe4.png" 
             alt={t('article.subTitle1')} 
             className="mt-6 rounded-lg shadow-md w-full object-cover" 
           />
        </div>

        <h3 className="text-2xl font-semibold text-slate-800 pt-4">{t('article.subTitle2')}</h3>
        <p>
          {t('article.p4')} Neben der <Link href={getLocalizedUrl("/umzugsreinigung", i18n.language)} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Umzugsreinigung</Link> bieten wir auch <Link href={getLocalizedUrl("/wohnungsreinigung", i18n.language)} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Wohnungsreinigung</Link>, <Link href={getLocalizedUrl("/hausreinigung", i18n.language)} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Hausreinigung</Link> und <Link href={getLocalizedUrl("/bueroreinigung", i18n.language)} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Büroreinigung</Link> an. Für regelmässige Reinigung empfehlen wir unsere <Link href={getLocalizedUrl("/unterhaltsreinigung", i18n.language)} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Unterhaltsreinigung</Link>.
        </p>
        <p>
          {t('article.p5')} Weitere Informationen finden Sie auf unseren <Link href={getLocalizedUrl("/standorte", i18n.language)} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Standorte-Seiten</Link> oder in unserem <Link href={getLocalizedUrl("/ratgeber", i18n.language)} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">Ratgeber</Link>.
        </p>
      </div>
    </motion.section>
  );
};

export default Article;