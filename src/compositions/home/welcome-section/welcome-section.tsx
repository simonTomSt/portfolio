import { Typography } from 'components';

import styles from './welcome-section.module.css';

export const WelcomeSection = () => (
  <section>
    <Typography as='h1' variant='super-title' className={styles.title}>
      <span className='bg-gradient-pink-to-blue'>Full Stack</span>
      <br />
      <span className='bg-gradient-blue-to-green'>Developer</span>
    </Typography>
  </section>
);
