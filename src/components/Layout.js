import React from 'react'
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
      <div className="flex flex-col items-center bg-black min-h-screen">
        <Navbar/>
        {children}
      </div>
    );
  };

export default Layout