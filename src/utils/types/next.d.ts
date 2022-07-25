import type { FC } from 'react';

import type { AppProps as BaseAppProps } from 'next/app';
import type { NextComponentType } from 'next/types';

declare module 'next/app' {
  type AppProps = BaseAppProps & {
    Component: NextComponentType & { auth?: boolean; layout?: FC };
  };
}
