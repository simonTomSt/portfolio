import React, { useState } from 'react';

import { Project } from '@prisma/client';
import Image from 'next/image';
import { User } from 'next-auth';
import ScrollContainer from 'react-indiana-drag-scroll';
import { CardImage } from 'react-bootstrap-icons';

import { trpc } from 'utils/trpc';
import { SectionIndex } from 'constants/section-index';

import { Typography } from '../../../components';
import { ProjectType } from '../../../utils/types/common';

import styles from './projects.module.css';
import { ProjectInfoModal } from './project-info-modal';

type ProjectsSectionProps = {
  prefetchedProjects: Project[] | null;
  me: User;
};

export const ProjectsSection = ({
  me: { githubLogin },
  prefetchedProjects,
}: ProjectsSectionProps) => {
  const [openInfo, setOpenInfo] = useState<ProjectType | null>(null);
  const { data: projects } = trpc.useQuery(['project.getAll'], {
    enabled: !prefetchedProjects,
    initialData: prefetchedProjects,
  });

  if (!projects) return null;

  return (
    <section id={SectionIndex.Projects} className={styles.projects}>
      <Typography as='h2' variant='title' className={styles.projects__title}>
        I just love creating side projects!
      </Typography>

      <ScrollContainer>
        <div className={styles.projects__container}>
          {projects.map((project) => (
            <button
              key={project.id}
              className={styles.project}
              onClick={() => setOpenInfo(project)}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  height={300}
                  width={500}
                  alt={project.title}
                  className={styles.project__image}
                />
              ) : (
                <CardImage
                  className={styles.project__image}
                  height={150}
                  width={420}
                />
              )}

              <div className={styles.project__content}>
                <Typography as='h3' className={styles.project__title}>
                  {project.title}
                </Typography>
                {project.shortDescription && (
                  <Typography>{project.shortDescription}</Typography>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollContainer>

      <ProjectInfoModal
        project={openInfo}
        open={!!openInfo}
        onClose={() => setOpenInfo(null)}
      />

      <a
        href={`https://github.com/${githubLogin}/`}
        rel='noreferrer noopener'
        target='_blank'
        className={styles.project__all}
      >
        See my all projects
      </a>
    </section>
  );
};
