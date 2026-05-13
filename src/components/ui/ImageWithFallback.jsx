'use client'

import React, { useState, useEffect } from 'react';
import { transformSupabaseUrl, isSupabaseStorageUrl } from '@/src/lib/supabaseImage';

const PLACEHOLDER = '/image/online-offerten.webp';

const ImageWithFallback = ({
  src,
  fallbackSrc = PLACEHOLDER,
  alt,
  transform = undefined,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setError(false);
    }
  }, [src]);

  const handleError = () => {
    if (!error && imgSrc !== fallbackSrc) {
      setError(true);
      setImgSrc(fallbackSrc);
    }
  };

  if (!src) {
    return (
      <img
        src={fallbackSrc}
        alt={alt || 'Bild nicht verfügbar'}
        loading={props.loading || 'lazy'}
        decoding="async"
        fetchPriority={props.fetchPriority || 'auto'}
        width={props.width || 800}
        height={props.height || 400}
        style={{ display: 'block', ...props.style }}
        {...Object.fromEntries(
          Object.entries(props).filter(
            ([key]) =>
              !['fetchPriority', 'fetchpriority', 'loading', 'width', 'height', 'style', 'src', 'fallbackSrc', 'alt', 'transform'].includes(key)
          )
        )}
      />
    );
  }

  const isSupabase = isSupabaseStorageUrl(imgSrc);
  const isAboveFold = props.loading === 'eager' || props.fetchPriority === 'high';

  if (isSupabase) {
    // Supabase Image Transformations devrede: tek bir optimize URL döner.
    const transformed = transformSupabaseUrl(imgSrc, transform);
    return (
      <img
        src={transformed}
        alt={alt}
        onError={handleError}
        loading={isAboveFold ? 'eager' : props.loading || 'lazy'}
        decoding={isAboveFold ? 'sync' : 'async'}
        fetchPriority={props.fetchPriority || (isAboveFold ? 'high' : 'auto')}
        width={props.width || 800}
        height={props.height || 400}
        style={{ display: 'block', ...props.style }}
        {...Object.fromEntries(
          Object.entries(props).filter(
            ([key]) =>
              !['fetchPriority', 'fetchpriority', 'loading', 'width', 'height', 'style', 'src', 'fallbackSrc', 'alt', 'transform'].includes(key)
          )
        )}
      />
    );
  }

  const webpSrc = imgSrc?.replace?.(/\.(png|jpg|jpeg)$/i, '.webp');

  return (
    <picture>
      {webpSrc && webpSrc !== imgSrc && <source type="image/webp" srcSet={webpSrc} />}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        loading={isAboveFold ? 'eager' : props.loading || 'lazy'}
        decoding={isAboveFold ? 'sync' : 'async'}
        fetchPriority={props.fetchPriority || (isAboveFold ? 'high' : 'auto')}
        width={props.width || 800}
        height={props.height || 400}
        style={{ display: 'block', ...props.style }}
        {...Object.fromEntries(
          Object.entries(props).filter(
            ([key]) =>
              !['fetchPriority', 'fetchpriority', 'loading', 'width', 'height', 'style', 'src', 'fallbackSrc', 'alt', 'transform'].includes(key)
          )
        )}
      />
    </picture>
  );
};

export default ImageWithFallback;
