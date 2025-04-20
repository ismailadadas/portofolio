import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body {
            font-family: 'Nunito', sans-serif;
            text-transform: none;
          }
          h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            text-transform: none;
          }
          button {
            text-transform: none;
          }
        `}</style>
      </Helmet>
      <main className="h-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 