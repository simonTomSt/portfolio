import Head from 'next/head';
import type { Page } from 'next';
import { Content, Project, Skill } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { User } from 'next-auth';

import { HomeComposition } from 'compositions/home';
import { trpc } from 'utils/trpc';
import { Loader } from 'components';
import { getBaseUrl } from 'utils/functions/getBaseUrl';
import { ErrorComposition } from 'compositions/error';

export const getStaticProps = async () => {
  let content: Content | null = null;
  let me: User | null = null;
  let projects: Project[] | null = null;
  let skills: Skill[] | null = null;
  const baseUrl = getBaseUrl();

  try {
    const [contentRes, meRes, projectsRes, skillsRes] = await Promise.all([
      fetch(`${baseUrl}/api/content`),
      fetch(`${baseUrl}/api/me`),
      fetch(`${baseUrl}/api/project`),
      fetch(`${baseUrl}/api/skills`),
    ]);

    content = await contentRes.json();
    me = await meRes.json();
    projects = await projectsRes.json();
    skills = await skillsRes.json();
  } catch (e) {
    Sentry.captureException(e);
  }

  return {
    props: {
      prefetchedContent: content,
      prefetchedMe: me,
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
  prefetchedMe: User[] | null;
};

const Home: Page<HomeProps> = ({
  prefetchedContent,
  prefetchedMe,
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

  const { data: me, status: getMeStatus } = trpc.useQuery(['user.get'], {
    enabled: !prefetchedMe,
    initialData: prefetchedMe,
  });

  if (
    [
      !content && contentStatus === 'loading',
      !me && getMeStatus === 'loading',
    ].includes(true)
  )
    return <Loader />;

  if (
    [
      !content,
      contentStatus === 'error',
      !me,
      getMeStatus === 'error',
    ].includes(true)
  )
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
        content={content!}
        me={me!}
        prefetchedProjects={prefetchedProjects}
        prefetchedSkills={prefetchedSkills}
      />
    </>
  );
};

export default Home;
