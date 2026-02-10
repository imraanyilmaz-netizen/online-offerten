import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageLightbox from '@/components/ui/ImageLightbox';

const ImageGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  // Filter out any null or undefined image URLs to prevent errors
  const validImages = images ? images.filter(image => image) : [];

  if (validImages.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
        <CardHeader className="p-6 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-gray-800">Galerie</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"> {/* Changed lg:grid-cols-4 to lg:grid-cols-5 */}
            {validImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer bg-gray-200"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image}
                  alt={`Galeriebild ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="200"
                  style={{ display: 'block' }}
                />
              </div>
            ))}
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