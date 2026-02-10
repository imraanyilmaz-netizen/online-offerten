import React, { useState, useEffect } from 'react';

const ImageWithFallback = ({ src, fallbackSrc = "https://via.placeholder.com/800x400?text=Bild+nicht+verfügbar", alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  // Update imgSrc when src prop changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setError(false);
    }
  }, [src]);

  const handleError = () => {
    // Prevent infinite loop if fallback also fails
    if (!error && imgSrc !== fallbackSrc) {
      setError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // If no src, show fallback immediately
  if (!src) {
    return (
      <img
        src={fallbackSrc}
        alt={alt || "Bild nicht verfügbar"}
        loading={props.loading || "lazy"}
        decoding="async"
        fetchPriority={props.fetchPriority || "auto"}
        width={props.width || 800}
        height={props.height || 400}
        style={{ display: 'block', ...props.style }}
        {...Object.fromEntries(Object.entries(props).filter(([key]) => 
          !['fetchPriority', 'fetchpriority', 'loading', 'width', 'height', 'style', 'src', 'fallbackSrc', 'alt'].includes(key)
        ))}
      />
    );
  }

  // Check if URL is from Supabase storage - don't try WebP conversion for Supabase URLs
  const isSupabaseStorage = src?.includes('supabase.co/storage') || src?.includes('supabase.storage');
  
  // Try WebP format first, fallback to original format
  // But skip WebP for Supabase storage URLs since they don't have WebP versions
  const webpSrc = !isSupabaseStorage && src?.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const isAboveFold = props.loading === 'eager' || props.fetchPriority === 'high';

  // If Supabase storage URL, use simple img tag without picture element
  if (isSupabaseStorage) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        loading={isAboveFold ? "eager" : (props.loading || "lazy")}
        decoding={isAboveFold ? "sync" : "async"}
        fetchPriority={props.fetchPriority || (isAboveFold ? "high" : "auto")}
        width={props.width || 800}
        height={props.height || 400}
        style={{ display: 'block', ...props.style }}
        {...Object.fromEntries(Object.entries(props).filter(([key]) => 
          !['fetchPriority', 'fetchpriority', 'loading', 'width', 'height', 'style', 'src', 'fallbackSrc', 'alt'].includes(key)
        ))}
      />
    );
  }

  return (
    <picture>
      {/* WebP source for better compression - only for non-Supabase URLs */}
      {webpSrc && webpSrc !== src && (
        <source
          type="image/webp"
          srcSet={webpSrc}
        />
      )}
      {/* Fallback to original format */}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        loading={isAboveFold ? "eager" : (props.loading || "lazy")}
        decoding={isAboveFold ? "sync" : "async"}
        fetchPriority={props.fetchPriority || (isAboveFold ? "high" : "auto")}
        width={props.width || 800}
        height={props.height || 400}
        style={{ display: 'block', ...props.style }}
        {...Object.fromEntries(Object.entries(props).filter(([key]) => 
          !['fetchPriority', 'fetchpriority', 'loading', 'width', 'height', 'style', 'src', 'fallbackSrc', 'alt'].includes(key)
        ))}
      />
    </picture>
  );
};

export default ImageWithFallback;