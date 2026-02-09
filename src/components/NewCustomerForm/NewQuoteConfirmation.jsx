import Link from 'next/link';
import React from 'react';
// framer-motion removed - CSS transitions for better INP
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { MailCheck, CheckCircle2 as CheckCircle, ArrowLeft, PartyPopper, Link2, ListChecks, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const NewQuoteConfirmation = ({ onResetForm }) => {
  const { t, i18n } = useTranslation('newCustomerForm');

  // Use existing paths (these pages currently exist only in German)
  const checklistenLink = '/umzugsfirma/checklists';
  const ratgeberLink = '/ratgeber';

  const helpfulResources = [
    {
      title: t('quoteConfirmation.helpfulResources.checklists.title'),
      description: t('quoteConfirmation.helpfulResources.checklists.description'),
      buttonText: t('quoteConfirmation.helpfulResources.checklists.buttonText'),
      link: checklistenLink,
      icon: <ListChecks className="h-8 w-8 text-green-600" />
    },
    {
      title: t('quoteConfirmation.helpfulResources.guides.title'),
      description: t('quoteConfirmation.helpfulResources.guides.description'),
      buttonText: t('quoteConfirmation.helpfulResources.guides.buttonText'),
      link: ratgeberLink,
      icon: <BookOpen className="h-8 w-8 text-green-600" />
    }
  ];

  return (
    <div
      className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 md:py-20"
    >
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600 shadow-xl"
        >
          <PartyPopper className="h-12 w-12 text-white" />
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          {t('quoteConfirmation.title')}
        </h1>
        <p
          className="text-lg text-gray-700 mb-6"
        >
          {t('quoteConfirmation.subtitle')}
        </p>

        <div
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-left space-y-3 mb-8"
        >
           <div className="flex items-start">
            <MailCheck className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-600">
                {t('quoteConfirmation.emailConfirmationSent')}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex items-start">
            <Link2 className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-600">
                {t('quoteConfirmation.statusLinkText')}
              </p>
            </div>
          </div>
           <div className="border-t border-gray-200 my-4"></div>
           <p className="font-semibold text-gray-700 text-center">
            {t('quoteConfirmation.checkSpam')}
          </p>
        </div>
        
        <div
          className="flex items-center justify-center gap-2 text-green-700 mb-8 p-3 bg-green-100 rounded-md"
        >
          <CheckCircle size={20} />
          <p className="text-sm">{t('quoteConfirmation.contactSoon')}</p>
        </div>

        <p
          className="text-gray-600 mb-12"
        >
          {t('quoteConfirmation.thanksForTrust')}
        </p>
        
        <div
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {t('quoteConfirmation.whatHappensNext')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {helpfulResources.map((resource, index) => (
              <Link href={resource.link} key={index} className="block group">
                <Card className="h-full flex flex-col shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-200 hover:border-green-400">
                  <CardHeader className="flex-row items-center gap-4">
                    {resource.icon}
                    <CardTitle className="text-lg font-semibold text-gray-800">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-gray-600">{resource.description}</CardDescription>
                  </CardContent>
                  <div className="p-4 pt-0">
                      <div className="text-green-600 font-semibold flex items-center group-hover:text-green-700 transition-colors">
                        {resource.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div
        >
          <Button 
            onClick={onResetForm} 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white group"
          >
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            {t('quoteConfirmation.newQuoteButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewQuoteConfirmation;