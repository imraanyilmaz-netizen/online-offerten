'use client'

import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Loader2, MailWarning, Hourglass, Settings, PlusCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePartnerDashboard } from '@/hooks/usePartnerDashboard';
import DashboardSkeleton from '@/src/components/ui/DashboardSkeleton';
import { usePartnerCounts } from '@/src/components/PartnerPanel/PartnerCountsContext';

import PartnerStats from '@/components/PartnerPanel/PartnerStats';
import AvailableQuoteList from '@/components/PartnerPanel/AvailableQuoteList';
import PurchasedQuoteList from '@/components/PartnerPanel/PurchasedQuoteList';
import ArchivedQuoteList from '@/components/PartnerPanel/ArchivedQuoteList';
import MissedQuoteList from '@/components/PartnerPanel/MissedQuoteList';
import TransactionHistory from '@/components/PartnerPanel/TransactionHistory';
import SubscriptionManagement from '@/components/PartnerPanel/SubscriptionManagement';
import InsuranceBanner from '@/components/PartnerPanel/InsuranceBanner';
import InsuranceUploadModal from '@/components/PartnerPanel/InsuranceUploadModal';

const StatusDisplay = ({ icon: Icon, title, description, children }) => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-muted/40 text-center p-4">
    <div className="max-w-lg w-full bg-card text-card-foreground border border-border p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
      <Icon className="w-20 h-20 text-primary mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-foreground mb-3">{title}</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">{description}</p>
      <div className="flex justify-center">{children}</div>
    </div>
  </div>
);

const VALID_TABS = ['available', 'purchased', 'archived', 'missed', 'transactions', 'subscription'];

