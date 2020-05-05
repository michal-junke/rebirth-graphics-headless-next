import React from 'react';

const FeaturedImages = props => {
  const { images } = props;
  if (images === null) {
    return '';
  // eslint-disable-next-line no-else-return
  } else if (images.length > 1) {
    const imgGallery = images.map((img, index) => <img src={img} alt="" key={img} className={index > 0 ? 'md:hidden w-full h-full object-cover' : 'featured-image__img'} />);
    return (
      <div className="grid grid-cols-2 gap-2 py-3 md:py-0 md:grid-cols-1 md:absolute featured-image">
        {imgGallery}
      </div>
    );
  // eslint-disable-next-line no-else-return
  } else {
    return (
      <img src={images[0]} alt="" className="py-3 md:py-0 md:absolute featured-image" />
    );
  }
};

export default FeaturedImages;
