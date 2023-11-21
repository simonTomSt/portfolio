import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import aboutMePhotoPath from '@static/assets/about-me.png';
import { SectionIndex } from 'constants/section-index';
import { TypeHomePageFields } from 'utils/cms/models';

import { Container, Typography } from '../../../components';

import styles from './about-me-section.module.css';

type AboutMeSectionProps = {
  aboutMeTitle: TypeHomePageFields['aboutMeTitle'];
  aboutMeDescription: TypeHomePageFields['aboutMeDescription'];
};

export const AboutMeSection = ({
  aboutMeTitle,
  aboutMeDescription,
}: AboutMeSectionProps) => (
  <Container className={styles.container}>
    <section id={SectionIndex.AboutMe} className={styles['about-me']}>
      <Typography as='h2' variant='title' className={styles.title}>
        {aboutMeTitle}
      </Typography>

      <div className={styles['about-me__body']}>
        <div className='styles.mardown'>
          {documentToReactComponents(aboutMeDescription)}
        </div>
      </div>
      <div className={styles.image}>
        <Image src={aboutMePhotoPath} alt='Simon portrait' />
      </div>
    </section>
  </Container>
);
