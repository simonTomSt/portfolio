import Head from 'next/head';
import type { Page } from 'next';
import { Content, Project, Skill } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

import { HomeComposition } from 'compositions/home';
import { trpc } from 'utils/trpc';
import { Loader } from 'components';
import { getBaseUrl } from 'utils/functions/getBaseUrl';
import { ErrorComposition } from 'compositions/error';

export const getStaticProps = async () => {
  let content: Content | null = null;
  let projects: Project[] | null = null;
  let skills: Skill[] | null = null;
  const baseUrl = getBaseUrl();

  try {
    const [contentRes, projectsRes, skillsRes] = await Promise.all([
      fetch(`${baseUrl}/api/content`),
      fetch(`${baseUrl}/api/project`),
      fetch(`${baseUrl}/api/skills`),
    ]);

    content = await contentRes.json();
    projects = await projectsRes.json();
    skills = await skillsRes.json();
  } catch (e) {
    Sentry.captureException(e);
  }

  return {
    props: {
      prefetchedContent: content,
      prefetchedProjects: projects,
      prefetchedSkills: skills,
    },
    revalidate: 10,
  };
};

type HomeProps = {
  prefetchedContent: Content | null;
  prefetchedProjects: Project[] | null;
  prefetchedSkills: Skill[] | null;
};

const Home: Page<HomeProps> = ({
  prefetchedContent,
  prefetchedProjects,
  prefetchedSkills,
}) => {
  const { data: content, status: contentStatus } = trpc.useQuery(
    ['content.getContent'],
    {
      enabled: !prefetchedContent,
      initialData: prefetchedContent,
    },
  );

  if (!content && contentStatus === 'loading') return <Loader />;
  if (!content || contentStatus === 'error')
    return (
      <ErrorComposition
        statusCode={500}
        message='Sorry could not load the page :('
      />
    );

  return (
    <>
      <Head>
        <title>Simon Stepien Full Stack Developer</title>
        <meta name='description' content='Simon Stepien Full Stack Developer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HomeComposition
        content={content}
        prefetchedProjects={prefetchedProjects}
        prefetchedSkills={prefetchedSkills}
      />
    </>
  );
};

export default Home;
