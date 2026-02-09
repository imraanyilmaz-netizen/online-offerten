import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { parseFileUrls } from '@/lib/utils';

const Lightbox = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="p-0 m-0 bg-transparent border-0 max-w-none w-screen h-screen flex items-center justify-center">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80" onClick={onClose} />
          
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20 hover:text-white z-50" onClick={onClose}>
            <X className="h-8 w-8" />
          </Button>

          {images.length > 1 && (
            <>
              <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-50" onClick={handlePrev}>
                <ChevronLeft className="h-10 w-10" />
              </Button>
              <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-50" onClick={handleNext}>
                <ChevronRight className="h-10 w-10" />
              </Button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Quote image ${currentIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl z-40"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>

          <div className="absolute bottom-4 text-white text-lg z-50 bg-black/50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const QuoteImages = ({ imageUrls }) => {
  const { t } = useTranslation('partnerDashboard');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = parseFileUrls(imageUrls);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Camera size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-blue-700 mb-2">
              {t('quoteModal.imagesTitle')} ({images.length})
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {images.map((url, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square w-full bg-gray-200 rounded-md overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img 
                    src={url} 
                    alt={`Vom Kunden hochgeladenes Bild ${index + 1}`} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                    decoding="async"
                    width="150"
                    height="150"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            selectedIndex={selectedIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default QuoteImages;