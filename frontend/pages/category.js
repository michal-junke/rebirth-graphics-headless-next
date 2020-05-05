/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Error from 'next/error';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu/Menu';
import Config from '../config';

import styles from './styles/category.module.css';
import FeaturedImages from '../components/FeaturedImages/FeaturedImages';

const wp = new WPAPI({ endpoint: Config.apiUrl });

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;

    const categories = await wp
      .categories()
      .slug(slug)
      .embed();

    if (categories.length > 0) {
      const posts = await wp
        .posts()
        .category(categories[0].id)
        .embed();
      return { categories, posts };
    }

    return { categories };
  }

  render() {
    const {
      categories, posts, headerMenu, acfOptions,
    } = this.props;
    if (categories.length === 0) return <Error statusCode={404} />;

    const fposts = posts.map(post =>
      /* console.log(post); */
      (
        <div key={post.id} className={[styles['post-tease'], 'post-tease', 'pb-10', 'md:my-24', 'md:relative', 'md:mx-auto'].join(' ')}>
          <p className="text-right post-gap mt-2 md:hidden">{post.formatted_date}</p>
          <h2 className="md:px-24 mt-3 text-center leading-tight md:hidden">
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <a dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Link>
          </h2>
          <FeaturedImages images={post.acf.featured_gallery} />
          <div className="desktop-container lg:py-6 xl:py-10">
            {/* Heading and date for desktop */}
            <p className="text-right mt-2 hidden md:block pr-16 md:pb-4 lg:pb-6">{post.formatted_date}</p>
            <h2 className="md:px-24 mt-3 text-center leading-tight hidden md:block md:pb-6">
              <Link
                as={`/post/${post.slug}`}
                href={`/post?slug=${post.slug}&apiRoute=post`}
              >
                <a dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              </Link>
            </h2>
            <div className="tags pb-3 text-center md:pt-3 lg-pt-6">
              {post.tag_names.map(tag => (
                <span key={tag} className="pr-1">
                  #
                  {tag}
                </span>
              ))}
            </div>
            <div
              className=" md:px-16 md:mx-auto max-w-screen-md md:text-sm md:leading-tight lg:leading-normal"
            // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            />
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <button className={[styles['read-more'], 'block', 'cursor-pointer', 'ml-auto', 'mr-6', 'md:mr-24', 'text-2xl'].join(' ')} type="button">
                czytaj więcej...
              </button>
            </Link>
          </div>
        </div>
      ));
    return (
      <Layout acfOptions={acfOptions}>
        <Menu menu={headerMenu} />
        <div className="image-stub" style={{ background: 'violet', paddingBottom: '75%' }}>Test zdjęcia</div>
        <div className="post-list">
          {fposts}
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Category);
