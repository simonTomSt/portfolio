import Image from 'next/image';

import skillsTitleIconPath from '@static/assets/skills-title.svg';
import { SectionIndex } from 'constants/section-index';
import { TypeSkill } from 'utils/cms/models';

import { Typography } from '../../../components';

import styles from './skills.module.css';

type SkillsSectionProps = {
  skills: TypeSkill[];
};

export const SkillsSection = ({ skills }: SkillsSectionProps) => (
  <section id={SectionIndex.TechStack} className={styles.skills}>
    <div className={styles['skills__title-container']}>
      <Typography
        as='h2'
        variant='large-title'
        className={styles.skills__title}
      >
        <span className={styles['skills__title--highlight']}>My</span>
        stack
      </Typography>
      <div className={styles['skills__title-image']}>
        <Image src={skillsTitleIconPath} layout='fill' />
      </div>
    </div>

    <div className={styles.skills__content}>
      <ul className={styles.skills__list}>
        {skills.map(({ sys, fields }) => (
          <li key={sys.id}>
            <Typography className={styles.skills__skill}>
              {fields.name}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
