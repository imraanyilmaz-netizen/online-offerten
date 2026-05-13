import React, { useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// framer-motion removed - CSS for better INP
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { transformSupabaseUrl } from '@/src/lib/supabaseImage';

const ImageLightbox = ({ images, selectedIndex, setSelectedIndex, onClose }) => {
  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [selectedIndex, images.length, setSelectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length, setSelectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  const isOpen = selectedIndex !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl w-full h-full flex items-center justify-center">
        <DialogTitle className="sr-only">Bildergalerie</DialogTitle>
        <DialogDescription className="sr-only">
          Vergrösserte Ansicht der Galeriebilder. Verwenden Sie die Pfeiltasten zum Navigieren.
        </DialogDescription>
        {isOpen && (
          <>
            <button
              className="absolute top-4 right-4 z-[60] p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}


              <img
                key={selectedIndex}
                src={transformSupabaseUrl(images[selectedIndex], { width: 2000, quality: 85 })}
                alt="Enlarged gallery view"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                loading="eager"
                decoding="async"
              />
            
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;