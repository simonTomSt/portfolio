import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import { prisma } from '../../server/db/client';

const me = async (req: NextApiRequest, res: NextApiResponse) => {
  const projects = await prisma.user.findFirst({
    select: {
      id: true,
      email: true,
      githubLogin: true,
      cvUrl: true,
      linkedinUrl: true,
    },
  });
  return res.status(200).json(projects);
};

export default withSentry(me);
