import React from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

const Layout = props => {
  const { children, acfOptions, padding } = props;
  return (
    <div className="pt-8 md:pt-0">
      <Header />
      <main className={`${padding ? 'px-3 md:px-24' : ''}`}>
        {children}
      </main>
      <Footer acfOptions={acfOptions} />
    </div>
  );
};

export default Layout;
