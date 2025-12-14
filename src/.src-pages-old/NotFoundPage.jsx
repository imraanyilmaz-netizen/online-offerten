import Link from 'next/link';
import React from 'react';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const metaTitle = "Seite nicht gefunden (404) | Online-offerten.ch";
  const metaDescription = "Die von Ihnen gesuchte Seite konnte nicht gefunden werden. Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.";

  const pageTitle = "404";
  const pageSubtitle = "Seite nicht gefunden";
  const pageDescription = "Die von Ihnen gesuchte Seite existiert nicht, wurde verschoben oder gelöscht. Bitte überprüfen Sie die Adresse oder kehren Sie zur Startseite zurück.";

  return (
    <>
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4 bg-gray-50 py-12">
        <div className="max-w-md w-full">
          <div className="relative inline-block mb-4">
            <h1 className="text-9xl font-black text-gray-200 select-none">404</h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <h2 className="text-4xl font-bold text-gray-800">{pageSubtitle}</h2>
            </div>
          </div>
          <p className="text-gray-600 mt-4 mb-8 text-lg">
            {pageDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Zurück zur Startseite
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/kontakt">
                <Search className="mr-2 h-5 w-5" />
                Kontakt aufnehmen
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
