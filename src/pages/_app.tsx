import { Fragment, type ReactNode } from 'react';

import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';

import { AuthGuard } from 'containers';
import { isWindow } from 'utils/isWindow';

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

const getBaseUrl = () => {
  if (isWindow) {
    return '';
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
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
