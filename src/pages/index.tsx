import Head from 'next/head';
import type { Page } from 'next';
import { Content, Project } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

import { HomeComposition } from 'compositions/home';
import { trpc } from 'utils/trpc';
import { Loader } from 'components';
import { getBaseUrl } from 'utils/functions/getBaseUrl';
import { ErrorComposition } from 'compositions/error';

export const getStaticProps = async () => {
  let content: Content | null = null;
  let projects: Project[] | null = null;
  const baseUrl = getBaseUrl();

  try {
    const [contentRes, projectsRes] = await Promise.all([
      fetch(`${baseUrl}/api/content`),
      fetch(`${baseUrl}/api/project`),
    ]);
    content = await contentRes.json();
    projects = await projectsRes.json();
  } catch (e) {
    Sentry.captureException(e);
  }

  return {
    props: {
      prefetchedContent: content,
      prefetchedProjects: projects,
    },
    revalidate: 10,
  };
};

type HomeProps = {
  prefetchedContent: Content | null;
  prefetchedProjects: Project[] | null;
};

const Home: Page<HomeProps> = ({ prefetchedContent, prefetchedProjects }) => {
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
      />
    </>
  );
};

export default Home;
