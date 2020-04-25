import React from 'react';
import Header from './Header';
import Footer from './Footer/Footer';

const Layout = props => {
  const { children, acfOptions } = props;
  return (
    <div className="pt-8 md:pt-0">
      <Header />
      <main>
        {children}
      </main>
      <Footer acfOptions={acfOptions}/>
    </div>
  );
};

export default Layout;
