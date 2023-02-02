import Image from 'next/image';
import { marked } from 'marked';

import aboutMePhotoPath from '@static/assets/about-me.png';
import { SectionIndex } from 'constants/section-index';

import { Container, Typography } from '../../../components';

import styles from './about-me-section.module.css';

type AboutMeSectionProps = {
  aboutMeInfo: string;
};

export const AboutMeSection = ({ aboutMeInfo }: AboutMeSectionProps) => (
  <Container className={styles.container}>
    <section id={SectionIndex.AboutMe} className={styles['about-me']}>
      <Typography as='h2' variant='title' className={styles.title}>
        Let me tell you something about me
      </Typography>

      <div className={styles['about-me__body']}>
        <div
          className='styles.mardown'
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{
            __html: marked.parse(aboutMeInfo || ''),
          }}
        />
      </div>
      <div className={styles.image}>
        <Image src={aboutMePhotoPath} alt='Simon portrait' />
      </div>
    </section>
  </Container>
);
