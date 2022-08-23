import type { Skill } from '@prisma/client';

import { Typography } from '../../../components';
import { trpc } from '../../../utils/trpc';

import styles from './skills.module.css';

type SkillsSectionProps = {
  skills: Skill[] | null;
};

export const SkillsSection = ({ skills: ss }: SkillsSectionProps) => {
  const { data: skills, status: projectsStatus } = trpc.useQuery(
    ['skill.getAll'],
    {
      enabled: !ss,
      initialData: ss,
    },
  );

  if (!skills) return null;

  return (
    <section className={styles.skills}>
      <Typography as='h2' variant='title' className={styles.skills__title}>
        My tech stack
      </Typography>

      <div className={styles.skills__content}>
        {skills?.map((skill) => skill.name)}
      </div>
    </section>
  );
};
