import React, { useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const lightboxVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

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
  const direction = 1; // You can enhance this to track swipe direction later

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 bg-transparent border-0 shadow-none max-w-6xl w-full h-full flex items-center justify-center">
        {isOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 z-[60] p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-8 w-8" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </motion.button>
              </>
            )}

            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt="Enlarged gallery view"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                custom={direction}
                variants={lightboxVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              />
            </AnimatePresence>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;