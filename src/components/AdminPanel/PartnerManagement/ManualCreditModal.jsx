import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Gift, Loader2 } from 'lucide-react';

const ManualCreditModal = ({ partner, isOpen, onClose, onRefresh }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!partner) return null;

  const handleAddCredit = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({ title: 'Ungültiger Betrag', description: 'Bitte geben Sie eine gültige, positive Zahl ein.', variant: 'destructive' });
      return;
    }
    if (!description.trim()) {
      toast({ title: 'Beschreibung erforderlich', description: 'Bitte geben Sie eine Beschreibung für diese Gutschrift ein.', variant: 'destructive' });
      return;
    }
    if (!user) {
        toast({ title: 'Authentifizierungsfehler', description: 'Der ausführende Admin konnte nicht gefunden werden.', variant: 'destructive' });
        return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.rpc('add_manual_credit', {
        p_partner_id: partner.id,
        p_amount: parseFloat(amount),
        p_description: description,
        p_admin_id: user.id,
      });

      if (error) throw error;

      toast({ title: 'Erfolgreich', description: `Dem Partner ${partner.company_name} wurden ${amount} CHF gutgeschrieben.` });
      onRefresh();
      window.dispatchEvent(new CustomEvent('transactions-updated'));
      handleClose();
    } catch (error) {
      console.error('Error adding manual credit:', error);
      toast({ title: 'Fehler', description: 'Beim Hinzufügen der Gutschrift ist ein Fehler aufgetreten.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-green-600" />
            Manuelle Gutschrift hinzufügen
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Partner: <span className="font-semibold">{partner.company_name}</span></p>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="amount">Gutschriftbetrag (CHF)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="z.B.: 50.00"
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Grund für die Gutschrift (z.B. Willkommensbonus, Rückerstattung etc.)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>Abbrechen</Button>
          <Button onClick={handleAddCredit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Gutschrift hinzufügen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualCreditModal;