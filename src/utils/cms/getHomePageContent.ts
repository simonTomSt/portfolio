import { cmsClient } from './cms-client';
import { TypeHomePageFields } from './models';

export const getHomePageContent = async (): Promise<TypeHomePageFields> => {
  const response = await cmsClient.getEntries({
    content_type: 'homePage',
  });

  const [homePageEntry] = response.items;

  const fields = homePageEntry?.fields as unknown as TypeHomePageFields;

  return fields;
};
