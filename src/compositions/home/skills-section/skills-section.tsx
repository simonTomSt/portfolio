import type { Skill } from '@prisma/client';
import Image from 'next/image';

import skillsTitleIconPath from '@static/assets/skills-title.svg';

import { Typography } from '../../../components';
import { trpc } from '../../../utils/trpc';

import styles from './skills.module.css';

type SkillsSectionProps = {
  skills: Skill[] | null;
};

export const SkillsSection = ({
  skills: prefetchedSkills,
}: SkillsSectionProps) => {
  const { data: skills, status: skillsStatus } = trpc.useQuery(
    ['skill.getAll'],
    {
      enabled: !prefetchedSkills,
      initialData: prefetchedSkills,
    },
  );

  if (!skills) return null;

  return (
    <section className={styles.skills}>
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
          {skills?.map(({ id, name }) => (
            <li key={id}>
              <Typography className={styles.skills__skill}>{name}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
