// Resimleri tarayıcıda yeniden boyutlandırıp WebP'ye çevirir.
// Eski JPEG çıktısına göre %25-35 daha küçük dosya, görsel kalite eşdeğer.
// WebP desteklenmezse otomatik JPEG'e düşer.

const isBrowser = () => typeof window !== 'undefined';

const supportsWebPEncoding = () => {
  if (!isBrowser()) return false;
  try {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    return false;
  }
};

export const compressImage = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const {
      quality = 0.8,
      maxWidth = 1920,
      maxHeight = 1080,
      preferWebP = true,
    } = options;

    const useWebP = preferWebP && supportsWebPEncoding();
    const targetMime = useWebP ? 'image/webp' : 'image/jpeg';
    const targetExt = useWebP ? 'webp' : 'jpeg';

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

        canvas.width = Math.round(width);
        canvas.height = Math.round(height);

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error(`Canvas to Blob conversion failed for ${targetMime}`));
              return;
            }
            const originalName = file.name.includes('.')
              ? file.name.substring(0, file.name.lastIndexOf('.'))
              : file.name;
            const newFile = new File([blob], `${originalName}.${targetExt}`, {
              type: targetMime,
              lastModified: Date.now(),
            });
            resolve(newFile);
          },
          targetMime,
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
