import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PartnerDeleteModal = ({ partner, isOpen, onClose, onDelete }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  if (!partner) return null;

  const expectedText = partner.company_name || partner.name;
  const canDelete = confirmText === expectedText;

  const handleDelete = async () => {
    if (!canDelete) return;
    setLoading(true);
    try {
      await onDelete(partner.id);
      toast({ title: "Partner gelöscht", description: `${expectedText} wurde erfolgreich aus dem System entfernt.` });
      onClose();
    } catch (error) {
      toast({ title: "Fehler", description: "Beim Löschen des Partners ist ein Fehler aufgetreten.", variant: "destructive" });
    } finally {
      setLoading(false);
      setConfirmText('');
    }
  };

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" /> Partner Löschen Bestätigen
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            Sie sind dabei, den Partner <span className="font-bold">{expectedText}</span> endgültig zu löschen. Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <h4 className="font-medium text-red-800">Diese Aktion wird:</h4>
            <ul className="list-disc list-inside text-sm text-red-700 mt-1">
              <li>Den Partnerdatensatz löschen.</li>
              <li>Alle zugehörigen Daten entfernen.</li>
            </ul>
          </div>
          <div>
            <Label htmlFor="confirmText">Zur Bestätigung geben Sie den Namen des Partners ein: <code className="bg-gray-100 px-1 rounded">{expectedText}</code></Label>
            <Input
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Partnernamen hier eingeben"
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>Abbrechen</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={!canDelete || loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
            Endgültig löschen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDeleteModal;