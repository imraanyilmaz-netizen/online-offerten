import React from 'react';

const cantonFlagUrls = {
  ZH: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/ccec475b86b24c863888233151bea0a4.png',
  BS: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/1c2e47e66ae3a14100f499db71a25dd2.png',
  BE: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/dc22018a7afaef7c9b1c60b6938fe5bd.png',
  LU: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/91d2ce2ca2245e84e8557a3152eade57.png',
  GE: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/7aeaa6249fa8bf63a063ed8c32927ffd.png',
  WI: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/ccb29f4c8008e2d87d550c94e853054b.png',
  AG: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/b0bb576d92a482c490e4a8f22df4a9d9.png',
  VD: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/c68b4e7052110c0786d0fe36f73e1098.png',
  SG: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/a7862e95ebd973850b460ba1e9515ce4.png',
  BB: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/d7a90cacae8a4b320709f2d69c5b6863.png',
  TH: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/e8c82e496b44c52c2e12690d74d94b2e.png',
  TI: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/0f0c8d2cb9ec005069fac74029aa8f8b.png',
  FR: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/6e5d30f5d4c961daa74904b234b95433.png',
};

const CantonFlag = ({ canton, className, ...props }) => {
  const flagUrl = cantonFlagUrls[canton];

  if (!flagUrl) {
    return null;
  }

  return (
    <img 
      src={flagUrl} 
      alt={`${canton} canton flag`} 
      className={className}
      {...props} 
    />
  );
};

export default CantonFlag;