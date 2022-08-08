import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Button } from 'components/button';
import { Typography } from 'components';

import styles from './error.module.css';

type ErrorProps = { statusCode: number; message?: string };

export const ErrorComposition = ({ statusCode, message }: ErrorProps) => (
  <section className={styles.main}>
    <Typography as='h1' className='mt-4 text-2xl leading-4'>
      {message || (
        <>
          Sorry,
          <br />
          something went wrong...
        </>
      )}
    </Typography>

    <Typography
      as='h2'
      className={styles.subtitle}
      variant='super-title'
      gradient='pink-to-blue'
    >
      {statusCode}
    </Typography>

    <Link href='/'>
      <a>
        <Button>Go back to the home page</Button>
      </a>
    </Link>
  </section>
);
