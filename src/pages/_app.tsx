import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';

import { isWindow } from 'utils/isWindow';

import type { AppRouter } from '../server/router';

import '../styles/globals.css';

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);

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
