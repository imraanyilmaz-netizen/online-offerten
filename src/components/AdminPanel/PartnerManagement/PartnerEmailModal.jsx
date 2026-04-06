import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/src/components/ui/use-toast';

/**
 * Popup: Betreff + Nachricht, Versand über Edge Function send-admin-partner-email
 */
const PartnerEmailModal = ({ partner, isOpen, onClose, onSent }) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isOpen && partner) {
      setSubject('');
      setMessage('');
    }
  }, [isOpen, partner?.id]);

  const handleSend = async () => {
    const sub = subject.trim();
    const msg = message.trim();
    if (!sub || !msg) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Bitte Betreff und Nachricht ausfüllen.',
      });
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-admin-partner-email', {
        body: {
          partnerId: partner.id,
          subject: sub,
          message: msg,
        },
      });

      if (error) throw error;
      if (data && data.success === false) {
        throw new Error(data.error || 'Unbekannter Fehler');
      }

      toast({
        title: 'E-Mail gesendet',
        description: `Nachricht wurde an ${partner.email} gesendet.`,
      });
      onSent?.();
      onClose();
    } catch (err) {
      console.error('send-admin-partner-email', err);
      toast({
        variant: 'destructive',
        title: 'Versand fehlgeschlagen',
        description: err.message || 'E-Mail konnte nicht gesendet werden.',
      });
    } finally {
      setSending(false);
    }
  };

  if (!partner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !sending && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-left">
            <Mail className="w-5 h-5 text-green-600" />
            E-Mail an Partner senden
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-1 text-sm text-gray-600 border-b border-gray-100 pb-3">
          <p>
            <span className="font-semibold text-gray-900">{partner.company_name || partner.name}</span>
          </p>
          <p className="font-mono text-xs break-all">{partner.email}</p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="partner-email-subject">Betreff *</Label>
            <Input
              id="partner-email-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Betreff eingeben"
              disabled={sending}
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partner-email-message">Nachricht *</Label>
            <Textarea
              id="partner-email-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ihre Nachricht an den Partner…"
              rows={10}
              disabled={sending}
              className="min-h-[200px] resize-y"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onClose} disabled={sending}>
            Abbrechen
          </Button>
          <Button
            type="button"
            onClick={handleSend}
            disabled={sending || !subject.trim() || !message.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gesendet…
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Senden
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerEmailModal;
