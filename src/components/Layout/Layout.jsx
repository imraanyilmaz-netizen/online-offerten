import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Loader2 } from 'lucide-react';

const FullPageLoader = () => (
  <div className="flex flex-1 items-center justify-center bg-background" style={{ willChange: 'opacity' }}>
    <Loader2 className="h-12 w-12 animate-spin text-primary" style={{ willChange: 'transform' }} />
  </div>
);

const Layout = ({ children }) => {
  const pathname = usePathname();
  const formPages = [
      '/kostenlose-offerte-anfordern',
      '/free-quote-request',
      '/forgot-password'
  ];
  const isFormPage = formPages.includes(pathname);
  const hideAll = pathname === '/bewertung-abgeben' || pathname.startsWith('/anfrage-status');

  if (hideAll) {
    return (
      <main className="flex-grow">
          <Suspense fallback={<FullPageLoader />}>
              {children}
          </Suspense>
      </main>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ contain: 'layout style' }}>
      {!isFormPage && <Navbar />}
      <main className="flex-grow flex flex-col" style={{ minHeight: 'calc(100vh - 200px)', flex: '1 0 auto' }}>
        <Suspense fallback={<FullPageLoader />}>
          {children}
        </Suspense>
      </main>
      {!isFormPage && <Footer />}
    </div>
  );
};

export default Layout;