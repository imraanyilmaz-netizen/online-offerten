import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw, CheckCircle, XCircle, Clock, AlertTriangle, Building, MapPin, Calendar, Loader2, Inbox } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale/de';

const RefundRequestList = ({ refundRequests = [], onApprove, onReject, isProcessing }) => {
  const [rejectDialog, setRejectDialog] = useState({ open: false, refundId: null });
  const [rejectNote, setRejectNote] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ open: false, request: null });

  const pendingRequests = refundRequests.filter(r => r.status === 'pending');
  const resolvedRequests = refundRequests.filter(r => r.status !== 'pending');

  const handleConfirmApprove = (request) => {
    setConfirmDialog({ open: true, request });
  };

  const handleApprove = () => {
    if (confirmDialog.request) {
      onApprove(confirmDialog.request);
      setConfirmDialog({ open: false, request: null });
    }
  };

  const handleReject = () => {
    if (rejectDialog.refundId) {
      onReject(rejectDialog.refundId, rejectNote.trim() || null);
      setRejectDialog({ open: false, refundId: null });
      setRejectNote('');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300"><Clock className="w-3 h-3 mr-1" /> Ausstehend</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-300"><CheckCircle className="w-3 h-3 mr-1" /> Erstattet</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-300"><XCircle className="w-3 h-3 mr-1" /> Abgelehnt</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (refundRequests.length === 0) {
    return (
      <div className="text-center p-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <Inbox className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p className="text-lg font-medium">Keine Rückerstattungsanfragen vorhanden.</p>
      </div>
    );
  }

  const renderRequest = (request) => {
    const formattedDate = format(new Date(request.created_at), 'dd.MM.yyyy HH:mm', { locale: de });
    const resolvedDate = request.resolved_at ? format(new Date(request.resolved_at), 'dd.MM.yyyy HH:mm', { locale: de }) : null;

    return (
      <div
        key={request.id}
        className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${
          request.status === 'pending' ? 'border-orange-200' : 'border-gray-200'
        }`}
      >
        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            {/* Left: Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {getStatusBadge(request.status)}
                <span className="text-xs text-gray-500">{formattedDate}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-800">{request.partners?.company_name || 'Unbekannter Partner'}</span>
              </div>

              {request.quotes && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{request.quotes.servicetype} — {request.quotes.from_city}{request.quotes.to_city ? ` → ${request.quotes.to_city}` : ''}</span>
                </div>
              )}

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Grund:</span> {request.reason}
                </p>
              </div>

              {request.admin_note && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Admin-Notiz:</span> {request.admin_note}
                  </p>
                </div>
              )}

              {resolvedDate && (
                <p className="text-xs text-gray-500">
                  {request.status === 'approved' ? 'Erstattet' : 'Abgelehnt'} am {resolvedDate}
                </p>
              )}
            </div>

            {/* Right: Amount + Actions */}
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500">Betrag</p>
                <p className="text-xl font-bold text-orange-600">{request.amount.toFixed(2)} CHF</p>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleConfirmApprove(request)}
                    disabled={isProcessing}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Erstatten
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => setRejectDialog({ open: true, refundId: request.id })}
                    disabled={isProcessing}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Ablehnen
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Ausstehende Anfragen ({pendingRequests.length})
          </h3>
          <div className="space-y-3">
            {pendingRequests.map(renderRequest)}
          </div>
        </div>
      )}

      {/* Resolved Requests */}
      {resolvedRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-gray-400" />
            Bearbeitete Anfragen ({resolvedRequests.length})
          </h3>
          <div className="space-y-3 opacity-75">
            {resolvedRequests.map(renderRequest)}
          </div>
        </div>
      )}

      {/* Approve Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => !open && setConfirmDialog({ open: false, request: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              Rückerstattung bestätigen
            </DialogTitle>
            <DialogDescription>
              Möchten Sie <span className="font-bold">{confirmDialog.request?.amount?.toFixed(2)} CHF</span> an <span className="font-bold">{confirmDialog.request?.partners?.company_name}</span> erstatten? Der Betrag wird dem Bonus-Guthaben des Partners gutgeschrieben.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmDialog({ open: false, request: null })} disabled={isProcessing}>
              Abbrechen
            </Button>
            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white" disabled={isProcessing}>
              {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              Guthaben erstatten
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => { if (!open) { setRejectDialog({ open: false, refundId: null }); setRejectNote(''); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              Rückerstattung ablehnen
            </DialogTitle>
            <DialogDescription>
              Möchten Sie diese Rückerstattungsanfrage ablehnen?
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Begründung (optional)
            </label>
            <Textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="Grund für die Ablehnung..."
              rows={3}
              className="resize-none"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setRejectDialog({ open: false, refundId: null }); setRejectNote(''); }} disabled={isProcessing}>
              Abbrechen
            </Button>
            <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700 text-white" disabled={isProcessing}>
              {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
              Ablehnen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RefundRequestList;

