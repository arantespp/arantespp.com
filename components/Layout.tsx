import * as React from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto prose md:prose-xl my-12">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
