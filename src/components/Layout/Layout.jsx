import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;

  // Paths where you want to hide the header and footer
  const excludePaths = ["/sign-in", "/sign-up"];

  // Check if the current path is in the excludePaths array
  const shouldRenderHeaderAndFooter = !excludePaths.includes(pathname);

  return (
    <Fragment>
      {shouldRenderHeaderAndFooter && <Header />}
      <div>
        <Routers />
      </div>
      {shouldRenderHeaderAndFooter && <Footer />}
    </Fragment>
  );
};

export default Layout;

