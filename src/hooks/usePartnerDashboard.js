import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

// 🔔 Bildirim sesi — Web Audio API ile "ting" bell sesi üretir (dosya gereksiz)
const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Ting 1 — yüksek nota
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1200, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.4);

    // Ting 2 — ikinci nota (0.15s sonra)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1500, ctx.currentTime + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.35);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.6);

    // AudioContext'i temizle
    setTimeout(() => ctx.close(), 1000);
  } catch (e) {
    // Ses çalamazsa sessizce devam et
  }
};

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
  const [refundRequests, setRefundRequests] = useState([]);
  const [isResending, setIsResending] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchRefundRequests = useCallback(async (uid) => {
    const id = uid || user?.id;
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from('refund_requests')
        .select('*')
        .eq('partner_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRefundRequests(data || []);
    } catch (err) {
      console.error('Error fetching refund requests:', err);
    }
  }, [user]);

  const fetchDashboardData = useCallback(async (silent = false) => {
    if (!user?.id) return;

    // Nur beim ersten Laden den Loading-Spinner anzeigen
    if (!silent) setLoading(true);
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

      // Update last_activity timestamp silently (for admin panel tracking)
      supabase
        .from('partners')
        .update({ last_activity: new Date().toISOString() })
        .eq('id', user.id)
        .then(({ error: activityError }) => {
          if (activityError) console.warn('Could not update last_activity:', activityError.message);
        });

      // Fetch refund requests
      await fetchRefundRequests(user.id);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      if (!silent) {
        setError(err.message);
        setPanelStatus('error');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [user, fetchRefundRequests]);

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
          
          // Check if this quote is assigned to this partner and is approved
          // Covers both: initial send (status → approved) AND nachsenden (assigned_partner_ids updated)
          const isAssignedToPartner = Array.isArray(updatedQuote.assigned_partner_ids) && 
                                      updatedQuote.assigned_partner_ids.includes(partnerId);
          
          if (isAssignedToPartner && updatedQuote.status === 'approved' && !isRefreshing) {
            console.log('Quote assigned and approved, refreshing dashboard...', updatedQuote.id);
            
            // 🔔 Bildirim sesi + Toast
            playNotificationSound();
            toast({
              title: '🔔 Neue Anfrage!',
              description: 'Eine neue Anfrage ist für Sie verfügbar.',
            });

            // Debounce: clear existing timeout and set a new one
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            
            // Wait a bit to ensure database is fully updated, then refresh
            timeoutId = setTimeout(async () => {
              isRefreshing = true;
              try {
                await fetchDashboardData(true); // silent: kein Loading-Spinner
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
        await fetchDashboardData(true);
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
      await fetchDashboardData(true);
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
      await fetchDashboardData(true);
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
      await fetchDashboardData(true);
      scrollToTop();
      if (onActionSuccess) onActionSuccess('purchased');
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    }
  };

  const handleRequestRefund = async (quoteId, reason, amount) => {
    try {
      const { error } = await supabase
        .from('refund_requests')
        .insert({
          partner_id: partnerId,
          quote_id: quoteId,
          amount: amount,
          reason: reason,
          status: 'pending',
        });

      if (error) throw error;

      toast({ title: 'Erfolg', description: 'Rückerstattungsanfrage wurde erfolgreich gesendet.' });
      await fetchDashboardData(true);
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
    fetchDashboardData,
  };
};