import React from 'react';
import Header from './Header';
import Menu from './Menu/Menu';
import Footer from './Footer';

const Layout = props => {
  const { children } = props;
  return (
    <div className="pt-8">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
