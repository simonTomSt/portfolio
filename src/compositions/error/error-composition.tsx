import React from 'react';

import Link from 'next/link';
import { ArrowLeft } from 'react-bootstrap-icons';

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
        <Button color='text'>
          <div className='flex items-center'>
            <ArrowLeft className='mr-2' /> Go back to the home page
          </div>
        </Button>
      </a>
    </Link>
  </section>
);
