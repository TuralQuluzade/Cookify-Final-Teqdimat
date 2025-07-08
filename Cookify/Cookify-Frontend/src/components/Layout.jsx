import React from 'react';
import Header from "./header/Header.jsx";
import {Outlet} from "react-router";
import Footer from "./footer/Footer.jsx";

const Layout = () => {
  return (
    <div>
        <Header />
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default Layout;