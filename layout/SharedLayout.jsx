import Head from "next/head";
import React from "react";

const SharedLayout = ({ title, navBar, footer, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {navBar}
      <main>{children}</main>
      <footer>{footer}</footer>
    </>
  );
};

export default SharedLayout;
