import { Content, Project } from '@prisma/client';

import { ProjectsSection } from './projects-section';
import { WelcomeSection } from './welcome-section';

type HomeCompositionProps = {
  content: Content;
  prefetchedProjects: Project[] | null;
};

export const HomeComposition = ({
  content,
  prefetchedProjects,
}: HomeCompositionProps) => {
  const { welcome: welcomeSubtitle, aboutMe, contact: contactText } = content;

  return (
    <main>
      <WelcomeSection subtitle={welcomeSubtitle} />
      <ProjectsSection prefetchedProjects={prefetchedProjects} />
    </main>
  );
};
