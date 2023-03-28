import { Fragment } from "react";

import MainHeader from "./main-header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
