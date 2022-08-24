import React from 'react';

import { Project } from '@prisma/client';
import Image from 'next/image';
import { User } from 'next-auth';

import { trpc } from 'utils/trpc';

import { Typography } from '../../../components';

import styles from './projects.module.css';

type ProjectsSectionProps = {
  prefetchedProjects: Project[] | null;
  me: User;
};

export const ProjectsSection = ({
  me: { githubLogin },
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
        I just love <br />
        creating side projects!
      </Typography>
      {projects.map(
        ({ id, image }) =>
          image && <Image key={id} src={image} height={200} width={300} />,
      )}
      <a href={`https://github.com/${githubLogin}/`} rel='noreferrer noopener'>
        See my all projects
      </a>
    </section>
  );
};
