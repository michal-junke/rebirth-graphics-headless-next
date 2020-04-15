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
          <section className="social flex flex-col container grid-padding lg:order-1">
            <p className={[styles.tilted, 'lg:hidden'].join(' ')}>... passion for creation ...</p>
            <div className="social-icons flex justify-end pt-2 pb-4 lg:py-0">
              <a href={acfOptions.behance_url}><i className="rg-behance px-3"></i></a>
              <a href={acfOptions.facebook_url}><i className="rg-facebook px-3"></i></a>
              <a href={acfOptions.instagram_url}><i className="rg-instagram px-3"></i></a>
            </div>
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