const PartnerPanel = ({ setCompanyName }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const initialTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'available';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

  /** URL ↔ activeTab senkronu: Sidebar "Gekauft"a tıklarsa ?tab=purchased gelir. */
  useEffect(() => {
    if (tabParam && VALID_TABS.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  /** Tab değiştiğinde URL'yi replaceState ile güncelle (history'yi kirletmeden). */
  const handleTabChange = useCallback(
    (value) => {
      setActiveTab(value);
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(Array.from(searchParams?.entries() || []));
      if (value === 'available') {
        params.delete('tab');
      } else {
        params.set('tab', value);
      }
      const qs = params.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      window.history.replaceState(null, '', newUrl);
    },
    [pathname, searchParams]
  );

  const handleActionSuccess = (tab) => {
    if (tab) handleTabChange(tab);
    fetchDashboardData(true); // silent: kein Loading-Spinner
  };

  const {
    user,
    partnerId,
    panelStatus,
    loading,
    error,
    partnerData,
    availableQuotes,
    purchasedQuotes,
    archivedQuotes,
    missedQuotes,
    refundRequests,
    isResending,
    refreshKey,
    handlePurchaseQuote,
    handleRejectQuote,
    handleMarkAsViewed,
    handleResendConfirmation,
    handleArchiveQuote,
    handleUnarchiveQuote,
    handleRequestRefund,
    fetchDashboardData
  } = usePartnerDashboard(handleActionSuccess);

  useEffect(() => {
    if (partnerData?.company_name) {
      setCompanyName(partnerData.company_name);
    }
  }, [partnerData, setCompanyName]);

  const { setCounts } = usePartnerCounts();
  useEffect(() => {
    setCounts({
      available: availableQuotes.length,
      unreadAvailable: availableQuotes.filter((q) => !q.is_viewed).length,
      purchased: purchasedQuotes.length,
      archived: archivedQuotes.length,
      missed: missedQuotes.length,
    });
  }, [availableQuotes, purchasedQuotes, archivedQuotes, missedQuotes, setCounts]);

  // Check for payment success redirect (via URL params or sessionStorage)
  useEffect(() => {
    const fromPayment = sessionStorage.getItem('fromPayment');
    if (fromPayment === 'true') {
      fetchDashboardData(true); // silent: kein Loading-Spinner
      sessionStorage.removeItem('fromPayment');
    }
  }, [fetchDashboardData]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (panelStatus === 'error') {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 dark:text-red-400 mb-2">Fehler beim Laden des Panels</h2>
        <p className="text-muted-foreground">{error}</p>
        <p className="text-muted-foreground/80 mt-1">Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support.</p>
      </div>
    );
  }

  if (panelStatus === 'email_unconfirmed') {
    return (
      <StatusDisplay
        icon={MailWarning}
        title="Bestätigen Sie Ihre E-Mail-Adresse"
        description={`Wir haben eine Bestätigungs-E-Mail an ${user.email} gesendet. Bitte klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren.`}
      >
        <Button onClick={handleResendConfirmation} disabled={isResending}>
          {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Bestätigungs-E-Mail erneut senden
        </Button>
      </StatusDisplay>
    );
  }

  if (panelStatus === 'inactive') {
    return (
      <StatusDisplay
        icon={Hourglass}
        title="Ihr Konto wird überprüft"
        description="Vielen Dank für Ihre Registrierung. Ihr Konto wird derzeit von unserem Team überprüft. Wir werden Sie per E-Mail benachrichtigen, sobald es aktiviert ist."
      >
        <Button asChild variant="outline">
            <Link href="/kontakt">Support kontaktieren</Link>
        </Button>
      </StatusDisplay>
    );
  }
  
  if (!partnerData) {
     return <DashboardSkeleton />;
  }

  const totalPurchasedCount = purchasedQuotes.length + archivedQuotes.length;

  const stats = {
    availableQuotes: availableQuotes.length,
    purchasedQuotes: totalPurchasedCount,
    mainBalance: partnerData?.main_balance,
    bonusBalance: partnerData?.bonus_balance,
    hasActiveSubscription: partnerData?.has_active_subscription && new Date(partnerData?.subscription_end_date) > new Date(),
    subscriptionEndDate: partnerData?.subscription_end_date
  };

  return (
    <>
    {/* Desktop'ta Shell dikey boşluğu + konteyner genişliğini sağlıyor; sadece mobil/tablette kendi padding'ini kullan */}
    <div className="min-h-screen lg:min-h-0 bg-background lg:bg-transparent py-4 sm:py-6 lg:py-0">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:max-w-none lg:px-6 lg:py-6">
        {/* Üst başlık ve hızlı aksiyonlar: sadece mobil/tablette — desktop'ta sol sidebar var */}
        <header className="lg:hidden mb-8 pb-6 border-b border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Link href="/partner/einstellungen" className="relative group cursor-pointer">
                <img
                    src={partnerData.logo_url || '/image/logo-icon.webp'}
                    alt="Firmenlogo"
                    loading="lazy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain border-2 border-border bg-card shadow-md hover:shadow-lg transition-shadow"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/image/logo-icon.webp';
                  }}
                />
            </Link>
            <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-1">
                  Partner-Dashboard
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground font-medium">
                  Willkommen zurück, {partnerData.company_name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" asChild className="flex-1 sm:flex-none h-11 border-border hover:bg-muted">
              <Link href="/partner/einstellungen">
                <Settings className="mr-2 h-4 w-4" />
                Einstellungen
              </Link>
            </Button>
              <Button asChild className="flex-1 sm:flex-none h-11 bg-green-600 hover:bg-green-700 text-white font-semibold">
              <Link href="/partner/credit-top-up">
                <PlusCircle className="mr-2 h-4 w-4" />
                Guthaben aufladen
              </Link>
            </Button>
            </div>
          </div>
        </header>

        {/* Insurance Banner */}
        <InsuranceBanner partnerData={partnerData} onUploadClick={() => setIsInsuranceModalOpen(true)} />

        {/* Büyük istatistik kartları sadece mobil/tablet'te — desktop'ta sol sidebar kompakt gösteriyor */}
        <div className="lg:hidden">
          <PartnerStats stats={stats} onTopUpClick={() => router.push('/partner/credit-top-up')} />
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Sekme barı sadece mobilde — desktop'ta sol sidebar navigasyonu kullanılır */}
          <div className="lg:hidden overflow-x-auto overflow-y-hidden scrollbar-hide border-b border-border bg-gradient-to-b from-muted/30 to-background mb-6 py-3">
            <TabsList className="p-2 bg-transparent rounded-lg justify-start sm:justify-start gap-2 min-w-[700px] sm:min-w-0 min-h-[60px] items-center">
              <TabsTrigger 
                value="available"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border"
              >
                Verfügbar ({availableQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="purchased"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border"
              >
                Angenommen ({purchasedQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="archived"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border"
              >
                Archiviert ({archivedQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="missed"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border"
              >
                Verpasst ({missedQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="transactions"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border"
              >
                Transaktionen
              </TabsTrigger>
              <TabsTrigger 
                value="subscription"
                className="flex items-center gap-1.5 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90 data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border"
              >
                Abonnement
                {stats.hasActiveSubscription && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
              </TabsTrigger>
            </TabsList>
          </div>
          {/* Her sekme içeriği: tek section — Shell'in kendi kartı sararken iç Card gereksiz.
              Mobilde shell kartı olmadığı için list items kendi kartlarıyla görsel ağırlığı taşıyor. */}
          <TabsContent value="available" className="mt-4 lg:mt-0 animate-tab-enter" key={`tab-available-${activeTab}`}>
            <header className="mb-5 pb-4 border-b border-border">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Verfügbare Anfragen</h1>
            </header>
            <AvailableQuoteList 
              quotes={availableQuotes} 
              onPurchaseQuote={handlePurchaseQuote} 
              onQuoteViewed={handleMarkAsViewed}
              onRejectQuote={handleRejectQuote}
              partnerBalance={partnerData.main_balance + partnerData.bonus_balance}
              hasActiveSubscription={stats.hasActiveSubscription}
              insuranceStatus={partnerData?.insurance_status}
              onInsuranceUploadClick={() => setIsInsuranceModalOpen(true)}
            />
          </TabsContent>
          <TabsContent value="purchased" className="mt-4 lg:mt-0 animate-tab-enter" key={`tab-purchased-${activeTab}`}>
            <header className="mb-5 pb-4 border-b border-border">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Angenommene Anfragen</h1>
            </header>
            <PurchasedQuoteList quotes={purchasedQuotes} onArchiveQuote={handleArchiveQuote} onRequestRefund={handleRequestRefund} refundRequests={refundRequests} />
          </TabsContent>
          <TabsContent value="archived" className="mt-4 lg:mt-0 animate-tab-enter" key={`tab-archived-${activeTab}`}>
            <header className="mb-5 pb-4 border-b border-border">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Archivierte Anfragen</h1>
            </header>
            <ArchivedQuoteList quotes={archivedQuotes} onUnarchiveQuote={handleUnarchiveQuote} />
          </TabsContent>
          <TabsContent value="missed" className="mt-4 lg:mt-0 animate-tab-enter" key={`tab-missed-${activeTab}`}>
            <header className="mb-5 pb-4 border-b border-border">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Verpasste Anfragen</h1>
            </header>
            <MissedQuoteList quotes={missedQuotes} />
          </TabsContent>
          <TabsContent value="transactions" className="mt-4 lg:mt-0 animate-tab-enter" key={`tab-transactions-${activeTab}`}>
            <header className="mb-5 pb-4 border-b border-border">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Transaktionsverlauf</h1>
            </header>
            <TransactionHistory key={refreshKey} partnerId={partnerId} refreshKey={refreshKey} />
          </TabsContent>
          <TabsContent value="subscription" className="mt-4 animate-tab-enter" key={`tab-subscription-${activeTab}`}>
             <SubscriptionManagement 
                partnerData={partnerData} 
                onSubscriptionSuccess={handleActionSuccess}
             />
          </TabsContent>
        </Tabs>
      </div>
    </div>

    {/* Insurance Upload Modal */}
    <InsuranceUploadModal 
      open={isInsuranceModalOpen} 
      onOpenChange={setIsInsuranceModalOpen} 
      partnerId={partnerId}
      onSuccess={() => fetchDashboardData(true)}
    />
    </>
  );
};

export default PartnerPanel;