import Head from 'next/head';
import type { Page } from 'next';

import { HomeComposition } from 'compositions/home';
import { getHomePageContent } from 'utils/cms';
import { ErrorComposition } from 'compositions/error';
import { logger } from 'utils/logger';
import { TypeHomePageFields } from 'utils/cms/models';

export const getStaticProps = async () => {
  try {
    const homePageData = await getHomePageContent();

    return { props: { homePageData }, revalidate: 14400 }; // 4h
  } catch (err) {
    logger.log(err);

    return { props: { error: true } };
  }
};

type HomeProps = {
  homePageData: TypeHomePageFields;
  error?: boolean;
};

const Home: Page<HomeProps> = ({ homePageData, error }) => {
  if (error)
    return (
      <ErrorComposition
        statusCode={500}
        message='Sorry could not load the page :('
      />
    );

  if (!homePageData) {
    return (
      <div>
        <p style={{ color: 'white' }}>no data</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{homePageData.title}</title>
        <meta name='description' content={homePageData.title} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HomeComposition homePageData={homePageData} />
    </>
  );
};

export default Home;
