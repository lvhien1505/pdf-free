import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.scss"

const BaseLayout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div className="container-content">
          {children}
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
