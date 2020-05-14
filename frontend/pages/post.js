import React, { Component } from 'react';
import WPAPI from 'wpapi';
import Menu from '../components/Menu/Menu';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Config from '../config';

import styles from './styles/post.module.scss';
const wp = new WPAPI({ endpoint: Config.apiUrl });

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;

    let apiMethod = wp.posts();

    switch (apiRoute) {
      case 'category':
        apiMethod = wp.categories();
        break;
      case 'page':
        apiMethod = wp.pages();
        break;
      default:
        break;
    }

    const post = await apiMethod
      .slug(slug)
      .embed()
      .then(data => data[0]);

    return { post };
  }

  render() {
    const { post, headerMenu, acfOptions } = this.props;
    if (post === undefined || !post.title) {
      return (
        <Layout acfOptions={acfOptions}>
          <Menu menu={headerMenu} />
          <div>Niestety, nie ma takiego wpisu :(</div>
        </Layout>
      );
    }

    const heroUrl = (post.acf.featured_gallery[0]);
    const tags = (post.tag_names.map(tag => (
      <span key={tag} className="pr-1">
        #
        {tag}
      </span>
    )));
    return (
      <Layout className="md:pt-32 lg:pt-56" acfOptions={acfOptions}>
        <Menu menu={headerMenu} isFixed />
        <div className="grid-margin">
          <p className="text-right mt-2 pb-4 md:pb-6 md:mx-auto" style={{ maxWidth: '674px' }}>{post.formatted_date}</p>
          {/* eslint-disable-next-line react/no-danger */}
          <h1 style={{ maxWidth: '33rem' }} className="text-center mx-auto block" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <hr className="hidden md:block mx-auto my-4" style={{ maxWidth: '674px', borderColor: '#000', borderTopWidth: '0.5px' }} />
          <div className="tags pb-3 text-center hidden md:block">
            {tags}
          </div>
        </div>
        {heroUrl ? (
          <div className={`hero flex items-center post-type-${post.type}`}>
            <img className="mx-auto block py-4" src={heroUrl} alt="" />
          </div>
        ) : ''}
        <div className="tags text-center md:hidden">
          {tags}
        </div>
        <div className={`post-content post-${post.id} post-type-${post.type}${post.categories[0] === 3 ? ` ${styles.letter}` : '' }`}>
          <div
            className="block mx-auto"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Post);
