import React from 'react';
import sample from '@/assets/images/sample.gif';
import noThumbnail from '@/assets/images/noThumbnail.jpg';

const LazyImage = ({ thumbnail }) => {
  return (
    <>
      <img
        src={thumbnail ? sample : noThumbnail}
        alt={thumbnail ? 'sample' : 'noThumbnail'}
      />
    </>
  );
};

export default LazyImage;
