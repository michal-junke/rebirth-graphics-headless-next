import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu/Menu';

import Config from '../config';
import styles from './styles/index.module.css';

import Re from '../public/images/re-home-page.svg';
const wp = new WPAPI({ endpoint: Config.apiUrl });
wp.globalOptions = wp.registerRoute('acf/v3/options', '/headless-settings');

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50,
};

const tokenExpired = () => {
  if (process.browser) {
    localStorage.removeItem(Config.AUTH_TOKEN);
  }
  wp.setHeaders('Authorization', '');
  Router.push('/login');
};

class Index extends Component {

  static async getInitialProps() { 
    try {
      const page = await
        wp
          .pages()
          .slug('strona-glowna')
          .embed()
          .then(data => {
            return data[0];
          });

      const acfOptions = await
        wp
          .globalOptions()
          .then(data => data.acf);

      return { page, acfOptions };
    } catch (err) {
      if (err.data.status === 403) {
        tokenExpired();
      }
    }

    return null;
  }

  render() {
    const { headerMenu, page, acfOptions } = this.props;
    return (
      <Layout>
        <Menu menu={headerMenu} padding/>
        <div className="relative"> 
        <img src="https://via.placeholder.com/600x700" alt="" className="w-full my-4"/>
        <Re className={[styles['bottom-5'], styles['right-5'], 'absolute'].join(' ')}/>
        </div>
        <section className="social">
          <p className={styles.tilted}>... passion for creation ...</p>
          <a href={acfOptions.behance_url}>Behance</a>
          <a href={acfOptions.facebook_url}>Facebook</a>
          <a href={acfOptions.instagram_url}>Instagram</a>
        </section>
         <div // Content of the page in WP
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Index);
