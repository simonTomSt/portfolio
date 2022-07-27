import React from 'react';

import { Project } from '@prisma/client';

import { trpc } from 'utils/trpc';

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

  return <div>ProjectsSection</div>;
};
