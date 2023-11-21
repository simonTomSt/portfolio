import { Fragment } from 'react';

import type { ExtendedAppProps } from 'next/app';

import '../styles/globals.css';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) => {
  const Layout = Component.layout || Fragment;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
