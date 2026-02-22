'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/customSupabaseClient';
import { Mail, Plus, Loader2, Send, Clock, Search, Trash2, RotateCcw, CheckCircle, Eye, MousePointerClick } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale/de';

const PartnerInviteEmail = () => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [invitations, setInvitations] = useState([]);
  const [loadingInvitations, setLoadingInvitations] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sendingId, setSendingId] = useState(null);
  const [addingToList, setAddingToList] = useState(false);

  // Dialoge
  const [resendDialog, setResendDialog] = useState({ open: false, invitation: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, invitation: null });

  // Einladungen laden
  const fetchInvitations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('partner_invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching invitations:', error);
        return;
      }
      setInvitations(data || []);
    } catch (err) {
      console.error('Error fetching invitations:', err);
    } finally {
      setLoadingInvitations(false);
    }
  }, []);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  // Auto-refresh alle 30 Sekunden für Tracking-Updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchInvitations();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchInvitations]);

  // Firma zur Liste hinzufügen
  const handleAddToList = async () => {
    const name = companyName.trim();
    const email = companyEmail.trim();

    if (!name || !email) {
      toast({ variant: "destructive", title: "Fehler", description: "Bitte Firma und E-Mail eingeben." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ variant: "destructive", title: "Fehler", description: "Ungültige E-Mail-Adresse." });
      return;
    }

    setAddingToList(true);
    try {
      const { data, error } = await supabase
        .from('partner_invitations')
        .insert({ company_name: name, email: email, status: 'pending' })
        .select()
        .single();

      if (error) throw error;

      setInvitations(prev => [data, ...prev]);
      setCompanyName('');
      setCompanyEmail('');
      toast({ title: "Hinzugefügt", description: `${name} wurde zur Liste hinzugefügt.` });
    } catch (error) {
      console.error('Error adding to list:', error);
      toast({ variant: "destructive", title: "Fehler", description: error.message || "Fehler beim Hinzufügen." });
    } finally {
      setAddingToList(false);
    }
  };

  // Mail senden für eine Einladung (mit invitationId für Tracking)
  const sendEmailForInvitation = async (invitation) => {
    setSendingId(invitation.id);
    try {
      const { data, error } = await supabase.functions.invoke('partner-einladung-email', {
        body: {
          companies: [{
            name: invitation.company_name,
            email: invitation.email,
            invitationId: invitation.id
          }]
        }
      });

      if (error) throw error;

      const success = data.results?.[0]?.success;
      if (!success) throw new Error('E-Mail konnte nicht gesendet werden.');

      // Status in DB aktualisieren
      const { error: updateError } = await supabase
        .from('partner_invitations')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', invitation.id);

      if (updateError) console.error('Update error:', updateError);

      // Lokal aktualisieren
      setInvitations(prev => prev.map(inv =>
        inv.id === invitation.id ? { ...inv, status: 'sent', sent_at: new Date().toISOString() } : inv
      ));

      toast({ title: "Gesendet ✅", description: `E-Mail an ${invitation.company_name} wurde erfolgreich gesendet.` });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({ variant: "destructive", title: "Fehler", description: error.message || "E-Mail konnte nicht gesendet werden." });
    } finally {
      setSendingId(null);
    }
  };

  // Erneut senden
  const handleResendConfirm = async () => {
    const invitation = resendDialog.invitation;
    setResendDialog({ open: false, invitation: null });
    if (invitation) {
      await sendEmailForInvitation(invitation);
    }
  };

  // Einladung löschen
  const handleDeleteConfirm = async () => {
    const invitation = deleteDialog.invitation;
    setDeleteDialog({ open: false, invitation: null });
    if (!invitation) return;

    try {
      const { error } = await supabase
        .from('partner_invitations')
        .delete()
        .eq('id', invitation.id);

      if (error) throw error;

      setInvitations(prev => prev.filter(inv => inv.id !== invitation.id));
      toast({ title: "Gelöscht", description: `${invitation.company_name} wurde aus der Liste entfernt.` });
    } catch (error) {
      console.error('Error deleting invitation:', error);
      toast({ variant: "destructive", title: "Fehler", description: "Löschen fehlgeschlagen." });
    }
  };

  // Gefilterte Einladungen
  const filteredInvitations = invitations.filter(inv => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return inv.company_name.toLowerCase().includes(term) || inv.email.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-6">
      {/* Firma hinzufügen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Partner Einladung
          </CardTitle>
          <CardDescription>
            Fügen Sie Firmen zur Liste hinzu und senden Sie Einladungs-E-Mails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="company-name">Firma</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Firma name"
                className="mt-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAddToList()}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="company-email">E-Mail</Label>
              <Input
                id="company-email"
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                placeholder="E-Mail-Adresse"
                className="mt-1"
                onKeyDown={(e) => e.key === 'Enter' && handleAddToList()}
              />
            </div>
            <Button
              onClick={handleAddToList}
              disabled={addingToList}
              className="bg-green-600 hover:bg-green-700 text-white flex-shrink-0"
            >
              {addingToList ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Hinzufügen
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Einladungsliste */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Einladungsliste
                <span className="text-sm font-normal text-gray-500">({invitations.length})</span>
              </CardTitle>
              <CardDescription>
                Verwalten Sie Ihre Partner-Einladungen.
                <span className="inline-flex items-center gap-1 ml-2 text-xs">
                  <Eye className="w-3 h-3 text-green-500" /> = E-Mail geöffnet
                  <MousePointerClick className="w-3 h-3 text-blue-500 ml-2" /> = Link geklickt
                </span>
              </CardDescription>
            </div>
          </div>
          {invitations.length > 5 && (
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Suche nach Firma oder E-Mail..."
                className="pl-9"
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          {loadingInvitations ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : filteredInvitations.length === 0 ? (
            <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
              <Mail className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm font-medium">
                {searchTerm ? 'Keine Ergebnisse gefunden.' : 'Noch keine Einladungen in der Liste.'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Fügen Sie oben eine Firma hinzu.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredInvitations.map((inv) => {
                const isSending = sendingId === inv.id;
                const isSent = inv.status === 'sent';
                const hasOpened = !!inv.email_opened_at;
                const hasClicked = !!inv.link_clicked_at;

                return (
                  <div key={inv.id} className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${isSent ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">{inv.company_name}</p>
                        {isSent && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Gesendet
                          </span>
                        )}
                        {inv.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            Ausstehend
                          </span>
                        )}
                        {/* Tracking Icons */}
                        {isSent && (
                          <div className="flex items-center gap-1.5 ml-1">
                            <span title={hasOpened ? `Geöffnet am ${format(new Date(inv.email_opened_at), "d. MMM yyyy, HH:mm", { locale: de })}` : 'Noch nicht geöffnet'}>
                              <Eye className={`w-4 h-4 ${hasOpened ? 'text-green-500' : 'text-gray-300'}`} />
                            </span>
                            <span title={hasClicked ? `Geklickt am ${format(new Date(inv.link_clicked_at), "d. MMM yyyy, HH:mm", { locale: de })}` : 'Noch nicht geklickt'}>
                              <MousePointerClick className={`w-4 h-4 ${hasClicked ? 'text-blue-500' : 'text-gray-300'}`} />
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{inv.email}</p>
                      {isSent && inv.sent_at && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          Gesendet am {format(new Date(inv.sent_at), "d. MMM yyyy, HH:mm", { locale: de })}
                          {hasOpened && <span className="text-green-600 ml-2">• Geöffnet {format(new Date(inv.email_opened_at), "d. MMM, HH:mm", { locale: de })}</span>}
                          {hasClicked && <span className="text-blue-600 ml-2">• Geklickt {format(new Date(inv.link_clicked_at), "d. MMM, HH:mm", { locale: de })}</span>}
                        </p>
                      )}
                    </div>

                    {/* Aktionen */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      {isSent ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setResendDialog({ open: true, invitation: inv })}
                          disabled={isSending}
                          className="text-xs"
                        >
                          {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5 mr-1" />}
                          Erneut senden
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => sendEmailForInvitation(inv)}
                          disabled={isSending}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs"
                        >
                          {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Send className="w-3.5 h-3.5 mr-1" />}
                          Mail senden
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteDialog({ open: true, invitation: inv })}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Erneut senden Warnung */}
      <AlertDialog open={resendDialog.open} onOpenChange={(open) => !open && setResendDialog({ open: false, invitation: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ Erneut senden?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p className="mb-3">Sie haben bereits eine Einladung an diese Firma gesendet:</p>
                {resendDialog.invitation && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-3">
                    <p className="text-sm font-semibold text-gray-900">{resendDialog.invitation.company_name}</p>
                    <p className="text-xs text-gray-500">{resendDialog.invitation.email}</p>
                    {resendDialog.invitation.sent_at && (
                      <p className="text-xs text-yellow-700 mt-1">
                        Zuletzt gesendet am {format(new Date(resendDialog.invitation.sent_at), "d. MMM yyyy, HH:mm", { locale: de })}
                      </p>
                    )}
                  </div>
                )}
                <p>Möchten Sie die Einladung trotzdem erneut senden?</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleResendConfirm} className="bg-green-600 hover:bg-green-700">
              Trotzdem senden
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Löschen Bestätigung */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, invitation: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Einladung löschen?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                {deleteDialog.invitation && (
                  <p>Möchten Sie <strong>{deleteDialog.invitation.company_name}</strong> ({deleteDialog.invitation.email}) wirklich aus der Liste entfernen?</p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PartnerInviteEmail;
