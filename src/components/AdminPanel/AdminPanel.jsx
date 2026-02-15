'use client'

import React from 'react';
import AdminPanelCore from './AdminPanelCore';
import AdminPanelTabs from './AdminPanelTabs';
import { Loader2 } from 'lucide-react';

const AdminPanel = ({ userRole = 'admin' }) => {
  console.log('[AdminPanel] Component rendering')
  
  const {
    loading,
    stats,
    partners,
    fetchPartners,
    handleUpdatePartnerStatus,
    handleUpdatePartner,
    handleDeletePartner,
    fetchStats,
    fetchPendingReviewsCount
  } = AdminPanelCore();

  console.log('[AdminPanel] AdminPanelCore result:', { loading, hasStats: !!stats, partnersCount: partners?.length })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Admin-Panel wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 space-y-8">
        <AdminPanelTabs
          partners={partners}
          stats={stats}
          onRefreshPartners={fetchPartners}
          onUpdatePartnerStatus={handleUpdatePartnerStatus}
          onUpdatePartner={handleUpdatePartner}
          onDeletePartner={handleDeletePartner}
          onRefreshReviews={fetchPendingReviewsCount}
          userRole={userRole}
        />
      </div>
    </div>
  );
};

export default AdminPanel;