import { useState } from 'react';

import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ScrollContainer from 'react-indiana-drag-scroll';
import { CardImage } from 'react-bootstrap-icons';
import { BLOCKS } from '@contentful/rich-text-types';

import { SectionIndex } from 'constants/section-index';
import { TypeHomePageFields, TypeProject } from 'utils/cms/models';

import { Typography } from '../../../components';

import styles from './projects.module.css';
import { ProjectInfoModal } from './project-info-modal';

type ProjectsSectionProps = {
  projectsTitle: TypeHomePageFields['projectsTitle'];
  projects: TypeProject[];
};

export const ProjectsSection = ({
  projectsTitle,
  projects,
}: ProjectsSectionProps) => {
  const [openInfo, setOpenInfo] = useState<TypeProject['fields'] | null>(null);

  return (
    <section id={SectionIndex.Projects} className={styles.projects}>
      <Typography as='h2' variant='title' className={styles.projects__title}>
        {projectsTitle}
      </Typography>

      <ScrollContainer>
        <div className={styles.projects__container}>
          {projects.map(({ sys, fields }) => (
            <button
              key={sys.id}
              className={styles.project}
              onClick={() => setOpenInfo(fields)}
            >
              {fields.image ? (
                <Image
                  src={`https:${fields.image.fields.file.url}`}
                  height={300}
                  width={500}
                  alt={fields.title}
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
                  {fields.title}
                </Typography>
                {fields.shortDescription && (
                  <div>
                    {documentToReactComponents(fields.shortDescription, {
                      renderNode: {
                        // eslint-disable-next-line react/no-unstable-nested-components
                        [BLOCKS.PARAGRAPH]: (_node, children) => (
                          <Typography>{children}</Typography>
                        ),
                      },
                    })}
                  </div>
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
        href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_NAME}/`}
        rel='noreferrer noopener'
        target='_blank'
        className={styles.project__all}
      >
        See my all projects
      </a>
    </section>
  );
};
