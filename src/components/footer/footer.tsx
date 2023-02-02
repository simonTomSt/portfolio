import { Github, Linkedin, EnvelopeFill } from 'react-bootstrap-icons';
import clsx from 'clsx';
import { User } from 'next-auth';

import { Typography } from '../typography';
import { Container } from '../container';

import styles from './footer.module.css';

type FooterProps = {
  me: User;
};
export const Footer = ({ me }: FooterProps) => {
  const { githubLogin, linkedinUrl, email } = me as User & {
    githubLogin: string;
    linkedinUrl: string;
    email: string;
  };

  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__container}>
        <div className='flex'>
          <a
            className={styles.footer__social}
            href={linkedinUrl || '#'}
            rel='noopener noreferrer'
            target='_blank'
          >
            <Linkedin />
          </a>
          <a
            className={clsx(styles.footer__social, 'mx-4')}
            href={`https://github.com/${githubLogin}/`}
            rel='noopener noreferrer'
            target='_blank'
          >
            <Github />
          </a>
          <a
            className={styles.footer__social}
            href={`mailto:${email}`}
            rel='noopener noreferrer'
          >
            <EnvelopeFill />
          </a>
        </div>

        <Typography variant='body-small' className={styles.footer__info}>
          Made with love and
          <a
            href='https://nextjs.org/'
            rel='noopener noreferrer'
            target='_blank'
          >
            Next.js
          </a>
          by
          <a href={`https://github.com/${githubLogin}/`}>simonTomSt</a>
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
};
