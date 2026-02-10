import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

export const usePartnerDashboard = (onActionSuccess) => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [panelStatus, setPanelStatus] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  const [partnerData, setPartnerData] = useState(null);
  const [availableQuotes, setAvailableQuotes] = useState([]);
  const [purchasedQuotes, setPurchasedQuotes] = useState([]);
  const [archivedQuotes, setArchivedQuotes] = useState([]);
  const [missedQuotes, setMissedQuotes] = useState([]);
  const [isResending, setIsResending] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchDashboardData = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data: dashboardData, error: dashboardError } = await supabase.rpc('get_partner_dashboard_data', {
        p_partner_id: user.id,
      });

      if (dashboardError) throw dashboardError;

      const { data: partner, error: partnerError } = await supabase
        .from('partners')
        .select('*')
        .eq('id', user.id)
        .single();

      if (partnerError) throw partnerError;

      setPartnerData(partner);
      
      const viewedIds = new Set(dashboardData.viewed_quote_ids || []);
      const enrichedAvailableQuotes = (dashboardData.available_quotes || []).map(quote => ({
        ...quote,
        is_viewed: viewedIds.has(quote.id)
      }));

      setAvailableQuotes(enrichedAvailableQuotes);
      setPurchasedQuotes(dashboardData.purchased_quotes || []);
      setArchivedQuotes(dashboardData.archived_quotes || []);
      setMissedQuotes(dashboardData.missed_quotes || []);
      setPanelStatus('active');
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
      setPanelStatus('error');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !session) {
      setLoading(false);
      return;
    }

    const checkPartnerStatus = async () => {
      setLoading(true);
      try {
        if (!user.email_confirmed_at) {
          setPanelStatus('email_unconfirmed');
          setLoading(false);
          return;
        }

        const { data: partner, error: partnerError } = await supabase
          .from('partners')
          .select('id, is_active, status')
          .eq('id', user.id)
          .single();

        if (partnerError) throw partnerError;

        setPartnerId(partner.id);

        if (!partner.is_active || partner.status !== 'active') {
          setPanelStatus('inactive');
          setLoading(false);
          return;
        }

        await fetchDashboardData();
      } catch (err) {
        console.error('Error checking partner status:', err);
        setError(err.message);
        setPanelStatus('error');
        setLoading(false);
      }
    };

    checkPartnerStatus();
  }, [user, session, fetchDashboardData]);

  // Real-time subscription for quote updates
  useEffect(() => {
    if (!partnerId || panelStatus !== 'active') return;

    let timeoutId = null;
    let isRefreshing = false;

    // Subscribe to changes in quotes table
    const channel = supabase
      .channel(`quote-updates-${partnerId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'quotes',
        },
        (payload) => {
          const updatedQuote = payload.new;
          const oldQuote = payload.old;
          
          // Check if this quote is assigned to this partner and status changed to 'approved'
          const isAssignedToPartner = Array.isArray(updatedQuote.assigned_partner_ids) && 
                                      updatedQuote.assigned_partner_ids.includes(partnerId);
          const statusChangedToApproved = updatedQuote.status === 'approved' && 
                                         oldQuote?.status !== 'approved';
          
          if (isAssignedToPartner && statusChangedToApproved && !isRefreshing) {
            console.log('Quote assigned and approved, refreshing dashboard...', updatedQuote.id);
            
            // Debounce: clear existing timeout and set a new one
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            
            // Wait a bit to ensure database is fully updated, then refresh
            timeoutId = setTimeout(async () => {
              isRefreshing = true;
              try {
                await fetchDashboardData();
              } finally {
                isRefreshing = false;
              }
            }, 500);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to quote updates for partner:', partnerId);
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Error subscribing to quote updates');
        }
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      supabase.removeChannel(channel);
    };
  }, [partnerId, panelStatus, fetchDashboardData]);

  const handlePurchaseQuote = async (quoteId) => {
    try {
      const { data, error } = await supabase.rpc('purchase_quote', {
        p_quote_id: quoteId,
        p_partner_id: partnerId,
      });

      if (error) throw error;

      if (data.success) {
        toast({ title: 'Erfolg!', description: data.message });
        await fetchDashboardData();
        setRefreshKey((prev) => prev + 1);
        scrollToTop();
        if (onActionSuccess) onActionSuccess('purchased');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  const handleRejectQuote = async (quoteId, reason) => {
    try {
      const { error } = await supabase.rpc('partner_reject_quote', {
        p_partner_id: partnerId,
        p_quote_id: quoteId,
        p_reason: reason || null,
      });

      if (error) throw error;

      toast({ title: 'Erfolg', description: 'Anfrage erfolgreich abgelehnt.' });
      await fetchDashboardData();
      scrollToTop();
      if (onActionSuccess) onActionSuccess('available');
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  const handleMarkAsViewed = async (quoteId) => {
    // Optimistic UI update
    setAvailableQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, is_viewed: true } : q))
    );
    
    try {
      const { error } = await supabase.from('partner_quote_views').insert({
        partner_id: partnerId,
        quote_id: quoteId,
      });

      if (error && error.code !== '23505') { // 23505 is unique_violation, which is fine
        throw error;
      }
    } catch (error) {
      console.error('Error marking quote as viewed:', error);
      // Revert optimistic update on error
      setAvailableQuotes((prev) =>
        prev.map((q) => (q.id === quoteId ? { ...q, is_viewed: false } : q))
      );
    }
  };

  const handleResendConfirmation = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });

      if (error) throw error;

      toast({
        title: 'E-Mail gesendet',
        description: 'Bestätigungs-E-Mail wurde erneut gesendet. Bitte überprüfen Sie Ihren Posteingang.',
      });
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'E-Mail konnte nicht gesendet werden: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleArchiveQuote = async (purchaseId) => {
    try {
      const { error } = await supabase.rpc('archive_purchased_quote', {
        p_purchase_id: purchaseId,
        p_partner_id: partnerId,
      });

      if (error) throw error;

      toast({ title: 'Erfolg', description: 'Anfrage erfolgreich archiviert.' });
      await fetchDashboardData();
      scrollToTop();
      if (onActionSuccess) onActionSuccess('archived');
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  const handleUnarchiveQuote = async (purchaseId) => {
    try {
      const { error } = await supabase.rpc('unarchive_purchased_quote', {
        p_purchase_id: purchaseId,
        p_partner_id: partnerId,
      });

      if (error) throw error;

      toast({ title: 'Erfolg', description: 'Anfrage erfolgreich dearchiviert.' });
      await fetchDashboardData();
      scrollToTop();
      if (onActionSuccess) onActionSuccess('purchased');
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  return {
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
    fetchDashboardData,
  };
};