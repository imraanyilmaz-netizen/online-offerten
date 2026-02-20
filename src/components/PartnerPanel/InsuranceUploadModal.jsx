import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, FileText, X, Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const InsuranceUploadModal = ({ open, onOpenChange, partnerId, onSuccess }) => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [validUntil, setValidUntil] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf') {
      toast({ title: 'Fehler', description: 'Nur PDF-Dateien sind erlaubt.', variant: 'destructive' });
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      toast({ title: 'Fehler', description: 'Maximale Dateigrösse: 10 MB.', variant: 'destructive' });
      return;
    }
    setFile(selected);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file || !validUntil || !confirmed || !partnerId) {
      toast({ title: 'Fehler', description: 'Bitte füllen Sie alle Felder aus.', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      // 1) PDF in Storage hochladen
      const fileName = `${Date.now()}_versicherung.pdf`;
      const filePath = `${partnerId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('partner-insurance-docs')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // 2) Public URL erhalten
      const { data: publicUrlData } = supabase.storage
        .from('partner-insurance-docs')
        .getPublicUrl(filePath);

      const fileUrl = publicUrlData?.publicUrl || '';

      // 3) partner_insurance Eintrag erstellen/aktualisieren
      const { error: insertError } = await supabase
        .from('partner_insurance')
        .upsert({
          partner_id: partnerId,
          file_url: fileUrl,
          file_path: filePath,
          valid_until: validUntil,
          status: 'in_review',
          partner_confirmed: true,
          uploaded_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'partner_id'
        });

      if (insertError) {
        // Falls kein Unique Constraint auf partner_id, einfach INSERT
        const { error: fallbackError } = await supabase
          .from('partner_insurance')
          .insert({
            partner_id: partnerId,
            file_url: fileUrl,
            file_path: filePath,
            valid_until: validUntil,
            status: 'in_review',
            partner_confirmed: true,
            uploaded_at: new Date().toISOString(),
          });
        if (fallbackError) throw fallbackError;
      }

      // 4) partners.insurance_status aktualisieren
      const { error: partnerError } = await supabase
        .from('partners')
        .update({ 
          insurance_status: 'in_review',
          updated_at: new Date().toISOString()
        })
        .eq('id', partnerId);

      if (partnerError) throw partnerError;

      toast({ title: 'Erfolg', description: 'Ihre Versicherungsunterlagen wurden erfolgreich hochgeladen und werden geprüft.' });
      
      // Reset form
      setFile(null);
      setValidUntil('');
      setConfirmed(false);
      onOpenChange(false);
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error('Insurance upload error:', error);
      toast({ title: 'Fehler', description: `Upload fehlgeschlagen: ${error.message}`, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const isFormValid = file && validUntil && confirmed;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            Betriebshaftpflichtversicherung hochladen
          </DialogTitle>
          <DialogDescription>
            Laden Sie Ihre aktuelle Betriebshaftpflichtversicherung als PDF hoch. Nach der Prüfung durch unser Team können Sie Anfragen kaufen.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* PDF Upload */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">Versicherungsdokument (PDF)</Label>
            {!file ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">PDF auswählen oder hierher ziehen</span>
                <span className="text-xs text-gray-400 mt-1">Maximal 10 MB</span>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                <FileText className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile} className="text-gray-400 hover:text-red-500">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Gültig bis */}
          <div>
            <Label htmlFor="validUntil" className="text-sm font-semibold text-gray-700 mb-2 block">
              Gültig bis
            </Label>
            <Input
              id="validUntil"
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full"
            />
          </div>

          {/* Bestätigung */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="insuranceConfirm"
              checked={confirmed}
              onCheckedChange={setConfirmed}
              className="mt-0.5"
            />
            <Label htmlFor="insuranceConfirm" className="text-sm text-gray-700 leading-snug cursor-pointer">
              Ich bestätige, dass die hochgeladene Versicherung meine gewerbliche Tätigkeit vollständig abdeckt.
            </Label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={uploading}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid || uploading}>
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird hochgeladen...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Hochladen
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceUploadModal;

