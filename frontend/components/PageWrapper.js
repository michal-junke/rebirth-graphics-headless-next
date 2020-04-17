import React from 'react';
import WPAPI from 'wpapi';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

// This route is copied from the plugin: wordpress/wp-content/plugins/wp-rest-api-v2-menus/wp-rest-api-v2-menus.php
wp.menus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');

// This route allows for gathering global options set in WP Admin section
wp.globalOptions = wp.registerRoute('acf/v3/options', '/headless-settings');

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const [headerMenu, childProps] = await Promise.all([
        wp.menus().id('header-menu'),
        Comp.getInitialProps ? Comp.getInitialProps(args) : {},
      ]);

      const acfOptions = await wp.globalOptions().then(data => data.acf);

      return {
        headerMenu,
        ...childProps,
        acfOptions
      };
    }

    render() {
      return <Comp {...this.props} />;
    }
  };

export default PageWrapper;
