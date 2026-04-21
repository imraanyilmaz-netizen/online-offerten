import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/src/contexts/SupabaseAuthContext';
import { useToast } from '@/src/components/ui/use-toast';

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
      if (!session?.access_token) {
        throw new Error('Nicht angemeldet');
      }

      /**
       * Stage 1 — Kritischer Pfad (parallel):
       *  - Dashboard-RPC (available/purchased/archived/missed + viewed_ids)
       *  - Partner-Stammdaten + optional Insurance-Metadaten
       * Beide laufen gleichzeitig, statt nacheinander — das war vorher der
       * Hauptgrund für das "Sidebar schnell, Content langsam"-Gefühl.
       */
      const partnerWithInsurancePromise = (async () => {
        const { data: partner, error: partnerError } = await supabase
          .from('partners')
          .select('*')
          .eq('id', user.id)
          .single();

        if (partnerError || !partner) {
          return { partner: null, partnerError: partnerError || new Error('Partner not found') };
        }

        // Insurance-Zusatz nur holen wenn nötig — sonst ist der extra Roundtrip
        // reine Verzögerung. Fehler hier dürfen das Dashboard nicht blockieren.
        try {
          if (partner.insurance_status === 'rejected') {
            const { data: insData } = await supabase
              .from('partner_insurance')
              .select('rejection_reason, valid_until')
              .eq('partner_id', user.id)
              .order('updated_at', { ascending: false })
              .limit(1)
              .single();
            if (insData) {
              partner.insurance_rejection_reason = insData.rejection_reason;
              partner.insurance_valid_until = insData.valid_until;
            }
          } else if (partner.insurance_status === 'approved') {
            const { data: insData } = await supabase
              .from('partner_insurance')
              .select('valid_until')
              .eq('partner_id', user.id)
              .eq('status', 'approved')
              .order('updated_at', { ascending: false })
              .limit(1)
              .single();
            if (insData) {
              partner.insurance_valid_until = insData.valid_until;
            }
          }
        } catch (insErr) {
          console.warn('Could not load partner_insurance metadata:', insErr?.message || insErr);
        }

        return { partner, partnerError: null };
      })();

      const dashPromise = fetch('/api/partner/dashboard', {
        method: 'GET',
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: 'application/json',
        },
      });

      const [dashRes, { partner, partnerError }] = await Promise.all([
        dashPromise,
        partnerWithInsurancePromise,
      ]);

      if (!dashRes.ok) {
        let msg = dashRes.statusText;
        try {
          const body = await dashRes.json();
          if (body?.error) msg = body.error;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }

      if (partnerError) throw partnerError;

      const dashboardData = await dashRes.json();

      const viewedIds = new Set(dashboardData.viewed_quote_ids || []);
      const baseAvailableQuotes = dashboardData.available_quotes || [];
      const missedQuotesRaw = dashboardData.missed_quotes || [];

      // Erste (schnelle) Normalisierung der Missed-Quotes ohne weitere DB-Abfrage.
      // Die Sold-Out-Rejection-Erweiterung kommt gleich parallel im Hintergrund.
      const preliminaryMissedQuotes = missedQuotesRaw.map((q) => {
        const reason = q?.missed_reason;
        const status = q?.status;
        if (
          (
            (reason === 'expired' || reason === 'manual') &&
            (status === 'quota_filled' || status === 'sold_out')
          ) ||
          String(reason || '').toLowerCase() === 'ausverkauft'
        ) {
          return { ...q, missed_reason: 'Ausverkauft' };
        }
        return q;
      });

      // Available Quotes schon jetzt mit viewed-Flag + vorhandenem lead_purchase_count anzeigen.
      // Der exakte Count wird ggf. gleich im Hintergrund nachgeladen.
      const initialAvailableQuotes = baseAvailableQuotes.map((quote) => ({
        ...quote,
        is_viewed: viewedIds.has(quote.id),
        lead_purchase_count:
          typeof quote.lead_purchase_count === 'number' ? quote.lead_purchase_count : 0,
      }));

      // 🚀 Panel kann jetzt rendern — Stage-1-Daten sind vollständig.
      setPartnerData(partner);
      setAvailableQuotes(initialAvailableQuotes);
      setPurchasedQuotes(dashboardData.purchased_quotes || []);
      setArchivedQuotes(dashboardData.archived_quotes || []);
      setMissedQuotes(preliminaryMissedQuotes);
      setPanelStatus('active');
      if (!silent) setLoading(false);

      /**
       * Stage 2 — Nicht-blockierende Anreicherung (parallel, im Hintergrund):
       *  - lead_purchase_count für Available-Quotes (nur wenn RPC das nicht lieferte)
       *  - Sold-Out-Rejections für Missed-Quotes (präzisere Normalisierung)
       *  - Refund-Requests (werden nur im Gekauft-Tab gebraucht)
       *  - last_activity Timestamp-Update (fire-and-forget)
       * Fehler hier dürfen die UI nicht umwerfen — wir loggen nur.
       */
      const availableQuoteIds = baseAvailableQuotes.map((q) => q.id).filter(Boolean);
      const needsPurchaseCounts =
        availableQuoteIds.length > 0 &&
        baseAvailableQuotes.some((q) => typeof q.lead_purchase_count !== 'number');
      const missedQuoteIds = missedQuotesRaw.map((q) => q.id).filter(Boolean);

      const purchaseCountsPromise = needsPurchaseCounts
        ? supabase
            .from('purchased_quotes')
            .select('quote_id')
            .in('quote_id', availableQuoteIds)
        : Promise.resolve({ data: null, error: null });

      const soldOutPromise =
        missedQuoteIds.length > 0
          ? supabase
              .from('partner_quote_rejections')
              .select('quote_id')
              .eq('partner_id', user.id)
              .eq('reason', 'Ausverkauft')
              .in('quote_id', missedQuoteIds)
          : Promise.resolve({ data: null, error: null });

      // Parallel starten — wir warten nur noch auf sie zum Aktualisieren der States,
      // nicht für das initiale Rendern.
      Promise.all([purchaseCountsPromise, soldOutPromise])
        .then(([purchaseCountsResult, soldOutResult]) => {
          // Purchase-Counts einbauen
          if (
            needsPurchaseCounts &&
            !purchaseCountsResult.error &&
            Array.isArray(purchaseCountsResult.data)
          ) {
            const purchaseCountByQuoteId = purchaseCountsResult.data.reduce((acc, row) => {
              const qid = row.quote_id;
              if (!qid) return acc;
              acc[qid] = (acc[qid] || 0) + 1;
              return acc;
            }, {});
            setAvailableQuotes((prev) =>
              prev.map((quote) => {
                // Wenn RPC bereits einen Count lieferte, den behalten
                if (typeof quote.lead_purchase_count === 'number' && quote.lead_purchase_count > 0) {
                  return quote;
                }
                const count = purchaseCountByQuoteId[quote.id] || 0;
                if (count === (quote.lead_purchase_count || 0)) return quote;
                return { ...quote, lead_purchase_count: count };
              })
            );
          } else if (purchaseCountsResult.error) {
            console.warn('Could not load lead purchase counts:', purchaseCountsResult.error.message);
          }

          // Sold-Out-Rejections in Missed-Normalisierung einbauen
          if (!soldOutResult.error && Array.isArray(soldOutResult.data) && soldOutResult.data.length > 0) {
            const soldOutIds = new Set(soldOutResult.data.map((r) => r.quote_id));
            setMissedQuotes((prev) =>
              prev.map((q) =>
                soldOutIds.has(q?.id) && q?.missed_reason !== 'Ausverkauft'
                  ? { ...q, missed_reason: 'Ausverkauft' }
                  : q
              )
            );
          } else if (soldOutResult.error) {
            console.warn('Could not load sold-out rejection rows:', soldOutResult.error.message);
          }
        })
        .catch((bgErr) => {
          // Stage-2 darf niemals die UI kaputtmachen
          console.warn('Background enrichment failed (non-fatal):', bgErr?.message || bgErr);
        });

      // Refund-Requests ebenfalls im Hintergrund — werden nur im "Gekauft"-Tab gelesen.
      fetchRefundRequests(user.id);

      // Fire-and-forget: last_activity für Admin-Tracking
      supabase
        .from('partners')
        .update({ last_activity: new Date().toISOString() })
        .eq('id', user.id)
        .then(({ error: activityError }) => {
          if (activityError) console.warn('Could not update last_activity:', activityError.message);
        });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      if (!silent) {
        setError(err.message);
        setPanelStatus('error');
        setLoading(false);
      }
    }
  }, [user, session, fetchRefundRequests]);

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