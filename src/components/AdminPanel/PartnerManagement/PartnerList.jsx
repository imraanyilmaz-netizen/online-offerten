import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Eye, Edit, Pause, Play, Star, TrendingUp, Calendar, Trash2, ExternalLink, Gift, Wallet, Loader2, Truck, Sparkles, Paintbrush, Clock, Activity, Mail } from 'lucide-react';
// framer-motion removed - CSS for better INP
import PartnerDetailView from './PartnerDetailView';
import PartnerEditModal from './PartnerEditModal';
import PartnerDeleteModal from './PartnerDeleteModal';
import PartnerFilters from './PartnerFilters';
import ManualCreditModal from './ManualCreditModal';
import PartnerEmailModal from './PartnerEmailModal';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/src/components/ui/use-toast';

const PartnerList = ({ partners, onUpdatePartner, onDeletePartner, onRefresh }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [editingPartner, setEditingPartner] = useState(null);
  const [deletingPartner, setDeletingPartner] = useState(null);
  const [creditingPartner, setCreditingPartner] = useState(null);
  const [emailPartner, setEmailPartner] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const [sortBy, setSortBy] = useState('last_activity');

  const mainCategoryConfig = {
    umzug: { icon: Truck, label: 'Umzug' },
    reinigung: { icon: Sparkles, label: 'Reinigung' },
    maler: { icon: Paintbrush, label: 'Maler' },
  };

  // Helper: relative time in German
  const getRelativeTime = (dateString) => {
    if (!dateString) return null;
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMin < 5) return { text: 'Online', color: 'green', isOnline: true };
    if (diffMin < 60) return { text: `Vor ${diffMin} Min.`, color: 'green', isOnline: false };
    if (diffHours < 24) return { text: `Vor ${diffHours} Std.`, color: diffHours <= 3 ? 'green' : 'yellow', isOnline: false };
    if (diffDays < 7) return { text: `Vor ${diffDays} ${diffDays === 1 ? 'Tag' : 'Tagen'}`, color: 'yellow', isOnline: false };
    if (diffDays < 30) return { text: `Vor ${diffDays} Tagen`, color: 'red', isOnline: false };
    return { text: `Vor ${Math.floor(diffDays / 30)} Mon.`, color: 'red', isOnline: false };
  };

  const ActivityBadge = ({ lastActivity }) => {
    const activity = getRelativeTime(lastActivity);
    if (!activity) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/35" />
          Nie eingeloggt
        </span>
      );
    }
    const colorMap = {
      green: { dot: 'bg-green-500 dark:bg-emerald-500', text: 'text-green-700 dark:text-emerald-200', bg: 'bg-green-50 dark:bg-emerald-950/45' },
      yellow: { dot: 'bg-yellow-500 dark:bg-amber-500', text: 'text-yellow-700 dark:text-amber-200', bg: 'bg-yellow-50 dark:bg-amber-950/40' },
      red: { dot: 'bg-red-500', text: 'text-red-700 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-950/40' },
    };
    const colors = colorMap[activity.color];
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full`}>
        <span className={`w-2 h-2 rounded-full ${colors.dot} ${activity.isOnline ? 'animate-pulse' : ''}`} />
        {activity.text}
      </span>
    );
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

      // Bei Aktivierung: Versicherungs-Upload-Frist (30 Tage) setzen, falls noch keine Versicherung vorhanden
      if (newStatus === 'active') {
        const partner = partners.find(p => p.id === partnerId);
        if (!partner?.insurance_status || partner.insurance_status === 'none' || partner.insurance_status === 'pending_upload') {
          const deadline = new Date();
          deadline.setDate(deadline.getDate() + 30);
          await supabase
            .from('partners')
            .update({ 
              insurance_status: 'pending_upload',
              insurance_upload_deadline: deadline.toISOString(),
            })
            .eq('id', partnerId);
        }
      }

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
      active: { label: 'Aktiv', className: 'bg-green-100 text-green-800 border-green-200 dark:bg-emerald-950/55 dark:text-emerald-200 dark:border-emerald-800 font-semibold' },
      inactive: { label: 'Inaktiv', className: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/45 dark:text-orange-200 dark:border-orange-800 font-semibold' },
      pending: { label: 'Ausstehend', className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-amber-950/45 dark:text-amber-200 dark:border-amber-800 font-semibold' },
      rejected: { label: 'Abgelehnt', className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/45 dark:text-red-200 dark:border-red-900 font-semibold' },
    };
    const config = statusConfig[status] || { label: status, className: 'bg-muted text-foreground border-border font-semibold' };
    return <Badge variant="outline" className={`${config.className} border px-3 py-1`}>{config.label}</Badge>;
  };

  const filteredPartners = useMemo(() => {
    const filtered = partners.filter(partner => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
                           (partner.company_name && partner.company_name.toLowerCase().includes(searchLower)) ||
                           (partner.name && partner.name.toLowerCase().includes(searchLower)) ||
                           (partner.email && partner.email.toLowerCase().includes(searchLower));
      const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort by selected criteria
    return filtered.sort((a, b) => {
      if (sortBy === 'last_activity') {
        const aTime = a.last_activity ? new Date(a.last_activity).getTime() : 0;
        const bTime = b.last_activity ? new Date(b.last_activity).getTime() : 0;
        return bTime - aTime; // Most recently active first
      }
      if (sortBy === 'name') {
        return (a.company_name || a.name || '').localeCompare(b.company_name || b.name || '');
      }
      if (sortBy === 'created_at') {
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bTime - aTime;
      }
      return 0;
    });
  }, [partners, searchTerm, statusFilter, sortBy]);

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
          className="text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 dark:text-orange-400 dark:border-orange-700 dark:hover:bg-orange-950/40 dark:hover:text-orange-300 dark:hover:border-orange-600 font-semibold"
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
          className="text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700 hover:border-green-400 dark:text-emerald-400 dark:border-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 dark:hover:border-emerald-600 font-semibold"
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
          <Users className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Wird geladen...</p>
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
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      {filteredPartners.length > 0 ? (
        <div className="space-y-4">
          {filteredPartners.map((partner, index) => (
            <div 
              key={partner.id}
            >
              <Card className={`transition-all duration-300 hover:shadow-xl border-l-4 border-border ${
                partner.status === 'active' 
                  ? 'bg-card border-l-green-500 hover:border-l-green-600 dark:border-l-emerald-500 dark:hover:border-l-emerald-400' 
                  : partner.status === 'pending'
                  ? 'bg-yellow-50/30 dark:bg-amber-950/20 border-l-yellow-500 hover:border-l-yellow-600 dark:border-l-amber-500 dark:hover:border-l-amber-400'
                  : 'bg-muted/35 border-l-muted-foreground/50 hover:border-l-muted-foreground/70'
              }`}>
                <CardContent className="p-5 md:p-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-foreground">{partner.company_name || partner.name}</h3>
                          {getStatusBadge(partner.status)}
                          <ActivityBadge lastActivity={partner.last_activity} />
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
                              className="capitalize flex items-center gap-1.5 bg-muted/40 border-border text-foreground font-medium px-3 py-1"
                            >
                              <Icon className="w-3.5 h-3.5" /> {config.label}
                            </Badge>
                          );
                        })}
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-muted-foreground">{partner.email}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gradient-to-br from-muted/50 to-background dark:from-muted/30 dark:to-muted/10 rounded-lg border border-border">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 dark:text-amber-400" />
                            <span className="text-xs font-medium text-muted-foreground">Bewertung</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">
                            {(partner.rating || 0).toFixed(1)} <span className="text-xs font-normal text-muted-foreground">({partner.review_count || 0})</span>
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <span className="text-xs font-medium text-muted-foreground">Käufe</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">{partner.total_purchases || 0}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-xs font-medium text-muted-foreground">Umsatz</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">CHF {(partner.total_revenue || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Wallet className="w-4 h-4 text-green-500 dark:text-emerald-400" />
                            <span className="text-xs font-medium text-muted-foreground">Guthaben</span>
                          </div>
                          <span className="text-sm font-bold text-green-600 dark:text-emerald-400">CHF {((partner.main_balance || 0) + (partner.bonus_balance || 0)).toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Activity className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <span className="text-xs font-medium text-muted-foreground">Letzte Aktivität</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">
                            {partner.last_activity 
                              ? new Date(partner.last_activity).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
                              : 'Nie'}
                          </span>
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
                          onClick={() => setEmailPartner(partner)}
                          className="font-medium text-blue-700 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
                        >
                          <Mail className="w-4 h-4 mr-1.5" />E-Mail
                        </Button>
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
                          className="text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700 hover:border-green-400 dark:text-emerald-400 dark:border-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 dark:hover:border-emerald-600 font-medium"
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
                  
                  <div className="flex items-center justify-between pt-4 mt-5 border-t border-border flex-wrap gap-3">
                       <div className="flex items-center gap-2 flex-wrap">
                           {getStatusActions(partner)}
                       </div>
                        {partner.slug && partner.status === 'active' && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => handleViewProfile(partner.slug)}
                        className="text-green-600 hover:text-green-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold"
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
        <Card className="border-2 border-dashed border-border">
          <CardContent className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-4">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-1">Keine Partner gefunden</p>
            <p className="text-sm text-muted-foreground">Versuchen Sie, die Filterkriterien zu ändern.</p>
          </CardContent>
        </Card>
      )}

      <PartnerEditModal partner={editingPartner} isOpen={!!editingPartner} onClose={() => setEditingPartner(null)} onSave={onUpdatePartner} onRefresh={onRefresh} />
      <PartnerDeleteModal partner={deletingPartner} isOpen={!!deletingPartner} onClose={() => setDeletingPartner(null)} onDelete={onDeletePartner} />
      <ManualCreditModal partner={creditingPartner} isOpen={!!creditingPartner} onClose={() => setCreditingPartner(null)} onRefresh={onRefresh} />
      <PartnerEmailModal
        partner={emailPartner}
        isOpen={!!emailPartner}
        onClose={() => setEmailPartner(null)}
        onSent={onRefresh}
      />
    </div>
  );
};

export default PartnerList;