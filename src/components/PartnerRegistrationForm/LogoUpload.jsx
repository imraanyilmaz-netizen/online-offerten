import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, XCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { compressImage } from '@/lib/imageCompressor.js';

const LogoUpload = ({ logoFile, onLogoChange, errors = {} }) => {
  const [preview, setPreview] = useState(null);
  const { toast } = useToast();

  // Update preview when logoFile changes
  React.useEffect(() => {
    if (logoFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(logoFile);
    } else if (logoFile) {
      setPreview(logoFile);
    } else {
      setPreview(null);
    }
  }, [logoFile]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      try {
        // Compress image
        const compressedFile = await compressImage(selectedFile, { 
          quality: 0.9, 
          maxWidth: 512, 
          maxHeight: 512 
        });
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);
        
        // Pass compressed file to parent
        onLogoChange(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
        toast({ 
          title: 'Fehler', 
          description: 'Bild konnte nicht verarbeitet werden.', 
          variant: 'destructive' 
        });
      }
    }
  }, [onLogoChange, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (fileRejections) => {
      const message = fileRejections[0].errors[0].code === 'file-too-large'
        ? 'Datei ist zu gross (max. 10MB).'
        : 'Ungültiger Dateityp. Nur Bilder erlaubt.';
      toast({ 
        title: 'Fehler beim Hochladen', 
        description: message, 
        variant: 'destructive' 
      });
    }
  });

  const clearLogo = (e) => {
    e.stopPropagation();
    setPreview(null);
    onLogoChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        Firmenlogo
      </label>
      <div
        {...getRootProps()}
        className={`relative w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors p-6
          ${isDragActive ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-slate-400'}
          ${errors.logo ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="flex items-center justify-center">
            <div className="relative">
              <img 
                src={preview} 
                alt="Logo Vorschau" 
                className="max-h-32 max-w-32 object-contain rounded-md" 
              />
              <button
                type="button"
                onClick={clearLogo}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors"
              >
                <XCircle className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 text-slate-500">
            <ImageIcon className="w-12 h-12" />
            <div className="text-center">
              <p className="text-sm font-medium">
                Logo hierher ziehen oder klicken zum Auswählen
              </p>
              <p className="text-xs mt-1">
                PNG, JPG, GIF, WEBP oder SVG (max. 10MB)
              </p>
            </div>
          </div>
        )}
      </div>
      {errors.logo && (
        <p className="text-sm text-red-600 mt-1">{errors.logo}</p>
      )}
    </div>
  );
};

export default LogoUpload;

