import { Fragment } from 'react';

import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';

import { AuthGuard } from 'containers';
import { getBaseUrl } from 'utils/functions/getBaseUrl';

import type { AppRouter } from '../server/router';

import '../styles/globals.css';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const AuthWrapper = Component.auth ? AuthGuard : Fragment;
  const Layout = Component.layout || Fragment;

  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthWrapper>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      transformer: superjson,
      url,
    };
  },
  ssr: false,
})(MyApp);
