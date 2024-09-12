import React from "react";
// import Footer from "../Footer";
import Footer from "@/components/Footer";
import Header from "../Header.js";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";

// =================== Change image path end ================== //

const Layout = ({ children }) => {
  return (
    <>

          {children}
          
    </>
  );
};

export default Layout;
