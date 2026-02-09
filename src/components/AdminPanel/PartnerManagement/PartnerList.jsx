import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Eye, Edit, Pause, Play, Star, TrendingUp, Calendar, Trash2, ExternalLink, Gift, Wallet, Loader2, Truck, Sparkles, Paintbrush } from 'lucide-react';
// framer-motion removed - CSS for better INP
import PartnerDetailView from './PartnerDetailView';
import PartnerEditModal from './PartnerEditModal';
import PartnerDeleteModal from './PartnerDeleteModal';
import PartnerFilters from './PartnerFilters';
import ManualCreditModal from './ManualCreditModal';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const PartnerList = ({ partners, onUpdatePartner, onDeletePartner, onRefresh }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [editingPartner, setEditingPartner] = useState(null);
  const [deletingPartner, setDeletingPartner] = useState(null);
  const [creditingPartner, setCreditingPartner] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const mainCategoryConfig = {
    umzug: { icon: Truck, label: 'Umzug' },
    reinigung: { icon: Sparkles, label: 'Reinigung' },
    maler: { icon: Paintbrush, label: 'Maler' },
  };

  const handleUpdateStatus = async (partnerId, newStatus) => {
    setUpdatingStatusId(partnerId);
    try {
      const functionName = newStatus === 'active' ? 'activate-partner' : 'deactivate-partner';
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { partnerId },
      });

      if (error) throw error;
      if (data && !data.success) throw new Error(data.error);

      const successMessage = newStatus === 'active'
        ? 'Partner erfolgreich aktiviert und Benachrichtigung gesendet.'
        : 'Partner erfolgreich deaktiviert.';
      
      toast({ title: 'Erfolg', description: successMessage });
      onRefresh();
    } catch (error) {
      toast({ title: 'Fehler', description: 'Beim Aktualisieren des Partner-Status ist ein Fehler aufgetreten.', variant: 'destructive' });
      console.error('Error updating partner status:', error);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Aktiv', className: 'bg-green-100 text-green-800 border-green-200 font-semibold' },
      inactive: { label: 'Inaktiv', className: 'bg-orange-100 text-orange-800 border-orange-200 font-semibold' },
      pending: { label: 'Ausstehend', className: 'bg-yellow-100 text-yellow-800 border-yellow-200 font-semibold' },
      rejected: { label: 'Abgelehnt', className: 'bg-red-100 text-red-800 border-red-200 font-semibold' },
    };
    const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800 border-gray-200 font-semibold' };
    return <Badge variant="outline" className={`${config.className} border px-3 py-1`}>{config.label}</Badge>;
  };

  const filteredPartners = partners.filter(partner => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
                         (partner.company_name && partner.company_name.toLowerCase().includes(searchLower)) ||
                         (partner.name && partner.name.toLowerCase().includes(searchLower)) ||
                         (partner.email && partner.email.toLowerCase().includes(searchLower));
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusActions = (partner) => {
    const isUpdating = updatingStatusId === partner.id;

    if (partner.status === 'active') {
      return (
        <Button 
          key="pause" 
          variant="outline" 
          size="sm" 
          onClick={() => handleUpdateStatus(partner.id, 'inactive')} 
          disabled={isUpdating} 
          className="text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 font-semibold"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Pause className="w-4 h-4 mr-1.5" />} 
          Deaktivieren
        </Button>
      );
    } else {
      return (
        <Button 
          key="activate" 
          variant="outline" 
          size="sm" 
          onClick={() => handleUpdateStatus(partner.id, 'active')} 
          disabled={isUpdating} 
          className="text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700 hover:border-green-400 font-semibold"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Play className="w-4 h-4 mr-1.5" />} 
          Aktivieren
        </Button>
      );
    }
  };

  const handleViewProfile = (slug) => {
    if (slug) window.open(`/partner/${slug}`, '_blank');
  };

  if (!partners) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Wird geladen...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PartnerFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter}
        filteredCount={filteredPartners.length}
      />
      
      {filteredPartners.length > 0 ? (
        <div className="space-y-4">
          {filteredPartners.map((partner, index) => (
            <div 
              key={partner.id}
            >
              <Card className={`transition-all duration-300 hover:shadow-xl border-l-4 ${
                partner.status === 'active' 
                  ? 'bg-white border-l-green-500 hover:border-l-green-600' 
                  : partner.status === 'pending'
                  ? 'bg-yellow-50/30 border-l-yellow-500 hover:border-l-yellow-600'
                  : 'bg-gray-50/50 border-l-gray-400 hover:border-l-gray-500'
              }`}>
                <CardContent className="p-5 md:p-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-900">{partner.company_name || partner.name}</h3>
                        {getStatusBadge(partner.status)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {(partner.main_categories || []).map(cat => {
                          const config = mainCategoryConfig[cat];
                          if (!config) return null;
                          const Icon = config.icon;
                          return (
                            <Badge 
                              key={cat} 
                              variant="outline" 
                              className="capitalize flex items-center gap-1.5 bg-gray-50 border-gray-200 text-gray-700 font-medium px-3 py-1"
                            >
                              <Icon className="w-3.5 h-3.5" /> {config.label}
                            </Badge>
                          );
                        })}
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700">{partner.email}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs font-medium text-gray-500">Bewertung</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            {(partner.rating || 0).toFixed(1)} <span className="text-xs font-normal text-gray-500">({partner.review_count || 0})</span>
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-medium text-gray-500">Käufe</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{partner.total_purchases || 0}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-xs font-medium text-gray-500">Umsatz</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">CHF {(partner.total_revenue || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Wallet className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-medium text-gray-500">Guthaben</span>
                          </div>
                          <span className="text-sm font-bold text-green-600">CHF {((partner.main_balance || 0) + (partner.bonus_balance || 0)).toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-xs font-medium text-gray-500">Beitritt</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{new Date(partner.join_date || partner.created_at).toLocaleDateString('de-DE')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-2 w-full lg:w-auto">
                      <div className="flex items-center gap-2 flex-wrap justify-start lg:justify-end w-full">
                      <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setSelectedPartner(partner)}
                              className="font-medium"
                            >
                              <Eye className="w-4 h-4 mr-1.5" />Details
                            </Button>
                        </DialogTrigger>
                        {selectedPartner && (
                        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
                            <DialogHeader><DialogTitle>Partner Details</DialogTitle></DialogHeader>
                            <PartnerDetailView partner={selectedPartner} />
                        </DialogContent>
                        )}
                      </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEditingPartner(partner)}
                          className="font-medium"
                        >
                          <Edit className="w-4 h-4 mr-1.5" />Bearbeiten
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCreditingPartner(partner)} 
                          className="text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700 hover:border-green-400 font-medium"
                        >
                          <Gift className="w-4 h-4 mr-1.5" />Guthaben
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => setDeletingPartner(partner)}
                          className="font-medium"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" />Löschen
                      </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-200 flex-wrap gap-3">
                       <div className="flex items-center gap-2 flex-wrap">
                           {getStatusActions(partner)}
                       </div>
                        {partner.slug && partner.status === 'active' && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => handleViewProfile(partner.slug)}
                        className="text-green-600 hover:text-green-700 font-semibold"
                      >
                        Öffentliches Profil ansehen <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                        )}
                   </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-1">Keine Partner gefunden</p>
            <p className="text-sm text-gray-500">Versuchen Sie, die Filterkriterien zu ändern.</p>
          </CardContent>
        </Card>
      )}

      <PartnerEditModal partner={editingPartner} isOpen={!!editingPartner} onClose={() => setEditingPartner(null)} onSave={onUpdatePartner} onRefresh={onRefresh} />
      <PartnerDeleteModal partner={deletingPartner} isOpen={!!deletingPartner} onClose={() => setDeletingPartner(null)} onDelete={onDeletePartner} />
      <ManualCreditModal partner={creditingPartner} isOpen={!!creditingPartner} onClose={() => setCreditingPartner(null)} onRefresh={onRefresh} />
    </div>
  );
};

export default PartnerList;