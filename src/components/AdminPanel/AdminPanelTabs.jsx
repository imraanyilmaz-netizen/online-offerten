'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Coins, Settings, Star, BookOpen, Mail, ShieldCheck } from 'lucide-react';
import QuoteManagement from '@/components/AdminPanel/QuoteManagement';
import PartnerManagement from '@/components/AdminPanel/PartnerManagement';
import FinancialManagement from '@/components/AdminPanel/FinancialManagement';
import AdminSettings from '@/components/AdminPanel/AdminSettings';
import ReviewManagement from '@/components/AdminPanel/ReviewManagement';
import BlogManagement from '@/components/AdminPanel/BlogManagement/BlogManagement';
import PartnerInviteEmail from '@/components/AdminPanel/PartnerInviteEmail';
import InsuranceManagement from '@/components/AdminPanel/InsuranceManagement';
import { supabase } from '@/lib/supabaseClient';

const AdminPanelTabs = ({
  partners,
  stats,
  onRefreshPartners,
  onUpdatePartner,
  onDeletePartner,
  onRefreshReviews,
  userRole = 'admin'
}) => {
  const isEditor = userRole === 'editor';
  const [activeTab, setActiveTab] = useState(isEditor ? 'ratgeber' : 'quotes');
  // Sadece "pending" (Ausstehend) partnerleri say - "inactive" partnerler sayılmamalı
  const pendingPartnerCount = partners?.filter(p => p.status === 'pending').length || 0;
  const [seenPendingPartnerCount, setSeenPendingPartnerCount] = useState(0);
  const pendingReviewsCount = stats?.pending_reviews_count || 0;
  const unseenPendingPartnerCount = Math.max(0, pendingPartnerCount - seenPendingPartnerCount);

  // Sigortası 30 gün içinde dolacak partner sayısını partner_insurance tablosundan çek
  const [expiringInsuranceCount, setExpiringInsuranceCount] = useState(0);

  const fetchExpiringInsuranceCount = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('partner_insurance')
        .select('valid_until')
        .eq('status', 'approved');
      
      if (error) { console.error('Error fetching expiring insurance:', error); return; }
      
      const now = new Date();
      const count = (data || []).filter(r => {
        if (!r.valid_until) return false;
        const daysLeft = Math.ceil((new Date(r.valid_until) - now) / (1000 * 60 * 60 * 24));
        return daysLeft <= 30;
      }).length;
      
      setExpiringInsuranceCount(count);
    } catch (err) {
      console.error('Error counting expiring insurance:', err);
    }
  }, []);

  useEffect(() => {
    fetchExpiringInsuranceCount();
  }, [fetchExpiringInsuranceCount]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedSeenCount = window.localStorage.getItem('admin_seen_pending_partner_count');
    if (savedSeenCount !== null) {
      const parsed = Number(savedSeenCount);
      if (Number.isFinite(parsed) && parsed >= 0) {
        setSeenPendingPartnerCount(parsed);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('admin_seen_pending_partner_count', String(seenPendingPartnerCount));
  }, [seenPendingPartnerCount]);

  useEffect(() => {
    if (activeTab === 'partners' && pendingPartnerCount > seenPendingPartnerCount) {
      setSeenPendingPartnerCount(pendingPartnerCount);
    }
  }, [activeTab, pendingPartnerCount, seenPendingPartnerCount]);

  return (
    <Card className="bg-transparent shadow-none border-0 rounded-none overflow-visible">
      <CardHeader className="bg-gradient-to-r from-green-600 via-green-600 to-emerald-600 text-white py-5 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
            {isEditor ? 'Ratgeber-Verwaltung' : 'Admin Panel'}
          </CardTitle>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-green-50">
            <span>{isEditor ? 'Editor' : 'Dashboard'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto scrollbar-hide border-b border-border bg-gradient-to-b from-muted/40 to-background">
            <TabsList className="inline-flex h-auto p-2 space-x-2 rounded-none bg-transparent">
              {!isEditor && (
                <TabsTrigger 
                  value="quotes" 
                  className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
                >
                  <FileText className="w-4 h-4" />
                  Anfragen
                </TabsTrigger>
              )}
              {!isEditor && (
                <TabsTrigger 
                  value="partners" 
                  className="relative flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
                >
                  <Users className="w-4 h-4" />
                  Partner ({partners?.length || 0})
                  {unseenPendingPartnerCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shadow-md animate-pulse">
                      {unseenPendingPartnerCount}
                    </span>
                  )}
                </TabsTrigger>
              )}
              {!isEditor && (
                <TabsTrigger 
                  value="reviews"
                  className="relative flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
                >
                    <Star className="w-4 h-4" />
                    Bewertungen
                     {pendingReviewsCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shadow-md animate-pulse">
                      {pendingReviewsCount}
                    </span>
                  )}
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="ratgeber"
                className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
              >
                <BookOpen className="w-4 h-4" />
                Ratgeber
              </TabsTrigger>
              {!isEditor && (
                <TabsTrigger 
                  value="financials"
                  className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
                >
                  <Coins className="w-4 h-4" />
                  Finanzen
                </TabsTrigger>
              )}
              {!isEditor && (
                <TabsTrigger 
                  value="invite"
                  className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
                >
                  <Mail className="w-4 h-4" />
                  Partner Einladung
                </TabsTrigger>
              )}
              {!isEditor && (
                <TabsTrigger 
                  value="insurance"
                  className="relative flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Versicherung
                  {expiringInsuranceCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold shadow-md animate-pulse">
                      {expiringInsuranceCount}
                    </span>
                  )}
                </TabsTrigger>
              )}
              {!isEditor && (
                <TabsTrigger 
                  value="settings"
                  className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 dark:data-[state=inactive]:text-muted-foreground dark:data-[state=inactive]:hover:bg-muted dark:data-[state=inactive]:hover:text-foreground"
                >
                  <Settings className="w-4 h-4" />
                  Einstellungen
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <div>
            {!isEditor && (
              <TabsContent value="quotes" className="mt-0 pt-6">
                <QuoteManagement />
              </TabsContent>
            )}

            {!isEditor && (
              <TabsContent value="partners" className="mt-0 pt-6">
                <PartnerManagement
                  partners={partners}
                  onRefresh={onRefreshPartners}
                  onUpdatePartner={onUpdatePartner}
                  onDeletePartner={onDeletePartner}
                />
              </TabsContent>
            )}
            
            {!isEditor && (
              <TabsContent value="reviews" className="mt-0 pt-6">
                  <ReviewManagement onRefresh={onRefreshReviews} />
              </TabsContent>
            )}

            <TabsContent value="ratgeber" className="mt-0 pt-6">
              <BlogManagement />
            </TabsContent>
            
            {!isEditor && (
              <TabsContent value="financials" className="mt-0 pt-6">
                <FinancialManagement partners={partners} />
              </TabsContent>
            )}

            {!isEditor && (
              <TabsContent value="invite" className="mt-0 pt-6">
                <PartnerInviteEmail />
              </TabsContent>
            )}

            {!isEditor && (
              <TabsContent value="insurance" className="mt-0 pt-6">
                <InsuranceManagement partners={partners} onRefreshPartners={onRefreshPartners} />
              </TabsContent>
            )}

            {!isEditor && (
              <TabsContent value="settings" className="mt-0 pt-6">
                <AdminSettings />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminPanelTabs;