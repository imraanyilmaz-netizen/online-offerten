
    import React, { useState, useCallback } from 'react';
    import { useDropzone } from 'react-dropzone';
    import { supabase } from '@/lib/supabaseClient';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Loader2, Upload, Trash2, X } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    // framer-motion removed - CSS for better INP

    const GalleryImageManager = ({ partnerId, initialImages = [], onUpdate }) => {
      const [images, setImages] = useState(initialImages);
      const [uploading, setUploading] = useState(false);
      const [deleting, setDeleting] = useState(null);
      const { toast } = useToast();

      const onDrop = useCallback(async (acceptedFiles) => {
        if (!partnerId) return;

        setUploading(true);
        const uploadedUrls = [];

        for (const file of acceptedFiles) {
            const fileName = `${Date.now()}_${file.name}`;
            const filePath = `${partnerId}/${fileName}`;

            try {
                const { data, error } = await supabase.storage
                    .from('partner-gallery-images')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false,
                    });

                if (error) {
                    throw error;
                }

                const { data: urlData } = supabase.storage
                    .from('partner-gallery-images')
                    .getPublicUrl(filePath);
                
                uploadedUrls.push(urlData.publicUrl);

            } catch (error) {
                console.error('Upload error:', error);
                toast({
                    variant: "destructive",
                    title: "Fehler beim Hochladen",
                    description: `Datei ${file.name} konnte nicht hochgeladen werden.`,
                });
            }
        }
        
        if (uploadedUrls.length > 0) {
            const newImageList = [...images, ...uploadedUrls];
            const { error: dbError } = await supabase
                .from('partners')
                .update({ gallery_images: newImageList })
                .eq('id', partnerId);

            if (dbError) {
                toast({
                    variant: "destructive",
                    title: "Fehler beim Speichern",
                    description: "Die neuen Bilder konnten nicht gespeichert werden.",
                });
            } else {
                setImages(newImageList);
                onUpdate(newImageList);
                toast({
                    title: "Upload erfolgreich",
                    description: `${uploadedUrls.length} Bilder wurden hinzugefügt.`,
                });
            }
        }
        
        setUploading(false);
      }, [partnerId, images, toast, onUpdate]);

      const handleDelete = async (imageUrl) => {
        if (!partnerId) return;
        setDeleting(imageUrl);
        
        const path = imageUrl.substring(imageUrl.indexOf(`/${partnerId}/`) + 1);

        try {
            const { error: storageError } = await supabase.storage
                .from('partner-gallery-images')
                .remove([path]);
            
            if (storageError) {
                throw storageError;
            }

            const newImageList = images.filter(img => img !== imageUrl);
            const { error: dbError } = await supabase
                .from('partners')
                .update({ gallery_images: newImageList })
                .eq('id', partnerId);

            if (dbError) {
                throw dbError;
            }

            setImages(newImageList);
            onUpdate(newImageList);
            toast({
                title: "Bild gelöscht",
                description: "Das Bild wurde erfolgreich entfernt.",
            });
        } catch (error) {
            console.error('Delete error:', error);
            toast({
                variant: "destructive",
                title: "Fehler beim Löschen",
                description: "Das Bild konnte nicht gelöscht werden.",
            });
        } finally {
            setDeleting(null);
        }
      };

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif'] },
        multiple: true,
      });

      return (
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Galeriebilder</CardTitle>
            <CardDescription>Laden Sie Bilder hoch, die in Ihrem öffentlichen Profil angezeigt werden sollen.</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-2" />
                    <p className="text-sm text-gray-500">Bilder werden hochgeladen...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="font-semibold text-gray-700">Bilder hierher ziehen oder klicken</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (max. 5MB)</p>
                </div>
              )}
            </div>
            
            {images.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Hochgeladene Bilder</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  
                    {images.map((imgUrl) => (
                      <div
                        key={imgUrl}
                        layout
                        className="relative group aspect-square"
                      >
                        <img 
                          src={imgUrl} 
                          alt="Galeriebild" 
                          className="w-full h-full object-cover rounded-md shadow-sm" 
                          loading="lazy" 
                          decoding="async"
                          width="200"
                          height="200"
                          style={{ display: 'block' }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(imgUrl)}
                            disabled={deleting === imgUrl}
                          >
                            {deleting === imgUrl ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      );
    };

    export default GalleryImageManager;
  