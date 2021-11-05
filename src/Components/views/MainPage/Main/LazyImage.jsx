import React from 'react';
import noThumbnail from '@/assets/images/noThumbnail.jpg';

const LazyImage = ({ thumbnail }) => {
  return (
    <>
      <img
        src={thumbnail ? thumbnail : noThumbnail}
        alt={thumbnail ? 'thumbnail' : 'noThumbnail'}
      />
    </>
  );
};

export default LazyImage;
