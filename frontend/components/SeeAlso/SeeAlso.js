/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import GlideSlider from '../GlideSlider/GlideSlider';

import styles from './SeeAlso.module.scss';

const SeeAlso = props => {
  const { category, buttons } = props;
  return (
    <>
      <h2 className="text-3xl text-center">poznaj też:</h2>
      <h3 className="font-sans uppercase grid-padding pb-1 text-4xl">
        {category.details.acf.interpunction}
        {category.details.name}
      </h3>
      <GlideSlider
        instance="category"
        className=" mb-10 md:mb-32"
        buttons={buttons}
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
          <div key={post.id} className={`${styles.seeAlso} relative`}>
            <Link href={`/${post.cat_slug}/${post.slug}`}>
              <a>
                <img src={post.acf.featured_gallery[0]} alt="" />
                <div className={`${styles.apla} md:absolute md:inset-0 md:invisible`}>
                  {/* eslint-disable-next-line react/no-danger */}
                  <h4 className="pt-1 pb-4 text-xl leading-tight" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </div>
              </a>
            </Link>
          </div>
        ))}
      </GlideSlider>
      <hr className={`mb-6 ${styles.hr}`} />
    </>
  );
};

export default SeeAlso;
