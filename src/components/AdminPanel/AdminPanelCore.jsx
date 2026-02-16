'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const AdminPanelCore = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [partners, setPartners] = useState([]);
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);
  const debounceTimers = useRef({});

  // Debounce helper: prevents rapid re-fetches
  const debouncedFetch = useCallback((key, fn, delay = 800) => {
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    debounceTimers.current[key] = setTimeout(() => {
      fn();
    }, delay);
  }, []);

  const fetchStats = useCallback(async () => {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('get_admin_stats');
      if (error) {
        console.error('Error fetching admin stats:', error);
        toast({ title: 'Fehler', description: 'Statistiken konnten nicht geladen werden.', variant: 'destructive' });
      } else {
        setStats(data[0] || {});
      }
      return { data, error };
  }, [toast]);

  // Pending reviews sayısını direkt hesapla (sadece approval_status = 'pending' olanlar)
  const fetchPendingReviewsCount = useCallback(async () => {
    try {
      const supabase = createClient();
      const { count, error } = await supabase
        .from('customer_reviews')
        .select('*', { count: 'exact', head: true })
        .eq('approval_status', 'pending');
      
      if (error) {
        console.error('Error fetching pending reviews count:', error);
      } else {
        setPendingReviewsCount(count || 0);
      }
    } catch (error) {
      console.error('Error fetching pending reviews count:', error);
    }
  }, []);
  
  const fetchPartners = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({ title: 'Fehler', description: 'Partner konnten nicht aktualisiert werden.', variant: 'destructive' });
    }
  }, [toast]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchStats(),
      fetchPartners(),
      fetchPendingReviewsCount()
    ]);
    setLoading(false);
  }, [fetchStats, fetchPartners, fetchPendingReviewsCount]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // ──── Real-time Subscriptions ────
  useEffect(() => {
    const supabase = createClient();

    // 1) Partners tablosu: yeni partner kaydı veya güncelleme
    const partnersChannel = supabase
      .channel('admin-partners-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'partners' },
        (payload) => {
          console.log('[Realtime] Partners change:', payload.eventType);
          if (payload.eventType === 'INSERT') {
            toast({
              title: '🆕 Neuer Partner',
              description: `${payload.new?.company_name || 'Ein neuer Partner'} hat sich registriert.`,
            });
          }
          debouncedFetch('partners', () => {
            fetchPartners();
            fetchStats();
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') console.log('[Realtime] ✅ Partners channel active');
      });

    // 2) Quotes tablosu: yeni iş geldiğinde veya durum değiştiğinde
    const quotesChannel = supabase
      .channel('admin-quotes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quotes' },
        (payload) => {
          console.log('[Realtime] New quote:', payload.new?.id);
          toast({
            title: '📩 Neue Anfrage eingegangen!',
            description: `${payload.new?.servicetype || 'Anfrage'} – ${payload.new?.from_city || ''}${payload.new?.to_city ? ' → ' + payload.new.to_city : ''}`,
          });
          debouncedFetch('quotes-stats', fetchStats);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') console.log('[Realtime] ✅ Quotes channel active');
      });

    // 3) Customer Reviews: yeni yorum geldiğinde badge güncelle
    const reviewsChannel = supabase
      .channel('admin-reviews-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'customer_reviews' },
        (payload) => {
          console.log('[Realtime] Reviews change:', payload.eventType);
          if (payload.eventType === 'INSERT') {
            toast({
              title: '⭐ Neue Bewertung',
              description: 'Eine neue Kundenbewertung wurde eingereicht.',
            });
          }
          debouncedFetch('reviews', fetchPendingReviewsCount);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') console.log('[Realtime] ✅ Reviews channel active');
      });

    // Cleanup on unmount
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
      supabase.removeChannel(partnersChannel);
      supabase.removeChannel(quotesChannel);
      supabase.removeChannel(reviewsChannel);
    };
  }, [fetchPartners, fetchStats, fetchPendingReviewsCount, debouncedFetch, toast]);

  const handleUpdatePartnerStatus = async (partnerId, status) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('partners').update({ status }).eq('id', partnerId);
      if (error) throw error;
      toast({ title: 'Erfolgreich', description: 'Partnerstatus wurde aktualisiert.' });
      fetchPartners();
    } catch (error) {
      toast({ title: 'Fehler', description: 'Partnerstatus konnte nicht aktualisiert werden.', variant: 'destructive' });
      console.error('Error updating partner status:', error);
    }
  };

  const handleUpdatePartner = async (partnerId, updateData) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('partners').update(updateData).eq('id', partnerId);
      if (error) throw error;
      fetchPartners();
    } catch (error) {
      console.error('Error updating partner:', error);
      throw error;
    }
  };

  const handleDeletePartner = async (partnerId) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc('delete_partner_fully', { p_partner_id: partnerId });
      if (error) throw error;
      fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      throw error;
    }
  };

  return {
    loading,
    stats: { ...stats, pending_reviews_count: pendingReviewsCount },
    partners,
    fetchPartners,
    handleUpdatePartnerStatus,
    handleUpdatePartner,
    handleDeletePartner,
    fetchStats,
    fetchPendingReviewsCount
  };
};

export default AdminPanelCore;