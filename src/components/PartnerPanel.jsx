'use client'

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Loader2, MailWarning, Hourglass, Settings, PlusCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePartnerDashboard } from '@/hooks/usePartnerDashboard';

import PartnerStats from '@/components/PartnerPanel/PartnerStats';
import AvailableQuoteList from '@/components/PartnerPanel/AvailableQuoteList';
import PurchasedQuoteList from '@/components/PartnerPanel/PurchasedQuoteList';
import ArchivedQuoteList from '@/components/PartnerPanel/ArchivedQuoteList';
import MissedQuoteList from '@/components/PartnerPanel/MissedQuoteList';
import TransactionHistory from '@/components/PartnerPanel/TransactionHistory';
import SubscriptionManagement from '@/components/PartnerPanel/SubscriptionManagement';

const StatusDisplay = ({ icon: Icon, title, description, children }) => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-4">
    <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
      <Icon className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-3">{title}</h1>
      <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
      <div className="flex justify-center">{children}</div>
    </div>
  </div>
);

const PartnerPanel = ({ setCompanyName }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('available');

  const handleActionSuccess = (tab) => {
    if(tab) setActiveTab(tab);
    fetchDashboardData();
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
    isResending,
    refreshKey,
    handlePurchaseQuote,
    handleRejectQuote,
    handleMarkAsViewed,
    handleResendConfirmation,
    handleArchiveQuote,
    handleUnarchiveQuote,
    fetchDashboardData
  } = usePartnerDashboard(handleActionSuccess);

  useEffect(() => {
    if (partnerData?.company_name) {
      setCompanyName(partnerData.company_name);
    }
  }, [partnerData, setCompanyName]);

  // Check for payment success redirect (via URL params or sessionStorage)
  useEffect(() => {
    const fromPayment = sessionStorage.getItem('fromPayment');
    if (fromPayment === 'true') {
      fetchDashboardData();
      sessionStorage.removeItem('fromPayment');
    }
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
        <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
        <h1 className="text-2xl font-semibold">Lade Dashboard...</h1>
        <p className="text-slate-500">Einen Moment, wir bereiten alles für Sie vor.</p>
      </div>
    );
  }

  if (panelStatus === 'error') {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">Fehler beim Laden des Panels</h2>
        <p className="text-gray-600">{error}</p>
        <p className="text-gray-500 mt-1">Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support.</p>
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
     return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
        <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
        <h1 className="text-2xl font-semibold">Lade Dashboard...</h1>
        <p className="text-slate-500">Einen Moment, wir bereiten alles für Sie vor.</p>
      </div>
    );
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
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Link href="/partner/einstellungen" className="relative group cursor-pointer">
                <img
                    src={partnerData.logo_url || '/image/logo-icon.webp'}
                    alt="Firmenlogo"
                    loading="lazy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain border-2 border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/image/logo-icon.webp';
                  }}
                />
            </Link>
            <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-1">
                  Partner-Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  Willkommen zurück, {partnerData.company_name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" asChild className="flex-1 sm:flex-none h-11 border-gray-300 hover:bg-gray-50">
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

        <PartnerStats stats={stats} onTopUpClick={() => router.push('/partner/credit-top-up')} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide border-b border-gray-200 bg-gradient-to-b from-gray-50/50 to-white mb-6 py-3">
            <TabsList className="p-2 bg-transparent rounded-lg justify-start sm:justify-start gap-2 min-w-[700px] sm:min-w-0 min-h-[60px] items-center">
              <TabsTrigger 
                value="available"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
              >
                Verfügbar ({availableQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="purchased"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
              >
                Gekauft ({purchasedQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="archived"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
              >
                Archiviert ({archivedQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="missed"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
              >
                Verpasst ({missedQuotes.length})
              </TabsTrigger>
              <TabsTrigger 
                value="transactions"
                className="flex items-center gap-2 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
              >
                Transaktionen
              </TabsTrigger>
              <TabsTrigger 
                value="subscription"
                className="flex items-center gap-1.5 flex-shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
              >
                Abonnement
                {stats.hasActiveSubscription && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="available" className="mt-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Verfügbare Anfragen</CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6">
                <AvailableQuoteList 
                  quotes={availableQuotes} 
                  onPurchaseQuote={handlePurchaseQuote} 
                  onQuoteViewed={handleMarkAsViewed}
                  onRejectQuote={handleRejectQuote}
                  partnerBalance={partnerData.main_balance + partnerData.bonus_balance}
                  hasActiveSubscription={stats.hasActiveSubscription}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="purchased" className="mt-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Gekaufte Anfragen</CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6">
                <PurchasedQuoteList quotes={purchasedQuotes} onArchiveQuote={handleArchiveQuote} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="archived" className="mt-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Archivierte Anfragen</CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6">
                <ArchivedQuoteList quotes={archivedQuotes} onUnarchiveQuote={handleUnarchiveQuote} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="missed" className="mt-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Verpasste Anfragen</CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6">
                <MissedQuoteList quotes={missedQuotes} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="mt-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Transaktionsverlauf</CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6">
                <TransactionHistory key={refreshKey} partnerId={partnerId} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscription" className="mt-4">
             <SubscriptionManagement 
                partnerData={partnerData} 
                onSubscriptionSuccess={handleActionSuccess}
             />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
  );
};

export default PartnerPanel;