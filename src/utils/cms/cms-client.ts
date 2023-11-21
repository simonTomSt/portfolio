import { createClient } from 'contentful';

export const cmsClient = createClient({
  space: process.env.CF_SPACE_ID as string,
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN as string, // delivery API key for the space \
});
