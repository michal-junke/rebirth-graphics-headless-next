import React from 'react';
import Head from 'next/head';
/* import tachyons from 'tachyons/css/tachyons.min.css';
import stylesheet from '../src/styles/style.scss'; */

const Header = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>Rebirth Graphics - w budowie</title>
    <link rel="stylesheet" href="node_modules/@glidejs/glide/dist/css/glide.core.min.css" />
    <link rel="stylesheet" href="node_modules/@glidejs/glide/dist/css/glide.theme.min.css" />
  </Head>
);

export default Header;
