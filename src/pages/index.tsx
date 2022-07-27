import Head from 'next/head';
import type { NextPage } from 'next';
import { Content, Project } from '@prisma/client';

import { HomeComposition } from 'compositions/home';
import { trpc } from 'utils/trpc';
import { Loader } from 'components';

export const getStaticProps = async () => {
  let content: Content | null = null;
  let projects: Project[] | null = null;

  try {
    const [contentRes, projectsRes] = await Promise.all([
      await fetch('http://localhost:3000/api/content'),
      fetch('http://localhost:3000/api/project'),
    ]);
    content = await contentRes.json();
    projects = await projectsRes.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return {
    props: {
      prefetchedContent: content,
      prefetchedProjects: content,
    },
    revalidate: 10,
  };
};

type HomeProps = {
  prefetchedContent: Content | null;
  prefetchedProjects: Project[] | null;
  context: any;
};

const Home: NextPage<HomeProps> = ({
  prefetchedContent,
  prefetchedProjects,
}) => {
  const { data: content, status: contentStatus } = trpc.useQuery(
    ['content.getContent'],
    {
      enabled: !prefetchedContent,
      initialData: prefetchedContent,
    },
  );

  if (!content && contentStatus === 'loading') return <Loader />;
  if (!content || contentStatus === 'error') return <Loader />;

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
