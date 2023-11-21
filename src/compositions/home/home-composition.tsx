import { TypeHomePageFields } from 'utils/cms/models';

import { Container, Footer } from '../../components';

import { AboutMeSection } from './about-me-section';
import { ContactSection } from './contact-section';
import { ProjectsSection } from './projects-section';
import { ScrollAside } from './scroll-sidebar';
import { SkillsSection } from './skills-section';
import { WelcomeSection } from './welcome-section';

type HomeCompositionProps = {
  homePageData: TypeHomePageFields;
};

export const HomeComposition = ({ homePageData }: HomeCompositionProps) => {
  const {
    subtitle,
    resume,
    aboutMeTitle,
    aboutMeDescription,
    skills,
    contactTitle,
    contactDescription,
    projectsTitle,
    projects,
  } = homePageData;

  return (
    <>
      <ScrollAside />
      <main>
        <WelcomeSection subtitle={subtitle} resume={resume} />
        <AboutMeSection
          aboutMeTitle={aboutMeTitle}
          aboutMeDescription={aboutMeDescription}
        />
        <Container>
          <SkillsSection skills={skills} />
          <ProjectsSection projectsTitle={projectsTitle} projects={projects} />
          <ContactSection
            contactTitle={contactTitle}
            contactDescription={contactDescription}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
};
