import type { Content, Project, Skill } from '@prisma/client';
import { User } from 'next-auth';

import { Container, Footer } from '../../components';

import { AboutMeSection } from './about-me-section';
import { ContactSection } from './contact-section';
import { ProjectsSection } from './projects-section';
import { SkillsSection } from './skills-section';
import { WelcomeSection } from './welcome-section';

type HomeCompositionProps = {
  content: Content;
  prefetchedProjects: Project[] | null;
  prefetchedSkills: Skill[] | null;
  me: User;
};

export const HomeComposition = ({
  content,
  me,
  prefetchedProjects,
  prefetchedSkills,
}: HomeCompositionProps) => {
  const { welcome: welcomeSubtitle, aboutMe, contact: contactText } = content;

  return (
    <main>
      <WelcomeSection subtitle={welcomeSubtitle} me={me} />
      <AboutMeSection aboutMeInfo={aboutMe} />
      <Container>
        <SkillsSection skills={prefetchedSkills} />
        <ProjectsSection prefetchedProjects={prefetchedProjects} me={me} />
        <ContactSection contactText={contactText} me={me} />
      </Container>
      <Footer me={me} />
    </main>
  );
};
