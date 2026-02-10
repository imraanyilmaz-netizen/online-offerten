import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, UploadCloud, XCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { compressImage } from '@/lib/imageCompressor.js';

const GalleryImageUploader = ({ partnerId, currentImages = [], onUpdate }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newFiles.map(f => f.preview)]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB before compression
    onDropRejected: (fileRejections) => {
      toast({
        title: 'Fehler beim Hochladen',
        description: 'Einige Dateien konnten nicht hinzugefügt werden. (Max. 10MB, nur Bilder)',
        variant: 'destructive'
      });
    }
  });

  const removePreview = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const newImageUrls = [];
    
    const uploadPromises = files.map(async (file) => {
      try {
        const compressedFile = await compressImage(file, { quality: 0.8, maxWidth: 1920, maxHeight: 1080 });
        const fileExt = compressedFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${partnerId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('partner-gallery-images')
          .upload(filePath, compressedFile);

        if (uploadError) {
          throw new Error(`Fehler beim Hochladen von ${file.name}: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('partner-gallery-images')
          .getPublicUrl(filePath);
        
        newImageUrls.push(publicUrlData.publicUrl);
      } catch (compressionError) {
         throw new Error(`Fehler beim Komprimieren von ${file.name}: ${compressionError.message}`);
      }
    });

    try {
      await Promise.all(uploadPromises);

      const updatedImages = [...currentImages, ...newImageUrls];

      const { error: dbError } = await supabase
        .from('partners')
        .update({ gallery_images: updatedImages })
        .eq('id', partnerId);

      if (dbError) throw dbError;

      toast({ title: 'Erfolg', description: 'Galeriebilder erfolgreich hochgeladen!' });
      onUpdate(updatedImages);
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    const isConfirmed = window.confirm('Sind Sie sicher, dass Sie dieses Bild löschen möchten?');
    if (!isConfirmed) return;

    try {
      const urlParts = imageUrl.split('/');
      const fileName = urlParts.pop();
      const partnerIdFolder = urlParts.pop();
      const filePath = `${partnerIdFolder}/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('partner-gallery-images')
        .remove([filePath]);

      if (storageError) throw storageError;

      const updatedImages = currentImages.filter(img => img !== imageUrl);
      const { error: dbError } = await supabase
        .from('partners')
        .update({ gallery_images: updatedImages })
        .eq('id', partnerId);

      if (dbError) throw dbError;

      toast({ title: 'Erfolg', description: 'Bild erfolgreich gelöscht.' });
      onUpdate(updatedImages);
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({ title: 'Fehler', description: 'Bild konnte nicht gelöscht werden: ' + error.message, variant: 'destructive' });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium">Galeriebilder</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Laden Sie Bilder Ihrer Arbeit hoch, um sie auf Ihrer Profilseite zu präsentieren.
      </p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
          <UploadCloud className="w-10 h-10" />
          <p className="font-semibold">Bilder hierher ziehen oder klicken</p>
          <p className="text-xs">PNG, JPG, WEBP bis zu 10MB</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Vorschau zum Hochladen:</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img src={file.preview} alt="Vorschau" className="w-full h-24 object-cover rounded-md" loading="lazy" />
                <button
                  onClick={() => removePreview(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XCircle className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload} disabled={uploading} className="mt-4">
            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
            {uploading ? 'Wird hochgeladen...' : `${files.length} Bild(er) hochladen`}
          </Button>
        </div>
      )}

      <div className="mt-8">
        <h4 className="text-md font-semibold mb-4">Aktuelle Galeriebilder:</h4>
        {currentImages && currentImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {currentImages.map((image, index) => (
              <div key={index} className="relative group">
                <img src={image} alt={`Galeriebild ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" loading="lazy"/>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteImage(image)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Noch keine Galeriebilder hochgeladen.</p>
        )}
      </div>
    </div>
  );
};

export default GalleryImageUploader;