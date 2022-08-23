import React from 'react';

import Image from 'next/image';

import loaderIconPath from '@static/assets/loader.svg';

export const Loader = () => <Image src={loaderIconPath} alt='loading...' />;
