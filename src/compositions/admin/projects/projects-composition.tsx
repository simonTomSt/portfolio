import { useState } from 'react';

import { Project } from '@prisma/client';

import { trpc } from 'utils/trpc';
import { RowInfo, RowInfoItem, Button, Loader } from 'components';
import { ErrorComposition } from 'compositions/error';

import { ProjectModal } from './project-modal';

export const ProjectsComposition = () => {
  const {
    data: projects,
    status: projectsStatus,
    error,
  } = trpc.useQuery(['project.getAll']);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  if (projectsStatus === 'loading') return <Loader />;
  if (projectsStatus === 'error')
    return (
      <ErrorComposition
        statusCode={error.data?.httpStatus || 500}
        message={error.message}
      />
    );

  return (
    <>
      {projects?.map((project) => (
        <RowInfo key={project.id} onClick={() => setActiveProject(project)}>
          <RowInfoItem>{project.title}</RowInfoItem>
        </RowInfo>
      ))}

      <ProjectModal
        open={!!activeProject}
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

      <Button onClick={() => setActiveProject({} as Project)}>
        Add new project
      </Button>
    </>
  );
};
