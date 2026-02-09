export const compressImage = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const { quality = 0.8, maxWidth = 1920, maxHeight = 1080 } = options;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG format instead of WebP
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
              const newFile = new File([blob], `${originalName}.jpeg`, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(newFile);
            } else {
              reject(new Error('Canvas to Blob conversion failed for JPEG'));
            }
          },
          'image/jpeg', // Target format
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};