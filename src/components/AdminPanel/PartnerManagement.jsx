import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import PartnerList from './PartnerManagement/PartnerList';

const PartnerManagement = ({ partners, onRefresh }) => {
  const { toast } = useToast();

  const handleUpdatePartner = async (partnerId, updateData) => {
    try {
      const { error } = await supabase.from('partners').update(updateData).eq('id', partnerId);
      if (error) throw error;
      onRefresh();
    } catch (error) {
      console.error('Error updating partner:', error);
      throw error;
    }
  };

  const handleDeletePartner = async (partnerId) => {
    try {
      const { error } = await supabase.rpc('delete_partner_fully', { p_partner_id: partnerId });
      if (error) {
        throw error;
      }
      onRefresh();
    } catch (error) {
      console.error('Error deleting partner:', error);
      throw error;
    }
  };
  
  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8 space-y-6">
      <PartnerList
        partners={partners}
        onUpdatePartner={handleUpdatePartner}
        onDeletePartner={handleDeletePartner}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default PartnerManagement;