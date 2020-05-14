import React from 'react';
import GlideSlider from '../GlideSlider/GlideSlider';

const SeeAlso = props => {
  const { category } = props;
  return (
    <>
      <h2 className="text-2xl text-center">poznaj też:</h2>
      <h3 className="font-sans uppercase grid-padding pb-1">
        {category.details.acf.interpunction}
        {category.details.name}
      </h3>
      <GlideSlider
        instance="category"
        className=""
        options={{
          type: 'slider',
          peek: { before: 0, after: 100 },
          gap: 20,
          perView: 4,
          breakpoints: {
            1450: {
              perView: 3,
            },
            1000: {
              perView: 2,
            },
            650: {
              perView: 1,
              peek: { before: 25, after: 80 },
            },
          },
        }}
      >
        {category.posts.map(post => (
          <div key={post.id}>
            <img src={post.acf.featured_gallery[0]} alt="" />
            {/* eslint-disable-next-line react/no-danger */}
            <h4 className="pt-1 pb-4 text-lg" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </div>
        ))}
      </GlideSlider>
    </>
  );
};

export default SeeAlso;
