'use client'

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const AdminPanelCore = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [partners, setPartners] = useState([]);
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);

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