import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { SectionIndex } from 'constants/section-index';
import { Typography, Container, Button } from 'components';
import { TypeHomePageFields } from 'utils/cms/models';

import styles from './welcome-section.module.css';

type WelcomeSectionProps = {
  subtitle: TypeHomePageFields['subtitle'];
  resume: TypeHomePageFields['resume'];
};

export const WelcomeSection = ({ subtitle, resume }: WelcomeSectionProps) => (
  <section id={SectionIndex.Welcome} className={styles.welcome}>
    <Container className={styles.container}>
      <Typography as='h1' variant='super-title' className={styles.title}>
        <span className='text-gradient-pink-to-blue'>Full Stack</span>
        <br />
        <span className='text-gradient-blue-to-green'>Developer</span>
      </Typography>

      <div className={styles['subtitle-container']}>
        {documentToReactComponents(subtitle, {
          renderNode: {
            // eslint-disable-next-line react/no-unstable-nested-components
            [BLOCKS.PARAGRAPH]: (_node, children) => (
              <Typography
                as='h2'
                variant='subtitle'
                className={styles.subtitle}
              >
                {children}
              </Typography>
            ),
          },
        })}
      </div>

      <a
        href={`https:${resume.fields.file.url}`}
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
