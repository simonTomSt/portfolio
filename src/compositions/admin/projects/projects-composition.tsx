import { trpc } from 'utils/trpc';
import { AdminLayout } from 'containers/admin-layout';

export const ProjectsComposition = () => {
  const { data: projects } = trpc.useQuery(['project.getAll']);

  return <div />;
};

ProjectsComposition.auth = true;
ProjectsComposition.layout = AdminLayout;
