import { Typography, Container, Button } from 'components';

import styles from './welcome-section.module.css';

type WelcomeSectionProps = { subtitle: string };

export const WelcomeSection = ({ subtitle }: WelcomeSectionProps) => (
  <section className={styles.welcome}>
    <Container className={styles.container}>
      <Typography as='h1' variant='super-title' className={styles.title}>
        <span className='text-gradient-pink-to-blue'>Full Stack</span>
        <br />
        <span className='text-gradient-blue-to-green'>Developer</span>
      </Typography>

      <div className={styles['subtitle-container']}>
        <Typography as='h2' variant='subtitle' className={styles.subtitle}>
          {subtitle}
        </Typography>
      </div>

      <a
        href='https://drive.google.com/file/d/16ZBBaPMvMUZyiE65NordvMmlwMY849Ua/view?usp=sharing'
        target='_blank'
        rel='noopener noreferrer'
        className={styles['view-cv']}
      >
        <Button size='large'>
          <Typography>View my resume</Typography>
        </Button>
      </a>
    </Container>
  </section>
);
