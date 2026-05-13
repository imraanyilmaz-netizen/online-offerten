import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageLightbox from '@/components/ui/ImageLightbox';
import { transformSupabaseUrl } from '@/src/lib/supabaseImage';

const ImageGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const validImages = images ? images.filter(image => image) : [];

  if (validImages.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="shadow-lg rounded-xl border border-border bg-card text-card-foreground">
        <CardHeader className="p-6 border-b border-border">
          <CardTitle className="text-xl font-bold text-foreground">Galerie</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {validImages.map((image, index) => {
              const thumb = transformSupabaseUrl(image, {
                width: 400,
                height: 400,
                quality: 75,
                resize: 'cover',
              });
              return (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer bg-muted"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={thumb}
                    alt={`Galeriebild ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                    style={{ display: 'block' }}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {selectedImageIndex !== null && (
          <ImageLightbox
            images={validImages}
            selectedIndex={selectedImageIndex}
            setSelectedIndex={setSelectedImageIndex}
            onClose={closeLightbox}
          />
      )}
    </>
  );
};

export default ImageGallery;
