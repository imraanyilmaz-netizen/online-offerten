import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, UploadCloud, XCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { compressImage } from '@/lib/imageCompressor.js';

const ImageUploader = ({ partnerId, currentImageUrl, onUpload, storagePath, dbField, title, description }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentImageUrl);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.svg', '.webp'] },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB before compression
    onDropRejected: (fileRejections) => {
      const message = fileRejections[0].errors[0].code === 'file-too-large'
        ? 'Datei ist zu gross (max. 10MB).'
        : 'Ungültiger Dateityp.';
      toast({ title: 'Fehler beim Hochladen', description: message, variant: 'destructive' });
    }
  });

  const handleUpload = async () => {
    if (!file || !partnerId) return;

    setUploading(true);

    try {
      const compressedFile = await compressImage(file, { quality: 0.8, maxWidth: 1920, maxHeight: 1080 });

      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${partnerId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(storagePath)
        .upload(filePath, compressedFile, { upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from(storagePath)
        .getPublicUrl(filePath);

      const publicURL = publicUrlData.publicUrl;

      const updateObject = {};
      updateObject[dbField] = publicURL;

      const { error: dbError } = await supabase
        .from('partners')
        .update(updateObject)
        .eq('id', partnerId);

      if (dbError) throw dbError;
      
      toast({ title: 'Erfolg', description: `${title} erfolgreich hochgeladen!` });
      onUpload(publicURL);
      setFile(null);

    } catch (error) {
      console.error(`Error uploading ${title}:`, error);
      toast({ title: 'Fehler', description: `${title} konnte nicht hochgeladen werden. ` + error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(currentImageUrl);
  };

  return (
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-start gap-4">
        <div
          {...getRootProps()}
          className={`relative w-32 h-32 flex-shrink-0 border-2 border-dashed rounded-lg cursor-pointer text-center transition-colors flex items-center justify-center
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <>
              <img src={preview} alt="Vorschau" className="w-full h-full object-contain rounded-md" loading="lazy" />
              {file && (
                <button
                  onClick={clearPreview}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <XCircle className="w-5 h-5 text-red-500" />
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
              <ImageIcon className="w-8 h-8" />
              <p className="text-xs">Bild auswählen</p>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <p className="text-xs text-gray-500 mb-2">
            Ziehen Sie eine Datei hierher oder klicken Sie, um sie auszuwählen. Max. 10MB.
          </p>
          <Button onClick={handleUpload} disabled={!file || uploading} size="sm">
            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
            {uploading ? 'Wird hochgeladen...' : 'Hochladen'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;