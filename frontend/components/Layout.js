import React from 'react';
import Header from './Header';
import Menu from './Menu/Menu';
import Footer from './Footer';

const Layout = props => {
  const { children } = props;
  return (
    <div>
      <Header />
      <main className={`py-10 ${props.padding ? 'px-3 md:px-24' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
