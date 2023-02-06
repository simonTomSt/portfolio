import React from 'react';

import Image from 'next/image';
import clsx from 'clsx';

import loaderIconPath from '@static/assets/loader.svg';

type LoaderProps = {
  className?: string;
};

export const Loader = ({ className = '' }: LoaderProps) => (
  <span className={clsx('block w-max', className)}>
    <Image src={loaderIconPath} alt='loading...' />
  </span>
);
