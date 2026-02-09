import React, { useState, useCallback } from 'react';
    import { useDropzone } from 'react-dropzone';
    import { Loader2, UploadCloud, XCircle } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    import { compressImage } from '@/lib/imageCompressor';
    
    const LogoUploader = ({ partnerId, currentLogoUrl, onUploadComplete, open, setOpen }) => {
      const [file, setFile] = useState(null);
      const [preview, setPreview] = useState(null);
      const [uploading, setUploading] = useState(false);
      const { toast } = useToast();
    
      const onDrop = useCallback(acceptedFiles => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
          setFile(selectedFile);
          setPreview(URL.createObjectURL(selectedFile));
        }
      }, []);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.svg'] },
        multiple: false,
        maxSize: 10 * 1024 * 1024, // 10MB before compression
        onDropRejected: (fileRejections) => {
            const message = fileRejections[0].errors[0].message === 'File is larger than 10485760 bytes'
                ? 'Datei ist zu gross (max. 10MB).'
                : 'Ungültiger Dateityp.';
            toast({ title: 'Fehler beim Hochladen', description: message, variant: 'destructive' });
        }
      });
    
      const handleUpload = async () => {
        if (!file || !partnerId) return;
    
        setUploading(true);
        
        try {
          const compressedFile = await compressImage(file, { quality: 0.9, maxWidth: 512, maxHeight: 512 });
          
          const fileExt = compressedFile.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `${partnerId}/${fileName}`;
    
          const { error: uploadError } = await supabase.storage
            .from('partner-logos')
            .upload(filePath, compressedFile);
    
          if (uploadError) throw uploadError;
    
          const { data: publicUrlData } = supabase.storage
            .from('partner-logos')
            .getPublicUrl(filePath);
    
          const publicURL = publicUrlData.publicUrl;
    
          const { error: dbError } = await supabase
            .from('partners')
            .update({ logo_url: publicURL })
            .eq('id', partnerId);
    
          if (dbError) throw dbError;
          
          toast({ title: 'Erfolg', description: 'Logo erfolgreich hochgeladen!' });
          onUploadComplete();
          handleClose();
    
        } catch (error) {
          console.error('Error uploading logo:', error);
          toast({ title: 'Fehler', description: 'Logo konnte nicht hochgeladen werden. ' + error.message, variant: 'destructive' });
        } finally {
          setUploading(false);
        }
      };
    
      const handleClose = () => {
        setFile(null);
        setPreview(null);
        setOpen(false);
      };
    
      return (
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Logo hochladen</DialogTitle>
              <DialogDescription>
                Laden Sie hier Ihr Firmenlogo hoch. Empfohlen: Quadratisches Format, max. 10MB.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div
                {...getRootProps()}
                className={`w-full p-6 border-2 border-dashed rounded-lg cursor-pointer text-center transition-colors
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <div className="relative w-32 h-32 mx-auto">
                    <img src={preview} alt="Vorschau" className="w-full h-full object-contain rounded-md" loading="lazy" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <XCircle className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="w-12 h-12 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {isDragActive ? 'Logo hier ablegen...' : 'Logo hierher ziehen oder klicken'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF oder SVG bis zu 10MB</p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose} disabled={uploading}>
                Abbrechen
              </Button>
              <Button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Hochladen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };
    
    export default LogoUploader;