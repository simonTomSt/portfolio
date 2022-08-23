import React from 'react';

import { Project } from '@prisma/client';
import Image from 'next/image';

import { trpc } from 'utils/trpc';

import { Typography } from '../../../components';

import styles from './projects.module.css';

type ProjectsSectionProps = {
  prefetchedProjects: Project[] | null;
};

export const ProjectsSection = ({
  prefetchedProjects,
}: ProjectsSectionProps) => {
  const { data: projects, status: projectsStatus } = trpc.useQuery(
    ['project.getAll'],
    {
      enabled: !prefetchedProjects,
      initialData: prefetchedProjects,
    },
  );

  if (!projects) return <div />;

  return (
    <section className={styles.projects}>
      <Typography as='h2' variant='title' className={styles.projects__title}>
        I just love creating side projects!
      </Typography>
      {projects.map(
        ({ id, image }) =>
          image && <Image key={id} src={image} height={200} width={300} />,
      )}
    </section>
  );
};
