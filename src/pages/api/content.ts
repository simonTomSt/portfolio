import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import { prisma } from '../../server/db/client';

const content = async (req: NextApiRequest, res: NextApiResponse) => {
  const content = await prisma.content.findFirst();
  return res.status(200).json(content);
};

export default withSentry(content);
