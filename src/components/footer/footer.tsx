import { Github, Linkedin, EnvelopeFill } from 'react-bootstrap-icons';
import clsx from 'clsx';

import { Typography } from '../typography';
import { Container } from '../container';

import styles from './footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <Container className={styles.footer__container}>
      <div className='flex'>
        <a
          className={styles.footer__social}
          href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
          rel='noopener noreferrer'
          target='_blank'
        >
          <Linkedin />
        </a>
        <a
          className={clsx(styles.footer__social, 'mx-4')}
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_NAME}/`}
          rel='noopener noreferrer'
          target='_blank'
        >
          <Github />
        </a>
        <a
          className={styles.footer__social}
          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
          rel='noopener noreferrer'
        >
          <EnvelopeFill />
        </a>
      </div>

      <Typography variant='body-small' className={styles.footer__info}>
        Made with love and
        <a href='https://nextjs.org/' rel='noopener noreferrer' target='_blank'>
          Next.js
        </a>
        by
        <a href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_NAME}`}>
          simonTomSt
        </a>
      </Typography>

      <Typography as='p' className={styles.footer__sourcecode}>
        <a
          href={process.env.NEXT_PUBLIC_SOURCE_CODE_URL}
          target='_blank'
          rel='noopener noreferrer'
        >
          Wanna see the source code?
        </a>
      </Typography>
    </Container>
  </footer>
);
