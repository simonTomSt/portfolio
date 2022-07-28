import type { FC, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next/type';

declare module 'next/app' {
  type ExtendedAppProps = AppProps & {
    Component: NextComponentType & { auth?: boolean; layout?: FC };
  };
}

declare module 'next' {
  type Page<P = {}, IP = P> = NextPage<P, IP> & {
    auth?: boolean;
    layout?: FC<{ children: ReactNode }>;
  };
}
