import React from 'react';

const FeaturedImages = props => {
  const { images } = props;
  if (images === null) {
    return '';
  // eslint-disable-next-line no-else-return
  } else if (images.length > 1) {
    const imgGallery = images.map(img => <img src={img} alt="" key={img} />);
    return (
      <div className="grid grid-cols-2 gap-2 py-3">
        {imgGallery}
      </div>
    );
  // eslint-disable-next-line no-else-return
  } else {
    return (
      <img src={images[0]} alt="" className="gap py-3 md:mx-auto" />
    );
  }
};

export default FeaturedImages;
