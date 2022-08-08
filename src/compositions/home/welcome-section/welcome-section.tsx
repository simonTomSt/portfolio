import { Typography } from 'components';

import styles from './welcome-section.module.css';

type WelcomeSectionProps = { subtitle: string };

export const WelcomeSection = ({ subtitle }: WelcomeSectionProps) => (
  <section className={styles.welcome}>
    <Typography as='h1' variant='super-title' className={styles.title}>
      <span className='text-gradient-pink-to-blue'>Full Stack</span>
      <br />
      <span className='text-gradient-blue-to-green'>Developer</span>
    </Typography>

    <Typography as='h2' variant='subtitle' className={styles.subtitle}>
      {subtitle}
    </Typography>
  </section>
);
