'use client'

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Coins, Settings, Star, BookOpen, Mail } from 'lucide-react';
import QuoteManagement from '@/components/AdminPanel/QuoteManagement';
import PartnerManagement from '@/components/AdminPanel/PartnerManagement';
import FinancialManagement from '@/components/AdminPanel/FinancialManagement';
import AdminSettings from '@/components/AdminPanel/AdminSettings';
import ReviewManagement from '@/components/AdminPanel/ReviewManagement';
import BlogManagement from '@/components/AdminPanel/BlogManagement/BlogManagement';
import PartnerInviteEmail from '@/components/AdminPanel/PartnerInviteEmail';

const AdminPanelTabs = ({
  partners,
  stats,
  onRefreshPartners,
  onUpdatePartner,
  onDeletePartner,
  onRefreshReviews
}) => {
  const [activeTab, setActiveTab] = useState('quotes');
  // Sadece "pending" (Ausstehend) partnerleri say - "inactive" partnerler sayılmamalı
  const pendingPartnerCount = partners?.filter(p => p.status === 'pending').length || 0;
  const pendingReviewsCount = stats?.pending_reviews_count || 0;

  return (
    <Card className="bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600 via-green-600 to-emerald-600 text-white py-5 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Panel</CardTitle>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-green-50">
            <span>Dashboard</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto scrollbar-hide border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
            <TabsList className="inline-flex h-auto p-2 space-x-2 rounded-none bg-transparent">
              <TabsTrigger 
                value="quotes" 
                className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900"
              >
                <FileText className="w-4 h-4" />
                Anfragen
              </TabsTrigger>
              <TabsTrigger 
                value="partners" 
                className="relative flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900"
              >
                <Users className="w-4 h-4" />
                Partner ({partners?.length || 0})
                {pendingPartnerCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shadow-md animate-pulse">
                    {pendingPartnerCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="relative flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900"
              >
                  <Star className="w-4 h-4" />
                  Bewertungen
                   {pendingReviewsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shadow-md animate-pulse">
                    {pendingReviewsCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="ratgeber"
                className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900"
              >
                <BookOpen className="w-4 h-4" />
                Ratgeber
              </TabsTrigger>
              <TabsTrigger 
                value="financials"
                className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900"
              >
                <Coins className="w-4 h-4" />
                Finanzen
              </TabsTrigger>
              <TabsTrigger 
                value="invite"
                className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900"
              >
                <Mail className="w-4 h-4" />
                Partner Einladung
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="flex-shrink-0 px-5 py-3 text-sm font-semibold flex items-center gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900"
              >
                <Settings className="w-4 h-4" />
                Einstellungen
              </TabsTrigger>
            </TabsList>
          </div>

          <div>
            <TabsContent value="quotes" className="mt-0">
              <QuoteManagement />
            </TabsContent>

            <TabsContent value="partners" className="mt-0">
              <PartnerManagement
                partners={partners}
                onRefresh={onRefreshPartners}
                onUpdatePartner={onUpdatePartner}
                onDeletePartner={onDeletePartner}
              />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
                <ReviewManagement onRefresh={onRefreshReviews} />
            </TabsContent>

            <TabsContent value="ratgeber" className="mt-0">
              <BlogManagement />
            </TabsContent>
            
            <TabsContent value="financials" className="mt-0">
              <FinancialManagement partners={partners} />
            </TabsContent>

            <TabsContent value="invite" className="mt-0">
              <PartnerInviteEmail />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <AdminSettings />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminPanelTabs;