import { Outlet } from 'react-router-dom';
import React from 'react';
import NavBar from './NavBar/NavBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
