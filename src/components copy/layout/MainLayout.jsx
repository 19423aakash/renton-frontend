import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow bg-slate-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
