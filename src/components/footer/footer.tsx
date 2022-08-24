import { Github, Linkedin } from 'react-bootstrap-icons';
import clsx from 'clsx';
import { User } from 'next-auth';

import { Typography } from '../typography';
import { Container } from '../container';

import styles from './footer.module.css';

type FooterProps = {
  me: User;
};
export const Footer = ({ me }: FooterProps) => {
  const { githubLogin, linkedinUrl } = me as User & {
    githubLogin: string;
    linkedinUrl: string;
  };

  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__container}>
        <div className='flex'>
          <a
            className={clsx(styles.footer__social, 'mr-4')}
            href={linkedinUrl || '#'}
            rel='noopener noreferrer'
            target='_blank'
          >
            <Linkedin />
          </a>
          <a
            className={styles.footer__social}
            href={`https://github.com/${githubLogin}/`}
            rel='noopener noreferrer'
            target='_blank'
          >
            <Github />
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
