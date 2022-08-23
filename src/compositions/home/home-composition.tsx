import type { Content, Project, Skill } from '@prisma/client';

import { Container, Logo } from '../../components';

import { AboutMeSection } from './about-me-section';
import { ContactSection } from './contact-section';
import { ProjectsSection } from './projects-section';
import { SkillsSection } from './skills-section';
import { WelcomeSection } from './welcome-section';

type HomeCompositionProps = {
  content: Content;
  prefetchedProjects: Project[] | null;
  prefetchedSkills: Skill[] | null;
};

export const HomeComposition = ({
  content,
  prefetchedProjects,
  prefetchedSkills,
}: HomeCompositionProps) => {
  const { welcome: welcomeSubtitle, aboutMe, contact: contactText } = content;

  return (
    <main>
      <WelcomeSection subtitle={welcomeSubtitle} />
      <AboutMeSection aboutMeInfo={aboutMe} />
      <Container>
        <SkillsSection skills={prefetchedSkills} />
        <ProjectsSection prefetchedProjects={prefetchedProjects} />
        <ContactSection contactText={contactText} />
      </Container>
    </main>
  );
};
