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

    const fposts = posts.map(post => (
      <div key={post.id} className="pb-10">
        <p className="text-right px-3 md:px-24 mt-2">{post.formatted_date}</p>
        <h2 className="px-3 md:px-24 mt-1 text-center">
          <Link
            as={`/post/${post.slug}`}
            href={`/post?slug=${post.slug}&apiRoute=post`}
          >
            <a dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </h2>
        <FeaturedImages images={post.acf.featured_gallery} />
        <div className="pb-3 text-center">
          {post.tag_names.map(tag => (
            <span key={tag} className="pr-1">
              #
              {tag}
            </span>
          ))}
        </div>
        <div
          className="px-3 md:mx-auto max-w-screen-md"
            // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered,
          }}
        />
        <Link
          as={`/post/${post.slug}`}
          href={`/post?slug=${post.slug}&apiRoute=post`}
        >
          <button className={[styles['read-more'], 'block', 'cursor-pointer', 'ml-auto', 'mr-3', 'md:mr-24', 'text-2xl'].join(' ')} type="button">
            czytaj więcej...
          </button>
        </Link>
      </div>
    ));
    return (
      <Layout acfOptions={acfOptions}>
        <Menu menu={headerMenu} />
        <div className="image-stub" style={{ background: 'violet', paddingBottom: '75%' }}>Test zdjęcia</div>
        <div className="">
          {fposts}
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Category);
