import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldCheck, ShieldAlert, Clock, CheckCircle, XCircle, FileText, Search, ExternalLink, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const InsuranceManagement = ({ partners, onRefreshPartners }) => {
  const { toast } = useToast();
  const [insuranceRecords, setInsuranceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [rejectDialog, setRejectDialog] = useState({ open: false, record: null });
  const [rejectionReason, setRejectionReason] = useState('');
  const [manualApproveDialog, setManualApproveDialog] = useState({ open: false, record: null });
  const [manualValidUntil, setManualValidUntil] = useState('');

  const fetchInsuranceRecords = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('partner_insurance')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      console.log('[InsuranceManagement] Fetched records:', data);
      setInsuranceRecords(data || []);
    } catch (error) {
      console.error('Error fetching insurance records:', error);
      toast({ title: 'Fehler', description: 'Versicherungsdaten konnten nicht geladen werden.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchInsuranceRecords();
  }, [fetchInsuranceRecords]);

  // Combine insurance records with partner info
  const enrichedRecords = useMemo(() => {
    const partnerMap = new Map((partners || []).map(p => [p.id, p]));
    
    // Create records for all active partners (including those without insurance entry)
    const allRecords = [];
    
    // Add existing insurance records
    insuranceRecords.forEach(record => {
      const partner = partnerMap.get(record.partner_id);
      allRecords.push({
        ...record,
        company_name: partner?.company_name || partner?.name || 'Unbekannt',
        email: partner?.email || '',
        partner_status: partner?.status || 'unknown',
        insurance_status_from_partner: partner?.insurance_status,
      });
    });

    // Add ALL active partners without insurance records (including old partners with NULL insurance_status)
    (partners || []).forEach(partner => {
      if (partner.status === 'active' && !insuranceRecords.some(r => r.partner_id === partner.id)) {
        const effectiveStatus = (!partner.insurance_status || partner.insurance_status === 'none') ? 'no_insurance' : partner.insurance_status;
        allRecords.push({
          id: `virtual-${partner.id}`,
          partner_id: partner.id,
          status: effectiveStatus,
          upload_deadline: partner.insurance_upload_deadline,
          company_name: partner.company_name || partner.name || 'Unbekannt',
          email: partner.email || '',
          partner_status: partner.status,
          insurance_status_from_partner: partner.insurance_status,
          created_at: partner.created_at,
        });
      }
    });

    return allRecords;
  }, [insuranceRecords, partners]);

  const filteredRecords = useMemo(() => {
    return enrichedRecords.filter(record => {
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const matchesSearch = !searchTerm || 
        record.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [enrichedRecords, statusFilter, searchTerm]);

  const statusCounts = useMemo(() => {
    const counts = { all: enrichedRecords.length, no_insurance: 0, pending_upload: 0, in_review: 0, approved: 0, rejected: 0, expired: 0, deadline_passed: 0 };
    enrichedRecords.forEach(r => {
      if (counts[r.status] !== undefined) counts[r.status]++;
    });
    return counts;
  }, [enrichedRecords]);

  const handleApprove = async (record) => {
    setProcessingId(record.id);
    try {
      // Update partner_insurance
      if (!record.id.startsWith('virtual-')) {
        const { error } = await supabase
          .from('partner_insurance')
          .update({ 
            status: 'approved', 
            reviewed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', record.id);
        if (error) throw error;
      }

      // Update partner
      const { error: partnerError } = await supabase
        .from('partners')
        .update({ 
          insurance_status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', record.partner_id);
      if (partnerError) throw partnerError;

      // Email an Partner senden
      try {
        await supabase.functions.invoke('send-insurance-notification', {
          body: {
            type: 'approved',
            email: record.email,
            companyName: record.company_name,
            validUntil: record.valid_until || null,
          }
        });
      } catch (emailErr) {
        console.warn('Insurance email could not be sent:', emailErr);
      }

      toast({ title: 'Erfolg', description: `Versicherung von ${record.company_name} genehmigt.` });
      await fetchInsuranceRecords();
      if (onRefreshPartners) onRefreshPartners();
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } finally {
      setProcessingId(null);
    }
  };

  // Manuel genehmigen mit Datum
  const handleManualApprove = async () => {
    const record = manualApproveDialog.record;
    if (!record || !manualValidUntil) return;

    setProcessingId(record.id);
    try {
      // partner_insurance Eintrag erstellen oder aktualisieren
      if (!record.id.startsWith('virtual-')) {
        // Bestehenden Eintrag aktualisieren
        const { error } = await supabase
          .from('partner_insurance')
          .update({ 
            status: 'approved', 
            valid_until: manualValidUntil,
            reviewed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', record.id);
        if (error) throw error;
      } else {
        // Neuen Eintrag erstellen (Partner hat kein insurance Record)
        const { error } = await supabase
          .from('partner_insurance')
          .upsert({
            partner_id: record.partner_id,
            status: 'approved',
            valid_until: manualValidUntil,
            partner_confirmed: true,
            reviewed_at: new Date().toISOString(),
            uploaded_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'partner_id'
          });
        if (error) throw error;
      }

      // partners Tabelle aktualisieren (insurance_valid_until ist NICHT in partners, sondern in partner_insurance)
      const { error: partnerError } = await supabase
        .from('partners')
        .update({ 
          insurance_status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', record.partner_id);
      if (partnerError) throw partnerError;

      // Email an Partner senden
      try {
        await supabase.functions.invoke('send-insurance-notification', {
          body: {
            type: 'approved',
            email: record.email,
            companyName: record.company_name,
            validUntil: manualValidUntil,
          }
        });
      } catch (emailErr) {
        console.warn('Insurance email could not be sent:', emailErr);
      }

      toast({ title: 'Erfolg', description: `Versicherung von ${record.company_name} manuell genehmigt bis ${new Date(manualValidUntil).toLocaleDateString('de-DE')}.` });
      setManualApproveDialog({ open: false, record: null });
      setManualValidUntil('');
      await fetchInsuranceRecords();
      if (onRefreshPartners) onRefreshPartners();
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async () => {
    const record = rejectDialog.record;
    if (!record) return;

    setProcessingId(record.id);
    try {
      if (!record.id.startsWith('virtual-')) {
        const { error } = await supabase
          .from('partner_insurance')
          .update({ 
            status: 'rejected', 
            rejection_reason: rejectionReason,
            reviewed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', record.id);
        if (error) throw error;
      }

      const { error: partnerError } = await supabase
        .from('partners')
        .update({ 
          insurance_status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', record.partner_id);
      if (partnerError) throw partnerError;

      // Email an Partner senden
      try {
        await supabase.functions.invoke('send-insurance-notification', {
          body: {
            type: 'rejected',
            email: record.email,
            companyName: record.company_name,
            rejectionReason: rejectionReason || null,
          }
        });
      } catch (emailErr) {
        console.warn('Insurance email could not be sent:', emailErr);
      }

      toast({ title: 'Erfolg', description: `Versicherung von ${record.company_name} abgelehnt.` });
      setRejectDialog({ open: false, record: null });
      setRejectionReason('');
      await fetchInsuranceRecords();
      if (onRefreshPartners) onRefreshPartners();
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRevoke = async (record) => {
    setProcessingId(record.id);
    try {
      // partner_insurance Eintrag zurücksetzen falls vorhanden
      if (!record.id.startsWith('virtual-')) {
        const { error } = await supabase
          .from('partner_insurance')
          .update({ 
            status: 'pending_upload', 
            reviewed_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', record.id);
        if (error) throw error;
      }

      // Partner-Status: Upload-Frist 30 Tage
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + 30);

      const { error: partnerError } = await supabase
        .from('partners')
        .update({ 
          insurance_status: 'pending_upload',
          insurance_upload_deadline: deadline.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', record.partner_id);
      if (partnerError) throw partnerError;

      // Email an Partner senden
      try {
        await supabase.functions.invoke('send-insurance-notification', {
          body: {
            type: 'revoked',
            email: record.email,
            companyName: record.company_name,
          }
        });
      } catch (emailErr) {
        console.warn('Insurance email could not be sent:', emailErr);
      }

      toast({ title: 'Erfolg', description: `Versicherung von ${record.company_name} widerrufen. Partner muss innerhalb von 30 Tagen eine Versicherung hochladen.` });
      await fetchInsuranceRecords();
      if (onRefreshPartners) onRefreshPartners();
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      no_insurance: { label: 'Keine Versicherung', className: 'bg-gray-100 text-gray-800 border-gray-200', icon: ShieldAlert },
      pending_upload: { label: 'Ausstehend', className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      in_review: { label: 'In Prüfung', className: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
      approved: { label: 'Genehmigt', className: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      rejected: { label: 'Abgelehnt', className: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
      expired: { label: 'Abgelaufen', className: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle },
      deadline_passed: { label: 'Frist abgelaufen', className: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
    };
    const c = config[status] || { label: status, className: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock };
    const Icon = c.icon;
    return (
      <Badge variant="outline" className={`${c.className} border px-2.5 py-0.5 font-semibold`}>
        <Icon className="w-3 h-3 mr-1" />
        {c.label}
      </Badge>
    );
  };

  const getDaysInfo = (record) => {
    if (record.status === 'pending_upload' && record.upload_deadline) {
      const daysLeft = Math.ceil((new Date(record.upload_deadline) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 0) return <span className="text-xs text-red-600 font-semibold">Frist abgelaufen</span>;
      return <span className="text-xs text-yellow-600">Noch {daysLeft} Tage</span>;
    }
    if (record.valid_until) {
      const daysLeft = Math.ceil((new Date(record.valid_until) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 0) return <span className="text-xs text-red-600 font-semibold">Abgelaufen</span>;
      if (daysLeft <= 30) return <span className="text-xs text-orange-600">Noch {daysLeft} Tage gültig</span>;
      return null;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            Versicherungsverwaltung
          </h2>
          <p className="text-sm text-gray-500 mt-1">{enrichedRecords.length} Partner mit Versicherungsstatus</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Partner suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder="Status filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle ({statusCounts.all})</SelectItem>
              <SelectItem value="in_review">In Prüfung ({statusCounts.in_review})</SelectItem>
              <SelectItem value="pending_upload">Ausstehend ({statusCounts.pending_upload})</SelectItem>
              <SelectItem value="approved">Genehmigt ({statusCounts.approved})</SelectItem>
              <SelectItem value="rejected">Abgelehnt ({statusCounts.rejected})</SelectItem>
              <SelectItem value="no_insurance">Keine Versicherung ({statusCounts.no_insurance})</SelectItem>
              <SelectItem value="expired">Abgelaufen ({statusCounts.expired})</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Records List */}
      {filteredRecords.length > 0 ? (
        <div className="space-y-3">
          {filteredRecords.map(record => (
            <Card key={record.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="text-base font-bold text-gray-900">{record.company_name}</h3>
                      {getStatusBadge(record.status)}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{record.email}</p>
                    <div className="flex items-center gap-4 flex-wrap text-sm">
                      {record.uploaded_at && record.status !== 'pending_upload' && record.status !== 'no_insurance' && record.status !== 'none' && (
                        <span className="text-gray-500">
                          📄 Hochgeladen: {new Date(record.uploaded_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                      {record.valid_until && (
                        <span className="text-gray-600 font-medium">
                          📅 Gültig bis: {new Date(record.valid_until).toLocaleDateString('de-DE')}
                        </span>
                      )}
                      {getDaysInfo(record)}
                      {record.rejection_reason && (
                        <span className="text-red-600 text-xs">Grund: {record.rejection_reason}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* PDF ansehen */}
                    {record.file_url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(record.file_url, '_blank')}
                      >
                        <FileText className="w-4 h-4 mr-1.5" />
                        PDF ansehen
                      </Button>
                    )}
                    {/* PDF fehlt Hinweis bei in_review ohne file_url */}
                    {record.status === 'in_review' && !record.file_url && (
                      <span className="text-xs text-orange-600">⚠️ Kein PDF gefunden</span>
                    )}

                    {/* Approve / Reject buttons — für in_review */}
                    {record.status === 'in_review' && (
                      <>
                        <Button 
                          size="sm"
                          onClick={() => handleApprove(record)}
                          disabled={processingId === record.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {processingId === record.id ? (
                            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-1.5" />
                          )}
                          Genehmigen
                        </Button>
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => setRejectDialog({ open: true, record })}
                          disabled={processingId === record.id}
                        >
                          <XCircle className="w-4 h-4 mr-1.5" />
                          Ablehnen
                        </Button>
                      </>
                    )}

                    {/* Manuel genehmigen — für no_insurance / none / pending_upload (bekannte Partner ohne Dokument) */}
                    {(record.status === 'no_insurance' || record.status === 'none' || record.status === 'pending_upload') && (
                      <Button 
                        size="sm"
                        onClick={() => { setManualApproveDialog({ open: true, record }); setManualValidUntil(''); }}
                        disabled={processingId === record.id}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {processingId === record.id ? (
                          <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-1.5" />
                        )}
                        Manuel genehmigen
                      </Button>
                    )}

                    {/* Widerrufen — für approved (Genehmigung zurücknehmen) */}
                    {record.status === 'approved' && (
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevoke(record)}
                        disabled={processingId === record.id}
                        className="text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                      >
                        {processingId === record.id ? (
                          <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1.5" />
                        )}
                        Widerrufen
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="text-center py-16">
            <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700 mb-1">Keine Einträge gefunden</p>
            <p className="text-sm text-gray-500">Versuchen Sie, die Filterkriterien zu ändern.</p>
          </CardContent>
        </Card>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => { if (!open) { setRejectDialog({ open: false, record: null }); setRejectionReason(''); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Versicherung ablehnen</DialogTitle>
            <DialogDescription>
              Versicherung von <strong>{rejectDialog.record?.company_name}</strong> ablehnen. Bitte geben Sie einen Grund an.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejectionReason">Ablehnungsgrund</Label>
            <Textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="z.B. Dokument unleserlich, falsche Versicherungsart..."
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setRejectDialog({ open: false, record: null }); setRejectionReason(''); }}>
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={processingId === rejectDialog.record?.id}>
              {processingId === rejectDialog.record?.id ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <XCircle className="w-4 h-4 mr-1.5" />
              )}
              Ablehnen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manuel Genehmigen Dialog */}
      <Dialog open={manualApproveDialog.open} onOpenChange={(open) => { if (!open) { setManualApproveDialog({ open: false, record: null }); setManualValidUntil(''); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Versicherung manuell genehmigen</DialogTitle>
            <DialogDescription>
              Versicherung von <strong>{manualApproveDialog.record?.company_name}</strong> manuell genehmigen. Bitte geben Sie das Ablaufdatum der Versicherung ein.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="manualValidUntil">Gültig bis (Ablaufdatum) *</Label>
              <Input
                id="manualValidUntil"
                type="date"
                value={manualValidUntil}
                onChange={(e) => setManualValidUntil(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-2"
              />
            </div>
            {manualValidUntil && (
              <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                ✅ Versicherung wird genehmigt bis <strong>{new Date(manualValidUntil).toLocaleDateString('de-DE')}</strong>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setManualApproveDialog({ open: false, record: null }); setManualValidUntil(''); }}>
              Abbrechen
            </Button>
            <Button 
              onClick={handleManualApprove} 
              disabled={!manualValidUntil || processingId === manualApproveDialog.record?.id}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {processingId === manualApproveDialog.record?.id ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-1.5" />
              )}
              Genehmigen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsuranceManagement;

